class TopAnimate {
  constructor(config) {
    this.container = document.getElementById(config.el); // 组件容器
    this.topNum = config.options.topNum || 8; // 展示多少行数据
    this.labelWidth = config.options.labelWidth || 120; // 文字标签宽度
    this.spacing = config.options.spacing || 30; // 每行间距
    this.maxWidth = config.options.maxWidth || 500; // 最大宽度
    this.barHeight = config.options.barHeight || 30; // 数值条高度
    this.colors = config.options.colors || []; // 数值条颜色数组
    this.title = config.options.title; // 组件标题
    this.data; // 组件数据
    this.domArr = []; // 组件dom数组

  }
  _initData() {

    // 如果color颜色数组长度小于数据长度，则需要填补
    if (this.colors.length < this.data.length) {
      for (let i = this.colors.length; i < this.data.length; i++) {
        this.colors.push('#0057ff')
      }
    }

    const sort = this.data
    const maxValue = sort[0].value;

    // 生成DOM结构
    const wrap = this.container;
    wrap.style.position = 'relative';
    wrap.style.width = '100%';
    wrap.style.height = '100%';

    // 生成title
    const title = document.createElement('h3');
    title.innerText = this.title;
    title.style.position = 'absolute';
    title.style.top = '0';
    title.style.margin = '0';
    wrap.appendChild(title);
    // const baseLine = document.createElement('div');
    // baseLine.className = 'base-line';
    // baseLine.style.position = 'absolute';
    // baseLine.style.width = '4px';
    // baseLine.style.height = '100%';
    // baseLine.style.backgroundColor = '#333';
    // baseLine.style.left = this.labelWidth + 'px';
    // baseLine.style.top = '0';
    // wrap.appendChild(baseLine);

    // 循环生成DOM
    const flag = document.createDocumentFragment();
    sort.slice(0, this.topNum).forEach((item, index) => {
      // 每行容器
      const rowEl = document.createElement('div');
      rowEl.className = 'row';
      rowEl.style.position = 'absolute';
      rowEl.style.top = `${index * (this.barHeight + this.spacing) + 40 }px`;
      rowEl.style.transition = 'top 1s';

      // 标签DOM
      const label = document.createElement('span');
      label.className = 'item-name';
      label.innerText = item.name;
      label.style.width = this.labelWidth + 4 + 'px';
      label.style.flexGrow = 0;
      rowEl.appendChild(label);

      // 数值DOM
      const valueEl = document.createElement('span');
      valueEl.className = "item-val";
      valueEl.innerText = item.value;
      valueEl.style.position = 'absolute';
      valueEl.style.display = 'inline';
      valueEl.style.padding = '0 10px';

      // 数值条DOM
      const bar = document.createElement('div');
      bar.className = 'item-bar';
      bar.style.height = this.barHeight + 'px';
      bar.style.lineHeight = this.barHeight + 'px';
      bar.style.width = `${item.value / maxValue * this.maxWidth}px`;
      bar.style.position = 'relative';
      bar.style.transition = 'width 1s';
      bar.appendChild(valueEl);

      rowEl.appendChild(bar);
      flag.appendChild(rowEl);
      // 用于更新数据时dom操作
      this.domArr.push({
        data: item,
        row: rowEl,
        label: label,
        value: valueEl,
        bar: bar
      });
    });
    wrap.appendChild(flag)

    // 判断最小值的文字宽度与背景色div宽度
    Array.prototype.slice.call(document.getElementsByClassName('item-val')).forEach((item, index) => {
      if (item.clientWidth > item.parentNode.clientWidth) {
        item.parentNode.style.backgroundColor = 'unset';
        item.style.left = '0';
        item.style.right = 'unset';
      } else {
        item.parentNode.style.backgroundColor = this.colors[index];
        item.style.right = '0';
        item.style.left = 'unset';
      }
    })
  }

  // 更新数据
  update(data) {
    // 判断是否是第一次更新数据

    if (!data instanceof Array) {
      console.error('options.data is not a Array!');
      return false
    }
    const sort = data.slice(0, this.topNum).sort((a, b) => b.value - a.value);

    if (!this.data) {
      this.data = sort;
      this._initData();
      return false
    }
    const maxValue = sort[0].value;

    // 对比dom更新值
    sort.forEach((newItem, index) => {
      this.domArr.some((item, domIndex) => {
        if (newItem.name === item.data.name) {
          item.bar.style.width = `${newItem.value / maxValue * this.maxWidth}px`;
          item.value.innerText = newItem.value;
          item.row.style.top = `${index * 40 + 50}px`;
          if (item.value.clientWidth > newItem.value / maxValue * this.maxWidth) {
            console.log(item.value.clientWidth, newItem.value / maxValue * this.maxWidth)
            item.bar.style.backgroundColor = 'unset';
            item.value.style.left = '0';
            item.value.style.right = 'unset';
          } else {
            item.bar.style.backgroundColor = this.colors[domIndex];
            item.value.style.right = '0';
            item.value.style.left = 'unset';
          }
          return true
        }
      })
    })
  }
}