document.addEventListener('DOMContentLoaded', () => {
    const varietyButtons = document.querySelectorAll('.btn-variety');
    const btnSave = document.getElementById('btn-save');
    const btnClearHistory = document.getElementById('btn-clear-history');
    const historyList = document.getElementById('history-list');
    const weightInput = document.getElementById('weight');
    const noteInput = document.getElementById('note');

    const valCuvee = document.getElementById('val-cuvee');
    const valBouesCuvee = document.getElementById('val-boues-cuvee');
    const valTotalCuvee = document.getElementById('val-total-cuvee');
    const valBisulCuvee = document.getElementById('val-bisul-cuvee');
    const valEnzCuvee = document.getElementById('val-enz-cuvee');

    const valTaille = document.getElementById('val-taille');
    const valBouesTaille = document.getElementById('val-boues-taille');
    const valTotalTaille = document.getElementById('val-total-taille');
    const valBisulTaille = document.getElementById('val-bisul-taille');
    const valEnzTaille = document.getElementById('val-enz-taille');

    let selectedVariety = 'Chardonnay';
    let history = JSON.parse(localStorage.getItem('pressing_history')) || [];

    // Standard ratios for 4000kg
    const CUVEE_RATIO = 20.5 / 4000;
    const TAILLE_RATIO = 5.0 / 4000;
    const BOUES_PERCENT = 0.04;

    // Additives for 4000kg
    const BISUL_CUVEE_STD = 1250;
    const BISUL_TAILLE_STD = 450;
    const ENZ_CUVEE_STD = 400;
    const ENZ_TAILLE_STD = 100;

    // Initialize UI
    updateHistory();
    calculateYields();

    // Event Listeners
    weightInput.addEventListener('input', calculateYields);

    varietyButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            varietyButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            selectedVariety = btn.getAttribute('data-variety');
        });
    });

    function calculateYields() {
        const weight = parseFloat(weightInput.value) || 0;
        const scale = weight / 4000;

        const cuvee = weight * CUVEE_RATIO;
        const taille = weight * TAILLE_RATIO;
        const bouesCuvee = cuvee * BOUES_PERCENT;
        const bouesTaille = taille * BOUES_PERCENT;

        valCuvee.textContent = cuvee.toFixed(2);
        valBouesCuvee.textContent = bouesCuvee.toFixed(2);
        valTotalCuvee.textContent = (cuvee + bouesCuvee).toFixed(2);
        valBisulCuvee.textContent = Math.round(BISUL_CUVEE_STD * scale);
        valEnzCuvee.textContent = Math.round(ENZ_CUVEE_STD * scale);

        valTaille.textContent = taille.toFixed(2);
        valBouesTaille.textContent = bouesTaille.toFixed(2);
        valTotalTaille.textContent = (taille + bouesTaille).toFixed(2);
        valBisulTaille.textContent = Math.round(BISUL_TAILLE_STD * scale);
        valEnzTaille.textContent = Math.round(ENZ_TAILLE_STD * scale);
    }

    btnSave.addEventListener('click', () => {
        const weight = parseFloat(weightInput.value) || 0;
        const scale = weight / 4000;

        const cuvee = weight * CUVEE_RATIO;
        const taille = weight * TAILLE_RATIO;
        const bouesCuvee = cuvee * BOUES_PERCENT;
        const bouesTaille = taille * BOUES_PERCENT;

        const entry = {
            id: Date.now(),
            date: new Date().toLocaleString('fr-FR'),
            weight: weight,
            variety: selectedVariety,
            note: noteInput.value || 'N/A',
            cuvee: cuvee.toFixed(2),
            taille: taille.toFixed(2),
            bouesCuvee: bouesCuvee.toFixed(2),
            bouesTaille: bouesTaille.toFixed(2),
            totalCuvee: (cuvee + bouesCuvee).toFixed(2),
            totalTaille: (taille + bouesTaille).toFixed(2),
            bisulCuvee: Math.round(BISUL_CUVEE_STD * scale),
            bisulTaille: Math.round(BISUL_TAILLE_STD * scale),
            enzCuvee: Math.round(ENZ_CUVEE_STD * scale),
            enzTaille: Math.round(ENZ_TAILLE_STD * scale)
        };

        history.unshift(entry);
        localStorage.setItem('pressing_history', JSON.stringify(history));

        // Reset and provide feedback
        noteInput.value = '';
        updateHistory();

        // Visual feedback
        btnSave.textContent = 'Enregistré !';
        btnSave.style.background = '#2d5a27';
        btnSave.style.color = 'white';

        setTimeout(() => {
            btnSave.textContent = 'Enregistrer ce Pressurage';
            btnSave.style.background = '';
            btnSave.style.color = '';
        }, 2000);
    });

    btnClearHistory.addEventListener('click', () => {
        if (confirm('Voulez-vous vraiment supprimer tout l\'historique ? Cette action est irréversible.')) {
            history = [];
            localStorage.removeItem('pressing_history');
            updateHistory();
        }
    });

    function updateHistory() {
        if (history.length === 0) {
            historyList.innerHTML = '<div style="color: var(--text-secondary); text-align: center; padding: 1rem; font-size: 0.9rem;">Aucun pressurage enregistré</div>';
            btnClearHistory.style.display = 'none';
            return;
        }

        btnClearHistory.style.display = 'block';
        historyList.innerHTML = history.map(item => `
            <div class="history-item">
                <div class="history-date">
                    ${item.date}<br>
                    <span style="color: var(--gold); font-size: 0.8rem;">${item.note}</span>
                </div>
                <div class="history-info">
                    <div class="history-variety">${item.variety} (${item.weight} kg)</div>
                    <div style="font-size: 0.8rem; color: var(--text-secondary);">
                        C: ${item.cuvee}hL + ${item.bouesCuvee}B = <strong>${item.totalCuvee}hL</strong> (S:${item.bisulCuvee}ml E:${item.enzCuvee}ml)<br>
                        T: ${item.taille}hL + ${item.bouesTaille}B = <strong>${item.totalTaille}hL</strong> (S:${item.bisulTaille}ml E:${item.enzTaille}ml)
                    </div>
                </div>
            </div>
        `).join('');
    }
});
