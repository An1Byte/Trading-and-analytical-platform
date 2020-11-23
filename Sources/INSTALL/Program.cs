using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Diagnostics; // Для работы с командной строкой !!!
using System.IO;

namespace INSTALL {
    class Program {
        struct Functions {
            public void copy() {
                byte[] array;

                // Копируем файл:
                using(FileStream fin = File.OpenRead("./bin/InvizzzApplication")) {
                    array = new byte[fin.Length]; // преобразуем строку в байты
                    fin.Read(array, 0, array.Length); // считываем данные
                }

                // Вставляем файл:
                using(FileStream fout = new FileStream("./InvizzzApplication.exe", FileMode.OpenOrCreate)) {
                    fout.Write(array, 0, array.Length); // запись массива байтов в файл
                }
            }
        }
        

        static void Main(string[] args) {

            Functions funs;

            Console.ForegroundColor = ConsoleColor.Yellow;
            Console.WriteLine("Ru: Вместе с данной программой будет установлен пакет nodeJS версии 14.15.1, без которого программа-коннектор работать не станет. Если же у вас уже есть nodeJS, или вы собираетесь скачать версию по свежее, или вы собираетесь использовать программу, используя другой локальный сервер, то нажмите ПРОБЕЛ, в этом случае вы установите только саму программу-коннектор. (En: Along with this program, the nodeJS package version 14.15.1 will be installed, without which the connector program will not work. If you already have nodeJS, or you are going to download a fresh version, or you are going to use the program using another local server, then press SPACEBAR, in this case you will install only the connector program itself.)");
            Console.WriteLine();
            Console.ForegroundColor = ConsoleColor.Green;
            Console.WriteLine("Ru: Нажмите любую клавишу для начала процесса установки программы и NodeJS сервера или нажмите пробел для установки только программы - коннектора... (En: Press any key to start the installation process of the program and the NodeJS server, or press the spacebar to install only the connector program ...)");

            int key = (int)Console.ReadKey().KeyChar;

            if(key == 32) { // Без установки nodeJS:
                Console.Clear();
                funs.copy(); // Копируем exe в нужный каталог
            }
            else { // С установкой nodeJS:
                Console.Clear();
                funs.copy(); // Копируем exe в нужный каталог

                ProcessStartInfo psi = new ProcessStartInfo();
                psi.FileName = "cmd.exe"; //Имя запускаемого приложения
                psi.Arguments = @"/c start ./NodeJS/node-v14.15.1-x64.msi"; //команда, которую надо выполнить
                //  /c - после выполнения команды консоль закроется
                //  /к - не закрывать консоль после выполнения команды
                Process.Start(psi);
            }
        }
    }
}
