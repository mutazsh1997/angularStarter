const expressApp = require('express');
const bodyParse = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');

const routerPosts = require('./router/posts');
const routerAuth = require('./router/auths');

const app = expressApp();
app.use(bodyParse.json())

app.use("/images", expressApp.static(path.join(__dirname, "images")));
app.use("/", expressApp.static(path.join(__dirname, "angular")));

mongoose.connect('mongodb://localhost:27017/blogApp', { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log('contenting succeeded');
}).catch((err) => {
    console.log('there is an error ' + err);
});
//DeprecationWarning: collection.ensureIndex is deprecated. Use createIndexes instead. 
//after this line err is gone
mongoose.set('useCreateIndex', true)


app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.setHeader("Access-Control-Allow-Methods",
        "GET,POST,PATCH,PUT,DELETE,OPTIONS");
    next();
});
app.use('/api/posts', routerPosts);
app.use('/api/auth', routerAuth);
app.use((req, res, next) => {
    res.sendFile(path.join(__dirname, "angular", "index.html"))
})
module.exports = app;