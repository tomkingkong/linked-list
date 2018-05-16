var websiteTitleInput = document.querySelector('.website-title-input');
var websiteUrlInput = document.querySelector('.website-url-input');

var addToList = document.querySelector('.submit');
var readButton = document.querySelector('.read-button');

var websiteTitle = document.querySelector('.website-title');
var websiteUrl = document.querySelector('.website-url');

var bookList = document.querySelector('.bookmark-section');
var bookmarkAmount = document.querySelector('h4');

var read = document.querySelector('.read');

var linkedList = [];
var totalBookmarks = linkedList.length;

var total = 0;


//total bookmark TODO:fix total bookmark update
$('h4').text('Bookmarks: ' + total);

function ListItem(title, url) {
  this.title = title;
  this.url = url;
  this.id = Date.now();
  this.isRead = false;
  //   if ($(this).hasClass('read') === true) {
  //     this.isRead = true;
  //   }
}

$(document).ready(function () {
  var listFromStorage = localStorage.getItem('list');
  if (listFromStorage !== null) {
    getListItemsAndAdd()
  }
});

$(window).on('storage', function () {
  getListItemsAndAdd();
});

$('form').on('submit', function (event) {
  event.preventDefault();
  addListToStorage();
  addItemToBookmarkList();
  clearForm();

  //increase total bookmarks
  // total++;
  // $('h4').text('Bookmarks: ' + total);
});

function addListToStorage() {
  var websiteTitleValue = websiteTitleInput.value;
  var websiteUrlValue = websiteUrlInput.value;
  var list = new ListItem(websiteTitleValue, websiteUrlValue);
  linkedList.push(list);
  var listItemsStringed = JSON.stringify(linkedList);
  localStorage.setItem('list', listItemsStringed);
}

function getListItemsAndAdd() {
  var listFromStorage = localStorage.getItem('list');
  var parsedList = JSON.parse(listFromStorage);
  linkedList = parsedList;
  linkedList.forEach(addItemToBookmarkList);
  $('h4').text('Bookmarks: ' + linkedList.length);

}

// addToList.addEventListener('click', function (event) {
//   event.preventDefault();
//   var websiteTitleValue = websiteTitleInput.value;
//   var websiteUrlValue = websiteUrlInput.value;
//   //create new list item with user arguments
//   var list = new ListItem(websiteTitleValue, websiteUrlValue);
//   // console.log(list);
//   //push new list item to linkedList array in DOM
//   linkedList.push(list);
//   //stringify and set linkedList array to localStorage
//   var listItemsStringed = JSON.stringify(linkedList);
//   localStorage.setItem('list', listItemsStringed);
//   //what he said
//   addArrayItemToBookmarkList();
//   clearForm();
//   //increase total bookmarks
//   total++;
//   $('h4').text('Bookmarks: ' + total);
// });


var clearForm = function () {
  websiteTitleInput.value = '';
  websiteUrlInput.value = '';
}

var addItemToBookmarkList = function () {
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

//event listener on delete button click
$('main').on('click', '.delete-button', function (event) {
  var thisObjId = this.id;

  //remove bookmark from page
  $(this).closest('article').remove('article');

  //return list
  var updatedList = linkedList.filter(function (obj) {
    return obj.id != thisObjId;
  });

  linkedList = updatedList;

  var listItemsStringed = JSON.stringify(linkedList);
  localStorage.setItem('list', listItemsStringed);

  total--;
  $('h4').text('Bookmarks: ' + total);
})


function findArrayIndex(array, attr, value) {
  for (var i = 0; i < linkedList.length; i += 1) {
    if (array[i][attr] === value) {
      console.log('yup');
      return i;
    }
  }
  console.log('nah');
  return -1;
}


//mark as read
$('main').on('click', '.read-button', function () {
  $(this).closest('article').toggleClass('read');
})


//TODO:add total read/unr ead bookmarks