require('./verify_dep');
var util = require('util'),
    phantom = require('phantom'),
    events = require('events');

function GServiceMiner(url, opts){
    events.EventEmitter.call(this);

    opts = opts || {};
    var refresh = opts.refresh || 60 * 1000; //1 minute

    var self = this;
    setupPage(function(ph, page){
	page.open(url, function(status){
	    if(status === 'success') {
		retrievePoints(page, refresh, function(points){
		    self.emit('data',  {points : points});
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

    setTimeout(function(){
	retrievePoints(page, refresh, cb);
    }, refresh);
}

util.inherits(GServiceMiner, events.EventEmitter);

module.exports = GServiceMiner;
