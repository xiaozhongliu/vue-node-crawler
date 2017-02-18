const express = require('express');
const compress = require('compression');
const ejs = require('ejs-mate');
const config = require('./config')();

let app = express();
app.set('views', './dist/view');
app.set('view engine', 'html');
app.engine('html', ejs);
app.use(compress());
app.use(express.static('./dist'));

app.get('/', (req, res) => {
    res.render('index,html')
});

app.listen(config.APP_PORT);