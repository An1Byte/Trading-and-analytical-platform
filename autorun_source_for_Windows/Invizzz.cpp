#include <fstream>
#include <thread>
#include <Windows.h>

using namespace std;

void foo() {
	system("start chrome \"http://localhost:8080\"");
	HWND hWnd1 = GetConsoleWindow();
	ShowWindow(hWnd1, SW_HIDE);
}

int main(int argc, char ** argv){

	thread th(foo);
	th.detach();
	system("node server.js");
	HWND hWnd2 = GetConsoleWindow();
	ShowWindow(hWnd2, SW_HIDE);
	
	return 0;
}
