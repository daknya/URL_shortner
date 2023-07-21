// server set up  basic server

const express = require('express');
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser')
const shorturl = require('./model/shorturl');



mongoose.connect('mongodb://localhost/urlShortner', {
    useNewUrlParser: true, useUnifiedTopology: true
})
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: false }))
app.get('/', async (req, res) => {
    const shorturls = await shorturl.find()
    res.render('index', { shorturls: shorturls })

})

app.post('/shorturl', async (req, res) => {
    await shorturl.create({ full: req.body.fullurl })
    res.redirect('/');
})

app.get('/:shorurl', async (req, res) => {
    const shortUrl = await shorturl.findOne({ short: req.params.shorurl })
    if (shortUrl == null) return res.sendStatus(404)
    shortUrl.click++;
    shortUrl.save()
    res.redirect(shortUrl.full);

})
app.listen(process.env.PORT || 5000)