const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config(); 
const bodyParser = require('body-parser');
const PORT = process.env.PORT;
const app = express();

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, auth-token");
    if (req.method === 'OPTIONS') {
        res.header("Access-Control-Allow-Methods", "PUT, POST, DELETE, GET");
        return res.status(200).json({});
    }
    next();
});

mongoose.connect(process.env.DB_CONNECT,{ useNewUrlParser: true },
    () => console.log('Connected to mongo'));

const auth = require('./routes/auth');
const posts = require('./routes/posts');

app.use(bodyParser.json());
app.use('/api/user',auth);
app.use('/api/posts', posts);

app.listen(PORT,() => {
    console.log(`Server started on port ${PORT}`);
})