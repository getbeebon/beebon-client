
var BeebonClient = require('./index');

var beebon = new BeebonClient({
	host: '192.168.1.1',
	port: '3101',
    collection: 'key1234'
});

beebon.log({name: 'vasya', type: 'super'}, 'lolo')
    .then(function(data){ 
    	console.log(data) 
    })
    .catch(function(err){ 
    	console.log(err) 
    });