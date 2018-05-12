



// methods to write

// isEmpty - will check to see if the node is empty
// size - will return the size of the list
// prepend - will append a node at the beginning of the list
// append - will append a node at the end of the list
// remove - will remove a node based on its value 
// contains -will check to see if a node contains a certain value (we will have to run this to check for a value to remove/change)
// print - this will jusrt print a list in a very simple format (once we get simple values to print we c an adjust formatting)


// first we need a constructor function for a linked list: this function will allow us to create a list from it/by calling it. 
// that way whatever methods we have attached to it we will be able to use with anything we create in our list 
// by using the "new" operator. ie `var list = new LinkedList();`


function linkedList() {

// we COULD add methods directly to the function here by using 'this.functionName() {and then defining the function here}'
// but a better way of doing it is by adding it to the .prototype. of the linkedList finction. 
// This is both because of convention and in the case where we wnt to create more than one list 
// it wont call the method everytime a new list is created, because of this we lose the ability to create 
// local/private variables (so the variables will be global) but we trade this for efficientcy.

// the linked list only has one property known to it, the head node: we define this by using the `this.head` property. 
// which points to the begining of the list. and since our list starts out empty we initialize it to null at first like so:

this.head = null;

}

// so lets create the isEmpty method which checks if the list has no node in it.
// lets use a function declaration here for clarity

linkedList.prototype.isEmpty = function() {

// all e have to do here is check to see if this.head is null. if it is, it returns true;
// otherwise, it will return false. so we will use a boolean if else statement.

if (this.head === null) {
  return true;
} else {
  return false;
}
};

// now lets create a size method to return the size of the list.
// this is the first time we will be traversing the entire list.


linkedList.prototype.size = function() {

  // in order to do this we want to create a counting variable [var count] and then count how many times we have a node 
  // whose this.head property isnt null. so if we have 3 nodes that "property line" (for lack of a better term) 
  // might look something like:

  // [this.head] => [this.head] => [this.head] => null

  // since we done want to change the value of this.head in any of the nodes we want to create
  // an intermediary variable [var current] that checks for the value of this.head

  var current = this.head;

  // lets set the count to initial value of 0

  var count = 0;

  // and then we can use a while loop to add 1 to the count variable everytime current(defined as "this.head") isnt null.

  while (current !== null) {
    count ++;
    current = current.next;
    
    // we could also do:
    // count = count + 1;

    }
  //and then we just want to return the value of count
  return count;
};


 // now lets do something usefull and add a node to the begining of the list with the prepend methof
 // there are three step to do this
 // 1. we want to create a new node object with some [data] value we pass it inside
 // 2. then we want to make this new node point to the current this.head
 // 3. then we want to update the this.head of the linkedList function to point to the node we just created.

 linkedList.prototype.prepend = function(someValue) {
  var newNode = {
    data: someValue,
    next: this.head
  };

  this.head = newNode;
 };

 // lets try it out before we get too far 

  // let create a list
  // this is how we create a new linked list. we call the constructor function and set it to a variable.


// var list = new linkedList();


  // then add some node objects to it with a simple value(s)


 // list.prepend(20);
 // list.prepend(10);


  // then show us its working

 // console.log(list);



 //now lets append something to the end of the list. 
 //this is similar to our size method because we are travering the length of the list
 //but instead of returning a value at the end we need to change its 'next' value from null
 // to the new node.

 linkedList.prototype.append = function(someValue) {

// first lets create a new node object
// and since itll be at the end of the list the next value should be set to null

var newNode = {
  data: someValue,
  next: null
}

// then like our counting method we need a temp variable to check the value of this.head of our current node

var current = this.head;

// and then use a boolean to check to see if the value of the current nodes NEXT value is null.

while (current.next !== null) {
  current = current.next;

}

// and then we want to set the value of that nodes next value to the value of the new node we just created. which is kinda confusing

current.next = newNode;

 };



 // before we can write a remove method we have to write a method to check to see if our nodes contain the data we want to remove. oy!

 //so lets do that now. its similar to the size method.

 linkedList.prototype.contains = function (someValue) {

var current = this.head;


//since we want to travel the whole list until we find someValue we write a while loop like this:

while (current != null){

if (current.data === someValue) {
  return true;
 }
// otherwise we check the next node for that value

current = current.next;

}

//and if we dont find that value we return false

return false;

}

// now we can use the .contains method in our next method to remove nodes
// and when we remove nodes all we are doing is just changing the value of 
// its 'next' property so that it points nowhere and will automatically revove it from the list


linkedList.prototype.remove = function (someValue){


if (!this.contains(someValue)) {
  return;
}

if (this.head.data === someValue) {
  this.head = this.head.next;
  return;
}

// in order to do this we have to keep track of the value of the previous nodes 'next' value
// so that we can chnge it to the node that we find the someValue data's 'next' value so that the node
// we find the data on has its next value set set to the previous nodes next value so that the previous 
// nodes next value isnt pointed to it. fuck thats complicated to write down in words.


var previousNode = null;
var currentNode = this.head;

while (currentNode.data !== someValue) {

previousNode = curentNode;
currentNode = currentNode.next;

}

// if all of those conditions are met and its has found someValue we swap the previousNodes next value with the currentNodes next value

previousNode.next = currentNode.next;


} ;


// now we need a function that will do something with all this data and put it on screen. 
//but for now we will just console.log the data to make sure it works

linkedList.prototype.print = function() {

// for now its just a string stored in a variable called output

var output = 'start ';

// we want to start with the data in the first node so:
var current = this.head;

 // make sure we arent at the end of the list:

while (current !== null) {

// then we will add the data to this empty string

  output += current.data;

    if (current.next !== null) {

    // if we know there is the next nodes next value isnt empty we can add a comma and a space or something

    output += ', ';



    }

// then we need to move on to the next node

current = current.next;

}


//once we reach the end of the list we can add some text and return the list data in the output valiable:


output += ' end';
console.log(output);


};

//lets try it out

// lets create a new list


// var list = new linkedList();

// // add some nodes

// list.append(100);
// list.append(200);
// list.append(300);
// list.append(400);
// list.prepend(50);

// // this one should be true
// console.log(list.contains(100));
// // this one should be false
// console.log(list.contains(70));

// // this one should return 5
// console.log(list.size());

// // this one should be false
// console.log(list.isEmpty());







































var websiteTitleInput = document.querySelector('#website-title-input');
var websiteUrlInput = document.querySelector('#website-url-input');
var enterButton = document.querySelector('button');
var readButton = document.querySelector('.read-button');
var deleteButton = document.querySelector('.del-button');
var websiteTitle = document.querySelector('.website-title');
var websiteUrl = document.querySelector('.website-url');
var sectionBlock = document.querySelector('section');

var bookmark = {
    bmTitle: "" ,
    bmUrl: ""
};

var bookmarkList = [bookmark];

enterButton.addEventListener('click', function() {

bookmark.bmTitle = websiteTitleInput.value;
bookmark.bmUrl = websiteUrlInput.value;

bookmarkList.push(bookmark);

for (var i = 1; i < bookmarkList.length; i++) {

  // var foo = bookmarkList[i]["bmTitle"];
  // var bar = bookmarkList[i]["bmUrl"];

  // bookmarkList.forEach.

  // bookmarkList.forEach(createBookmarkBlock(bookmarkList[i]["bmTitle"],bookmarkList[i]["bmUrl"]));

  bookmarkList.forEach(createBookmarkBlock(bookmark.bmTitle,bookmark.bmUrl));

}})


function createBookmarkBlock (titleString,url) {


var bookmarkBlockDiv = document.createElement('div');
bookmarkBlockDiv.classList.add("bookmark-block");
// bookmarkBlockDiv.id = index.Number;
// document.querySelector('#list-of-bookmarks').append(bookmarkBlockDiv);
document.querySelector('.list-of-bookmarks').appendChild(bookmarkBlockDiv);

var websiteTitleH2 = document.createElement('h2');
websiteTitleH2.classList.add("website-title");
websiteTitleH2.innerText = titleString;
document.querySelector('.bookmark-block').append(websiteTitleH2);

var websiteUrlPtag = document.createElement('p');
websiteUrlPtag.classList.add("website-url");
websiteUrlPtag.innerHTML = url;
document.querySelector('.bookmark-block').appendChild(websiteUrlPtag);

var readAndDelDiv = document.createElement('div');
readAndDelDiv.classList.add("read-and-del");
document.querySelector('.bookmark-block').appendChild(readAndDelDiv);

var readButtonH3tag = document.createElement('h3');
readButtonH3tag.classList.add("read-button");
readButtonH3tag.innerText = "Read";
document.querySelector('.read-and-del').appendChild(readButtonH3tag);

var delButtonH3tag = document.createElement('h3');
delButtonH3tag.classList.add("del-button");
delButtonH3tag.innerText = "Delete";
document.querySelector('.read-and-del').appendChild(delButtonH3tag);


}

section



