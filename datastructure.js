//Stack Datastructure

(function (global) {
  var Stack = function () {
    return new Stack.initialize();
  };

  Stack.prototype = {
    push: function (item) {
      if (arguments) {
        this.items.push(item);
        this.count = this.items.length;
      }
      return this;
    },
    pop: function () {
      var item;
      if (this.count > 0) {
         item = this.items.splice(this.items.length - 1, 1);
        this.count = this.count - 1;
      }
      return item;
    },
    peek: function () {
      var item = null;
      if (this.count > 0) {
        item = this.items[this.items.length - 1];
        return item;
      }
      return item;
    },
    clear: function () {
      this.items = [];
      this.count = 0;
      return this;
    },
    isEmpty: function () {
      var empty = this.items.length === 0;
      return empty;
    },
    size: function () {
      return this.items.length;
    }
  };
  Stack.initialize = function () {
    var self = this;
    this.items = [];
    this.count = 0;
  };
  Stack.initialize.prototype = Stack.prototype;
  global.Stack = Stack;

  /**
   * Example - Stack
   * var stack = new Stack()
   * stack.push(1);
   */

  /**
   * Queue Datastructure
   */
  var Queue = function () {
    return new Queue.initialize();
  };
  Queue.prototype = {
    enqueue: function (item) {
      this.items.push(item);
      return this;
    },
    dequeue: function () {
      //this.items.shift().Shift() method also used to remove first element from an array
      var item = this.items.splice(0, 1);
      return item[0];
    },
    front: function () {
      return this.items[0];
    },
    isEmpty: function () {
      return this.items.length === 0;
    },
    size: function () {
      return this.items.length;
    }
  };
  Queue.initialize = function () {
    var self = this;
    this.items = [];
  };

  Queue.initialize.prototype = Queue.prototype;
  global.Queue = Queue;

  /**
   * Priority Queue
   */
  var PriorityQueue = function () {
    return new PriorityQueue.initialize();
  };
  PriorityQueue.prototype = {
    enqueue: function (element, priority) {
      var QueueElement = function (element, priority) {
        this.element = element;
        this.priority = priority;
      };
      var queueElement = new QueueElement(element, priority);
      if (this.isEmpty()) {
        this.items.push(queueElement); // {2}
      } else {
        var added = false;
        for (var i = 0; i < this.items.length; i++) {
          if (queueElement.priority < this.items[i].priority) {
            this.items.splice(i, 0, queueElement); // {3}
            added = true;
            break; // {4}
          }
        }
        if (!added) {
          //{5}
          this.items.push(queueElement);
        }
      }
      return this;
    },
    dequeue: function () {
      //this.items.shift() method also used to remove first element from an array
      this.items.splice(0, 1);
      return this;
    },
    front: function () {
      return this.items[0];
    },
    isEmpty: function () {
      return this.items.length === 0;
    },
    size: function () {
      return this.items.length;
    }
  };

  PriorityQueue.initialize = function () {
    var self = this;
    this.items = [];
  };

  PriorityQueue.initialize.prototype = PriorityQueue.prototype;
  global.PriorityQueue = PriorityQueue;

  var LinkedList = function () {
    return new LinkedList.initialize();
  };
  LinkedList.prototype = {
    append: function (element) {
      var node = new this.Node(element);
      var current;
      if (this.head === null) {
        this.head = node;
      } else {
        current = this.head;
        while (current.next !== null) {
          current = current.next;
        }
        current.next = node;
      }
      this.length++;
      return this;
    },

    removeAt: function (position) {
      if (position > -1 && position < this.length) {
        if (this.length === 1) {
          this.head = null;
        } else {
          var index = 0;
          var current = this.head;
          var prev;
          while (index < position) {
            prev = current;
            current = current.next;
            index++;
          }
          prev.next = current.next;
          this.length--;
        }
      }

      return this;
    },
    insert: function (position, element) {
      if (position >= 0 && position <= this.length) {
        var node = new this.Node(element);
        if (position === 0) {
          node.next = this.head;
          this.head = node;
        } else {
          var index = 0;
          var current = this.head;
          var previous;
          while (index < position) {
            previous = current;
            current = current.next;
            index++;
          }
          node.next = current;
          previous.next = node;
        }
        this.length++;
      } else {
        console.error(
          "Unable to insert " + element + " at the position " + position
        );
      }
      return this;
    },
    indexOf: function (element) {
      var index = 0;
      var current = this.head;
      while (current) {
        if (current.element === element) {
          return index;
        }
        current = current.next;
        index++;
      }
      return -1;
    },
    remove: function (element) {
      var index = this.indexOf(element);
      return this.removeAt(index);
    },
    size: function () {
      return this.length;
    },
    isEmpty: function (element) {
      return this.length === 0;
    },
    getHead: function () {
      return this.head;
    },
    toString: function () {
      var current = this.head;
      var str = "";
      while (current) {
        str = str + current.element + " ";
        current = current.next;
      }
      return str;
    }
  };

  LinkedList.initialize = function () {
    this.Node = function (element) {
      this.element = element;
      this.next = null;
    };
    this.head = null;
    this.tail = null;
    this.length = 0;
  };

  LinkedList.initialize.prototype = LinkedList.prototype;
  global.LinkedList = LinkedList;

  var DoublyLinkedList = function () {
    return new DoublyLinkedList.initialize();
  };
  DoublyLinkedList.prototype = {
    //outbound check - position >=0   position<=length of the nodes
    //condition 1 - position ===0  -- head!==null and not
    //condition 2 - position ===length - to insert at the end of the list
    //Else iterate and insert at specified position
    removeAt: function (position) {
      if (position >= 0 && position <= this.length) {
        var current = this.head;
        var prev;

        if (position === 0) {
          this.head = current.next;
          if (this.length === 1) {
            this.tail = null;
          } else {
            this.head.prev = null;
          }
        } else if (position === this.length - 1) {
          prev = this.tail.prev;
          this.tail = prev;
          this.tail.next = null;
        } else {
          var index = 0;
          while (index++ < position) {
            prev = current;
            current = current.next;
          }
          prev.next = current.next;
          current.next.prev = prev;
        }
        index--;
      }
      return this;
    },
    insert: function (position, element) {
      if (position >= 0 && position <= this.length) {
        var node = new this.Node(element);
        var index = 0;
        var current = this.head;
        var prev;
        if (position === 0) {
          if (!this.head) {
            this.head = node;
            this.tail = node;
          } else {
            current.prev = node;
            node.next = current;
            this.head = node;
          }
        } else if (position === this.length) {
          current = this.tail;
          this.tail.next = node;
          node.prev = current;
          this.tail = node;
        } else {
          while (index < position) {
            prev = current;
            current = current.next;
            index++;
          }
          node.next = current;
          prev.next = node;
          current.prev = node;
          node.prev = prev;
        }
        this.length++;
      } else {
        console.error(
          "Unable to insert " + element + " at the  position " + position
        );
      }
      return this;
    },
    append: function (element) {
      var node = new this.Node(element);
      if (!this.head) {
        this.head = node;
        this.tail = node;
      } else {
        node.prev = this.tail;
        this.tail.next = node;
        this.tail = node;
      }
      this.length++;
      return this;
    },
    indexOf: function (element) {
      var index = 0;
      var current = this.head;
      while (current) {
        if (current.element === element) {
          return index;
        }
        current = current.next;
        index++;
      }
      return -1;
    },
    remove: function (element) {
      var index = this.indexOf(element);
      return this.removeAt(index);
    },
    size: function () {
      return this.length;
    },
    isEmpty: function (element) {
      return this.length === 0;
    },
    getHead: function () {
      return this.head;
    },
    getTail: function () {
      return this.tail;
    },
    toString: function () {
      var current = this.head;
      var str = "";
      while (current) {
        str = str + current.element + " ";
        current = current.next;
      }
      return str;
    }
  };
  DoublyLinkedList.initialize = function () {
    this.Node = function (element) {
      this.element = element;
      this.next = null;
      this.prev = null;
    };
    this.head = null;
    this.tail = null;
    this.length = 0;
  };
  DoublyLinkedList.initialize.prototype = DoublyLinkedList.prototype;
  global.DoublyLinkedList = DoublyLinkedList;

  var CircularLinkedList = function () {
    return new CircularLinkedList.initialize();
  };
  CircularLinkedList.prototype = {
    insert: function (position, element) {
      var node = new this.Node(element);
      var current = this.head;
      var prev;
      if (position >= 0 && position <= this.length) {
        if (position === 0) {
          if (!this.head) {
            this.head = node;
            this.tail = node;
          } else {
            node.next = current;
            current.prev = node;
            this.head = node;
          }
        } else if (position === this.length) {
          current = this.tail;
          current.next = node;
          node.prev = current;
          this.tail = node;
        } else {
          var index = 0;
          while (index < position) {
            prev = current;
            current = current.next;
            index++;
          }
          node.next = current;
          prev.next = node;
          current.prev = node;
          node.prev = prev;
        }
        //connecting head and tail each other to make it circular
        this.head.prev = this.tail;
        this.tail.next = this.head;
        this.index++;
      }
      return this;
    },
    removeAt: function (position) {
      if (position >= 0 && position <= this.length) {
        var current = this.head;
        var prev;

        if (position === 0) {
          this.head = current.next;
          if (this.length === 1) {
            this.tail = null;
          } else {
            this.head.prev = null;
          }
        } else if (position === this.length - 1) {
          prev = this.tail.prev;
          this.tail = prev;
          this.tail.next = null;
        } else {
          var index = 0;
          while (index++ < position) {
            prev = current;
            current = current.next;
          }
          prev.next = current.next;
          current.next.prev = prev;
        }
        this.head.prev = this.tail;
        this.tail.next = this.head;
        index--;
      }
      return this;
    },
    indexOf: function (element) {
      var index = 0;
      var current = this.head;
      while (current) {
        if (current.element === element) {
          return index;
        }
        current = current.next;
        index++;
      }
      return -1;
    },
    remove: function (element) {
      var index = this.indexOf(element);
      return this.removeAt(index);
    },
    size: function () {
      return this.length;
    },
    isEmpty: function (element) {
      return this.length === 0;
    },
    getHead: function () {
      return this.head;
    },
    getTail: function () {
      return this.tail;
    },
    toString: function () {
      var current = this.head;
      var str = "";
      while (current) {
        str = str + current.element + " ";
        current = current.next;
      }
      return str;
    }
  };

  CircularLinkedList.initialize = function () {
    this.Node = function (element) {
      this.element = element;
      this.next = null;
      this.prev = null;
    };
    this.head = null;
    this.tail = null;
    this.length = 0;
  };
  CircularLinkedList.initialize.prototype = CircularLinkedList.prototype;
  global.CircularLinkedList = CircularLinkedList;

  var Set = function () {
    return new Set.initialize();
  };
  Set.prototype = {
    add: function (value) {
      if (!this.has(value)) {
        this.items.push(value);
      }
      return this;
    },
    union: function (otherSet) {
      var union = [];
      for (var i = 0; i < this.items.length; i++) {
        if (!(union.indexOf(this.items[i]) > -1)) {
          union.push(this.items[i]);
        }
      }
      for (var i = 0; i < otherSet.items.length; i++) {
        if (!(union.indexOf(otherSet.items[i]) > -1)) {
          union.push(otherSet.items[i]);
        }
      }
      return union;
    },
    intersection: function (otherSet) {
      var intersectionSet = [];
      for (var i = 0; i < this.items.length; i++) {
        if (otherSet.has(this.items[i])) {
          intersectionSet.push(this.items[i]);
        }
      }
      return intersectionSet;
    },
    subset: function (otherSet) {
      if (this.size() > otherSet.size()) {
        return false;
      }
      for (var i = 0; i < this.items.length; i++) {
        if (!otherSet.has(this.items[i])) {
          return false;
        }
      }
      return true;
    },
    difference: function (otherSet) {
      var differentSet = [];
      for (var i = 0; i < this.items.length; i++) {
        if (!otherSet.has(this.items[i])) {
          differentSet.push(this.items[i]);
        }
      }
      return differentSet;
    },
    remove: function (value) {
      if (this.has(value)) {
        this.items.splice(this.items.indexOf(value), 1);
      }
      return this;
    },
    has: function (value) {
      for (var item = 0; item < this.items.length; item++) {
        if (this.items[item] === value) {
          return true;
        }
      }
      return false;
    },
    clear: function () {
      this.items = [];
    },
    size: function () {
      return this.items.length;
    },
    values: function () {
      return this.items;
    }
  };
  Set.initialize = function () {
    this.items = [];
  };
  Set.initialize.prototype = Set.prototype;
  global.Set = Set;

  var Dictionary = function () {
    return new Dictionary.initialize();
  };
  Dictionary.prototype = {
    add: function (key, value) {
      if (!this.has(key)) {

        this.items[key] = value;
      }
    },
    remove: function (key) {
      if (this.has(key)) {
        delete this.items[key];
        return true;
      }
      return false;
    },
    has: function (key) {
      var hasKey = key in this.items;
      return hasKey;
    },
    get: function (key) {
      return this.has(key) ? this.items[key] : undefined;
    },
    clear: function () {
      this.items = [];
    },
    size: function () {
      return this.items.length;
    },
    getKeys: function () {
      var allKeys = [];
      for (var item in this.items) {
        debugger;
        allKeys.push(item);
      }
      return allKeys;
    },
    getValues: function () {
      var allValues = [];
      for (var item in this.items) {
        allValues.push(this.items[item]);
      }
      return allValues;
    },
    getItems: function () {
      return this.items;
    }
  };
  Dictionary.initialize = function () {
    this.DictionaryItem = function (key, value) {
      this.key = key;
      this.value = value;
    };
    this.items = [];
  };
  Dictionary.initialize.prototype = Dictionary.prototype;
  global.Dictionary = Dictionary;

  var HashTable = function () {
    return new HashTable.initialize();
  };

  HashTable.prototype = {
    getHashCode: function (key) {
      var hash = 0;
      for (var i = 0; i < key.length; i++) {
        hash += key.charCodeAt(i) * i;
      }
      return hash;
    },
    add: function (key, value) {
      var keyHash = this.getHashCode(key);
      if (!this.table[keyHash]) {
        this.length++;
      }
      this.table[keyHash] = value;
    },
    remove: function (key) {
      delete this.table[this.getHashCode(key)];
    },
    get: function (key) {
      return this.table[this.getHashCode(key)];
    },
    size: function () {
      return this.length;
    },
    clear: function () {
      this.table = [];
    },
    containsKey: function (key) {
      var keyHash = this.getHashCode(key);
      if (this.table[keyHash]) {
        return true;
      }
      return false;
    },
    containsValue: function (value) {
      for (var prop in this.table) {
        if (this.table[prop] === value) {
          return true;
        }
      }
      return false;
    },
    values: function () {
      return this.table;
    }
  };
  HashTable.initialize = function () {
    this.table = [];
    this.length = 0;
  };
  HashTable.initialize.prototype = HashTable.prototype;
  global.HashTable = HashTable;

  var BinarySearchTree = function () {
    return new BinarySearchTree.initialize();
  };
  BinarySearchTree.prototype = {
    insertNode: function (newNode, node) {
      if (newNode.key < node.key) {
        //left node
        if (node.left === null) {
          node.left = newNode;
        } else {
          this.insertNode(newNode, node.left);
        }
      } else {
        if (node.right === null) {
          node.right = newNode;
        } else {
          this.insertNode(newNode, node.right);
        }
      }
    },
    insert: function (key) {
      var newNode = new this.Node(key);
      if (this.root === null) {
        this.root = newNode;
      } else {
        this.insertNode(newNode, this.root);
      }
      this.length++;
    }, //5,3,9
    inOrderTraverse: function (callback) {
      this.inOrderTraverseNode(this.root, callback);
    },
    inOrderTraverseNode: function (node, callback) {
      if (node !== null) {
        this.inOrderTraverseNode(node.left, callback);
        callback(node.key);
        this.inOrderTraverseNode(node.right, callback);
      }
    },
    preOrderTraverse: function (callback) {
      this.preOrderTraverseNode(this.root, callback);
    },
    preOrderTraverseNode: function (node, callback) {
      if (node !== null) {
        callback(node.key);
        this.preOrderTraverseNode(node.left, callback);
        this.preOrderTraverseNode(node.right, callback);
      }
    },
    postOrderTraverse: function (callback) {
      this.postOrderTraverseNode(this.root, callback);
    },
    postOrderTraverseNode: function (node, callback) {
      console.log(node, callback);
      if (node !== null) {
        this.postOrderTraverseNode(node.left, callback);
        this.postOrderTraverseNode(node.right, callback);
        callback(node.key);
      }
    },
    minNode: function (node) {
      if (node !== null) {
        while (node && node.left !== null) {
          node = node.left;
        }
        return node;
      } else {
        return null;
      }
    },
    min: function () {
      var minNode = this.minNode(this.root);
      if (minNode !== null) {
        return minNode.key;
      }
      return null;
    },
    maxNode: function (node) {
      if (node !== null) {
        while (node && node.right !== null) {
          node = node.right;
        }
        return node;
      } else {
        return null;
      }
    },
    max: function () {
      var maxNode = this.maxNode(this.root);
      if (maxNode !== null) {
        return maxNode.key;
      }
      return null;
    },
    search: function (key) {
      return this.searchNode(this.root, key);
    },
    searchNode: function (root, key) {
      var node = root;
      if (node === null) {
        return false;
      } else {
        if (key < node.key) {
          return this.searchNode(node.left, key);
        } else if (key > node.key) {
          return this.searchNode(node.right, key);
        } else {
          return true;
        }
      }
    },
    remove: function (key) {
      this.removeNode(this.root, key);
    },
    removeNode: function (node, key) {
      //condition 1 - check if node===null
      //condition 1 - key < node.key
      //Condition 2 - key > node.key
      //Condition 3
      //Condition 1  node.left==null && node.right===null
      //Condition 2 node.left==null
      //Condition 3 node.right===null
      //Condition  both nodes are not empty
      if (node === null) {
        return null;
      } else {
        if (key < node.key) {
          node.left = this.removeNode(node.left, key);
          return node;
        } else if (key > node.key) {
          node.right = this.removeNode(node.right, key);
          return node;
        } else {
          if (node.left === null && node.right === null) {
            node = null;
            return node;
          } else if (node.left === null) {
            node = node.right;
            return node;
          } else if (node.right === null) {
            node = node.left;
            return node;
          } else {
            var aux = this.minNode(node.right);
            node.key = aux.key;
            node.right = this.removeNode(node.right, aux.key);

            //approach2 ,by taking left max node
            // var aux1 = this.maxNode(node.left);
            // node.key = aux.key;
            //node.left=this.removeNode(node.left, aux.key);
            return node;
          }
        }
      }
    }
  };
  BinarySearchTree.initialize = function () {
    this.Node = function (key) {
      this.key = key;
      this.right = null;
      this.left = null;
    };
    this.root = null;
    this.length = 0;
  };
  BinarySearchTree.initialize.prototype = BinarySearchTree.prototype;
  global.BinarySearchTree = BinarySearchTree;

  var Graph = function () {
    return new Graph.initialize();
  };
  Graph.prototype = {
    addVertex: function (v) {
      this.vertices.push(v);
      this.adjList.add(v, []);
    },
    addEdge: function (v, w) {
      this.adjList.get(v).push(w);
      this.adjList.get(w).push(v);
    },
    toString: function () {
      var output = "";
      for (var i = 0; i < this.vertices.length; i++) {
        output = output + this.vertices[i] + " --> ";
        var neighbours = this.adjList.get(this.vertices[i]);
        for (var j = 0; j < neighbours.length; j++) {
          output = output + " " + neighbours[j];
        }
        output = output + "\n";
      }

      return output;
    },
    initializeColor: function () {
      var color = [];
      for (var i = 0; i < this.vertices.length; i++) {
        color[this.vertices[i]] = "white";
      }
      return color;
    },
    bfs: function (v, callback) {
      var colors = this.initializeColor();
      var queue = Queue();
      var distance = [];
      var predecessors = [];
      for (var i = 0; i < this.vertices.length; i++) {
        distance[this.vertices[i]] = 0;
        predecessors[this.vertices[i]] = null;

      }
      queue.enqueue(v);
      while (!queue.isEmpty()) {
        var u = queue.dequeue();
        var neighbours = this.adjList.get(u);
        colors[u] = "grey";
        for (var i = 0; i < neighbours.length; i++) {
          var w = neighbours[i];
          if (colors[w] === 'white') {
            distance[w] = distance[u] + 1;
            predecessors[w] = u;
            colors[w] = "grey";
            queue.enqueue(w);
          }
        }
        colors[u] = 'black';
        if (callback) {
          callback(u)
        }
      }
      return {
        distance: distance,
        predecessors: predecessors
      };
      debugger;
    }
  };
  Graph.initialize = function () {
    this.vertices = [];
    this.adjList = new Dictionary();
  };
  Graph.initialize.prototype = Graph.prototype;
  global.Graph = Graph;
})(window);
