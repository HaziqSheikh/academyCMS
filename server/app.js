const express=require("express");
const app = express();
const authRouter=require("./Routers/authRouter/auth");
const usersRouter=require("./Routers/usersRouter/users");
const queryRouter=require("./Routers/queryRouter/queryRouter");
const courseRouter=require("./Routers/coursesRouter/coursesRouter");
const noticesRouter=require("./Routers/NoticesRouter/NoticesRouter")
const salesRouter= require("./Routers/salesRouter/salesRouter")
const connection=require("../server/dbconn");
app.use(express.json());
app.use("/api",authRouter);
app.use("/api",usersRouter);
app.use("/api",queryRouter);
app.use("/api",courseRouter);
app.use("/api",noticesRouter);
app.use("/api",salesRouter);

app.listen(4000, () => {
    console.log("Server is working continously");
  });
  connection();