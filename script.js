var websiteTitleInput = document.querySelector('.website-title-input');
var websiteUrlInput = document.querySelector('.website-url-input');
var enterButton = document.querySelector('button');
var readButton = document.querySelector('.read-button');
var deleteButton = document.querySelector('.delete-button');
var websiteTitle = document.querySelector('.website-title');
var websiteUrl = document.querySelector('.website-url');

enterButton.addEventListener('click', function() {
  websiteTitle.innerText = websiteTitleInput.value;
  websiteUrl.innerText = websiteUrlInput.value;
});

$('button.read-button').on('click', function() {
  $(this)
    .closest('section')
    .toggleClass('read');
});

var inBookList = document.querySelector('.list-area');

function Node(data) {
  this.data = data;
  this.next = null;
}

function LinkedList() {
  this._length = 0;
  this.head = null;
}

LinkedList.prototype.add = function(value) {
  var node = new Node(value),
    currentNode = this.head;

    //first use case - empty list
    if(!currentNode) {
      this.head = node;
      this._length++;

      return node;
    }

    //second case - non empty list
    while (currentNode.next) {
      currentNode = currentNode.next;
    }
    this.length++;

    return node;
}

LinkedList.prototype.searchNodeAt = function(position) {
  var currentNode = this.head,
      length = this._length,
      count = 1,
      message = {failure: 'Failure: Node Does Not Exist In This List.'};

      //first case - invalid position
      if (length === 0) || position < 1 || position > length) {
        throw new Error(message.failure);
      }
      while (count < position) {
        currentNode = currentNode.next;
        count++;
      }
      return currentNode;
}

LinkedList.prototype.remove = function(position) {
  var currentNode = this.head,
      length = this._length,
      count = 0,
      message = {failure: 'Failure: Node Does Not Exist In This List.'},
      beforeNodeToDelete = null,
      nodeToDelete = null,
      deletedNode = null;

      //first case - invalid position
      if (position < 0 || position > length) {
        throw new Error(message.failure);
      }
      //second case - first node removed
      if (position === 1) {
        this.head = currentNode.next;
        deletedNode = currentNode;
        currentNode = null;
        this._length--;

        return deletedNode;
      }
      //third case - any other node removed
      while (count < position) {
        beforeNodeToDelete = currentNode;
        nodeToDelete = currentNode.next;
        count++;
      }
      beforeNodeToDelete.next = nodeToDelete.next;
      deletedNode = nodeToDelete;
      nodeToDelete = null;
      this._length--;

      return deletedNode;
}
