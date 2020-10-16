# Invizzz
<i>It application is connector for trading terminals. The main feature of this application is the ability to build multi-charts or synthetic instruments between different trading terminals. This program allows you to create your own synthetic instruments based on two other weighted trading instruments. Functions for analyzing synthetic instruments are supported, and one-click trading functions are supported. It is possible to build multi-charts.</i>
<hr>

<h3>How modules and programs work:</h3>
<p>The application works in conjunction with a trading terminal or terminals (if there are many of them). Accepts input data from the trading terminal and works with them. As a data transmitter, trading experts are used, the essence of which is quite simple - organize and print data into text files so that the main program can read and use them. This makes the main program independent from the trading platform. Anyone who is willing to spend a little time learning a third-party API can write such modules without having to be a programer. We cannot write many modules at once, because in most cases, data can be provided by a broker only if there is a brokerage account. For this reason, we have implemented the connector only for the most popular terminals, which can be accessed for free, namely MT4 and MT5.</p>

<h3>Installation:</h3>

// ...

<h3>Connecting instruments and working with them:</h3>
After installing the application, turn on your trading terminal or terminals, if you have several. Then select the tools you would like to work with in the application. Drag and drop the appropriate script onto each tool you are interested in. (Further, these tools should not be touched at all, since some manipulations over them can lead to the EA reconnection, so all unnecessary manipulations should be done in a separate window, where there is no activated script). After the scripts have been successfully launched, you can start the server and open the browser (chrome or firefox) to go to the <b><a href="http://localhost:8080">local host</a></b>. For Windows users, this is all done by autorun: <b>Invizzz.exe</b>

<h3>Description of the program modes:</h3>
<ol>
  <li><h5>Volume Connector:</h5><p><i>This mode has not yet been implemented.</i></p></li>
  <li><h5>Online:</h5><p><i>A mode in which synthetics are built only on the basis of the currently incoming data. There is no way to analyze historical data, but this data can be accumulated in real time. The advantage of this mode is the candlestick display of a synthetic instrument.</i></p></li>
  <li><h5>Offline:</h5><p><i>In this mode, the synthetic instrument will be built completely with all the available history and waiting for new data to arrive. The linear representation of a synthetic instrument is its main drawback.</i></p></li>
  <li><h5>Multi - charts:</h5><p><i>This mode allows you to display an unlimited number of instruments in one window. The peculiarity of this mode is in the binding algorithm for these instruments. All instruments are linked to a single value at a specified point in time. This avoids the scalability of the tools when you move the view layer relative to the view scales, as others usually do. In my case, the charts are 100% fixed and always show the correct deviation value, so you can not be afraid of changing the relationship between the instruments when scrolling the multi-graphic.</i></p></li>
  <li><h5>Resources:</h5><p><i>This mode simply includes links to the most commonly used Internet resources. Nothing significant here.</i></p></li>
</ol>
