// Variables:
let levelIn = 0;
let id = 0; // ---
let indicateOfDownload = false; // ???
let OKNO = 1; // 1 - выбрано YES, 2 - выбрано NO // +++
let timeoutVar = false; // +++
let timeoutVar3 = false; // +++
let timeoutVar4 = false; // +++

let currentMultInstruments = []; // Right list
let currentMultInstrumentsIndex = 0;


getList(); // Получение списка инструментов и истории !!!
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

// -------------------------------------------------------------------------------
// Functions:
function messToStatus(str){
    setTimeout(()=>{
        if(!timeoutVar){
            $(".statusBar-flex p .spanID_02").text(str);
            timeoutVar = setTimeout(function(){$(".statusBar-flex p .spanID_02").text(""); timeoutVar = false;}, 5000);
        }
        else{
            clearTimeout(timeoutVar);
            $(".statusBar-flex p .spanID_02").text(str);
            timeoutVar = setTimeout(function(){$(".statusBar-flex p .spanID_02").text(""); timeoutVar = false;}, 5000);
        }
    }, 0);
}

function messToStatus3(str){
    setTimeout(()=>{
        if(!timeoutVar3){
            $(".statusBar-flex p .spanID_03").text(str);
            timeoutVar3 = setTimeout(function(){$(".statusBar-flex p .spanID_03").text(""); timeoutVar3 = false;}, 5000);
        }
        else{
            clearTimeout(timeoutVar3);
            $(".statusBar-flex p .spanID_03").text(str);
            timeoutVar3 = setTimeout(function(){$(".statusBar-flex p .spanID_03").text(""); timeoutVar3 = false;}, 5000);
        }
    }, 0);
}
function messToStatus4(str){
    setTimeout(()=>{
        if(!timeoutVar4){
            $(".statusBar-flex p .spanID_04").text(str);
            timeoutVar4 = setTimeout(function(){$(".statusBar-flex p .spanID_04").text(""); timeoutVar4 = false;}, 5000);
        }
        else{
            clearTimeout(timeoutVar4);
            $(".statusBar-flex p .spanID_04").text(str);
            timeoutVar4 = setTimeout(function(){$(".statusBar-flex p .spanID_04").text(""); timeoutVar4 = false;}, 5000);
        }
    }, 0);
}
// -------------------------------------------------------------------------------

// Делаем элементы туулс бара невидимыми, так как на старте работы они не нужны, оставляем только нужные:
$(".flex-container_01").css("display", "none");
$(".comeback").css("display", "none");
// -------------------------------------------------------------------------------
// --------------------------------- События toolsBar: ---------------------------

$(".comeback").click(function(){ // Маршрутизация:
    OKNO = 1;
    $(".yesOn").css("background", "darkred");
    $(".yesOff").css("background", "darkred");
    $(".noOn").css("background", "darkred");
    $(".noOff").css("background", "darkred");
    $(".NoInput_On_Div").css("display", "none");
    $(".ASKBTN_ON").css("display", "none");
    $(".noOn").css("display", "block");
    $(".NoInput_Off_Div").css("display", "none");
    $(".ASKBTN_OFF").css("display", "none");
    $(".noOff").css("display", "block");
    
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
        } else if (arrayState[currentIndex] == 1) {
            $(".comeback").css("display", "none");
            
            $(".arbOfflineSheet").css("display", "none");

            $(".startMenu").css("display", "block");
            $(".volume").css("display", "block");
            $(".arb").css("display", "block");
            $(".arb_on").css("display", "block");
            $(".mult").css("display", "block");
            $(".resources").css("display", "block");
            
            currentIndex--;
        } else if (arrayState[currentIndex] == 2) {
            $(".comeback").css("display", "none");

            $(".arbOnlineSheet").css("display", "none");
            
            $(".startMenu").css("display", "block");
            $(".volume").css("display", "block");
            $(".arb").css("display", "block");
            $(".arb_on").css("display", "block");
            $(".mult").css("display", "block");
            $(".resources").css("display", "block");
            
            currentIndex--;
        } else if (arrayState[currentIndex] == 3) {
            $(".comeback").css("display", "none");

            $(".multSheet").css("display", "none");
            
            $(".startMenu").css("display", "block");
            $(".volume").css("display", "block");
            $(".arb").css("display", "block");
            $(".arb_on").css("display", "block");
            $(".mult").css("display", "block");
            $(".resources").css("display", "block");
            
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
            
        } else if (arrayState[currentIndex] == 5) {

        } else if (arrayState[currentIndex] == 6) {

        } else if (arrayState[currentIndex] == 7) {

        } else if (arrayState[currentIndex] == 8) {
            $(".comeback").css("display", "none");
            
            $(".startMenu").css("display", "block");
            $(".volume").css("display", "block");
            $(".arb").css("display", "block");
            $(".arb_on").css("display", "block");
            $(".mult").css("display", "block");
            $(".resources").css("display", "block");
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
    
});

$(".mult").click(function(){ // 2378
    levelIn = 3;
    currentIndex++;
    arrayState[currentIndex] = levelIn;
    
    $(".comeback").css("display", "block");
    $(".startMenu").css("display", "none");
    
    $(".multSheet").css("display", "block");
    
});

$(".arb_on").click(function(){
    levelIn = 2;
    currentIndex++;
    arrayState[currentIndex] = levelIn;
    
    $(".comeback").css("display", "block");
    $(".startMenu").css("display", "none");
    
    $(".arbOnlineSheet").css("display", "block");
    
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
    
});

// -------------------------------------------------------------------------------
// Обработка события - подсказки:
$(".ASKBTN_ON p").on("click", ()=>{
    messAlert("Enter the result of ratio tick price the first instrument on tick price the second instrument...", 200, 5000);
});
$(".ASKBTN_OFF p").on("click", ()=>{
    messAlert("Enter the result of ratio tick price the first instrument on tick price the second instrument...", 200, 5000);
});
// -------------------------------------------------

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
        let prepereEl = "<div class='instrumentsAddedMult unselectable " + instrumentN + "' style='margin-bottom: 1rem; font-size: 14px; width: calc(100% - 3rem); height: 3rem;'>" + instrumentN + "<div style='height: 1rem; margin-top: 0; width: 100%;'><input id='multLineEdit_" + currentMultInstrumentsIndex.toString() + "' class='multLineEdit' placeholder='Введите стоимость тика...'></div></div>";
        $(".tblSearch2").append(prepereEl);
        currentMultInstruments[currentMultInstrumentsIndex++] = instrumentN;
    }
});

$(".arbOnlineSheet div div div .tblSearch").on("click", ".instruments", (event)=>{
    let target = event.target;
    
    $(".arbOnlineSheet .inputOnline_01").val("");
    $(".arbOnlineSheet .inputOnline_02").val("");
    
    let instrumentN = $(target).text();

    if(instrumentN != $("#FSON1").text() && $("#FSON1").text() == ""){
        $("#FSON1").text(instrumentN);
    }
    else if(instrumentN != $("#FSON1").text() && $("#FSON1").text() != ""){
       if(instrumentN != $("#FSON2").text() && $("#FSON2").text() == ""){
            $("#FSON2").text(instrumentN);
       }
    }
});

$(".arbOfflineSheet div div div .tblSearch").on("click", ".instruments", (event)=>{
    let target = event.target;
    
    $(".arbOfflineSheet .inputOffline_01").val("");
    $(".arbOfflineSheet .inputOffline_02").val("");
    
    let instrumentN = $(target).text();
    
    if(instrumentN != $("#FSOFF1").text() && $("#FSOFF1").text() == ""){
        $("#FSOFF1").text(instrumentN);
    }
    else if(instrumentN != $("#FSOFF1").text() && $("#FSOFF1").text() != ""){
       if(instrumentN != $("#FSOFF2").text() && $("#FSOFF2").text() == ""){
            $("#FSOFF2").text(instrumentN);
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

// ОБРАБОТКА НАЖАТИЙ КНОПОК ПО РАСЧЕТУ КОЭФФИЦИЕНТОВ:
$(".arbOnlineSheet .btnKoefOnline").click(function () { // Расчет коэффициентов:
    if ($(".arbOnlineSheet div div div #FSON1").text() == "" || $(".arbOnlineSheet div div div #FSON2").text() == "") {
        messToStatus("  |  You didn't add the minimum number of synthetics tools...");
    } else {
        let regVariableTest = new RegExp("^[0-9]+$");
        if ($("#inputOnline_03").val() == "") {
            messToStatus("  |  Field required for calculating the coefficient is not filled!");
            $("#inputOnline_03").css("background", "red");
            setTimeout(function () {
                $("#inputOnline_03").css("background", "darkred");
            }, 2000);
        }
        else {
            if (!(regVariableTest.test($("#inputOnline_03").val()))) {
                messToStatus("  |  The field required for calculating the coefficient is not filled in correctly!");
                $("#inputOnline_03").css("background", "red");
                setTimeout(function () {
                    $("#inputOnline_03").css("background", "darkred");
                }, 2000);
            }
            else {
                $(".arbOnlineSheet .inputOnline_01").val("");
                $(".arbOnlineSheet .inputOnline_02").val("");

                let barsValue = $("#inputOnline_03").val();

                let instrName_01 = $(".arbOnlineSheet div div div #FSON1").text();
                let instrName_02 = $(".arbOnlineSheet div div div #FSON2").text();


                if (OKNO == 1) {
                    let arg = {
                        "arr" : [instrName_01, instrName_02, barsValue]
                    };
                    let data = getKoef(arg);
                            if (data) {
                                if(data.toString() == "ERROR"){
                                    messAlert("Something went wrong...", 200, 3000);
                                }
                                else if(data.toString() == "INF"){
                                    messAlert("Error in terminals API...", 200, 3000);
                                }
                                else if(data.toString() == "TFERROR"){ // Нет смысла сравнивать инструменты разных таймфреймов.
                                    messAlert("It makes no sense to compare instruments of different timeframes.", 200, 3000);
                                }
                                else{
                                    let one = "1.0";
                                    let two = data.toString(); // ???

                                    $(".arbOnlineSheet .inputOnline_01").val(one);
                                    $(".arbOnlineSheet .inputOnline_02").val(two);
                                }
                            }
                }
                else { // == 2
                    let userEnter = $(".NoInput_On").val();
                    let regularVar = new RegExp("^[0-9]+[\.,]?[0-9]*$");
                    if (!(regularVar.test(userEnter))) {
                        messToStatus("  |  The tick value ratio field is filled incorrectly!");
                        $(".NoInput_On").css("background", "red");
                        setTimeout(function () {
                            $(".NoInput_On").css("background", "darkred");
                        }, 2000);
                    }
                    else {
                        
                        let data = getKoef({"arr": [instrName_01, instrName_02, barsValue]});

                                if (data) {
                                    
                                    if(data.toString() == "ERROR"){
                                        messAlert("Something went wrong...", 200, 3000);
                                    }
                                    else if(data.toString() == "INF"){
                                        messAlert("Error in terminals API...", 200, 3000);
                                    }
                                    else if(data.toString() == "TFERROR"){ // Нет смысла сравнивать инструменты разных таймфреймов.
                                        messAlert("It makes no sense to compare instruments of different timeframes.", 200, 3000);
                                    }
                                    else{
                                        let one = "1.0";
                                        let two = (Number(data.toString())*Number(userEnter)).toString();

                                        $(".arbOnlineSheet .inputOnline_01").val(one);
                                        $(".arbOnlineSheet .inputOnline_02").val(two);
                                    }
                                }
                    }
                }
            }
        }
    }
});

$(".arbOfflineSheet .btnKoefOffline").click(function () { // Расчет коэффициентов:
    if ($(".arbOfflineSheet div div div #FSOFF1").text() == "" || $(".arbOfflineSheet div div div #FSOFF2").text() == "") {
        messToStatus("  |  You didn't add the minimum number of synthetics tools...");
    } else {
        let regVariableTest = new RegExp("^[0-9]+$");
        if ($("#inputOffline_03").val() == "") {
            messToStatus("  |  Field required for calculating the coefficient is not filled!");
            $("#inputOffline_03").css("background", "red");
            setTimeout(function () {
                $("#inputOffline_03").css("background", "darkred");
            }, 2000);
        }
        else {
            if (!(regVariableTest.test($("#inputOffline_03").val()))) {
                messToStatus("  |  The field required for calculating the coefficient is not filled in correctly!");
                $("#inputOffline_03").css("background", "red");
                setTimeout(function () {
                    $("#inputOffline_03").css("background", "darkred");
                }, 2000);
            }
            else {
                $(".arbOfflineSheet .inputOffline_01").val("");
                $(".arbOfflineSheet .inputOffline_02").val("");

                let barsValue = $("#inputOffline_03").val();

                let instrName_01 = $(".arbOfflineSheet div div div #FSOFF1").text();
                let instrName_02 = $(".arbOfflineSheet div div div #FSOFF2").text();


                if (OKNO == 1) {
                    let data = getKoef({"arr": [instrName_01, instrName_02, barsValue]});
                            if (data) {
                                if(data.toString() == "ERROR"){
                                    messAlert("Something went wrong...", 200, 3000);
                                }
                                else if(data.toString() == "INF"){
                                    messAlert("Error in terminals API...", 200, 3000);
                                }
                                else if(data.toString() == "TFERROR"){ // Нет смысла сравнивать инструменты разных таймфреймов.
                                    messAlert("It makes no sense to compare instruments of different timeframes.", 200, 3000);
                                }
                                else{
                                    let one = "1.0";
                                    let two = data.toString(); // ???

                                    $(".arbOfflineSheet .inputOffline_01").val(one);
                                    $(".arbOfflineSheet .inputOffline_02").val(two);
                                }
                            }
                }
                else { // == 2
                    let userEnter = $(".NoInput_Off").val();
                    let regularVar = new RegExp("^[0-9]+[\.,]?[0-9]*$");
                    if (!(regularVar.test(userEnter))) {
                        messToStatus("  |  The tick value ratio field is filled incorrectly!");
                        $(".NoInput_Off").css("background", "red");
                        setTimeout(function () {
                            $(".NoInput_Off").css("background", "darkred");
                        }, 2000);
                    }
                    else {
                        
                        let data = getKoef({"arr": [instrName_01, instrName_02, barsValue]});

                                if (data) {
                                    
                                    if(data.toString() == "ERROR"){
                                        messAlert("Something went wrong...", 200, 3000);
                                    }
                                    else if(data.toString() == "INF"){
                                        messAlert("Error in terminals API...", 200, 3000);
                                    }
                                    else if(data.toString() == "TFERROR"){ // Нет смысла сравнивать инструменты разных таймфреймов.
                                        messAlert("It makes no sense to compare instruments of different timeframes.", 200, 3000);
                                    }
                                    else{
                                        let one = "1.0";
                                        let two = (Number(data.toString())*Number(userEnter)).toString();

                                        $(".arbOfflineSheet .inputOffline_01").val(one);
                                        $(".arbOfflineSheet .inputOffline_02").val(two);
                                    }
                                }
                    }
                }
            }
        }
    }
});
// -------------------------------------------------------------------------------------

// ОБРАБОТЧИКИ КНОПОК YES И NO:
$(".yesOn").click(function(){
    if($(".multSheet div div div .tblSearch").children().length >= 2){
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
        messToStatus("  |  At least 2 instruments must be connected...");
    }
});

$(".noOn").click(function(){
    if($(".multSheet div div div .tblSearch").children().length >= 2){
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
        messToStatus("  |  At least 2 instruments must be connected...");
    }
});

$(".yesOff").click(function(){
    if($(".multSheet div div div .tblSearch").children().length >= 2){
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
        messToStatus("  |  At least 2 instruments must be connected...");
    }
});

$(".noOff").click(function(){
    if($(".multSheet div div div .tblSearch").children().length >= 2){
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
        messToStatus("  |  At least 2 instruments must be connected...");
    }
});

// --------------------------------------------------------------------------------------

// ОБРАБОТКА КНОПОК "ПОСТРОИТЬ":
$(".arbOnlineSheet .btnSpreadOnline").click(function(){
    if ($(".arbOnlineSheet div div div #FSON1").text() == "" || $(".arbOnlineSheet div div div #FSON2").text() == "") {
        messToStatus("  |  You didn't add the minimum number of synthetics tools...");
    } else {
        let instrName_01 = $(".arbOnlineSheet div div div #FSON1").text();
        let instrName_02 = $(".arbOnlineSheet div div div #FSON2").text();
        let koef_01 = $(".arbOnlineSheet .inputOnline_01").val();
        let koef_02 = $(".arbOnlineSheet .inputOnline_02").val();
        
        $(".comeback").click();
        
        $(".screenShort").css("width", "6.24%");
        $(".scrin").css("width", "6.24%");
        $(".Grab").css("width", "6.24%");
        $(".hlevel").css("width", "6.24%");
        $(".tglevel").css("width", "6.24%");
        $(".vlevel").css("width", "6.24%");
        $(".del1").css("width", "6.24%");
        $(".text").css("width", "6.24%");
        $(".rect").css("width", "6.24%");
        $(".online").css("width", "6.24%");
        $(".delall").css("width", "6.24%");
        $(".Cross").css("width", "6.24%");
        $(".optBtn").css("width", "6.24%");
        
        $(".A").css("display", "block");
        $(".buy").css("display", "block");
        $(".sell").css("display", "block");
        
        if(OKNO == 1){
           BUILD_ONLINE(instrName_01, instrName_02, koef_01, koef_02, 1);
        }
        else{
           let divide = $(".NoInput_On").val();
           BUILD_ONLINE(instrName_01, instrName_02, koef_01, koef_02, divide);
        }
    }
});

$(".arbOfflineSheet .btnSpreadOffline").click(function(){
    if ($(".arbOfflineSheet div div div #FSOFF1").text() == "" || $(".arbOfflineSheet div div div #FSOFF2").text() == "") {
        messToStatus("  |  You didn't add the minimum number of synthetics tools...");
    } else { 
        let instrName_01 = $(".arbOfflineSheet div div div #FSOFF1").text();
        let instrName_02 = $(".arbOfflineSheet div div div #FSOFF2").text();
        let koef_01 = $(".arbOfflineSheet .inputOffline_01").val();
        let koef_02 = $(".arbOfflineSheet .inputOffline_02").val();
        
        if($(".arbOfflineSheet .inputOffline_01").val() == ""){
            koef_01 = 1.0;
        }
        if($(".arbOfflineSheet .inputOffline_02").val() == ""){
            koef_02 = 1.0;
        }
        
        $(".comeback").click();
        
        $(".screenShort").css("width", "6.24%");
        $(".scrin").css("width", "6.24%");
        $(".Grab").css("width", "6.24%");
        $(".hlevel").css("width", "6.24%");
        $(".tglevel").css("width", "6.24%");
        $(".vlevel").css("width", "6.24%");
        $(".del1").css("width", "6.24%");
        $(".text").css("width", "6.24%");
        $(".rect").css("width", "6.24%");
        $(".online").css("width", "6.24%");
        $(".delall").css("width", "6.24%");
        $(".Cross").css("width", "6.24%");
        $(".optBtn").css("width", "6.24%");
        
        $(".A").css("display", "block");
        $(".buy").css("display", "block");
        $(".sell").css("display", "block");
        
        if(OKNO == 1){
           BUILD_OFFLINE(instrName_01, instrName_02, koef_01, koef_02, 1);
        }
        else{
           let divide = $(".NoInput_Off").val();
           BUILD_OFFLINE(instrName_01, instrName_02, koef_01, koef_02, divide);
        }
    }
});


$(".multSheet .btnMult").click(function(){
    if ($(".multSheet div div div .tblSearch").children().length < 2) {
        messToStatus("  |  You didn't add the minimum number of synthetics tools...");
    } else {
        let reg_1 = new RegExp("^[0-9]+[\.,]?[0-9]*$");
        let reg_2 = new RegExp("^[0-9]+$");
        
        let arrNames = currentMultInstruments;
        let arrPriceOfTicks = [];
        let comeBack = $(".multSheet .inputDataMult").val();
        
        if(comeBack == ""){
            messToStatus("  |  The field is empty!");
            $(".multSheet .inputDataMult").css("background", "red");
            setTimeout(function () {
                $(".multSheet .inputDataMult").css("background", "darkred");
            }, 2000);
        }
        else{
            if(!(reg_2.test(comeBack))){
                messToStatus("  |  The field is incorrectly!");
                $(".multSheet .inputDataMult").css("background", "red");
                setTimeout(function () {
                    $(".multSheet .inputDataMult").css("background", "darkred");
                }, 2000);
            }
            else{
                    
                for(let i=0; i < currentMultInstrumentsIndex; ++i){
                    if(!(reg_1.test($("#multLineEdit_" + i.toString()).val()))){
                        messToStatus("  |  Input wasn't correct!");
                        return;
                    }
                    else{
                        arrPriceOfTicks.push($("#multLineEdit_" + i.toString()).val());
                    }
                }
                
                $(".comeback").click();
                
                $(".A").css("display", "none");
                $(".buy").css("display", "none");
                $(".sell").css("display", "none");
                
                //.A:hover, .screenShort:hover, .scrin:hover .Grab:hover, .hlevel:hover, .tglevel:hover, .vlevel:hover, .del1:hover, .text:hover, //.rect:hover, .online:hover, .buy:hover, .sell:hover, .delall:hover, .Cross:hover, .optBtn:hover

                $(".screenShort").css("width", "7.69%");
                $(".scrin").css("width", "7.69%");
                $(".Grab").css("width", "7.69%");
                $(".hlevel").css("width", "7.69%");
                $(".tglevel").css("width", "7.69%");
                $(".vlevel").css("width", "7.69%");
                $(".del1").css("width", "7.69%");
                $(".text").css("width", "7.69%");
                $(".rect").css("width", "7.69%");
                $(".online").css("width", "7.69%");
                $(".delall").css("width", "7.69%");
                $(".Cross").css("width", "7.69%");
                $(".optBtn").css("width", "7.69%");
                
                BUILD_MULT(arrNames, arrPriceOfTicks, comeBack);
                
            }
        }
    }
});


// --------------------------------------------------------------------------------------
































