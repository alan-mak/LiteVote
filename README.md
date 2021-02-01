LiteVote. 
=========

## About

  - This application uses Jquery, an Express Server and the MailGun API to facilitate group decision making
  - Weighing each option using ranked choice voting, users may create, share and complete surveys.

  - Note: This application uses the MailGun API. If you wish to run it on a new machine it will need local access to API keys and SMTP credentials. 



## Getting Started

1. Create the `.env` by using `.env.example` as a reference: `cp .env.example .env`
2. Update the .env file with your correct local information 
  - username: `labber` 
  - password: `labber` 
  - database: `midterm`
3. Install dependencies: `npm i`
4. Fix to binaries for sass: `npm rebuild node-sass`
5. Reset database: `npm run db:reset`
  - Check the db folder to see what gets created and seeded in the SDB
7. Run the server: `npm run local`
  - Note: nodemon is used, so you should not have to restart your server
8. Visit `http://localhost:8080/`


## Dependencies

- Node 10.x or above
- NPM 5.x or above
- PG 6.x
- body.parser 1.19 or above
- MailGun
- Jquery 3.5.1 or above
- Express 4.17.1 or above



