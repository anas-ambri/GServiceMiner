GServiceMiner
=============

A library to mine data from the <a href="http://www.shabdar.org/asp-net/70-google-maps-control-for-aspnet-part-1.html">Google Maps Control for ASP.NET</a>

##Setup
You need to have <a href="https://github.com/ariya/phantomjs">PhantomJS</a> installed on your PATH.

##Tests
	npm test

##How it works
GServiceMiner uses <a href="https://github.com/sgentle/phantomjs-node/wiki">phantom-node</a> to create an instance of the target webpage, and extracts the information from it.

##Features
For now, only `Points` (e.g., actual markers on the map) are retrieved from the GService.