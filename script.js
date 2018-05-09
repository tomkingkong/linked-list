var websiteTitleInput = document.querySelector('#website-title-input');
var websiteUrlInput = document.querySelector('#website-url-input');
var enterButton = document.querySelector('button');
var readButton = document.querySelector('#read-button');
var deleteButton = document.querySelector('#delete-button');
var websiteTitle = document.querySelector('#website-title');
var websiteUrl = document.querySelector('#website-url');

enterButton.addEventListener('click', function() {

websiteTitle.innerText = websiteTitleInput.value;
websiteUrl.innerText = websiteUrlInput.value;


})

