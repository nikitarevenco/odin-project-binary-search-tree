class Node {
  constructor(data) {
    this.left = null;
    this.data = data;
    this.right = null;
  }
}

class Tree {
  constructor(array) {
    this.array = this.sortArray(array);
    this.root = this.buildTree(array, 0, array.length - 1);
  }
  sortArray(thisArray) {
    return [...Array.from(new Set(thisArray))].sort((a, b) => a - b);
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
  insert(value, currentNode = this.root) {
    // Until either the right or the left node is null
    if (currentNode.left === null || currentNode.right === null) {
      if (value > currentNode.data) {
        currentNode.right = new Node(value);
        return;
      }
      if (value < currentNode.data) {
        currentNode.left = new Node(value);
        return;
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
  // Works correctly
  getParent(value, currentNode = this.root) {
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
    // At this point we've found the most slightly above thingy.
    // Current node is nextBiggest, we want to return this Node to then DELETE it.
    return nextBiggest;
  }
  delete(value, currentNode = this.root) {
    // TRAVERSING
    if (value !== currentNode.data) {
      if (value > currentNode.data) {
        return this.delete(value, currentNode.right);
      }
      if (value < currentNode.data) {
        return this.delete(value, currentNode.left);
      }
    }
    // NULL / NULL
    if (currentNode.left === null && currentNode.right === null) {
      const parent = this.getParent(value);
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
    // NULL / *NODE*
    if (currentNode.left === null && currentNode.right !== null) {
      const parent = this.getParent(value);
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
    // *NODE* / NULL
    if (currentNode.left !== null && currentNode.right === null) {
      const parent = this.getParent(value);
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
    if (currentNode.left !== null && currentNode.right !== null) {
      const nextBiggestNode = this.findNextBiggest(currentNode);
      const removedNode = { ...currentNode };
      const value = nextBiggestNode.data;
      this.delete(value);
      currentNode.data = value;
      return removedNode;
    }
  }
}

function prettyPrint(node, prefix = "", isLeft = true) {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
}

const myTree = new Tree([
  1, 4, 7, 9, 11, 13, 14, 15, 18, 19, 20, 22, 24, 25, 27, 29, 31, 34, 35, 40,
  43, 44, 46, 49, 50, 51, 53,
]);

myTree.delete(11);

myTree.delete(19);
myTree.delete(25);
myTree.delete(7);
myTree.delete(1);
myTree.delete(43);
myTree.delete(49);
myTree.insert(16);
myTree.insert(26);

prettyPrint(myTree.root);
