document.addEventListener('DOMContentLoaded', () => {
    const varietyButtons = document.querySelectorAll('.btn-variety');
    const btnSave = document.getElementById('btn-save');
    const btnClearHistory = document.getElementById('btn-clear-history');
    const historyList = document.getElementById('history-list');
    const weightInput = document.getElementById('weight');
    const noteInput = document.getElementById('note');
    const starRating = document.getElementById('star-rating');
    const stars = document.querySelectorAll('.star');

    const valCuvee = document.getElementById('val-cuvee');
    const valBouesCuvee = document.getElementById('val-boues-cuvee');
    const valTotalCuvee = document.getElementById('val-total-cuvee');
    const valBisulCuvee = document.getElementById('val-bisul-cuvee');
    const valEnzCuvee = document.getElementById('val-enz-cuvee');
    const valPigeCuvee = document.getElementById('val-pige-cuvee');

    const valTaille = document.getElementById('val-taille');
    const valBouesTaille = document.getElementById('val-boues-taille');
    const valTotalTaille = document.getElementById('val-total-taille');
    const valBisulTaille = document.getElementById('val-bisul-taille');
    const valEnzTaille = document.getElementById('val-enz-taille');
    const valPigeTaille = document.getElementById('val-pige-taille');

    const inputBisulCuvee = document.getElementById('input-bisul-cuvee');
    const inputEnzCuvee = document.getElementById('input-enz-cuvee');
    const inputBisulTaille = document.getElementById('input-bisul-taille');
    const inputEnzTaille = document.getElementById('input-enz-taille');
    const btnResetDoses = document.getElementById('btn-reset-doses');

    let selectedVariety = 'Chardonnay';
    let currentRating = 0;
    let userCustomizedDoses = false;
    let history = JSON.parse(localStorage.getItem('pressing_history')) || [];

    // Standard ratios for 4000kg
    const CUVEE_RATIO = 20.5 / 4000;
    const TAILLE_RATIO = 5.0 / 4000;
    const BOUES_PERCENT = 0.04;

    // Additives for 4000kg
    const BISUL_CUVEE_STD = 1250;
    const BISUL_TAILLE_STD = 350;
    const ENZ_CUVEE_STD = 400;
    const ENZ_TAILLE_STD = 100;

    // Barème de jaugeage Cuve N°6 - Taille (Annexe 1 au certificat 88- 3303-SOISSONS)
    // Hauteurs en mètres (h), Volumes en m3 (v) (1 m3 = 10 hL)
    const BAREME_CUVE_6 = [
        { h: 0.00, v: 0.067 }, { h: 0.01, v: 0.077 }, { h: 0.02, v: 0.087 }, { h: 0.03, v: 0.096 },
        { h: 0.04, v: 0.106 }, { h: 0.05, v: 0.116 }, { h: 0.06, v: 0.126 }, { h: 0.07, v: 0.136 },
        { h: 0.08, v: 0.146 }, { h: 0.09, v: 0.155 }, { h: 0.10, v: 0.165 }, { h: 0.11, v: 0.175 },
        { h: 0.12, v: 0.185 }, { h: 0.13, v: 0.195 }, { h: 0.14, v: 0.205 }, { h: 0.15, v: 0.215 },
        { h: 0.16, v: 0.224 }, { h: 0.17, v: 0.234 }, { h: 0.18, v: 0.244 }, { h: 0.19, v: 0.254 },
        { h: 0.20, v: 0.264 }, { h: 0.21, v: 0.274 }, { h: 0.22, v: 0.284 }, { h: 0.23, v: 0.294 },
        { h: 0.24, v: 0.304 }, { h: 0.25, v: 0.313 }, { h: 0.26, v: 0.323 }, { h: 0.27, v: 0.333 },
        { h: 0.28, v: 0.343 }, { h: 0.29, v: 0.353 }, { h: 0.30, v: 0.363 }, { h: 0.31, v: 0.373 },
        { h: 0.32, v: 0.383 }, { h: 0.33, v: 0.393 }, { h: 0.34, v: 0.403 }, { h: 0.35, v: 0.413 },
        { h: 0.36, v: 0.423 }, { h: 0.37, v: 0.433 }, { h: 0.38, v: 0.443 }, { h: 0.39, v: 0.452 },
        { h: 0.40, v: 0.462 }, { h: 0.41, v: 0.472 }, { h: 0.42, v: 0.482 }, { h: 0.43, v: 0.492 },
        { h: 0.44, v: 0.502 }, { h: 0.45, v: 0.512 }, { h: 0.46, v: 0.522 }, { h: 0.47, v: 0.532 },
        { h: 0.48, v: 0.542 }, { h: 0.49, v: 0.552 }, { h: 0.50, v: 0.562 }, { h: 0.51, v: 0.572 },
        { h: 0.52, v: 0.581 }, { h: 0.53, v: 0.591 }, { h: 0.54, v: 0.601 }, { h: 0.55, v: 0.611 },
        { h: 0.56, v: 0.621 }, { h: 0.57, v: 0.631 }, { h: 0.58, v: 0.641 }, { h: 0.59, v: 0.651 },
        { h: 0.60, v: 0.660 }, { h: 0.61, v: 0.670 }, { h: 0.62, v: 0.680 }, { h: 0.63, v: 0.690 },
        { h: 0.64, v: 0.700 }, { h: 0.65, v: 0.710 }, { h: 0.66, v: 0.720 }, { h: 0.67, v: 0.729 },
        { h: 0.68, v: 0.739 }, { h: 0.69, v: 0.749 }, { h: 0.70, v: 0.759 }, { h: 0.71, v: 0.769 },
        { h: 0.72, v: 0.779 }, { h: 0.73, v: 0.788 }, { h: 0.74, v: 0.798 }, { h: 0.75, v: 0.808 },
        { h: 0.76, v: 0.818 }, { h: 0.77, v: 0.828 }, { h: 0.78, v: 0.838 }, { h: 0.79, v: 0.847 },
        { h: 0.80, v: 0.857 }, { h: 0.81, v: 0.867 }, { h: 0.82, v: 0.877 }, { h: 0.83, v: 0.887 },
        { h: 0.84, v: 0.897 }, { h: 0.85, v: 0.906 }, { h: 0.86, v: 0.916 }, { h: 0.87, v: 0.926 },
        { h: 0.88, v: 0.936 }, { h: 0.89, v: 0.946 }, { h: 0.90, v: 0.956 }, { h: 0.91, v: 0.965 },
        { h: 0.92, v: 0.975 }, { h: 0.93, v: 0.985 }, { h: 0.94, v: 0.995 }, { h: 0.95, v: 1.005 },
        { h: 0.96, v: 1.015 }, { h: 0.97, v: 1.024 }, { h: 0.98, v: 1.034 }, { h: 0.99, v: 1.044 },
        { h: 1.00, v: 1.054 }, { h: 1.01, v: 1.064 }, { h: 1.02, v: 1.074 }, { h: 1.03, v: 1.083 },
        { h: 1.04, v: 1.093 }
    ];

    // Barème de jaugeage Cuve N°3 - Cuvée (Annexe 1 au certificat 88- 3203-SOISSONS)
    // Hauteurs en mètres (h), Volumes en m3 (v) (1 m3 = 10 hL)
    const BAREME_CUVE_3 = [
        { h: 0.00, v: 0.349 }, { h: 0.01, v: 0.378 }, { h: 0.02, v: 0.406 }, { h: 0.03, v: 0.435 },
        { h: 0.04, v: 0.463 }, { h: 0.05, v: 0.492 }, { h: 0.06, v: 0.520 }, { h: 0.07, v: 0.549 },
        { h: 0.08, v: 0.577 }, { h: 0.09, v: 0.606 }, { h: 0.10, v: 0.634 }, { h: 0.11, v: 0.663 },
        { h: 0.12, v: 0.691 }, { h: 0.13, v: 0.720 }, { h: 0.14, v: 0.748 }, { h: 0.15, v: 0.777 },
        { h: 0.16, v: 0.805 }, { h: 0.17, v: 0.834 }, { h: 0.18, v: 0.862 }, { h: 0.19, v: 0.891 },
        { h: 0.20, v: 0.919 }, { h: 0.21, v: 0.948 }, { h: 0.22, v: 0.976 }, { h: 0.23, v: 1.005 },
        { h: 0.24, v: 1.033 }, { h: 0.25, v: 1.062 }, { h: 0.26, v: 1.090 }, { h: 0.27, v: 1.119 },
        { h: 0.28, v: 1.147 }, { h: 0.29, v: 1.176 }, { h: 0.30, v: 1.204 }, { h: 0.31, v: 1.233 },
        { h: 0.32, v: 1.261 }, { h: 0.33, v: 1.290 }, { h: 0.34, v: 1.318 }, { h: 0.35, v: 1.346 },
        { h: 0.36, v: 1.375 }, { h: 0.37, v: 1.403 }, { h: 0.38, v: 1.432 }, { h: 0.39, v: 1.460 },
        { h: 0.40, v: 1.489 }, { h: 0.41, v: 1.517 }, { h: 0.42, v: 1.546 }, { h: 0.43, v: 1.574 },
        { h: 0.44, v: 1.603 }, { h: 0.45, v: 1.631 }, { h: 0.46, v: 1.660 }, { h: 0.47, v: 1.688 },
        { h: 0.48, v: 1.717 }, { h: 0.49, v: 1.746 }, { h: 0.50, v: 1.774 }, { h: 0.51, v: 1.803 },
        { h: 0.52, v: 1.831 }, { h: 0.53, v: 1.860 }, { h: 0.54, v: 1.888 }, { h: 0.55, v: 1.917 },
        { h: 0.56, v: 1.945 }, { h: 0.57, v: 1.974 }, { h: 0.58, v: 2.002 }, { h: 0.59, v: 2.031 },
        { h: 0.60, v: 2.059 }, { h: 0.61, v: 2.088 }, { h: 0.62, v: 2.116 }, { h: 0.63, v: 2.145 },
        { h: 0.64, v: 2.173 }, { h: 0.65, v: 2.202 }, { h: 0.66, v: 2.230 }, { h: 0.67, v: 2.259 },
        { h: 0.68, v: 2.288 }, { h: 0.69, v: 2.316 }, { h: 0.70, v: 2.345 }, { h: 0.71, v: 2.373 },
        { h: 0.72, v: 2.402 }, { h: 0.73, v: 2.430 }, { h: 0.74, v: 2.459 }, { h: 0.75, v: 2.488 },
        { h: 0.76, v: 2.516 }, { h: 0.77, v: 2.545 }, { h: 0.78, v: 2.573 }, { h: 0.79, v: 2.602 },
        { h: 0.80, v: 2.630 }, { h: 0.81, v: 2.659 }, { h: 0.82, v: 2.688 }, { h: 0.83, v: 2.716 },
        { h: 0.84, v: 2.745 }, { h: 0.85, v: 2.773 }, { h: 0.86, v: 2.802 }, { h: 0.87, v: 2.831 },
        { h: 0.88, v: 2.859 }, { h: 0.89, v: 2.888 }, { h: 0.90, v: 2.917 }, { h: 0.91, v: 2.945 },
        { h: 0.92, v: 2.974 }, { h: 0.93, v: 3.003 }, { h: 0.94, v: 3.031 }, { h: 0.95, v: 3.060 },
        { h: 0.96, v: 3.088 }, { h: 0.97, v: 3.117 }, { h: 0.98, v: 3.146 }, { h: 0.99, v: 3.174 },
        { h: 1.00, v: 3.203 }, { h: 1.01, v: 3.232 }, { h: 1.02, v: 3.261 }, { h: 1.03, v: 3.289 },
        { h: 1.04, v: 3.318 }, { h: 1.05, v: 3.347 }, { h: 1.06, v: 3.375 }, { h: 1.07, v: 3.404 },
        { h: 1.08, v: 3.433 }, { h: 1.09, v: 3.461 }, { h: 1.10, v: 3.490 }, { h: 1.11, v: 3.519 },
        { h: 1.12, v: 3.548 }, { h: 1.13, v: 3.576 }, { h: 1.14, v: 3.605 }, { h: 1.15, v: 3.634 },
        { h: 1.16, v: 3.663 }, { h: 1.17, v: 3.691 }, { h: 1.18, v: 3.720 }, { h: 1.19, v: 3.749 },
        { h: 1.20, v: 3.778 }, { h: 1.21, v: 3.806 }, { h: 1.22, v: 3.835 }, { h: 1.23, v: 3.864 },
        { h: 1.24, v: 3.893 }, { h: 1.25, v: 3.921 }, { h: 1.26, v: 3.950 }, { h: 1.27, v: 3.979 },
        { h: 1.28, v: 4.008 }, { h: 1.29, v: 4.037 }, { h: 1.30, v: 4.065 }, { h: 1.31, v: 4.094 },
        { h: 1.32, v: 4.123 }, { h: 1.33, v: 4.152 }, { h: 1.34, v: 4.181 }, { h: 1.35, v: 4.209 },
        { h: 1.36, v: 4.238 }, { h: 1.37, v: 4.267 }, { h: 1.38, v: 4.296 }, { h: 1.39, v: 4.325 },
        { h: 1.40, v: 4.353 }, { h: 1.41, v: 4.382 }, { h: 1.42, v: 4.411 }, { h: 1.43, v: 4.440 },
        { h: 1.44, v: 4.469 }, { h: 1.45, v: 4.498 }, { h: 1.46, v: 4.526 }, { h: 1.47, v: 4.555 },
        { h: 1.48, v: 4.584 }, { h: 1.49, v: 4.613 }, { h: 1.50, v: 4.642 }, { h: 1.51, v: 4.671 },
        { h: 1.52, v: 4.700 }
    ];

    function calculatePigeCm(volumeHl, bareme) {
        if (!volumeHl || volumeHl <= 0) return '0.0';
        const targetM3 = volumeHl / 10;
        
        if (targetM3 <= bareme[0].v) {
            return (bareme[0].h * 100).toFixed(1);
        }
        const last = bareme[bareme.length - 1];
        if (targetM3 >= last.v) {
            return (last.h * 100).toFixed(1);
        }

        for (let i = 0; i < bareme.length - 1; i++) {
            const current = bareme[i];
            const next = bareme[i + 1];
            if (targetM3 >= current.v && targetM3 <= next.v) {
                const fraction = (targetM3 - current.v) / (next.v - current.v);
                const heightM = current.h + fraction * (next.h - current.h);
                return (heightM * 100).toFixed(1);
            }
        }
        return '0.0';
    }

    // Initialize UI
    updateHistory();
    calculateYields();

    // Star Rating Logic
    stars.forEach(star => {
        star.addEventListener('click', () => {
            currentRating = parseInt(star.getAttribute('data-value'));
            updateStars();
        });
    });

    function updateStars() {
        stars.forEach(star => {
            const val = parseInt(star.getAttribute('data-value'));
            if (val <= currentRating) {
                star.classList.add('active');
            } else {
                star.classList.remove('active');
            }
        });
    }

    // Event Listeners
    weightInput.addEventListener('input', () => {
        calculateYields();
    });

    varietyButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            varietyButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            selectedVariety = btn.getAttribute('data-variety');
        });
    });

    // Additive inputs listeners
    const additiveInputs = [inputBisulCuvee, inputEnzCuvee, inputBisulTaille, inputEnzTaille];
    additiveInputs.forEach(input => {
        if (input) {
            input.addEventListener('input', () => {
                userCustomizedDoses = true;
                syncAdditiveDisplay();
            });
        }
    });

    if (btnResetDoses) {
        btnResetDoses.addEventListener('click', () => {
            userCustomizedDoses = false;
            updateAdditiveInputsFromWeight();
            syncAdditiveDisplay();
        });
    }

    function updateAdditiveInputsFromWeight() {
        const weight = parseFloat(weightInput.value) || 0;
        const scale = weight / 4000;
        if (inputBisulCuvee) inputBisulCuvee.value = Math.round(BISUL_CUVEE_STD * scale);
        if (inputEnzCuvee) inputEnzCuvee.value = Math.round(ENZ_CUVEE_STD * scale);
        if (inputBisulTaille) inputBisulTaille.value = Math.round(BISUL_TAILLE_STD * scale);
        if (inputEnzTaille) inputEnzTaille.value = Math.round(ENZ_TAILLE_STD * scale);
    }

    function syncAdditiveDisplay() {
        if (valBisulCuvee && inputBisulCuvee) valBisulCuvee.textContent = inputBisulCuvee.value || 0;
        if (valEnzCuvee && inputEnzCuvee) valEnzCuvee.textContent = inputEnzCuvee.value || 0;
        if (valBisulTaille && inputBisulTaille) valBisulTaille.textContent = inputBisulTaille.value || 0;
        if (valEnzTaille && inputEnzTaille) valEnzTaille.textContent = inputEnzTaille.value || 0;
    }

    function calculateYields() {
        const weight = parseFloat(weightInput.value) || 0;
        const scale = weight / 4000;

        const cuvee = weight * CUVEE_RATIO;
        const taille = weight * TAILLE_RATIO;
        const bouesCuvee = cuvee * BOUES_PERCENT;
        const bouesTaille = taille * BOUES_PERCENT;
        const totalCuvee = cuvee + bouesCuvee;
        const totalTaille = taille + bouesTaille;

        valCuvee.textContent = cuvee.toFixed(2);
        valBouesCuvee.textContent = bouesCuvee.toFixed(2);
        valTotalCuvee.textContent = totalCuvee.toFixed(2);

        valTaille.textContent = taille.toFixed(2);
        valBouesTaille.textContent = bouesTaille.toFixed(2);
        valTotalTaille.textContent = totalTaille.toFixed(2);

        if (!userCustomizedDoses) {
            updateAdditiveInputsFromWeight();
        }
        syncAdditiveDisplay();

        if (valPigeCuvee) {
            valPigeCuvee.textContent = calculatePigeCm(totalCuvee, BAREME_CUVE_3);
        }
        if (valPigeTaille) {
            valPigeTaille.textContent = calculatePigeCm(totalTaille, BAREME_CUVE_6);
        }
    }

    btnSave.addEventListener('click', () => {
        const weight = parseFloat(weightInput.value) || 0;

        const cuvee = weight * CUVEE_RATIO;
        const taille = weight * TAILLE_RATIO;
        const bouesCuvee = cuvee * BOUES_PERCENT;
        const bouesTaille = taille * BOUES_PERCENT;
        const totalCuvee = cuvee + bouesCuvee;
        const totalTaille = taille + bouesTaille;
        const pigeCuvee = calculatePigeCm(totalCuvee, BAREME_CUVE_3);
        const pigeTaille = calculatePigeCm(totalTaille, BAREME_CUVE_6);

        const bisulCuveeVal = inputBisulCuvee ? (parseInt(inputBisulCuvee.value) || 0) : 0;
        const enzCuveeVal = inputEnzCuvee ? (parseInt(inputEnzCuvee.value) || 0) : 0;
        const bisulTailleVal = inputBisulTaille ? (parseInt(inputBisulTaille.value) || 0) : 0;
        const enzTailleVal = inputEnzTaille ? (parseInt(inputEnzTaille.value) || 0) : 0;

        const entry = {
            id: Date.now(),
            date: new Date().toLocaleString('fr-FR'),
            weight: weight,
            variety: selectedVariety,
            rating: currentRating,
            note: noteInput.value || 'N/A',
            cuvee: cuvee.toFixed(2),
            taille: taille.toFixed(2),
            bouesCuvee: bouesCuvee.toFixed(2),
            bouesTaille: bouesTaille.toFixed(2),
            totalCuvee: totalCuvee.toFixed(2),
            totalTaille: totalTaille.toFixed(2),
            pigeCuvee: pigeCuvee,
            pigeTaille: pigeTaille,
            bisulCuvee: bisulCuveeVal,
            bisulTaille: bisulTailleVal,
            enzCuvee: enzCuveeVal,
            enzTaille: enzTailleVal
        };

        history.unshift(entry);
        localStorage.setItem('pressing_history', JSON.stringify(history));

        // Reset and provide feedback
        noteInput.value = '';
        currentRating = 0;
        userCustomizedDoses = false;
        updateStars();
        updateAdditiveInputsFromWeight();
        syncAdditiveDisplay();
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
                    <span style="color: var(--gold); font-size: 0.8rem;">${'★'.repeat(item.rating)}${'☆'.repeat(5 - item.rating)}</span><br>
                    <span style="color: var(--text-secondary); font-size: 0.8rem;">${item.note}</span>
                </div>
                <div class="history-info">
                    <div class="history-variety">${item.variety} (${item.weight} kg)</div>
                    <div style="font-size: 0.8rem; color: var(--text-secondary);">
                        C: ${item.cuvee}hL + ${item.bouesCuvee}B = <strong>${item.totalCuvee}hL</strong> 
                        ${item.pigeCuvee ? `<span style="color: var(--gold-bright); font-weight: 600;">(📏 Cuve 3 : ${item.pigeCuvee} cm)</span>` : ''}
                        (S:${item.bisulCuvee}ml E:${item.enzCuvee}ml)<br>
                        T: ${item.taille}hL + ${item.bouesTaille}B = <strong>${item.totalTaille}hL</strong> 
                        ${item.pigeTaille ? `<span style="color: #f1c40f; font-weight: 600;">(📏 Cuve 6 : ${item.pigeTaille} cm)</span>` : ''} 
                        (S:${item.bisulTaille}ml E:${item.enzTaille}ml)
                    </div>
                </div>
                <button class="btn-item-delete" data-id="${item.id}" title="Supprimer cet enregistrement">🗑️</button>
            </div>
        `).join('');

        // Handle individual deletion
        const itemDeleteButtons = historyList.querySelectorAll('.btn-item-delete');
        itemDeleteButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const id = parseInt(btn.getAttribute('data-id'));
                if (confirm('Supprimer cet enregistrement ?')) {
                    history = history.filter(item => item.id !== id);
                    localStorage.setItem('pressing_history', JSON.stringify(history));
                    updateHistory();
                }
            });
        });
    }
});
