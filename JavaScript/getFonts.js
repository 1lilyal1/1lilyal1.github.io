//Текст по которому будет сравниватся размер старого и нового шрифта
var testString = 'AS1HWWW2mmMM30oO-4+Ii';

var textSize = '100px';

//Стандартные шрифты
var baseFonts = ['monospace', 'sans-serif', 'serif'];

//Возможно установленные шрифты
var fontList = [
    'AA Haymaker',
    'Achi',
    'Agency FB',
    'Ailerons',
    'Aqua',
    'Arabic Typesetting',
    'Arial Unicode MS',
    'ARNO PRO',
    'AvantGarde Bk BT',
    'BankGothic Md BT',
    'Batang',
    'Bitstream Vera Sans Mono',
    'BROZAS',
    'Calama',
    'Calibri',
    'Capture it',
    'Century',
    'Century Gothic',
    'Clarendon',
    'CocoBiker Regular-trial',
    'Comfortaa',
    'Cooper Hewitt',
    'El Messiri',
    'EUROSTILE',
    'fantasy',
    'Franklin Gothic',
    'Futura Bk BT',
    'Futura Md BT',
    'Gagalin',
    'Gill Sans',
    'GOTHAM',
    'Gvozdi',
    'Haettenschweiler',
    'HeinrichScript',
    'HELV',
    'Helvetica Neue',
    'Higher',
    'Humanst521 BT',
    'IBM Plex',
    'Isabella-Decor',
    'Kolikö',
    'Kollektif',
    'Komoda',
    'KOYSAN',
    'Leelawadee',
    'Letter Gothic',
    'Levenim MT',
    'Lucida Bright',
    'Lucida Sans',
    'Marlett',
    'Meiryo UI',
    'Menlo',
    'Metropolis 1920',
    'Microsoft Uighur',
    'Minion Pro',
    'Misto',
    'Modeka',
    'monospace',
    'Monotype Corsiva',
    'MS Mincho',
    'MS Outlook',
    'MS Reference Specialty',
    'MS UI Gothic',
    'MT Extra',
    'MYRIAD PRO',
    'Nordic',
    'One Day',
    'Parley',
    'PMingLiU',
    'Polya',
    'Pristina',
    'Radnika',
    'RBNo2',
    'RF Krabuler',
    'sans-serif-thin',
    'SCRIPTINA',
    'Seb Neue',
    'Segoe UI Light',
    'Serifa',
    'SimHei',
    'Small Fonts',
    'Staccato222 BT',
    'TRAJAN PRO',
    'Univers CE 55 Medium',
    'Vrinda',
    'Yanone Kaffeesatz',
    'JOURNALISM',
];

function getFonts() {
    var div123 = document.getElementById("123");
    div123.style.fontSize = textSize;
    div123.style.color = "#FFFFFF"

    var СontainerForComparison = document.createElement('div');
    var defaultWidth = {};
    var defaultHeight = {};
    //Создание куча элементов чтобы потом сравнить их размеры
    var createSpan = function (fontFamily) {
        var span = document.createElement('span');
        var style = span.style;
        style.position = 'absolute';
        style.fontFamily = fontFamily;
        span.textContent = testString;
        СontainerForComparison.appendChild(span);
        return span;
    };

    // Создание элементов с базывами шрифтами
    var initializeBaseFontsSpans = function () {
        return baseFonts.map(createSpan);
    };

    // Создание шрифтов с необычными шрифтами
    var createSpanWithFonts = function (fontToDetect, baseFont) {
        return createSpan("'" + fontToDetect + "'," + baseFont);
    };

    var initializeFontsSpans = function () {
        var spans = {};
        var _loop_1 = function (font) {
            spans[font] = baseFonts.map(function (baseFont) { return createSpanWithFonts(font, baseFont); });
        };
        for (var _i = 0, fontList_1 = fontList; _i < fontList_1.length; _i++) {
            var font = fontList_1[_i];
            _loop_1(font);
        }
        return spans;
    };

    var baseFontsSpans = initializeBaseFontsSpans();
    var fontsSpans = initializeFontsSpans();

    div123.appendChild(СontainerForComparison);
    for (var index = 0; index < baseFonts.length; index++) {
        defaultWidth[baseFonts[index]] = baseFontsSpans[index].offsetWidth; // ширина по умолчанию
        defaultHeight[baseFonts[index]] = baseFontsSpans[index].offsetHeight; // высота по умолчанию
    }

    // проверяет, доступен ли шрифт, сравнивание стандартный размер с новым
    var isFontAvailable = function (fontSpans) {
        return baseFonts.some(function (baseFont, baseFontIndex) {
            return fontSpans[baseFontIndex].offsetWidth !== defaultWidth[baseFont] ||
                fontSpans[baseFontIndex].offsetHeight !== defaultHeight[baseFont];
        });
    };
    return fontList.filter(function (font) { return isFontAvailable(fontsSpans[font]); });
}
