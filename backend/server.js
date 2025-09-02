import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js'
import noteRoutes from './Routes/noteRoutes.js';
import { connectDB } from './config/database.js';
import rateLimiter from "./middleware/rateLimiter.js";


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// if (process.env.NODE_ENV !== "production") {
//   app.use(
//     cors({
//       origin: "http://localhost:5173",
//     })
//   );
// }
app.use(express.json());
app.use(rateLimiter);

app.use('/api/auth', authRoutes);
app.use("/api/notes", noteRoutes);

// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(path.join(__dirname, "../frontend/dist")));

//   app.get("*", (req, res) => {
//     res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
//   });
// }

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch((error) => {
  console.error("Failed to connect to the database", error);
  process.exit(1);
});

