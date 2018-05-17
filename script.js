var websiteTitleInput = document.querySelector('.website-title-input');
var websiteUrlInput = document.querySelector('.website-url-input');

var addToList = document.querySelector('.submit');
var readButton = document.querySelector('.read-button');

var bookList = document.querySelector('.bookmark-section');

// var websiteTitleInput = $('.website-title-input');
// var websiteUrlInput = $('.website-url-input');
// var addToList = $('.submit');
// var readButton = $('.read-button');
// var bookList = $('.bookmark-section');

var linkedList = [];

$('.clear-read').on('click', clearAllRead);
$('main').on('click', '.read-button', isNowRead);
$('main').on('click', '.delete-button', deleteBookmark);

$(document).ready(function () {
  var listFromStorage = localStorage.getItem('list');
  if (listFromStorage !== null) {
    getListItemsAndAdd();
    updateTally();
  }
  updateTally();
});

$(window).on('storage', function () {
  getListItemsAndAdd();
});

$('form').on('submit', function (event) {
  event.preventDefault();
  if (validationProcess() === true) {
    addListToStorage();
    addItemToBookmarkList();
    clearForm();
    updateTally();
  } else {
    return false;
  }
});

function updateTally() {
  $('h4').text('Bookmarks: ' + linkedList.length);
  $('h5').text('Read: ' + $('.read').length);
  $('h6').text('Unread: ' + (parseInt(linkedList.length) - parseInt($('.read').length)));
}

function ListItem(title, url) {
  this.title = title;
  this.url = url;
  this.id = Date.now();
  this.isRead = false;
}


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
  updateTally();
}

var clearForm = function () {
  websiteTitleInput.value = '';
  websiteUrlInput.value = '';
};

var addItemToBookmarkList = function () {
  var bookmarkCard = '';
  for (var i = 0; i < linkedList.length; i++) {
    if (linkedList[i].isRead == true) {
      bookmarkCard += `<article class="bookmark-block read">
        <h2 class="website-title">${linkedList[i].title}</h2>
        <p class="website-url"><a target="_blank" href="${linkedList[i].url}">${linkedList[i].url}</a></p>
        <div class="read-and-delete">
          <button class="read-button readit" id="${linkedList[i].id}">Read</button>
          <button class="delete-button" id="${linkedList[i].id}">Delete</button>
        </div>
        </article>`;
    } else {
      bookmarkCard += `<article class="bookmark-block">
        <h2 class="website-title">${linkedList[i].title}</h2>
        <p class="website-url"><a target="_blank" href="${linkedList[i].url}">${linkedList[i].url}</a></p>
        <div class="read-and-delete">
          <button class="read-button readit" id="${linkedList[i].id}">Read</button>
          <button class="delete-button" id="${linkedList[i].id}">Delete</button>
        </div>
        </article>`;
    }
  }
  bookList.innerHTML = bookmarkCard;
};

function deleteBookmark() {
  var thisObjId = this.id;
  $(this).closest('article').remove('article');
  var updatedList = linkedList.filter(function (obj) {
    return obj.id != thisObjId;
  });
  linkedList = updatedList;
  var listItemsStringed = JSON.stringify(linkedList);
  localStorage.setItem('list', listItemsStringed);
  updateTally();
}

function isNowRead() {
  $(this).closest('article').toggleClass('read');
  var thisObjId = this.id;
  var itemUpdate = linkedList.find(function (obj) {
    if (obj.id == thisObjId) {
      obj.isRead = !obj.isRead;
      return obj;
    }
  });
  var updatedList = linkedList.filter(function (obj) {
    return obj.id != thisObjId;
  });
  linkedList = updatedList;
  linkedList.push(itemUpdate);
  var listItemsStringed = JSON.stringify(linkedList);
  localStorage.setItem('list', listItemsStringed);
  updateTally();
}

function clearAllRead() {
  var listFromStorage = JSON.parse(localStorage.getItem('list'));
  var unreadList = listFromStorage.filter(function (obj) {
    return obj.isRead == false;
  });
  $('.read').remove();
  linkedList = unreadList;
  var listItemsStringed = JSON.stringify(linkedList);
  localStorage.setItem('list', listItemsStringed);
  updateTally();
}

function validationProcess() {
  var theUrl = document.querySelector('.website-url-input').value;
  //this is not our code, but it works like a fucking charm
  var pattern = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
  if (websiteUrlInput.value === '' || websiteTitleInput.value === '') {
    alert('ERROR: Please enter Bookmark Information');
    return false;
  } else if (pattern.test(theUrl)) {
    return true;
  } else {
    alert('Url is not valid!');
    return false;
  }
}