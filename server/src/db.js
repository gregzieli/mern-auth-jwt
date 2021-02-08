import mongoose from "mongoose";

async function config() {
    mongoose.connection.once("open", () => console.log("db connected"));
    mongoose.connection.on("error", (err) => {
        console.error("Database connection error", err);
    });

    try {
        await mongoose.connect(process.env.DATABASE, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false,
        });
    } catch (error) {
        console.error("Database initialization error", error);
    }
}

export default { config };
