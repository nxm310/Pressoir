# Walkthrough - Champagne Pressing App

The application for managing 4000kg champagne pressings is now ready. It features a premium design inspired by the luxury of the Champagne region and automated yield calculations.

## Features Implemented

- **Dynamic Yield Calculations**: Enter any weight of grapes, and the yields will scale proportionally based on the 4000kg standard (20.5hL Cuvée / 5.0hL Taille).
- **Automated Calculations**:
    - **Cuvée**: Scaled proportionally (0.005125 hL/kg).
    - **Taille**: Scaled proportionally (0.00125 hL/kg).
    - **Boues**: 4% addition calculated for both fractions.
- **Volumes Totaux** : Affichage clair du volume de jus + volume des boues pour chaque fraction.
- **Bisulfite & Enzymes** :
    - Calcul automatique basé sur vos proportions : 
        - **Bisulfite** : 1250 ml (Cuvée) / 450 ml (Taille) par marc de 4000 kg.
        - **Enzymes** : 400 ml (Cuvée) / 100 ml (Taille) par marc de 4000 kg.
    - Ces doses s'adaptent dynamiquement si vous changez le poids du raisin.
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
