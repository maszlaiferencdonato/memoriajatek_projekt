var jelek = ['A', 'A', 'B', 'B', 'C', 'C', 'D', 'D'];
var palya = document.getElementById('palya');

for (var i = 0; i < 8; i++) {
    var div = document.createElement('div');
    div.className = 'kartya';
    div.innerHTML = '?';
    div.id = i;

    div.onclick = function() {
        var sorszam = this.id;
        this.innerHTML = jelek[sorszam];
        this.style.backgroundColor = 'white';
    };

    palya.appendChild(div);
}