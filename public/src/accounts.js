
/**********findAccountsById**********
 param: accounts- An array of account objects. An account looks like this:
        {
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
        id- the id associated with the account we are searching for

  return: account object 
  
*/
function findAccountById(accounts, idToMatch) {
  //iterate through the accounts array and search for matching id
  return accounts.find(({id}) => id === idToMatch); //returns element which is the object
}


/**********sortAccountsByLastName(accounts)**********
 param: accounts- An array of account objects.     
  return: An array of all of the accounts sorts by last name
*/
function sortAccountsByLastName(accounts) {
  return accounts.sort((a,b) => {
    let account = a.name.last.toLowerCase(); //Capitals affect unicode order
    let nextAccount = b.name.last.toLowerCase(); //When the keys are string, you can only access them wit strings
    return (account < nextAccount) ? -1 : 1;
  });
}


/**********numberOfBorrows(account, books)**********
 param: Account- just an account obj
        books- an array of all books. A book object looks like this:
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
  return: The number of books the account is borrowing
*/
function numberOfBorrows({id}, books) { //Access account id to compare by destructuring account
  //iterate through books array
  let result = books.reduce((acc,{borrows}) => {
    //check borrows array in book to see if id exist
    (borrows.some(user => user.id === id)) ? acc++ : acc+=0;
    return acc;
  },0);
  return result;
}


/**********getBooksPossessedByAccount(account, books, authors)**********
 param: account- an account object.     
        books- array of book objects
        authors- array of author objects. An author object looks like this:
          {
            id: 0,
            name: {
            first: "Lucia",
            last: "Moreno",
            },
          }
  return: An array of currently burrowed books by the account
*/
function getBooksPossessedByAccount({id}, books, authors) { 
  //Get array of books where the burrows prop has the account id and the return property is set to false
  let borrowed = books.filter(({borrows}) => {   
    return (borrows.some(user => { 
      return (user.id === id && !user.returned);
    }));
  });

  //Insert author objects from authors array into the book objects that we will return
  borrowed.forEach(element => {
    //access the authors array and iterate
    element.author = authors.find(author => author.id === element.authorId); 
  });

  //return array of books with author
  return borrowed;
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  numberOfBorrows,
  getBooksPossessedByAccount,
};
