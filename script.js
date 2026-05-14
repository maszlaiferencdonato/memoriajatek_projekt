var jelek = ['🍇', '🍇', '🍌', '🍌', '🍎', '🍎', '🥝', '🥝', '🍓', '🍓', '🍒', '🍒', '🍍', '🍍', '🍊', '🍊', '🍉', '🍉', '🍐', '🍐'];
var palya = document.getElementById('palya');
var csuszka = document.getElementById('kartya-szam');
var ertekSzoveg = document.getElementById('ertek');
var gomb = document.getElementById('keveres-btn');
var lepesKijelzo = document.getElementById('lepesek');
var rekordKijelzo = document.getElementById('rekord');

var elsoKartya = null;
var masodikKartya = null;
var stop = false;
var lepesek = 0;
var megtalaltParok = 0;

var mentettDarab = localStorage.getItem('utolsoBeallitas');
if (mentettDarab) {
    csuszka.value = mentettDarab;
    ertekSzoveg.innerHTML = mentettDarab;
}

var mentettRekord = localStorage.getItem('rekord');
if (mentettRekord) {
    rekordKijelzo.innerHTML = mentettRekord;
}

function jatekInditasa() {
    palya.innerHTML = ''; 
    elsoKartya = null;
    masodikKartya = null;
    stop = false;
    lepesek = 0;
    megtalaltParok = 0;
    lepesKijelzo.innerHTML = "0";

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

            if (elsoKartya == null) {
                elsoKartya = this;
            } else {
                masodikKartya = this;
                stop = true;
                lepesek++;
                lepesKijelzo.innerHTML = lepesek;

                if (elsoKartya.getAttribute('data-jel') == masodikKartya.getAttribute('data-jel')) {
                    megtalaltParok++;
                    elsoKartya = null;
                    masodikKartya = null;
                    stop = false;

                    if (megtalaltParok == darab / 2) {
                        alert("Gratulálok! Megnyerted a játékot " + lepesek + " lépésből!");
                        
                        var regiRekord = localStorage.getItem('rekord');
                        if (!regiRekord || lepesek < regiRekord) {
                            localStorage.setItem('rekord', lepesek);
                            rekordKijelzo.innerHTML = lepesek;
                            alert("Új rekord!");
                        }
                    }
                } else {
                    setTimeout(function() {
                        elsoKartya.innerHTML = '?';
                        elsoKartya.style.backgroundColor = '';
                        masodikKartya.innerHTML = '?';
                        masodikKartya.style.backgroundColor = '';
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