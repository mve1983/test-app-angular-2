import express from "express";
import path from "path";
import mongoose from "mongoose";
import dotenv from "dotenv";
import UserRoutes from "./routes/user.routes.js";

dotenv.config();

const server = express();

const PORT = process.env.PORT || 4000;
const dbUser = process.env.DB_USER;
const dbPw = process.env.DB_PW;
const dbHost = process.env.DB_HOST;
const dbName = process.env.DB_NAME;
mongoose.connect(
  `mongodb+srv://${dbUser}:${dbPw}@${dbHost}.${dbName}.mongodb.net/?retryWrites=true&w=majority&appName=quizgame`
);


server.use(express.json());
server.use(express.urlencoded({ extended: false }));

server.use("/api", UserRoutes);

server.use(express.static(path.join(process.cwd(), "./frontend/dist")));
server.get("/*", (_req, res) => {
  res.sendFile(path.join(process.cwd(), "./frontend/dist/", "index.html"));
});

server.listen(PORT, () => {
  console.log("Server is up and running on port " + PORT);
});
