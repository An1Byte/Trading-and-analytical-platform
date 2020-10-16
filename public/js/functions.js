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

var coordinates = [];

const __left = 60 + 60;
const __top = 40 + 25;

var ADDEDSHAPESARRAY = [];
// ===================================================================================================
// ===================================================================================================

function Cleaner(){
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
}


let currentArrayList = [];
let lastQtyOfInstruments = 0;

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

var GLOBAL = []; // Глобальный массив, который содержит информацию о наблюдаемых инструментах.
var GLOBALLength = 0;
var globalArray = []; // Глобальный массив, в котором содержится вся информация по полученным инструментам.
var globalCurrentBars = []; // Глобальный массив, в котором содержится информация по нулевым барам.
var once_iteration = false; // Запускаем интервал по считыванию нулевых баров лишь единожды !!!
var onceInterval = null;

var LOOKED_INSTRUMENT = ""; // Просматриваемый инструмент

// ####################################################################################################

function getCurrentArrayList(){
    return currentArrayList;
}

function getLastQtyOfInstruments(){
    return lastQtyOfInstruments;
}

function getList() { // Получение списка инструментов LIST.
    setInterval(() => {
        $.ajax({
            type: "GET",
            url: "/getList",
            cache: false,
            success: function (data) {
                if (data) {
                    let getList = JSON.parse(data);
                    
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
                                    success: function (data) {
                                        if (data == "ERROR") {
                                            messAlert("Something went wrong...", 200, 5000);
                                        }
                                        else if(data == "ELSE_TIME"){}
                                        else{
                                            globalCurrentBars = (JSON.parse(data)).arr; // +++
                                            
                                            // Алгоритм определения текущего бара и добавления неактуального в историю:
                                            
                                            for(let i=0; i < globalArray.length; ++i){
                                                for(let j=0; j < globalCurrentBars.length; ++j){
                                                    if(globalCurrentBars[j].name == globalArray[i].name){
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
                                
                            }, 500); // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
                        }
                    }
                    else{
                        if(data == "ERROR"){
                            messAlert("Something went wrong...", 200, 5000);
                        }
                        else if(data == "ELSE_TIME"){}
                    }
                }
            }
        });
    }, 3000);
}


function BUILD_ONLINE(instrName_01, instrName_02, koef_01, koef_02, period, divide){
    $("#btn_10").click();
    Cleaner();
    
    
}

function BUILD_OFFLINE(instrName_01, instrName_02, koef_01, koef_02, period, divide){
    $("#btn_10").click();
    Cleaner();
    
}

var layout = null;
var oldL = null;
var oldR = null;
var __arrPriceOfTicks = null;
var KOEFS = null;
function BUILD_MULT(arrayNames, arrPriceOfTicks, comeBack){
    $("#btn_10").click();
    Cleaner();
    
    __arrPriceOfTicks = arrPriceOfTicks;
    
    GLOBAL = [];
    GLOBALLength = 0;
    
    for(let i=0; i < arrayNames.length; ++i){
        for(let j=0; j < globalArray.length; ++j){
            if(globalArray[j].name == arrayNames[i]){
                GLOBAL[GLOBALLength++] = globalArray[j];
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
    
    let tempValue = GLOBAL[0].history[GLOBAL[0].history.length - comeBack - 1].Close / GLOBAL[0].tick;
    KOEFS.push(1.0);
    for(let i=1; i < GLOBAL.length; ++i){
        KOEFS.push(tempValue/(GLOBAL[i].history[GLOBAL[i].history.length - comeBack - 1].Close / GLOBAL[i].tick));
    }
    
    let data = [];
    for(let i=0; i < GLOBAL.length; ++i){
        let colorIndex = i%10;
        
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
            "decreasing": {line: {color: Color[colorIndex]}},
            "increasing": {line: {color: Color[colorIndex]}},
            "line": {color: Color[colorIndex], width: 0.5},
            "type": "candlestick",
            "xaxis": "x",
            "yaxis": "y"
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
                trace.x.push(GLOBAL[i].history[j].Time);
            }
        }
        data[i] = trace;
    }
    
    let tempTitle = KOEFS[0].toFixed(3) + " * " + arrayNames[0];
    for(let i=1; i < arrayNames.length; ++i){
        tempTitle += " - " + KOEFS[i].toFixed(3) + " * " + arrayNames[i];
    }
    
    //$(".spanID_01").text(tempTitle);
    

    let LeftIndex = (GLOBAL[0].history.length >= 200) ? GLOBAL[0].history.length - 201 : GLOBAL[0].history.length - 1;
    let RightIndex = GLOBAL[0].history.length - 1;
    

    let BottomValue = 1e20;
    let TopValue = -1e20;
    for(let i=0; i < GLOBAL.length; ++i){
        for(let j=LeftIndex; j < GLOBAL[i].history.length; ++j){
            if(GLOBAL[i].history[j].High * arrPriceOfTicks[i] * KOEFS[i] / GLOBAL[i].tick >= TopValue){
                TopValue = GLOBAL[i].history[j].High * arrPriceOfTicks[i] * KOEFS[i] / GLOBAL[i].tick;
            }
            if(GLOBAL[i].history[j].Low * arrPriceOfTicks[i] * KOEFS[i] / GLOBAL[i].tick <= BottomValue){
                BottomValue = GLOBAL[i].history[j].Low * arrPriceOfTicks[i] * KOEFS[i] / GLOBAL[i].tick;
            }
        }
    }
    
    startTop = TopValue;
    startBottom = BottomValue;
    
    startLeft = new Date(GLOBAL[0].history[LeftIndex].Time).getTime();
    oldL = startLeft;
    startRight = new Date(GLOBAL[0].history[RightIndex].Time).getTime();
    oldR = startRight;
        
    oldR = startRight + ((startRight - startLeft)/5);
    startRight = oldR;
    
    layout = {
        title: {
            text: tempTitle,
            font: {
                family: 'serif',
                color: "white",
                size: 14
            },
            xref: 'paper',
            x: 0.05,
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
        hovermode: "closest", // false - Убирает ховер при наведении на бар
        xaxis: {
            color: "red", // Цвет шкалы
            autorange: false,
            domain: [0, 1],
            range: [oldL, oldR],
            rangeslider: {
                visible: false
            },
            type: 'date'
        },
        yaxis: {
            color: "red", // Цвет шкалы
            autorange: false,
            domain: [0, 1],
            range: [BottomValue, TopValue], // Диапазон показа по вертикали.
            type: 'linear'
        },

        annotations: [],
        shapes: []
    };
    
    addinLevels();
    
    let config = {
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
    
        Plotly.newPlot('myDiv', data, layout, config).then(attach);
}

function attach() {

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


                if (!pressedGrab) {
                    if (isPressedRect) { // +++
                        let newRect = {
                            type: 'rect',
                            xref: 'x',
                            yref: 'y',
                            x0: xInDataCoord,
                            y0: yInDataCoord,
                            x1: Math.abs(xInDataCoord - diffX),
                            y1: Math.abs(yInDataCoord - diffY),
                            fillcolor: 'red',
                            opacity: 0.5,
                            line: {
                                width: 1
                            }
                        };

                        let leftP = (xInDataCoord + Math.abs(xInDataCoord - diffX)) / 2.0;
                        let topP = Math.max(yInDataCoord, Math.abs(yInDataCoord - diffY));

                        let newTextY = {
                            xref: 'x',
                            yref: 'y',
                            x: leftP,
                            y: topP,
                            yanchor: 'bottom',
                            text: "h = " + Math.abs(diffY).toFixed(3) + " pp",
                            font: {
                                family: 'sans serif',
                                size: 12,
                                color: 'red'
                            },
                            showarrow: false
                        }
                        
                        ADDEDSHAPESARRAY.push(10);
                        
                        layout.annotations.push(newTextY);
                        layout.shapes.push(newRect);
                        messToStatus("  |  h = " + Math.abs(diffY).toFixed(3) + " pp");
                        Plotly.relayout("myDiv", layout);
                    } else if (isPressedVLevel) { // +++
                        let newLine = {
                            type: 'line',
                            xref: "x",
                            yref: "y",
                            x0: xInDataCoord,
                            y0: 0,
                            x1: xInDataCoord,
                            y1: yInDataCoord + (yInDataCoord*0.5),
                            line: {
                                color: "blue",
                                width: 2,
                                dash: 'solid'
                            }
                        };
                        
                        ADDEDSHAPESARRAY.push(1);
                        
                        layout.shapes.push(newLine);
                        Plotly.relayout("myDiv", layout);
                    } else if (isPressedHLevel) {
                        let newLine = {
                            type: 'line',
                            xref: "x",
                            yref: "y",
                            x0: GLOBAL[0].history[0].Time,
                            y0: yInDataCoord,
                            x1: new Date(GLOBAL[0].history[GLOBAL[0].history.length-1].Time).getTime() + ((new Date(GLOBAL[0].history[1].Time).getTime() - new Date(GLOBAL[0].history[0].Time).getTime())*50),
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
                            x: layout.xaxis.range[0] + (GLOBAL[0].history[2].Time - GLOBAL[0].history[0].Time),
                            y: yInDataCoord,
                            yanchor: 'bottom',
                            text: yInDataCoord.toFixed(5),
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
                        Plotly.relayout("myDiv", layout);
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
                                size: 12,
                                color: 'lime'
                            },
                            showarrow: false
                        }
                        
                        ADDEDSHAPESARRAY.push(2);

                        layout.annotations.push(newText);
                        Plotly.relayout("myDiv", layout);
                    }
                    else if(isPressedRULER){
                        messToStatus3("  |  Distance: " + Math.abs(diffY).toFixed(5));
                    }
                }
            }      
        }, 0);
    });

    
    gd.addEventListener('mousemove', function (evt) {
        setTimeout(()=>{
            let xaxis = gd._fullLayout.xaxis;
            let yaxis = gd._fullLayout.yaxis;

            coordinates[0] = xaxis.p2c(evt.x - __left); // X
            coordinates[1] = yaxis.p2c(evt.y - __top); // Y
            
            messToStatus("  |  Price: " + coordinates[1].toFixed(5));
        }, 0);
    });
    
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


function addinLevels(){    
    
    for(let i=0; i < GLOBAL.length; ++i){
        if(GLOBAL[i].currentBar[0] != null){
            layout.shapes.push({
                type: 'line',
                xref: 'x',
                yref: 'y',
                x0: 0,
                y0: GLOBAL[i].currentBar[0].Bid,
                x1: new Date(GLOBAL[0].history[GLOBAL[0].history.length-1].Time).getTime() + ((new Date(GLOBAL[0].history[1].Time).getTime() - new Date(GLOBAL[0].history[0].Time).getTime())*50),
                y1: GLOBAL[i].currentBar[0].Bid,
                opacity: 0.6,
                line:{
                    color: Color[i%10],
                    width: 1,
                    dash: 'solid' // dot
                }
            });
        }
        else{
            layout.shapes.push({
                type: 'line',
                xref: 'x',
                yref: 'y',
                x0: 0,
                y0: GLOBAL[i].history[GLOBAL[i].history.length-1].Close,
                x1: new Date(GLOBAL[0].history[GLOBAL[0].history.length-1].Time).getTime() + ((new Date(GLOBAL[0].history[1].Time).getTime() - new Date(GLOBAL[0].history[0].Time).getTime())*50),
                y1: GLOBAL[i].history[GLOBAL[i].history.length-1].Close,
                opacity: 0.6,
                line:{
                    color: Color[i%10],
                    width: 1,
                    dash: 'solid' // dot
                }
            });
        }
    }
}

$(".screenShort").on("click", ()=>{
    setTimeout(()=>{
        messToStatus4("  |  It hasn't been implemented yet...");
    }, 0);
});
$(".A").on("click", ()=>{
    setTimeout(()=>{
        messToStatus4("  |  It hasn't been implemented yet...");
    }, 0);
});
$(".buy").on("click", ()=>{
    setTimeout(()=>{
        messToStatus4("  |  It hasn't been implemented yet...");
    }, 0);
});
$(".sell").on("click", ()=>{
    setTimeout(()=>{
        messToStatus4("  |  It hasn't been implemented yet...");
    }, 0);
});
$(".MA").on("click", ()=>{
    setTimeout(()=>{
        messToStatus4("  |  It hasn't been implemented yet...");
    }, 0);
});
$(".hlevel").on("click", ()=>{
    setTimeout(()=>{
        isPressedText = false;
        isPressedRect = false;
        isPressedVLevel = false;
        isPressedRULER = false;
        isPressedHLevel = true;
        pressedGrab = false;
        layout.dragmode = "orbit";
        Plotly.relayout("myDiv", layout);
    }, 0);
});
$(".vlevel").on("click", ()=>{
    setTimeout(()=>{
        isPressedText = false;
        isPressedRect = false;
        isPressedHLevel = false;
        isPressedRULER = false;
        isPressedVLevel = true;
        pressedGrab = false;
        layout.dragmode = "orbit";
        Plotly.relayout("myDiv", layout);
    }, 0);
});
$(".rect").on("click", ()=>{
    setTimeout(()=>{
        isPressedText = false;
        isPressedVLevel = false;
        isPressedHLevel = false;
        isPressedRULER = false;
        isPressedRect = true;
        pressedGrab = false;
        layout.dragmode = "orbit";
        Plotly.relayout("myDiv", layout);
    }, 0);
});
$(".text").on("click", ()=>{
    setTimeout(()=>{
        isPressedRect = false;
        isPressedVLevel = false;
        isPressedHLevel = false;
        isPressedRULER = false;
        isPressedText = true;
        pressedGrab = false;
        layout.dragmode = "orbit";
        Plotly.relayout("myDiv", layout);
    }, 0);
});
$(".Grab").on("click", ()=>{
    setTimeout(()=>{
        isPressedRULER = false;
        isPressedHLevel = false;
        isPressedVLevel = false;
        isPressedRect = false;
        isPressedText = false;
        pressedGrab = true;
        layout.dragmode = "pan";
        Plotly.relayout("myDiv", layout);
    }, 0);
});

$(".del1").on("click", ()=>{
    setTimeout(()=>{
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
        else{ // 10
            ADDEDSHAPESARRAY.pop();
            ADDEDSHAPESARRAY.pop();
            layout.shapes.pop();
            layout.annotations.pop();
            setTimeout(()=>{
                Plotly.relayout("myDiv", layout);
            }, 50);
        }
    }, 0);
});
$(".delall").on("click", ()=>{
    setTimeout(()=>{
        layout.shapes = [];
        layout.annotations = [];

        addinLevels();

        Plotly.relayout("myDiv", layout);
    }, 0);
});
$(".tglevel").on("click", ()=>{
    setTimeout(()=>{
        pressedGrab = false;
        isPressedText = false;
        isPressedRect = false;
        isPressedVLevel = false;
        isPressedHLevel = false;
        isPressedRULER = true;
        layout.dragmode = "orbit";
        Plotly.relayout("myDiv", layout);
    }, 0);
});
$(".online").on("click", () =>{
    setTimeout(()=>{
        layout.xaxis.range[0] = startLeft;
        layout.xaxis.range[1] = startRight;
        layout.yaxis.range[0] = startBottom;
        layout.yaxis.range[1] = startTop;

        Plotly.relayout("myDiv", layout);
    }, 0);
});
$(".scrin").on("click", () => { // СТАБИЛИЗАЦИЯ
    setTimeout(()=>{
        // СТАБИЛИЗАЦИЯ:
        if (new Date(layout.xaxis.range[0]).getTime() != oldL || new Date(layout.xaxis.range[1]).getTime() != oldR) {

            let lll = -1;
            let rrr = -1;

            for (let i = 0; i < GLOBAL[0].history.length - 1; ++i) {
                if (new Date(GLOBAL[0].history[i].Time).getTime() >= new Date(layout.xaxis.range[0]).getTime()) {
                    lll = i;
                    break;
                }
            }
            for (let i = GLOBAL[0].history.length - 1; i >= 0; --i) {
                if (new Date(GLOBAL[1].history[i].Time).getTime() <= new Date(layout.xaxis.range[1]).getTime()) {
                    rrr = i;
                    break;
                }
            }

            let BottomValue = 10000000;
            let TopValue = -10000000;

            for (let i = 0; i < GLOBAL.length; ++i) {
                for (let j = lll; j <= rrr; ++j) {
                    if (GLOBAL[i].history[j].High * __arrPriceOfTicks[i] * KOEFS[i] / GLOBAL[i].tick >= TopValue) {
                        TopValue = GLOBAL[i].history[j].High * __arrPriceOfTicks[i] * KOEFS[i] / GLOBAL[i].tick;
                    }
                    if (GLOBAL[i].history[j].Low * __arrPriceOfTicks[i] * KOEFS[i] / GLOBAL[i].tick <= BottomValue) {
                        BottomValue = GLOBAL[i].history[j].Low * __arrPriceOfTicks[i] * KOEFS[i] / GLOBAL[i].tick;
                    }
                }
            }


            layout.yaxis.range[0] = BottomValue;
            layout.yaxis.range[1] = TopValue;

            Plotly.relayout("myDiv", layout);
        }
    }, 0);
});