UI developer test
=================
This test should validate your basic skill in using JS and designing RIA.

Introduction
------------
A hypothetical bookstore has developed a tiny CMS prototype to save information
about available books. You are the second developer of this application
and should improve it by rewriting and fixing mistakes made by your predecessor.

The application is simple enough, so in order to show your talents you are free
to change everything, add any new features, but not reducing abilities of the
original application.

Part 0 - Estimation
-------------------
Briefly (5-10 sentences) describe disadvantages of existing solution and
potential troubles. You may note errors, bad architecture decisions etc.

Part 1 - Refactoring
--------------------
Rewrite it using AngularJS (we prefer) or similar framework which is familiar
to you (describe your choice in last case).

Part 2 - Editing
----------------
A user should be able to click "Edit" and change the book in the same form
that was used for adding.

Part 3 - Validation
-------------------
For now you can enter any text/negative numbers as price or quantity while
adding new books. Please, make validation of user input.

Part 4 - Persistence (bonus)
----------------------------
Originally the prototype stores all books using simple array and JavaScript
objects. I.e. we lose all books after reloading page.

Please, implement persistent storage for entered books. It can be anything
you want - IndexedDB, external service, your custom solution based on any
framework and language.
