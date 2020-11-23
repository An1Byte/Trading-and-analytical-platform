#include <fstream>
#include <thread>
#include <Windows.h>

#include <iostream>

using namespace std;

void foo() {
	this_thread::sleep_for(chrono::milliseconds(1000));
	system("start chrome \"http://localhost:8080\"");
	HWND hWnd1 = GetConsoleWindow();
	ShowWindow(hWnd1, SW_HIDE);
	cin.get();
}

int main(int argc, char ** argv){

	thread th(foo);
	th.detach();
	system("node server.js");
	HWND hWnd2 = GetConsoleWindow();
	ShowWindow(hWnd2, SW_HIDE);
	cin.get();
	return 0;
}