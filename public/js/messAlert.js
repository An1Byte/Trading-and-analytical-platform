function messAlert(str, t1, t2){
    // t1 - Анимация появления и исчезновения в мсек
    // t2 - Анимация ожидания в мсек
    if($(".statusMessage").css("display") == "none"){
        $(".statusMessage").css("display", "block");
        setTimeout(function(){$(".statusMessage").css("opacity", "80%");}, t1);
        $(".statusMessage p").text(str);
        setTimeout(function(){
            $(".statusMessage").css("opacity", "0");
            setTimeout(function(){$(".statusMessage").css("display", "none");}, t1);
        }, t2);
    }
}