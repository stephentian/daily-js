function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return null;
  }

  if ((time + "").length === 10) {
    time = +time * 1000;
  }

  const format = cFormat || "{y}-{m}-{d} {h}:{i}:{s}";
  let date;
  if (typeof time === "object") {
    date = time;
  } else {
    date = new Date(parseInt(time));
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  };
  const timeStr = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key];
    if (key === "a")
      return ["周一", "周二", "周三", "周四", "周五", "周六", "周日"][value - 1];
    if (result.length > 0 && value < 10) {
      value = "0" + value;
    }
    return value || 0;
  });
  return timeStr;
}

console.log(parseTime('2018-11-13T07:36:20.370Z', '{y}-{m}-{d} {h}:{i}'))
console.log(parseTime('1542094580370', '{y}-{m}-{d} {h}:{i}:{s}'))
console.log(parseTime('1542094580370', '{y}-{m}-{d} {h}:{i}:{s} {a}'))