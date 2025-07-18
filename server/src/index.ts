import 'dotenv/config'
import express from 'express'
import session from 'express-session';
import cookieParser from "cookie-parser";
import cors from 'cors'
import path from 'path';
import passport from "passport";
import authRoute from "./routes/auth"
import productCategoryRouter from './routes/productCategoryRoute'
import productRequirementRouter from './routes/productRequirementRoute'
import userRouter from './routes/userRoute'
import locationRouter from './routes/locationRoute';
import componentRouter from './routes/componentRoute';
import "./auth/local-strategy";

const app = express()

app.use(cors({
  origin: "http://localhost:5173", // 👈 your frontend URL
  credentials: true,              // 👈 allow cookies/sessions
}));
app.use(express.json())
app.use(cookieParser("helloworld"));
app.use(
  session({
    secret: "anson the dev",
    saveUninitialized: true,
    resave: false,
    cookie: {
      maxAge: 60000 * 60,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
  res.send('Hello Tony :)')
})



// Make the imageupload folder publicly accessible
// const test = path.join(process.cwd(), 'uploads')
// Make uploads folder accessible for serving static files
// Change this line
app.use('/uploads', express.static(path.join('src', 'uploads')))

app.use("/api/productCategory", productCategoryRouter)
app.use("/api/user", userRouter)
app.use("/api/auth", authRoute)
app.use("/api/productSellRequirement", productRequirementRouter)
app.use("/api/locations", locationRouter)
app.use("/api/components", componentRouter)

app.listen(process.env.PORT, () => {
  console.log(`Server is running http://localhost:${process.env.PORT}`)
})