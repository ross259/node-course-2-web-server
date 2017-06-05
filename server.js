const express = require('express');
const hbs = require('hbs');
const fs = require('fs')

var app = express();

hbs.registerPartials(__dirname+'/views/partials')
app.set('view engine', 'hbs');

app.use((req, res, next)=>{
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err)=>{
        if (err){
            console.log('Unable to append to server.log.')
        }
    });
    next();
})

// MAINTENANCE PAGE
// app.use((req, res, next)=>{
//     res.render('maintenance.hbs', {
//         pageTitle:'Site Under Maintenance'
//     })
// })

app.use(express.static(__dirname+'/public'));

hbs.registerHelper('getCurrentYear', ()=>{
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text)=>{
    return text.toUpperCase();
});

app.get('/', (req, res)=>{
   // res.send('<h1>Hello Express.</h1>');
//    res.send({
//        name:"Ross",
//        likes:[
//            "Biking",
//            "Hiking",
//            "Eating",
//            "Gardening",
//            "Hearthstone"
//        ]
//    })
    res.render('home.hbs', {
        pageTitle:'Welcome',
        welcomeMessage:'Welcome to the page'
    })
});

app.get ('/about', (req, res)=>{
    //res.send('About Page');
    res.render('about.hbs', {
       pageTitle:'About Page'
    });
});

app.get ('/bad', (req, res)=>{
    res.send({
        errorMessage:"Error: Bad request."
    })
})

app.listen(3000, ()=>{
	console.log('Server running on port 3000');
});
