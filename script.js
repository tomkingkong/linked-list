var websiteTitleInput = document.querySelector('.website-title-input');
var websiteUrlInput = document.querySelector('.website-url-input');
var addToList = document.querySelector('.submit');
var readButton = document.querySelector('.read-button');

var websiteTitle = document.querySelector('.website-title');
var websiteUrl = document.querySelector('.website-url');
var bookList = document.querySelector('.bookmark-section');
var read = document.querySelector('.read');
var linkedList = [];
var listItemsFromStorage = JSON.parse(localStorage.getItem('list'));
// console.log(listItemsFromStorage);
// console.log(listItemsFromStorage[0].title, listItemsFromStorage[0].url);

function ListItem(title, url) {
  this.title = title;
  this.url = url;
  this.id = Date.now();
  // this.isRead = false;
  // if (read === true) {
  //   this.isRead = true;
  // }
}

// $('button.read-button').on('click', function () {
//   $(this)
//     .closest('article')
//     .toggleClass('read');
// });

addToList.addEventListener('click', function () {
  event.preventDefault();
  var websiteTitleValue = websiteTitleInput.value;
  var websiteUrlValue = websiteUrlInput.value;
  //create new list item with user arguments
  var list = new ListItem(websiteTitleValue, websiteUrlValue);
  // console.log(list);

  //push new list item to linkedList array in DOM
  linkedList.push(list);
  // console.log(linkedList);

  //stringify and set linkedList array to localStorage
  var listItemsStringed = JSON.stringify(linkedList);
  // console.log(listItemsStringed);
  localStorage.setItem('list', listItemsStringed);

  //what he said
  formatArrayAddToBookarkList();
});


var formatArrayAddToBookarkList = function () {
  var bookmarkCard = '';
  for (var i = 0; i < linkedList.length; i++) {
    bookmarkCard += (`<article class="bookmark-block">
<h2 class="website-title">${linkedList[i].title}</h2>
<p class="website-url"><a href="${linkedList[i].url}">${linkedList[i].url}</a></p>
<div class="read-and-delete">
  <button class="read-button" id="read">Read</button>
  <button class="delete-button" id="${linkedList[i].id}">Delete</button>
</div>
</article>`);
    bookList.innerHTML = bookmarkCard;
  }
}
// var deleteButton = document.querySelector('.delete-button');
// deleteButton.addEventListener('click', deleteBookmark);

// var deleteBookmark = function () {
//   deleteButton = document.querySelector('.delete-button');
//   console.log('hey you deleted');
// }



$("main").on("click", ".delete-button", function () {
  console.log('you did it');
})

























// function Node(data) {
//   this.data = data;
//   this.next = null;
// }

// function LinkedList() {
//   this._length = 0;
//   this.head = null;
// }

// LinkedList.prototype.add = function(value) {
//   var node = new Node(value),
//     currentNode = this.head;

//     //first use case - empty list
//     if(!currentNode) {
//       this.head = node;
//       this._length++;

//       return node;
//     }

//     //second case - non empty list
//     while (currentNode.next) {
//       currentNode = currentNode.next;
//     }
//     this.length++;

//     return node;
// }

// LinkedList.prototype.searchNodeAt = function(position) {
//   var currentNode = this.head,
//       length = this._length,
//       count = 1,
//       message = {failure: 'Failure: Node Does Not Exist In This List.'};

//       //first case - invalid position
//       if (length === 0 || position < 1 || position > length) {
//         throw new Error(message.failure);
//       }
//       while (count < position) {
//         currentNode = currentNode.next;
//         count++;
//       }
//       return currentNode;
// }

// LinkedList.prototype.remove = function(position) {
//   var currentNode = this.head,
//       length = this._length,
//       count = 0,
//       message = {failure: 'Failure: Node Does Not Exist In This List.'},
//       beforeNodeToDelete = null,
//       nodeToDelete = null,
//       deletedNode = null;

//       //first case - invalid position
//       if (position < 0 || position > length) {
//         throw new Error(message.failure);
//       }
//       //second case - first node removed
//       if (position === 1) {
//         this.head = currentNode.next;
//         deletedNode = currentNode;
//         currentNode = null;
//         this._length--;

//         return deletedNode;
//       }
//       //third case - any other node removed
//       while (count < position) {
//         beforeNodeToDelete = currentNode;
//         nodeToDelete = currentNode.next;
//         count++;
//       }
//       beforeNodeToDelete.next = nodeToDelete.next;
//       deletedNode = nodeToDelete;
//       nodeToDelete = null;
//       this._length--;

//       return deletedNode;
// }