const express = require("express")
const app = express()
const userController = require("./controlers/users-controler")
const vacationController = require("./controlers/vication-controller")
const loginFilter = require("./helper/loginfilter")
const cors = require("cors");
const errorsHandeler = require("./errors/error-handler")


app.use(express.json())
app.use(loginFilter())
app.use(cors())
app.use("/users",userController);
app.use("/vacations",vacationController)
app.use(errorsHandeler)

app.listen(3001,()=>console.log("http://localhost:3001/users"))