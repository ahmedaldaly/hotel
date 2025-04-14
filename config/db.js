 const mongoose = require('mongoose');
 const conectDB = async()=>{
    try{
      await  mongoose.connect(process.env.db)
        .then(()=>console.log('db is connected'))
    }catch(err){
        console.log('db not connected')
    }
 }
 module.exports =conectDB