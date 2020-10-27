var O_or_M = null; // 0 is Online or Offline, and 1 is Mult.

var AutomaticTradingInterval = null;

var listener = false;
var LASTBID = [];
var LASTTIME = [];

var whatIsR = null;
var isActiveChart = false;
var globalPos_X = null;
var globalPos_Y = null;

var globalArray = []; // Глобальный массив, в котором содержится вся информация по полученным инструментам.
var globalCurrentBars = []; // Глобальный массив, в котором содержится информация по нулевым барам.
var once_iteration = false; // Запускаем интервал по считыванию нулевых баров лишь единожды !!!
var onceInterval = null;
// ===================================================================================================
//                                              Plotly
// ===================================================================================================
//var Plotly = require('plotly.js-dist');
//var Plotly = require("/node_modules/plotly.js-dist")
//var Plotly = require("/node_modules/plotly.js-dist/plotly.js")
//var Plotly = require("../../node_modules/plotly.js-dist/plotly.js")
var d3 = Plotly.d3;
var gd = document.getElementById('myDiv');

var Color = ["lime", "red", "white", "yellow", "purple", "orange", "blue", "orangered", "lightcoral", "gold"];

var isMouseDown = false;
var downClickX = null;
var downClickY = null;
var diffX = 0;
var diffY = 0;

var startLeft = null;
var startRight = null;
var startTop = null;
var startBottom = null;

var isPressedRULER = false;
var isPressedHLevel = false;
var isPressedVLevel = false;
var isPressedRect = false;
var isPressedText = false;
var pressedGrab = true;
var isCross = false;

var coordinates = [];

const __left = 60;// + 60;
const __top = 40 + 25;

var ADDEDSHAPESARRAY = [];

var intervalCurrentBar = null;

var epcilon = null;
var data = null;

var doubleRULER = false;
var doubleRect = false;
var fclickX = null;
var fclickY = null;
var fRectFirstClickX = null;
var fRectFirstClickY = null;

var GLOBAL = []; // Глобальный массив, который содержит информацию о наблюдаемых инструментах.
var GLOBALLength = 0;

var layout = null;
var oldL = null;
var oldR = null;
var __arrPriceOfTicks = null;
var KOEFS = [];
var __arrayNames = null;
var timeCounter = null;
const config = {
    modeBarButtonsToRemove: ["zoom2d", "pan2d", "select2d", "lasso2d", "zoomIn2d", "zoomOut2d", "autoScale2d", "resetScale2d",
                                    "hoverClosestCartesian", "hoverCompareCartesian",
                                    "zoom3d", "pan3d", "resetCameraDefault3d", "resetCameraLastSave3d", "hoverClosest3d",
                                    "orbitRotation", "tableRotation",
                                    "zoomInGeo", "zoomOutGeo", "resetGeo", "hoverClosestGeo",
                                    "toImage",
                                    "sendDataToCloud",
                                    "hoverClosestGl2d",
                                    "hoverClosestPie",
                                    "toggleHover",
                                    "resetViews",
                                    "toggleSpikelines",
                                    "resetViewMapbox"],
    displaylogo: false,
    showTips: false,
    scrollZoom: true
};
// ===================================================================================================
// ===================================================================================================

function Cleaner(){
    isCorrel = false;
    
    if(AutomaticTradingInterval != null){
        clearInterval(AutomaticTradingInterval);
        AutomaticTradingInterval = null;
    }
    
    if(isActiveChart){
        
        clearInterval(intervalCurrentBar);
        
        $("#GLOBALXXX_L").css("display", "none");
        $("#GLOBALXXX_T").css("display", "none");
        $("#GLOBALXXX_R").css("display", "none");
        $("#GLOBALXXX_B").css("display", "none");
        
        $(".tglevel").css("box-shadow", "none");
        $(".hlevel").css("box-shadow", "none");
        $(".vlevel").css("box-shadow", "none");
        $(".rect").css("box-shadow", "none");
        $(".text").css("box-shadow", "none");
        
        Plotly.deleteTraces("myDiv", 0); // ???
    }
    $(".Grab").css("box-shadow", "inset 0 0 33px lime");
	whatIsR = null;
	
    LASTBID = [];
    LASTTIME = [];
    
    O_or_M = null;
    
    isMouseDown = false;
    downClickX = null;
    downClickY = null;
    diffX = 0;
    diffY = 0;

    startLeft = null;
    startRight = null;
    startTop = null;
    startBottom = null;

    isPressedRULER = false;
    isPressedHLevel = false;
    isPressedVLevel = false;
    isPressedRect = false;
    isPressedText = false;
    pressedGrab = true;
    isCross = false;
	
	coordinates = [];
	ADDEDSHAPESARRAY = [];
	
	epcilon = null;
	data = null;
	
	doubleRULER = false;
	doubleRect = false;
	fclickX = null;
	fclickY = null;
	fRectFirstClickX = null;
	fRectFirstClickY = null;
	
	layout = null;
	oldL = null;
	oldR = null;
	__arrPriceOfTicks = null;
	KOEFS = [];
	__arrayNames = null;
	timeCounter = null;
    
    GLOBAL = []; // Глобальный массив, который содержит информацию о наблюдаемых инструментах.
    GLOBALLength = 0;
}


// ####################################################################################################

class OHLCTime {
    constructor() {
        this.Open = null;
        this.High = null;
        this.Low = null;
        this.Close = null;
        this.Time = null;

        this.Ask = null;
        this.Bid = null;
    }
}

class Instrument {
    constructor() {
        this.name = "";
        this.tFrame = "";
        this.tick = "";

        this.history = [];
        this.currentBar = []; // 0 & 1
    }
}



// ####################################################################################################

function getList() { // Получение списка инструментов LIST.
    setInterval(() => {
        $.ajax({
            type: "GET",
            url: "/getList",
            cache: false,
            success: function (_data) {
                if (_data) {
                    let getList = JSON.parse(_data);
                    
                    if(getList.List != undefined){
                        lastQtyOfInstruments = $(".multSheet div div div .tblSearch").children().length;
                        if (lastQtyOfInstruments != getList.List.length) {
                            // Удаляем списки:
                            $(".multSheet div div div .tblSearch").children().detach();
                            $(".arbVersionsSheet div div div .tblSearch").children().detach();
                            $(".arbOnlineSheet div div div .tblSearch").children().detach();
                            $(".arbOfflineSheet div div div .tblSearch").children().detach();
                            // Удаляем добавляемые элементы:
                            currentMultInstruments = [];
                            currentMultInstrumentsIndex = 0;
                            $(".tblSearch2").html("");
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
                            for (let i = 0; i < getList.List.length; ++i) {
                                // Добавляем элемент под индексом i в конец элемента:
                                let prepereEl = "<p class='instruments unselectable " + getList.List[i] + "'>" + getList.List[i] + "</p>";
                                $(".multSheet div div div .tblSearch").append(prepereEl);
                                $(".arbVersionsSheet div div div .tblSearch").append(prepereEl);
                                $(".arbOnlineSheet div div div .tblSearch").append(prepereEl);
                                $(".arbOfflineSheet div div div .tblSearch").append(prepereEl);
                            }
                            currentArrayList = getList.List;
                            lastQtyOfInstruments = getList.List.length;
                        }
                        
                        //-----------------------------------------------
                        // Инициализируем глобальный массив:
                        globalArray = getList.arr; // +++
                        // Единожды запускаем интервал на получение текущих баров:
                        if(!once_iteration){
                            once_iteration = true;
                            
                            onceInterval = setInterval(()=>{
                                $.ajax({
                                    type: "POST",
                                    url: "/getCurrentBars",
                                    cache: false,
                                    success: function (__data) {
                                        if (__data == "ERROR") {
                                            messAlert("Something went wrong...", 200, 5000);
                                        }
                                        else if(__data == "ELSE_TIME"){}
                                        else{
                                            globalCurrentBars = (JSON.parse(__data)).arr; // +++
                                            
                                            // Алгоритм определения текущего бара и добавления неактуального в историю:
                                            
                                            for(let i=0; i < globalArray.length; ++i){
                                                for(let j=0; j < globalCurrentBars.length; ++j){
                                                        if(globalCurrentBars[j].name == globalArray[i].name){
                                                            //console.log(globalCurrentBars[j].name + " === " + globalArray[i].name);
                                                            let flag = false; // Нужно ли перерисовывать сцену?
                                                            if(globalCurrentBars[j].currentBar[0].Time != null){
                                                                // Значит образовался новый бар
                                                                // Записываем новое время в значение последнего сравниваемого
                                                                // И добавляем к истории бар по индексу 1
                                                                if(globalCurrentBars[j].currentBar[0].Time != globalArray[i].currentBar[0].Time){
                                                                    flag = true;
                                                                    globalArray[i].history.push(globalCurrentBars[j].currentBar[1]);
                                                                    globalArray[i].currentBar[0] = globalCurrentBars[j].currentBar[0];
                                                                }
                                                                // В любом случае обновляем текущий бар:
                                                                globalArray[i].currentBar[0] = globalCurrentBars[j].currentBar[0];
                                                            }
                                                            break;
                                                        }
                                                }
                                            }
                                        }
                                    }
                                });
                            }, 50);
                        }
                    }
                    else{
                        if(_data == "ERROR"){
                            messAlert("Something went wrong...", 200, 5000);
                        }
                        else if(_data == "ELSE_TIME"){}
                    }
                }
            }
        });
    }, 1500);
}


function BUILD_ONLINE(instrName_01, instrName_02, koef_01, koef_02, divide){
    $("#btn_10").click();
    Cleaner();
    O_or_M = 0;
    isCorrel = true;
    // BUILD_OFFLINE(instrName_01, instrName_02, koef_01, koef_02, period, divide || 1);
    
    $(".buy").css("box-shadow", "none");
    $(".sell").css("box-shadow", "none");
    $(".A").css("box-shadow", "none");
    $(".MA").css("box-shadow", "none");
    
    whatIsR = "BUILD_ONLINE";
    
    if(divide == 1){
        __arrPriceOfTicks = [1.0, 1.0];
    }
    else{
        __arrPriceOfTicks = [1.0, 1.0/divide];
    }
    
    __arrayNames = [instrName_01, instrName_02];
    epcilon = 0;
    isActiveChart = true;
    
    
}

function BUILD_OFFLINE(instrName_01, instrName_02, koef_01, koef_02, divide){
    $("#btn_10").click();
    Cleaner();
    O_or_M = 0;
    isCorrel = true;

// Options variable:
    
//    lot_01 = 0.01;
//    lot_02 = 0.01;
//    minTarget = 5;
//    period_SMA = 50;
//    pircent_01 = 35;
//    pircent_02 = 75;
    var __isSMA = isSMA;
    
   
    
    whatIsR = "BUILD_OFFLINE";
    
    if(divide == 1){
        __arrPriceOfTicks = [1.0, 1.0];
        arrPriceOfTicks = __arrPriceOfTicks;
    }
    else{
        __arrPriceOfTicks = [1.0, 1.0/divide];
        arrPriceOfTicks = __arrPriceOfTicks;
    }
    
    arrayNames = [instrName_01, instrName_02];
    __arrayNames = arrayNames;
    epcilon = 0;
    isActiveChart = true;
    
    for (let j = 0; j < globalArray.length; ++j) {
        if (globalArray[j].name == arrayNames[0]) {
            GLOBAL[GLOBALLength] = globalArray[j];
            LASTBID.push(GLOBAL[GLOBALLength].currentBar[0]);
            LASTTIME.push(GLOBAL[GLOBALLength].history[GLOBAL[GLOBALLength].history.length - 1].Time);
            GLOBALLength++;
        }
        if (globalArray[j].name == arrayNames[1]) {
            GLOBAL[GLOBALLength] = globalArray[j];
            LASTBID.push(GLOBAL[GLOBALLength].currentBar[0]);
            LASTTIME.push(GLOBAL[GLOBALLength].history[GLOBAL[GLOBALLength].history.length - 1].Time);
            GLOBALLength++;
        }
    }
    
    
    // Проверяем инструменты на возможность к построению синтетики:
    if(parseFloat(GLOBAL[0].tick) == 0 || parseFloat(GLOBAL[1].tick) == 0){
        messAlert("Error in terminals API...", 200, 3000);
        return;
    }
    if(GLOBAL[0].tFrame != GLOBAL[1].tFrame){
        messAlert("It makes no sense to compare instruments of different timeframes.", 200, 3000);
        return;
    }
    // ------------------------------------------------------------
    
    
    // Приведение всех графиков к общей минимальной длине:
    let count = 0;
    let temp = "";

    // ПРИВЕДЕНИЕ ГРАФИКОВ К "ОБЩЕМУ ЗНАМЕНАТЕЛЮ":
    let result = []; // Общее время для всех чартов
    let dualSize = 0; // Общая длина для всех чартов.
    
    let minIndex = 0;
    for(let i=0; i < GLOBAL.length; ++i){
        if(GLOBAL[i].history.length < GLOBAL[minIndex].history.length){
            minIndex = i;
        }
    }
    
    
    for (let i = 0; i < GLOBAL[minIndex].history.length; ++i) {
        let count_ = 0;
        for (let j = 0; j < GLOBAL.length; ++j) {
            for(let n = 0; n < GLOBAL[j].history.length; ++n){
                if(GLOBAL[minIndex].history[i].Time == GLOBAL[j].history[n].Time){
                    count_++;
                    break;
                }
            }

        }
        if(count_ == GLOBAL.length){
            result[dualSize++] = GLOBAL[minIndex].history[i].Time;
        }
    }
    
    KOEFS[0] = koef_01;
    KOEFS[1] = koef_02;
    data = [];
    
        timeCounter = 0;
        
        
        let trace = {
            "x": [],
            "y": [],
            "time": [],
            "mode": "lines",
            "line": {color: "magenta", width: 1},
            "type": "scatter",
            "xaxis": "x",
            "yaxis": "y" //,"hoverinfo": 'y'
        };
        
    
    
    for(let n=0; n < result.length; ++n){
        let bfl = false;
        for(let j=0; j < GLOBAL[0].history.length; ++j){
            if(GLOBAL[0].history[j].Time == result[n]){
                for(let jj=0; jj < GLOBAL[1].history.length; ++jj){
                        if(GLOBAL[1].history[jj].Time == result[n]){
                            bfl = true;
                            break;
                        }
                }
                if(bfl){break;}
            }
        }
        if(bfl){
                trace.y.push((GLOBAL[0].history[n].Close * arrPriceOfTicks[0] * KOEFS[0] / GLOBAL[0].tick)-(GLOBAL[1].history[n].Close * arrPriceOfTicks[1] * KOEFS[1] / GLOBAL[1].tick));
                trace.time.push(GLOBAL[0].history[n].Time);
                trace.x.push(++timeCounter);
                
                GLOBAL[0].history[n].x = timeCounter;
            }
    }
    

        trace.y.push((GLOBAL[0].currentBar[0].Close * arrPriceOfTicks[0] * KOEFS[0] / GLOBAL[0].tick)-(GLOBAL[1].currentBar[1].Close * arrPriceOfTicks[1] * KOEFS[1] / GLOBAL[1].tick));
        trace.time.push(GLOBAL[0].currentBar[0].Time);
        trace.x.push(++timeCounter);
        
    // ===========================================================================
    if(__isSMA){
        let traceSMA = [
            {
                "x": [],
                "y": [],
                "time": [],
                "mode": "lines",
                "line": {color: "lime", width: 1},
                "type": "scatter",
                "xaxis": "x",
                "yaxis": "y"
            },
            {
                "x": [],
                "y": [],
                "time": [],
                "mode": "lines",
                "line": {color: "red", width: 1},
                "type": "scatter",
                "xaxis": "x",
                "yaxis": "y"
            },
            {
                "x": [],
                "y": [],
                "time": [],
                "mode": "lines",
                "line": {color: "yello", width: 1},
                "type": "scatter",
                "xaxis": "x",
                "yaxis": "y"
            },
            {
                "x": [],
                "y": [],
                "time": [],
                "mode": "lines",
                "line": {color: "red", width: 1},
                "type": "scatter",
                "xaxis": "x",
                "yaxis": "y"
            },
            {
                "x": [],
                "y": [],
                "time": [],
                "mode": "lines",
                "line": {color: "lime", width: 1},
                "type": "scatter",
                "xaxis": "x",
                "yaxis": "y"
            }
        ];
        
        
        if(trace.x.length > period_SMA){
            
            for(let i=period_SMA; i < trace.x.length; ++i){
                
                let AVG = 0.0;
                let counter = 0;
                let _MAX_ = -1e10;
                let _MIN_ = 1e10;
                
                for(let j=i-period_SMA; j <= i; ++j){
                    if(trace.y[j] > _MAX_){_MAX_ = trace.y[j];}
                    if(trace.y[j] < _MIN_){_MIN_ = trace.y[j];}
                    
                    AVG += trace.y[j];
                    counter++;
                } AVG /= counter;
                let _HIGH_ = _MAX_ - _MIN_;
                traceSMA[0].x.push(trace.x[i]);
                traceSMA[1].x.push(trace.x[i]);
                traceSMA[2].x.push(trace.x[i]);
                traceSMA[3].x.push(trace.x[i]);
                traceSMA[4].x.push(trace.x[i]);
                traceSMA[0].time.push(trace.time[i]);
                traceSMA[1].time.push(trace.time[i]);
                traceSMA[2].time.push(trace.time[i]);
                traceSMA[3].time.push(trace.time[i]);
                traceSMA[4].time.push(trace.time[i]);
                
                traceSMA[0].y.push(AVG + _HIGH_*0.50);
                traceSMA[1].y.push(AVG + _HIGH_*0.25);
                
                traceSMA[2].y.push(AVG);
                
                traceSMA[3].y.push(AVG - _HIGH_*0.25);
                traceSMA[4].y.push(AVG - _HIGH_*0.50);

            }
            
        }
        
        data = [trace, traceSMA[0], traceSMA[1], traceSMA[2], traceSMA[3], traceSMA[4]];
    }
    else{
        data[0] = trace;
    }
    
    
    // ===========================================================================
    
    
    let tempTitle = "<i><b>1.0</b> * <b>" + arrPriceOfTicks[0] + "</b> * " + arrayNames[0] + " / " + GLOBAL[0].tick + " - <b>" + KOEFS[1].toFixed(2) + "</b> * <b>" + arrPriceOfTicks[1] + "</b> * " + arrayNames[1] + " / " + GLOBAL[1].tick;
    

    let LeftIndex = (data[0].x.length >= 200) ? data[0].x.length - 201 : data[0].x.length - 1;
    let RightIndex = data[0].x.length - 1;
    

    let BottomValue = 1e20;
    let TopValue = -1e20;
    
        for(let j=LeftIndex; j < trace.y.length; ++j){
            if(trace.y[j] >= TopValue){
                TopValue = trace.y[j];
            }
            if(trace.y[j] <= BottomValue){
                BottomValue = trace.y[j];
            }
        }
    
    startTop = TopValue;
    startBottom = BottomValue;
    
    startLeft = data[0].x[LeftIndex];
    oldL = startLeft;
    startRight = data[0].x[RightIndex];
    oldR = startRight;
    
    
    oldR = startRight + ((startRight - startLeft)/5);
    startRight = oldR;
    
    console.log("L = " + startLeft);
    console.log("R = " + startRight);
    
    layout = {
        title: {
            text: tempTitle,
            font: {
                family: 'serif',
                color: "grey",
                size: 14
            },
            xref: 'paper',
            x: 0.10,
            y: 0.99
        },
        plot_bgcolor: "black",
        paper_bgcolor: "black",
        dragmode: 'pan', //  ['orbit', 'turntable', 'zoom', 'pan', False]
        margin: {
            r: 10,
            t: 25,
            b: 40,
            l: 60
        },
        showlegend: false,
        hovermode: false, // false - Убирает ховер при наведении на бар
        xaxis: {
            color: "red", // Цвет шкалы
            autorange: false,
            domain: [0, 1],
            range: [startLeft, startRight],
            rangeslider: {
                visible: false
            },
            type: 'linear',
            zeroline: false,
            showline: false,
            autotick: true,
            ticks: '',
            showticklabels: false
        },
        yaxis: {
            color: "red", // Цвет шкалы
            autorange: false,
            domain: [0, 1],
            range: [BottomValue, TopValue], // Диапазон показа по вертикали.
            type: 'linear',
            zeroline: true,
            showline: true
        },

        annotations: [],
        shapes: []
    };
    
    addinLevelsCORREL(null, null);
    
    
    intervalCurrentBar = setInterval(() => { // ***
        setTimeout(()=>{
            let Summ = 0.0;
            for (let i = 0; i < GLOBAL.length; ++i) {
                Summ += (GLOBAL[i].currentBar[0].Ask - GLOBAL[i].currentBar[0].Bid) / GLOBAL[i].tick;
            }
            $(".spanID_01").text("Total spread: " + Summ.toFixed(0) + " pp");
        }, 0);
        
        let candleCameCounter = 0;
        let tempTime = null;
        let needUpdate = false;
        for (let i = 0; i < GLOBAL.length; ++i) {
            for (let j = 0; j < globalArray.length; ++j) {
                if (GLOBAL[i].name == globalArray[j].name) {
                    if (LASTTIME[i] != globalArray[j].history[globalArray[j].history.length - 1].Time) {
                        // Не знаю почему, но тут происходит какая то магия... Код корректно работает, хотя явно выглядит неверным.
                        // По всей видимости здесь что то делается внутри самой библиотеки, так как данные GLOBAL[i].currentBar[0] полностью синхронизированны с данными globalArray[i].currentBar[0] хотя в коде нигде нет присваивания, чтобы эта синхронизация каким то образом обеспечивалась. По этой причине я ввел костыль: 2 массива: один хранит в себе данные о текущем баре за прошлую проверку а другой - данные о времени полностью сформированного бара за предыдущую проверку. Это необходимо, чтобы алгоритм смог распознать формирование нового бара.
                        // Значит пришел новый бар!!!
                        if(tempTime != null){
                            if(tempTime == globalArray[j].history[globalArray[j].history.length - 1].Time){
                                candleCameCounter++;
                            }
                        }
                        else{
                            tempTime = globalArray[j].history[globalArray[j].history.length - 1].Time;
                            candleCameCounter++;
                        }
                        break;
                    }
                }
            }
        }

        if (candleCameCounter == GLOBAL.length) {
            result.push(tempTime);
                let out = false;
                for (let j = 0; j < globalArray.length; ++j) {
                    if (GLOBAL[0].name == globalArray[j].name) {
                        for(let jj = 0; jj < globalArray.length; ++jj){
                            if(GLOBAL[1].name == globalArray[jj].name){
                                if (LASTTIME[0] != globalArray[j].history[globalArray[j].history.length - 1].Time){
                                    GLOBAL[0].history[GLOBAL[0].history.length - 1].Time = globalArray[j].history[globalArray[j].history.length - 1].Time;
                                    LASTTIME[0] = GLOBAL[0].history[GLOBAL[0].history.length - 1].Time;
                                    
                                    // Значит пришел новый бар!!!
                                    let newB = new OHLCTime();
                                    newB.Open = globalArray[j].history[globalArray[j].history.length - 1].Open;
                                    newB.High = globalArray[j].history[globalArray[j].history.length - 1].High;
                                    newB.Low = globalArray[j].history[globalArray[j].history.length - 1].Low;
                                    newB.Close = globalArray[j].history[globalArray[j].history.length - 1].Close;
                                    newB.Time = globalArray[j].history[globalArray[j].history.length - 1].Time;
                                    GLOBAL[0].history.push(newB);
                                }
                                if (LASTTIME[1] != globalArray[jj].history[globalArray[jj].history.length - 1].Time){
                                        GLOBAL[1].history[GLOBAL[1].history.length - 1].Time = globalArray[jj].history[globalArray[jj].history.length - 1].Time;
                                    LASTTIME[1] = GLOBAL[1].history[GLOBAL[1].history.length - 1].Time;
                                    
                                    // Значит пришел новый бар!!!
                                    let newB = new OHLCTime();
                                    newB.Open = globalArray[jj].history[globalArray[jj].history.length - 1].Open;
                                    newB.High = globalArray[jj].history[globalArray[jj].history.length - 1].High;
                                    newB.Low = globalArray[jj].history[globalArray[jj].history.length - 1].Low;
                                    newB.Close = globalArray[jj].history[globalArray[jj].history.length - 1].Close;
                                    newB.Time = globalArray[jj].history[globalArray[jj].history.length - 1].Time;
                                    GLOBAL[1].history.push(newB);
                                }

                                    // Корректировка последнего сформированного бара:
                                    data[0].y[data[0].y.length-1] = ((GLOBAL[0].history[GLOBAL[0].history.length - 2].Close * arrPriceOfTicks[0] * KOEFS[0] / GLOBAL[0].tick)-(GLOBAL[1].history[GLOBAL[1].history.length - 2].Close * arrPriceOfTicks[1] * KOEFS[1] / GLOBAL[1].tick));
                                
                                    data[0].y.push((GLOBAL[0].history[GLOBAL[0].history.length - 1].Close * arrPriceOfTicks[0] * KOEFS[0] / GLOBAL[0].tick)-(GLOBAL[1].history[GLOBAL[1].history.length - 1].Close * arrPriceOfTicks[1] * KOEFS[1] / GLOBAL[1].tick));
                                    data[0].time.push(GLOBAL[0].history[GLOBAL[0].history.length - 1].Time);
                                    data[0].x.push(result.length);
                                    needUpdate = true;
                                    out = true;
                                
                                    
                                    if(__isSMA){
                                        if(data[0].x.length > period_SMA){
                                            
                                            let AVG = 0.0;
                                            let counter = 0;
                                            let _MAX_ = -1e10;
                                            let _MIN_ = 1e10;
                                            
                                            for(let i = data[0].x.length - 2; i >= data[0].x.length - 2 - period_SMA; --i){

                                                if(trace.y[i] > _MAX_){_MAX_ = trace.y[i];}
                                                if(trace.y[i] < _MIN_){_MIN_ = trace.y[i];}

                                                AVG += trace.y[i];
                                                counter++;
                                            } AVG /= counter;
                                                let _HIGH_ = _MAX_ - _MIN_;
                                                data[1].x[data[1].x.length-1] = data[0].x[data[0].x.length-2];
                                                data[2].x[data[2].x.length-1] = data[0].x[data[0].x.length-2];
                                                data[3].x[data[3].x.length-1] = data[0].x[data[0].x.length-2];
                                                data[4].x[data[4].x.length-1] = data[0].x[data[0].x.length-2];
                                                data[5].x[data[5].x.length-1] = data[0].x[data[0].x.length-2];
                                                data[1].time[data[1].x.length-1] = data[0].time[data[0].x.length-2];
                                                data[2].time[data[2].x.length-1] = data[0].time[data[0].x.length-2];
                                                data[3].time[data[3].x.length-1] = data[0].time[data[0].x.length-2];
                                                data[4].time[data[4].x.length-1] = data[0].time[data[0].x.length-2];
                                                data[5].time[data[5].x.length-1] = data[0].time[data[0].x.length-2];

                                                data[1].y[data[1].y.length-2] = AVG + _HIGH_*0.50;
                                                data[2].y[data[2].y.length-2] = AVG + _HIGH_*0.25;

                                                data[3].y[data[3].y.length-2] = AVG;

                                                data[4].y[data[4].y.length-2] = AVG - _HIGH_*0.25;
                                                data[5].y[data[5].y.length-2] = AVG - _HIGH_*0.50;

                                            
                                                AVG *= counter;
                                                AVG += data[0].y[data[0].y.length-1] - data[0].y[data[0].y.length-2-period_SMA];
                                                AVG /= counter;
                                                if(data[0].y[data[0].y.length-1]>_MAX_){_MAX_ = data[0].y[data[0].y.length-1];}
                                                if(data[0].y[data[0].y.length-1]<_MIN_){_MIN_ = data[0].y[data[0].y.length-1];}
                                            
                                                data[1].x.push(data[0].x[data[0].x.length-1]);
                                                data[2].x.push(data[0].x[data[0].x.length-1]);
                                                data[3].x.push(data[0].x[data[0].x.length-1]);
                                                data[4].x.push(data[0].x[data[0].x.length-1]);
                                                data[5].x.push(data[0].x[data[0].x.length-1]);
                                                data[1].time.push(data[0].time[data[0].x.length-1]);
                                                data[2].time.push(data[0].time[data[0].x.length-1]);
                                                data[3].time.push(data[0].time[data[0].x.length-1]);
                                                data[4].time.push(data[0].time[data[0].x.length-1]);
                                                data[5].time.push(data[0].time[data[0].x.length-1]);

                                                data[1].y.push(AVG + _HIGH_*0.50);
                                                data[2].y.push(AVG + _HIGH_*0.25);

                                                data[3].y.push(AVG);

                                                data[4].y.push(AVG - _HIGH_*0.25);
                                                data[5].y.push(AVG - _HIGH_*0.50);
                                            }
                                        }
                                    }
                                    break;
                            }
                        }
                        
                        if(out){break;}
                        
                    }
                }
        //}


        // Обновляем котировки по тек. бару:
        for (let i = 0; i < GLOBAL.length; ++i) {
            for (let j = 0; j < globalArray.length; ++j) {
                if (GLOBAL[i].name == globalArray[j].name) {
                    if (LASTBID[i].Bid != globalArray[j].currentBar[0].Bid) {
                        LASTBID[i].Bid = globalArray[j].currentBar[0].Bid;
                        needUpdate = true;
                        GLOBAL[i].currentBar[0].Ask = globalArray[j].currentBar[0].Ask;
                        GLOBAL[i].currentBar[0].Bid = globalArray[j].currentBar[0].Bid;
                        GLOBAL[i].currentBar[1].Ask = globalArray[j].currentBar[1].Ask;
                        GLOBAL[i].currentBar[1].Bid = globalArray[j].currentBar[1].Bid;
                        break;
                    }
                }
            }
        }
        
        layout.shapes[0].y0 = ((GLOBAL[0].currentBar[0].Bid * arrPriceOfTicks[0] * KOEFS[0] / GLOBAL[0].tick)-(GLOBAL[1].currentBar[0].Bid * arrPriceOfTicks[1] * KOEFS[1] / GLOBAL[1].tick));
        layout.shapes[0].y1 = ((GLOBAL[0].currentBar[0].Bid * arrPriceOfTicks[0] * KOEFS[0] / GLOBAL[0].tick)-(GLOBAL[1].currentBar[0].Bid * arrPriceOfTicks[1] * KOEFS[1] / GLOBAL[1].tick));
        data[0].y[data[0].y.length-1] = ((GLOBAL[0].currentBar[0].Close * arrPriceOfTicks[0] * KOEFS[0] / GLOBAL[0].tick)-(GLOBAL[1].currentBar[0].Close * arrPriceOfTicks[1] * KOEFS[1] / GLOBAL[1].tick));
        data[0].time[data[0].time.length-1] = GLOBAL[0].currentBar[0].Time;
        data[0].x[data[0].x.length-1] = data[0].x.length;
        
        if (needUpdate) {
            addinLevelsCORREL(layout.shapes, layout.annotations);
            //Plotly.relayout("myDiv", layout);
            //Plotly.redraw('myDiv', data, layout, config);
            Plotly.update('myDiv', data, layout, config);
        }
    }, 100);

    Plotly.newPlot('myDiv', data, layout, config).then(attach);
}


function BUILD_MULT(arrayNames, arrPriceOfTicks, comeBack){
    $("#btn_10").click();
    Cleaner();
    O_or_M = 1;

//    $(".buy").css("box-shadow", "inset 0 0 15px red");
//    $(".sell").css("box-shadow", "inset 0 0 15px red");
//    $(".A").css("box-shadow", "inset 0 0 15px red");
//    $(".MA").css("box-shadow", "inset 0 0 15px red");
    
    whatIsR = "BUILD_MULT";
    __arrPriceOfTicks = arrPriceOfTicks;
    __arrayNames = arrayNames;
    epcilon = 0;
    isActiveChart = true;
    for(let i=0; i < arrayNames.length; ++i){
        for(let j=0; j < globalArray.length; ++j){
            if(globalArray[j].name == arrayNames[i]){
                GLOBAL[GLOBALLength] = globalArray[j];
                LASTBID.push(GLOBAL[GLOBALLength].currentBar[0]);
                LASTTIME.push(GLOBAL[GLOBALLength].history[GLOBAL[GLOBALLength].history.length-1].Time);
                GLOBALLength++;
                break;
            }
        }
    }
    
    
    // Проверяем инструменты на возможность к построению синтетики:
    let checkTFrame = GLOBAL[0].tFrame;
    for(let i=1; i < GLOBAL.length; ++i){
        if(parseFloat(GLOBAL[i].tick) == 0){
            messAlert("Error in terminals API...", 200, 3000);
            return;
        }
        if(checkTFrame != GLOBAL[i].tFrame){
            messAlert("It makes no sense to compare instruments of different timeframes.", 200, 3000);
            return;
        }
    }
    // ------------------------------------------------------------
    
    
    // Приведение всех графиков к общей минимальной длине:
    let count = 0;
    let temp = "";

    // ПРИВЕДЕНИЕ ГРАФИКОВ К "ОБЩЕМУ ЗНАМЕНАТЕЛЮ":
    let result = []; // Общее время для всех чартов
    let dualSize = 0; // Общая длина для всех чартов.
    
    let minIndex = 0;
    for(let i=0; i < GLOBAL.length; ++i){
        if(GLOBAL[i].history.length < GLOBAL[minIndex].history.length){
            minIndex = i;
        }
    }
    
    
    for (let i = 0; i < GLOBAL[minIndex].history.length; ++i) {
        let count_ = 0;
        for (let j = 0; j < GLOBAL.length; ++j) {
            for(let n = 0; n < GLOBAL[j].history.length; ++n){
                if(GLOBAL[minIndex].history[i].Time == GLOBAL[j].history[n].Time){
                    count_++;
                    break;
                }
            }

        }
        if(count_ == GLOBAL.length){
            result[dualSize++] = GLOBAL[minIndex].history[i].Time;
        }
    }
    
    KOEFS = [];
    
    let tempValue = GLOBAL[0].history[GLOBAL[0].history.length - comeBack - 1].Close * arrPriceOfTicks[0] / GLOBAL[0].tick;
    KOEFS.push(1.0);
    for(let i=1; i < GLOBAL.length; ++i){
        KOEFS.push(tempValue/(GLOBAL[i].history[GLOBAL[i].history.length - comeBack - 1].Close * arrPriceOfTicks[i] / GLOBAL[i].tick));
    }
    
    data = [];
    for(let i=0; i < GLOBAL.length; ++i){
        let colorIndex = i%10;
        timeCounter = 0;
        
        let descr = "";
        for(let u=0; u < GLOBAL[i].name.length; ++u){
            if(GLOBAL[i].name[u] != "#"){
                descr += GLOBAL[i].name[u];
            }
            else{
                break;
            }
        }
        
        let trace = {
            "name": descr,
            "open":[],
            "high":[],
            "low":[],
            "close":[],
            "x": [],
            "time":[],
            "decreasing": {line: {color: Color[colorIndex]}},
            "increasing": {line: {color: Color[colorIndex]}},
            "line": {color: Color[colorIndex], width: 0.5},
            "type": "candlestick",
            "xaxis": "x",
            "yaxis": "y",
            "hoverinfo": 'y'
        };
        
        for(let j=0; j < GLOBAL[i].history.length; ++j){
            let bfl = false;
            for(let n=0; n < result.length; ++n){
                if(GLOBAL[i].history[j].Time == result[n]){
                    bfl = true;
                    break;
                }
            }
            if(bfl){
                trace.open.push(GLOBAL[i].history[j].Open * arrPriceOfTicks[i] * KOEFS[i] / GLOBAL[i].tick);
                trace.high.push(GLOBAL[i].history[j].High * arrPriceOfTicks[i] * KOEFS[i] / GLOBAL[i].tick);
                trace.low.push(GLOBAL[i].history[j].Low * arrPriceOfTicks[i] * KOEFS[i] / GLOBAL[i].tick);
                trace.close.push(GLOBAL[i].history[j].Close * arrPriceOfTicks[i] * KOEFS[i] / GLOBAL[i].tick);
                trace.time.push(GLOBAL[i].history[j].Time);
                trace.x.push(++timeCounter);
                GLOBAL[i].history[j].x = timeCounter;
            }
        }
        
        trace.open.push(GLOBAL[i].currentBar[0].Open * arrPriceOfTicks[i] * KOEFS[i] / GLOBAL[i].tick);
        trace.high.push(GLOBAL[i].currentBar[0].High * arrPriceOfTicks[i] * KOEFS[i] / GLOBAL[i].tick);
        trace.low.push(GLOBAL[i].currentBar[0].Low * arrPriceOfTicks[i] * KOEFS[i] / GLOBAL[i].tick);
        trace.close.push(GLOBAL[i].currentBar[0].Close * arrPriceOfTicks[i] * KOEFS[i] / GLOBAL[i].tick);
        trace.time.push(GLOBAL[i].currentBar[0].Time);
        trace.x.push(++timeCounter);
        
        data[i] = trace;
    }
    
    let tempTitR = "<br><b>Current" + data[0].name + "spread:</b> " + (GLOBAL[0].currentBar[0].Ask - GLOBAL[0].currentBar[0].Bid);
    let tempTitle = "<i><b>" + arrayNames.length + ".0</b> * " + arrayNames[0];
    for(let i=1; i < arrayNames.length; ++i){
        tempTitR += "<br><b>Current" + data[i].name + "spread:</b> " + (GLOBAL[i].currentBar[0].Ask - GLOBAL[i].currentBar[0].Bid);
        if(i%3 == 0){
            tempTitle += "<br>";
        }
        tempTitle += " - <b>" + KOEFS[i].toFixed(2) + "</b> * " + arrayNames[i];
    } tempTitle += "</i>";
    

    let LeftIndex = (data[0].x.length >= 200) ? data[0].x.length - 201 : data[0].x.length - 1;
    let RightIndex = data[0].x.length - 1;
    

    let BottomValue = 1e20;
    let TopValue = -1e20;
    for(let i=0; i < GLOBAL.length; ++i){
        for(let j=LeftIndex; j < data[i].x.length; ++j){
            if(data[i].high[j] >= TopValue){
                TopValue = data[i].high[j];
            }
            if(data[i].low[j] <= BottomValue){
                BottomValue = data[i].low[j];
            }
        }
    }
    
    startTop = TopValue;
    startBottom = BottomValue;
    
    startLeft = data[0].x[LeftIndex];
    oldL = startLeft;
    startRight = data[0].x[RightIndex];
    oldR = startRight;
    
        
    oldR = startRight + ((startRight - startLeft)/5);
    startRight = oldR;
    
    layout = {
        title: {
            text: tempTitle,
            font: {
                family: 'serif',
                color: "grey",
                size: 14
            },
            xref: 'paper',
            x: 0.10,
            y: 0.99
        },
        plot_bgcolor: "black",
        paper_bgcolor: "black",
        dragmode: 'pan', //  ['orbit', 'turntable', 'zoom', 'pan', False]
        margin: {
            r: 10,
            t: 25,
            b: 40,
            l: 60
        },
        showlegend: true,
        hovermode: false, // false - Убирает ховер при наведении на бар
        xaxis: {
            color: "red", // Цвет шкалы
            autorange: false,
            domain: [0, 1],
            range: [startLeft, startRight],
            rangeslider: {
                visible: false
            },
            type: 'linear',
            zeroline: false,
            showline: false,
            autotick: true,
            ticks: '',
            showticklabels: false
        },
        yaxis: {
            color: "red", // Цвет шкалы
            autorange: false,
            domain: [0, 1],
            range: [BottomValue, TopValue], // Диапазон показа по вертикали.
            type: 'linear',
            zeroline: true,
            showline: true
        },

        annotations: [],
        shapes: []
    };
    
    addinLevels(null, null);
    
    intervalCurrentBar = setInterval(() => { // ***
        setTimeout(()=>{
            let Summ = 0.0;
            for (let i = 0; i < GLOBAL.length; ++i) {
                Summ += (GLOBAL[i].currentBar[0].Ask - GLOBAL[i].currentBar[0].Bid) / GLOBAL[i].tick;
            }
            $(".spanID_01").text("Total spread: " + Summ.toFixed(0) + " pp");
        }, 0);
        
        let candleCameCounter = 0;
        let tempTime = null;
        let needUpdate = false;
        for (let i = 0; i < GLOBAL.length; ++i) {
            for (let j = 0; j < globalArray.length; ++j) {
                if (GLOBAL[i].name == globalArray[j].name) {
                    if (LASTTIME[i] != globalArray[j].history[globalArray[j].history.length - 1].Time) {
                        // Не знаю почему, но тут происходит какая то магия... Код корректно работает, хотя явно выглядит неверным.
                        // По всей видимости здесь что то делается внутри самой библиотеки, так как данные GLOBAL[i].currentBar[0] полностью синхронизированны с данными globalArray[i].currentBar[0] хотя в коде нигде нет присваивания, чтобы эта синхронизация каким то образом обеспечивалась. По этой причине я ввел костыль: 2 массива: один хранит в себе данные о текущем баре за прошлую проверку а другой - данные о времени полностью сформированного бара за предыдущую проверку. Это необходимо, чтобы алгоритм смог распознать формирование нового бара.
                        // Значит пришел новый бар!!!
                        if(tempTime != null){
                            if(tempTime == globalArray[j].history[globalArray[j].history.length - 1].Time){
                                candleCameCounter++;
                            }
                        }
                        else{
                            tempTime = globalArray[j].history[globalArray[j].history.length - 1].Time;
                            candleCameCounter++;
                        }
                        break;
                    }
                }
            }
        }

        if (candleCameCounter == GLOBAL.length) {
            result.push(tempTime);
            
            for (let i = 0; i < GLOBAL.length; ++i) {
                for (let j = 0; j < globalArray.length; ++j) {
                    if (GLOBAL[i].name == globalArray[j].name) {
                        if (LASTTIME[i] != globalArray[j].history[globalArray[j].history.length - 1].Time) {
                            GLOBAL[i].history[GLOBAL[i].history.length - 1].Time = globalArray[j].history[globalArray[j].history.length - 1].Time;
                            LASTTIME[i] = GLOBAL[i].history[GLOBAL[i].history.length - 1].Time;
                            // Значит пришел новый бар!!!
                            let newB = new OHLCTime();
                            newB.Open = globalArray[j].history[globalArray[j].history.length - 1].Open * arrPriceOfTicks[i] * KOEFS[i] / GLOBAL[i].tick;
                            newB.High = globalArray[j].history[globalArray[j].history.length - 1].High * arrPriceOfTicks[i] * KOEFS[i] / GLOBAL[i].tick;
                            newB.Low = globalArray[j].history[globalArray[j].history.length - 1].Low * arrPriceOfTicks[i] * KOEFS[i] / GLOBAL[i].tick;
                            newB.Close = globalArray[j].history[globalArray[j].history.length - 1].Close * arrPriceOfTicks[i] * KOEFS[i] / GLOBAL[i].tick;
                            newB.Time = globalArray[j].history[globalArray[j].history.length - 1].Time;
                            GLOBAL[i].history.push(newB);
                            
                            // Корректировка последнего сформированного бара:
                            data[i].open[data[i].open.length-1] = GLOBAL[i].history[GLOBAL[i].history.length - 2].Open * arrPriceOfTicks[i] * KOEFS[i] / GLOBAL[i].tick;
                            data[i].high[data[i].high.length-1] = GLOBAL[i].history[GLOBAL[i].history.length - 2].High * arrPriceOfTicks[i] * KOEFS[i] / GLOBAL[i].tick;
                            data[i].low[data[i].low.length-1] = GLOBAL[i].history[GLOBAL[i].history.length - 2].Low * arrPriceOfTicks[i] * KOEFS[i] / GLOBAL[i].tick;
                            data[i].close[data[i].close.length-1] = GLOBAL[i].history[GLOBAL[i].history.length - 2].Close * arrPriceOfTicks[i] * KOEFS[i] / GLOBAL[i].tick;
                            // ----------------
                            
                            data[i].open.push(GLOBAL[i].history[GLOBAL[i].history.length - 1].Open * arrPriceOfTicks[i] * KOEFS[i] / GLOBAL[i].tick);
                            data[i].high.push(GLOBAL[i].history[GLOBAL[i].history.length - 1].High * arrPriceOfTicks[i] * KOEFS[i] / GLOBAL[i].tick);
                            data[i].low.push(GLOBAL[i].history[GLOBAL[i].history.length - 1].Low * arrPriceOfTicks[i] * KOEFS[i] / GLOBAL[i].tick);
                            data[i].close.push(GLOBAL[i].history[GLOBAL[i].history.length - 1].Close * arrPriceOfTicks[i] * KOEFS[i] / GLOBAL[i].tick);
                            data[i].time.push(GLOBAL[i].history[GLOBAL[i].history.length - 1].Time);
                            data[i].x.push(result.length);
                            needUpdate = true;
                            break;
                        }
                    }
                }
            }
        }


        // Обновляем котировки по тек. бару:
        for (let i = 0; i < GLOBAL.length; ++i) {
            for (let j = 0; j < globalArray.length; ++j) {
                if (GLOBAL[i].name == globalArray[j].name) {
                    if (LASTBID[i].Bid != globalArray[j].currentBar[0].Bid) {
                        LASTBID[i].Bid = globalArray[j].currentBar[0].Bid;
                        needUpdate = true;
                        GLOBAL[i].currentBar[0].Ask = globalArray[j].currentBar[0].Ask;
                        GLOBAL[i].currentBar[0].Bid = globalArray[j].currentBar[0].Bid;
                        GLOBAL[i].currentBar[1].Ask = globalArray[j].currentBar[1].Ask;
                        GLOBAL[i].currentBar[1].Bid = globalArray[j].currentBar[1].Bid;

                        layout.shapes[i].y0 = GLOBAL[i].currentBar[0].Bid * arrPriceOfTicks[i] * KOEFS[i] / GLOBAL[i].tick;
                        layout.shapes[i].y1 = GLOBAL[i].currentBar[0].Bid * arrPriceOfTicks[i] * KOEFS[i] / GLOBAL[i].tick;
                        data[i].open[data[i].open.length-1] = GLOBAL[i].currentBar[0].Open * arrPriceOfTicks[i] * KOEFS[i] / GLOBAL[i].tick;
                        data[i].high[data[i].high.length-1] = GLOBAL[i].currentBar[0].High * arrPriceOfTicks[i] * KOEFS[i] / GLOBAL[i].tick;
                        data[i].low[data[i].low.length-1] = GLOBAL[i].currentBar[0].Low * arrPriceOfTicks[i] * KOEFS[i] / GLOBAL[i].tick;
                        data[i].close[data[i].close.length-1] = GLOBAL[i].currentBar[0].Close * arrPriceOfTicks[i] * KOEFS[i] / GLOBAL[i].tick;
                        data[i].time[data[i].time.length-1] = GLOBAL[i].currentBar[0].Time;
                        data[i].x[data[i].x.length-1] = data[i].x.length;
                        break;
                    }
                }
            }
        }
        if (needUpdate) {
            addinLevels(layout.shapes, layout.annotations);
            //Plotly.relayout("myDiv", layout);
            //Plotly.redraw('myDiv', data, layout, config);
            Plotly.update('myDiv', data, layout, config);
        }
    }, 100);

    Plotly.newPlot('myDiv', data, layout, config).then(attach);
}

function attach() {
    if(!listener){
        listener = true;
        
        gd.addEventListener('mousedown', function (evt) {
            setTimeout(()=>{
                isMouseDown = true;
                let xaxis = gd._fullLayout.xaxis;
                let yaxis = gd._fullLayout.yaxis;

                let xInDataCoord = xaxis.p2c(evt.x - __left);
                let yInDataCoord = yaxis.p2c(evt.y - __top);
                downClickX = xInDataCoord;
                downClickY = yInDataCoord;
            }, 0);
        });

        document.addEventListener('mouseup', (evt) => {
            setTimeout(()=>{
                let xaxis = gd._fullLayout.xaxis;
                let yaxis = gd._fullLayout.yaxis;

                let xInDataCoord = xaxis.p2c(evt.x - __left);
                let yInDataCoord = yaxis.p2c(evt.y - __top);

                if (isMouseDown) {
                    isMouseDown = false;

                    diffX = xInDataCoord - downClickX;
                    diffY = yInDataCoord - downClickY;

                    let coefic = (!O_or_M) ? 50 : 0.5;
                    if (!pressedGrab) {
                        if (isPressedVLevel) { // +++
                            let newLine = {
                                type: 'line',
                                xref: "x",
                                yref: "y",
                                x0: xInDataCoord,
                                y0: layout.yaxis.range[0],
                                x1: xInDataCoord,
                                y1: layout.yaxis.range[1],
                                line: {
                                    color: "blue",
                                    width: 2,
                                    dash: 'solid'
                                }
                            };

                            ADDEDSHAPESARRAY.push(1);

                            layout.shapes.push(newLine);
                            setTimeout(()=>{
                                Plotly.relayout("myDiv", layout);
                            }, 50);
                        } else if (isPressedHLevel) {
                            let newLine = {
                                type: 'line',
                                xref: "x",
                                yref: "y",
                                x0: 0,
                                y0: yInDataCoord,
                                x1: data[0].x[data[0].x.length-1] + 1000,
                                y1: yInDataCoord,
                                line: {
                                    color: "blue",
                                    width: 2,
                                    dash: 'solid'
                                }
                            };

                            let newText = {
                                xref: 'x',
                                yref: 'y',
                                x: layout.xaxis.range[1] - 60,
                                y: yInDataCoord,
                                yanchor: 'bottom',
                                text: yInDataCoord.toFixed(0),
                                font: {
                                    family: 'sans serif',
                                    size: 12,
                                    color: 'blue'
                                },
                                showarrow: false
                            };

                            ADDEDSHAPESARRAY.push(10);

                            layout.annotations.push(newText);
                            layout.shapes.push(newLine);
                            setTimeout(()=>{
                                Plotly.relayout("myDiv", layout);
                            }, 50);
                        } else if (isPressedText) {
                            let newText = {
                                xref: 'x',
                                yref: 'y',
                                x: xInDataCoord,
                                //xanchor: 'right',
                                y: yInDataCoord,
                                yanchor: 'bottom',
                                text: prompt("Enter your text:"),
                                font: {
                                    family: 'sans serif',
                                    size: 16,
                                    color: 'lime'
                                },
                                showarrow: false
                            }

                            ADDEDSHAPESARRAY.push(2);

                            layout.annotations.push(newText);
                            setTimeout(()=>{
                                Plotly.relayout("myDiv", layout);
                            }, 50);
                        }
                    }
                }      
            }, 0);
        });

        gd.addEventListener("click", function (evt) {
            setTimeout(()=>{
                let xaxis = gd._fullLayout.xaxis;
                let yaxis = gd._fullLayout.yaxis;

                coordinates[0] = xaxis.p2c(evt.x - __left); // X
                coordinates[1] = yaxis.p2c(evt.y - __top); // Y

                let ll = evt.pageX;
                let tt = evt.pageY - 40;

                if(isPressedRULER && !doubleRULER){
                    doubleRULER = true;
                    fclickX = ll;
                    fclickY = tt;
                }
                else if(isPressedRULER && doubleRULER){
                    doubleRULER = false;
                    $("#GLOBAL_RULER").css("display", "none");
                }
                else if(isPressedRect && !doubleRect){
                    doubleRect = true;

                    fclickX = ll;
                    fclickY = tt;
                    fRectFirstClickX = coordinates[0];
                    fRectFirstClickY = coordinates[1];
                }
                else if(isPressedRect && doubleRect){
                    doubleRect = false;
                    $("#GLOBAL_RECT").css("display", "none");

                    diffX = coordinates[0] - fRectFirstClickX;
                    diffY = coordinates[1] - fRectFirstClickY;

                            let newRect = {
                                type: 'rect',
                                xref: 'x',
                                yref: 'y',
                                x0: coordinates[0],
                                y0: coordinates[1],
                                x1: fRectFirstClickX,
                                y1: fRectFirstClickY,
                                fillcolor: 'red',
                                opacity: 0.5,
                                line: {
                                    width: 1
                                }
                            };

                            ADDEDSHAPESARRAY.push(1);
                            layout.shapes.push(newRect);
                            Plotly.relayout("myDiv", layout);
                }
            }, 0);
        });
    
        gd.addEventListener('mousemove', function (evt) {
            setTimeout(()=>{
                let xaxis = gd._fullLayout.xaxis;
                let yaxis = gd._fullLayout.yaxis;

                coordinates[0] = xaxis.p2c(evt.x - __left); // X
                coordinates[1] = yaxis.p2c(evt.y - __top); // Y

                messToStatus("  |  Price: " + coordinates[1].toFixed(0) + "  |  Time: " + data[0].time[coordinates[0].toFixed(0)-1]);

                setTimeout(()=>{
                    let ll = evt.pageX;
                    let tt = evt.pageY - 40;

                    if(isActiveChart){
                        if(isPressedRULER && doubleRULER){
                            //doubleRULER = true;

                            diffX = coordinates[0] - downClickX;
                            diffY = coordinates[1] - downClickY;

                            if(diffX >= 0){
                                if(diffY >= 0){
                                    //console.log("1");
                                    $("#GLOBAL_RULER").css("transform", "translate(" + fclickX + "px, " + tt + "px)");
                                    $("#GLOBAL_RULER").css("width", Math.abs(ll - fclickX));
                                    $("#GLOBAL_RULER").css("height", Math.abs(tt - fclickY));
                                }
                                else{
                                    //console.log("4");
                                    $("#GLOBAL_RULER").css("transform", "translate(" + fclickX + "px, " + fclickY + "px)");
                                    $("#GLOBAL_RULER").css("width", Math.abs(ll - fclickX));
                                    $("#GLOBAL_RULER").css("height", Math.abs(tt - fclickY));
                                }
                            }
                            else{
                                if(diffY >= 0){
                                    //console.log("2");
                                    $("#GLOBAL_RULER").css("transform", "translate(" + ll + "px, " + tt + "px)");
                                    $("#GLOBAL_RULER").css("width", Math.abs(ll - fclickX));
                                    $("#GLOBAL_RULER").css("height", Math.abs(tt - fclickY));
                                }
                                else{
                                    //console.log("3");
                                    $("#GLOBAL_RULER").css("transform", "translate(" + ll + "px, " + fclickY + "px)");
                                    $("#GLOBAL_RULER").css("width", Math.abs(ll - fclickX));
                                    $("#GLOBAL_RULER").css("height", Math.abs(tt - fclickY));
                                }
                            }

                            $("#GLOBAL_RULER").css("display", "block");
                            messToStatus3("  |  Distance: " + Math.abs(diffY).toFixed(0));
                        }
                        else if(isPressedRect && doubleRect){
                            //doubleRect = true;

                            diffX = coordinates[0] - fRectFirstClickX;
                            diffY = coordinates[1] - fRectFirstClickY;

                            if(diffX >= 0){
                                if(diffY >= 0){
                                    //console.log("1");
                                    $("#GLOBAL_RECT").css("transform", "translate(" + fclickX + "px, " + tt + "px)");
                                    $("#GLOBAL_RECT").css("width", Math.abs(ll - fclickX));
                                    $("#GLOBAL_RECT").css("height", Math.abs(tt - fclickY));
                                }
                                else{
                                    //console.log("4");
                                    $("#GLOBAL_RECT").css("transform", "translate(" + fclickX + "px, " + fclickY + "px)");
                                    $("#GLOBAL_RECT").css("width", Math.abs(ll - fclickX));
                                    $("#GLOBAL_RECT").css("height", Math.abs(tt - fclickY));
                                }
                            }
                            else{
                                if(diffY >= 0){
                                    //console.log("2");
                                    $("#GLOBAL_RECT").css("transform", "translate(" + ll + "px, " + tt + "px)");
                                    $("#GLOBAL_RECT").css("width", Math.abs(ll - fclickX));
                                    $("#GLOBAL_RECT").css("height", Math.abs(tt - fclickY));
                                }
                                else{
                                    //console.log("3");
                                    $("#GLOBAL_RECT").css("transform", "translate(" + ll + "px, " + fclickY + "px)");
                                    $("#GLOBAL_RECT").css("width", Math.abs(ll - fclickX));
                                    $("#GLOBAL_RECT").css("height", Math.abs(tt - fclickY));
                                }
                            }

                            $("#GLOBAL_RECT").css("display", "block");
                            messToStatus3("  |  Distance: " + Math.abs(diffY).toFixed(0));
                        }
                        else if(isCross){
                            $("#GLOBALXXX_L").css("transform", "translate(0px, " + tt + "px)");
                            $("#GLOBALXXX_L").css("width", (ll - 20) + "px");
                            $("#GLOBALXXX_T").css("transform", "translate(" + ll + "px, 0px)");
                            $("#GLOBALXXX_T").css("height", (tt - 20) + "px");
                            $("#GLOBALXXX_R").css("transform", "translate(" + (ll + 20) + "px, " + tt + "px)");
                            $("#GLOBALXXX_B").css("transform", "translate(" + ll + "px, " + (tt + 20) + "px)");

                            $("#GLOBALXXX_L").css("display", "block");
                            $("#GLOBALXXX_T").css("display", "block");
                            $("#GLOBALXXX_R").css("display", "block");
                            $("#GLOBALXXX_B").css("display", "block");
                        }
                        else{
                            $("#GLOBALXXX_L").css("display", "none");
                            $("#GLOBALXXX_T").css("display", "none");
                            $("#GLOBALXXX_R").css("display", "none");
                            $("#GLOBALXXX_B").css("display", "none");
                        }
                    }
                }, 0);
            }, 0);
        });
        
    }
}

function getKoef(data) {
    let firstName = data.arr[0];
    let secondName = data.arr[1];
    let bars = data.arr[2];
    let index_01, index_02;

    for (let i = 0; i < globalArray.length; ++i) {
        if (firstName == globalArray[i].name) {
            index_01 = i;
        }
        if (secondName == globalArray[i].name) {
            index_02 = i;
        }
    }

    if (globalArray[index_01].tFrame != globalArray[index_02].tFrame) { // Нет смысла сравнивать инструменты разных таймфреймов.
        return "TFERROR";
    } else {
        if (parseFloat(globalArray[index_01].tick) == 0 || parseFloat(globalArray[index_02].tick) == 0) {
            return "INF";
        } else {
            // Загружаем все в массивы для удобства работы:
            let first = globalArray[index_01].history;
            let second = globalArray[index_02].history;
            let firstIndex = globalArray[index_01].history.length;
            let secondIndex = globalArray[index_02].history.length;

            let count = 0;
            let temp = "";

            // ПРИВЕДЕНИЕ ГРАФИКОВ К "ОБЩЕМУ ЗНАМЕНАТЕЛЮ":
            let result_01 = [];
            let dualSize = 0;
            let result_02 = [];

            if (firstIndex <= secondIndex) {
                for (let i = 0; i < firstIndex; ++i) {
                    for (let j = 0; j < secondIndex; ++j) {
                        if (first[i].Time == second[j].Time) {
                            result_01[dualSize] = first[i];
                            result_02[dualSize++] = second[j];
                            break;
                        }
                    }
                }
            } else {
                for (let i = 0; i < secondIndex; ++i) {
                    for (let j = 0; j < firstIndex; ++j) {
                        if (second[i].Time == first[j].Time) {
                            result_01[dualSize] = first[j];
                            result_02[dualSize++] = second[i];
                            break;
                        }
                    }
                }
            }

            // ОПРЕДЕЛЕНИЕ ВОЛАТИЛЬНОСТИ:
            // Определяем сумму разниц H-L 1ого и 2ого инструмента:
            let firstArifmetic = 0; // Сумма разниц.
            let secondArifmetic = 0; // Сумма разниц.

            bars = (bars < dualSize) ? bars : dualSize;
            for (let i = dualSize - 1; i >= (dualSize - bars); --i) {
                firstArifmetic += result_01[i].High - result_01[i].Low;
                secondArifmetic += result_02[i].High - result_02[i].Low;
            }

            let avgBars_01 = Number(firstArifmetic) / Number(dualSize);
            let avgBars_02 = Number(secondArifmetic) / Number(dualSize);


            avgBars_01 /= Number(globalArray[index_01].tick); // В пунктах
            avgBars_02 /= Number(globalArray[index_02].tick); // В пунктах


            let vola = (Number(avgBars_01) / Number(avgBars_02)).toString();
            return vola;
        }
    }
}

function addinLevelsCORREL(_SH, _ANO){
    setTimeout(()=>{
        layout.shapes = [];
        layout.annotations = [];
            if(GLOBAL[0].currentBar[0] != null && GLOBAL[1].currentBar[0] != null){
                layout.shapes.push({
                    name: "level",
                    type: 'line',
                    xref: 'x',
                    yref: 'y',
                    x0: 0,
                    y0: ((GLOBAL[0].currentBar[0].Bid * KOEFS[0] * __arrPriceOfTicks[0] / GLOBAL[0].tick)-(GLOBAL[1].currentBar[1].Bid * KOEFS[1] * __arrPriceOfTicks[1] / GLOBAL[1].tick)),
                    x1: data[0].x[data[0].x.length-1] + 1000,
                    y1: ((GLOBAL[0].currentBar[0].Bid * KOEFS[0] * __arrPriceOfTicks[0] / GLOBAL[0].tick)-(GLOBAL[1].currentBar[1].Bid * KOEFS[1] * __arrPriceOfTicks[1] / GLOBAL[1].tick)),
                    opacity: 0.2,
                    line:{
                        color: "magenta",
                        width: 1,
                        dash: 'solid' // dot
                    }
                });
            }
            else{
                layout.shapes.push({
                    name: "level",
                    type: 'line',
                    xref: 'x',
                    yref: 'y',
                    x0: 0,
                    y0: data[i].y[data[i].x.length-1],
                    x1: data[0].x[data[0].x.length-1] + 1000,
                    y1: data[i].y[data[i].x.length-1],
                    opacity: 0.2,
                    line:{
                        color: "magenta",
                        width: 1,
                        dash: 'solid' // dot
                    }
                });
            }
        if(_SH != null){
            for(let i=0; i < _SH.length; ++i){
                if(_SH[i].name == undefined){
                    layout.shapes.push(_SH[i]);
                }
            }
        }
        if(_ANO != null){
            for(let i=0; i < _ANO.length; ++i){
                layout.annotations.push(_ANO[i]);
            }
        }
    }, 0);
}

function addinLevels(_SH, _ANO){
    setTimeout(()=>{
        layout.shapes = [];
        layout.annotations = [];
        for(let i=0; i < GLOBAL.length; ++i){
            if(GLOBAL[i].currentBar[0] != null){
                layout.shapes.push({
                    name: "level",
                    type: 'line',
                    xref: 'x',
                    yref: 'y',
                    x0: 0,
                    y0: GLOBAL[i].currentBar[0].Bid * KOEFS[i] * __arrPriceOfTicks[i] / GLOBAL[i].tick,
                    x1: data[0].x[data[0].x.length-1] + 1000,
                    y1: GLOBAL[i].currentBar[0].Bid * KOEFS[i] * __arrPriceOfTicks[i] / GLOBAL[i].tick,
                    opacity: 0.2,
                    line:{
                        color: Color[i%10],
                        width: 1,
                        dash: 'solid' // dot
                    }
                });
            }
            else{
                layout.shapes.push({
                    name: "level",
                    type: 'line',
                    xref: 'x',
                    yref: 'y',
                    x0: 0,
                    y0: data[i].close[data[i].x.length-1],
                    x1: data[0].x[data[0].x.length-1] + 1000,
                    y1: data[i].close[data[i].x.length-1],
                    opacity: 0.2,
                    line:{
                        color: Color[i%10],
                        width: 1,
                        dash: 'solid' // dot
                    }
                });
            }
        }
        if(_SH != null){
            for(let i=0; i < _SH.length; ++i){
                if(_SH[i].name == undefined){
                    layout.shapes.push(_SH[i]);
                }
            }
        }
        if(_ANO != null){
            for(let i=0; i < _ANO.length; ++i){
                layout.annotations.push(_ANO[i]);
            }
        }
    }, 0);
}

$(".screenShort").on("click", ()=>{
    setTimeout(()=>{
        if(isActiveChart == false){
            messToStatus4("There is no chart here...");
        }
        else{
            let fileName = prompt("How do you named this picture ?", "Enter your name...");
            Plotly.downloadImage(gd, {
                            filename: "\'" + fileName + "\'",
                            format: "png",
                            width: gd._fullLayout.width,
                            height: gd._fullLayout.height
                        });
        }
    }, 0);
});

$(".A").on("click", ()=>{
    setTimeout(()=>{
        if(isActiveChart == false){
            messToStatus4("There is no chart here...");
        }
        else{
            if(whatIsR == "BUILD_MULT"){
                messToStatus4("  |  For this mode, there is no logical algorithm for concluding deals in automatic mode....");
            }
            else{
                AutomaticTradingInterval = setInterval(()=>{
                    
                    // ...
                    
                }, 100);
            }
        }
    }, 0);
});
$(".buy").on("click", ()=>{
    setTimeout(()=>{
        if(isActiveChart == false){
            messToStatus4("There is no chart here...");
        }
        else{
            if(whatIsR == "BUILD_MULT"){
                messToStatus4("  |  There is no logical algorithm for making deals for this mode...");
            }
            else{
                messToStatus4("  |  Will be implemented later...");
            }
        }
    }, 0);
});
$(".sell").on("click", ()=>{
    setTimeout(()=>{
        if(isActiveChart == false){
            messToStatus4("There is no chart here...");
        }
        else{
            if(whatIsR == "BUILD_MULT"){
                messToStatus4("  |  There is no logical algorithm for making deals for this mode...");
            }
            else{
                messToStatus4("  |  Will be implemented later...");
            }
        }
    }, 0);
});
$(".hlevel").on("click", ()=>{
    setTimeout(()=>{
        if(isActiveChart == false){
            messToStatus4("There is no chart here...");
        }
        else{
            $(".tglevel").css("box-shadow", "none");
            $(".hlevel").css("box-shadow", "inset 0 0 33px lime");
            $(".vlevel").css("box-shadow", "none");
            $(".rect").css("box-shadow", "none");
            $(".text").css("box-shadow", "none");
            $(".Grab").css("box-shadow", "none");
            isPressedText = false;
            isPressedRect = false;
            isPressedVLevel = false;
            isPressedRULER = false;
            isPressedHLevel = true;
            pressedGrab = false;
            layout.dragmode = "orbit";
            Plotly.relayout("myDiv", layout);
        }
    }, 0);
});
$(".vlevel").on("click", ()=>{
    setTimeout(()=>{
        if(isActiveChart == false){
            messToStatus4("There is no chart here...");
        }
        else{
            $(".vlevel").css("box-shadow", "inset 0 0 33px lime");
            $(".hlevel").css("box-shadow", "none");
            $(".rect").css("box-shadow", "none");
            $(".text").css("box-shadow", "none");
            $(".tglevel").css("box-shadow", "none");
            $(".Grab").css("box-shadow", "none");
            isPressedText = false;
            isPressedRect = false;
            isPressedHLevel = false;
            isPressedRULER = false;
            isPressedVLevel = true;
            pressedGrab = false;
            layout.dragmode = "orbit";
            Plotly.relayout("myDiv", layout);
        }
    }, 0);
});
$(".rect").on("click", ()=>{
    setTimeout(()=>{
        if(isActiveChart == false){
            messToStatus4("There is no chart here...");
        }
        else{
            $(".rect").css("box-shadow", "inset 0 0 33px lime");
            $(".tglevel").css("box-shadow", "none");
            $(".hlevel").css("box-shadow", "none");
            $(".vlevel").css("box-shadow", "none");
            $(".text").css("box-shadow", "none");
            $(".Grab").css("box-shadow", "none");
            isPressedText = false;
            isPressedVLevel = false;
            isPressedHLevel = false;
            isPressedRULER = false;
            isPressedRect = true;
            pressedGrab = false;
            layout.dragmode = "orbit";
            Plotly.relayout("myDiv", layout);
        }
    }, 0);
});
$(".text").on("click", ()=>{
    setTimeout(()=>{
        if(isActiveChart == false){
            messToStatus4("There is no chart here...");
        }
        else{
            $(".text").css("box-shadow", "inset 0 0 33px lime");
            $(".tglevel").css("box-shadow", "none");
            $(".hlevel").css("box-shadow", "none");
            $(".vlevel").css("box-shadow", "none");
            $(".rect").css("box-shadow", "none");
            $(".Grab").css("box-shadow", "none");
            isPressedRect = false;
            isPressedVLevel = false;
            isPressedHLevel = false;
            isPressedRULER = false;
            isPressedText = true;
            pressedGrab = false;
            layout.dragmode = "orbit";
            Plotly.relayout("myDiv", layout);
        }
    }, 0);
});
$(".Grab").on("click", ()=>{
    setTimeout(()=>{
        if(isActiveChart == false){
            messToStatus4("There is no chart here...");
        }
        else{
            $(".tglevel").css("box-shadow", "none");
            $(".Grab").css("box-shadow", "inset 0 0 33px lime");
            $(".hlevel").css("box-shadow", "none");
            $(".vlevel").css("box-shadow", "none");
            $(".rect").css("box-shadow", "none");
            $(".text").css("box-shadow", "none");
            isPressedRULER = false;
            isPressedHLevel = false;
            isPressedVLevel = false;
            isPressedRect = false;
            isPressedText = false;
            pressedGrab = true;
            layout.dragmode = "pan";
            Plotly.relayout("myDiv", layout);
        }
    }, 0);
});
$(".Cross").on("click", ()=>{
    setTimeout(()=>{
        if(isActiveChart == false){
            messToStatus4("There is no chart here...");
        }
        else{
            $(".tglevel").css("box-shadow", "none");
            $(".hlevel").css("box-shadow", "none");
            $(".vlevel").css("box-shadow", "none");
            $(".rect").css("box-shadow", "none");
            $(".text").css("box-shadow", "none");
            if(isCross){
                $(".Cross").css("box-shadow", "none");
                isCross = false;
            }
            else{
                $(".Cross").css("box-shadow", "inset 0 0 33px lime");
                isCross = true;
            }
        }
    }, 0);
});

$(".del1").on("click", ()=>{
    setTimeout(()=>{
        if(isActiveChart == false){
            messToStatus4("There is no chart here...");
        }
        else{
            if(ADDEDSHAPESARRAY.length > 0){
                if(ADDEDSHAPESARRAY[ADDEDSHAPESARRAY.length-1] == 1){
                    ADDEDSHAPESARRAY.pop();
                    layout.shapes.pop();
                    setTimeout(()=>{
                        Plotly.relayout("myDiv", layout);
                    }, 50);
                }
                else if(ADDEDSHAPESARRAY[ADDEDSHAPESARRAY.length-1] == 2){
                    ADDEDSHAPESARRAY.pop();
                    layout.annotations.pop();
                    setTimeout(()=>{
                        Plotly.relayout("myDiv", layout);
                    }, 50);
                }
                else if(ADDEDSHAPESARRAY[ADDEDSHAPESARRAY.length-1] == 10){
                    ADDEDSHAPESARRAY.pop();
                    layout.shapes.pop();
                    layout.annotations.pop();
                    setTimeout(()=>{
                        Plotly.relayout("myDiv", layout);
                    }, 50);
                }
            }
        }
    }, 0);
});
$(".delall").on("click", ()=>{
    setTimeout(()=>{
        if(isActiveChart == false){
            messToStatus4("There is no chart here...");
        }
        else{
            layout.shapes = [];
            layout.annotations = [];

            setTimeout(()=>{
                if(!O_or_M){
                    addinLevelsCORREL(null, null);
                }
                else{
                    addinLevels(null, null);
                }
                
                Plotly.relayout("myDiv", layout);
            }, 50);
        }
    }, 0);
});
$(".tglevel").on("click", ()=>{
    setTimeout(()=>{
        if(isActiveChart == false){
            messToStatus4("There is no chart here...");
        }
        else{
            $(".tglevel").css("box-shadow", "inset 0 0 33px lime");
            $(".Grab").css("box-shadow", "none");
            $(".hlevel").css("box-shadow", "none");
            $(".vlevel").css("box-shadow", "none");
            $(".rect").css("box-shadow", "none");
            $(".text").css("box-shadow", "none");
            pressedGrab = false;
            isPressedText = false;
            isPressedRect = false;
            isPressedVLevel = false;
            isPressedHLevel = false;
            isPressedRULER = true;
            layout.dragmode = "orbit";
            Plotly.relayout("myDiv", layout);
        }
    }, 0);
});
$(".online").on("click", () =>{
    setTimeout(()=>{
        if(isActiveChart == false){
            messToStatus4("There is no chart here...");
        }
        else{
            layout.xaxis.range[0] = startLeft;
            layout.xaxis.range[1] = startRight;
            layout.yaxis.range[0] = startBottom;
            layout.yaxis.range[1] = startTop;

            Plotly.relayout("myDiv", layout);
        }
    }, 0);
});
$(".scrin").on("click", () => { // СТАБИЛИЗАЦИЯ
    setTimeout(()=>{
        if(isActiveChart == false){
            messToStatus4("There is no chart here...");
        }
        else{
                // СТАБИЛИЗАЦИЯ:
                if (layout.xaxis.range[0] != oldL || layout.xaxis.range[1] != oldR) {

                    let lll = -1;
                    let rrr = -1;

                    for (let i = 0; i < data[0].x.length - 1; ++i) {
                        if (data[0].x[i] >= layout.xaxis.range[0]) {
                            lll = i;
                            break;
                        }
                    }
                    for (let i = data[0].x.length - 1; i >= 0; --i) {
                        if (data[0].x[i] <= layout.xaxis.range[1]) {
                            rrr = i;
                            break;
                        }
                    }

                    let BottomValue = 1e10;
                    let TopValue = -1e10;
                    
                    if(O_or_M){
                        for (let i = 0; i < data.length; ++i) {
                            for (let j = lll; j <= rrr; ++j) {
                                if (data[i].high[j] >= TopValue) {
                                    TopValue = data[i].high[j];
                                }
                                if (data[i].low[j] <= BottomValue) {
                                    BottomValue = data[i].low[j];
                                }
                            }
                        }
                    }
                    else{
                        for (let j = lll; j <= rrr; ++j) {
                            if (data[0].y[j] >= TopValue) {
                                TopValue = data[0].y[j];
                            }
                            if (data[0].y[j] <= BottomValue) {
                                BottomValue = data[0].y[j];
                            }
                        }
                    }
                    
                    layout.yaxis.range[0] = BottomValue;
                    layout.yaxis.range[1] = TopValue;

                    Plotly.relayout("myDiv", layout);
                }
        }
    }, 0);
});

var isPressedOptBtn = false;
// Options variable:
var lot_01 = 0.01;
var lot_02 = 0.01;
var minTarget = 5;
var period_SMA = 50;
var pircent_01 = 35;
var pircent_02 = 75;
var isSMA = true;

var isOpenedBuyPositions_AUTO = false;
var isOpenedBuyPositions_AUTO = false;
// -------------------------
$(".optBtn").on("click", () => {
    setTimeout(()=>{
        if(!isPressedOptBtn){
            isPressedOptBtn = true;
            $("#Options").css("display", "block");
        }
        else{
            isPressedOptBtn = false;
            $("#Options").css("display", "none");
        }
    }, 0);
});

$("#CANCEL").on("click", () => {
    setTimeout(()=>{
        isPressedOptBtn = false;
        $("#Options").css("display", "none");
    }, 0);
});

$("#ACCEPT").on("click", () => {
    setTimeout(()=>{
        isPressedOptBtn = false;
        $("#Options").css("display", "none");

        lot_01 = $("#inputFirst").val();
        lot_02 = $("#inputSecond").val();
        minTarget = $("#inputMinTarget").val();
        period_SMA = $("#inputPeriodSMA").val();
        pircent_01 = $("#inputPirsent_01").val();
        pircent_02 = $("#inputPirsent_02").val();
        isSMA = $("#inputSMACheck").prop('checked');

        let regularInput = new RegExp("^[0-9]+[\.,]?[0-9]*$");
        if(regularInput.test(lot_01) &&
           regularInput.test(lot_02) &&
           regularInput.test(minTarget) &&
           regularInput.test(period_SMA) &&
           regularInput.test(pircent_01) &&
           regularInput.test(pircent_02)){

            messAlert("Settings applied successfully !", 200, 5000);

        }
        else{
            messAlert("Which of the parameters was entered incorrectly...", 200, 5000);
        }
    }, 0);
});