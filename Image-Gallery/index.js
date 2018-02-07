var express = require('express');
var superagent = require('superagent');
var consolidate = require('consolidate');

var app = express();

/*
 * Configure template engine
 */
app.engine('html', consolidate.handlebars);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

/* Set up a static folder with middleware */
app.use(express.static(__dirname + '/public'));

var url = 'https://api.giphy.com/v1/gifs/random?api_key=TDRCTI3YEJhUl5N7sIuaNFT2e8aca0OH&tag=boobs';

// /* Get Boobs url through giphy API */
// async function getBoobUrl() {
//     let url = 'https://api.giphy.com/v1/gifs/random?api_key=TDRCTI3YEJhUl5N7sIuaNFT2e8aca0OH&tag=boobs';
//     let result = await fetch(url);
//     let jsonResult = await result.json();
//     return jsonResult.data;
// }



/* Get '/' */
app.get('/', (request, response) => {
    superagent.get(url)
        .set({  Accept: 'application/json' })
        .end(function (e, res) {
            if (e) next(e);
            var url = res.body.data.image_url;
            console.log(res.body.data.image_url);
            return response.render('index', {url:url});
        });
});

app.listen(8797);