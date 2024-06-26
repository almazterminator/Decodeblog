const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/Decodeblog').then(()=>{
    console.log('Connected to Mongo');
}).catch((e) => {
    console.log('Failed to connect');
})