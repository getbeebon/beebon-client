# beebon-client

## use

`````javascript

var BeebonClient = require('beebon-client');

var beebon = new BeebonClient({
	host: '192.168.1.23',
    collection: 'main'
});

beebon.send({name: 'vasya', type: 'super'})
    .then(function(data){ 
    	console.log(data) 
    })
    .catch(function(err){ 
    	console.log(err) 
    });

`````