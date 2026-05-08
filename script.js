var jelek = ['A', 'A', 'B', 'B', 'C', 'C', 'D', 'D', 'E', 'E', 'F', 'F', 'G', 'G', 'H', 'H'];
var palya = document.getElementById('palya');
var csuszka = document.getElementById('csuszka');
var ertekSzoveg = document.getElementById('ertek');
var gomb = document.getElementById('keveres');

function jatekInditasa() {
    palya.innerHTML = '';
    var darab = csuszka.value;
    
    var aktualisJelek = [];
    for (var i = 0; i < darab; i++) {
        aktualisJelek.push(jelek[i]);
    }

    aktualisJelek.sort(function() { return 0.5 - Math.random(); });

    for (var i = 0; i < darab; i++) {
        var div = document.createElement('div');
        div.className = 'kartya';
        div.innerHTML = '?';
        div.id = i;
        
        div.setAttribute('data-jel', aktualisJelek[i]);

        div.onclick = function() {
            this.innerHTML = this.getAttribute('data-jel');
            this.style.backgroundColor = 'white';
        };

        palya.appendChild(div);
    }
}


csuszka.oninput = function() {
    ertekSzoveg.innerHTML = this.value;
}


gomb.onclick = function() {
    jatekInditasa();
}

jatekInditasa();