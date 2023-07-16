// DEPENDENCIES
const express = require("express")
const cors = require("cors")

// CONFIGURATION
const app = express()

//MIDDLEWARE
app.use(express.json())
app.use(cors())

app.use((req,res, next)=>{
    console.log("This runs whenever there's a request")
    next()
})

//ROUTES
app.get("/", (req,res)=>{
    res.send("We about to Budget this!")
});
const transactionsController = require("./controllers/transactionsController.js")
app.use("/transactions", transactionsController)

//404 PAGE
app.get("*", (req,res)=>{
    res.json({ error: "Transaction not found"})
})

//EXPORT
module.exports = app