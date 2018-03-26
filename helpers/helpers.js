function loopThroughAttributes(myobj) {
    var i = 0;
    for (var key in myobj) {
      // skip loop if the property is from prototype
      if (!myobj.hasOwnProperty(key)) continue;
  
      console.log("* Attr " + i + " :" +myobj[key]);
      i++;
    }
  }
  
  function getRowIndexForDate(rows, date) {
    for(var i = 0; i < rows.length; i++) {
      console.log("* Checking row's date " + rows[i].date);
      if(rows[i].date == date)
        return i;
    }
  }
  
  function getDateTime(time_as_well) {
    var date = new Date();

    var year = date.getFullYear();
  
    var month = date.getMonth() + 1;
    month = (month < 10 ? "0" : "") + month;
  
    var day  = date.getDate();
    day = (day < 10 ? "0" : "") + day;

    if(time_as_well) {
      var hour = date.getHours();
      hour = (hour < 10 ? "0" : "") + hour;
    
      var min  = date.getMinutes();
      min = (min < 10 ? "0" : "") + min;
    
      var sec  = date.getSeconds();
      sec = (sec < 10 ? "0" : "") + sec;

      return year + "/" + month + "/" + day + " " + hour + ":" + min + ":" + sec;
    } else {
      return year + "/" + month + "/" + day;
    }
  }

  function substitueEmptyString(str) {
    if(str == "")
      return "not set";
    else
      return str;
  }

  module.exports = {
      loopThroughAttributes,
      getDateTime
  }