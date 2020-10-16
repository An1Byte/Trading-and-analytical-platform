let fs = require("fs");
let http = require("http");
let https = require("https");
let pathExist = require("path");


// 3333й порт (На этот порт будут поступать данные List при включении и отключении mql скрипта):
http.createServer((req, res) => { // Создали сервер для прослушивания порта 3333 (List.datas)
    let List = "";
    req.on("data", data => {
        List += data.toString();
    });

    req.once("end", () => {
        let arrayList = []; // Массив, в который считаем данные пришедшие от dll.
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

        let ID = arrayList[0];
        let path = "//var/www/www-root/data/www/invizzz.com/datas/IDHolders/id_" + ID.toString();
        // access
        fs.stat(path, (err) => {
            if (err) {
                res.end("ID_NOT_EXISTS");
            } else {
                // ВЫЯВЛЯЕМ, ДАННЫЕ ПРИШЛИ НА ДОБАВЛЕНИЕ ИЛИ УДАЛЕНИЕ:
                if (arrayList[1] == "DELETE") {
                    fs.readFile(path + "/List.datas", "utf8", (err, data) => {
                        if (err) {
                            console.log("Ошибка в файле listenMQL.js #1: " + err.message);
                            res.end("ERROR_DISCONNECT");
                        } else {
                            let contentArray = []; // Массив, в который считаем данные из файла на сервере.
                            let indexContentArray = 0;
                            let tempContent = "";
                            for (let i = 0; i < data.length; ++i) {
                                if (data[i] != ';') {
                                    temp += data[i];
                                } else {
                                    contentArray[indexContentArray++] = temp;
                                    temp = "";
                                }
                            }

                            let resultListArray = []; // Результирующий массив. (Разница двух массивов)
                            let index = 0;
                            for (let i = 0; i < contentArray.length; ++i) {
                                let bf = false;
                                for (let j = 2; i < arrayList.length; ++j) {
                                    if (arrayList[j] == contentArray[i]) {
                                        bf = true;
                                        break;
                                    }
                                }
                                if (!bf) {
                                    resultListArray[index++] = contentArray[i];
                                }
                            }
                            let inputDatas = "";
                            for (let i = 0; i < resultListArray.length; ++i) {
                                inputDatas += resultListArray[i] + ';';
                            }

                            fs.writeFile(path + "/List.datas", inputDatas, (err) => {
                                if (err) {
                                    console.log("Ошибка в файле listenMQL.js #2: " + err.message);
                                    res.end("ERROR_DISCONNECT");
                                } else {
                                    let qtyRes = resultListArray.length;
                                    fs.writeFile(path + "/counterList.datas", qtyRes.toString(), (err) => {
                                        if (err) {
                                            console.log("Ошибка в файле listenMQL.js #3: " + err.message);
                                            res.end("ERROR_DISCONNECT");
                                        } else {
                                            console.log("ИСКЛЮЧЕНО !!!");
                                            res.end("");
                                        }
                                    });
                                }
                            });
                        }
                    });
                } else if (arrayList[1] == "POSTHISTORY") { // Загружаем историю инструмента:
                    if (arrayList[2] == "NONE") {
                        fs.writeFile("//var/www/www-root/data/www/invizzz.com/datas/IDHolders/id_" + ID.toString() + "/" + arrayList[2] + "#history.datas", "NONE", (err) => {
                            if (err) {
                                console.log("Ошибка в файле listenMQL.js #4: " + err.message);
                                res.end("ERROR_DISCONNECT");
                            } else {
                                res.end("");
                            }
                        });
                    } else {
                        // Создаем переменную. которую будем использовать для записи в файл:
                        let inputStr = "";
                        for (let i = 3; i < arrayList.length - 5; ++i) { // Начиная с последнего, но не записывая нулевой
                            inputStr = inputStr + arrayList[i] + ";";
                        }
                        // Записываем историю по инструменту в файл:

                        fs.writeFile("//var/www/www-root/data/www/invizzz.com/datas/IDHolders/id_" + ID.toString() + "/" + arrayList[2] + "#history.datas", inputStr, (err) => {
                            if (err) {
                                console.log("Ошибка в файле listenMQL.js #4: " + err.message);
                                res.end("ERROR_DISCONNECT");
                            } else {
                                res.end("");
                            }
                        });
                    }
                } else if (arrayList[1] == "POSTNEW") { // Обновляем данные о текущих котировках а также о текущем аск и бид:
                    // Создаем переменную. которую будем использовать для записи в файл:
                    let inputStr = "";
                    for (let i = 6; i < 11; ++i) { // Данные только по нулевому бару.
                        inputStr = inputStr + arrayList[i] + ";";
                    }

                    // Перезаписываем данные по нулевому бару в файл:
                    fs.writeFile("//var/www/www-root/data/www/invizzz.com/datas/IDHolders/id_" + ID.toString() + "/" + arrayList[2] + "#" + arrayList[3] + "#currentBar.datas", inputStr, (err) => {
                        if (err) {
                            console.log("Ошибка в файле listenMQL.js #6: " + err.message);
                            res.end("ERROR_DISCONNECT");
                        } else {
                            // Перезаписываем текущий аск и бид в файл:
                            fs.writeFile("//var/www/www-root/data/www/invizzz.com/datas/IDHolders/id_" + ID.toString() + "/" + arrayList[2] + "#askbid.datas", arrayList[4] + ";" + arrayList[5] + ";", (err) => {
                                if (err) {
                                    console.log("Ошибка в файле listenMQL.js #7: " + err.message);
                                    res.end("ERROR_DISCONNECT");
                                } else {
                                    res.end("");
                                }
                            });
                        }
                    });
                } else if (arrayList[1] == "POSTNEWBAR") { // Обновляем данные о текущих котировках а также о текущем аск и бид. Также добавляем только что сформировавшийся бар в конец истории:
                    // Создаем переменную,которую будем использовать для записи с режимом добавить в конец файла:
                    let addInEnd = "";
                    for (let i = 11; i < 16; ++i) { // Данные только по первому бару.
                        addInEnd = addInEnd + arrayList[i] + ";";
                    }
                    // Добавляем запись в конец файла с историей:
                    fs.appendFile("//var/www/www-root/data/www/invizzz.com/datas/IDHolders/id_" + ID.toString() + "/" + arrayList[2] + "#" + arrayList[3] + "#history.datas", addInEnd, (err) => {
                        if (err) {
                            console.log("Ошибка в файле listenMQL.js #8: " + err.message);
                            res.end("ERROR_DISCONNECT");
                        } else {
                            // Создаем переменную. которую будем использовать для перезаписи в файл:
                            let inputStr = "";
                            for (let i = 6; i < 11; ++i) { // Данные только по нулевому бару.
                                inputStr = inputStr + arrayList[i] + ";";
                            }

                            // Перезаписываем данные по нулевому бару в файл:
                            fs.writeFile("//var/www/www-root/data/www/invizzz.com/datas/IDHolders/id_" + ID.toString() + "/" + arrayList[2] + "#" + arrayList[3] + "#currentBar.datas", inputStr, (err) => {
                                if (err) {
                                    console.log("Ошибка в файле listenMQL.js #9: " + err.message);
                                    res.end("ERROR_DISCONNECT");
                                } else {
                                    // Перезаписываем текущий спрэд в файл:
                                    fs.writeFileSync("//var/www/www-root/data/www/invizzz.com/datas/IDHolders/id_" + ID.toString() + "/" + arrayList[2] + "#askbid.datas", arrayList[4] + ";" + arrayList[5] + ";", (err) => {
                                        if (err) {
                                            console.log("Ошибка в файле listenMQL.js #10: " + err.message);
                                            res.end("ERROR_DISCONNECT");
                                        } else {
                                            res.end("");
                                        }
                                    });
                                }
                            });
                        }
                    });
                } else if (arrayList[1] == "IDONLY") { // Если запрос содержит только ID, то такой запрос считается холостым и будем проверять файл Orders.datas на предмет получения каких либо приказов от клиентской части.
                    fs.readFile(path + "/Orders.datas", "utf8", (err, data) => {
                        if (err) {
                            console.log("Ошибка в файле listenMQL.js #11: " + err.message);
                            res.end("ERROR_DISCONNECT");
                        } else {
                            // И очищаем наш файл на сервере, так как приказы мы уже считали:
                            fs.writeFile(path + "/Orders.datas", "", (err) => {
                                if (err) {
                                    console.log("Ошибка в файле listenMQL.js #12: " + err.message);
                                    res.end("ERROR_DISCONNECT");
                                } else {
                                    res.end(data.toString());
                                }
                            });
                        }
                    });
                } else if (arrayList[1] == "CREATE") {
                    // Проверим если хоть 1 из добавляемых строк присутствует в списке на сервере, то ничего не добавляем
                    // А если таких записей не найдено, то добавляем все:
                    fs.readFile(path + "/List.datas", "utf8", (err, data) => {
                        if (err) {
                            console.log("Ошибка в файле listenMQL.js #13: " + err.message);
                            res.end("ERROR_DISCONNECT");
                        } else {
                            let contentArray = []; // Массив, в который считаем данные из файла на сервере.
                            let indexContentArray = 0;
                            let tempContent = "";
                            for (let i = 0; i < data.length; ++i) {
                                if (data[i] != ';') {
                                    temp += data[i];
                                } else {
                                    contentArray[indexContentArray++] = temp;
                                    temp = "";
                                }
                            }

                            let added = false;
                            for (let i = 0; i < contentArray.length; ++i) {
                                for (let j = 2; i < arrayList.length; ++j) {
                                    if (arrayList[j] == contentArray[i]) {
                                        added = true;
                                        break;
                                    }
                                }
                                if (added) {
                                    break;
                                }
                            }

                            if (!added) {
                                // ДОБАВЛЯЕМ ДАННЫЕ В ФАЙЛ:
                                let inputDatas = "";
                                for (let i = 2; i < arrayList.length; ++i) {
                                    inputDatas += arrayList[i] + ';';
                                }

                                fs.readFile(path + "/counterList.datas", "utf8", (err, data) => {
                                    if (err) {
                                        console.log("Ошибка в файле listenMQL.js #14: " + err.message);
                                        res.end("ERROR_DISCONNECT");
                                    } else {
                                        let qtyList = data + arrayList.length - 2;
                                        fs.appendFile(path + "/List.datas", inputDatas, (err) => {
                                            if (err) {
                                                console.log("Ошибка в файле listenMQL.js #15: " + err.message);
                                                res.end("ERROR_DISCONNECT");
                                            } else {
                                                fs.writeFile(path + "/counterList.datas", qtyList.toString(), (err) => {
                                                    console.log("ДОБАВЛЕНО !!!");
                                                    res.end("");
                                                });
                                            }
                                        });
                                    }
                                });
                            }
                        }
                    });
                }
            }
        });
    });
}).listen(3333); // Порт прослушивания.