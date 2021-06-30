

// Initialize an agent at application startup.

// IdFingerprinting = getCookie('IdFingerprinting');

// if (typeof IdFingerprinting == 'undefined') {


// }


// deleteCookie('IdFingerprinting');


//Скорей всего Flash нету
Fonts = getFonts();
console.log(Fonts)
var DivOutput = document.getElementById("DivOutput");
DivOutput.innerHTML = "Количество обнаруженных шрифтов: " + Fonts.length;
var TableOutput = document.getElementById("TableOutput");

for (let index = 0; index < Fonts.length; index++) {
    var tr = document.createElement("tr");

    var th1 = document.createElement("th");
    var th2 = document.createElement("th");
    th1.innerHTML = index + 1;
    th2.innerHTML = Fonts[index];

    tr.appendChild(th1);
    tr.appendChild(th2);
    TableOutput.appendChild(tr);
}
var div = document.getElementById("123");


div.remove(div);


