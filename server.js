const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose');

dotenv.config();  // ✅ MUST BE FIRST

// Routes
const AppointmentRoutes = require('./routes/appointmentRoute');
const PatientRoutes = require('./routes/patientRoute');
const UserRoutes = require('./routes/userRoute');
const DoctorRoute = require('./routes/doctorRoutes.js');
const AdminRoute = require('./routes/adminRoute');
const Contact = require('./routes/contactUsRoute');



let isconnected=false ;
// 🔗 Connect Database (merged here)
const connectDB = async () => {
    try {
        const con = await mongoose.connect(
           process.env.MONGO_URI, {useNewUrlParser: true,
    useUnifiedTopology: true
    });

        console.log(`Database connected: ${con.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

// add middleware



// Call DB connection
// connectDB();


const app = express();

app.use((req,res,next) => {
   if(!isconnected){
    connectDB();
   }
   next();
})

// Middleware
app.use(express.static('upload'));
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/users', UserRoutes);
app.use('/api/appointment', AppointmentRoutes);
app.use('/api/patient', PatientRoutes);
app.use('/api/doctor', DoctorRoute);
app.use('/api/admin', AdminRoute);
app.use('/api/contact/', Contact);

// Port
// const PORT = process.env.PORT || 5000;

// // Start server
// app.listen(PORT, () => {
//   console.log(`App is running in ${process.env.NODE_ENV} mode on port ${PORT}`);
// });

module.exports=app