import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import notificationRoutes from './routes/notifications.js';
import signupRoutes from "./routes/signup.js";
import loginRoutes from "./routes/login.js";
import profileRoutes from "./routes/profile.js";
import movieRoutes from "./routes/movie.js";

dotenv.config();

const app = express();
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());

// MongoDB connection using .env variable
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("Connected to MongoDB"))
.catch((err) => console.error("MongoDB connection error:", err));

// Routes
app.use("/api/notifications", notificationRoutes);
app.use("/api/signup", signupRoutes);
app.use("/api/login", loginRoutes);
app.use("/profile", profileRoutes);
app.use("/movie", movieRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
