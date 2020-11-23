using System;
using System.IO;
using System.Diagnostics; // Для выполнения команд cmd !!!
using System.Threading;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Navigation;
using System.Windows.Shapes;
//using System.Runtime.InteropServices; // Для ShowWindow api

namespace InvizzzApplication {

    public partial class MainWindow : Window {


        //[DllImport("user32.dll")]
        //static extern bool ShowWindow(IntPtr hWnd, int nCmdShow);

        //[DllImport("Kernel32")]
        //private static extern IntPtr GetConsoleWindow();

        //const int SW_HIDE = 0;
        //const int SW_SHOW = 5;

        public MainWindow() {
            InitializeComponent();

            button1.Click += startBtn_click_Slot; // Связываем кнопку со слотом !

            // ----- Заполнение TextBoxes данными из файла:
            string _data = readFileFun();
            string tempStr = "";
            for(int i=0; i < _data.Length; ++i) {
                if(_data[i] == '\r' || _data[i] == '\n' || _data[i] == ';' || _data[i] == ',') {
                    if(tempStr != "") {
                        foreach(UIElement elem in MainRoot.Children) {
                            if(elem is TextBox) {
                                if(((TextBox)elem).Text == "") {
                                    ((TextBox)elem).Text = tempStr;
                                    tempStr = "";
                                    break;
                                }
                            }
                        }
                    }
                }
                else {
                    tempStr += _data[i];
                }
            }
            // -----------------------------------------------------
        }

        private void startBtn_click_Slot(object sender, RoutedEventArgs e) {
            writeFileFun();
            system_analog();

            Thread.Sleep(1000);

            //chromeRun();

            //Thread.Sleep(1000);
            Application.Current.Shutdown(); // Закрыть приложение.
        }
        

        public string readFileFun() {
            const string path_to_file = "Files/Paths_to_Invizzz.txt";

            try {
                FileStream fin = File.OpenRead(path_to_file);
                byte[] array = new byte[fin.Length]; // преобразуем строку в байты
                fin.Read(array, 0, array.Length); // считываем данные
                string textFromFile = System.Text.Encoding.Default.GetString(array); // декодируем байты в строку
                fin.Close();
                return textFromFile;
            }
            catch(Exception ex) {
                return "";
            }
        }

        public bool writeFileFun() {
            const string path_to_file = "Files/Paths_to_Invizzz.txt";
            string text = "";
            foreach(UIElement elem in MainRoot.Children) {
                if(elem is TextBox) {
                    if(((TextBox)elem).Text != "") {
                        text += ((TextBox)elem).Text + ";";
                    }
                }
            }

            try {
                FileStream fout = new FileStream(path_to_file, FileMode.OpenOrCreate);
                byte[] array = System.Text.Encoding.Default.GetBytes(text); // преобразуем строку в байты
                fout.Write(array, 0, array.Length); // запись массива байтов в файл
                fout.Close();
                return true;
            }
            catch(Exception ex) {
                return false;
            }
        }

        public void system_analog() {
            ProcessStartInfo psi_server = new ProcessStartInfo();
            psi_server.FileName = "cmd.exe";
            psi_server.Arguments = "/c start serv.exe";

            // /k - Если хотим, чтобы консоль по завершению была открыта
            // /c - Если хотим, чтобы консоль по завершению была закрыта

            Process.Start(psi_server);

            //IntPtr hwnd;
            //hwnd = GetConsoleWindow();
            //ShowWindow(hwnd, SW_HIDE);

        }

        //public void chromeRun(){
        //    ProcessStartInfo psi_server = new ProcessStartInfo();
        //    psi_server.FileName = "cmd.exe";
        //    psi_server.Arguments = "/c start chrome \"http://localhost:8080\"";

        //    // /k - Если хотим, чтобы консоль по завершению была открыта
        //    // /c - Если хотим, чтобы консоль по завершению была закрыта

        //    Process.Start(psi_server);
            

        //    IntPtr hwnd;
        //    hwnd = GetConsoleWindow();
        //    ShowWindow(hwnd, SW_HIDE);

        //}

        //public void loginfile(string text) {
        //    text += "\n";
        //    using(FileStream log = new FileStream("log.txt", FileMode.Append)) {
        //        byte[] array = System.Text.Encoding.Default.GetBytes(text);
        //        log.Write(array, 0, array.Length);
        //    }
        //}
    }
}
