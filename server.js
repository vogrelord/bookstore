var express = require('express'),
    restful = require('node-restful'),
    mongoose = restful.mongoose;
var app = express();

app.use(express.bodyParser());
app.use(express.query());
app.use(app.router);
app.use(express.static(__dirname));

mongoose.connect("mongodb://localhost/ipontest");


function calculateDiscount(book) {
    // Special algorithm developed by sales department
    discount = 0;
    if (book.category == 'cookbook') discount += book.price < 16 ? 1.5 : 3
    else if (book.category == 'computers') discount += book.quantity < 30 ? 0.5 : 1
    else if (book.category == 'science') discount += 0.5
    if (book.quantity > 50) discount += 2
    else if (book.quantity > 100)  discount += 5
    return discount;
}

var Book = app.book = restful.model('book', mongoose.Schema({
    title: 'string',
    description: 'string',
    author: 'string',
    category: 'string',
    image: 'string',
    quantity: 'number',
    price: 'number',
    discount: 'number'
  }))
  .methods(['get', 'post', 'put', 'delete']);


Book.after('get', function(req, res, next) {
  for(var i=0; i<res.locals.bundle.length; i++){
      var book =  res.locals.bundle[i];
      book.discount = calculateDiscount(book);
      console.log([book, book.discount])
  }
  next(); // Don't forget to call next!
});

Book.register(app, '/books');


app.get('/', function(req,res){
	res.sendfile('index-ang.html');
})

app.listen(3030);