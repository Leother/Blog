exports.compare = (property)=>{
    return function (a,b) {
      var value1 = a[property];
      var value2 = b[property];
      return value1 - value2;
    }
}
exports.fall = (property)=>{
  return function (a,b) {
    var value1 = a[property];
    var value2 = b[property];
    return value2 - value1;
  }
}

exports.getCookies = (cname)=> {
  var name = cname + "=";
  var ca = document.cookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') c = c.substring(1);
    if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
  }
  return "";
}

exports.timeChange = (dateString, formdate)=> {
  if (dateString == null || dateString == '') {
    return '';
  }
  // new Date('');传入毫秒数,也可以得到普通的时间,再对date处理
  var date = new Date(parseInt(dateString));
  //获取年份,月份,天数,小时数,分钟数,小于10的显示01-09
  var year = date.getFullYear();
  var month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
  var currentDate = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
  var hours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
  var minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
  if (formdate == null || formdate == "yyyy-mm-dd HH:mm") {
    return year + "-" + month + "-" + currentDate + " " + hours + ":" + minutes;
  } else if (formdate == "yyyy-mm-dd") {
    return year + "-" + month + "-" + currentDate;
  } else if (formdate == "yyyy-mm") {
    return year + month;
  } else if (formdate == "mm-dd") {
    return month + "-" + currentDate;
  } else if (formdate == "HH:mm") {
    return hours + ":" + minutes;
  } else {
    return "";
  }
}
