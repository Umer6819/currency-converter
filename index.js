import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
const port=3000;
const app=express();
app.use(bodyParser.urlencoded({ extended: true }));
app.get("/",(req,res)=>{
    res.render("index.ejs");
});
app.post("/submit",async (req,res)=>{
    let to=req.body.to_currency;
    let from=req.body.from_currency;
    let amount=req.body.amount;
try
{
    const result=await axios.get(" https://v6.exchangerate-api.com/v6/3e9dca68bf22c877f7868746/pair/"+from+"/"+to+"/"+amount);
    res.render("result.ejs",{From:from,To:to,ConvertedAmount:result.data.conversion_result,Rate:result.data.conversion_rate,Amount:amount});
}
catch (error) {
    console.error("An error occurred while fetching the exchange rate:", error);
    res.render("error.ejs", { message: "Failed to retrieve exchange rate. Please try again later." });
}
});
app.get("/return",(req,res)=>{
    res.render("index.ejs");
});
app.listen(port,()=>{
    console.log(`Server is listening on port${port}`);
});