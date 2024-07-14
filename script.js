const neuroleptiques = [
    {
        nom: "Haloperidol",
        effets: {
            effet_antipsychotique: "Très forte",
            anti_maniaque: "Forte",
            antidépresseur: "Pas d'effet",
            anxiolytique: "Pas d'effet",
            diminution_symptômes_négatifs: "Pas d'effet"
        },
        effets_indésirables: {
            epms: "Très forte",
            dysfonctionnement_cognitif: "Forte",
            diminution_apprentissage_émotionnel: "Forte",
            diminution_attention: "Forte",
            augmentation_prolactine: "Forte"
        }
    },
    // Ajoutez les autres neuroleptiques ici
];

function proposerNeuroleptique() {
    const effetsPrincipauxChoisis = Array.from(document.querySelectorAll('input[name="effet"]:checked')).map(e => e.value);
    const effetsIndésirablesChoisis = Array.from(document.querySelectorAll('input[name="effet_indésirable"]:checked')).map(e => e.value);

    let propositions = neuroleptiques.filter(neuro => {
        let correspondanceEffetsPrincipaux = effetsPrincipauxChoisis.every(effet => neuro.effets[effet] && neuro.effets[effet] !== "Pas d'effet");
        let correspondanceEffetsIndésirables = effetsIndésirablesChoisis.every(effet => neuro.effets_indésirables[effet] && neuro.effets_indésirables[effet] !== "Pas d'effet");

        return correspondanceEffetsPrincipaux && !correspondanceEffetsIndésirables;
    });

    const propositionsDiv = document.getElementById('propositions');
    propositionsDiv.innerHTML = '';

    propositions.forEach(proposition => {
        const propDiv = document.createElement('div');
        propDiv.className = 'proposition';
        
        let propHTML = `<h3>${proposition.nom}</h3>`;
        propHTML += '<p><strong>Effets Principaux:</strong></p>';
        propHTML += '<ul>';
        for (const effet in proposition.effets) {
            propHTML += `<li>${effet.replace(/_/g, ' ')}: ${proposition.effets[effet]}</li>`;
        }
        propHTML += '</ul>';
        
        propHTML += '<p><strong>Effets Indésirables:</strong></p>';
        propHTML += '<ul>';
        for (const effet in proposition.effets_indésirables) {
            propHTML += `<li>${effet.replace(/_/g, ' ')}: ${proposition.effets_indésirables[effet]}</li>`;
        }
        propHTML += '</ul>';

        propDiv.innerHTML = propHTML;
        propositionsDiv.appendChild(propDiv);
    });

    if (propositions.length === 0) {
        propositionsDiv.innerHTML = '<p>Aucun neuroleptique ne correspond aux critères sélectionnés.</p>';
    }
}
