//+------------------------------------------------------------------+
//|                                                  MT4_INVIZZZ.mq4 |
//|                                          https://www.invizzz.com |
//+------------------------------------------------------------------+

#property strict
input int historySize = 1000;

class Instrument{
   public:
   string instrumentName;
   string tSize;
   int tFrame;
   string lastTime;
};

// Переменные, в которых будет записана разница между локальным и серверным временем: ----- //
MqlDateTime mqlDateTimeStructureDiff;
datetime difference;
int diff;
// ---------------------------------------------------------------------------------------- //

string BrockerName = AccountInfoString(ACCOUNT_COMPANY);
string terminalName = "#MT4#";
string brockerName = BrockerName;
string addDescript = terminalName + brockerName;

int buy_ordersArray[100];
int sell_ordersArray[100];
int buy_ordersArrayLength = 0;
int sell_ordersArrayLength = 0;

Instrument instrument;

void rewritingFileOrders(string text){
   int fout_Orders = FileOpen("Invizzz/Orders.txt", FILE_WRITE);
   if (fout_Orders != INVALID_HANDLE) {
      FileWrite(fout_Orders, text);
      FileClose(fout_Orders);
   }
}

int OnInit() {
    instrument.instrumentName = Symbol();
    instrument.tSize = DoubleToString(MarketInfo(instrument.instrumentName, MODE_TICKSIZE), (int)MarketInfo(instrument.instrumentName, MODE_DIGITS));
    instrument.tFrame = Period();
    
    // ------------ Определяем разницу серверного времени и локального: - //
    difference = fabs(TimeGMT() - TimeLocal());
    TimeToStruct(difference, mqlDateTimeStructureDiff);
    diff = mqlDateTimeStructureDiff.hour;
    diff = (TimeGMT() < TimeLocal()) ? diff : -diff;
    // ------------------------------------------------------------------ //
    
    while(true){
        int fout_List = FileOpen("Invizzz/List.txt", FILE_READ | FILE_WRITE);
        if (fout_List != INVALID_HANDLE) {
            FileSeek(fout_List, 0, SEEK_END);
            FileWrite(fout_List, instrument.instrumentName + addDescript + "#" + instrument.tSize + "#" + IntegerToString(instrument.tFrame));
            FileClose(fout_List);
            break;
        }
        else{
            Sleep(100);
        }
    }
    

    // Создание файла ордерс:
    int fin_Orders = FileOpen("Invizzz/Orders.txt", FILE_READ);
    if (fin_Orders != INVALID_HANDLE) {
        FileClose(fin_Orders); // Файл уже создан.
    }
    else {
        int fout_Orders = FileOpen("Invizzz/Orders.txt", FILE_WRITE);
        if (fout_Orders != INVALID_HANDLE) {
            FileWrite(fout_Orders, "");
            FileClose(fout_Orders);
        }
    }

    // Загружаем историю по инструменту:
    string currentAsk = DoubleToString(Ask, _Digits);
    string currentBid = DoubleToString(Bid, _Digits);

    int history = Bars;
    history = (history > historySize) ? historySize : history;

    string PushBack = "";
    for (int n = history - 1; n >= 0; --n) {

        // Определяем время бара:
        datetime tempTime = Time[n];
        MqlDateTime mqlDateTimeStructure;
        TimeToStruct(tempTime, mqlDateTimeStructure);
        mqlDateTimeStructure.hour + diff;

        int HOURES = mqlDateTimeStructure.hour;
        int MINUTES = mqlDateTimeStructure.min;
        int DAY = mqlDateTimeStructure.day;
        int MONTH = mqlDateTimeStructure.mon;
        int YEAR = mqlDateTimeStructure.year;

        string pref = "0";
        string H = (HOURES < 10) ? pref + IntegerToString(HOURES) : IntegerToString(HOURES);
        string Min = (MINUTES < 10) ? pref + IntegerToString(MINUTES) : IntegerToString(MINUTES);
        string D = (DAY < 10) ? pref + IntegerToString(DAY) : IntegerToString(DAY);
        string Mon = (MONTH < 10) ? pref + IntegerToString(MONTH) : IntegerToString(MONTH);
        string Y = IntegerToString(YEAR);

        string barTime = H + ":" + Min + "&" + D + "/" + Mon + "/" + Y;

        int epcilon = (int)MarketInfo(instrument.instrumentName, MODE_DIGITS);

        double tempOpen = Open[n];
        double tempHigh = High[n];
        double tempLow = Low[n];
        double tempClose = Close[n];

        if (n > 0) {
            if ((tempOpen != 0.0) && (tempHigh != 0.0) && (tempLow != 0.0) && (tempClose != 0.0)) {
                if (n != 1) {
                    PushBack += DoubleToString(tempOpen, epcilon) + ";" +
                        DoubleToString(tempHigh, epcilon) + ";" +
                        DoubleToString(tempLow, epcilon) + ";" +
                        DoubleToString(tempClose, epcilon) + ";" +
                        barTime + "\n";
                }
                else {
                    PushBack +=  DoubleToString(tempOpen, epcilon) + ";" +
                                 DoubleToString(tempHigh, epcilon) + ";" +
                                 DoubleToString(tempLow, epcilon) + ";" +
                                 DoubleToString(tempClose, epcilon) + ";" +
                                 barTime;
                    instrument.lastTime = barTime;
                }
            }
        }
        else{ // == 0
            if ((tempOpen != 0.0) && (tempHigh != 0.0) && (tempLow != 0.0) && (tempClose != 0.0)) {

                  datetime tempTime1 = Time[n+1];
                 MqlDateTime mqlDateTimeStructure1;
                 TimeToStruct(tempTime1, mqlDateTimeStructure1);
                 mqlDateTimeStructure1.hour + diff;
         
                 int HOURES1 = mqlDateTimeStructure1.hour;
                 int MINUTES1 = mqlDateTimeStructure1.min;
                 int DAY1 = mqlDateTimeStructure1.day;
                 int MONTH1 = mqlDateTimeStructure1.mon;
                 int YEAR1 = mqlDateTimeStructure1.year;
         
                 string H1 = (HOURES1 < 10) ? pref + IntegerToString(HOURES1) : IntegerToString(HOURES1);
                 string Min1 = (MINUTES1 < 10) ? pref + IntegerToString(MINUTES1) : IntegerToString(MINUTES1);
                 string D1 = (DAY1 < 10) ? pref + IntegerToString(DAY1) : IntegerToString(DAY1);
                 string Mon1 = (MONTH1 < 10) ? pref + IntegerToString(MONTH1) : IntegerToString(MONTH1);
                 string Y1 = IntegerToString(YEAR1);
         
                 string barTime1 = H1 + ":" + Min1 + "&" + D1 + "/" + Mon1 + "/" + Y1;
         
                 double tempOpen1 = Open[n+1];
                 double tempHigh1 = High[n+1];
                 double tempLow1 = Low[n+1];
                 double tempClose1 = Close[n+1];
                    


                    string record = currentBid + ";" + currentAsk + ";" +
                          DoubleToString(tempOpen, epcilon) + ";" +
                          DoubleToString(tempHigh, epcilon) + ";" +
                          DoubleToString(tempLow, epcilon) + ";" +
                          DoubleToString(tempClose, epcilon) + ";" +
                          barTime + ";" + 
                          DoubleToString(tempOpen1, epcilon) + ";" +
                          DoubleToString(tempHigh1, epcilon) + ";" +
                          DoubleToString(tempLow1, epcilon) + ";" +
                          DoubleToString(tempClose1, epcilon) + ";" +
                          barTime1 + ";";

                int fout_current = FileOpen("Invizzz/current#" + instrument.instrumentName + addDescript + "#" + instrument.tSize + "#" + IntegerToString(instrument.tFrame) + ".txt", FILE_WRITE);
                if (fout_current != INVALID_HANDLE) {
                    FileWrite(fout_current, record);
                    FileClose(fout_current);
                }
            }
        }
    }
    int fout_history = FileOpen("Invizzz/" + instrument.instrumentName + addDescript + "#" + instrument.tSize + "#" + IntegerToString(instrument.tFrame) + ".txt", FILE_WRITE);
    if (fout_history != INVALID_HANDLE) {
        FileWrite(fout_history, PushBack);
        FileClose(fout_history);
    }
    EventSetMillisecondTimer(50);
    return(INIT_SUCCEEDED);
}



void OnDeinit(const int reason) {
   EventKillTimer();
    // Удаление всех созданных ранее файлов:
    FileDelete("Invizzz/" + instrument.instrumentName + addDescript + "#" + instrument.tSize + "#" + IntegerToString(instrument.tFrame) + ".txt");
    FileDelete("Invizzz/current#" + instrument.instrumentName + addDescript + "#" + instrument.tSize + "#" + IntegerToString(instrument.tFrame) + ".txt");
    
    int fin_File = FileOpen("Invizzz/List.txt", FILE_TXT|FILE_READ);
    if(fin_File != INVALID_HANDLE){
         string tempRecord = "";
         int counter = 0;
         while(!(FileIsEnding(fin_File))){
            string tempText = FileReadString(fin_File);
            if(tempText != instrument.instrumentName + addDescript + "#" + instrument.tSize + "#" + IntegerToString(instrument.tFrame)){
               tempRecord += tempText + "\n";
               if(tempText != ""){
                  counter++;
               }
            }
         }
         FileClose(fin_File);
         
         if(counter > 0){
            string newRecord = "";
            for(int i=0; i < StringLen(tempRecord)-1; ++i){
                  if(tempRecord[i] == '\n' && tempRecord[i+1] == '\n'){
                     newRecord += "\n";
                     ++i;
                  }
                  else{
                     newRecord += CharToString(char(tempRecord[i]));
                  }
            }
         
            int fout_List = FileOpen("Invizzz/List.txt", FILE_WRITE);
            if(fout_List != INVALID_HANDLE){
               FileWrite(fout_List, newRecord);
               FileClose(fout_List);
            }
         }
         else{ //== 0
            FileDelete("Invizzz/Orders.txt");
            FileDelete("Invizzz/List.txt");
         }
    }
    
}

void OnTimer(){
   // Проверка файла Ордерс на наличие приказов:
    int fin_Orders = FileOpen("Invizzz/Orders.txt", FILE_TXT|FILE_READ);
    if (fin_Orders != INVALID_HANDLE) {
        string __Order = "";
        while(!(FileIsEnding(fin_Orders))){
            string tempText = FileReadString(fin_Orders);
            __Order += tempText;
        }
        FileClose(fin_Orders);
        if(__Order != ""){
           string typeOrder = "";
           string IName = "";
           double lot;
           string reWrite = "";
           
           int _counter_ = 0;
           string temp = "";
           for(int i=0; i < StringLen(__Order); ++i){
               if(StringSubstr(__Order, i, 1) != ";" && StringSubstr(__Order, i, 1) != "\r" && StringSubstr(__Order, i, 1) != "\n" && StringSubstr(__Order, i, 1) != "`"){
                  temp += StringSubstr(__Order, i, 1);
               }
               else if(StringSubstr(__Order, i, 1) == "`"){
                  for(int j = i+1; j < StringLen(__Order); ++j){
                     reWrite += StringSubstr(__Order, j, 1);
                  }
                  break;
               }
               else{
                  if(_counter_ == 0){
                     typeOrder = temp;
                     temp = "";
                     _counter_++;
                  }
                  else if(_counter_ == 1){
                     IName = temp;
                     temp = "";
                     _counter_++;
                  }
                  else if(_counter_ == 2){
                     lot = StringToDouble(temp);
                     temp = "";
                     _counter_++;
                  }
                  else{
                     break;
                  }
               }
            }
            
            string termN = "#";
            bool bbF = false;
            for(int k=0; k < StringLen(IName); ++k){
               if(StringSubstr(IName, k, 1) == "#"){
                  for(int kk=k+1; kk < StringLen(IName); ++kk){
                     if(StringSubstr(IName, kk, 1) != "#"){
                        termN += StringSubstr(IName, kk, 1);
                     }
                     else{
                        bbF = true;
                        break;
                     }
                  }
                  if(bbF) break;
               }
            } termN += "#";
            
            if(termN != terminalName){
               rewritingFileOrders(reWrite);
            }
            else{
               if(IName == instrument.instrumentName + addDescript + "#" + instrument.tSize + "#" + IntegerToString(instrument.tFrame)){
            
                  // Перезаписываем файл:
                     rewritingFileOrders(reWrite);
            
                        if(typeOrder == "BUY"){
                           int ans = OrderSend(instrument.instrumentName, 0, lot, Ask, 30, 0, 0);
                           if(ans != -1){
                              //Alert(instrument.instrumentName + ": Order BUY"); 
                              buy_ordersArray[buy_ordersArrayLength] = ans;
                              buy_ordersArrayLength++;
                              Sleep(200);
                           }
                        }
                        else if(typeOrder == "SELL"){
                           int ans = OrderSend(instrument.instrumentName, 1, lot, Bid, 30, 0, 0);
                           if(ans != -1){
                              //Alert(instrument.instrumentName + ": Order SELL"); 
                              sell_ordersArray[sell_ordersArrayLength] = ans;
                              sell_ordersArrayLength++;
                              Sleep(200);
                           }
                        }
                        else if(typeOrder == "CLOSE_BUY"){
                           for(int all = 0; all < buy_ordersArrayLength; ++all){
                              if(OrderClose(buy_ordersArray[all], lot, Bid, 30)){
                                 Sleep(200);
                              }
                           }
                           buy_ordersArrayLength = 0;
                        }
                        else if(typeOrder == "CLOSE_SELL"){
                           for(int all = 0; all < sell_ordersArrayLength; ++all){
                              if(OrderClose(sell_ordersArray[all], lot, Ask, 30)){
                                 Sleep(200);
                              }
                           }
                           sell_ordersArrayLength = 0;
                        }
                     }
            }
                     
                     
        }
    }
}

void OnTick() { // OnTick

    string currentAsk = DoubleToString(Ask, _Digits);
    string currentBid = DoubleToString(Bid, _Digits);

    int history = Bars;
    history = (history > historySize) ? historySize : history;
    string PushBack = "";

    int epcilon = _Digits;

    // Время текущего бара, то есть нулевого, несформированного:
    datetime tempTime0 = Time[0];
    MqlDateTime mqlDateTimeStructure0;
    TimeToStruct(tempTime0, mqlDateTimeStructure0);
    mqlDateTimeStructure0.hour + diff;

    int HOURES0 = mqlDateTimeStructure0.hour;
    int MINUTES0 = mqlDateTimeStructure0.min;
    int DAY0 = mqlDateTimeStructure0.day;
    int MONTH0 = mqlDateTimeStructure0.mon;
    int YEAR0 = mqlDateTimeStructure0.year;

    string pref = "0";
    string H0 = (HOURES0 < 10) ? pref + IntegerToString(HOURES0) : IntegerToString(HOURES0);
    string Min0 = (MINUTES0 < 10) ? pref + IntegerToString(MINUTES0) : IntegerToString(MINUTES0);
    string D0 = (DAY0 < 10) ? pref + IntegerToString(DAY0) : IntegerToString(DAY0);
    string Mon0 = (MONTH0 < 10) ? pref + IntegerToString(MONTH0) : IntegerToString(MONTH0);
    string Y0 = IntegerToString(YEAR0);

    string barTime0 = H0 + ":" + Min0 + "&" + D0 + "/" + Mon0 + "/" + Y0;

    double tempOpen0 = Open[0];
    double tempHigh0 = High[0];
    double tempLow0 = Low[0];
    double tempClose0 = Close[0];

    // Время последнего полностью сформировавшегося бара на тек момент:
    datetime tempTime1 = Time[1];
    MqlDateTime mqlDateTimeStructure1;
    TimeToStruct(tempTime1, mqlDateTimeStructure1);
    mqlDateTimeStructure1.hour + diff;

    int HOURES1 = mqlDateTimeStructure1.hour;
    int MINUTES1 = mqlDateTimeStructure1.min;
    int DAY1 = mqlDateTimeStructure1.day;
    int MONTH1 = mqlDateTimeStructure1.mon;
    int YEAR1 = mqlDateTimeStructure1.year;

    string H1 = (HOURES1 < 10) ? pref + IntegerToString(HOURES1) : IntegerToString(HOURES1);
    string Min1 = (MINUTES1 < 10) ? pref + IntegerToString(MINUTES1) : IntegerToString(MINUTES1);
    string D1 = (DAY1 < 10) ? pref + IntegerToString(DAY1) : IntegerToString(DAY1);
    string Mon1 = (MONTH1 < 10) ? pref + IntegerToString(MONTH1) : IntegerToString(MONTH1);
    string Y1 = IntegerToString(YEAR1);

    string barTime1 = H1 + ":" + Min1 + "&" + D1 + "/" + Mon1 + "/" + Y1;

    double tempOpen1 = Open[1];
    double tempHigh1 = High[1];
    double tempLow1 = Low[1];
    double tempClose1 = Close[1];

    string record = currentBid + ";" + currentAsk + ";" +
        DoubleToString(tempOpen0, epcilon) + ";" +
        DoubleToString(tempHigh0, epcilon) + ";" +
        DoubleToString(tempLow0, epcilon) + ";" +
        DoubleToString(tempClose0, epcilon) + ";" +
        barTime0 + ";" + 
        DoubleToString(tempOpen1, epcilon) + ";" +
        DoubleToString(tempHigh1, epcilon) + ";" +
        DoubleToString(tempLow1, epcilon) + ";" +
        DoubleToString(tempClose1, epcilon) + ";" +
        barTime1 + ";";

    string addRecord = DoubleToString(tempOpen1, epcilon) + ";" +
        DoubleToString(tempHigh1, epcilon) + ";" +
        DoubleToString(tempLow1, epcilon) + ";" +
        DoubleToString(tempClose1, epcilon) + ";" +
        barTime1;

    if (barTime1 != instrument.lastTime) {
        instrument.lastTime = barTime1;
        // Добавляем данные в конец списка по бару с индексом 1
        int fout_addToHistory = FileOpen("Invizzz/" + instrument.instrumentName + addDescript + "#" + instrument.tSize + "#" + IntegerToString(instrument.tFrame) + ".txt", FILE_READ | FILE_WRITE);
        if (fout_addToHistory != INVALID_HANDLE) {
            FileSeek(fout_addToHistory, 0, SEEK_END);
            FileWrite(fout_addToHistory, addRecord);
            FileClose(fout_addToHistory);
        }
        
    }

    // И в любом случае обновляем данные по текущему бару:
    int fout_updateCurrent = FileOpen("Invizzz/current#" + instrument.instrumentName + addDescript + "#" + instrument.tSize + "#" + IntegerToString(instrument.tFrame) + ".txt", FILE_WRITE);
    if (fout_updateCurrent != INVALID_HANDLE) {
        FileWrite(fout_updateCurrent, record);
        FileClose(fout_updateCurrent);
    }
}
