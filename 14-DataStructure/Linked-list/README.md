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
  while(currentNode.ele != item) {
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
