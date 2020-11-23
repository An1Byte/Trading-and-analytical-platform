# Invizzz
<i>It application is connector for trading terminals. The main feature of this application is the ability to build multi-charts or synthetic instruments between different trading terminals. This program allows you to create your own synthetic instruments based on two other weighted trading instruments. Functions for analyzing synthetic instruments are supported, and one-click trading functions are supported. It is possible to build multi-charts.</i>
<hr>

<h3>Screenshots:</h3>
<p><b>Creation of synthetics in data collection mode for building a history of synthetics in the form of a candlestick chart:</b></p>
<p><a href="https://ibb.co/q7mBqY6"><img height="600" width="600" src="https://i.ibb.co/q7mBqY6/111.png" alt="111" border="0"></a></p>
<br>
<p><b>Construction of multicurrency charts without restrictions on the number of charts:</b></p>
<p><a href="https://ibb.co/Wnpvbcg"><img height="600" width="600" src="https://i.ibb.co/Wnpvbcg/222-1.png" alt="222-1" border="0"></a></p>
<br>
<p><b>Building synthetics from any two instruments:</b></p>
<p><a href="https://ibb.co/RBCbjN1"><img height="600" width="600" src="https://i.ibb.co/RBCbjN1/333.png" alt="333" border="0"></a></p>

<h3>How modules and programs work:</h3>
<p>The application works in conjunction with a trading terminal or terminals (if there are many of them). Accepts input data from the trading terminal and works with them. As a data transmitter, trading experts are used, the essence of which is quite simple - organize and print data into text files so that the main program can read and use them. This makes the main program independent from the trading platform. Anyone who is willing to spend a little time learning a third-party API can write such modules without having to be a programer. We cannot write many modules at once, because in most cases, data can be provided by a broker only if there is a brokerage account. For this reason, we have implemented the connector only for the most popular terminals, which can be accessed for free, namely MT4 and MT5.</p>

<h3>Installation:</h3>
<ul>
  <li>1. Download and unzip the archive with the program to any convenient place.</li>
<li>2. Click on INSTALL.exe and install the connector program and the nodeJS server if you don't have the latter.</li>
<ul>
  <b>The options are:</b>
  <li>Installing the connector program without installing the nodeJS server.</li>
  <li>Installing the program - connector together with the nodeJS server.</li>
</ul>
<li>3. After installing nodeJS and the program, you can check if you have node js and is visible in the global scope. To do this, call the "Win + R" console, write "cmd" in the field that appears. In the console window that appears, type the following command and press Enter: "node -v" without quotes. If everything was installed correctly, then in response you will be given a line with the current version of node js. At this point the console can be closed. (You can skip this point, as this is just a test)</li>
<li>4. The list of experts contains the experts corresponding to the terminals, which should be placed in the space of your terminal. There are many tutorials on how to do this.</li>
<li>5. Turn on the terminal (s) and drag the Expert over the instruments you are interested in that you want to see in the connector. When dragging and dropping, you will be prompted to fill in a field (default = 1000) - this field is the value of the instrument's history data connector loaded in the program.</li>
<li>6. In the InServer folder there is an exe file called InvizzzApplication.exe. By clicking on it, a window will open in which you must register the absolute paths to the Invizzz folder in your terminal space. (For example, in my case it will be a line like this: "C: \ Program Files (x86) \ RoboForex - MetaTrader 4 \ MQL4 \ Files \ Invizzz"). By the way, this folder of Inwizz is created by experts, so this procedure should be performed with the scripts connected. After you specify the path to the folders, click on the green button and the chrome browser will open. The program is focused specifically on this browser, so it should also be installed, who does not have it!</li>
</ul>
<p><b>For those who do not have Windows:</b></p>
<ul>
<li>1. Download this program. After Download and install "nodejs" in network of internet.</li>
<li>2. Next, open the console and run the program for the node with the "server" parameter.</li>
<li>3. Next, open your browser and write "localhost: 8080" and then click Enter.</li>
</ul>

<p><i>* When you close the browser tab, the server will be automatically shut down.</i></p>
<p><i>* The program uses only 1 port 8080. If you accidentally created a duplicate of your application, then for correct operation it is better to close everything and start the application again.</i></p>
<br>
<h3>Connecting instruments and working with them:</h3>
After installing the application, turn on your trading terminal or terminals, if you have several. Then select the tools you would like to work with in the application. Drag and drop the appropriate script onto each tool you are interested in. (Further, these tools should not be touched at all, since some manipulations over them can lead to the EA reconnection, so all unnecessary manipulations should be done in a separate window, where there is no activated script). After the scripts have been successfully launched, you can start the server and open the browser (chrome or firefox) to go to the <b><a href="http://localhost:8080">local host</a></b>.

<h3>Description of the program modes:</h3>
<ol>
  <li><h5>Volume Connector:</h5><p><i>This mode has not yet been implemented.</i></p></li>
  <li><h5>Online:</h5><p><i>A mode in which synthetics are built only on the basis of the currently incoming data. There is no way to analyze historical data, but this data can be accumulated in real time. The advantage of this mode is the candlestick display of a synthetic instrument.</i></p></li>
  <li><h5>Offline:</h5><p><i>In this mode, the synthetic instrument will be built completely with all the available history and waiting for new data to arrive. The linear representation of a synthetic instrument is its main drawback.</i></p></li>
  <li><h5>Multi - charts:</h5><p><i>This mode allows you to display an unlimited number of instruments in one window. The peculiarity of this mode is in the binding algorithm for these instruments. All instruments are linked to a single value at a specified point in time. This avoids the scalability of the tools when you move the view layer relative to the view scales, as others usually do. In my case, the charts are 100% fixed and always show the correct deviation value, so you can not be afraid of changing the relationship between the instruments when scrolling the multi-graphic.</i></p></li>
  <li><h5>Resources:</h5><p><i>This mode simply includes links to the most commonly used Internet resources. Nothing significant here.</i></p></li>
</ol>
<br>
<h3>Small parting words:</h3>
<p><i>We can say that this is an introductory program for introducing you to arbitrage and pair trading, in order to understand which synthetics you can work with and which you cannot. If this program is quite suitable for pair trading, then for arbitrage trading it is not competitive with other bots. For this purpose, a high-speed robot will be written separately in C ++. Although this program can still be slightly accelerated by decreasing the set interval parameters in the code, you should not greatly underestimate them, and I do not advise you to do this.</i></p>
