import express from 'express';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
require('dotenv').config();

const router = express.Router();

router.get('/', (req,res)=>{
    res.send("Only POST requests can be made.");
})

router.post('/',(req,res)=>{
    let loginDetails = "";
    const userEntry = req.body.email ? req.body.email.toLowerCase():'';
    const standardCompanies = process.env.standardCompanies.split(",");
    const validEmails = process.env.validEmails.split(",");

    validEmails.some((email)=>{
        if (userEntry.includes(email)){
            loginDetails = email;
            return false;
        }
    })
    if(loginDetails===""){
        standardCompanies.some(function(company){
            if (userEntry.includes(company)){
                loginDetails = "standardCompany";
                return false;
            }
        })
    }
    if (process.env[loginDetails]){
        res.send(process.env[loginDetails])
    } else{
        res.send("");
    }
    
    console.log(`Input: ${userEntry} & uteapCompanies: ${loginDetails}`);
})

export default router;