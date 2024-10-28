import express from "express";
import readline from "readline";
import bodyParser from "body-parser";
import { config } from "dotenv";
import path from "path";
import OpenAI from "openai";
import cors from "cors";
import session from "express-session";
import cookieParser from "cookie-parser";

import userRouter from "./src/features/user/user.routes.js";
import jwtAuth from "./src/middleware/jwtAuth.js";
import { connectUsingMongoose } from "./src/config/mongooseConfig.js";

config();

const app = express();
const port = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.set("views", path.resolve("src", "views"));

app.use(bodyParser.json());
app.use(cors());

// setup cookie parser
app.use(cookieParser());
// setup session
app.use(
  session({
    secret: "my secret",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // This is the default and can be omitted
});

async function fetchData(prompt) {
  const result = await openai.chat.completions.create({
    messages: [{ role: "user", content: prompt }],
    model: "gpt-3.5-turbo",
  });
  console.log("Result:", result.choices[0].message.content);
  return result.choices[0].message.content;
}

// fetchData("hello,what day is today");
app.post("/", async (req, res) => {
  try {
    const prompt = req.body.prompt;
    console.log(prompt);
    let result;
    fetchData(prompt)
      .then((resultData) => {
        result = resultData;
        return fetchData(
          resultData +
            "So can you give me some medications/prcautions for it or its is necessary for me to visit doctor"
        );
      })
      .then((med) => {
        console.log("Result:", result);
        console.log("Med:", med);
        res.send({ result: result, med: med });
      })
      .catch((error) => {
        console.error("Error:", error);
        res.status(500).send({ error: "Internal Server Error" });
      });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

app.get("/profile", jwtAuth, (req, res) => {
  res.send("Profile Page");
});

//Routes
app.use("/api/users", userRouter);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
  connectUsingMongoose();
});
