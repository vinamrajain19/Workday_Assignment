
const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoute');
const adminRoutes = require('./routes/adminRoute');
const trainRoutes = require('./routes/trainRoute');
const bookingRoutes = require('./routes/bookingRoutes')
const sequelize = require('./dbconfig/db');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use('/api/users', userRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/trains', trainRoutes);
app.use('/api/bookings', bookingRoutes);

sequelize.sync({ alter: true }).then(() => {
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
        console.log('Database connected.');
    });
}).catch(err => {
    console.error('Unable to connect to the database:', err);
});
