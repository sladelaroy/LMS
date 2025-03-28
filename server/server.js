import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/mongodb.js";
import { clerkWebHooks, stripeWebhooks } from "./controllers/webhooks.js";
import educatorRouter from "./routes/educatorRoutes.js";
import { clerkMiddleware } from "@clerk/express";
import connectCloudinary from "./config/cloudinary.js";
import courseRouter from "./routes/courseRouter.js";
import userRouter from "./routes/userRouter.js";

const app = express();

await connectDB();
await connectCloudinary();

const allowedOrigins = process.env.CORS_ORIGIN?.split(",") || ["*"]; // Default to all if not specified

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true, // Allow cookies, authentication headers
};

app.use(cors(corsOptions));
app.use(clerkMiddleware());

app.get("/", (req, res) => {
  res.send("APi working");
});

app.post("/clerk", express.json(), clerkWebHooks);
app.use("/api/educator", express.json(), educatorRouter);
app.use("/api/course", express.json(), courseRouter);
app.use("/api/user", express.json(), userRouter);
app.post('/stripe', express.raw({type: 'application/json'}), stripeWebhooks)

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
