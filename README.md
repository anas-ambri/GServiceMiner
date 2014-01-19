GServiceMiner
=============

A library to mine data from the <a href="http://www.shabdar.org/asp-net/70-google-maps-control-for-aspnet-part-1.html">Google Maps Control for ASP.NET</a>


##Setup
You need to have <a href="https://github.com/ariya/phantomjs">PhantomJS</a> installed on your PATH.


##Usage
    var miner = new GServiceMiner("http://shuttle.concordia.ca/Map.aspx");
    miner.on('data', function(data){
	var points = data.points.map(function(point){
	    return {
		element : point.ID,
		longitude : point.Longitude,
		latitude : point.Latitude
	    };
	});
	console.log( 'new data ='+JSON.stringify(points, null, 4) );
    });


##Tests
	npm test


##API
The library provides with an eventsEmitter that periodically emits the data collected from the Maps Control.

###GServiceMiner
Exposed by `require('gserviceminer')`

###GServiceMiner(url: String)
Creates a new eventsEmitter that mines the page at `url` for data

###GServiceMiner(url: String, opts: Object)
The following options are supported by the constructor:

- `refresh`: the period, in ms, at which the eventsEmitter should mine the page. Default is 1 minute


##How it works
GServiceMiner uses <a href="https://github.com/sgentle/phantomjs-node/wiki">phantom-node</a> to create an instance of the target webpage, and extracts the information from it.


##Features
For now, only `Points` (e.g., actual markers on the map) are retrieved from the GService.