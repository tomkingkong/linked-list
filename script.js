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
var listItemsFromStorage = JSON.parse(localStorage.getItem('list'));
// console.log(listItemsFromStorage);
// console.log(listItemsFromStorage[0].title, listItemsFromStorage[0].url);

function ListItem(title, url) {
  this.title = title;
  this.url = url;
  this.id = Date.now();
  this.isRead = false;
  //   if ($(this).hasClass('read') === true) {
  //     this.isRead = true;
  //   }
}

addToList.addEventListener('click', validationProcess);

function validationProcess() {
  var theUrl = document.querySelector('.website-url-input').value;
  var pattern = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
  if (websiteUrlInput.value === '' || websiteTitleInput.value === '') {
    alert("ERROR: Please enter Bookmark Information");
  } else if (pattern.test(theUrl)) {
    createBookmarkProcess();
  } else {
    alert("Url is not valid!");
    return false;
  }
}

function validate() {
  var theUrl = document.querySelector('.website-url-input').value;
  var pattern = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
  if (pattern.test(theUrl)) {
    return true;
  } 
  alert("Url is not valid!");
  return false;
  
}

function createBookmarkProcess () {
  event.preventDefault();
  var websiteTitleValue = websiteTitleInput.value;
  var websiteUrlValue = websiteUrlInput.value;
  //create new list item with user arguments
  var list = new ListItem(websiteTitleValue, websiteUrlValue);
  // console.log(list);
  //push new list item to linkedList array in DOM
  linkedList.push(list);
  //stringify and set linkedList array to localStorage
  var listItemsStringed = JSON.stringify(linkedList);
  localStorage.setItem('list', listItemsStringed);
  //what he said
  formatArrayAddToBookarkList();
  clearForm();
};

var updateListDomPlusStorage = function () {
  var list = linkedList.push(list);
  var listItemsStringed = JSON.stringify(linkedList);
  localStorage.setItem('list', listItemsStringed);
}

var clearForm = function () {
  websiteTitleInput.value = '';
  websiteUrlInput.value = '';
}

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


//event listener on delete button click
$('main').on('click', '.delete-button', function (event) {
  var thisObjId = this.id;
  // console.log(thisObjId);
  //remove bookmark from page
  $(this).closest('article').remove('article');

  //return list
  var updatedList = linkedList.filter(function (obj) {
    return obj.id != thisObjId;
  });
  // console.log(updatedList);
  linkedList = updatedList;
  //stringify and set linkedList array to localStorage
  var listItemsStringed = JSON.stringify(linkedList);
  localStorage.setItem('list', listItemsStringed);
})

function checkId() {
  return
}

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

//total bookmark TODO:fix total bookmark update
var totalBookmarks = $(linkedList).length;
var total = 0;
$('h4').text('Total: ' + total);
$('.submit').on('click', function () {
  total++;
  $('h4').text('Total: ' + total);
})

$('main').on('click', '.delete-button', function () {
  total--;
  $('h4').text('Total: ' + total);
})

