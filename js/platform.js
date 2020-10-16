let isDatasDownload = false;
let levelIn = 0;
let getId = false;
let id = 0;
let clickDownloads = 0;
let numberClick = 0;
let indicateOfDownload = false;

let currentArrayList = [];
let instrumentList_counter = 0;

let hasDownloads = true; // Показывается ли элемент downloads.

let synchronius = false;
let OKNO = 1; // 1 - выбрано YES, 2 - выбрано NO 

let timeoutVar = false;

// Состояния levelIn:
// 0 - Стартовое меню.
// 1 - Арбитраж оффлайн
// 2 - Арбитраж онлайн
// 3 - Мультиграфик
// 4 - Объемы ФОРТС ММВБ-РТС
// 5 - Опционы
// 6 - Ресурсы
// 7 - Объемы СМЕ
// 8 - Арбитраж версий

let arrayState = [];
let currentIndex = 0;
arrayState[0] = 0;


let currentMultInstruments = [];
currentMultInstrumentsIndex = 0;



function messToStatus(str){
    if(!timeoutVar){
        $(".statusBar-flex p .spanID_02").text(str);
        timeoutVar = setTimeout(function(){$(".statusBar-flex p .spanID_02").text(""); timeoutVar = false;}, 5000);
    }
    else{
        clearTimeout(timeoutVar);
        $(".statusBar-flex p .spanID_02").text(str);
        timeoutVar = setTimeout(function(){$(".statusBar-flex p .spanID_02").text(""); timeoutVar = false;}, 5000);
    }
}


function mySession(){
    let jsonObj = {
        "state" : 2,
        "ID" : id
    };
    // ПЕРЕЗАПИСАТЬ СТРОКУ В БД С НОВЫМ ВРЕМЕНЕМ !!!
    $.ajax({
            type: "POST",
            url: "../php/getId.php",
            data: "jsonObj=" + JSON.stringify(jsonObj),
            async: true, // Асинхронный запрос.
            cache: false
    });
}


/* Инициализируем запрет на выделение текста: */
$(".m1").addClass("unselectable");
$(".m5").addClass("unselectable");
$(".m15").addClass("unselectable");
$(".h1").addClass("unselectable");
$(".h4").addClass("unselectable");
$(".d1").addClass("unselectable");
$(".text").addClass("unselectable");
$(".volume").addClass("unselectable");
$(".arb").addClass("unselectable");
$(".arb_on").addClass("unselectable");
$(".mult").addClass("unselectable");
$(".resources").addClass("unselectable");
$(".arb_versions").addClass("unselectable");
$(".statusBar-flex").addClass("unselectable");
$(".arbOnline").addClass("unselectable");
$(".arbOffline").addClass("unselectable");
$(".plus").addClass("unselectable");
$(".minus").addClass("unselectable");
/* ------------------------------------------ */

// Делаем элементы туулс бара невидимыми, так как на старте работы они не нужны, оставляем только нужные:
$(".flex-container_01").css("display", "none");
$(".comeback").css("display", "none");
// -------------------------------------------------------------------------------
// --------------------------------- События toolsBar: ---------------------------

$(".comeback").click(function(){ // Маршрутизация:
    OKNO = 1;
    $(".yesOn").css("background", "darkred");
    $(".yesOff").css("background", "darkred");
    $(".yesVers").css("background", "darkred");
    $(".noOn").css("background", "darkred");
    $(".noOff").css("background", "darkred");
    $(".noVers").css("background", "darkred");
    $(".downloadPrograms_desc").css("display", "none");
    $(".downloadPrograms_btn").css("display", "none");
    $(".NoInput_On_Div").css("display", "none");
    $(".ASKBTN_ON").css("display", "none");
    $(".noOn").css("display", "block");
    $(".NoInput_Off_Div").css("display", "none");
    $(".ASKBTN_OFF").css("display", "none");
    $(".noOff").css("display", "block");
    $(".NoInput_Vers_Div").css("display", "none");
    $(".ASKBTN_VERS").css("display", "none");
    $(".noVers").css("display", "block");
    
        if (arrayState[currentIndex] === 0) {
            $(".flex-container").css("display", "none");
            $(".comeback").css("display", "none");
            $(".volume").css("grid-row", "1/5");
            $(".arb").css("grid-row", "1/4");
            $(".arb_on").css("grid-row", "1/10");

            $(".volume").css("display", "block");
            $(".arb").css("display", "block");
            $(".arb_on").css("display", "block");
            $(".mult").css("display", "block");
            $(".resources").css("display", "block");
            $(".arb_versions").css("display", "block");
        } else if (arrayState[currentIndex] == 1) {
            $(".btnDatasDownload").css("display", "none");
            $(".comeback").css("display", "none");
            
            $(".arbOfflineSheet").css("display", "none");
            $(".downloadPrograms_desc").css("display", "none");
            $(".downloadPrograms_btn").css("display", "none");

            $(".startMenu").css("display", "block");
            $(".volume").css("display", "block");
            $(".arb").css("display", "block");
            $(".arb_on").css("display", "block");
            $(".mult").css("display", "block");
            $(".resources").css("display", "block");
            $(".arb_versions").css("display", "block");
            
            currentIndex--;
        } else if (arrayState[currentIndex] == 2) {
            $(".btnDatasDownload").css("display", "none");
            $(".comeback").css("display", "none");

            $(".arbOnlineSheet").css("display", "none");
            $(".downloadPrograms_desc").css("display", "none");
            $(".downloadPrograms_btn").css("display", "none");
            
            $(".startMenu").css("display", "block");
            $(".volume").css("display", "block");
            $(".arb").css("display", "block");
            $(".arb_on").css("display", "block");
            $(".mult").css("display", "block");
            $(".resources").css("display", "block");
            $(".arb_versions").css("display", "block");
            
            currentIndex--;
        } else if (arrayState[currentIndex] == 3) {
            $(".btnDatasDownload").css("display", "none");
            $(".comeback").css("display", "none");

            $(".multSheet").css("display", "none");
            $(".downloadPrograms_desc").css("display", "none");
            $(".downloadPrograms_btn").css("display", "none");
            
            $(".startMenu").css("display", "block");
            $(".volume").css("display", "block");
            $(".arb").css("display", "block");
            $(".arb_on").css("display", "block");
            $(".mult").css("display", "block");
            $(".resources").css("display", "block");
            $(".arb_versions").css("display", "block");
            
            currentIndex--;
        } else if (arrayState[currentIndex] == 4) { // Переход с ресурсов...
            $(".resss").css("display", "none");
            $(".comeback").css("display", "none");
            
            $(".startMenu").css("display", "block");
            $(".volume").css("display", "block");
            $(".arb").css("display", "block");
            $(".arb_on").css("display", "block");
            $(".mult").css("display", "block");
            $(".resources").css("display", "block");
            $(".arb_versions").css("display", "block");
            
        } else if (arrayState[currentIndex] == 5) {

        } else if (arrayState[currentIndex] == 6) {

        } else if (arrayState[currentIndex] == 7) {

        } else if (arrayState[currentIndex] == 8) {
            $(".btnDatasDownload").css("display", "none");
            $(".comeback").css("display", "none");

            $(".arbVersionsSheet").css("display", "none");
            $(".downloadPrograms_desc").css("display", "none");
            $(".downloadPrograms_btn").css("display", "none");
            
            $(".startMenu").css("display", "block");
            $(".volume").css("display", "block");
            $(".arb").css("display", "block");
            $(".arb_on").css("display", "block");
            $(".mult").css("display", "block");
            $(".resources").css("display", "block");
            $(".arb_versions").css("display", "block");
        }
        // КАМБЭКИ НАПИМШЕМ ПО МЕРЕ ЗАПОЛНЕНИЯ ВЕТВЕЙ ПЕРЕХОДОВ !!!
});

// --------------------------------- СОБЫТИЯ: ------------------------------------
$(".volume").click(function(){
    messToStatus("  |  At the moment, this action has not yet been implemented...");
//    levelIn = 6;
//    currentIndex++;
//    arrayState[currentIndex] = levelIn;
    //$(".downloadPrograms_desc").css("display", "block");
    //$(".downloadPrograms_btn").css("display", "block");
    // ...
});


$(".resources").click(function(){
    levelIn = 4;
    currentIndex++;
    arrayState[currentIndex] = levelIn;
    
    $(".comeback").css("display", "block");
    $(".startMenu").css("display", "none");
    
    $(".resss").css("display", "block");
});

$(".arb").click(function(){
    levelIn = 1;
    currentIndex++;
    arrayState[currentIndex] = levelIn;
    
    $(".comeback").css("display", "block");
    $(".startMenu").css("display", "none");

    $(".arbOfflineSheet").css("display", "block");
    if(hasDownloads){
        $(".downloadPrograms_desc").css("display", "block");
        $(".downloadPrograms_btn").css("display", "block");
    }
    
    $("#FSOFF1_1").text("");
    $("#FSOFF2_2").text("");
    $("#FSON1_1").text("");
    $("#FSON2_2").text("");
    $("#FSVERS1_1").text("");
    $("#FSVERS2_2").text("");
    $("#FSVERS1").text("");
    $("#FSVERS2").text("");
    $("#FSON1").text("");
    $("#FSON2").text("");
    $("#FSOFF1").text("");
    $("#FSOFF2").text("");
    
    OKNO = 1;
    $(".yesOff").css("background", "darkgreen");
    
    if(isDatasDownload){
        $(".btnDatasDownload").css("display", "none");
    }
    else{
        $(".btnDatasDownload").css("width", "calc(30% - 4px)");
        $(".btnDatasDownload").css("display", "block");
    }
    
});

$(".mult").click(function(){ // 2378
    levelIn = 3;
    currentIndex++;
    arrayState[currentIndex] = levelIn;
    
    $(".comeback").css("display", "block");
    $(".startMenu").css("display", "none");
    
    $(".multSheet").css("display", "block");
    if(hasDownloads){
        $(".downloadPrograms_desc").css("display", "block");
        $(".downloadPrograms_btn").css("display", "block");
    }
    
    if(isDatasDownload){
        $(".btnDatasDownload").css("display", "none");
    }
    else{
        $(".btnDatasDownload").css("width", "calc(50% - 6px)");
        $(".btnDatasDownload").css("display", "block");
    }
});

$(".arb_on").click(function(){
    levelIn = 2;
    currentIndex++;
    arrayState[currentIndex] = levelIn;
    
    $(".comeback").css("display", "block");
    $(".startMenu").css("display", "none");
    
    $(".arbOnlineSheet").css("display", "block");
    if(hasDownloads){
        $(".downloadPrograms_desc").css("display", "block");
        $(".downloadPrograms_btn").css("display", "block");
    }
    $("#FSOFF1_1").text("");
    $("#FSOFF2_2").text("");
    $("#FSON1_1").text("");
    $("#FSON2_2").text("");
    $("#FSVERS1_1").text("");
    $("#FSVERS2_2").text("");
    $("#FSVERS1").text("");
    $("#FSVERS2").text("");
    $("#FSON1").text("");
    $("#FSON2").text("");
    $("#FSOFF1").text("");
    $("#FSOFF2").text("");
    
    OKNO = 1;
    $(".yesOn").css("background", "darkgreen");
    
    if(isDatasDownload){
        $(".btnDatasDownload").css("display", "none");
    }
    else{
        $(".btnDatasDownload").css("width", "calc(30% - 4px)");
        $(".btnDatasDownload").css("display", "block");
    }
    
});

$(".arb_versions").click(function(){
    levelIn = 8;
    currentIndex++;
    arrayState[currentIndex] = levelIn;
    
    $(".comeback").css("display", "block");
    $(".startMenu").css("display", "none");
    
    $(".arbVersionsSheet").css("display", "block");
    if(hasDownloads){
        $(".downloadPrograms_desc").css("display", "block");
        $(".downloadPrograms_btn").css("display", "block");
    }
    
    $("#FSOFF1_1").text("");
    $("#FSOFF2_2").text("");
    $("#FSON1_1").text("");
    $("#FSON2_2").text("");
    $("#FSVERS1_1").text("");
    $("#FSVERS2_2").text("");
    $("#FSVERS1").text("");
    $("#FSVERS2").text("");
    $("#FSON1").text("");
    $("#FSON2").text("");
    $("#FSOFF1").text("");
    $("#FSOFF2").text("");
    
    OKNO = 1;
    $(".yesVers").css("background", "darkgreen");
    
    if(isDatasDownload){
        $(".btnDatasDownload").css("display", "none");
    }
    else{
        $(".btnDatasDownload").css("width", "calc(30% - 4px)");
        $(".btnDatasDownload").css("display", "block");
    }
    
});

$(".btnDatasDownload").click(function(){
    if(numberClick == 0){
        
        let jsonObj = {
            "state" : 1,
            "ID" : id
        }
        
        $.ajax({
            type: "POST",
            url: "../php/getId.php",
            data: "jsonObj=" + JSON.stringify(jsonObj),
            async: true, // Асинхронный запрос.
            cache: false,
            success: function (data) {
                if (data != -1) {
                    getId = true;
                    id = data;
                    
                    // Передали значение в глобальный буфер. Значение будет удалено по окончании сессии:
                    window.sessionStorage.setItem("ID", id);
                    
                    setInterval(mySession, 5000);
                    
                    $.ajax({
                        type: "POST",
                        url: "../php/deleteID.php",
                        data: "ID=" + id
                    });
                    
                    $(".statusBar-flex p .spanID_01").text("Yours sync ID: " + id);
                    $(".statusBar-flex p .spanID_01").css("color", "lime");
                    $(".statusBar-flex p .spanID_02").text("  |  The server has successfully allocated an ID for you to compare...");
                    $(".btnDatasDownload").text("COPY ID TO CLIPBOARD");
                    $("#copyField").css("display", "block");
                    $("#copyField").val(id);
                    messAlert("The server gave you ID: " + id, 200, 5000);
                } else {
                    $(".statusBar-flex p .spanID_02").text("  |  For some reason, the server does not allocate ID. Please try again later...");
                    messAlert("For some reason, the server does not allocate ID. Please try again later...", 200, 5000);
                }
                numberClick++;
            }
        });
    }
    else{
        isDatasDownload = 1;
        let copyText = document.getElementById("copyField");
        copyText.select();
        document.execCommand("copy");
        
        $(".btnDatasDownload").css("opacity", "0");
        setTimeout(function(){
            $(".btnDatasDownload").css("display", "none");
            $("#copyField").css("display", "none");
        }, 500);
        
        // Здесь запускаем временный таймер, который будет отправлять запрос на сервер и проверять файлы на не пустоту. И если они не пустые, то возвращать список инструментов, остановив при этом таймер и отобразив список инструментов на всех соответствующих слоях.
        setInterval(function(){
            
            // Кол-во инструментов в List на текущий момент перед отправкой каждого запроса:
            instrumentList_counter = $(".multSheet div div div .tblSearch").children().length;

            let jsonObj = { // Формируем массив для передачи на сервер и инкапсулируем его в json объект:
                "arrayMove": [id, "List", instrumentList_counter]
            };
            
            $.ajax({
                type: "POST",
                url: "https://invizzz.com:5555/nodejs/listenMQL2.js",
                data: JSON.stringify(jsonObj),
                cache: false,
                success: function (data) {
                    if(data != ""){
                        // В ответ получаем список инструментов...
                            let answerDatas = JSON.parse(data);
                            let getArrayList = answerDatas.arr;
                            let getArrayListLength = answerDatas.new_instrumentList_counter;
                            if(getArrayListLength != instrumentList_counter){
                                // Здесь будем сравнивать актуальный список со старым и корректировать старый список на List:
                                if(instrumentList_counter > 0){ // Если текущий список инструментов НЕ пуст:
                                    
                                    // Удаляем списки:
                                    $(".multSheet div div div .tblSearch").children().detach();
                                    $(".arbVersionsSheet div div div .tblSearch").children().detach();
                                    $(".arbOnlineSheet div div div .tblSearch").children().detach();
                                    $(".arbOfflineSheet div div div .tblSearch").children().detach();
                                    // Удаляем добавляенные элементы:
                                    currentMultInstruments = [];
                                    currentMultInstrumentsIndex = 0;
                                    $(".tblSearch2").detach();
                                    $("#FSVERS1").text("");
                                    $("#FSVERS2").text("");
                                    $("#FSON1").text("");
                                    $("#FSON2").text("");
                                    $("#FSOFF1").text("");
                                    $("#FSOFF2").text("");
                                    $("#FSOFF1_1").text("");
                                    $("#FSOFF2_2").text("");
                                    $("#FSON1_1").text("");
                                    $("#FSON2_2").text("");
                                    $("#FSVERS1_1").text("");
                                    $("#FSVERS2_2").text("");
                                    
                                    $(".arbOnlineSheet .inputOnline_01").val("");
                                    $(".arbOnlineSheet .inputOnline_02").val("");
                                    $(".arbOnlineSheet .inputOnline_01").val("");
                                    $(".arbOfflineSheet .inputOffline_02").val("");
        
                                    // Цикл на добавление:
                                    for(let i=0; i < getArrayList.length; ++i){
                                            // Добавляем элемент под индексом i в конец элемента:
                                            let prepereEl = "<p class='instruments unselectable " + getArrayList[i] + "'>" + getArrayList[i] + "</p>";
                                            $(".multSheet div div div .tblSearch").append(prepereEl);
                                            $(".arbVersionsSheet div div div .tblSearch").append(prepereEl);
                                            $(".arbOnlineSheet div div div .tblSearch").append(prepereEl);
                                            $(".arbOfflineSheet div div div .tblSearch").append(prepereEl);
                                    }
                                    currentArrayList = getArrayList;
                                    instrumentList_counter = getArrayListLength;
                                    synchronius = (instrumentList_counter == 0) ? false : true;
                                }
                                else{ // Если текущий список инструментов пуст:
                                    // Тогда добавляем весь полученный массив, преобразовывая его в элементы во всех соотв. разделах.
                                    currentArrayList = getArrayList;
        
                                    for(let i=0; i < currentArrayList.length; ++i){
                                        let prepereEl = "<p class='instruments unselectable " + currentArrayList[i] + "'>" + currentArrayList[i] + "</p>";
                                        $(".multSheet div div div .tblSearch").append(prepereEl);
                                        $(".arbVersionsSheet div div div .tblSearch").append(prepereEl);
                                        $(".arbOnlineSheet div div div .tblSearch").append(prepereEl);
                                        $(".arbOfflineSheet div div div .tblSearch").append(prepereEl);
                                    }
                                }
                                instrumentList_counter = answerDatas.new_instrumentList_counter;
                                synchronius = (instrumentList_counter == 0) ? false : true;
                            }
                    }
                }
            });
        }, 1500);
    }
});

// -------------------------------------------------------------------------------

// ОБРАБОТКА НАЖАТИЙ НА ДОБАВЛЯЕМЫЕ КНОПКИ ЛЕВОГО СПИСКА:
$(".multSheet div div div .tblSearch").on("click", ".instruments", (event)=>{
    let target = event.target;
    // Получаем название инструмента по которому произошол клик а также размер тика по нему:
    let instrumentN = $(target).text();
    
    let found = false;
    for(let i=0; i < currentMultInstrumentsIndex; ++i){
        if(instrumentN == currentMultInstruments[i]){
            found = true;
            break;
        }
    }
    if(!found){
        
        let prepereEl = "<div class='instrumentsAddedMult unselectable " + instrumentN + "' style='margin-bottom: 1rem; font-size: 14px; width: calc(100% - 3rem); height: 6rem;'>" + instrumentN + "<div style='height: 1rem; width: 100%;'><input id='multLineEdit1_" + currentMultInstrumentsIndex.toString() + "' class='multLineEdit' placeholder='Enter contango/backwardation ratio...'></div><div style='height: 1rem; margin-top: 1rem; width: 100%;'><input id='multLineEdit2_" + currentMultInstrumentsIndex.toString() + "' class='multLineEdit' placeholder='Введите стоимость тика...'></div></div>";
        $(".tblSearch2").append(prepereEl);
        currentMultInstruments[currentMultInstrumentsIndex++] = instrumentN;
    }
});

$(".arbVersionsSheet div div div .tblSearch").on("click", ".instruments", (event)=>{
    let target = event.target;
    // Получаем название инструмента по которому произошол клик а также размер тика по нему:
    let instrumentNTEMP = $(target).text();
    let instrumentN = "";
    let tS = "";
    for(let i=0; i < instrumentNTEMP.length - 1; ++i){
        if(instrumentNTEMP[i] == " " && instrumentNTEMP[i+1] == "|"){
            let j = i+3;
            while(j < instrumentNTEMP.length){
                tS += instrumentNTEMP[j];
                j += 1;
            }
            break;
        }
        else{
            instrumentN += instrumentNTEMP[i];
        }
    }
    
    if(instrumentN != $("#FSVERS1").text() && $("#FSVERS1").text() == ""){
        $("#FSVERS1").text(instrumentN);
        $("#FSVERS1_1").text(tS);
    }
    else if(instrumentN != $("#FSVERS1").text() && $("#FSVERS1").text() != ""){
       if(instrumentN != $("#FSVERS2").text() && $("#FSVERS2").text() == ""){
            $("#FSVERS2").text(instrumentN);
            $("#FSVERS2_2").text(tS);
       }
    }
});

$(".arbOnlineSheet div div div .tblSearch").on("click", ".instruments", (event)=>{
    let target = event.target;
    $(".arbOnlineSheet .inputOnline_01").val("");
    $(".arbOnlineSheet .inputOnline_02").val("");
    // Получаем название инструмента по которому произошол клик а также размер тика по нему:
    let instrumentNTEMP = $(target).text();
    let instrumentN = "";
    let tS = "";
    for(let i=0; i < instrumentNTEMP.length - 1; ++i){
        if(instrumentNTEMP[i] == " " && instrumentNTEMP[i+1] == "|"){
            let j = i+3;
            while(j < instrumentNTEMP.length){
                tS += instrumentNTEMP[j];
                j += 1;
            }
            break;
        }
        else{
            instrumentN += instrumentNTEMP[i];
        }
    }
    
    if(instrumentN != $("#FSON1").text() && $("#FSON1").text() == ""){
        $("#FSON1").text(instrumentN);
        $("#FSON1_1").text(tS);
    }
    else if(instrumentN != $("#FSON1").text() && $("#FSON1").text() != ""){
       if(instrumentN != $("#FSON2").text() && $("#FSON2").text() == ""){
            $("#FSON2").text(instrumentN);
            $("#FSON2_2").text(tS);
       }
    }
});

$(".arbOfflineSheet div div div .tblSearch").on("click", ".instruments", (event)=>{
    let target = event.target;
    $(".arbOfflineSheet .inputOffline_01").val("");
    $(".arbOfflineSheet .inputOffline_02").val("");
    // Получаем название инструмента по которому произошол клик а также размер тика по нему:
    let instrumentNTEMP = $(target).text();
    let instrumentN = "";
    let tS = "";
    for(let i=0; i < instrumentNTEMP.length - 1; ++i){
        if(instrumentNTEMP[i] == " " && instrumentNTEMP[i+1] == "|"){
            let j = i+3;
            while(j < instrumentNTEMP.length){
                tS += instrumentNTEMP[j];
                j += 1;
            }
            break;
        }
        else{
            instrumentN += instrumentNTEMP[i];
        }
    }
    
    if(instrumentN != $("#FSOFF1").text() && $("#FSOFF1").text() == ""){
        $("#FSOFF1").text(instrumentN);
        $("#FSOFF1_1").text(tS);
    }
    else if(instrumentN != $("#FSOFF1").text() && $("#FSOFF1").text() != ""){
       if(instrumentN != $("#FSOFF2").text() && $("#FSOFF2").text() == ""){
            $("#FSOFF2").text(instrumentN);
            $("#FSOFF2_2").text(tS);
       }
    }
});
// -------------------------------------------------------------------------------------
// ОБРАБОТКА НАЖАТИЙ НА ДОБАВЛЯЕМЫЕ КНОПКИ ПРАВОГО СПИСКА:
$(".multSheet div div div .tblSearch2").on("click", ".instrumentsAddedMult", (event)=>{
    let target = event.target;
    let instrumentN = $(target).text();
    
    let onDeleteQueue = false;
    for(let i=0; i < currentMultInstrumentsIndex; ++i){
        if(instrumentN == currentMultInstruments[i]){
            onDeleteQueue = true;
            for(let j=i; j < currentMultInstrumentsIndex - 1; ++j){
                currentMultInstruments[j] = currentMultInstruments[j+1];
            }
            currentMultInstrumentsIndex--;
            break;
        }
    }
    if(onDeleteQueue){
        $(target).detach();
    }
});

$("#FSVERS1").click(function(){
    $("#FSVERS1").text("");
    $("#FSVERS1_1").text("");
});
$("#FSVERS2").click(function(){
    $("#FSVERS2").text("");
    $("#FSVERS2_2").text("");
});

$("#FSON1").click(function(){
    $("#FSON1").text("");
    $("#FSON1_1").text("");
});
$("#FSON2").click(function(){
    $("#FSON2").text("");
    $("#FSON2_2").text("");
});

$("#FSOFF1").click(function(){
    $("#FSOFF1").text("");
    $("#FSOFF1_1").text("");
});
$("#FSOFF2").click(function(){
    $("#FSOFF2").text("");
    $("#FSOFF2_2").text("");
});
// -------------------------------------------------------------------------------------


// Обработка нажатий радиокнопок:
$(".arbOnlineSheet").on("click", ".radioOn", (event)=>{
   let target = event.target;
   if($(target).attr("checked") == null){
       
       for(let i=0; i < 6; ++i){
           $(".arbOnlineSheet .radioBlockTimeFrames input")[i].removeAttribute("checked");
       }
       $(target).attr("checked", "");
   }
    
});
$(".arbOfflineSheet").on("click", ".radioOff", (event)=>{
   let target = event.target;
   if($(target).attr("checked") == null){
       
       for(let i=0; i < 6; ++i){
           $(".arbOfflineSheet .radioBlockTimeFrames input")[i].removeAttribute("checked");
       }
       $(target).attr("checked", "");
   }
    
});
$(".multSheet").on("click", ".radioMult", (event)=>{
   let target = event.target;
   if($(target).attr("checked") == null){
       
       for(let i=0; i < 6; ++i){
           $(".multSheet .radioBlockTimeFrames input")[i].removeAttribute("checked");
       }
       $(target).attr("checked", "");
   }
    
});
$(".arbVersionsSheet").on("click", ".radioVers", (event)=>{
   let target = event.target;
   if($(target).attr("checked") == null){
       
       for(let i=0; i < 6; ++i){
           $(".arbVersionsSheet .radioBlockTimeFrames input")[i].removeAttribute("checked");
       }
       $(target).attr("checked", "");
   }
    
});
// --------------------------------------------------------------------------------------
// ОБРАБОТКА НАЖАТИЙ КНОПОК ПО РАСЧЕТУ КОЭФФИЦИЕНТОВ:
$(".arbOnlineSheet .btnKoefOnline").click(function(){ // Расчет коэффициентов:
    if($(".arbOnlineSheet div div div #FSON1").text() == "" || $(".arbOnlineSheet div div div #FSON2").text() == ""){
        messToStatus("  |  You didn't add the minimum number of synthetics tools...");
    }
    else{
        let regVariableTest = new RegExp("^[0-9]+$");
        if($("#inputOnline_03").val() == ""){
            messToStatus("  |  Field required for calculating the coefficient is not filled!");
            $("#inputOnline_03").css("background", "red");
            setTimeout(function(){
                $("#inputOnline_03").css("background", "darkred");
            }, 2000);
        }
        else{
            if(!(regVariableTest.test($("#inputOnline_03").val()))){
                messToStatus("  |  The field required for calculating the coefficient is not filled in correctly!");
                $("#inputOnline_03").css("background", "red");
                setTimeout(function(){
                    $("#inputOnline_03").css("background", "darkred");
                }, 2000);
            }
            else{
                if($("#inputOnline_03").val() > 3000){
                    messToStatus("  |  Restriction: no more than 3000 bar can be specified!");
                    $("#inputOnline_03").css("background", "red");
                    setTimeout(function(){
                        $("#inputOnline_03").css("background", "darkred");
                    }, 2000);
                }
                else{
                    if(($("#inputOnline_03").val())[0] == "0"){
                        messToStatus("  |  The field number of bars is not filled in correctly!");
                        $("#inputOnline_03").css("background", "red");
                        setTimeout(function(){
                            $("#inputOnline_03").css("background", "darkred");
                        }, 2000);
                    }
                    else{
                        $(".arbOnlineSheet .inputOnline_01").val("");
                        $(".arbOnlineSheet .inputOnline_02").val("");

                        let barsValue = $("#inputOnline_03").val();
                        let arrRadio = $(".arbOnlineSheet .radioOn");
                        let checkIndex = -1;
                        for(let i=0; i < 6; ++i){
                            if(arrRadio[i].getAttribute("checked") != null){
                                checkIndex = i;
                                break;
                            }
                        }

                        checkIndex = (checkIndex == 0) ? 1 : (checkIndex == 1) ? 5 : (checkIndex == 2) ? 15 : (checkIndex == 3) ? 60 : (checkIndex == 4) ? 240 : 1440;
                        
                        let instrName_01 = $(".arbOnlineSheet div div div #FSON1").text();
                        let instrName_02 = $(".arbOnlineSheet div div div #FSON2").text();

                        let request = {
                            "arrayMove" : [id, "KOEFVOLA", instrName_01, instrName_02, checkIndex.toString(), barsValue, $("#FSON1_1").text(), $("#FSON2_2").text()]
                        };

                        // ПРОВЕРИТЬ СУЩЕСТВУЮТ ЛИ ФАЙЛЫ с историей текущих инструментов:
                        let searchFilesRequest = {
                            "arrayMove" : [id, "SEARCHFILES", instrName_01, instrName_02, checkIndex.toString()]
                        };

                        let jsonRequest = {
                            "arrayMove" : [id, "NEWORDER", "GETHISTORY;" + instrName_01 + ";" + checkIndex + ";3000;|GETHISTORY;" + instrName_02 + ";" + checkIndex + ";3000;|"]
                        };
                        
                        messAlert("Wait, odds are being calculated...");
                        $(".noneSheet").css("display", "block");
                        $(".windows8").css("display", "block");
                        indicateOfDownload = true;
                        
                        $.ajax({
                                type: "POST",
                                url: "https://invizzz.com:5555/nodejs/listenMQL2.js",
                                data: JSON.stringify(searchFilesRequest),
                                cache: false,
                                success: function (data){
                                    if(data.toString() == "true"){ // Если файлы найдены...
                                        if(OKNO == 1){
                                            alert("Файлы изначально найдены...");
                                            // ОТПРАВЛЕНИЕ ЗАПРОСА НА РАСЧЕТ КОЭФФИЦИЕНТОВ:
                                            $.ajax({
                                                type: "POST",
                                                url: "https://invizzz.com:5555/nodejs/listenMQL2.js",
                                                data: JSON.stringify(request),
                                                cache: false,
                                                success: function (data){
                                                    let ans = data.toString();
                                                    if(ans == "ERROR"){
                                                        alert("Коэффициент НЕ получен... Произошла ошибка...");
                                                        
                                                        $(".noneSheet").css("display", "none");
                                                        $(".windows8").css("display", "none");
                                                        indicateOfDownload = false;
                                                    }
                                                    else if(ans == "NONE"){
                                                        alert("Коэффициент НЕ получен... Попробуйте, повторить попытку...");
                                                        
                                                        $(".noneSheet").css("display", "none");
                                                        $(".windows8").css("display", "none");
                                                        indicateOfDownload = false;
                                                        
                                                    }
                                                    else{
                                                        alert("Коэффициент получен...");
                                                    
                                                        $(".noneSheet").css("display", "none");
                                                        $(".windows8").css("display", "none");
                                                        indicateOfDownload = false;
                                                        
                                                        // В качестве ответа получаем строку: koef:
                                                        let one = 1;
                                                        let two = data.toString();
    
                                                        $(".arbOnlineSheet .inputOnline_01").val(one);
                                                        $(".arbOnlineSheet .inputOnline_02").val(two);
                                                    }
                                                }
                                            });
                                        }
                                        else{ // == 2
                                            alert("Раздел категории ответа НЕТ...");
                                            
                                            let userEnter = $(".NoInput_On").val();
                                            let regularVar = new RegExp("^[0-9]+[\.,]?[0-9]*$");
                                            if(!(regularVar.test(userEnter))){
                                                
                                                $(".noneSheet").css("display", "none");
                                                $(".windows8").css("display", "none");
                                                indicateOfDownload = false;
                                                
                                                messToStatus("  |  The tick value ratio field is filled incorrectly!");
                                                $(".NoInput_On").css("background", "red");
                                                setTimeout(function(){
                                                    $(".NoInput_On").css("background", "darkred");
                                                }, 2000);
                                            }
                                            else{
                                                // ОТПРАВЛЕНИЕ ЗАПРОСА НА РАСЧЕТ КОЭФФИЦИЕНТОВ:
                                                $.ajax({
                                                    type: "POST",
                                                    url: "https://invizzz.com:5555/nodejs/listenMQL2.js",
                                                    data: JSON.stringify(request),
                                                    cache: false,
                                                    success: function (data){
                                                        let ans = data.toString();
                                                        if(ans == "ERROR"){
                                                            alert("Коэффициент НЕ получен... Произошла ошибка...");
                                                            
                                                            $(".noneSheet").css("display", "none");
                                                            $(".windows8").css("display", "none");
                                                            indicateOfDownload = false;
                                                        }
                                                        else if(ans == "NONE"){
                                                            alert("Коэффициент НЕ получен... Попробуйте, повторить попытку...");
                                                            
                                                            $(".noneSheet").css("display", "none");
                                                            $(".windows8").css("display", "none");
                                                            indicateOfDownload = false;
                                                            
                                                        }
                                                        else{
                                                            alert("Коэффициент получен...");
                                                        
                                                            $(".noneSheet").css("display", "none");
                                                            $(".windows8").css("display", "none");
                                                            indicateOfDownload = false;
                                                            
                                                            // В качестве ответа получаем строку: koef:
                                                            let one = 1;
                                                            let two = data.toString();
        
                                                            $(".arbOnlineSheet .inputOnline_01").val(one);
                                                            $(".arbOnlineSheet .inputOnline_02").val(two);
                                                        }
                                                    }
                                                });
                                            }
                                        }
                                    }
                                    else{ // == false:
                                        // ОТПРАВЛЯЕМ GET ПРИКАЗ НА ПОЛУЧЕНИЕ ИСТОРИИ ПО ИНСТРУМЕНТАМ:
                                        alert("Файлы изначально не найдены !!!");
                                        $.ajax({
                                            type: "POST",
                                            url: "https://invizzz.com:5555/nodejs/listenMQL2.js",
                                            data: JSON.stringify(jsonRequest),
                                            cache: false,
                                            success: function (data){
                                                if(data == "true"){
                                                    let interval = setInterval(function(){
                                                        console.log("!!!");
                                                        $.ajax({
                                                                type: "POST",
                                                                url: "https://invizzz.com:5555/nodejs/listenMQL2.js",
                                                                data: JSON.stringify(searchFilesRequest),
                                                                cache: false,
                                                                success: function (data){
                                                                    if(data.toString() == "true"){ // Если файлы найдены...
                                                                        clearInterval(interval);
                                                                        alert("Файлы были найдены...");
                                                                        if(OKNO == 1){
                                                                            // ОТПРАВЛЕНИЕ ЗАПРОСА НА РАСЧЕТ КОЭФФИЦИЕНТОВ:
                                                                            $.ajax({
                                                                                type: "POST",
                                                                                url: "https://invizzz.com:5555/nodejs/listenMQL2.js",
                                                                                data: JSON.stringify(request),
                                                                                cache: false,
                                                                                success: function (data){
                                                                                    let ans = data.toString();
                                                                                    if(ans == "ERROR"){
                                                                                        alert("Коэффициент НЕ получен... Произошла ошибка...");
                                                                                        
                                                                                        $(".noneSheet").css("display", "none");
                                                                                        $(".windows8").css("display", "none");
                                                                                        indicateOfDownload = false;
                                                                                    }
                                                                                    else if(ans == "NONE"){
                                                                                        alert("Коэффициент НЕ получен... Попробуйте, повторить попытку...");
                                                                                        
                                                                                        $(".noneSheet").css("display", "none");
                                                                                        $(".windows8").css("display", "none");
                                                                                        indicateOfDownload = false;
                                                                                        
                                                                                    }
                                                                                    else{
                                                                                        alert("Коэффициент получен...");
                                                                                    
                                                                                        $(".noneSheet").css("display", "none");
                                                                                        $(".windows8").css("display", "none");
                                                                                        indicateOfDownload = false;
                                                                                        
                                                                                        // В качестве ответа получаем строку: koef:
                                                                                        let one = 1;
                                                                                        let two = data.toString();
                                    
                                                                                        $(".arbOnlineSheet .inputOnline_01").val(one);
                                                                                        $(".arbOnlineSheet .inputOnline_02").val(two);
                                                                                    }
                                                                                }
                                                                            });
                                                                        }
                                                                        else{ // == 2
                                                                            alert("Раздел категории ответа НЕТ...");
                                                                            let userEnter = $(".NoInput_On").val();
                                                                            let regularVar = new RegExp("^[0-9]+[\.,]?[0-9]*$");
                                                                            if(!(regularVar.test(userEnter))){
                                                                                messToStatus("  |  The tick value ratio field is filled incorrectly!");
                                                                               
                                                                                $(".noneSheet").css("display", "none");
                                                                                $(".windows8").css("display", "none");
                                                                                indicateOfDownload = false;
                                                                                
                                                                                $(".NoInput_On").css("background", "red");
                                                                                setTimeout(function(){
                                                                                    $(".NoInput_On").css("background", "darkred");
                                                                                }, 2000);
                                                                            }
                                                                            else{
                                                                                // ОТПРАВЛЕНИЕ ЗАПРОСА НА РАСЧЕТ КОЭФФИЦИЕНТОВ:
                                                                                $.ajax({
                                                                                    type: "POST",
                                                                                    url: "https://invizzz.com:5555/nodejs/listenMQL2.js",
                                                                                    data: JSON.stringify(request),
                                                                                    cache: false,
                                                                                    success: function (data){
                                                                                        let ans = data.toString();
                                                                                        if(ans == "ERROR"){
                                                                                            alert("Коэффициент НЕ получен... Произошла ошибка...");
                                                                                            
                                                                                            $(".noneSheet").css("display", "none");
                                                                                            $(".windows8").css("display", "none");
                                                                                            indicateOfDownload = false;
                                                                                        }
                                                                                        else if(ans == "NONE"){
                                                                                            alert("Коэффициент НЕ получен... Попробуйте, повторить попытку...");
                                                                                            
                                                                                            $(".noneSheet").css("display", "none");
                                                                                            $(".windows8").css("display", "none");
                                                                                            indicateOfDownload = false;
                                                                                            
                                                                                        }
                                                                                        else{
                                                                                            alert("Коэффициент получен...");
                                                                                        
                                                                                            $(".noneSheet").css("display", "none");
                                                                                            $(".windows8").css("display", "none");
                                                                                            indicateOfDownload = false;
                                                                                            
                                                                                            // В качестве ответа получаем строку: koef:
                                                                                            let one = 1;
                                                                                            let two = data.toString();
                                        
                                                                                            $(".arbOnlineSheet .inputOnline_01").val(one);
                                                                                            $(".arbOnlineSheet .inputOnline_02").val(two);
                                                                                        }
                                                                                    }
                                                                                });
                                                                            }
                                                                        }

                                                                    }
                                                                }
                                                        });
                                                    }, 500);
                                                }
                                                else{
                                                    messToStatus("  |  Error: History order will not be executed...");
                                                }
                                            }
                                        });
                                    }
                                }
                        });
                    }
                }
            }
        }
    }
});
// -------------------------------------------------------------------------------------

// ОБРАБОТЧИКИ КНОПОК YES И NO:
$(".yesOn").click(function(){
    if(synchronius){
        if(OKNO == 1){}
        else{ // == 2
            OKNO = 1;
            $(".yesOn").css("background", "darkgreen");
        }
        $(".askOn").css("font-size", "18px");
        $(".askOn").css("padding-top", "0");
        $(".askOn").text("Are the tick values of the 1st and the 2nd instrument equivalent with the same position volume?");
        $(".NoInput_On_Div").css("display", "none");
        $(".ASKBTN_ON").css("display", "none");
        $(".noOn").css("display", "block");
    }
    else{
        messToStatus("  |  You have not synchronized the portal with any terminal...");
    }
});

$(".noOn").click(function(){
    if(synchronius){
        if(OKNO == 1){
            OKNO = 2;
            $(".yesOn").css("background", "darkred");
        }
        else{} // == 2

        $(".askOn").text("Enter the result of dividing the tick values of the 1st instrument by the 2nd, with a position volume of 1 lot");
        $(".askOn").css("padding-top", "0.2rem");
        $(".askOn").css("font-size", "14px");
        $(".noOn").css("display", "none");
        $(".NoInput_On_Div").css("display", "block");
        $(".ASKBTN_ON").css("display", "block");
        $(".NoInput_On").focus();
    }
    else{
        messToStatus("  |  You have not synchronized the portal with any terminal...");
    }
});

$(".yesOff").click(function(){
    if(synchronius){
        if(OKNO == 1){}
        else{ // == 2
            OKNO = 1;
            $(".yesOff").css("background", "darkgreen");
        }
        
        $(".askOff").css("font-size", "18px");
        $(".askOff").css("padding-top", "0");
        $(".askOff").text("Are the tick values of the 1st and the 2nd instrument equivalent with the same position volume?");
        $(".NoInput_Off_Div").css("display", "none");
        $(".ASKBTN_OFF").css("display", "none");
        $(".noOff").css("display", "block");
        
    }
    else{
        messToStatus("  |  You have not synchronized the portal with any terminal...");
    }
});

$(".noOff").click(function(){
    if(synchronius){
        if(OKNO == 1){
            OKNO = 2;
            $(".yesOff").css("background", "darkred");
        }
        else{} // == 2
        
        $(".askOff").text("Enter the result of dividing the tick values of the 1st instrument by the 2nd, with a position volume of 1 lot");
        $(".askOff").css("padding-top", "0.2rem");
        $(".askOff").css("font-size", "14px");
        $(".noOff").css("display", "none");
        $(".NoInput_Off_Div").css("display", "block");
        $(".ASKBTN_OFF").css("display", "block");
        $(".NoInput_Off").focus();
        
    }
    else{
        messToStatus("  |  You have not synchronized the portal with any terminal...");
    }
});

$(".yesVers").click(function(){
    if(synchronius){
        if(OKNO == 1){}
        else{ // == 2
            OKNO = 1;
            $(".yesVers").css("background", "darkgreen");
        }
        
        $(".askVers").css("font-size", "18px");
        $(".askVers").css("padding-top", "0");
        $(".askVers").text("Are the tick values of the 1st and the 2nd instrument equivalent with the same position volume?");
        $(".NoInput_Vers_Div").css("display", "none");
        $(".ASKBTN_VERS").css("display", "none");
        $(".noVers").css("display", "block");
        
    }
    else{
        messToStatus("  |  You have not synchronized the portal with any terminal...");
    }
});

$(".noVers").click(function(){
    if(synchronius){
        if(OKNO == 1){
            OKNO = 2;
            $(".yesVers").css("background", "darkred");
        }
        else{} // == 2
        
        $(".askVers").text("Enter the result of dividing the tick values of the 1st instrument by the 2nd, with a position volume of 1 lot");
        $(".askVers").css("padding-top", "0.2rem");
        $(".askVers").css("font-size", "14px");
        $(".noVers").css("display", "none");
        $(".NoInput_Vers_Div").css("display", "block");
        $(".ASKBTN_VERS").css("display", "block");
        $(".NoInput_Vers").focus();
        
    }
    else{
        messToStatus("  |  You have not synchronized the portal with any terminal...");
    }
});
// --------------------------------------------------------------------------------------

// ОБРАБОТКА КНОПОК "ПОСТРОИТЬ":
$(".arbOnlineSheet .btnSpreadOnline").click(function(){
    if(OKNO == 1){ // ДА
        
        // СБОР ДАННЫХ:
        let attitude = "1";
        let instrumentName_01 = $("#FSON1").val();
        let instrumentName_02 = $("#FSON2").val();
        
        if(synchronius){
            if(instrumentName_01 != ""){
                if(instrumentName_02 != ""){
                    
                    let firstKoef = $("#inputOnline_01").val();
                    let secondKoef = $("#inputOnline_02").val();

                    let regular = new RegExp("^[0-9]+[\.,]?[0-9]*$");
                    let regular2 = new RegExp("^[1-9]{1}$");

                    if(regular.test(firstKoef)){
                        let correctInput1 = false;
                        if(firstKoef.length > 1){
                            if(firstKoef[0] == "0" && (firstKoef[1] != "." || firstKoef[1] != ",")){
                                messToStatus("  |  Incorrect entry of the coefficient for the 1st instrument...");
                                $("#inputOnline_01").css("background", "red");
                                 setTimeout(function(){
                                     $("#inputOnline_01").css("background", "darkred");
                                 }, 2000);
                            }
                            else if(firstKoef[firstKoef.length-1] == "." || firstKoef[firstKoef.length-1] == ","){
                                messToStatus("  |  Incorrect entry of the coefficient for the 1st instrument...");
                                $("#inputOnline_01").css("background", "red");
                                 setTimeout(function(){
                                     $("#inputOnline_01").css("background", "darkred");
                                 }, 2000);
                            }
                            else{
                                correctInput1 = true;
                            }
                        }
                        else{
                            if(!(regular2.test(firstKoef))){
                                messToStatus("  |  Incorrect entry of the coefficient for the 1st instrument...");
                                $("#inputOnline_01").css("background", "red");
                                 setTimeout(function(){
                                     $("#inputOnline_01").css("background", "darkred");
                                 }, 2000);
                            }
                            else{
                                correctInput1 = true;
                            }
                        }
                        if(correctInput1){

                            if(regular.test(secondKoef)){
                                let correctInput2 = false;
                                if(secondKoef.length > 1){
                                    if(secondKoef[0] == "0" && (secondKoef[1] != "." || secondKoef[1] != ",")){
                                        messToStatus("  |  Incorrect entry of the coefficient for the 2st instrument...");
                                        $("#inputOnline_02").css("background", "red");
                                         setTimeout(function(){
                                             $("#inputOnline_02").css("background", "darkred");
                                         }, 2000);
                                    }
                                    else if(secondKoef[secondKoef.length-1] == "." || secondKoef[secondKoef.length-1] == ","){
                                        messToStatus("  |  Incorrect entry of the coefficient for the 2st instrument...");
                                        $("#inputOnline_02").css("background", "red");
                                         setTimeout(function(){
                                             $("#inputOnline_02").css("background", "darkred");
                                         }, 2000);
                                    }
                                    else{
                                        correctInput2 = true;
                                    }
                                }
                                else{
                                    if(!(regular2.test(firstKoef))){
                                        messToStatus("  |  Incorrect entry of the coefficient for the 2st instrument...");
                                        $("#inputOnline_02").css("background", "red");
                                         setTimeout(function(){
                                             $("#inputOnline_02").css("background", "darkred");
                                         }, 2000);
                                    }
                                    else{
                                        correctInput2 = true;
                                    }
                                }
                                if(correctInput2){

                                    let checkIndex = -1;
                                    for(let i=0; i < 6; ++i){
                                        if(arrRadio[i].getAttribute("checked") != null){
                                            checkIndex = i;
                                            break;
                                        }
                                    }

                                    checkIndex = (checkIndex == 0) ? 1 : (checkIndex == 1) ? 5 : (checkIndex == 2) ? 15 : (checkIndex == 3) ? 60 : (checkIndex == 4) ? 240 : 1140;
                                    
                                    // СОБРАННЫЕ ДАННЫЕ:
                                    // instrumentName_01 - Название первого инструмента с названием брокера
                                    // instrumentName_02 - Название второго инструмента с названием брокера
                                    // checkIndex - Таймфрейм.
                                    // firstKoef - Коэффициент 1ого инструмента
                                    // secondKoef - Коэффициент 2ого инструмента
                                    // attitude - соотношение стоимостей тиков. (По умолчанию == 1)
                                    
                                    // ОТПРАВЛЯЕМ ПРИКАЗЫ НА ПОЛУЧЕНИЕ ИСТОРИИ И ПОСТУПЛЕНИЕ ДАННЫХ !!!
                                    
                                    let searchFilesRequest = {
                                        "arrayMove" : [id, "SEARCHFILES", instrumentName_01, instrumentName_02, checkIndex.toString()]
                                    };

                                    let jsonRequest = {
                                        "arrayMove" : [id, "NEWORDER", "GETHISTORY;" + instrumentName_01 + ";" + checkIndex + ";3000;|GETHISTORY;" + instrumentName_02 + ";" + checkIndex + ";3000;|"]
                                    };

                                    
                                    
                                    
                                    
                                    $.ajax({ // ПРОВЕРИТЬ СУЩЕСТВУЮТ ЛИ ФАЙЛЫ tick.datas текущих инструментов:
                                        type: "POST",
                                        url: "https://invizzz.com:5555/nodejs/listenMQL2.js",
                                        data: JSON.stringify(searchFilesRequest),
                                        cache: false,
                                        success: function (data){
                                            if(data.toString() == "true"){ // Если файлы найдены...
                                                alert("Files didn't find...");
                                                // ОТПРАВЛЕНИЕ ЗАПРОСА НА ПОЛУЧЕНИЕ ДАННЫХ:
                                                    
                                                // ...
                                                    
                                                    
                                            }
                                            else{ // == false:
                                                // ОТПРАВЛЯЕМ GET ПРИКАЗ НА ПОЛУЧЕНИЕ ИСТОРИИ ПО ИНСТРУМЕНТАМ:
                                                alert("Files didn't find !!!");
                                                $.ajax({
                                                    type: "POST",
                                                    url: "https://invizzz.com:5555/nodejs/listenMQL2.js",
                                                    data: JSON.stringify(jsonRequest),
                                                    cache: false,
                                                    success: function (data){
                                                        if(data == "true"){
                                                            let interval = setInterval(function(){
                                                                $.ajax({
                                                                        type: "POST",
                                                                        url: "https://invizzz.com:5555/nodejs/listenMQL2.js",
                                                                        data: JSON.stringify(searchFilesRequest),
                                                                        cache: false,
                                                                        success: function (data){
                                                                            if(data.toString() == "true"){ // Если файлы найдены...
                                                                                alert("Files is find...");
                                                                                // ОТПРАВЛЕНИЕ ЗАПРОСА НА ПОЛУЧЕНИЕ ДАННЫХ:

                                                                                // ...


                                                                            }
                                                                        }
                                                                });
                                                            }, 500);
                                                        }
                                                        else{
                                                            messToStatus("  |  Error: History order will not be executed...");
                                                        }
                                                    }
                                                });
                                            }
                                        }
                                    });
                                }
                            }
                            else{
                                 messToStatus("  |  Incorrect entry of the coefficient for the 2nd instrument...");
                                 $("#inputOnline_02").css("background", "red");
                                 setTimeout(function(){
                                     $("#inputOnline_02").css("background", "darkred");
                                 }, 2000);
                            }
                        }
                    }
                    else{
                         messToStatus("  |  Incorrect entry of the result of dividing the tick value by tick...");
                         $(".arbOnlineSheet .NoInput_On").css("background", "red");
                         setTimeout(function(){
                             $(".arbOnlineSheet .NoInput_On").css("background", "darkred");
                         }, 2000);
                    }     
                    
                }
                else{
                    messToStatus("  |  The minimum number of instruments for building synthetics has not been added!");
                }
            }
            else{
                messToStatus("  |  The minimum number of instruments for building synthetics has not been added!");
            }
        }
        else{
            messToStatus("  |  You have not synchronized the portal with any terminal...");
        }
    }
    else{ // НЕТ
        let attitude = $(".arbOnlineSheet .NoInput_On").val();
        let regAnswer = new RegExp("^[0-9]+[\.,]?[0-9]*$");
        
        // СБОР ДАННЫХ:
        let instrumentName_01 = $("#FSON1").val();
        let instrumentName_02 = $("#FSON2").val();
        
        if(synchronius){
            if(instrumentName_01 != ""){
                if(instrumentName_02 != ""){
                    
                    let firstKoef = $("#inputOnline_01").val();
                    let secondKoef = $("#inputOnline_02").val();

                    let regular = new RegExp("^[0-9]+[\.,]?[0-9]*$");
                    let regular2 = new RegExp("^[1-9]{1}$");
                    
                    if(!(regAnswer.test(attitude))){
                        messToStatus("  |  The tick value ratio field is filled incorrectly!");
                        $(".NoInput_On").css("background", "red");
                        setTimeout(function(){
                            $(".NoInput_On").css("background", "darkred");
                        }, 2000);
                    }
                    else{
                        let booleanFlag = false;
                        if(attitude.length > 1){
                            if(attitude[0] == "0" && (attitude[1] != "." || attitude[1] != ",")){
                                messToStatus("  |  ПThe tick value ratio field is filled incorrectly!");
                                $(".NoInput_On").css("background", "red");
                                 setTimeout(function(){
                                     $(".NoInput_On").css("background", "darkred");
                                 }, 2000);
                            }
                            else if(attitude[attitude.length-1] == "." || attitude[attitude.length-1] == ","){
                                messToStatus("  |  The tick value ratio field is filled incorrectly!");
                                $(".NoInput_On").css("background", "red");
                                 setTimeout(function(){
                                     $(".NoInput_On").css("background", "darkred");
                                 }, 2000);
                            }
                            else{
                                booleanFlag = true;
                            }
                        }
                        else{
                            if(!(regular2.test(attitude))){
                                messToStatus("  |  The tick value ratio field is filled incorrectly!");
                                $(".NoInput_On").css("background", "red");
                                 setTimeout(function(){
                                     $(".NoInput_On").css("background", "darkred");
                                 }, 2000);
                            }
                            else{
                                booleanFlag = true;
                            }
                        }
                        if(booleanFlag){
                            if(regular.test(firstKoef)){
                                let correctInput1 = false;
                                if(firstKoef.length > 1){
                                    if(firstKoef[0] == "0" && (firstKoef[1] != "." || firstKoef[1] != ",")){
                                        messToStatus("  |  Incorrect entry of the coefficient for the 1st instrument...");
                                        $("#inputOnline_01").css("background", "red");
                                         setTimeout(function(){
                                             $("#inputOnline_01").css("background", "darkred");
                                         }, 2000);
                                    }
                                    else if(firstKoef[firstKoef.length-1] == "." || firstKoef[firstKoef.length-1] == ","){
                                        messToStatus("  |  Incorrect entry of the coefficient for the 1st instrument...");
                                        $("#inputOnline_01").css("background", "red");
                                         setTimeout(function(){
                                             $("#inputOnline_01").css("background", "darkred");
                                         }, 2000);
                                    }
                                    else{
                                        correctInput1 = true;
                                    }
                                }
                                else{
                                    if(!(regular2.test(firstKoef))){
                                        messToStatus("  |  Incorrect entry of the coefficient for the 1st instrument...");
                                        $("#inputOnline_01").css("background", "red");
                                         setTimeout(function(){
                                             $("#inputOnline_01").css("background", "darkred");
                                         }, 2000);
                                    }
                                    else{
                                        correctInput1 = true;
                                    }
                                }
                                if(correctInput1){

                                    if(regular.test(secondKoef)){
                                        let correctInput2 = false;
                                        if(secondKoef.length > 1){
                                            if(secondKoef[0] == "0" && (secondKoef[1] != "." || secondKoef[1] != ",")){
                                                messToStatus("  |  Incorrect entry of the coefficient for the 2st instrument...");
                                                $("#inputOnline_02").css("background", "red");
                                                 setTimeout(function(){
                                                     $("#inputOnline_02").css("background", "darkred");
                                                 }, 2000);
                                            }
                                            else if(secondKoef[secondKoef.length-1] == "." || secondKoef[secondKoef.length-1] == ","){
                                                messToStatus("  |  Incorrect entry of the coefficient for the 2st instrument...");
                                                $("#inputOnline_02").css("background", "red");
                                                 setTimeout(function(){
                                                     $("#inputOnline_02").css("background", "darkred");
                                                 }, 2000);
                                            }
                                            else{
                                                correctInput2 = true;
                                            }
                                        }
                                        else{
                                            if(!(regular2.test(firstKoef))){
                                                messToStatus("  |  Incorrect entry of the coefficient for the 2st instrument...");
                                                $("#inputOnline_02").css("background", "red");
                                                 setTimeout(function(){
                                                     $("#inputOnline_02").css("background", "darkred");
                                                 }, 2000);
                                            }
                                            else{
                                                correctInput2 = true;
                                            }
                                        }
                                        if(correctInput2){

                                            let checkIndex = -1;
                                            for(let i=0; i < 6; ++i){
                                                if(arrRadio[i].getAttribute("checked") != null){
                                                    checkIndex = i;
                                                    break;
                                                }
                                            }

                                            checkIndex = (checkIndex == 0) ? 1 : (checkIndex == 1) ? 5 : (checkIndex == 2) ? 15 : (checkIndex == 3) ? 60 : (checkIndex == 4) ? 240 : 1140;

                                            // СОБРАННЫЕ ДАННЫЕ:
                                            // instrumentName_01 - Название первого инструмента с названием брокера
                                            // instrumentName_02 - Название второго инструмента с названием брокера
                                            // checkIndex - Таймфрейм.
                                            // firstKoef - Коэффициент 1ого инструмента
                                            // secondKoef - Коэффициент 2ого инструмента
                                            // attitude - соотношение стоимостей тиков. (По умолчанию == 1)

                                            // ОТПРАВЛЯЕМ ПРИКАЗЫ НА ПОЛУЧЕНИЕ ИСТОРИИ И ПОСТУПЛЕНИЕ ДАННЫХ !!!

                                            let searchFilesRequest = {
                                                "arrayMove" : [id, "SEARCHFILES", instrumentName_01, instrumentName_02, checkIndex.toString()]
                                            };

                                            let jsonRequest = {
                                                "arrayMove" : [id, "NEWORDER", "GETHISTORY;" + instrumentName_01 + ";" + checkIndex + ";3000;|GETHISTORY;" + instrumentName_02 + ";" + checkIndex + ";3000;|"]
                                            };





                                            $.ajax({ // ПРОВЕРИТЬ СУЩЕСТВУЮТ ЛИ ФАЙЛЫ tick.datas текущих инструментов:
                                                type: "POST",
                                                url: "https://invizzz.com:5555/nodejs/listenMQL2.js",
                                                data: JSON.stringify(searchFilesRequest),
                                                cache: false,
                                                success: function (data){
                                                    if(data.toString() == "true"){ // Если файлы найдены...
                                                        alert("Файлы изначально найдены...");
                                                        // ОТПРАВЛЕНИЕ ЗАПРОСА НА ПОЛУЧЕНИЕ ДАННЫХ:

                                                        // ...


                                                    }
                                                    else{ // == false:
                                                        // ОТПРАВЛЯЕМ GET ПРИКАЗ НА ПОЛУЧЕНИЕ ИСТОРИИ ПО ИНСТРУМЕНТАМ:
                                                        alert("Файлы изначально не найдены !!!");
                                                        $.ajax({
                                                            type: "POST",
                                                            url: "https://invizzz.com:5555/nodejs/listenMQL2.js",
                                                            data: JSON.stringify(jsonRequest),
                                                            cache: false,
                                                            success: function (data){
                                                                if(data == "true"){
                                                                    let interval = setInterval(function(){
                                                                        $.ajax({
                                                                                type: "POST",
                                                                                url: "https://invizzz.com:5555/nodejs/listenMQL2.js",
                                                                                data: JSON.stringify(searchFilesRequest),
                                                                                cache: false,
                                                                                success: function (data){
                                                                                    if(data.toString() == "true"){ // Если файлы найдены...
                                                                                        alert("Файлы изначально найдены...");
                                                                                        // ОТПРАВЛЕНИЕ ЗАПРОСА НА ПОЛУЧЕНИЕ ДАННЫХ:

                                                                                        // ...


                                                                                    }
                                                                                }
                                                                        });
                                                                    }, 500);
                                                                }
                                                                else{
                                                                    messToStatus("  |  Error: History order will not be executed...");
                                                                }
                                                            }
                                                        });
                                                    }
                                                }
                                            });
                                        }
                                    }
                                    else{
                                         messToStatus("  |  Incorrect entry of the coefficient for the 2nd instrument...");
                                         $("#inputOnline_02").css("background", "red");
                                         setTimeout(function(){
                                             $("#inputOnline_02").css("background", "darkred");
                                         }, 2000);
                                    }
                                }
                            }
                            else{
                                 messToStatus("  |  Incorrect entry of the result of dividing the tick value by tick...");
                                 $(".arbOnlineSheet .NoInput_On").css("background", "red");
                                 setTimeout(function(){
                                     $(".arbOnlineSheet .NoInput_On").css("background", "darkred");
                                 }, 2000);
                            }
                        }
                    }
                }
                else{
                    messToStatus("  |  The minimum number of instruments for building synthetics has not been added!");
                }
            }
            else{
                messToStatus("  |  The minimum number of instruments for building synthetics has not been added!");
            }
        }
        else{
            messToStatus("  |  You have not synchronized the portal with any terminal...");
        }
    }
});

/*
$(".arbOfflineSheet .btnSpreadOffline").click(function(){
    
});

$(".multSheet .btnMult").click(function(){
    
});

$(".arbVersionsSheet .btnSpreadOffline").click(function(){
    
});
*/
// --------------------------------------------------------------------------------------

$(".downloadPrograms_descBTN").on("click", function(){
    if($("#cubikSheet").attr("data-state") == "0"){
        $("#cubikSheet").attr("data-state", "1");
        $("#btn_01").click();
        setTimeout(function(){
            $("#Right").click();
        }, 500);
    }
    else{
        $("#btn_01").click();
        $("#cubikSheet").attr("data-state", "0");
        setTimeout(function(){
            $("#btn_01").click();
            $("#cubikSheet").attr("data-state", "1");
            setTimeout(function(){
                $("#Right").click();
            }, 500);
        }, 1100);
    }
});

$(".downloadPrograms_btn").on("click", function(){
    hasDownloads = false;
    $(".downloadPrograms_desc").css("height", "0px");
    setTimeout(function(){
        $(".downloadPrograms_btn").css("height", "0px");
        setTimeout(function(){
            $(".downloadPrograms_desc").css("display", "none");
            $(".downloadPrograms_btn").css("display", "none");
        }, 1000);
    }, 1000);
});

