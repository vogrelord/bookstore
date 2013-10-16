app = angular.module('books', [ "ngResource" ])
.filter('defaultImage', function(){
   return function(img){
     if(!img){
       return '/img/book-icon.png'; 
     }else{
        return '/img/covers/'+img;
     }
   };
})

function getDiscount(book){
    var discount = 0;
    //category discounts
    if (book.category == 'cookbook') 
      discount += book.price < 16 ? 1.5 : 3;
    else if (book.category == 'computers') 
      discount += book.quantity < 30 ? 0.5 : 1;
    else if (book.category == 'science') 
      discount += 0.5;

    //quantity discounts
    if (book.quantity > 50) 
      discount += 2;
    else if (book.quantity > 100)  
      discount += 5;
    return discount;
}


//add discount property and 
function processBook(book){
    book.discount = getDiscount(book)
}


function BookStoreCtrl($scope, $resource){

  var Book = $resource('/books/:id', {id:'@_id'},{update:{method:'PUT'}});
  

	$scope.book = {};
	$scope.search_query = '';
  var bookList = Book.query();

	$scope.visibleBooks = bookList;

	$scope.categories = {
		literature: "Literature",
        cookbook: "Cookbook",
        computers: "Computers",
        business: "Business",
        science: "Science",
        fantasy: "Sci-Fi and Fantasy"
    }

  $scope.init = function(){
    $scope.visibleBooks = bookList;
  }


  $scope.updateBooks = function(){
      query = $scope.search_query.toLowerCase();
      var matchBooks = $.grep(bookList, function (book) {
          return book.title.toLowerCase().indexOf(query) != -1;
      });
      $scope.visibleBooks = matchBooks;
  }

	$scope.saveBook = function(){
    processBook($scope.book)
    if($scope.book._id){
      angular.copy($scope.book, $scope.edited_book);
      $scope.edited_book.$update()
    }else{ 
      book = new Book($scope.book);
      book.$save()
      bookList.unshift($scope.book);
    }
		$scope.book = {};
	}

  $scope.edit = function(book){
    $scope.edited_book = book;
    angular.copy(book, $scope.book);
    document.body.scrollTop = 0;
  }

  $scope.cancelEdit = function(){
    $scope.book = {}
    document.body.scrollTop = 0;
  }

  $scope.delete = function(book){
      if(confirm('Are you sure?')){
        var globalIndex = bookList.indexOf(book);
        book.$delete()
        bookList.splice(globalIndex, 1);
      }
  }
  
}