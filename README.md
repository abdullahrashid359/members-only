# Members Only

Members Only is a private message board built with Node.js, Express, PostgreSQL, and Passport.js. Users can create accounts and post messages, while membership and admin roles provide additional privileges.

## Live Demo

**Live:** https://members-only.bonto.run/

## Features

* User registration with password hashing
* Local authentication using Passport.js
* Persistent PostgreSQL-backed sessions
* Create and view messages
* Membership system using a secret passcode
* Members can view message authors and timestamps
* Admin role with permission to delete messages
* Server-side validation and protected routes
* Responsive interface

## Built With

* Node.js
* Express
* PostgreSQL
* EJS
* Passport.js
* bcryptjs
* express-validator
* express-session
* connect-pg-simple

## What I Learned

This project helped me understand authentication and authorization in Express applications, including password hashing, Passport.js strategies, sessions, protected routes, role-based permissions, and storing sessions persistently in PostgreSQL.