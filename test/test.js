var should = require('should'),
    GServiceMiner = require('./../lib/');

var sample_url = 'http://shuttle.concordia.ca/Map.aspx';
var refresh = 2000;
var miner = new GServiceMiner(sample_url, {refresh: refresh});


describe('GService Mining data', function(){
    it('Data contains points from the map', function(done){
	this.timeout(50 * refresh);

	miner.on('data', function(data){
	    var points = data.points;
	    points.length.should.be.above(5);
	    var loy = points[0];
	    var sgw = points[1];

	    loy.should.have.properties({
		"ID": "GPLoyola",
		"Longitude": -73.639835,
		"Latitude": 45.458022
	    });

	    sgw.should.have.properties({
		"ID": "GPSirGeorge",
		"Longitude": -73.578734,
		"Latitude": 45.497109
	    });
	    done();
	});
    });
});

describe('GService mining refresh', function(){
    it('Refresh can be specified', function(done){
	this.timeout(50 * refresh);

	var start_time, end_time;
	miner.on('data', function(data){
	    if(!start_time){
		start_time = new Date();
	    } else {
		end_time = new Date();
		var diff = Math.round((end_time - start_time)/1000);
		diff.should.eql(Math.round(refresh/1000));
		done();
	    }
	});
    });
});
