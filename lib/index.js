require('./verify_dep');
var util = require('util'),
    phantom = require('phantom'),
    events = require('events');

module.exports = GServiceMiner;

function GServiceMiner(url, opts){
    events.EventEmitter.call(this);

    opts = opts || {};
    var refresh = opts.refresh || 60 * 1000; //1 minute

    var self = this;
    setupPage(function(ph, page){
	page.open(url, function(status){
	    if(status === 'success') {
		retrievePoints(page, refresh, function(points){
		    self.emit('points', points);		    
		});
	    }
	    else {
		self.emit('error');
		ph.exit(); 
	    }
	});
    });
}

function setupPage(cb){
    phantom.create(function(ph){
	ph.createPage(function(page){
	    cb(ph, page);
	});
    });
}

function retrievePoints(page, refresh, cb){
    page.evaluate(
	function(){
	    return returned_result;
	},
	function(result){
	    cb(result.Points);
	});

    setTimeout(retrievePoints, refresh);
}

util.inherits(GServiceMiner, events.EventEmitter);

if(module === require.main){
    var miner = new GServiceMiner("http://shuttle.concordia.ca/Map.aspx");
    miner.on('points',function(data){
	var points = data.map(function(point){
	    return {
		element : point.ID,
		longitude : point.Longitude,
		latitude : point.Latitude
	    };
	});
	console.log( 'new data ='+JSON.stringify(points, null, 4) );
    });
    miner.on('error', function(){
	console.log( 'error' );
    });
}
