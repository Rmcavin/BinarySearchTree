//Pretty Print
//Insertion
//Search
//Find Min
//Find Max
//Remove

//Tree Constructor
function BinarySearchTree(root) {
  //if root is supplied
  if (root) {
    this.root = root;
  //if root will be added later
  } else {
    this.root = null;
  }
}
//Node Constructor
function Node(val) {
  this.val = val;
  this.left = null;
  this.right = null;
}

//Binary Search Tree Methods
BinarySearchTree.prototype.insert = function(val) {
  //if there is not yet a root node
  if (!this.root) {
    this.root = new Node(val);
    return this;
  }
  let currentNode = this.root
    while (true) {
      //if val is bigger go right
      if (val > currentNode.val) {
        //if there is a right keep going
        if (currentNode.right) {
          currentNode = currentNode.right;
        }
        //if there isn't put val there
        else if (!currentNode.right) {
          currentNode.right = new Node(val);
          break;
        }
      }
      //if val is smaller go left
      else if (val < currentNode.val) {
        //if there is a left keep going
        if (currentNode.left) {
          currentNode = currentNode.left
        }
        //if there isn't put val there
        else if (!currentNode.left) {
          currentNode.left = new Node(val);
          break;
        }
      }
      else if (val === currentNode.val) {
        return 'No duplicate values!'
      }
    }
  return this;
}


BinarySearchTree.prototype.search = function(num, currentNode) {

  currentNode = currentNode || this.root;

  //base case
  if (currentNode.val === num) {
    return currentNode;
  }
  else {
    //if num is larger than the current value, go right
    if (num > currentNode.val) {
      if (currentNode.right) {
        return this.search(num, currentNode.right)
      }
      else {
        return 'Node not found.'
      }
    }
    //if num is smaller than the current value, go left
    else {
      if (num < currentNode.val) {
        if (currentNode.left) {
          return this.search(num, currentNode.left)
        }
        else {
          return 'Node not found.'
        }
      }
    }
  }
}

BinarySearchTree.prototype.findMin = function(currentNode) {

currentNode = currentNode || this.root;
  //base case
  if (!currentNode.left) {
    return currentNode;
  }
  //keep going recursively
  else {
    return this.findMin(currentNode.left);
  }
}

BinarySearchTree.prototype.findMax = function(currentNode) {

  currentNode = currentNode || this.root;
  //base case
  if (!currentNode.right) {
    return currentNode;
  }
  else {
    return this.findMax(currentNode.right);
  }
}

BinarySearchTree.prototype.remove = function(num) {
  //search for target, get node
  let targetNode = this.search(num);
  //search for parent, get node
  let parentNode = this.getParent(num);

  //make sure the node exists
  if (targetNode === 'Node not found.') {
    return 'Node not found.';
  }
  //if the node has two children
  else if (targetNode.left && targetNode.right) {
    //which side is our target node on?
    let targetSide = parentNode.left.val === targetNode.val ? 'left' : 'right';
    //replace it with the min on the right side to keep the tree balanced
    let replacement = this.findMin(targetNode.right);
    //get the parent of replacement and find the side replacement is on
    let replacementParent = this.getParent(replacement.val);
    let replacementSide = replacementParent.left.val === replacement.val ? 'left' : 'right';
    //remove reference replacement
    replacementParent[replacementSide] = null;
    //replace the replacement with its right child
    if (replacement.right && replacementParent.right) {
      replacementParent[replacementSide] = replacement.right;
      replacement.right = null;
    }
    //append the parent to the right side of replacement
    if (replacementParent !== 'Node not found.' && replacementParent.val !== targetNode.val){
      replacement.right = replacementParent;
    }
    //skip over the target node
    replacement.left = targetNode.left;
    //put the replacement under the parent
    parentNode[targetSide] = replacement;
    return this;
  }

  //if the node has one child
  else if (targetNode.left || targetNode.right) {
    //which side is our target node on?
    let targetSide = parentNode.left.val === targetNode.val ? 'left' : 'right';
    //if the one child is left
    if (targetNode.left) {
      parentNode[targetSide] = targetNode.left;
      return this;
    }
    //if the one child is right
    else {
      parentNode[targetSide] = targetNode.right;
      return this;
    }
  }
  //if the node has no children
  else {
    //remove the child on the proper side
    parentNode.val < num ? parentNode.right = null : parentNode.left = null;
    return this;
  }
}

BinarySearchTree.prototype.getParent = function(num, currentNode) {
  currentNode = currentNode || this.root;

  //if there is a left node
  if (currentNode.left && num < currentNode.val) {
    //and that left node is num (base case)
    if (currentNode.left.val === num) {
      return currentNode;
    }
    //go to the next node
    else {
      return this.getParent(num, currentNode.left)
    }
  }
  //if there is a right node
  else if (currentNode.right && num > currentNode.val) {
    //and that right node is num (base case)
    if (currentNode.right.val === num) {
      return currentNode;
    }
    //go to the next node
    else {
      return this.getParent(num, currentNode.right)
    }
  }
  //no node found :(
    else {
      return 'Parent node not found.'
    }
  }

//let myTree = new BinarySearchTree( new Node(5) );
let myTree = new BinarySearchTree()
myTree.insert(10).insert(100).insert(50).insert(101).insert(4).insert(5).insert(102).insert(45).insert(70).insert(55).insert(80).insert(60)
//myTree.insert(40).insert(23).insert(5).insert(32).insert(12).insert(37)

//console.log(JSON.stringify(myTree, ' ', 2));

//console.log(myTree.findMin());

//console.log(myTree.findMax());

//console.log(myTree.search(5));

//console.log(myTree.getParent(99));

//myTree.getParent(5)
console.log('tree before remove', JSON.stringify(myTree, ' ', 2));

console.log(JSON.stringify(myTree.remove(50), ' ', 2));
