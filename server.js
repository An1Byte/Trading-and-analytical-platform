'use strict';

const express = require("express");
const app = express();
const fs = require("fs");
const http = require('http');
const port = process.env.PORT || 8080;

let List = ""; // Переменная, которая хранит в себе весь текст всех файлов List.txt
let tempList = "";
let Files_wasBeEqual = true;

class PAN {
    constructor() {
        this.path_to_terminal = "",
        this.instruments = []
    }
};
let panArray = [];
let panArrayLength = 0;

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
        this.currentBar = [];
    }
}

// --------------------------------------------------
var jsonObj = {
    "List": [],
    "arr": []
};

function recurrentReading(n, max) {
    return new Promise((resolve, reject) => {
        if (n < max) {
            let tempInst = new Instrument();
            tempInst.name = jsonObj.List[n]; // +++

            let TickInst = "";
            let TfInst = "";

            let count = 0;
            for (let i = 0; i < jsonObj.List[n].length; ++i) {
                if (jsonObj.List[n][i] == "#") {
                    count++;
                    continue;
                }
                if (count == 3 && jsonObj.List[n][i] != "#") {
                    TickInst += jsonObj.List[n][i];
                    continue;
                }
                if (count == 4 && jsonObj.List[n][i] != "#") {
                    TfInst += jsonObj.List[n][i];
                    continue;
                }
            }

            tempInst.tFrame = TfInst; // +++
            tempInst.tick = TickInst; // +++

            let tempAddr = ""; let bf = false;
            for (let i = 0; i < panArray.length; ++i) {
                for (let j = 0; j < panArray[i].instruments.length; ++j) {
                    if (!bf) {
                        if (jsonObj.List[n] == panArray[i].instruments[j]) {
                            tempAddr = panArray[i].path_to_terminal;
                            bf = true;
                            break;
                        }
                    }
                }
                if (bf) { break; }
            }
            if (!bf) {
                resolve("ERROR");
            }

            // Считываем файлы с историей по инструменту под индексом n:
            fs.readFile(tempAddr + "\\" + jsonObj.List[n] + ".txt", "utf8", (err, History) => {
                if (err) {
                    console.log("Error #6: " + err.message);
                    resolve("ELSE_TIME");
                }
                else {
                    fs.readFile(tempAddr + "\\current#" + jsonObj.List[n] + ".txt", "utf8", (err, zeroBar) => {
                        if (err) {
                            console.log("Error #7: " + err.message);
                            resolve("ELSE_TIME");
                        }
                        else {
                            let temp = "";
                            let counter = 0;

                            for (let i = 0; i < zeroBar.length; ++i) {
                                if (zeroBar[i] != ";" && zeroBar[i] != "\n" && zeroBar[i] != "\r") {
                                    temp += zeroBar[i];
                                }
                                else {
                                    if (temp != "") {
                                        if (counter == 0) {
                                            counter++;
                                            tempInst.currentBar[0] = new OHLCTime();
                                            tempInst.currentBar[1] = new OHLCTime();
                                            tempInst.currentBar[0].Bid = temp; // +++
                                            temp = "";
                                        }
                                        else if (counter == 1) {
                                            counter++;
                                            tempInst.currentBar[0].Ask = temp; // +++
                                            temp = "";
                                        }
                                        else if (counter == 2) {
                                            counter++;
                                            tempInst.currentBar[0].Open = temp; // +++
                                            temp = "";
                                        }
                                        else if (counter == 3) {
                                            counter++;
                                            tempInst.currentBar[0].High = temp; // +++
                                            temp = "";
                                        }
                                        else if (counter == 4) {
                                            counter++;
                                            tempInst.currentBar[0].Low = temp; // +++
                                            temp = "";
                                        }
                                        else if (counter == 5) {
                                            counter++;
                                            tempInst.currentBar[0].Close = temp; // +++
                                            temp = "";
                                        }
                                        else if (counter == 6) {
                                            counter++;

                                            let hoursAndMinutes = "";
                                            let score = 0;
                                            let day = "";
                                            let month = "";
                                            let year = "";
                                            for (let d = 0; d < temp.length; ++d) {
                                                if (score == 0) {
                                                    if (temp[d] == "&") {
                                                        score++;
                                                    }
                                                    else {
                                                        hoursAndMinutes += temp[d];
                                                    }
                                                }
                                                else if (score == 1) {
                                                    if (temp[d] == "/") {
                                                        score++;
                                                    }
                                                    else {
                                                        day += temp[d];
                                                    }
                                                }
                                                else if (score == 2) {
                                                    if (temp[d] == "/") {
                                                        score++;
                                                    }
                                                    else {
                                                        month += temp[d];
                                                    }
                                                }
                                                else {
                                                    year += temp[d];
                                                }
                                            }

                                            let convertTime = year + "-" + month + "-" + day + " " + hoursAndMinutes;

                                            tempInst.currentBar[0].Time = convertTime; // +++
                                            temp = "";
                                        }
                                        else if (counter == 7) {
                                            counter++;
                                            tempInst.currentBar[1].Open = temp; // +++
                                            temp = "";
                                        }
                                        else if (counter == 8) {
                                            counter++;
                                            tempInst.currentBar[1].High = temp; // +++
                                            temp = "";
                                        }
                                        else if (counter == 9) {
                                            counter++;
                                            tempInst.currentBar[1].Low = temp; // +++
                                            temp = "";
                                        }
                                        else if (counter == 10) {
                                            counter++;
                                            tempInst.currentBar[1].Close = temp; // +++
                                            temp = "";
                                        }
                                        else if (counter == 11) {

                                            let hoursAndMinutes = "";
                                            let score = 0;
                                            let day = "";
                                            let month = "";
                                            let year = "";
                                            for (let d = 0; d < temp.length; ++d) {
                                                if (score == 0) {
                                                    if (temp[d] == "&") {
                                                        score++;
                                                    }
                                                    else {
                                                        hoursAndMinutes += temp[d];
                                                    }
                                                }
                                                else if (score == 1) {
                                                    if (temp[d] == "/") {
                                                        score++;
                                                    }
                                                    else {
                                                        day += temp[d];
                                                    }
                                                }
                                                else if (score == 2) {
                                                    if (temp[d] == "/") {
                                                        score++;
                                                    }
                                                    else {
                                                        month += temp[d];
                                                    }
                                                }
                                                else {
                                                    year += temp[d];
                                                }
                                            }

                                            let convertTime = year + "-" + month + "-" + day + " " + hoursAndMinutes;
                                            tempInst.currentBar[1].Time = convertTime; // +++
                                            temp = "";
                                            break;
                                        }
                                    }
                                }
                            }
                            if (tempInst.currentBar[0].Ask == null ||
                                tempInst.currentBar[0].Bid == null ||
                                tempInst.currentBar[0].Open == null ||
                                tempInst.currentBar[0].High == null ||
                                tempInst.currentBar[0].Low == null ||
                                tempInst.currentBar[0].Close == null ||
                                tempInst.currentBar[0].Time == null ||
                                tempInst.currentBar[1].Open == null ||
                                tempInst.currentBar[1].High == null ||
                                tempInst.currentBar[1].Low == null ||
                                tempInst.currentBar[1].Close == null ||
                                tempInst.currentBar[1].Time == null) {
                                resolve("ERROR");
                            }

                            temp = "";
                            let index = 0;
                            counter = 0;
                            for (let i = 0; i < History.length; ++i) {
                                if (History[i] != ";" && History[i] != "\n" && History[i] != "\r") {
                                    temp += History[i];
                                }
                                else {
                                    if (temp != "") {
                                        if (counter == 0) {
                                            counter++;
                                            tempInst.history[index] = new OHLCTime();
                                            tempInst.history[index].Open = temp;
                                            temp = "";
                                        }
                                        else if (counter == 1) {
                                            counter++;
                                            tempInst.history[index].High = temp;
                                            temp = "";
                                        }
                                        else if (counter == 2) {
                                            counter++;
                                            tempInst.history[index].Low = temp;
                                            temp = "";
                                        }
                                        else if (counter == 3) {
                                            counter++;
                                            tempInst.history[index].Close = temp;
                                            temp = "";
                                        }
                                        else { // == 4
                                            counter = 0;

                                            let hoursAndMinutes = "";
                                            let score = 0;
                                            let day = "";
                                            let month = "";
                                            let year = "";
                                            for (let d = 0; d < temp.length; ++d) {
                                                if (score == 0) {
                                                    if (temp[d] == "&") {
                                                        score++;
                                                    }
                                                    else {
                                                        hoursAndMinutes += temp[d];
                                                    }
                                                }
                                                else if (score == 1) {
                                                    if (temp[d] == "/") {
                                                        score++;
                                                    }
                                                    else {
                                                        day += temp[d];
                                                    }
                                                }
                                                else if (score == 2) {
                                                    if (temp[d] == "/") {
                                                        score++;
                                                    }
                                                    else {
                                                        month += temp[d];
                                                    }
                                                }
                                                else {
                                                    year += temp[d];
                                                }
                                            }

                                            let convertTime = year + "-" + month + "-" + day + " " + hoursAndMinutes;

                                            tempInst.history[index].Time = convertTime;
                                            temp = "";
                                            index++;
                                        }
                                    }
                                }
                            }

                            let hasNull = false;
                            for (let m = 0; m < tempInst.history.length; ++m) {
                                if (tempInst.history[m].Open == null ||
                                    tempInst.history[m].High == null ||
                                    tempInst.history[m].Low == null ||
                                    tempInst.history[m].Close == null ||
                                    tempInst.history[m].Time == null) {

                                    hasNull = true;
                                    break;
                                }
                            }
                            if (hasNull) {
                                resolve("ELSE_TIME");
                            }
                            jsonObj.arr[n] = tempInst;
                            resolve(recurrentReading(n + 1, max));
                        }
                    });
                }
            });
        }
        else {
            resolve("FINISH");
        }
    });
}
// --------------------------------------------------
var jsonObjZeroBars = {
    "List": [],
    "arr": []
};

function recurrentReadingZeroBars(n, max) {
    return new Promise((resolve, reject) => {
        if (n < max) {
            let tempInst = new Instrument();
            tempInst.name = jsonObjZeroBars.List[n]; // +++

            let tempAddr = ""; let bf = false;
            for (let i = 0; i < panArray.length; ++i) {
                for (let j = 0; j < panArray[i].instruments.length; ++j) {
                    if (!bf) {
                        if (jsonObjZeroBars.List[n] == panArray[i].instruments[j]) {
                            tempAddr = panArray[i].path_to_terminal;
                            bf = true;
                            break;
                        }
                    }
                }
                if (bf) { break; }
            }
            if (!bf) {
                resolve("ERROR");
            }

            fs.readFile(tempAddr + "\\current#" + jsonObjZeroBars.List[n] + ".txt", "utf8", (err, zeroBar) => {
                if (err) {
                    console.log("Error #9: " + err.message);
                    resolve("ELSE_TIME");
                }
                else {
                    let temp = "";
                    let counter = 0;
                    for (let i = 0; i < zeroBar.length; ++i) {
                        if (zeroBar[i] != ";" && zeroBar[i] != "\n" && zeroBar[i] != "\r") {
                            temp += zeroBar[i];
                        }
                        else {
                            if (temp != "") {
                                if (counter == 0) {
                                    counter++;
                                    tempInst.currentBar[0] = new OHLCTime();
                                    tempInst.currentBar[1] = new OHLCTime();
                                    tempInst.currentBar[0].Bid = temp; // +++
                                    temp = "";
                                }
                                else if (counter == 1) {
                                    counter++;
                                    tempInst.currentBar[0].Ask = temp; // +++
                                    temp = "";
                                }
                                else if (counter == 2) {
                                    counter++;
                                    tempInst.currentBar[0].Open = temp; // +++
                                    temp = "";
                                }
                                else if (counter == 3) {
                                    counter++;
                                    tempInst.currentBar[0].High = temp; // +++
                                    temp = "";
                                }
                                else if (counter == 4) {
                                    counter++;
                                    tempInst.currentBar[0].Low = temp; // +++
                                    temp = "";
                                }
                                else if (counter == 5) {
                                    counter++;
                                    tempInst.currentBar[0].Close = temp; // +++
                                    temp = "";
                                }
                                else if (counter == 6) {
                                    counter++;

                                    let hoursAndMinutes = "";
                                    let score = 0;
                                    let day = "";
                                    let month = "";
                                    let year = "";
                                    for (let d = 0; d < temp.length; ++d) {
                                        if (score == 0) {
                                            if (temp[d] == "&") {
                                                score++;
                                            }
                                            else {
                                                hoursAndMinutes += temp[d];
                                            }
                                        }
                                        else if (score == 1) {
                                            if (temp[d] == "/") {
                                                score++;
                                            }
                                            else {
                                                day += temp[d];
                                            }
                                        }
                                        else if (score == 2) {
                                            if (temp[d] == "/") {
                                                score++;
                                            }
                                            else {
                                                month += temp[d];
                                            }
                                        }
                                        else {
                                            year += temp[d];
                                        }
                                    }

                                    let convertTime = year + "-" + month + "-" + day + " " + hoursAndMinutes;

                                    tempInst.currentBar[0].Time = convertTime; // +++
                                    temp = "";
                                }
                                else if (counter == 7) {
                                    counter++;
                                    tempInst.currentBar[1].Open = temp; // +++
                                    temp = "";
                                }
                                else if (counter == 8) {
                                    counter++;
                                    tempInst.currentBar[1].High = temp; // +++
                                    temp = "";
                                }
                                else if (counter == 9) {
                                    counter++;
                                    tempInst.currentBar[1].Low = temp; // +++
                                    temp = "";
                                }
                                else if (counter == 10) {
                                    counter++;
                                    tempInst.currentBar[1].Close = temp; // +++
                                    temp = "";
                                }
                                else if (counter == 11) {

                                    let hoursAndMinutes = "";
                                    let score = 0;
                                    let day = "";
                                    let month = "";
                                    let year = "";
                                    for (let d = 0; d < temp.length; ++d) {
                                        if (score == 0) {
                                            if (temp[d] == "&") {
                                                score++;
                                            }
                                            else {
                                                hoursAndMinutes += temp[d];
                                            }
                                        }
                                        else if (score == 1) {
                                            if (temp[d] == "/") {
                                                score++;
                                            }
                                            else {
                                                day += temp[d];
                                            }
                                        }
                                        else if (score == 2) {
                                            if (temp[d] == "/") {
                                                score++;
                                            }
                                            else {
                                                month += temp[d];
                                            }
                                        }
                                        else {
                                            year += temp[d];
                                        }
                                    }

                                    let convertTime = year + "-" + month + "-" + day + " " + hoursAndMinutes;

                                    tempInst.currentBar[1].Time = convertTime; // +++
                                    temp = "";
                                    break;
                                }
                            }
                        }
                    }

                    if (tempInst.currentBar[0].Ask == null ||
                        tempInst.currentBar[0].Bid == null ||
                        tempInst.currentBar[0].Open == null ||
                        tempInst.currentBar[0].High == null ||
                        tempInst.currentBar[0].Low == null ||
                        tempInst.currentBar[0].Close == null ||
                        tempInst.currentBar[0].Time == null ||
                        tempInst.currentBar[1].Open == null ||
                        tempInst.currentBar[1].High == null ||
                        tempInst.currentBar[1].Low == null ||
                        tempInst.currentBar[1].Close == null ||
                        tempInst.currentBar[1].Time == null) {
                        resolve("ERROR");
                    }

                    jsonObjZeroBars.arr[n] = tempInst;
                    resolve(recurrentReadingZeroBars(n + 1, max));
                }
            });
        }
        else {
            resolve("FINISH");
        }
    });
}
// --------------------------------------------------


function recurrentWritingInOrderFiles(n, max, data) {
    return new Promise((resolve, reject) => {
        if (n < max) {
            fs.writeFile(panArray[n].path_to_terminal + "\\Orders.txt", data, (err) => {
                if (err) {
                    resolve("ERROR");
                }
                else {
                    resolve(recurrentWritingInOrderFiles(n + 1, max, data));
                }
            });
        }
        else {
            resolve("FINISH");
        }
    });
}

function start_GUI() {
    app.use(express.static(__dirname + "/public"));
    app.use(express.static(__dirname + "/node_modules"));

    app.get("/", function (req, res) {
        res.sendfile("./public/index.html");
    });

    app.get("/exit", function (req, res) {
        QuitThisServer();
    });

    app.get("/getList", function (req, res) {
        jsonObj = {
            "List": [],
            "arr": []
        };
        let jsonObjListLength = 0;
        if (List != "") {
            // Определяем список инструментов:
            let temp = "";
            for (let i = 0; i < List.length; ++i) {
                if (List[i] != "\n" && List[i] != "\r") {
                    temp += List[i];
                }
                else {
                    if (temp != "") {
                        jsonObj.List[jsonObjListLength++] = temp;
                        temp = "";
                    }
                }
            }

            if (Files_wasBeEqual == false) {
                // ------------------- Собираем историю по всем инструментам:
                
                recurrentReading(0, jsonObj.List.length).then(
                    resolve => {

                        if (resolve == "ERROR") {
                            res.send("ERROR");
                        }
                        else if (resolve == "ELSE_TIME") {
                            res.send("ELSE_TIME");
                        }
                        else if (resolve == "FINISH") {
                            Files_wasBeEqual = true;
                            res.send(JSON.stringify(jsonObj));
                        }
                    }
                );
            }
            else {
                res.end();
            }
        }
        else {
            res.end();
        }
    });
    
    app.post("/getCurrentBars", function (req, res) {
        if (List != "") {
            // Определяем список инструментов:
            let temp = "";
            jsonObjZeroBars = {
                "List": [],
                "arr": []
            };
            let jsonObjZeroBarsLength = 0;

            for (let i = 0; i < List.length; ++i) {
                if (List[i] != "\n" && List[i] != "\r") {
                    temp += List[i];
                }
                else {
                    if (temp != "") {
                        jsonObjZeroBars.List[jsonObjZeroBarsLength++] = temp;
                        temp = "";
                    }
                }
            }

            recurrentReadingZeroBars(0, jsonObjZeroBars.List.length).then(
                resolve => {
                    if (resolve == "ERROR") {
                        res.send("ERROR");
                    }
                    else if (resolve == "ELSE_TIME") {
                        res.send("ELSE_TIME");
                    }
                    else if (resolve == "FINISH") {
                        res.send(JSON.stringify(jsonObjZeroBars));
                    }
                }
            );
        }
        else {
            res.end();
        }
    });

    app.get("/setOrder", function (req, res) {
        req.on("data", data => {
            if (data) {
                let _data = data.toString();

                recurrentWritingInOrderFiles(0, panArray.length, _data).then(
                    resolve => {
                        if (resolve == "ERROR") {
                            res.send("false");
                        }
                        else if (resolve == "FINISH") {
                            res.send("true");
                        }
                    }
                );
            }
            else {
                res.end();
            }
        });
    });

    app.listen(port);
}


// Функция, которая будет завершать работу скрипта в нормальном  и аварийном состоянии:
function QuitThisServer() {
    fs.exists("./Files/List.txt", (bf) => {
        if (bf) {
            fs.unlink("./Files/List.txt", () => {
                process.exit(1);
            });
        }
        else {
            process.exit(1); // Встроенный модуль process завершает работу сервера преждевременно.
        }
    });
}

// Функция рекурсивного считывания файлов List.txt по заданным путям:
let tempPanArrayLength = 0;
function readingLists(index, maxIndex, arrPath) {
    return new Promise((resolve, reject) => {

        fs.exists(arrPath[index] + "/List.txt", (bF) => {
            if (bF) {
                fs.readFile(arrPath[index] + "/List.txt", "utf8", (err, _datas) => {
                    if (!err) {
                        let _data = _datas.toString();
                        tempList += _data;

                        let tempObj = new PAN();
                        tempObj.path_to_terminal = arrPath[index];
                        let nameInst = "";
                        let innerIndexPanArray = 0;
                        for (let i = 0; i < _data.length; ++i) {
                            if (_data[i] != "\r" && _data[i] != "\n") {
                                nameInst += _data[i];
                            }
                            else {
                                tempObj.instruments[innerIndexPanArray++] = nameInst;
                                nameInst = "";
                            }
                        }
                        panArray[tempPanArrayLength++] = tempObj;
                        //index++;

                        if (index + 1 > maxIndex) {
                            if (tempList != List) {
                                Files_wasBeEqual = false;
                                console.log("tempList != List !!!");

                                // Перезаписываем файл List:
                                fs.writeFile("./Files/List.txt", tempList, () => {
                                    List = tempList;
                                });
                            }
                            panArrayLength = tempPanArrayLength;
                            tempPanArrayLength = 0;
                            resolve("FINISH");
                        }

                        resolve(readingLists(index+1, maxIndex, arrPath));
                    }
                    else {
                        resolve("ERROR");
                    }
                });
            }
            else {
                resolve(readingLists(index + 1, maxIndex, arrPath));
            }
        });
    });
}

 
fs.exists("./Files/Paths_to_Invizzz.txt", (bF) => { // Асинхронная проверка файла на предмет его существования... 
        if (!bF) { // Если файл не существует, то его необходимо создать и завершить работу сервера.
            console.log("---    The /File/Paths_to_terminals.txt isn't exist (log #1)");
            fs.writeFile("./Files/Paths_to_Invizzz.txt", "", (err) => {
                if (err) {
                    console.log("---    Error: Error of writing in the Paths_to_terminals.txt (log #2)");
                    // Завершение работы сервера:
                    QuitThisServer();
                }
                else {
                    // Завершение работы сервера:
                    QuitThisServer();
                }
            });
        }
        else {
            // Считываем файл Paths_to_Invizzz.txt:
            fs.readFile("./Files/Paths_to_Invizzz.txt", "utf8", (err, datas) => {
                if (err) {
                    console.log("---    Error: Couldn't read the ./Files/Paths_to_Invizzz.txt (log #3)");
                    // Завершение работы сервера:
                    QuitThisServer();
                }
                else {
                    let paths = datas.toString() + "\n";
                    //let uint8Array = new TextEncoder("utf8").encode(paths);
                    //paths = new TextDecoder("utf8").decode(uint8Array); // from Uint8Array To String
                    //console.log(paths);

                    let arrayPaths = []; // Абсолютные пути к папке Invizzz
                    let arrayPathsLength = 0;
                    let temp = "";
                    for (let i = 0; i < paths.length; ++i) {
                        if (paths[i] != "\r" && paths[i] != "\n" && paths[i] != ";" && paths[i] != ",") {
                            temp += paths[i];
                        }
                        else {
                            if (temp != "") {
                                arrayPaths[arrayPathsLength++] = temp;
                                temp = "";
                            }
                        }
                    }
                    console.log(arrayPaths[0]);
                    console.log(arrayPaths[1]);
                        start_GUI(); // Запускаем сервер.

                        setInterval(() => { // Таймер для перезаписи массива с инструментами List...
                            tempList = "";

                            readingLists(0, arrayPaths.length - 1, arrayPaths).then(
                                resolve => {
                                    if (resolve == "FINISH") {
                                        console.log("Reading successful...");
                                    }
                                    else if(resolve == "ERROR") { // resolve == ERROR
                                        console.log("ERROR: In the readingLists function...");
                                        QuitThisServer();
                                    }
                                }
                            );
                        }, 1200);
                }
            });
        }
    });