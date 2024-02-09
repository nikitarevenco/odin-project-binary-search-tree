class Node {
  constructor(data) {
    this.left = null;
    this.data = data;
    this.right = null;
  }
}

class Tree {
  constructor(unsortedArray) {
    const array = this.sortArray(unsortedArray);
    this.root = this.buildTree(array, 0, array.length - 1);
  }
  reBalance() {
    this.root = this.buildTree(
      this.sortArray(this.inOrder()),
      0,
      this.sortArray(this.inOrder()).length - 1
    );
  }
  isBalanced(currentNode = this.root, result = true) {
    if (result === false) {
      return false;
    }
    if (currentNode === null) {
      return result;
    }
    let a = 0;
    let b = 0;
    if (currentNode.left !== null) {
      a = this.height(currentNode.left.data) + 1;
    }
    if (currentNode.right !== null) {
      b = this.height(currentNode.right.data) + 1;
    }
    const difference = Math.abs(a - b);
    if (difference > 1) {
      result = false;
    }
    const x = this.isBalanced(currentNode.left, result);
    const y = this.isBalanced(currentNode.right, result);
    if (x === false || y === false) {
      return false;
    }
    if (currentNode === this.root) {
      if (x === false || y === false) {
        return false;
      } else {
        return true;
      }
    } else {
      return result;
    }
  }
  sortArray(thisArray) {
    return [...Array.from(new Set(thisArray))].sort((a, b) => a - b);
  }
  depth(node) {
    let currentNode = this.root;
    let counter = 0;
    while (node !== currentNode.data) {
      if (node < currentNode.data) {
        currentNode = currentNode.left;
        counter++;
      }
      if (node > currentNode.data) {
        currentNode = currentNode.right;
        counter++;
      }
    }
    if (node === currentNode.data) {
      return counter;
    }
  }
  stepsFromAtoB(startNode, endNode, counter = 0) {
    if (startNode === endNode) {
      return counter;
    } else {
      if (startNode.data < endNode.data) {
        return this.stepsFromAtoB(startNode.right, endNode, ++counter);
      } else if (startNode.data > endNode.data) {
        return this.stepsFromAtoB(startNode.left, endNode, ++counter);
      }
    }
  }
  getLeaves(node, leavesArray = []) {
    if (node === null) {
      return;
    } else if (node !== null && node.left === null && node.right === null) {
      leavesArray.push(node);
      return;
    }
    this.getLeaves(node.left, leavesArray);
    this.getLeaves(node.right, leavesArray);
    return leavesArray;
  }
  height(node) {
    let leaves = this.getLeaves(this.find(node));
    if (leaves === undefined) {
      return 0;
    }
    leaves = leaves.map((leaf) => this.stepsFromAtoB(this.find(node), leaf));

    return leaves.reduce((a, b) => Math.max(a, b), -Infinity);
  }
  buildTree(array, start, end) {
    if (start > end) {
      return null;
    }
    const mid = parseInt((start + end) / 2);
    const value = new Node(array[mid]);
    value.left = this.buildTree(array, start, mid - 1);
    value.right = this.buildTree(array, mid + 1, end);
    return value;
  }
  preOrder(callback, currentNode = this.root, inOrderArray = []) {
    if (currentNode === null || callback) {
      return;
    }
    if (callback) {
      currentNode.data = callback(currentNode.data);
    }
    inOrderArray.push(currentNode.data);
    this.preOrder(callback, currentNode.left, inOrderArray);
    this.preOrder(callback, currentNode.right, inOrderArray);
    return inOrderArray;
  }
  inOrder(callback, currentNode = this.root, inOrderArray = []) {
    if (currentNode === null || callback) {
      return;
    }
    this.inOrder(callback, currentNode.left, inOrderArray);
    if (callback) {
      currentNode.data = callback(currentNode.data);
    }
    inOrderArray.push(currentNode.data);
    this.inOrder(callback, currentNode.right, inOrderArray);
    return inOrderArray;
  }
  postOrder(callback, currentNode = this.root, inOrderArray = []) {
    if (currentNode === null || callback) {
      return;
    }
    this.postOrder(callback, currentNode.left, inOrderArray);
    this.postOrder(callback, currentNode.right, inOrderArray);
    if (callback) {
      currentNode.data = callback(currentNode.data);
    }
    inOrderArray.push(currentNode.data);
    return inOrderArray;
  }
  levelOrder(callback) {
    const array = [this.root];
    const levelOrderArray = [this.root.data];
    while (array.at(0) !== undefined) {
      let rnNode = array.shift();

      if (callback) {
        rnNode.data = callback(rnNode.data);
      }

      if (rnNode.left !== null) {
        array.push(rnNode.left);
        levelOrderArray.push(rnNode.left.data);
      }
      if (rnNode.right !== null) {
        array.push(rnNode.right);
        levelOrderArray.push(rnNode.right.data);
      }
    }
    if (callback === undefined) {
      return levelOrderArray;
    }
  }
  insert(value, currentNode = this.root) {
    if (currentNode.left === null && currentNode.right === null) {
      if (value > currentNode.data) {
        currentNode.right = new Node(value);
        return;
      }
      if (value < currentNode.data) {
        currentNode.left = new Node(value);
        return;
      }
    } else if (currentNode.left === null && currentNode.right !== null) {
      if (value < currentNode.data) {
        currentNode.left = new Node(value);
      } else {
        return this.insert(value, currentNode.right);
      }
    } else if (currentNode.left !== null && currentNode.right === null) {
      if (value < currentNode.data) {
        return this.insert(value, currentNode.left);
      } else {
        currentNode.right = new Node(value);
      }
    } else {
      if (value > currentNode.data) {
        return this.insert(value, currentNode.right);
      }
      if (value < currentNode.data) {
        return this.insert(value, currentNode.left);
      }
    }
  }
  find(value) {
    let currentNode = this.root;
    while (currentNode.data !== value) {
      if (value > currentNode.data) {
        currentNode = currentNode.right;
      }
      if (value < currentNode.data) {
        currentNode = currentNode.left;
      }
    }
    return currentNode;
  }
  getParent(value, currentNode = this.root) {
    if (value === currentNode.data) {
      return currentNode;
    }
    if (currentNode.right !== null) {
      if (currentNode.right.data === value) {
        return currentNode;
      }
    }
    if (currentNode.left !== null) {
      if (currentNode.left.data === value) {
        return currentNode;
      }
    }
    if (value < currentNode.data) {
      return this.getParent(value, currentNode.left);
    }
    if (value > currentNode.data) {
      return this.getParent(value, currentNode.right);
    }
  }
  findNextBiggest(currentNode) {
    let nextBiggest = currentNode.right;
    while (nextBiggest.left !== null) {
      nextBiggest = nextBiggest.left;
    }
    return nextBiggest;
  }
  delete(value, currentNode = this.root) {
    const parent = this.getParent(value);
    const leftNodeIsNull = currentNode.left === null ? true : false;
    const rightNodeIsNull = currentNode.right === null ? true : false;
    // TRAVERSING
    if (value !== currentNode.data) {
      if (value > currentNode.data) {
        return this.delete(value, currentNode.right);
      }
      if (value < currentNode.data) {
        return this.delete(value, currentNode.left);
      }
    }
    if (leftNodeIsNull && rightNodeIsNull) {
      if (value < parent.data) {
        const removedNode = parent.left;
        parent.left = null;
        return removedNode;
      }
      if (value > parent.data) {
        const removedNode = parent.right;
        parent.right = null;
        return removedNode;
      }
    }
    if (leftNodeIsNull && !rightNodeIsNull) {
      const child = currentNode.right;
      if (parent.right.data === value) {
        const removedNode = parent.right;
        parent.right = child;
        return removedNode;
      }
      if (parent.left.data === value) {
        const removedNode = parent.left;
        parent.left = child;
        return removedNode;
      }
    }
    if (!leftNodeIsNull && rightNodeIsNull) {
      const child = currentNode.right;
      if (parent.right.data === value) {
        const removedNode = parent.right;
        parent.right = child;
        return removedNode;
      }
      if (parent.left.data === value) {
        const removedNode = parent.left;
        parent.left = child;
        return removedNode;
      }
    }
    if (!leftNodeIsNull && !rightNodeIsNull) {
      const nextBiggestNode = this.findNextBiggest(currentNode);
      const removedNode = { ...currentNode };
      const value = nextBiggestNode.data;
      this.delete(value);
      currentNode.data = value;
      return removedNode;
    }
  }
  prettyPrint(node = this.root, prefix = "", isLeft = true) {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      this.prettyPrint(
        node.right,
        `${prefix}${isLeft ? "│   " : "    "}`,
        false
      );
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  }
}

function treeTestStep1() {
  const array = [];
  for (let i = 0; i < 50; i++) {
    array.push(Math.floor(Math.random() * 51));
  }
  const myTree = new Tree(array);
  myTree.prettyPrint();
  console.log("IS IT BALANCED?", myTree.isBalanced());
  console.log("PREORDER: ", myTree.preOrder());
  console.log("INORDER: ", myTree.inOrder());
  console.log("POSTORDER: ", myTree.postOrder());
  return myTree;
}

function treeTestStep2(tree) {
  for (let i = 0; i < 100; i++) {
    tree.insert(Math.floor(Math.random() * 50));
  }
  tree.prettyPrint();
  console.log("IS IT BALANCED?", tree.isBalanced());
}

function treeTestStep3(tree) {
  tree.reBalance();
  tree.prettyPrint();
  console.log("IS IT BALANCED?", tree.isBalanced());
  console.log("PREORDER: ", tree.preOrder());
  console.log("INORDER: ", tree.inOrder());
  console.log("POSTORDER: ", tree.postOrder());
}

function tt() {
  const tree = treeTestStep1();
  treeTestStep2(tree);
  treeTestStep3(tree);
}

// const myTree = new Tree([
//   10, 13, 22, 37, 40, 45, 47, 48, 59, 65, 66, 68, 68, 71, 84, 88, 88, 89, 89,
//   89, 82, 38, 26, 78, 73, 10, 21, 81, 70, 80, 48, 65, 83, 100, 89, 50, 30, 20,
//   20, 15, 40, 33, 66, 10, 58, 33, 32, 75, 24, 36, 76, 56, 29, 35, 1, 1, 37, 54,
//   6, 39, 18, 80, 5, 43, 59, 32, 2, 66, 42, 58, 36, 12, 47, 83, 92, 1, 15, 100,
//   54, 13, 43, 85, 76, 69, 7, 69, 48, 4, 77, 53, 79, 16, 21, 100, 59, 24, 80, 14,
//   86, 49,
// ]);

// // myTree.insert(2);
// // console.log(
// //   myTree.sortArray()
// // );
// myTree.prettyPrint();
