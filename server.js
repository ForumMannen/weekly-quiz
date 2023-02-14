const mongoose = require("mongoose");
const { app } = require("./app");
require("dotenv").config();
const userName = process.env.NAME;
const password = process.env.PASSWORD;
const cluster = process.env.CLUSTER;

main().catch((err) => console.log(err));

async function main() {
  mongoose.set("strictQuery", true);
  let uri = `mongodb+srv://${userName}:${password}@${cluster}/?retryWrites=true&w=majority`;
  mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  const connection = mongoose.connection;
  connection.once("open", () => {
    console.log("MongoDB database connection established succesfully");
    app.listen(3000, () => console.log("Server is up and running..."));
  });
}
