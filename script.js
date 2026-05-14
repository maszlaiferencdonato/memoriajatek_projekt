var jelek = ['🍎', '🍎', '🍌', '🍌', '🍇', '🍇', '🍓', '🍓', '🍒', '🍒', '🥝', '🥝', '🍍', '🍍', '🍊', '🍊'];
var palya = document.getElementById('palya');
var csuszka = document.getElementById('kartya-szam');
var ertekSzoveg = document.getElementById('ertek');
var gomb = document.getElementById('keveres-btn');

var elsoKartya = null;
var masodikKartya = null;
var stop = false;

var mentettDarab = localStorage.getItem('utolsoBeallitas');
if (mentettDarab) {
    csuszka.value = mentettDarab;
    ertekSzoveg.innerHTML = mentettDarab;
}

function jatekInditasa() {
    palya.innerHTML = ''; 
    elsoKartya = null;
    masodikKartya = null;
    stop = false;

    var darab = parseInt(csuszka.value);
    var aktualisJelek = [];
    for (var i = 0; i < darab; i++) {
        aktualisJelek.push(jelek[i]);
    }

    aktualisJelek.sort(function() { return 0.5 - Math.random(); });

    for (var i = 0; i < darab; i++) {
        var div = document.createElement('div');
        div.className = 'kartya';
        div.innerHTML = '?';
        div.setAttribute('data-jel', aktualisJelek[i]);

        div.onclick = function() {
            if (stop || this == elsoKartya || this.innerHTML != '?') {
                return;
            }

            this.innerHTML = this.getAttribute('data-jel');
            this.style.backgroundColor = 'white';
            this.style.color = 'black';

            if (elsoKartya == null) {
                elsoKartya = this;
            } else {
                masodikKartya = this;
                stop = true;

                if (elsoKartya.getAttribute('data-jel') == masodikKartya.getAttribute('data-jel')) {
                    elsoKartya = null;
                    masodikKartya = null;
                    stop = false;
                } else {
                    setTimeout(function() {
                        elsoKartya.innerHTML = '?';
                        elsoKartya.style.backgroundColor = '';
                        elsoKartya.style.color = '';
                        
                        masodikKartya.innerHTML = '?';
                        masodikKartya.style.backgroundColor = '';
                        masodikKartya.style.color = '';

                        elsoKartya = null;
                        masodikKartya = null;
                        stop = false;
                    }, 1000);
                }
            }
        };
        palya.appendChild(div);
    }
}

csuszka.oninput = function() {
    ertekSzoveg.innerHTML = this.value;
    localStorage.setItem('utolsoBeallitas', this.value);
}

gomb.onclick = function() {
    jatekInditasa();
}

jatekInditasa();