const express = require('express');
const app = express();
const authRoute = require('./routes/auth');

app.use('/api/user', authRoute)

app.listen(8000,()=>{
    console.log('Server started');
})