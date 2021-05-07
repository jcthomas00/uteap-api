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

    //get input and return empty string if nothing was sent
    const userEntry = req.body.email ? req.body.email.toLowerCase():'';
    if (userEntry===''){
        res.send("");
    }

    //prep env variables by loading them into arrays
    const standardCompanies = process.env.standardCompanies.split(",");
    const validEmails = process.env.validEmails.split(",");

    //check which category the email falls under and set the proper login
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

    //return login info
    if (process.env[loginDetails]){
        res.send(process.env[loginDetails])
    } else{
        res.send("");
    }
})

export default router;