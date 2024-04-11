const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
//Load Env
dotenv.config({path: './config.env'});

const app = express();

//Dev login
if(process.env.NODE_ENV == 'development'){
    app.use(morgan('dev'));
}
//Profile routes
app.use('/api/v2/profile', require('./routes/profile'));

// Handle production
if(process.env.NODE_ENV ==='production'){
    // Set Static
    app.use(express.static(__dirname + '/public/'));

    //Handle SPA
    app.get(/.*/, (req, res) => res.sendFile(__dirname + '/public/index.html'));
}


const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log(`Server running on port ${process.env.NODE_ENV} mode on port ${port}`);
});