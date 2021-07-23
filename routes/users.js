import express from 'express';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
require('dotenv').config();

const router = express.Router();

async function dbInsert() {
    const { Client } = require('pg');
    var test = '';
    const client = new Client({
        connectionString: process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false
        }
    });

    client.connect();

    client.query("INSERT INTO sitelogins(suffix,login_time) VALUES('cog2',current_timestamp);", (err, res) => {
        if (err) res.send("ERROR");;
        for (let row of res.rows) {
            test += JSON.stringify(row);
        }
        client.end();
    });
    return test;
}
router.get('/', (req, res) => {
    dbInsert().then((test) => res.send("Only POST requests can be made. Test2: " + test));

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
            return false;
        }
    })
    if (loginDetails === "") {
        standardCompanies.some(function (company) {
            if (userEntry.includes(company)) {
                loginDetails = "standardCompany";
                return false;
            }
        })
    }

    //return login info
    if (process.env[loginDetails]) {
        res.send(process.env[loginDetails])
    } else {
        res.send("");
    }
})

export default router;