import chalk from 'chalk';
import express from 'express';
import connectDB from './config/db.config.js';
import userRoutes from './routes/user.routes.js';

const app = express();
const PORT = 3000

connectDB();

// Middleware
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/users', userRoutes);
// app.use('/api/teachers', teacherRoutes);


// Root route
app.get('/', (req, res) => {
    res.json({ message: "BACKEND SERVER IS RUNNING" });
});


app.listen(PORT, () => {
    console.log(chalk.bgCyan(`Server is running on port ${PORT}`));
});


// RESTAPI -> Add, Edit, Delete, Fetch-all,