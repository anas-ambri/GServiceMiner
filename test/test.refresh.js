var should = require('should'),
    GServiceMiner = require('./../lib/');

var sample_url = 'http://shuttle.concordia.ca/Map.aspx';

describe('GService mining refresh', function(){
    it('Refresh can be specified', function(done){
	var refresh = 2000;
	this.timeout(50 * refresh);

	var miner = new GServiceMiner(sample_url, {refresh: refresh});
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
