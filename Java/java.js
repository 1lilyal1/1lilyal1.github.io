
var ArrayMatchup = ""
function readFile(object) {
    var file = object.files[0]
    var reader = new FileReader()

    reader.onload = function () {
        ArrayMatchup = CSVToArray(reader.result)
        var Maps = []
        var Player = []
        for (let i = 1; i < ArrayMatchup.length; i++) {
            var ResultString = ArrayMatchup[i]
            if (ResultString[0] == "") {
                continue;
            }
            Maps.push(ResultString[0])
            Player.push(ResultString[1])
            Player.push(ResultString[3])
        }

        Maps = Array.from(new Set(Maps)); //удаление повторов
        Player = Array.from(new Set(Player));
        let MapsDiv = document.getElementById("MapsDiv");
        let PlayerDiv = document.getElementById("PlayerDiv");
        
        for (let i = 0; i < Maps.length; i++) { // добавление чекбосов с картами и дальше с игроками
            let label = document.createElement('label');
            let input = document.createElement('input');
            input.type = "checkbox"
         
            label.appendChild(input)
            label.innerHTML += " " + Maps[i] + "<br>"
            MapsDiv.appendChild(label)
        }

        for (let i = 0; i < Player.length; i++) { 
            let label = document.createElement('label');
            let input = document.createElement('input');
            input.type = "checkbox"
            input.onclick = LoadStatictik
            label.appendChild(input)
            label.innerHTML += " " + Player[i] + "<br>"
            PlayerDiv.appendChild(label)
        }
        CreateCheckbox = false
        ChekBoxIsChecked(".ScrollClass input", true)

        let ChekBox = document.querySelectorAll(".ScrollClass input"); //Добавить всем чексбоксам событие
        for (let i = 0; i < ChekBox.length; i++) {
            if (ChekBox[i].type === "checkbox") {
                ChekBox[i].onclick = LoadStatictik
            }
        }

        LoadStatictik()
    }
    reader.readAsText(file)
}

function LoadStatictik() {
    var Races = [
        "h",
        "o",
        "u",
        "n"
    ]
    var RacesWin = new Object();
    var RacesLoses = new Object();
    for (let index = 0; index < Races.length; index++) {
        RacesWin[Races[index]] = 0
        RacesLoses[Races[index]] = 0
    }

    var Matchup = [
        "hn",
        "ho",
        "hu",
        "nh",
        "no",
        "nu",
        "oh",
        "on",
        "ou",
        "uh",
        "un",
        "uo"
    ]
    var MatchupWin = new Object();
    var MatchupLoses = new Object();
    for (let index = 0; index < Matchup.length; index++) {
        MatchupWin[Matchup[index]] = 0
        MatchupLoses[Matchup[index]] = 0
    }


    // Last Refuge,	Eer0,	u,	Sok,	h
    for (let i = 1; i < ArrayMatchup.length; i++) {
        var ResultString = ArrayMatchup[i]

        if (ResultString[0] == "") {
            continue;
        }

        if (!FilterArray(ResultString[0], "#MapsDiv label")) {
            continue;
        }

        if (!FilterArray(ResultString[1], "#PlayerDiv label")) {
            continue;
        }

        if (!FilterArray(ResultString[3], "#PlayerDiv label")) {
            continue;
        }
        
        if (ResultString[2] != ResultString[4]) {
            RacesWin[ResultString[2]]++
            RacesLoses[ResultString[4]]++
            MatchupWin[ResultString[2] + ResultString[4]]++
            MatchupLoses[ResultString[4] + ResultString[2]]++
        }
    }

    ResetTable("TableRaceOut");
    ResetTable("TableMatchupOut");

    for (let i = 0; i < Races.length; i++) {
        AddTr("TableRaceOut", [
            Races[i], 
            ((100 * RacesWin[Races[i]]) / (RacesWin[Races[i]] + RacesLoses[Races[i]])).toFixed(2),
            RacesWin[Races[i]], 
            RacesLoses[Races[i]]]);
    }

    AddTr("TableMatchupOut",
        ["Human",
            "-",
        ((100 * MatchupWin["ho"]) / (MatchupWin["ho"] + MatchupLoses["ho"])).toFixed(2) + " (" + MatchupWin["ho"] + "/" + MatchupLoses["ho"] + ")",
        ((100 * MatchupWin["hu"]) / (MatchupWin["hu"] + MatchupLoses["hu"])).toFixed(2) + " (" + MatchupWin["hu"] + "/" + MatchupLoses["hu"] + ")",
        ((100 * MatchupWin["hn"]) / (MatchupWin["hn"] + MatchupLoses["hn"])).toFixed(2) + " (" + MatchupWin["hn"] + "/" + MatchupLoses["hn"] + ")",
        ]);


    AddTr("TableMatchupOut",
        ["Ork",
        ((100 * MatchupWin["oh"]) / (MatchupWin["oh"] + MatchupLoses["oh"])).toFixed(2) + " (" + MatchupWin["oh"] + "/" + MatchupLoses["oh"] + ")",
        "-",
        ((100 * MatchupWin["ou"]) / (MatchupWin["ou"] + MatchupLoses["ou"])).toFixed(2) + " (" + MatchupWin["ou"] + "/" + MatchupLoses["ou"] + ")",
        ((100 * MatchupWin["on"]) / (MatchupWin["on"] + MatchupLoses["on"])).toFixed(2) + " (" + MatchupWin["on"] + "/" + MatchupLoses["on"] + ")",
        ]);


    AddTr("TableMatchupOut",
        ["Undead",
        ((100 * MatchupWin["uh"]) / (MatchupWin["uh"] + MatchupLoses["uh"])).toFixed(2) + " (" + MatchupWin["uh"] + "/" + MatchupLoses["uh"] + ")",
        ((100 * MatchupWin["uo"]) / (MatchupWin["uo"] + MatchupLoses["uo"])).toFixed(2) + " (" + MatchupWin["uo"] + "/" + MatchupLoses["uo"] + ")",
        "-",
        ((100 * MatchupWin["un"]) / (MatchupWin["un"] + MatchupLoses["un"])).toFixed(2) + " (" + MatchupWin["un"] + "/" + MatchupLoses["un"] + ")",
        ]);

    AddTr("TableMatchupOut",
        ["Elf",
        ((100 * MatchupWin["nh"]) / (MatchupWin["nh"] + MatchupLoses["nh"])).toFixed(2) + " (" + MatchupWin["nh"] + "/" + MatchupLoses["nh"] + ")",
        ((100 * MatchupWin["no"]) / (MatchupWin["no"] + MatchupLoses["no"])).toFixed(2) + " (" + MatchupWin["no"] + "/" + MatchupLoses["no"] + ")",
        ((100 * MatchupWin["nu"]) / (MatchupWin["nu"] + MatchupLoses["nu"])).toFixed(2) + " (" + MatchupWin["nu"] + "/" + MatchupLoses["nu"] + ")",
        "-",
        ]);
}

//Включение/выключение chekbox определённого класса
function ChekBoxIsChecked(ArrayChekBox, IsChecked){
    let ChekBox = document.querySelectorAll(ArrayChekBox); //включить все чексбоксы
    for (let i = 0; i < ChekBox.length; i++) {
        if (ChekBox[i].type === "checkbox") {
            ChekBox[i].checked = IsChecked;
        }
    }
    LoadStatictik();
}


//#region Отметка чексбоксов по паттерну
function ChekPattern(ArrayLabel, Pattern) {
    let Labels = document.querySelectorAll(ArrayLabel); //включить все чексбоксы
    var ArrayPattern = []

    if (Pattern == 0) {
        ArrayPattern = [
            "Last Refuge",
            "Northern Isles",
            "Terenas Stand LV",
            "Amazonia",
            "Concealed Hill",
            "Echo Isles",
            "Turtle Rock",
            "Twisted Meadows",
            "Autumn Leaves"
        ]
    }else   {
        ArrayPattern = [
            "Happy",
            "Lyn",
            "Eer0",
            "Fly100%",
            "Infi",
            "Moon",
            "LawLiet",
            "TeD",
            "VortiX",
            "Fortitude",
            "FoCuS",
            "Chaemiko",
            "Foggy",
            "Michael",
            "Sok",
            "Hitman",
            "15sui",
            "CrunCher",
            "XlorD",
            "Soin",
            "Colorful",
            "Grubby",
            "XiaoKai",
            "HawK",
            "KraV",
            "无道oc",
            "Sini",
            "Yange",
            "JohnnyCage",
            "Blade",
        ]
    }

    for (let i = 0; i < Labels.length; i++) {
        if (ArrayPattern.indexOf(Labels[i].innerText.trim()) != -1) {
            Labels[i].children[0].checked = true
        }
        else Labels[i].children[0].checked = false
    }

    LoadStatictik();
}
//#endregion


//#region Работа с таблицами
//Добавление строк к таблице
function AddTr(TableOut, arrayCells){
    let Table = document.getElementById(TableOut);
    let tr = document.createElement('tr');
    for (let index = 0; index < arrayCells.length; index++) {
        let td = document.createElement('td');
        td.innerHTML = arrayCells[index]
        tr.appendChild(td)
    }
    Table.appendChild(tr);
}
//Очистка строк в таблице
function ResetTable(TableOut){
    let Table = document.getElementById(TableOut);
    Table.textContent = '';
}
//Очистка строк в таблице
function FilterArray(TableOut){
    let Table = document.getElementById(TableOut);
    Table.textContent = '';
}
//#endregion

//#region Фильтр
//Поиск игроков и карт
///FilterInput - текст по которому фильтруется, ArrayFilterLabel - элементы где проходит фильтр (скрываемые элементы)
function InputTextFilter(FilterInput, ArrayFilterLabel){
    let FilterText = document.getElementById(FilterInput).value;
    let Label = document.querySelectorAll(ArrayFilterLabel); //найти все пометки
    if (FilterText == "") {
        for (let i = 0; i < Label.length; i++) {
            if (Label[i].innerText.trim() != "") {
                Label[i].style.display = 'block'
            } else {
                Label[i].style.display = 'none'
            }
        }
        return;
    }
    for (let i = 0; i < Label.length; i++) {
        var TextLabel = Label[i].innerText.trim()
        if (Levenshtein(TextLabel, FilterText) < 2 && TextLabel != "") {
            Label[i].style.display = 'block'
        }else
        {
            Label[i].style.display = 'none'
        }
    }
}

//Фильтр статистики
//InputString текст по который будет сравниваться, CheckBoxArray тектс по которым ищеться чексбоксы
function FilterArray(InputString, LabelArray){
    let Labels = document.querySelectorAll(LabelArray); //найти все пометки
    for (let i = 0; i < Labels.length; i++) {
        if (InputString ==  Labels[i].innerText.trim()) {
            if (Labels[i].children[0].checked == true) {
                return true
            } else {
                return false
            }
        }
    }

    return false
}
//#endregion


//#region Функции из интернета
function CSVToArray(strData, strDelimiter ){
    // Check to see if the delimiter is defined. If not,
    // then default to comma.
    strDelimiter = (strDelimiter || ",");

    // Create a regular expression to parse the CSV values.
    var objPattern = new RegExp(
        (
            // Delimiters.
            "(\\" + strDelimiter + "|\\r?\\n|\\r|^)" +

            // Quoted fields.
            "(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +

            // Standard fields.
            "([^\"\\" + strDelimiter + "\\r\\n]*))"
        ),
        "gi"
        );


    // Create an array to hold our data. Give the array
    // a default empty first row.
    var arrData = [[]];

    // Create an array to hold our individual pattern
    // matching groups.
    var arrMatches = null;


    // Keep looping over the regular expression matches
    // until we can no longer find a match.
    while (arrMatches = objPattern.exec( strData )){

        // Get the delimiter that was found.
        var strMatchedDelimiter = arrMatches[ 1 ];

        // Check to see if the given delimiter has a length
        // (is not the start of string) and if it matches
        // field delimiter. If id does not, then we know
        // that this delimiter is a row delimiter.
        if (
            strMatchedDelimiter.length &&
            strMatchedDelimiter !== strDelimiter
            ){

            // Since we have reached a new row of data,
            // add an empty row to our data array.
            arrData.push( [] );

        }

        var strMatchedValue;

        // Now that we have our delimiter out of the way,
        // let's check to see which kind of value we
        // captured (quoted or unquoted).
        if (arrMatches[ 2 ]){

            // We found a quoted value. When we capture
            // this value, unescape any double quotes.
            strMatchedValue = arrMatches[ 2 ].replace(
                new RegExp( "\"\"", "g" ),
                "\""
                );

        } else {

            // We found a non-quoted value.
            strMatchedValue = arrMatches[ 3 ];

        }


        // Now that we have our value string, let's add
        // it to the data array.
        arrData[ arrData.length - 1 ].push( strMatchedValue );
    }

    // Return the parsed data.
    return( arrData );
}

//Алогритм для фильтра
function Levenshtein(s1, s2, costs) {
    var i, j, l1, l2, flip, ch, chl, ii, ii2, cost, cutHalf;
    l1 = s1.length;
    l2 = s2.length;

    costs = costs || {};
    var cr = costs.replace || 1;
    var cri = costs.replaceCase || costs.replace || 1;
    var ci = costs.insert || 1;
    var cd = costs.remove || 1;

    cutHalf = flip = Math.max(l1, l2);

    var minCost = Math.min(cd, ci, cr);
    var minD = Math.max(minCost, (l1 - l2) * cd);
    var minI = Math.max(minCost, (l2 - l1) * ci);
    var buf = new Array((cutHalf * 2) - 1);

    for (i = 0; i <= l2; ++i) {
        buf[i] = i * minD;
    }

    for (i = 0; i < l1; ++i, flip = cutHalf - flip) {
        ch = s1[i];
        chl = ch.toLowerCase();

        buf[flip] = (i + 1) * minI;

        ii = flip;
        ii2 = cutHalf - flip;

        for (j = 0; j < l2; ++j, ++ii, ++ii2) {
            cost = (ch === s2[j] ? 0 : (chl === s2[j].toLowerCase()) ? cri : cr);
            buf[ii + 1] = Math.min(buf[ii2 + 1] + cd, buf[ii] + ci, buf[ii2] + cost);
        }
    }
    return buf[l2 + cutHalf - flip];
}
//#endregion