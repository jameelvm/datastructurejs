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
      if (this.count > 0) {
        this.items.splice(this.items.length - 1, 1);
        this.count = this.count - 1;
      }
      return this;
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
    size: function () {
      return this.length;
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
    size: function () {
      return this.length;
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
    size: function () {
      return this.length;
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
    differentSet: function (otherSet) {
      var difference = [];
      for (var i = 0; i < this.items.length; i++) {
        if (!otherSet.has(this.items[i])) {
          difference.push(this.items[i]);
        }
      }
      return difference;
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
  }
  Set.initialize.prototype = Set.prototype;
  global.Set = Set;
})(window);
