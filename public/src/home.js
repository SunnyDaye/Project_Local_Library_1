/********IMPORTS************/
let bookMethods = require('./books.js');

/***********Helpers**********/
function categoryCounter(array,category)
{
  let categories = array.reduce((acc = {},element) => {
    let property = element[category];
    (acc[property]) ? acc[property].count++ : acc[property] = {count: 1};
    return acc;
  },{});

  let categoryCounts = Object.values(categories);
  let keys =  Object.keys(categories);

  categoryCounts = categoryCounts.map((element,index) => {
    return {name: keys[index],...element};
  });

  return categoryCounts;
}

function totalBooksCount(books) {
  return books.length;
}

function totalAccountsCount(accounts) {
  return accounts.length;
}

function booksBorrowedCount(books) {
  let partedBooks = bookMethods.partitionBooksByBorrowedStatus(books);
  return partedBooks[0].length;
}



function getMostCommonGenres(books){
  //iterate through books and create an array of genres with counts

  let result = categoryCounter(books,"genre"); //My helper function. Defined at the top
  //sort
  result.sort((a,b) => b.count - a.count);

  //get top 5
  result.splice(5);

  return result;
}


function getMostPopularBooks(books) {
  //place holder for topFive
  let topFive = [];
  let max = 0;


  //iterate through the array and access borrows of each book
  books.forEach(book => {

    if(topFive.length < 5) //assume first five are top five
    {
      topFive.push({name: book.title , count: book.borrows.length});
      topFive.sort((a,b) => b.count - a.count); //sort so most popular is at the front
      max = topFive[0].count;
    }
    else if(book.borrows.length > topFive[4].count && book.borrows.length < max) //Place book if it belongs in the top five but not at the top
    {
      topFive.pop();
      topFive.push({name: book.title, count: book.borrows.length});
      topFive.sort((a,b) => b.count - a.count); //sort so most popular is at the front
      max = topFive[0].count;
    }
    else if(book.borrows.length > max){ //if we know the book is more popular than everything in our current topfive, just book the book at the top
      topFive.unshift(book);
      topFive.pop();
      max = topFive[0].count;
    }
  });

  return topFive;

}

function getMostPopularAuthors(books, authors) {
  let result = [{name:books[0].authorId , count: books[0].borrows.length}]; //initialize result


  for(let i = 1; i < books.length; i++) //look through books to find all books with a given author id and add their number of borrows
  {
    let authId = books[i].authorId;
    let index = result.findIndex(({authorId}) => authorId === authId)

    //See if author is already in our result. If so, add to count. If not, add the author and their initial count
    if(index === -1){
      let newObj = {name: authId, count: books[i].borrows.length};
      result.push(newObj);
    }
    else{
      result[index].count+=books[i].borrows.length;
    }
  }
  

  //Sort and get top five
  result.sort((a,b) => b.count - a.count);
  result.splice(5);
  

  //replace auhtor ids with author names
  result.forEach((element,index) =>{
    let {name: {first, last}} = authors.find(author => author.id === element.name);
    result[index].name = `${first} ${last}`;
  });
  
  return result;
  
}

module.exports = {
  totalBooksCount,
  totalAccountsCount,
  booksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
