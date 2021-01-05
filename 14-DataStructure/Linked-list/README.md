# 链表(linked-list)

## 介绍

链表是一组节点组成的集合，每个节点都使用一个对象的引用来指向它的后一个节点。指向另一节点的引用叫做链。

```
|header|next| ---> |data1|next| ---> |data2|next| ---> |data3|next| ---> null
```

## 设计链表

链表包含两个类, 一个是 Node 类, 来表示节点的数据; 一个是 LinkedList 类, 提供插入节点、删除节点等操作.

### Node 类

```
function Node(ele) {
  this.ele = ele
  this.next = null
}
```

### LinkedList 类

```
function LList () {
  this.head = new Node('head')  // 头节点
  this.find = find              // 查找节点
  this.insert = insert          // 插入节点
  this.remove = remove          // 删除节点
  this.findPrev = findPrev      // 查找前一个节点
  this.display = display        // 显示节点
}

```

#### 查找节点

```
function find (item) {
  var currentNode = this.head
  while(currentNode.value != item) {
    currentNode = currentNode.next
  }
  return currentNode
}
```

#### 插入节点

```
function insert(newEle, item) {
  var newNode = new Node(newEle)
  var currentNode = this.find(item)
  newNode.next = currentNode.next
  currentNode.next = newNode
}
```

## 链表的一些操作

#### 打印链表

```
function showList (list) {
  let node = list.head
  while(node) {
    console.log(node.value)
    node = node.next
  }
}
```

#### 逆序打印链表

```
function showReverseList(list) {
  let node = list.head,
      stack = []
  while(node) {
    stack.push(node.value)
    node = node.next
  }
  for(let len = stack.length - 1; len >=0; len --) {
    console.log(stack[len])
  }
}
```

#### 单向链表逆序

```
function reverseList(list) {
  let reList = list
  let a = list.head
      b = null
  if (a === null) return

  while(a.next != null) {
    b = a.next
    a.next = b.next
    b.next = reList
    reList = b
  }
  return reList
}
```

#### 链表转化成数组

```
function list2Array(list) {
  if(!list) {
    return []
  }
  var result = []
  var p = list.head
  while(p) {
    result.push(p.value)
    p = p.next
  }
  return result
}

// 递归
function list2Array(list) {
  if (!list) return []

  var result = [list.value]
  var resultValues = list2Array(list.next)
  return result.concat(resultValues)
}
```

#### 数组转链表

```
function array2List(arr) {
  if(!arr || arr.length === 0) {
    return null
  }
  var nodes = []
  for(var i = 0; i < arr.length; i ++) {
    var node = {}
    node.value = arr[i]
    node.next  = null
    nodes.push(node)
  }

  for(var i = 0; i < nodes.length; i++) {
    nodes[i].next = nodes[i+1]
  }
  return nodes[0]
}

// 不占额外空间
function array2List(arr) {
  if(!arr.length) return null
  var node,
      head = {value: arr[0], next: null}
  var pnode = head // pnode 用来保存前一个节点
  
  for(var i = 1; i < arr.length; i++) {
    node = {value: arr[i], next: null}
    pnode.next = node
    pnode = node
  }
  
  return head
}
```
