function calculateDiscount(book) {
    // Special algorithm developed by sales department
    discount = 0
    if (book.category == 'cookbook') discount += book.price < 16 ? 1.5 : 3
    else if (book.category == 'computers') discount += book.quantity < 30 ? 0.5 : 1
    else if (book.category == 'science') discount += 0.5
    if (book.quantity > 50) discount += 2
    else if (book.quantity > 100)  discount += 5
    return discount
}

$(function () {
  var bookTemplate = (
    '<tr class="book">' +
      '<td class="row">' +
        '<div class="span2 text-center">' +
          '<img class="book-image" src="img/book-icon.png" width="128" alt="" />' +
          '<ul class="muted unstyled">' +
            '<li>Category: <span class="book-category"></span></li>' +
            '<li>In stock: <span class="book-quantity"></span></li>' +
          '</ul>' +
          '<button type="button" class="btn btn-danger btn-small book-delete">Delete</button>' +
          '&nbsp;<button type="button" class="btn btn-small book-edit">Edit</button>' +
        '</div>' +
        '<div class="span7">' +
          '<p><em class="book-author"></em></p>' +
          '<p><strong class="book-title"></strong></p>' +
          '<p class="book-description"></p>' +
        '</div>' +
      '</td>' +
      '<td>' +
        '<span class="book-old-price muted"></span> ' +
        '<big class="book-price"></big> ' +
        '<small class="book-discount">(discount <span class="book-discount-value"></span>)</small>' +
      '</td>' +
    '</tr>'
  );

  function makeBookElement(data, storage) {
      var element = $(bookTemplate);
      var imageUrl = data.image ? ('img/covers/' + data.image) : 'img/book-icon.png';
      element.find('.book-image').attr('src', imageUrl);
      element.find('.book-category').html(data.category);
      element.find('.book-quantity').html(data.quantity);
      element.find('.book-author').html(data.author);
      element.find('.book-title').html(data.title);
      element.find('.book-description').html(data.description);
      var discount = calculateDiscount(data);
      if (discount === 0) {
          element.find('.book-price').html(data.price + "$");
          element.find('.book-discount').hide();
          element.find('.book-old-price').hide();
      } else {
          var newPrice = data.price * (1 - discount/100);
          element.find('.book-price').html(newPrice.toFixed(2) + "$");
          element.find('.book-old-price').html(data.price.toFixed(2) + "$");
          element.find('.book-discount-value').html(discount + '%');
      }
      element.find('.book-delete').click(function () {
          element.remove();
          var globalIndex = bookList.indexOf(data);
          bookList.splice(globalIndex, 1);
      });
      return element;
  }

  function displayBooks(books, booksContainer) {
      var bookElements = $.map(books, makeBookElement);
      booksContainer.empty();
      $.each(bookElements, function (bookIndex, bookElement) {
          bookElement.appendTo(booksContainer);
      });
  }
  
  booksContainer = $('.books-container');
  displayBooks(bookList, booksContainer);

  var search = function (query) {
      query = query.toLowerCase();
      var matchBooks = $.grep(bookList, function (book) {
          return book.title.toLowerCase().indexOf(query) != -1;
      });
      displayBooks(matchBooks, booksContainer);
  };

  searchQueryInput = $('input.search-query');
  searchQueryInput.bind('keyup change', function () {
      search(this.value);
  }).trigger('change');

  $('form.new-book-form').submit(function (event) {
      event.preventDefault();
      var newBook = {
          title: $('#id_title').val(),
          description: $('#id_description').val(),
          author: $('#id_author').val(),
          category: $('#id_category').val(),
          quantity: parseInt($('#id_quantity').val()),
          price: eval($('#id_price').val())
      };
      this.reset();

      bookList.unshift(newBook);
      displayBooks(bookList, booksContainer);

      return false;
  });
});
