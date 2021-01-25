import mongoose from "mongoose";

async function config() {
  const db = mongoose.connection;

  db.on("error", console.error.bind(console, "connection error:"));
  db.once("open", () => console.log("db connected"));

  return mongoose.connect(process.env.DATABASE, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  });
}

export default { config };
