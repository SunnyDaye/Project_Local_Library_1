/*****IMPORTS */
let accountMethods = require('./accounts.js');

/**********findAuthorById(authors, id)**********
 param: authors- array of author objects. An author object looks like this:
          {
            id: 0,
            name: {
            first: "Lucia",
            last: "Moreno",
            },
          }
        id - an integer representing an authorId
  return: the author object that contains the matching id
*/
function findAuthorById(authors, idToMatch) {
  //Access the authors array to get id from athor object
  return authors.find(({id}) => id === idToMatch);
}


/**********findBooksById(books, id)**********
 param: books- an array of all books. A book object looks like this:
        {
          "id": "5f4471327864ee880caf5afc",
          "title": "reprehenderit quis laboris adipisicing et",
          "genre": "Poetry",
          "authorId": 20,
          "borrows": [
          {
            "id": "5f446f2e2a4fcd687493a775",
            "returned": false
          },
          {
            "id": "5f446f2ebe8314bcec531cc5",
            "returned": true
          },
          {
            "id": "5f446f2ea508b6a99c3e42c6",
            "returned": true
          }
          ]
        }
        id - a string representing the id to match
  return: The number of books the account is borrowing
*/
function findBookById(books, idToMatch) {
  return books.find(({id}) => id === idToMatch);
}

function partitionBooksByBorrowedStatus(books) {
  let borrowedPart = books.filter(({borrows}) => !borrows[0].returned);//returned status of the first transaction is false
  let returnedPart = books.filter(({borrows}) => borrows[0].returned);//returned status of the first transaction is true
  return [borrowedPart,returnedPart];
}


/**********getBorrowersForBook(book, accounts)**********
 *  params: book- book to access transaction information
 *          accounts- an array of account objects.
 *            {
                "id": "5f446f2ecfaf0310387c9603",
                "name": {
                  "first": "Esther",
                 "last": "Tucker"
                },
                "picture": "https://api.adorable.io/avatars/75/esther.tucker@zillacon.me",
                "age": 25,
                "company": "ZILLACON",
                "email": "esther.tucker@zillacon.me",
                "registered": "Thursday, May 28, 2015 2:51 PM"
              }      
 *  return: An array of all transaction objects including the associated account properties
 */
function getBorrowersForBook(book, accounts) {
  //Access the borrows array and the contents inside
  let borrowers = [...book.borrows]; //
  borrowers.forEach((transactions,index) => {
    let accountInfo = accountMethods.findAccountById(accounts,transactions.id);
    borrowers[index] = {...transactions,...accountInfo};
  });
  borrowers.splice(10);
  return borrowers;
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
