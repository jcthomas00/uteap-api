# UTEAP Gated Access API

A NodeJS API that takes in an email arguement and returns login credentials based on a set of rules and environment variable set in .env.

[Hosted on Heroku](https://uteapgate.herokuapp.com/)

The app runs in Node and uses npm for package management. There is no front-end interface. It uses the following npm packages: 'express' for routing, 'body-parser' for imports, 'dotenv' to be able to use environment variables, and 'cors' to allow AJAX request initiated from a browser.

## Run This Locally

1. Clone this repo
2. Run `npm install` to get node_modules
3. Create `.env` file and define validEmails, standardCompanies and unique company logins
4. Run server `node index.js`
5. Send POST requests via Postman to http://localhost:5000/users with {"email":"email@example.com"} as JSON body to receive logins.

## Push to Heroku

1. Run git add, commit, and push commands to push to github
2. Run `heroku login` to get Heroku CLI access and login in browser
3. Lastly run `git push heroku main` and wait for compilation and deployment