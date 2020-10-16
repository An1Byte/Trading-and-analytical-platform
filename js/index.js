var zIndexxx = 0;
var stateInvis = 0;
var iceCount = 1;
var arrayBtns = [ $("#btn_01"), $("#btn_02"), $("#btn_03"), $("#btn_04"), $("#btn_05"), $("#btn_06"), $("#btn_07"), $("#btn_09") ];
var arraySheets = [ $("#darkSheet_01"), $("#darkSheet_02"), $("#darkSheet_03"), $("#darkSheet_04"), $("#darkSheet_05"), $("#darkSheet_06"), $("#darkSheet_07"), $("#darkSheet_09")];

$("#btn_08").addClass("unselectable");
for(let i=0; i < arrayBtns.length; ++i){
    arrayBtns[i].addClass("unselectable");
}

$("#Up").addClass("Up");
$("#Up p").addClass("Any_p").addClass("unselectable");

$("#Down").addClass("Down");
$("#Down p").addClass("Any_p").addClass("unselectable");

$("#Left").addClass("Left");
$("#Left p").addClass("Any_p").addClass("unselectable");

$("#Right").addClass("Right");
$("#Right p").addClass("Any_p").addClass("unselectable");

$("#Front").addClass("Front");
$("#Front p").addClass("Any_p").addClass("unselectable");

$("#Back").addClass("Back");
$("#Back p").addClass("Any_p").addClass("unselectable");


// Использую библиотеку (https://github.com/darcyclarke/Detect.js), чтобы получить информацию о браузере клиента.
// (Кроме того, возможно получить также распарсенные названия системы клиента, версии и так далее...)
const ua = detect.parse(navigator.userAgent);
if(ua.browser.family != "Chrome" && ua.browser.family != "Firefox"){
    alert("The site may not work correctly with this browser. Later I will adapt the work of the portal for all major browsers with their versions. I suggest that you run this site from browsers such as Chrome, Firefox, IE Edge latest versions, browsers on the chromium engine. (I have not tested all the others for compatibility yet ...)");
}
// -------------------------------------------------------------------


// ----------------------------- BACKGROUND: --------------------------

setInterval(function(){
    switch(iceCount){
        case 1:
        iceCount = 2;
        $("#bg_02").css("display", "block");
        setTimeout(function(){
            $("#bg_02").css("display", "none");
        }, 100);
        break;
        case 2:
            iceCount = 3;
        $("#bg_02").css("display", "block");
        setTimeout(function(){
            $("#bg_02").css("display", "none");
        }, 100);
        break;
        default:
        iceCount = 1;
        $("#bg_02").css("display", "block");
        setTimeout(function(){
            $("#bg_02").css("display", "none");
            setTimeout(function(){
                $("#bg_02").css("display", "block");
                setTimeout(function(){
                    $("#bg_02").css("display", "none");
                }, 100);
            }, 100);
        }, 100);
        break;    
    }
}, 5000);



// --------------------------------------------------------------------
// ----------------------------- HOVERS: ------------------------------

arrayBtns[0].hover(
    function(){
        if(arrayBtns[0].attr("data-state") == "1"){
            if(arrayBtns[0].attr("data-focus") == "1"){
                arrayBtns[0].css("cursor", "pointer").css("font-weight", "bold").css("color", "lime").css("box-shadow", "0px 0px 50px rgba(255, 0, 0, 80%)");
            }
            else{
                arrayBtns[0].css("cursor", "pointer").css("font-weight", "bold").css("color", "red").css("box-shadow", "0px 0px 50px rgba(255, 0, 0, 80%)");
            }
        }
        else{
            arrayBtns[0].css("cursor", "pointer").css("font-weight", "bold").css("color", "red").css("box-shadow", "0px 0px 50px rgba(255, 0, 0, 80%)");
        }
        
    },
    function(){
        if(arrayBtns[0].attr("data-state") == "1"){
            if(arrayBtns[0].attr("data-focus") == "1"){
                arrayBtns[0].css("font-weight", "bold").css("color", "lime").css("box-shadow", "0px 0px 50px rgba(255, 0, 0, 80%)");
            }
            else{
                arrayBtns[0].css("font-weight", "bold").css("color", "red").css("box-shadow", "0px 0px 50px rgba(255, 0, 0, 80%)");
            }
            
        }
        else{
            arrayBtns[0].css("font-weight", "normal").css("color", "rgba(0, 0, 0, 80%)").css("box-shadow", "0px 0px 0px rgba(0, 0, 0, 80%)");
        }
        shadowBTN();
});

arrayBtns[1].hover(
    function(){
        if(arrayBtns[1].attr("data-state") == "1"){
            if(arrayBtns[1].attr("data-focus") == "1"){
                arrayBtns[1].css("cursor", "pointer").css("font-weight", "bold").css("color", "lime").css("box-shadow", "0px 0px 50px rgba(255, 0, 0, 80%)");
            }
            else{
                arrayBtns[1].css("cursor", "pointer").css("font-weight", "bold").css("color", "red").css("box-shadow", "0px 0px 50px rgba(255, 0, 0, 80%)");
            }
        }
        else{
            arrayBtns[1].css("cursor", "pointer").css("font-weight", "bold").css("color", "red").css("box-shadow", "0px 0px 50px rgba(255, 0, 0, 80%)");
        }
        
    },
    function(){
        if(arrayBtns[1].attr("data-state") == "1"){
            if(arrayBtns[1].attr("data-focus") == "1"){
                arrayBtns[1].css("font-weight", "bold").css("color", "lime").css("box-shadow", "0px 0px 50px rgba(255, 0, 0, 80%)");
            }
            else{
                arrayBtns[1].css("font-weight", "bold").css("color", "red").css("box-shadow", "0px 0px 50px rgba(255, 0, 0, 80%)");
            }
            
        }
        else{
            arrayBtns[1].css("font-weight", "normal").css("color", "rgba(0, 0, 0, 80%)").css("box-shadow", "0px 0px 0px rgba(0, 0, 0, 80%)");
        }
        shadowBTN();
});

arrayBtns[3].hover(
    function(){
        if(arrayBtns[3].attr("data-state") == "1"){
            if(arrayBtns[3].attr("data-focus") == "1"){
                arrayBtns[3].css("cursor", "pointer").css("font-weight", "bold").css("color", "lime").css("box-shadow", "0px 0px 50px rgba(255, 0, 0, 80%)");
            }
            else{
                arrayBtns[3].css("cursor", "pointer").css("font-weight", "bold").css("color", "red").css("box-shadow", "0px 0px 50px rgba(255, 0, 0, 80%)");
            }
        }
        else{
            arrayBtns[3].css("cursor", "pointer").css("font-weight", "bold").css("color", "red").css("box-shadow", "0px 0px 50px rgba(255, 0, 0, 80%)");
        }
    },
    function(){
        if(arrayBtns[3].attr("data-state") == "1"){
            if(arrayBtns[3].attr("data-focus") == "1"){
                arrayBtns[3].css("font-weight", "bold").css("color", "lime").css("box-shadow", "0px 0px 50px rgba(255, 0, 0, 80%)");
            }
            else{
                arrayBtns[3].css("font-weight", "bold").css("color", "red").css("box-shadow", "0px 0px 50px rgba(255, 0, 0, 80%)");
            }
            
        }
        else{
            arrayBtns[3].css("font-weight", "normal").css("color", "rgba(0, 0, 0, 80%)").css("box-shadow", "0px 0px 0px rgba(0, 0, 0, 80%)");
        }
        shadowBTN();
});

arrayBtns[4].hover(
    function(){
        if(arrayBtns[4].attr("data-state") == "1"){
            if(arrayBtns[4].attr("data-focus") == "1"){
                arrayBtns[4].css("cursor", "pointer").css("font-weight", "bold").css("color", "lime").css("box-shadow", "0px 0px 50px rgba(255, 0, 0, 80%)");
            }
            else{
                arrayBtns[4].css("cursor", "pointer").css("font-weight", "bold").css("color", "red").css("box-shadow", "0px 0px 50px rgba(255, 0, 0, 80%)");
            }
        }
        else{
            arrayBtns[4].css("cursor", "pointer").css("font-weight", "bold").css("color", "red").css("box-shadow", "0px 0px 50px rgba(255, 0, 0, 80%)");
        }
        
    },
    function(){
        if(arrayBtns[4].attr("data-state") == "1"){
            if(arrayBtns[4].attr("data-focus") == "1"){
                arrayBtns[4].css("font-weight", "bold").css("color", "lime").css("box-shadow", "0px 0px 50px rgba(255, 0, 0, 80%)");
            }
            else{
                arrayBtns[4].css("font-weight", "bold").css("color", "red").css("box-shadow", "0px 0px 50px rgba(255, 0, 0, 80%)");
            }
            
        }
        else{
            arrayBtns[4].css("font-weight", "normal").css("color", "rgba(0, 0, 0, 80%)").css("box-shadow", "0px 0px 0px rgba(0, 0, 0, 80%)");
        }
        shadowBTN();
});

arrayBtns[2].hover(
    function(){
        if(arrayBtns[2].attr("data-state") == "1"){
            if(arrayBtns[2].attr("data-focus") == "1"){
                arrayBtns[2].css("cursor", "pointer").css("font-weight", "bold").css("color", "lime");
            }
            else{
                arrayBtns[2].css("cursor", "pointer").css("font-weight", "bold").css("color", "red");
            }
        }
        else{
            arrayBtns[2].css("cursor", "pointer").css("font-weight", "bold").css("color", "red").css("transform", "translate(50px, calc(75vh - 50px)) rotate(45deg)").css("box-shadow", "0px 0px 50px rgba(255, 0, 0, 80%)");
        }
    },
    function(){
        if(arrayBtns[2].attr("data-state") == "1"){
            if(arrayBtns[2].attr("data-focus") == "1"){
                arrayBtns[2].css("cursor", "pointer").css("font-weight", "bold").css("color", "lime").css("box-shadow", "0px 0px 50px rgba(255, 0, 0, 80%)");
            }
            else{
                arrayBtns[2].css("cursor", "pointer").css("font-weight", "bold").css("color", "red").css("box-shadow", "0px 0px 50px rgba(255, 0, 0, 80%)");
            }
        }
        else{
            arrayBtns[2].css("cursor", "default").css("font-weight", "normal").css("transform", "translate(100px, calc(75vh - 50px)) rotate(45deg)").css("color", "black").css("box-shadow", "0px 0px 50px rgba(255, 0, 0, 80%)");
        }
        shadowBTN();
});

arrayBtns[5].hover(
    function(){
        if(arrayBtns[5].attr("data-state") == "1"){
            if(arrayBtns[5].attr("data-focus") == "1"){
                arrayBtns[5].css("cursor", "pointer").css("font-weight", "bold").css("color", "lime");
            }
            else{
                arrayBtns[5].css("cursor", "pointer").css("font-weight", "bold").css("color", "red");
            }
        }
        else{
            arrayBtns[5].css("cursor", "pointer").css("font-weight", "bold").css("color", "red").css("transform", "translate(-50px, calc(50vh - 50px)) rotate(-45deg)").css("box-shadow", "0px 0px 50px rgba(255, 0, 0, 80%)");
        }
        
    },
    function(){
        if(arrayBtns[5].attr("data-state") == "1"){
            if(arrayBtns[5].attr("data-focus") == "1"){
                arrayBtns[5].css("cursor", "pointer").css("font-weight", "bold").css("color", "lime").css("box-shadow", "0px 0px 50px rgba(255, 0, 0, 80%)");
            }
            else{
                arrayBtns[5].css("cursor", "pointer").css("font-weight", "bold").css("color", "red").css("box-shadow", "0px 0px 50px rgba(255, 0, 0, 80%)");
            }
        }
        else{
            arrayBtns[5].css("cursor", "default").css("font-weight", "normal").css("transform", "translate(-100px, calc(50vh - 50px)) rotate(-45deg)").css("color", "black").css("box-shadow", "0px 0px 50px rgba(255, 0, 0, 80%)");
        }
        shadowBTN();
});

arrayBtns[7].hover(
    function(){
        if(arrayBtns[7].attr("data-state") == "1"){
            if(arrayBtns[7].attr("data-focus") == "1"){
                arrayBtns[7].css("cursor", "pointer").css("font-weight", "bold").css("color", "lime");
            }
            else{
                arrayBtns[7].css("cursor", "pointer").css("font-weight", "bold").css("color", "red");
            }
        }
        else{
            arrayBtns[7].css("cursor", "pointer").css("font-weight", "bold").css("color", "red").css("transform", "translate(25vw, -50px) rotate(45deg)").css("box-shadow", "0px 0px 50px rgba(255, 0, 0, 80%)");
        }
        
    },
    function(){
        if(arrayBtns[7].attr("data-state") == "1"){
            if(arrayBtns[7].attr("data-focus") == "1"){
                arrayBtns[7].css("cursor", "pointer").css("font-weight", "bold").css("color", "lime").css("box-shadow", "0px 0px 50px rgba(255, 0, 0, 80%)");
            }
            else{
                arrayBtns[7].css("cursor", "pointer").css("font-weight", "bold").css("color", "red").css("box-shadow", "0px 0px 50px rgba(255, 0, 0, 80%)");
            }
        }
        else{
            arrayBtns[7].css("cursor", "default").css("font-weight", "normal").css("transform", "translate(25vw, -100px) rotate(45deg)").css("color", "black").css("box-shadow", "0px 0px 50px rgba(255, 0, 0, 80%)");
        }
        shadowBTN();
    }
);

$("#btn_07").hover(
    function(){
        if($("#btn_07").attr("data-state") == "0"){
            $("#btn_07").css("animation", "GO 0.1s ease-out infinite").css("color", "lime").css("cursor", "pointer").css("box-shadow", "0px 0px 20px blue");
        }
        else{
            if($("#btn_07").attr("data-focus") == "1"){
                $("#btn_07").css("animation", "GOOFF2 0.3s ease-out infinite").css("cursor", "pointer").css("box-shadow", "0px 0px 20px blue");
            }
            else{
                $("#btn_07").css("animation", "GOOFF 0.3s ease-out infinite").css("cursor", "pointer").css("box-shadow", "0px 0px 20px blue");
            }
        }
    },
    function(){
        if($("#btn_07").attr("data-state") == "0"){
            $("#btn_07").css("animation", "GO 0.3s ease-out infinite").css("color", "lime").css("box-shadow", "0px 0px 20px blue");
        }
        else{
            if($("#btn_07").attr("data-focus") == "1"){
                $("#btn_07").css("color", "black").css("animation", "GOOFF2 1s ease-out infinite").css("box-shadow", "0px 0px 20px blue");
            }
            else{
                $("#btn_07").css("color", "black").css("animation", "GOOFF 1s ease-out infinite").css("box-shadow", "0px 0px 20px blue");
            }
        }
    }
);
// ------------------------------------------------------------- // HOVERS --
// --------------------------------------------------------------------------

// ---------------------------------------------------------- // FUNCTIONS --
function shadowBTN() {
    let stateCount = 0;
    for (let i = 0; i < arrayBtns.length; ++i) {
        if (arrayBtns[i].attr("data-state") == "1") {
            stateCount++;
        }
    }
    if (stateCount == 1 && $("#btn_07").attr("data-state") == "1"){$("#btn_07").attr("data-focus", "1");}
    if (stateCount > 1) {
        for (let i = 0; i < arrayBtns.length; ++i) {
            if (i != 6 && arrayBtns[i].attr("data-state") == "0") {
                arrayBtns[i].css("box-shadow", "0px 0px 50px red");
            }
        }
    } else {
        for (let i = 0; i < arrayBtns.length; ++i) {
            if (i != 6 && arrayBtns[i].attr("data-state") == "0") {
                arrayBtns[i].css("box-shadow", "0px 0px 0px red");
            }
        }
    }
}
// --------------------------------------------------------------------------

for(let i=0; i < arraySheets.length; ++i){
    arraySheets[i].zIndex = 0;
}

// Устанавливаем флаги активных и фокусных кнопок:
for(let i=0; i < arrayBtns.length; ++i){
    arrayBtns[i].attr("data-state", "0");
    arrayBtns[i].attr("data-focus", "0");
}
// -----------------------------------------------

$("#btn_01").click(function(){
    if(arrayBtns[0].attr("data-state") == "0" && arrayBtns[0].attr("data-focus") == "0"){
        // Если кнопка не активна и не имеет фокуса:
        arrayBtns[0].attr("data-state", "1"); // Устанавливаем то, что кнопка активна.
        
        // Устанавливаем фокус на нужный слой, делая его поверх остальных:
        for(let i=0; i < arrayBtns.length; ++i){
            arrayBtns[i].attr("data-focus", "0");
        }
        arrayBtns[0].attr("data-focus", "1");
        arrayBtns[0].css("color", "lime");
        if($("#btn_07").attr("data-state") == "1"){
            $("#btn_07").css("animation", "GOOFF 1s ease-out infinite");
        }
        for(let i=0; i < arrayBtns.length; ++i){
            if(i != 6 && i != 0 && arrayBtns[i].attr("data-state") == "1"){
                arrayBtns[i].css("color", "red");
            }
        }
        // ---------------------------------------------------------------
        
        arraySheets[0].zIndex = ++zIndexxx; // Устанавливаем наивысший приоритет слоя среди других.
        arraySheets[0].css("z-index", zIndexxx);
        $("#darkSheet_00").css("display", "block");
        anim();
    }
    else if(arrayBtns[0].attr("data-state") == "1" && arrayBtns[0].attr("data-focus") == "0"){
        // Если кнопка активна, но не имеет фокуса, тогда мы просто переключаем слои как вкладки:
        
        arrayBtns[0].attr("data-state", "1"); // Устанавливаем то, что кнопка активна.
        arrayBtns[0].css("color", "lime");
        if($("#btn_07").attr("data-state") == "1"){
            $("#btn_07").css("animation", "GOOFF 1s ease-out infinite");
        }
        for(let i=0; i < arrayBtns.length; ++i){
            if(i != 6 && i != 0 && arrayBtns[i].attr("data-state") == "1"){
                arrayBtns[i].css("color", "red");
            }
        }
        // Устанавливаем фокус на нужный слой, делая его поверх остальных:
        for(let i=0; i < arrayBtns.length; ++i){
            arrayBtns[i].attr("data-focus", "0");
        }
        arrayBtns[0].attr("data-focus", "1");
        // ---------------------------------------------------------------
        
        arraySheets[0].zIndex = ++zIndexxx; // Устанавливаем наивысший приоритет слоя среди других.
        arraySheets[0].css("z-index", zIndexxx);
    }
    else{
        // Если кнопка активна, но имеет фокус, то логичнее закрыть слой:
        
        arrayBtns[0].attr("data-state", "0"); // Устанавливаем то, что кнопка больше не активна.
        arrayBtns[0].attr("data-focus", "0"); // Убираем фокус.
        // ---------------------------------------------------------------
        
        $("#darkSheet_00").removeClass("darkSheet_00");
        // arraySheets[0].css("display", "none"); // Удаляем слой.
        arraySheets[0].zIndex = 0;
        arraySheets[0].css("z-index", 0);
        
        zIndexxx--; // Так как мы удалили слой с наивысшим приоритетом, то уменьшаем и сам индекс.
        arrayBtns[0].css("font-weight", "normal").css("color", "black").css("box-shadow", "0px 0px 0px rgba(0, 0, 0, 0%)"); // Возвращаем нормальные свойства глобальной кнопке.
        
        // После удаления слоя, если он не был последним, то устанавливаем фокус на приоритетном слое:
        for(let i=0; i < arrayBtns.length; ++i){
            arrayBtns[i].attr("data-focus", "0");
        }
        let indexF = 0;
        let counter = 0;
        for(let i=1; i < arraySheets.length; ++i){
            if(arraySheets[i].zIndex > arraySheets[indexF].zIndex){
                indexF = i;
                counter++;
            }
        }
        for(let i=0; i < arraySheets.length; ++i){
            if(arraySheets[i].zIndex > 0){
                counter++;
            }
        }
        if(counter > 0){
            if(indexF == 6 && arrayBtns[6].attr("data-state") == "1"){
                arrayBtns[6].css("animation", "GOOFF2 1s ease-out infinite");
                arrayBtns[indexF].attr("data-focus", "1");
            }
            else{
                arrayBtns[indexF].attr("data-focus", "1");
                arrayBtns[indexF].css("color", "lime");
            }
        }
        $("#darkSheet_00").css("display", "none");
        
        for(let i = 0; i < arrayClickCube.length; ++i){
            arrayClickCube[i] = 0;
        }
        $("#cubikSheet").css("height", "0%").css("font-size", "0px").css("top", "10%");
        
        
        // ---------------------------------------------------------------
    }
    shadowBTN();
});

// #######################################################################

$("#btn_02").click(function(){ // LOG IN
    
    if(arrayBtns[1].attr("data-state") == "0" && arrayBtns[1].attr("data-focus") == "0"){
        // Если кнопка не активна и не имеет фокуса:
        arrayBtns[1].attr("data-state", "1"); // Устанавливаем то, что кнопка активна.
        
        // Устанавливаем фокус на нужный слой, делая его поверх остальных:
        for(let i=0; i < arrayBtns.length; ++i){
            arrayBtns[i].attr("data-focus", "0");
        }
        arrayBtns[1].attr("data-focus", "1");
        arrayBtns[1].css("color", "lime");
        if($("#btn_07").attr("data-state") == "1"){
            $("#btn_07").css("animation", "GOOFF 1s ease-out infinite");
        }
        for(let i=0; i < arrayBtns.length; ++i){
            if(i != 6 && i != 1 && arrayBtns[i].attr("data-state") == "1"){
                arrayBtns[i].css("color", "red");
            }
        }
        // ---------------------------------------------------------------
        
        arraySheets[1].addClass("darkSheet_02"); // Добавляем новый слой.
        
        arraySheets[1].zIndex = ++zIndexxx; // Устанавливаем наивысший приоритет слоя среди других.
        arraySheets[1].css("z-index", zIndexxx);
        arraySheets[1].html("<div style=\'text-align:center; padding-top: calc(" + (window.innerHeight/2) + "px - 5rem); font-weight: bold; font-size: 36px; color: red; padding-left: 3rem; padding-right: 3rem;\'><p>In registration and authorization, so far, it makes no sense =))</p></div>");
    }
    else if(arrayBtns[1].attr("data-state") == "1" && arrayBtns[1].attr("data-focus") == "0"){
        // Если кнопка активна, но не имеет фокуса, тогда мы просто переключаем слои как вкладки:
        
        arrayBtns[1].attr("data-state", "1"); // Устанавливаем то, что кнопка активна.
        
        // Устанавливаем фокус на нужный слой, делая его поверх остальных:
        for(let i=0; i < arrayBtns.length; ++i){
            arrayBtns[i].attr("data-focus", "0");
        }
        arrayBtns[1].attr("data-focus", "1");
        arrayBtns[1].css("color", "lime");
        if($("#btn_07").attr("data-state") == "1"){
            $("#btn_07").css("animation", "GOOFF 1s ease-out infinite");
        }
        for(let i=0; i < arrayBtns.length; ++i){
            if(i != 6 && i != 1 && arrayBtns[i].attr("data-state") == "1"){
                arrayBtns[i].css("color", "red");
            }
        }
        // ---------------------------------------------------------------
        
        arraySheets[1].css("z-index", ++zIndexxx); // Устанавливаем наивысший приоритет слоя среди других.
        arraySheets[1].css("z-index", zIndexxx);
    }
    else{
        // Если кнопка активна, но имеет фокус, то логичнее закрыть слой:
        
        arrayBtns[1].attr("data-state", "0"); // Устанавливаем то, что кнопка больше не активна.
        arrayBtns[1].attr("data-focus", "0"); // Убираем фокус.
        // ---------------------------------------------------------------
        arraySheets[1].html("");
        arraySheets[1].removeClass("darkSheet_02"); // Удаляем слой.
        arraySheets[1].zIndex = 0;
        arraySheets[1].css("z-index", 0);
        
        zIndexxx--; // Так как мы удалили слой с наивысшим приоритетом, то уменьшаем и сам индекс.
        arrayBtns[1].css("font-weight", "normal").css("color", "black").css("box-shadow", "0px 0px 0px rgba(0, 0, 0, 0%)"); // Возвращаем нормальные свойства глобальной кнопке.
        
        // После удаления слоя, если он не был последним, то устанавливаем фокус на приоритетном слое:
        for(let i=0; i < arrayBtns.length; ++i){
            arrayBtns[i].attr("data-focus", "0");
        }
        let indexF = 0;
        
        for(let i=1; i < arraySheets.length; ++i){
            if(arraySheets[i].zIndex > arraySheets[indexF].zIndex){
                indexF = i;
            }
        }
        let counter = 0;
        for(let i=0; i < arraySheets.length; ++i){
            if(arraySheets[i].zIndex > 0){
                counter++;
            }
        }
        if(counter > 0){
            if(indexF == 6 && arrayBtns[6].attr("data-state") == "1"){
                arrayBtns[6].css("animation", "GOOFF2 1s ease-out infinite");
                arrayBtns[indexF].attr("data-focus", "1");
            }
            else{
                arrayBtns[indexF].attr("data-focus", "1");
                arrayBtns[indexF].css("color", "lime");
            }
        }
        // ---------------------------------------------------------------
        
    }
    shadowBTN();
});

// #######################################################################

// #######################################################################

$("#btn_04").click(function(){ // mess
    
    if(arrayBtns[3].attr("data-state") == "0" && arrayBtns[3].attr("data-focus") == "0"){
        // Если кнопка не активна и не имеет фокуса:
        arrayBtns[3].attr("data-state", "1"); // Устанавливаем то, что кнопка активна.
        
        // Устанавливаем фокус на нужный слой, делая его поверх остальных:
        for(let i=0; i < arrayBtns.length; ++i){
            arrayBtns[i].attr("data-focus", "0");
        }
        arrayBtns[3].attr("data-focus", "1");
        arrayBtns[3].css("color", "lime");
        if($("#btn_07").attr("data-state") == "1"){
            $("#btn_07").css("animation", "GOOFF 1s ease-out infinite");
        }
        for(let i=0; i < arrayBtns.length; ++i){
            if(i != 6 && i != 3 && arrayBtns[i].attr("data-state") == "1"){
                arrayBtns[i].css("color", "red");
            }
        }
        // ---------------------------------------------------------------
        
        arraySheets[3].css("display", "block");
        setTimeout(function(){arraySheets[3].css("transform", "translate(-75vw, -75vh)");}, 200);
        
        
        
        arraySheets[3].zIndex = ++zIndexxx; // Устанавливаем наивысший приоритет слоя среди других.
        arraySheets[3].css("z-index", zIndexxx);
    }
    else if(arrayBtns[3].attr("data-state") == "1" && arrayBtns[3].attr("data-focus") == "0"){
        // Если кнопка активна, но не имеет фокуса, тогда мы просто переключаем слои как вкладки:
        
        arrayBtns[3].attr("data-state", "1"); // Устанавливаем то, что кнопка активна.
        
        // Устанавливаем фокус на нужный слой, делая его поверх остальных:
        for(let i=0; i < arrayBtns.length; ++i){
            arrayBtns[i].attr("data-focus", "0");
        }
        arrayBtns[3].attr("data-focus", "1");
        arrayBtns[3].css("color", "lime");
        if($("#btn_07").attr("data-state") == "1"){
            $("#btn_07").css("animation", "GOOFF 1s ease-out infinite");
        }
        for(let i=0; i < arrayBtns.length; ++i){
            if(i != 6 && i != 3 && arrayBtns[i].attr("data-state") == "1"){
                arrayBtns[i].css("color", "red");
            }
        }
        // ---------------------------------------------------------------
        
        arraySheets[3].zIndex = ++zIndexxx; // Устанавливаем наивысший приоритет слоя среди других.
        arraySheets[3].css("z-index", zIndexxx);
    }
    else /*if(arrayBtns[0].attr("data-state") == "1" && arrayBtns[0].attr("data-focus") == "1")*/{
        // Если кнопка активна, но имеет фокус, то логичнее закрыть слой:
        
        arrayBtns[3].attr("data-state", "0"); // Устанавливаем то, что кнопка больше не активна.
        arrayBtns[3].attr("data-focus", "0"); // Убираем фокус.
        // ---------------------------------------------------------------
        arraySheets[3].css("transform", "translate(0vw, 0vh)");
        setTimeout(function(){
            arraySheets[3].css("display", "none");
        }, 1000);
        arraySheets[3].zIndex = 0;
            arraySheets[3].css("z-index", 0);
            zIndexxx--; // Так как мы удалили слой с наивысшим приоритетом, то уменьшаем и сам индекс.
            // После удаления слоя, если он не был последним, то устанавливаем фокус на приоритетном слое:
            for(let i=0; i < arrayBtns.length; ++i){
                arrayBtns[i].attr("data-focus", "0");
            }
            let indexF = 0;
            let counter = 0;
            for(let i=1; i < arraySheets.length; ++i){
                if(arraySheets[i].zIndex > arraySheets[indexF].zIndex){
                    indexF = i;
                    counter++;
                }
            }
            for(let i=0; i < arraySheets.length; ++i){
                if(arraySheets[i].zIndex > 0){
                    counter++;
                }
            }
            if(counter > 0){
                if(indexF == 6 && arrayBtns[6].attr("data-state") == "1"){
                    arrayBtns[6].css("animation", "GOOFF2 1s ease-out infinite");
                    arrayBtns[indexF].attr("data-focus", "1");
                }
                else{
                    arrayBtns[indexF].attr("data-focus", "1");
                    arrayBtns[indexF].css("color", "lime");
                }
            }
            // ---------------------------------------------------------------
    }
    shadowBTN();
});

// #######################################################################

$("#btn_05").click(function(){ // news
    
    if(arrayBtns[4].attr("data-state") == "0" && arrayBtns[4].attr("data-focus") == "0"){
        // Если кнопка не активна и не имеет фокуса:
        arrayBtns[4].attr("data-state", "1"); // Устанавливаем то, что кнопка активна.
        
        // Устанавливаем фокус на нужный слой, делая его поверх остальных:
        for(let i=0; i < arrayBtns.length; ++i){
            arrayBtns[i].attr("data-focus", "0");
        }
        arrayBtns[4].attr("data-focus", "1");
        arrayBtns[4].css("color", "lime");
        if($("#btn_07").attr("data-state") == "1"){
            $("#btn_07").css("animation", "GOOFF 1s ease-out infinite");
        }
        for(let i=0; i < arrayBtns.length; ++i){
            if(i != 6 && i != 4 && arrayBtns[i].attr("data-state") == "1"){
                arrayBtns[i].css("color", "red");
            }
        }
        // ---------------------------------------------------------------
        
        arraySheets[4].addClass("darkSheet_05"); // Добавляем новый слой.
        
        arraySheets[4].zIndex = ++zIndexxx; // Устанавливаем наивысший приоритет слоя среди других.
        arraySheets[4].css("z-index", zIndexxx);
        arraySheets[4].html("<h3 style='color: lime'><center>Portals news</center></h3><div style='padding-left: 3rem; padding-right: 3rem'><ul><li>No news yet.</li></ul></div>");
    }
    else if(arrayBtns[4].attr("data-state") == "1" && arrayBtns[4].attr("data-focus") == "0"){
        // Если кнопка активна, но не имеет фокуса, тогда мы просто переключаем слои как вкладки:
        
        arrayBtns[4].attr("data-state", "1"); // Устанавливаем то, что кнопка активна.
        
        // Устанавливаем фокус на нужный слой, делая его поверх остальных:
        for(let i=0; i < arrayBtns.length; ++i){
            arrayBtns[i].attr("data-focus", "0");
        }
        arrayBtns[4].attr("data-focus", "1");
        arrayBtns[4].css("color", "lime");
        if($("#btn_07").attr("data-state") == "1"){
            $("#btn_07").css("animation", "GOOFF 1s ease-out infinite");
        }
        for(let i=0; i < arrayBtns.length; ++i){
            if(i != 6 && i != 4 && arrayBtns[i].attr("data-state") == "1"){
                arrayBtns[i].css("color", "red");
            }
        }
        // ---------------------------------------------------------------
        
        arraySheets[4].zIndex = ++zIndexxx; // Устанавливаем наивысший приоритет слоя среди других.
        arraySheets[4].css("z-index", zIndexxx);
    }
    else /*if(arrayBtns[0].attr("data-state") == "1" && arrayBtns[0].attr("data-focus") == "1")*/{
        // Если кнопка активна, но имеет фокус, то логичнее закрыть слой:
        
        arrayBtns[4].attr("data-state", "0"); // Устанавливаем то, что кнопка больше не активна.
        arrayBtns[4].attr("data-focus", "0"); // Убираем фокус.
        // ---------------------------------------------------------------
        
        arraySheets[4].html("");
        arraySheets[4].removeClass("darkSheet_05"); // Удаляем слой.
        arraySheets[4].zIndex = 0;
        arraySheets[4].css("z-index", 0);
        
        zIndexxx--; // Так как мы удалили слой с наивысшим приоритетом, то уменьшаем и сам индекс.
        
        // После удаления слоя, если он не был последним, то устанавливаем фокус на приоритетном слое:
        for(let i=0; i < arrayBtns.length; ++i){
            arrayBtns[i].attr("data-focus", "0");
        }
        let indexF = 0;
        let counter = 0;
        for(let i=1; i < arrayBtns.length; ++i){
            if(arraySheets[i].zIndex > arraySheets[indexF].zIndex){
                indexF = i;
                counter++;
            }
        }
        for(let i=0; i < arraySheets.length; ++i){
            if(arraySheets[i].zIndex > 0){
                counter++;
            }
        }
        if(counter > 0){
            if(indexF == 6 && arrayBtns[6].attr("data-state") == "1"){
                arrayBtns[6].css("animation", "GOOFF2 1s ease-out infinite");
                arrayBtns[indexF].attr("data-focus", "1");
            }
            else{
                arrayBtns[indexF].attr("data-focus", "1");
                arrayBtns[indexF].css("color", "lime");
            }
        }
        // ---------------------------------------------------------------
        
    }
    shadowBTN();
});

// #######################################################################

$("#btn_06").click(function(){
    
    if(arrayBtns[5].attr("data-state") == "0" && arrayBtns[5].attr("data-focus") == "0"){
        // Если кнопка не активна и не имеет фокуса:
        arrayBtns[5].attr("data-state", "1"); // Устанавливаем то, что кнопка активна.
        
        // Устанавливаем фокус на нужный слой, делая его поверх остальных:
        for(let i=0; i < arrayBtns.length; ++i){
            arrayBtns[i].attr("data-focus", "0");
        }
        arrayBtns[5].attr("data-focus", "1");
        arrayBtns[5].css("color", "lime");
        if($("#btn_07").attr("data-state") == "1"){
            $("#btn_07").css("animation", "GOOFF 1s ease-out infinite");
        }
        for(let i=0; i < arrayBtns.length; ++i){
            if(i != 6 && i != 5 && arrayBtns[i].attr("data-state") == "1"){
                arrayBtns[i].css("color", "red");
            }
        }
        // ---------------------------------------------------------------
        
        arraySheets[5].addClass("darkSheet_06"); // Добавляем новый слой.
        setTimeout(function(){$("#darkSheet_06").css("transform", "translate(100vw, 0px)");}, 600);
        arraySheets[5].zIndex = ++zIndexxx; // Устанавливаем наивысший приоритет слоя среди других.
        arraySheets[5].css("z-index", zIndexxx);
        arraySheets[5].html("<div style=\'text-align:center; padding-top: calc(" + (window.innerHeight/2) + "px - 5rem); font-weight: bold; font-size: 28px; color: red;\'><p>This section will be ready when more than 100 people reach online...</p></div>");
    }
    else if(arrayBtns[5].attr("data-state") == "1" && arrayBtns[5].attr("data-focus") == "0"){
        // Если кнопка активна, но не имеет фокуса, тогда мы просто переключаем слои как вкладки:
        
        arrayBtns[5].attr("data-state", "1"); // Устанавливаем то, что кнопка активна.
        
        // Устанавливаем фокус на нужный слой, делая его поверх остальных:
        for(let i=0; i < arrayBtns.length; ++i){
            arrayBtns[i].attr("data-focus", "0");
        }
        arrayBtns[5].attr("data-focus", "1");
        arrayBtns[5].css("color", "lime");
        if($("#btn_07").attr("data-state") == "1"){
            $("#btn_07").css("animation", "GOOFF 1s ease-out infinite");
        }
        for(let i=0; i < arrayBtns.length; ++i){
            if(i != 6 && i != 5 && arrayBtns[i].attr("data-state") == "1"){
                arrayBtns[i].css("color", "red");
            }
        }
        // ---------------------------------------------------------------
        
        arraySheets[5].zIndex = ++zIndexxx; // Устанавливаем наивысший приоритет слоя среди других.
        arraySheets[5].css("z-index", zIndexxx);
    }
    else /*if(arrayBtns[0].attr("data-state") == "1" && arrayBtns[0].attr("data-focus") == "1")*/{
        // Если кнопка активна, но имеет фокус, то логичнее закрыть слой:
        
        arrayBtns[5].attr("data-state", "0"); // Устанавливаем то, что кнопка больше не активна.
        arrayBtns[5].attr("data-focus", "0"); // Убираем фокус.
        // ---------------------------------------------------------------
        $("#darkSheet_06").css("transform", "translate(0px, 0px)");
        arraySheets[5].html("");
        setTimeout(function(){arraySheets[5].removeClass("darkSheet_06");}, 600);
        arraySheets[5].zIndex = 0;
        arraySheets[5].css("z-index", 0);
        
        zIndexxx--; // Так как мы удалили слой с наивысшим приоритетом, то уменьшаем и сам индекс.

        // После удаления слоя, если он не был последним, то устанавливаем фокус на приоритетном слое:
        for(let i=0; i < arrayBtns.length; ++i){
            arrayBtns[i].attr("data-focus", "0");
        }
        let indexF = 0;
        let counter = 0;
        for(let i=1; i < arrayBtns.length; ++i){
            if(arraySheets[i].zIndex > arraySheets[indexF].zIndex){
                indexF = i;
                counter++;
            }
        }
        for(let i=0; i < arraySheets.length; ++i){
            if(arraySheets[i].zIndex > 0){
                counter++;
            }
        }
        if(counter > 0){
            if(indexF == 6 && arrayBtns[6].attr("data-state") == "1"){
                arrayBtns[6].css("animation", "GOOFF2 1s ease-out infinite");
                arrayBtns[indexF].attr("data-focus", "1");
            }
            else{
                arrayBtns[indexF].attr("data-focus", "1");
                arrayBtns[indexF].css("color", "lime");
            }
        }
        // ---------------------------------------------------------------
    }
    shadowBTN();
});

$("#btn_07").click( // GO
    function(){
    
    
    if(arrayBtns[6].attr("data-state") == "0" && arrayBtns[6].attr("data-focus") == "0"){
        
        // Если кнопка не активна и не имеет фокуса:
        if($("#btn_10").attr("data-flag") == "1"){
            $(".topSheet").css("display", "block");
        }
        $("#btn_10").css("display", "block");
        arrayBtns[6].attr("data-state", "1"); // Устанавливаем то, что кнопка активна.
        
        // Устанавливаем фокус на нужный слой, делая его поверх остальных:
        for(let i=0; i < arrayBtns.length; ++i){
            arrayBtns[i].attr("data-focus", "0");
        }
        arrayBtns[6].attr("data-focus", "1");
        // ---------------------------------------------------------------
        $("#darkSheet_07").css("display", "block");
        $("#btn_07").css("animation", "GOOFF2 1s ease-out infinite").css("transition", "transform 1s ease-out, color 1s ease-out").css("transform", "translate(100px, calc(50vh - 50px)) rotate(45deg)");
        $("#btn_07 p").text("");
        setTimeout(function(){
            $("#darkSheet_07").css("opacity", "80%");
        }, 200);
           
        for(let i=0; i < arrayBtns.length; ++i){
            if(i != 6 && arrayBtns[i].attr("data-state") == "1"){
                arrayBtns[i].css("color", "red");
            }
        }
        
        arraySheets[6].zIndex = ++zIndexxx; // Устанавливаем наивысший приоритет слоя среди других.
        arraySheets[6].css("z-index", zIndexxx);
        
        stateInvis = 3;
        $("#btn_08").click();
        
    }
    else if(arrayBtns[6].attr("data-state") == "1" && arrayBtns[6].attr("data-focus") == "0"){
        // Если кнопка активна, но не имеет фокуса, тогда мы просто переключаем слои как вкладки:
        
        arrayBtns[6].attr("data-state", "1"); // Устанавливаем то, что кнопка активна.
        $("#btn_07").css("animation", "GOOFF2 1s ease-out infinite");
        
        for(let i=0; i < arrayBtns.length; ++i){
            if(i != 6 && arrayBtns[i].attr("data-state") == "1"){
                arrayBtns[i].css("color", "red");
            }
        }
        
        // Устанавливаем фокус на нужный слой, делая его поверх остальных:
        for(let i=0; i < arrayBtns.length; ++i){
            arrayBtns[i].attr("data-focus", "0");
        }
        arrayBtns[6].attr("data-focus", "1");
        // ---------------------------------------------------------------
        
        arraySheets[6].zIndex = ++zIndexxx; // Устанавливаем наивысший приоритет слоя среди других.
        arraySheets[6].css("z-index", zIndexxx);
    }
    else /*if(arrayBtns[0].attr("data-state") == "1" && arrayBtns[0].attr("data-focus") == "1")*/{
        // Если кнопка активна, но имеет фокус, то логичнее закрыть слой:
        if($("#btn_10").attr("data-flag") == "1"){
            $("#btn_10").attr("data-flag", "0");
            $("#btn_10").click();
        }
        $(".topSheet").css("display", "none");
        $("#btn_10").css("display", "none");
        arrayBtns[6].attr("data-state", "0"); // Устанавливаем то, что кнопка больше не активна.
        arrayBtns[6].attr("data-focus", "0"); // Убираем фокус.
        // ---------------------------------------------------------------
        
        $("#btn_07").css("animation", "GO 1s ease-out infinite").css("transform", "translate(50px, calc(50vh - 50px)) rotate(45deg)").css("color", "lime");
        $("#btn_07 p").text("GO");
        
        $("#darkSheet_07").css("opacity", "0%");
        setTimeout(function(){
            $("#darkSheet_07").css("display", "none");
        }, 1100);
        
        arraySheets[6].zIndex = 0;
        arraySheets[6].css("z-index", 0);
        
        zIndexxx--; // Так как мы удалили слой с наивысшим приоритетом, то уменьшаем и сам индекс.

        // После удаления слоя, если он не был последним, то устанавливаем фокус на приоритетном слое:
        for(let i=0; i < arrayBtns.length; ++i){
            arrayBtns[i].attr("data-focus", "0");
        }
        let indexF = 0;
        let counter = 0;
        for(let i=1; i < arrayBtns.length; ++i){
            if(arraySheets[i].zIndex > arraySheets[indexF].zIndex){
                indexF = i;
                counter++;
            }
        }
        for(let i=0; i < arraySheets.length; ++i){
            if(arraySheets[i].zIndex > 0){
                counter++;
            }
        }
        if(counter > 0){
            arrayBtns[indexF].attr("data-focus", "1");
            arrayBtns[indexF].css("color", "lime");
        }
        
        stateInvis = 4;
        $("#btn_08").click();
        
        // ---------------------------------------------------------------
    }
    shadowBTN();
});

$("#btn_08").click( // INVIS
    function(){
        // 3 - если клик вызван неявно методом захода в ГО
        // 4 - если клик вызван неявно методом выхода из ГО
        let flagGO = false;
        if (stateInvis == 3) {
            stateInvis = 1;
            $("#btn_08").css("transform", "translate(calc(75vw - 100px), -100px) rotate(-45deg)");
            for (let i = 0; i < arrayBtns.length; ++i) {
                if (i != 6 && i != 2 && i != 5 && i != 7 && arrayBtns[i].attr("data-state") == "0") {
                    arrayBtns[i].css("display", "none");
                }
            }
            flagGO = true;
        } else if (stateInvis == 4) {
            stateInvis = 0;
            $("#btn_08").css("transform", "translate(calc(75vw - 100px), -50px) rotate(-45deg)");
            for (let i = 0; i < arrayBtns.length; ++i) {
                if (i != 6) {
                    arrayBtns[i].css("display", "block");
                }
            }
            flagGO = true;
        }
        if (!flagGO) {
            if (!stateInvis) {
                stateInvis = 1;
                $("#btn_08").css("transform", "translate(calc(75vw - 100px), -100px) rotate(-45deg)");
                for (let i = 0; i < arrayBtns.length; ++i) {
                    if (i != 6 && i != 2 && i != 5 && i != 7 && arrayBtns[i].attr("data-state") == "0") {
                        arrayBtns[i].css("display", "none");
                    }
                }
            } else {
                stateInvis = 0;
                $("#btn_08").css("transform", "translate(calc(75vw - 100px), -50px) rotate(-45deg)");
                for (let i = 0; i < arrayBtns.length; ++i) {
                    if (i != 6 && i != 2 && i != 5 && i != 7) {
                        arrayBtns[i].css("display", "block");
                    }
                }
            }
        }
    }
);

$("#btn_10").click(function(){
    if($("#btn_10").attr("data-flag") == "0"){
        $("#btn_10").attr("data-flag", "1");
        $(".topSheet").css("display", "block");
        $(".flex-container_01").css("display", "flex");
        $(".charts").css("display", "block");
        $("#btn_10").css("transform", "translate(25vw, -100px) rotate(45deg)");
        if($(".topSheet").children().length == 0){
            messToStatus("  |  You don't have an added tools...");
        }
    }
    else{
        $("#btn_10").attr("data-flag", "0");
        $(".topSheet").css("display", "none");
        $(".flex-container_01").css("display", "none");
        $(".charts").css("display", "none");
        $("#btn_10").css("transform", "translate(25vw, -50px) rotate(45deg)");
    }
});

