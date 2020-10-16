let iceCount = 1;

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

// -------------------------------------------------------------------

$("#btn_10").click(function(){ // Charts button
    if($("#btn_10").attr("data-flag") == "0"){
        $("#btn_10").attr("data-flag", "1");
        $(".flex-container_01").css("display", "flex");
        $(".charts").css("display", "block");
        $("#btn_10").css("transform", "translate(calc(50vw - 50px), -100px) rotate(45deg)");
    }
    else{
        $("#btn_10").attr("data-flag", "0");
        $(".flex-container_01").css("display", "none");
        $(".charts").css("display", "none");
        $("#btn_10").css("transform", "translate(calc(50vw - 50px), -50px) rotate(45deg)");
    }
});

window.onbeforeunload = function(){
    $.ajax({
        type: "GET",
        url: "/exit",
        cache: false
    });
};