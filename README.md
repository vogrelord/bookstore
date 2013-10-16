UI developer test answers


Part 0 - Estimation

This code has one major advantage - it works. Some potential bugs:

* in function calculateDiscount semicolons are omitted - in case of minification this will lead to errors
* on line 3 there is a global variable "discount". It can potentially be accessible later and mess up the logic.
* ternary operator ?: and multiple if-else conditions make the code non-readable. 
* template stored in js string is not a bad thing by itself, especially if it's made by coffeescript. But i would prefer storing it in some hidden <script type="text/template"/> element.
* I would prefer using some template engine like handlebars or ejs/underscore templates instead of manipulating DOM.


The new refactored app is available at this repo

The mongo db server is required to run this app.

to import existing books to the mongo use command:

mongoimport --collection books --db ipontest --file data/books.js --jsonArray
 
to run server go to the root and run 

npm install
node server

the page will be available at the http://localhost:3030
