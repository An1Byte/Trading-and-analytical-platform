let fs = require("fs");
let http = require("http");
let https = require("https");
let pathExist = require("path");

fs.readFile("/var/www/httpd-cert/www-root/invizzz.key", "utf8", (err, k)=>{
    if(err){
        console.log("Ошибка чтения ключа...");
    }
    else{
        fs.readFile("/var/www/httpd-cert/www-root/invizzz.crt", "utf8", (err, c)=>{
            if(err){
                console.log("Ошибка чтения сертификата...");
            }
            else{
                const options = { // Читаем сертификат и ключ:
                    key: k,
                    cert: c
                };
                
                class OHLCTime {
                    constructor() {
                        this.Open = null;
                        this.High = null;
                        this.Low = null;
                        this.Close = null;
                        this.Time = null;
                    }
                }

                // 5555й порт: Сервер, который будет слушать запросы сайта:
                https.createServer(options, (req, res) => {
                    req.once("data", data => {
                        res.setHeader("Access-Control-Allow-Origin", "https://invizzz.com");
                        res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
                
                        // На этом порту сайт будет получать от сервера данные: Список инструментов, поисковой список, котировки и прочие данные...
                        let jsonObj = JSON.parse(data);
                        let ID = jsonObj.arrayMove[0];
                        let Name = jsonObj.arrayMove[1];
                        let path = "//var/www/www-root/data/www/invizzz.com/datas/IDHolders/id_" + ID.toString();
                
                        // ОБРАБОТКА ПРИКАЗОВ САЙТА НА СЕРВЕРЕ И ПОЛУЧЕНИЕ ДАННЫХ:
                        if (Name == "NEWORDER") { // Запрос истории и поставок котировок по инструменту
                            
                            let newOrder = jsonObj.arrayMove[2];
                
                            fs.appendFile(path + "/Orders.datas", newOrder, (err)=>{
                                if(err){
                                    console.log("Ошибка в файле listenMQL.js #16: " + err.message);
                                    res.end("false");
                                }
                                else{
                                    res.end("true");
                                }
                            });
                        } /*else if (Name == "BREAKPRICE") { // Перенести в категорию NEWORDER !!!
                            let instrumentName = jsonObj.arrayMove[2];
                            let timeFrame = jsonObj.arrayMove[3];
                
                            let newOrder = "BREAKPRICE;" + instrumentName + ";" + timeFrame + ";|";
                            // Проверяем файл на доступность на запись и если доступен, то записывем приказ:
                            fs.appendFileSync(path + "/Orders.datas", newOrder);
                        } else if (Name == "BUY") { // Перенести в категорию NEWORDER !!!
                            let instrumentName = jsonObj.arrayMove[2];
                            let qtyVolume = jsonObj.arrayMove[3];
                
                            let newOrder = "BUY;" + instrumentName + ";" + qtyVolume + ";|";
                            // Проверяем файл на доступность на запись и если доступен, то записывем приказ:
                            fs.appendFileSync(path + "/Orders.datas", newOrder);
                        } else if (Name == "SELL") { // Перенести в категорию NEWORDER !!!
                            let instrumentName = jsonObj.arrayMove[2];
                            let qtyVolume = jsonObj.arrayMove[3];
                
                            let newOrder = "SELL;" + instrumentName + ";" + qtyVolume + ";|";
                            // Проверяем файл на доступность на запись и если доступен, то записывем приказ:
                
                            fs.appendFileSync(path + "/Orders.datas", newOrder);
                        } else if (Name == "CLOSE") { // Перенести в категорию NEWORDER !!!
                            let instrumentName = jsonObj.arrayMove[2];
                            let qtyVolume = jsonObj.arrayMove[3];
                
                            let newOrder = "CLOSE;" + instrumentName + ";" + qtyVolume + ";|";
                            // Проверяем файл на доступность на запись и если доступен, то записывем приказ:
                            fs.appendFileSync(path + "/Orders.datas", newOrder);
                        } else if (Name == "REVERCE") { // Перенести в категорию NEWORDER !!!
                            let instrumentName = jsonObj.arrayMove[2];
                            let qtyVolume = jsonObj.arrayMove[3];
                
                            let newOrder = "REVERCE;" + instrumentName + ";" + qtyVolume + ";|";
                            // Проверяем файл на доступность на запись и если доступен, то записывем приказ:
                            fs.appendFileSync(path + "/Orders.datas", newOrder);
                        }*/ else if (Name == "List") { // Запрос списка инструментов
                            let instrumentList_counter = jsonObj.arrayMove[2];
                            
                            fs.readFile(path + "/counterList.datas", "utf8", (err, data)=>{
                                if(err){
                                    console.log("Ошибка в файле listenMQL.js #17: " + err.message);
                                    res.end("");
                                }
                                else{
                                    let counterList = data;
                                    if (counterList != instrumentList_counter) {
                                        fs.readFile(path + "/List.datas", "utf8", (err, data)=>{
                                            if(err){
                                                console.log("Ошибка в файле listenMQL.js #18: " + err.message);
                                                res.end("");
                                            }
                                            else{
                                                let List = data;
                                                let arrayList = [];
                                                let indexArray = 0;
                                                let temp = "";
                                                for (let i = 0; i < List.length; ++i) {
                                                    if (List[i] != ';') {
                                                        temp += List[i];
                                                    } else {
                                                        arrayList[indexArray++] = temp;
                                                        temp = "";
                                                    }
                                                }
                
                                                let answerJson = {
                                                    "new_instrumentList_counter": counterList,
                                                    "arr": arrayList
                                                };
                
                                                res.end(JSON.stringify(answerJson));
                                            }
                                        });
                                    }
                                    else{
                                        res.end("");
                                    }       
                                }
                            });
                        } else if (Name == "KOEFVOLA") {
                            let firstName = jsonObj.arrayMove[2];
                            let secondName = jsonObj.arrayMove[3];
                            let timeFrame = jsonObj.arrayMove[4];
                            let bars = jsonObj.arrayMove[5];
                            let Tick_01 = jsonObj.arrayMove[6];
                            let Tick_02 = jsonObj.arrayMove[7];
                            
                            console.log(firstName + "//" + secondName);
                            // Считываем файлы с историей по двум инструментам:
                            fs.readFile(path + "/" + firstName + "#" + timeFrame + "#history.datas", "utf8", (err, firstHistory)=>{
                                if(err){
                                    console.log("Ошибка в файле listenMQL.js #25: " + err.message);
                                    res.end("ERROR");
                                }
                                else{
                                    fs.readFile(path + "/" + secondName + "#" + timeFrame + "#history.datas", "utf8", (err, secondHistory)=>{
                                        if(err){
                                            console.log("Ошибка в файле listenMQL.js #26: " + err.message);
                                            res.end("ERROR");
                                        }
                                        else{
                                            if(firstHistory == "NONE" || secondHistory == "NONE"){
                                                if(firstHistory == "NONE"){
                                                    // Удаляем файл:
                                                    fs.unlink(path + "/" + firstName + "#" + timeFrame + "#history.datas", function(err) {
                                                       if (err) res.end("ERROR");
                                                       else res.end("NONE");
                                                    });
                                                }
                                                if(secondHistory == "NONE"){
                                                    // Удаляем файл:
                                                    fs.unlink(path + "/" + secondName + "#" + timeFrame + "#history.datas", function(err) {
                                                       if (err) res.end("ERROR");
                                                       else res.end("NONE");
                                                    });
                                                }
                                            }
                                            else{
                                                // Загружаем все в массивы для удобства работы:
                                                let first = [];
                                                let firstIndex = 0;
                                                let second = [];
                                                let secondIndex = 0;
                                                let count = 0;
                                                let temp = "";
                                                for (let i = 0; i < firstHistory.length; ++i) {
                                                    if(firstHistory[i] != ";"){
                                                        temp += firstHistory[i];
                                                    }
                                                    else{
                                                        if(count == 0){
                                                            count++;
                                                            first[firstIndex] = new OHLCTime();
                                                            first[firstIndex].Open = temp;
                                                            temp = "";
                                                        }
                                                        else if(count == 1){
                                                            count++;
                                                            first[firstIndex].High = temp;
                                                            temp = "";
                                                        }
                                                        else if(count == 2){
                                                            count++;
                                                            first[firstIndex].Low = temp;
                                                            temp = "";
                                                        }
                                                        else if(count == 3){
                                                            count++;
                                                            first[firstIndex].Close = temp;
                                                            temp = "";
                                                        }
                                                        else{ // == 4
                                                            count = 0;
                                                            first[firstIndex].Time = temp;
                                                            temp = "";
                                                            firstIndex++;
                                                        }
                                                    }
                                                }
                                                count = 0;
                                                for (let i = 0; i < secondHistory.length; ++i) {
                                                    if(secondHistory[i] != ";"){
                                                        temp += secondHistory[i];
                                                    }
                                                    else{
                                                        if(count == 0){
                                                            count++;
                                                            second[secondIndex] = new OHLCTime();
                                                            second[secondIndex].Open = temp;
                                                            temp = "";
                                                        }
                                                        else if(count == 1){
                                                            count++;
                                                            second[secondIndex].High = temp;
                                                            temp = "";
                                                        }
                                                        else if(count == 2){
                                                            count++;
                                                            second[secondIndex].Low = temp;
                                                            temp = "";
                                                        }
                                                        else if(count == 3){
                                                            count++;
                                                            second[secondIndex].Close = temp;
                                                            temp = "";
                                                        }
                                                        else{ // == 4
                                                            count = 0;
                                                            second[secondIndex].Time = temp;
                                                            temp = "";
                                                            secondIndex++
                                                        }
                                                    }
                                                }
                                                                
                                                // ПРИВЕДЕНИЕ ГРАФИКОВ К "ОБЩЕМУ ЗНАМЕНАТЕЛЮ":
                                                let result_01 = [];
                                                let dualSize = 0;
                                                let result_02 = [];
                                                                
                                                                
                                                if(firstIndex <= secondIndex){ 
                                                    for(let i=0; i < firstIndex; ++i){
                                                        for(let j=0; j < secondIndex; ++j){
                                                            if(first[i].Time == second[j].Time){ 
                                                                result_01[dualSize] = first[i];
                                                                result_02[dualSize++] = second[j];
                                                                break;
                                                            }
                                                        }
                                                    }
                                                }
                                                else{
                                                    for(let i=0; i < secondIndex; ++i){
                                                        for(let j=0; j < firstIndex; ++j){
                                                            if(second[i].Time == first[j].Time){
                                                                result_01[dualSize] = first[j];
                                                                result_02[dualSize++] = second[i];
                                                                break;
                                                            }
                                                        }
                                                    }
                                                }
                                                                
                                                // ----------------- ВРЕМЕННЫЙ ПРОВЕРОЧНЫЙ БЛОК:
                                                console.log("length = " + dualSize);
                                                // --------------------------------------------- 
                                                                
                                                // ОПРЕДЕЛЕНИЕ ВОЛАТИЛЬНОСТИ:
                                                // Определяем сумму разниц H-L 1ого и 2ого инструмента:
                                                let firstArifmetic = 0; // Сумма разниц.
                                                let secondArifmetic = 0; // Сумма разниц.
                                                bars = (bars < dualSize) ? bars : dualSize;
                                                for (let i = dualSize-1; i > (dualSize-bars); --i) {
                                                    firstArifmetic += result_01[i].High - result_01[i].Low;
                                                    secondArifmetic += result_02[i].High - result_02[i].Low;
                                                }
                                                let avgBars_01 = firstArifmetic / dualSize;
                                                let avgBars_02 = secondArifmetic / dualSize;
                                                avgBars_01 /= Tick_01; // В пунктах.
                                                avgBars_02 /= Tick_02; // В пунктах.
                    
                                                let vola = (avgBars_01 / avgBars_02).toString();
                                                res.end(vola);
                                            }
                                        }
                                    });
                                }
                            });
                        }/* else if (Name == "PROVIDINGDATAS") {
                            let instrumentProviding = jsonObj.arrayMove[2];
                            let timeFr = jsonObj.arrayMove[3];
                            let qty = jsonObj.arrayMove[4];
                
                            fs.readFile(path + "/" + jsonObj.arrayMove[2] + "#" + jsonObj.arrayMove[3] + "#tick.datas", "utf8", (err, data)=>{
                                if(err){
                                    
                                }
                                else{
                                    let Tick = data;
                                    fs.readFile(path + "/" + jsonObj.arrayMove[2] + "#" + jsonObj.arrayMove[3] + "#askbid.datas", "utf8", (err, data)=>{
                                        if(err){
                                            
                                        }
                                        else{
                                            let askbid = data;
                                            
                                            // Получаем значения ask и bid:
                                            let tempRow = [];
                                            tempRow[0] = "";
                                            tempRow[1] = "";
                                            let tempRowIndex = 0;
                                            for (let i = 0; i < askbid.length; ++i) {
                                                if (askbid[i] != ";") {
                                                    tempRow[tempRowIndex] += askbid[i];
                                                } else {
                                                    tempRowIndex++;
                                                }
                                            }
                                            let ask = askbid[0];
                                            let bid = askbid[1];
                                            
                                            if (qty == "ALL") { // Клиент запросил всю доступную историю по инструменту:
                                                fs.readFile(path + "/" + jsonObj.arrayMove[2] + "#" + jsonObj.arrayMove[3] + "history.datas", "utf8", (err, data)=>{
                                                    if(err){
                                                        
                                                    }
                                                    else{
                                                        let readingHistory = data;
                                                        let dataSent = Tick + ";" + ask + ";" + bid + ";";
                                                        for (let i = 0; i < readingHistory.length; ++i) {
                                                            dataSent += readingHistory[i] + ";";
                                                        }
                
                                                        // В конец добавляем данные о текущем не сформированном баре:
                                                        fs.writeFile(path + +"/" + arrayList[2] + "#" + arrayList[3] + "#currentBar.datas", "utf8", (err)=>{
                                                            if(err){
                                                                
                                                            }
                                                            else{
                                                                let currentBar = 
                                                            }
                                                        });
                
                                                        answer_5555 = dataSent + currentBar;
                                                    }
                                                });
                
                                                
                                            } else if (qty == "CURRENT") { // Клиент запросил данные только по аску, биду и нулевому бару:
                                                let currentBar = fs.setRequestHeader(path + +"/" + arrayList[2] + "#" + arrayList[3] + "#currentBar.datas", "utf8");
                                                answer_5555 = currentBar;
                                            } else { // В противном случае клиент запросил определенное кол-во баров для загрузки истории:
                
                                                let qtyBars = qty;
                
                                                let readingHistory = fs.readFileSync(path + "/" + jsonObj.arrayMove[2] + "#" + jsonObj.arrayMove[3] + "history.datas", "utf8");
                
                
                                                let itBegin = readingHistory.length - qty;
                
                                                let dataSent = Tick + ";" + ask + ";" + bid + ";";
                                                for (let i = itBegin; i < readingHistory.length; ++i) {
                                                    dataSent += readingHistory[i] + ";";
                                                }
                
                                                // В конец добавляем данные о текущем не сформированном баре:
                                                let currentBar = fs.setRequestHeader(path + +"/" + arrayList[2] + "#" + arrayList[3] + "#currentBar.datas", "utf8");
                
                                                let answer = dataSent + currentBar;
                                                answer_5555 = answer;
                                            }
                                        }
                                    });
                                    
                                    
                                }
                            });
                        }*/ else if (Name == "SEARCHFILES") { // Проверяем файлы на их наличие:
                            
                                let FileName_01 = jsonObj.arrayMove[2];
                                let FileName_02 = jsonObj.arrayMove[3];
                                let timeFrame = jsonObj.arrayMove[4];
                
                                fs.stat(path + "/" + FileName_01 + "#" + timeFrame + "#history.datas", (err) => {
                                    if (err) {
                                        console.log("Ошибка в файле listenMQL.js #31: " + err.message);
                                        res.end("false");
                                    } else {
                                        fs.stat(path + "/" + FileName_02 + "#" + timeFrame + "#history.datas", (err) => {
                                            if (err) {
                                                console.log("Ошибка в файле listenMQL.js #32: " + err.message);
                                                res.end("false");
                                            } else {
                                                res.end("true");
                                            }
                                        });
                                    }
                                });
                            }
                    });
                }).listen(5555);
                
            }
        });
    }
});