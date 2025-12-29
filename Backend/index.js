import express from 'express'
import dotenv from 'dotenv'
import connectDB from './database/db.js'
import userRoute from './routes/user.route.js'
import cookieParser from 'cookie-parser';
import messageRoute from './routes/message.route.js'
import cors from "cors";

dotenv.config({ quiet: true });
connectDB();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json())
app.use(cookieParser())
const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true
}
app.use(cors(corsOptions));

app.use("/api/user", userRoute)
app.use("/api/message", messageRoute)

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(PORT, () => {
    console.log(`Server listening at port ${PORT}`)
})