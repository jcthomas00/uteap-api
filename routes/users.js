import express from 'express';
import { createRequire } from 'module';
import fetch from "node-fetch";

const require = createRequire(import.meta.url);
require('dotenv').config();

const router = express.Router();
let suffixRecord = '';

function dbInsert(suffix) {
    const { Client } = require('pg');
    const client = new Client({
        connectionString: process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false
        }
    });

    client.connect();
    const query = "INSERT INTO sitelogins(suffix,login_time) VALUES('" + suffix + "',current_timestamp);";
    client.query(query, (err, res) => {
        if (err) res.send("ERROR");
        client.end();
    });
}
router.get('/', (req, res) => {
    res.send("Only POST requests can be made.");
})

router.get('/therapist', (req, res) => {
    fetch('https://ghoapi.azureedge.net/api/MH_11')
        .then(response => response.json())
        .then(data => res.send(data));
})

router.post('/', (req, res) => {
    let loginDetails = "";

    //get input and return empty string if nothing was sent
    const userEntry = req.body.email ? req.body.email.toLowerCase() : '';
    if (userEntry === '') {
        res.send("");
    }

    //prep env variables by loading them into arrays
    const standardCompanies = process.env.standardCompanies.split(",");
    const validEmails = process.env.validEmails.split(",");

    //check which category the email falls under and set the proper login
    validEmails.some((email) => {
        if (userEntry.includes(email)) {
            loginDetails = email;
            suffixRecord = email;
            return false;
        }
    })
    if (loginDetails === "") {
        standardCompanies.some(function (company) {
            if (userEntry.includes(company)) {
                loginDetails = "standardCompany";
                suffixRecord = company;
                return false;
            }
        })
    }

    //return login info
    if (process.env[loginDetails]) {
        res.send(process.env[loginDetails])
        dbInsert(suffixRecord);
    } else {
        res.send("");
        dbInsert(userEntry);
    }
})

export default router;