let currentRotateX = 0;
let currentRotateY = 0;
let loop = 1;
let arrayClickCube = [0,0,0,0,0,0,0];
let readyEl = false; // статус полного раскрытия слоя.

function anim(){ 
    if($("#btn_01").attr("data-state") == "1"){
        if(loop){
            currentRotateX += 6;
            currentRotateY += 3;
            if(currentRotateX >= 360) {currentRotateX = 0;}
            if(currentRotateY >= 360){currentRotateY = 0;} 
            $("#figure").css("transform", "rotateX(" + currentRotateX + "deg) rotateY(" + currentRotateY + "deg)");
        }
        else{
            currentRotateX += 2;
            currentRotateY += 1;
            if(currentRotateX >= 360) {currentRotateX = 0;}
            if(currentRotateY >= 360){currentRotateY = 0;} 
            $("#figure").css("transform", "rotateX(" + currentRotateX + "deg) rotateY(" + currentRotateY + "deg)");
        }
        setTimeout(anim, 50);
    }
}

// ------------------ HOVERS:
$("#Front").hover(
    function(){
        loop = 0;
        $("#Front").css("animation", "paused").css("cursor", "pointer");
        $("#Front").addClass("HoverIn");
    },
    function(){
        loop = 1;
        $("#Front").removeClass("HoverIn");
        $("#Front").css("animation", "hideBNTS 1s linear alternate infinite");
    }
);

$("#Left").hover(
    function(){
        loop = 0;
        $("#Left").css("animation", "paused").css("cursor", "pointer");
        $("#Left").addClass("HoverIn");
    },
    function(){
        loop = 1;
        $("#Left").removeClass("HoverIn");
        $("#Left").css("animation", "hideBNTS 1s linear alternate infinite");
    }
);

$("#Right").hover(
    function(){
        loop = 0;
        $("#Right").css("animation", "paused").css("cursor", "pointer");
        $("#Right").addClass("HoverIn");
    },
    function(){
        loop = 1;
        $("#Right").removeClass("HoverIn");
        $("#Right").css("animation", "hideBNTS 1s linear alternate infinite");
    }
);

$("#Back").hover(
    function(){
        loop = 0;
        $("#Back").css("animation", "paused").css("cursor", "pointer");
        $("#Back").addClass("HoverIn");
    },
    function(){
        loop = 1;
        $("#Back").removeClass("HoverIn");
        $("#Back").css("animation", "hideBNTS 1s linear alternate infinite");
    }
);

$("#Down").hover(
    function(){
        loop = 0;
        $("#Down").css("animation", "paused").css("cursor", "pointer").css("background", "red").css("opacity", "80%");
        $("#Down").addClass("HoverIn");
    },
    function(){
        loop = 1;
        $("#Down").removeClass("HoverIn");
        $("#Down").css("animation", "hideBNTS 1s linear alternate infinite");
    }
);

$("#Up").hover(
    function(){
        loop = 0;
        $("#Up").css("animation", "paused").css("cursor", "pointer");
        $("#Up").addClass("HoverIn");
    },
    function(){
        loop = 1;
        $("#Up").removeClass("HoverIn");
        $("#Up").css("animation", "hideBNTS 1s linear alternate infinite");
    }
);

// -------------------------------------------------------------------------------------

$(document).click((event)=>{
   let flag = false;
   for(let i = 0; i < arrayClickCube.length; ++i){
        if(arrayClickCube[i] == 1){
            if(readyEl == true){
                if(!($("#cubikSheet").is(event.target)) && 
                   $("#cubikSheet").has(event.target).length === 0 &&
                   !($("#darkSheet_00").is(event.target)) && 
                   $("#darkSheet_00").has(event.target).length === 0 &&
                   !($(".downloadPrograms_desc").is(event.target)) &&
                   $(".downloadPrograms_desc").has(event.target).length === 0){
                    arrayClickCube[i] = 0;
                    $("#btn_01").click();
                    $("#cubikSheet").attr("data-state", "0");
                }
            }
            break;
        }
   }
});


// --------------------------- Clicks:
$("#Front").click( // ARTICLES
    (event) => {
        if(!arrayClickCube[0]){
            arrayClickCube[0] = 1;
            let tegs = new String();
            tegs = "<h3><center>ARTICLES</center></h3><p>There is nothing here yet...</p>";
            let flag = false;
            for(let i = 0; i < arrayClickCube.length; ++i){
                if(i != 0 && arrayClickCube[i] == 1){
                    arrayClickCube[i] = 0;
                    $("#cubikSheet").css("height", "0px").css("font-size", "0px").css("top", "10%");
                    setTimeout(function(){
                        $("#cubikSheet").html(tegs);
                        $("#cubikSheet").css("height", "80%").css("top", "10%").css("font-size", "18px");
                        setTimeout(function(){
                            readyEl = true;
                            $("#cubikSheet").attr("data-state", "1");
                        }, 1000);
                    }, 1000);    
                    
                    flag = true;
                    break;
                }
            }
            if(!flag){
                $("#cubikSheet").html(tegs);
                $("#cubikSheet").css("height", "80%").css("font-size", "18px").css("top", "10%");
                setTimeout(function(){
                    readyEl = true;
                    $("#cubikSheet").attr("data-state", "1");
                }, 1000);
            }
        }
        else{
            arrayClickCube[0] = 0;
            $("#cubikSheet").css("height", "0%").css("font-size", "0px").css("top", "10%");
            setTimeout(function(){
                readyEl = false;
                $("#cubikSheet").attr("data-state", "0");
            }, 1000);
        }
    }
);

$("#Left").click( // FAQ
    (event) => {
        if(!arrayClickCube[1]){
            arrayClickCube[1] = 1;
            let tegs = new String();
            tegs = "<h3><center>FAQ</center></h3>"+
            "<div style='margin-top: 1rem;'><details class='detail' style='padding-right: 3rem; outline: none;'><summary>How does click trading work?</summary><p style='margin-top: 0'>Trading is carried out using the buy and sell buttons located on the chart. A button with settings is also available, where it will be possible to configure some trading parameters. When you click on the buy or sell button, an order will be generated for the execution of the corresponding deal by your terminal.</p></details><details class='detail' style='padding-right: 3rem; outline: none;'><summary>How to correctly determine the ratio of tick values?</summary><p style='margin-top: 0' ><span style='color: red'>Tick value</span> is the fixed value of the minimum price offset for a given lot. Of course, the price of a tick depends on the volume of the position and you have the right to choose any volume - the main thing is that the volume for both instruments is equal, I usually take 1 lot as the standard, since the specifications usually indicate the price of a tick relative to 1 lot of the position volume. In general, it doesn't matter if we take 1 lot or 100 or 0.5, etc., since the ratio will eventually be the same. </p> <p> <span style = 'color: lime'> <b> Example: </b> </span> If we take 2 contracts: a futures contract for EUR CME and a futures contract for EUR FORTS, then, going into the specifications, we will see that at a tick of 0.00005 the cost of the first tick with 1 lot will be equal to 6.25 $, and the cost of the second at a tick of 0.0001 at the time of this writing = 6.89346 rubles (On the fort, this is not a fixed value that will constantly change). Now we have to either convert $ 6.25 into rubles, or convert $ 6.89346 into dollars. For example, I decide to convert 6.89346 rubles to dollars. To do this, I will find out the current USDRUR or USDRUB rate, which at the time of this writing is = 68.330. We convert rubles into dollars: 6.89346 / 68.330 = 0.10088 ... So we got the ratio, and the result is written in the input field. In this case, the inequality of ticks is taken into account by the algorithm in the calculation. It remains to enter the number of bars of the last history, for which the coefficients will be calculated. The algorithm, in turn, will automatically set the ratio for the first instrument = 1, and for the second, the already calculated contango / backwardation ratio relative to the first. Let me remind you that the obtained coefficients determine the lot when trading the created synthetics. So, for example, if we build a synthetic instrument from light oil and branded oil, the coefficients were determined relatively speaking as 1 and 1.2. Thus, when we decide to buy synthetics, we must buy k1 * lot of the first instrument and sell k2 * lot of the second instrument, where lot is the position volume in lots, and k1 and k2 are coefficients, respectively. From our example, to buy synthetics built from oil when trading 1 lot, we conclude a buy deal for light oil with a volume of 1 * 1 = 1 lot with a simultaneous sale of branded oil with a volume of 1 * 1.2 = 1.2 lots. This will be the purchase of a synthetic instrument. By analogy, when selling synthetics from oil instruments, we have to sell 1 * 1 = 1 lot of light oil and buy 1 * 1.2 = 1.2 lots of branded oil.</p></details></div>";
            let flag = false;
            for(let i = 0; i < arrayClickCube.length; ++i){
                if(i != 1 && arrayClickCube[i] == 1){
                    arrayClickCube[i] = 0;
                    $("#cubikSheet").css("height", "0px").css("font-size", "0px").css("top", "10%");
                    setTimeout(function(){
                        $("#cubikSheet").html(tegs);
                        $("#cubikSheet").css("height", "80%").css("top", "10%").css("font-size", "18px");
                        setTimeout(function(){
                            readyEl = true;
                            $("#cubikSheet").attr("data-state", "1");
                        }, 1000);
                    }, 1000);    
                    
                    flag = true;
                    break;
                }
            }
            if(!flag){
                $("#cubikSheet").html(tegs);
                $("#cubikSheet").css("height", "80%").css("font-size", "18px").css("top", "10%");
                setTimeout(function(){
                    readyEl = true;
                    $("#cubikSheet").attr("data-state", "1");
                }, 1000);
            }
        }
        else{
            arrayClickCube[1] = 0;
            $("#cubikSheet").css("height", "0%").css("font-size", "0px").css("top", "10%");
            setTimeout(function(){
                readyEl = false;
                $("#cubikSheet").attr("data-state", "0");
            }, 1000);
        }
    }
);

$("#Right").click( // DOWNLOADS
    (event) => {
        if(!arrayClickCube[2]){
            arrayClickCube[2] = 1;
            let tegs = new String();
            tegs = 
                "<h3><center>DOWNLOADS</center></h3>" +
                "<h2 style='margin-left: 1rem;'>Windows software kits:</h1>" +
                "<ul style='margin-left: 3rem; margin-top: -1rem;'>" +
                "<li><span class='mt4Ref'>For mt4 (Expert + dll)</span></li>" +
                "<li><span class='mt5Ref'>For mt5 (Expert + dll)</span></li>" +
                "<li><span class='quikRef'>For quik (Expert + dll)</span></li>" +
                "</ul>" +
                "<p style='margin-top: 0; margin-bottom: 0; color: silver; font-size: 14px;'><b>Instructions for installing software on mt4:</b></p>" +
                "<ol style='margin-top: 0; margin-left: 3rem; color: silver; font-size: 14px;'>" +
                "<li>Download the required archive from the link or archives if you need to connect several different terminals to the portal at once.</li>" +
                "<li>Copying the Expert Advisor from the archive ( <b>MT4_INVIZZZ.ex4</b> ) and paste it into the folder <b>Experts</b> MQL4 catalog.</li>" +
                "<li>Copying from archive dll (<b> dHttp.dll </b>) and paste it into the folder <b>Libraries</b> MQL4 catalog.</li>" +
                "</ol>" +
                "<p style='margin-top: 0; margin-bottom: 0;  color: silver; font-size: 14px;'><b>Instructions for installing software on mt5:</b></p>" +
                "<ol style='margin-top: 0; margin-left: 3rem;  color: silver; font-size: 14px;'>" +
                "<li>Download the required archive from the link or archives if you need to connect several different terminals to the portal at once.</li>" +
                "<li>Copying the Expert Advisor from the archive ( <b>MT5_INVIZZZ.ex4</b> ) and paste it into the folder <b>Experts</b> MQL5 catalog.</li>" +
                "<li>Copying from archive dll (<b> dHttp.dll </b>) and paste it into the folder <b>Libraries</b> MQL5 catalog.</li>" +
                "</ol>";
            
            
            
            let flag = false;
            for(let i = 0; i < arrayClickCube.length; ++i){
                if(i != 2 && arrayClickCube[i] == 1){
                    arrayClickCube[i] = 0;
                    $("#cubikSheet").css("height", "0px").css("font-size", "0px").css("top", "10%");
                    setTimeout(function(){
                        $("#cubikSheet").html(tegs);
                        $("#cubikSheet").css("height", "80%").css("top", "10%").css("font-size", "18px");
                        setTimeout(function(){
                            readyEl = true;
                            $("#cubikSheet").attr("data-state", "1");
                        }, 1000);
                    }, 1000);    
                    
                    flag = true;
                    break;
                }
            }
            if(!flag){
                $("#cubikSheet").html(tegs);
                $("#cubikSheet").css("height", "80%").css("font-size", "18px").css("top", "10%");
                setTimeout(function(){
                    readyEl = true;
                    $("#cubikSheet").attr("data-state", "1");
                }, 1000);
            }
        }
        else{
            arrayClickCube[2] = 0;
            $("#cubikSheet").css("height", "0%").css("font-size", "0px").css("top", "10%");
            setTimeout(function(){
                readyEl = false;
                $("#cubikSheet").attr("data-state", "0");
            }, 1000);
        }
    }
);

$("#Back").click( // ABOUT
    (event) => {
        if(!arrayClickCube[3]){
            arrayClickCube[3] = 1;
            let tegs = new String();
            tegs = "<h3><center>ABOUT</center></h3><p style='margin-top: 0;'>There is nothing here yet...</p>";
            let flag = false;
            for(let i = 0; i < arrayClickCube.length; ++i){
                if(i != 3 && arrayClickCube[i] == 1){
                    arrayClickCube[i] = 0;
                    $("#cubikSheet").css("height", "0px").css("font-size", "0px").css("top", "10%");
                    setTimeout(function(){
                        $("#cubikSheet").html(tegs);
                        $("#cubikSheet").css("height", "80%").css("top", "10%").css("font-size", "18px");
                        setTimeout(function(){
                            readyEl = true;
                            $("#cubikSheet").attr("data-state", "1");
                        }, 1000);
                    }, 1000);    
                    
                    flag = true;
                    break;
                }
            }
            if(!flag){
                $("#cubikSheet").html(tegs);
                $("#cubikSheet").css("height", "80%").css("font-size", "18px").css("top", "10%");
                setTimeout(function(){
                    readyEl = true;
                    $("#cubikSheet").attr("data-state", "1");
                }, 1000);
            }
        }
        else{
            arrayClickCube[3] = 0;
            $("#cubikSheet").css("height", "0%").css("font-size", "0px").css("top", "10%");
            setTimeout(function(){
                readyEl = false;
                $("#cubikSheet").attr("data-state", "0");
            }, 1000);
        }
    }
);

$("#Down").click( // WISHES
    (event) => {
        if(!arrayClickCube[4]){
            arrayClickCube[4] = 1;
            let tegs = new String();
            tegs = "<h3><center>WISHES</center></h3><p style='margin-top: 0;'>There is nothing here yet...</p>";
            let flag = false;
            for(let i = 0; i < arrayClickCube.length; ++i){
                if(i != 4 && arrayClickCube[i] == 1){
                    arrayClickCube[i] = 0;
                    $("#cubikSheet").css("height", "0px").css("font-size", "0px").css("top", "10%");
                    setTimeout(function(){
                        $("#cubikSheet").html(tegs);
                        $("#cubikSheet").css("height", "80%").css("top", "10%").css("font-size", "18px");
                        setTimeout(function(){
                            readyEl = true;
                            $("#cubikSheet").attr("data-state", "1");
                        }, 1000);
                    }, 1000);    
                    
                    flag = true;
                    break;
                }
            }
            if(!flag){
                $("#cubikSheet").html(tegs);
                $("#cubikSheet").css("height", "80%").css("font-size", "18px").css("top", "10%");
                setTimeout(function(){
                    readyEl = true;
                    $("#cubikSheet").attr("data-state", "1");
                }, 1000);
            }
        }
        else{
            arrayClickCube[4] = 0;
            $("#cubikSheet").css("height", "0%").css("font-size", "0px").css("top", "10%");
            setTimeout(function(){
                readyEl = false;
                $("#cubikSheet").attr("data-state", "0");
            }, 1000);
        }
    }
);

$("#Up").click( // NONE
    (event) => {
        if(!arrayClickCube[5]){
            arrayClickCube[5] = 1;
            let tegs = new String();
            tegs = "<h3><center>NONE</center></h3><p style='margin-top: 3rem;'>There is nothing here yet...</p>";
            let flag = false;
            for(let i = 0; i < arrayClickCube.length; ++i){
                if(i != 5 && arrayClickCube[i] == 1){
                    arrayClickCube[i] = 0;
                    $("#cubikSheet").css("height", "0px").css("font-size", "0px").css("top", "10%");
                    setTimeout(function(){
                        $("#cubikSheet").html(tegs);
                        $("#cubikSheet").css("height", "80%").css("top", "10%").css("font-size", "18px");
                        setTimeout(function(){
                            readyEl = true;
                            $("#cubikSheet").attr("data-state", "1");
                        }, 1000);
                    }, 1000);    
                    
                    flag = true;
                    break;
                }
            }
            if(!flag){
                $("#cubikSheet").html(tegs);
                $("#cubikSheet").css("height", "80%").css("font-size", "18px").css("top", "10%");
                setTimeout(function(){
                    readyEl = true;
                    $("#cubikSheet").attr("data-state", "1");
                }, 1000);
            }
        }
        else{
            arrayClickCube[5] = 0;
            $("#cubikSheet").css("height", "0%").css("font-size", "0px").css("top", "10%");
            setTimeout(function(){
                readyEl = false;
                $("#cubikSheet").attr("data-state", "0");
            }, 1000);
        }
    }
);
// -------------------------------------------------------------------------------------

// ------- БЛОК СКАЧИВАНИЯ ПРОГРАММНОГО ОБЕСПЕЧЕНИЯ:

$("#cubikSheet").on("click", ".mt4Ref", function(){
    messAlert("This action is not ready yet ...", 200, 3000)
    // ...
});

$("#cubikSheet").on("click", ".mt5Ref", function(){
    messAlert("This action is not ready yet ...", 200, 3000)
    // ...
});

$("#cubikSheet").on("click", ".quikRef", function(){
    messAlert("This action is not ready yet ...", 200, 3000)
    // ...
});

$("#cubikSheet").on("click", ".ninjaTraderRef", function(){
    messAlert("This action is not ready yet ...", 200, 3000)
    // ...
});

// -------------------------------------------------------------------------------------

// ------------------- Вызов справки: Клик по знаку ?:
function askAction(){
    $("#cubikSheet").attr("data-state", "1");
    $("#btn_01").click();
    setTimeout(function(){
        if(!arrayClickCube[6]){
                arrayClickCube[6] = 1;
                let tegs = new String();
                tegs  = "<h3 style='color:lime;'><center>How to correctly determine the ratio of tick values?</center></h3>"+
                        "<div style='margin-top: 1rem;'><p style='margin-top: 0' ><span style='color: red'>Tick value</span> is the fixed value of the minimum price offset for a given lot. Of course, the price of a tick depends on the volume of the position and you have the right to choose any volume - the main thing is that the volume for both instruments is equal, I usually take 1 lot as the standard, since the specifications usually indicate the price of a tick relative to 1 lot of the position volume. In general, it doesn't matter if we take 1 lot or 100 or 0.5, etc., since the ratio will eventually be the same. </p> <p> <span style = 'color: lime'> <b> Example: </b> </span> If we take 2 contracts: a futures contract for EUR CME and a futures contract for EUR FORTS, then, going into the specifications, we will see that at a tick of 0.00005 the cost of the first tick with 1 lot will be equal to 6.25 $, and the cost of the second at a tick of 0.0001 at the time of this writing = 6.89346 rubles (On the fort, this is not a fixed value that will constantly change). Now we have to either convert $ 6.25 into rubles, or convert $ 6.89346 into dollars. For example, I decide to convert 6.89346 rubles to dollars. To do this, I will find out the current USDRUR or USDRUB rate, which at the time of this writing is = 68.330. We convert rubles into dollars: 6.89346 / 68.330 = 0.10088 ... So we got the ratio, and the result is written in the input field. In this case, the inequality of ticks is taken into account by the algorithm in the calculation. It remains to enter the number of bars of the last history, for which the coefficients will be calculated. The algorithm, in turn, will automatically set the ratio for the first instrument = 1, and for the second, the already calculated contango / backwardation ratio relative to the first. Let me remind you that the obtained coefficients determine the lot when trading the created synthetics. So, for example, if we build a synthetic instrument from light oil and branded oil, the coefficients were determined relatively speaking as 1 and 1.2. Thus, when we decide to buy synthetics, we must buy k1 * lot of the first instrument and sell k2 * lot of the second instrument, where lot is the position volume in lots, and k1 and k2 are coefficients, respectively. From our example, to buy synthetics built from oil when trading 1 lot, we conclude a buy deal for light oil with a volume of 1 * 1 = 1 lot with a simultaneous sale of branded oil with a volume of 1 * 1.2 = 1.2 lots. This will be the purchase of a synthetic instrument. By analogy, when selling synthetics from oil instruments, we have to sell 1 * 1 = 1 lot of light oil and buy 1 * 1.2 = 1.2 lots of branded oil.</p></div>";
                let flag = false;
                for(let i = 0; i < arrayClickCube.length; ++i){
                    if(i != 6 && arrayClickCube[i] == 1){
                        arrayClickCube[i] = 0;
                        $("#cubikSheet").css("height", "0px").css("font-size", "0px").css("top", "10%");
                        setTimeout(function(){
                            $("#cubikSheet").html(tegs);
                            $("#cubikSheet").css("height", "80%").css("top", "10%").css("font-size", "18px");
                            setTimeout(function(){
                                readyEl = true;
                                $("#cubikSheet").attr("data-state", "1");
                            }, 1000);
                        }, 1000);    

                        flag = true;
                        break;
                    }
                }
                if(!flag){
                    $("#cubikSheet").html(tegs);
                    $("#cubikSheet").css("height", "80%").css("font-size", "18px").css("top", "10%");
                    setTimeout(function(){
                        readyEl = true;
                        $("#cubikSheet").attr("data-state", "1");
                    }, 1000);
                }
            }
            else{
                arrayClickCube[6] = 0;
                $("#cubikSheet").css("height", "0%").css("font-size", "0px").css("top", "10%");
                setTimeout(function(){
                    readyEl = false;
                    $("#cubikSheet").attr("data-state", "0");
                }, 1000);
            }
    }, 500);
}

$(".ASKBTN_ON").on("click", askAction);
$(".ASKBTN_OFF").on("click", askAction);
$(".ASKBTN_VERS").on("click", askAction);
// ---------------------------------------------------
