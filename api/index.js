const express = require("express")
const dotenv = require("dotenv")
const mongoose = require("mongoose")
const multer = require("multer")

const authRoute = require("./routes/auth")
const userRoute = require("./routes/users")
const postRoute = require("./routes/posts")
const catRoute = require("./routes/categories")

const app = express()

dotenv.config();

app.use(express.json());

mongoose.connect(process.env.MONGO_URL)
    .then(console.log("connected MongoDB"))
    .catch((err) => console.log(err));

    const storage = multer.diskStorage({
        destination: (req,file,cb)=>{
            cb(null,"images");
        },filename:(req,file,cb)=>{
            cb(null,req.body.name);
        },
    })

    const upload = multer({storage: storage})

    app.post("/api/upload", upload.single("file"),(req,res)=>{
        res.status(200).json("File has been uploaded.");
    })
    app.use("/api/auth", authRoute);
    app.use("/api/users", userRoute);
    app.use("/api/users", postRoute);
    app.use("/api/users", catRoute);

app.listen("5000", ()=> console.log("Backend is running"));
app.use("/",(req,res)=>{console.log("Hey this is main url")})