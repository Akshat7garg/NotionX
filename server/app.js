import express from "express"
import cors from "cors"

const app = express();

app.use(cors({
    origin: ["https://notionx-sage.vercel.app", "http://localhost:5173"],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}));

app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({ extended: true, limit: '2mb' }));

// Importing routes
import userRoute from './routes/user.route.js'
import noteRoute from './routes/note.route.js'
import todoRoute from './routes/todo.route.js'

// Mounting routes
app.use('/api/v1/user', userRoute);
app.use('/api/v1/notes', noteRoute);
app.use('/api/v1/todos', todoRoute);

// Health check route (important for wake-up)
app.get('/api/ping', (req, res) => {
    console.log('Backend wakes up');
    res.status(200).json({message: 'Backend wakes up'});
})

// Global error handler
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal server error, try again!!!";
    res.status(statusCode).json({ message });
})

export { app };