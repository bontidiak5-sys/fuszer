const receptek = [
    {
        nev: "Palacsinta",
        hozzavalok: ["tojás", "liszt", "tej", "cukor"]
    },
    {
        nev: "Rántotta",
        hozzavalok: ["tojás", "sajt"]
    },
    {
        nev: "Sajtos paradicsomos omlett",
        hozzavalok: ["tojás", "sajt", "paradicsom"]
    },
    {
        nev: "Grízes tészta",
        hozzavalok: ["liszt", "cukor", "vaj"]
    },
    {
        nev: "Paradicsomos tészta",
        hozzavalok: ["liszt", "paradicsom", "sajt"]
    },
    {
        nev: "Sajtos melegszendvics",
        hozzavalok: ["sajt", "vaj"]
    },
    {
        nev: "Túrós palacsinta",
        hozzavalok: ["tojás", "liszt", "tej", "cukor", "túró"]
    },
    {
        nev: "Csirkés rizs",
        hozzavalok: ["csirke", "rizs", "só"]
    },
    {
        nev: "Sült krumpli",
        hozzavalok: ["krumpli", "só", "olaj"]
    },
    {
        nev: "Rizses hús",
        hozzavalok: ["csirke", "rizs", "só", "olaj"]
    },
    {
        nev: "Krumplipüré",
        hozzavalok: ["krumpli", "vaj", "tej", "só"]
    },
    {
        nev: "Sajtos tészta",
        hozzavalok: ["liszt", "sajt", "vaj"]
    },
    {
        nev: "Tojásos nokedli",
        hozzavalok: ["tojás", "liszt", "só"]
    },
    {
        nev: "Bundás kenyér",
        hozzavalok: ["tojás", "tej", "só", "olaj"]
    },
    {
        nev: "Tejeskávé",
        hozzavalok: ["tej", "cukor"]
    },
    {
        nev: "Csirkepörkölt",
        hozzavalok: ["csirke", "olaj", "só", "paradicsom"]
    },
    {
        nev: "Sajtos krumpli",
        hozzavalok: ["krumpli", "sajt", "vaj"]
    },
    {
        nev: "Paradicsomleves",
        hozzavalok: ["paradicsom", "só", "cukor"]
    },
    {
        nev: "Rizsfelfújt",
        hozzavalok: ["rizs", "tej", "cukor", "tojás"]
    },
    {
        nev: "Túrós csusza",
        hozzavalok: ["liszt", "túró", "tejföl", "só"]
    },
    {
        nev: "Sajtos omlett",
        hozzavalok: ["tojás", "sajt", "só"]
    }
];

function osszesOsszetevo() {
    const osszetevok = new Set();
    receptek.forEach(recept => {
        recept.hozzavalok.forEach(hozzavalo => {
            osszetevok.add(hozzavalo);
        });
    });
    return Array.from(osszetevok).sort();
}

document.addEventListener('DOMContentLoaded', function() {
    inicializalasTeglalap();
});

function inicializalasTeglalap() {
    const osszetevok = osszesOsszetevo();
    const ingredientsList = document.getElementById('ingredientsList');
    
    osszetevok.forEach(osszetevo => {
        const div = document.createElement('div');
        div.className = 'ingredient-item';
        
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = 'checkbox-' + osszetevo;
        checkbox.value = osszetevo;
        
        const label = document.createElement('label');
        label.htmlFor = 'checkbox-' + osszetevo;
        label.textContent = osszetevo.charAt(0).toUpperCase() + osszetevo.slice(1);
        
        div.appendChild(checkbox);
        div.appendChild(label);
        ingredientsList.appendChild(div);
    });
}

function keresRecepteket() {
    const checkboxok = document.querySelectorAll('input[type="checkbox"]:checked');
    const kivalasztottOsszetevok = Array.from(checkboxok).map(cb => cb.value);
    
    let eredmeny = receptek;
    
    if (kivalasztottOsszetevok.length > 0) {
        eredmeny = receptek.filter(recept => {
            return kivalasztottOsszetevok.every(osszetevo => 
                recept.hozzavalok.includes(osszetevo)
            );
        });
    }
    
    megjelenitEredmenyek(eredmeny);
}

function megjelenitEredmenyek(eredmeny) {
    const resultsDiv = document.getElementById('results');
    const checkboxok = document.querySelectorAll('input[type="checkbox"]:checked');
    const kivalasztottOsszetevok = Array.from(checkboxok).map(cb => cb.value);
    
    resultsDiv.innerHTML = '';
    
    if (eredmeny.length === 0) {
        resultsDiv.innerHTML = '<p class="no-results">Nincs találat.</p>';
        return;
    }
    
    if (kivalasztottOsszetevok.length > 0) {
        const summaryDiv = document.createElement('div');
        summaryDiv.className = 'search-summary';
        summaryDiv.innerHTML = `<strong>Kiválasztott összetevők:</strong> ${kivalasztottOsszetevok.join(', ')}`;
        resultsDiv.appendChild(summaryDiv);
    }
    
    eredmeny.forEach(recept => {
        const receptDiv = document.createElement('div');
        receptDiv.className = 'recipe-item';
        
        const nev = document.createElement('div');
        nev.className = 'recipe-name';
        nev.textContent = recept.nev;
        
        const hozzavalokDiv = document.createElement('div');
        hozzavalokDiv.className = 'recipe-ingredients';
        
        const hozzavalokHTML = recept.hozzavalok
            .map(hozzavalo => {
                const isKivalasztott = kivalasztottOsszetevok.includes(hozzavalo);
                const className = isKivalasztott ? 'ingredient-tag selected' : 'ingredient-tag';
                return `<span class="${className}">${hozzavalo}</span>`;
            })
            .join('');
        
        hozzavalokDiv.innerHTML = hozzavalokHTML;
        
        receptDiv.appendChild(nev);
        receptDiv.appendChild(hozzavalokDiv);
        resultsDiv.appendChild(receptDiv);
    });
}