import chalk from 'chalk';
import express from 'express';
import connectDB from './config/db.config.js';
import userRoutes from './routes/user.routes.js';
import nodemailer from 'nodemailer';
import ejs from 'ejs'
import path from 'path'
import { fileURLToPath } from 'url';

// ✅ Manual __filename and __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000

connectDB();

// Middleware
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


// Routes
app.use('/api/users', userRoutes);
// app.use('/api/teachers', teacherRoutes);


// Nodemailer Transport
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: 'darkcodm123@gmail.com',
        pass: 'qpti jcsh gxyn phyw', // use App Password if using Gmail
    },
});

// Root route
app.get('/', (req, res) => {
    console.log(__dirname);
    res.json({ message: "BACKEND SERVER IS RUNNING" });
});


app.get('/send-mail', async (req, res) => {
    try {


        // how to send mail!
        await transporter.sendMail({
            from: 'darkcodm123@gmail.com',
            to: 'pritisil76@gmail.com',
            subject: 'Testing mail',
            // text: 'This is a test mail from backend server',
            html: '<h1>This is a test mail from backend server</h1>'
        })

        res.json({ message: "Mail sent successfully" });

    } catch (error) {
        res.json({ message: "Error while sending mail" });
    }
})

app.get('/send-mail2', async (req, res) => {
    try {

        let name = "Priti Sil";
        let message = "Hey kochi!"


        const htmlContent = await ejs.renderFile(path.join(__dirname, 'views', 'sample.ejs'), { name, message });

        // how to send mail!
        await transporter.sendMail({
            from: 'darkcodm123@gmail.com',
            to: 'pritisil76@gmail.com',
            subject: 'Testing mail',
            // text: 'This is a test mail from backend server',
            // html: '<h1>This is a test mail from backend server</h1>'
            html: htmlContent
        })

        res.json({ message: "Mail sent successfully" });

    } catch (error) {
        res.json({ message: "Error while sending mail" });
    }
})



app.listen(PORT, () => {
    // console.log(__dirname);
    // console.log(__filename);
    console.log(path.join(__dirname, 'views'))
    console.log(chalk.bgCyan(`Server is running on port ${PORT}`));
});


// RESTAPI -> Add, Edit, Delete, Fetch-all,