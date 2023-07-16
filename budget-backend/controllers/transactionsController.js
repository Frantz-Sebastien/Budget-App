const express = require("express")
const transactions = express.Router()
const transactionsArray = require("../models/transaction.js")
const cors = require("cors")
const validateURL = (req, res, next) =>{
    console.log(
        "This function checks if the URL is legit"
    )
    next()
}

//INDEX
transactions.get("/",(req,res)=>{
    res.json(transactionsArray)
})

//SHOW
transactions.get("/:indexArr", (req,res)=>{
    if(transactionsArray[req.params.indexArr]){
        res.json(transactionsArray[req.params.indexArr])
    } else {
        res.status(404).json({ error: "Not Found" })
    }
})

//CREATE
transactions.post("/", validateURL, (req, res) =>{
    transactionsArray.push(req.body)
    res.json(transactionsArray[transactionsArray.length-1])
})

//DELETE
transactions.delete("/:indexArr", (req, res)=>{
    if(transactionsArray[req.params.indexArr]){
        const deletedTransaction = transactionsArray.splice(req.params.indexArr, 1)
        res.status(200).json(deletedTransaction)
    } else {
        res.status(404).json({ error: "No Transaction there" })
    }
})

//UPDATE
transactions.put("/:indexArr", validateURL, async(req,res)=>{
    if(transactionsArray[req.params.indexArr]){
        transactionsArray[req.params.indexArr] = req.body
        res.status(200).json(transactionsArray[req.params.indexArr])
    } else {
        res.status(404).json({ error: "No Transaction there" })
    }
})

module.exports = transactions