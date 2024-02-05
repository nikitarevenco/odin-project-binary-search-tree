class Node {
  constructor(leftChild, data, rightChild) {
    this.leftChild = leftChild;
    this.data = data;
    this.rightChild = rightChild;
  }
}

class Tree {
  constructor(array, root) {
    this.root = root;
    this.buildTree(array);
  }

  buildTree(array) {
    const sortedArray = array.sort((a, b) => a - b);
    const midpoint = Math.ceil(sortedArray.length / 2);
  }
}

const prettyPrint = (node, prefix = "", isLeft = true) => {
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
};

const myTree = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
