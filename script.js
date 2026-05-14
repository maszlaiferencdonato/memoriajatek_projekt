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
        div.setAttribute('data-jel', aktualisJelek[i]);

        var divBelso = document.createElement('div');
        divBelso.className = 'kartya-belso';

        var divHatulja = document.createElement('div');
        divHatulja.className = 'kartya-hatulja';
        divHatulja.innerHTML = '?';

        var divEleje = document.createElement('div');
        divEleje.className = 'kartya-eleje';
        divEleje.innerHTML = aktualisJelek[i];

        divBelso.appendChild(divEleje);
        divBelso.appendChild(divHatulja);
        div.appendChild(divBelso);

        div.onclick = function() {
            if (stop || this == elsoKartya || this.classList.contains('fordit')) {
                return;
            }

            this.classList.add('fordit');

            if (elsoKartya == null) {
                elsoKartya = this;
            } else {
                masodikKartya = this;
                stop = true;
                lepesek++;
                lepesKijelzo.innerHTML = lepesek;

                if (elsoKartya.getAttribute('data-jel') == masodikKartya.getAttribute('data-jel')) {
                    megtalaltParok++;
                    elsoKartya.classList.add('talalat');
                    masodikKartya.classList.add('talalat');
                    
                    elsoKartya = null;
                    masodikKartya = null;
                    stop = false;

                    if (megtalaltParok == darab / 2) {
                        setTimeout(function(){
                            alert("Gratulálok! Megnyerted a játékot " + lepesek + " lépésből!");
                            
                            var regiRekord = localStorage.getItem('rekord');
                            if (!regiRekord || lepesek < regiRekord) {
                                localStorage.setItem('rekord', lepesek);
                                rekordKijelzo.innerHTML = lepesek;
                                alert("Új rekord!");
                            }
                        }, 500);
                    }
                } else {
                    setTimeout(function() {
                        elsoKartya.classList.remove('fordit');
                        masodikKartya.classList.remove('fordit');
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