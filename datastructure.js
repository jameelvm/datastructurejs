//Page 50
//Stack Datastructure

(function () {
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
    },
    size: function () {
      return this.length;
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
        return true;
      } else {
        return false;
      }
    },
    indexOf: function (element) {
      var index = 0;
      var current = this.head
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
      var str = '';
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
})();