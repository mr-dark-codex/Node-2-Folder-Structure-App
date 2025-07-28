import chalk from 'chalk';
import express from 'express';
import session from 'express-session';
import cookieParser from 'cookie-parser';

import connectDB from './config/db.config.js';
import userRoutes from './routes/user.routes.js';
import nodemailer from 'nodemailer';
import ejs from 'ejs'
import path from 'path'
import { fileURLToPath } from 'url';
import User from './models/user.models.js';

// ✅ Manual __filename and __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000

connectDB();

// Middleware
app.use(express.json());
app.use(cookieParser());

// app.use(express.urlencoded({ extended: true }));
// app.use(session({
//     secret: 'secret_key', // 🔐 Use env in real app
//     resave: false,
//     saveUninitialized: true,
//     cookie: { secure: false }, // Set true if using HTTPS
// }))


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


app.post('/signup', async (req, res) => {
    const { email, password } = req.body;
    console.log(req.body);


    const user = await User.create({
        email, password
    })

    await user.save();

    res.json({ message: "User created successfully" });

})


app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    console.log(req.body);

    // Basic validation
    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }

    // Simple email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ message: "Invalid email format" });
    }

    // Optional: check password length or complexity
    if (password.length < 6) {
        return res.status(400).json({ message: "Password must be at least 6 characters long" });
    }

    // Check if user exists
    const user = await User.findOne({ email });

    if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
    }

    // Compare plain-text passwords (not secure, but as per your setup)
    const result = user.password === password;

    if (result) {
        req.session.user = { email: user.email };
        res.json({ message: "User logged in successfully" });
    } else {
        res.status(401).json({ message: "Invalid credentials" });
    }
});



// 👉 Protected Route
app.get('/dashboard', isAuthenticated, (req, res) => {
    res.send(`Welcome to your dashboard`);
});

// Middlware Function 
function isAuthenticated(req, res, next) {
    if (req.session.user != null) {
        next();
    }
    else {
        res.status(401).json({ message: "Unauthorized" });
    }
}


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