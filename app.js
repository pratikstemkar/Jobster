const axios = require('axios');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
const expressip = require('express-ip');
const path = require('path');
const handlebars = require('express3-handlebars');

app.engine('.hbs', handlebars({ extname: '.hbs' }));

app.set("PORT", PORT);

app.use(expressip().getIpInfoMiddleware);

app.use(express.static(path.join(__dirname, 'assets')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', '.hbs');

app.get('/', function (req, res) {
    res.render("index", {title:"Jobster"});
});

app.get('/search', function (req, res) {
    queries = req.query;
    let url = `https://indreed.herokuapp.com/api/jobs`;
    if (queries){
        axios.get(url, {
        params: queries
    })
    .then(function(response){
        res.render("search", { title: "Jobster", jobs: response.data});

    })
    .catch(function(error) {
        console.log(error);
    });
    }
    else {
        res.render("search", {title: "Jobster"})
    }


});

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
