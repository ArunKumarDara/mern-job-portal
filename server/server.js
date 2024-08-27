const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();
const connectDb = require("./dbConfig/dbConfig");
const userRouter = require("./routes/userRouter");
const companyRouter = require("./routes/companyRouter");
const jobRouter = require("./routes/jobRouter");
const applicationRouter = require("./routes/applicationRouter");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};

app.use(cors(corsOptions));

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to the API!",
  });
});

app.use("/app/v1/user", userRouter);
app.use("/app/v1/company", companyRouter);
app.use("/app/v1/job", jobRouter);
app.use("/app/v1/application", applicationRouter);

const port = process.env.PORT || 3000;
app.listen(port, async () => {
  await connectDb();
  console.log(`Server is running on port ${port}`);
});
