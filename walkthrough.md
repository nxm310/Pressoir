# Walkthrough - Champagne Pressing App

The application for managing 4000kg champagne pressings is now ready. It features a premium design inspired by the luxury of the Champagne region and automated yield calculations.

## Features Implemented

- **Dynamic Yield Calculations**: Enter any weight of grapes, and the yields will scale proportionally based on the 4000kg standard (20.5hL Cuvée / 5.0hL Taille).
- **Automated Calculations**:
    - **Cuvée**: Scaled proportionally (0.005125 hL/kg).
    - **Taille**: Scaled proportionally (0.00125 hL/kg).
    - **Boues**: 4% addition calculated for both fractions.
- **Volumes Totaux** : Affichage clair du volume de jus + volume des boues pour chaque fraction.
- **Pigeage des Cuves (Barèmes officiels de Soissons)** :
    - **Cuve N°3 (Cuvée)** : Calcul automatique et précis en centimètres (cm) de la hauteur de pige pour le Total Cuvée (+Boues).
    - **Cuve N°6 (Taille)** : Calcul automatique et précis en centimètres (cm) de la hauteur de pige pour le Total Taille (+Boues).
- **Bisulfite & Enzymes Personnalisables** :
    - Saisie directe des doses (ml) pour chaque marc dans la section **Chargement du Marc**, séparément pour la **Cuvée** et la **Taille**.
    - Calcul automatique et proportionnel au poids par défaut (Base 4000 kg : 1250 ml Bisul / 400 ml Enz pour Cuvée, 350 ml Bisul / 100 ml Enz pour Taille).
    - Bouton rapide **"Rétablir standard"** pour réinitialiser aux proportions de référence.
    - Enregistrement des doses exactes dans l'historique de chaque pressurage.
- **Notation de Qualité** : Système de 1 à 5 étoiles pour évaluer la qualité du raisin à chaque chargement.
- **Cépages Purifiés** : Sélection rapide parmi les 3 cépages principaux (Chardonnay, Pinot Noir, Pinot Meunier).
- **Historique Enrichi & Gestion** : 
    - Enregistrement incluant le poids, les rendements totaux, les doses d'additifs et la **note de qualité (étoiles)**.
    - Bouton **"Vider l'Historique"** avec confirmation pour une gestion simplifiée.
- **Optimisation Mobile** : Interface affinée pour une lecture et une utilisation confortables sur iPhone.

## Media

### Application Preview
I have designed the application to be clear and elegant. Below is a summary of the UI components:

| Component | Description |
| :--- | :--- |
| **Chargement** | Input for weight and variety selection. |
| **Rendement** | Real-time display of expected volumes. |
| **Historique** | List of previous pressings for tracking. |

## Verification Results

- [x] **Logic**: 20.5 hL Cuvée and 5.0 hL Taille formulas verified.
- [x] **Boues**: Calculation of 4% (0.82hL and 0.20hL) correctly displayed.
- [x] **Storage**: Data persists across page refreshes using `localStorage`.
- [x] **UI**: Verified responsive layout and legible typography.

> [!TIP]
> To use the app, simply open `index.html` in any modern web browser.
