
const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        //database Name
        // const databaseName='SmartCovid';
        const con = await mongoose.connect(`mongodb+srv://SmartClinic:root@atlascluster.d6hdzfg.mongodb.net/OneAppClinic`, { 
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    });
        console.log(`Database connected : ${con.connection.host}`)
    } catch (error) {
        console.error(`Error: ${error.message}`)
        process.exit(1)
    }
}

module.exports = connectDB;