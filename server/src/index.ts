import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import "reflect-metadata";
import { AppDataSource } from "@databases/data.source";
import router from "./routers/apiRouter";
import cors from "cors";
import cookieParser from "cookie-parser";
import session from "express-session";
dotenv.config();

const app: Express = express();
const port = process.env.PORT;
app.use(cookieParser())
app.use(cors({
  origin: "http://localhost:5173", // Cho phép frontend React truy cập
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true 
}));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
;
// parse application/json
app.use(bodyParser.json());

app.use(session({
  secret: process.env.SESSION_SECRET || '12321',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,
    httpOnly: true,
    maxAge: 15 * 60 * 1000 // 15 phút
  }
}));

AppDataSource.initialize().then(() => { 
  console.log('initialized')
}).catch((e) => {
console.log(e);
console.error('Error while connecting to the database')
process.exit(1)  // exit with error code 1 to indicate failure to connect to the database
});
app.use('/api/v1', router);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});