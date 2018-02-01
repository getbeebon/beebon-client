# beebon-client

## use

`````javascript

var BeebonClient = require('beebon-client');

var beebon = new BeebonClient({
    url: 'http://beebon.mobilon.ru',
    app: 'main'
});

beebon.log('main', {name: 'vasya', type: 'super'})
    .then(function(data){ 
        console.log(data) 
    })
    .catch(function(err){ 
        console.log(err) 
    });

`````