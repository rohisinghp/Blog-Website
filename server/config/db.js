const mongoose = require('mongoose')


const connectionDB = async () => {

    try{
        mongoose.set('strictQuery', false)
        const conn =await mongoose.connect(process.env.MONGODB_URI);

        console.log(`DataBase Connected to ${conn.connection.port}`);

    }catch(e){
        console.log(e);
    }
}

module.exports = connectionDB;