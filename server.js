const express = require("express");
const app = express();
const mongoose = require("mongoose");
const questionsRouter = require("./routers/questions/questions.router");
const playersRouter = require("./routers/players/players.router");
const loginRouter = require("./routers/login/login.router");
const logoutRouter = require("./routers/logout/logout.router");


app.use(express.json());

app.use("/api/questions", questionsRouter);

app.use("/api/players", playersRouter);

app.use("/api/login", loginRouter);

app.use("/api/logout", logoutRouter);

const connectToDb = async () => {
    try {
        await mongoose.connect ('mongodb://127.0.0.1:27017/weeklyquiz', { useNewUrlParser: true });
        console.log('Succesfully connected to DB');
    } catch (err) {
        console.log(`Error connecting to MongoDB: ${err}`)
    }
}
// async function connectToDb(){
//     mongoose.set("strictQuery", true);
//     await mongoose.connect("mongodb://127.0.0.1:27017/weeklyquiz");
//     console.log("connected to db");
// }
connectToDb();

app.listen(3000, () => console.log("Server is up and running..."));