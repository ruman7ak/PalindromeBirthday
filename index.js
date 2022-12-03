function reverseStr(str) {
    // var split = str.split('');
    // var reverse = split.reverse();
    // var reversed = reverse.join('');
    // return reversed;
    return str.split('').reverse().join('')
  }
  
  function isPalindrome(str) {
    var reverse = reverseStr(str);
    return str === reverse;
    //   if(str===reverse){
    //     return true;}else{
    //     return false;
    //     }
  }
  
  function numberTosTring(date) {
    var numberStr = { day: '', month: '', year: '' };
  
    if (date.day > 10) {
      numberStr.day = date.day.toString();
    } else {
      numberStr.day = "0" + date.day.toString();
    }
    if (date.month > 10) {
      numberStr.month = date.month.toString();
    } else {
      numberStr.month = "0" + date.month.toString();
    }
    if (date.year > 10) {
      numberStr.year = date.year.toString();
    } else {
      numberStr.year = "0" + date.year.toString();
    }
    return numberStr;
  }
  
  function dateVariation(date) {
    var flagdate = numberTosTring(date);
  
    var ddmmyyy = flagdate.day + flagdate.month + flagdate.year;
    var mmddyyy = flagdate.month + flagdate.day + flagdate.year;
    var yyymmdd = flagdate.year + flagdate.month + flagdate.day;
    var ddmmyy = flagdate.day + flagdate.month
      + flagdate.year.slice(-2);
    var mmddyy = flagdate.month + flagdate.day +
      flagdate.year.slice(-2);
    var yymmdd = flagdate.year.slice(-2) + flagdate.month +
      flagdate.day;
  
    return [ddmmyyy, yyymmdd, mmddyyy, mmddyy, yymmdd];
  }
  
  function palindromeAllFormats(date) {
    var allFormat = dateVariation(date);
  
    var flag = false;
  
    for (i = 0; i < allFormat.length; i++) {
      if (isPalindrome(allFormat[i])) {
        flag = true;
        break;
      }
    }
    return flag;
  }
  
  function isLeapYear(date) {
    if (date % 400 === 0) {
      return true;
    }
    if (date % 100 === 0) {
      return false;
    }
    if (date % 4 === 0) {
      return true;
    }
    return false;
  }
  
  function getNextdate(date) {
    var day = date.day + 1;
    var month = date.month;
    var year = date.year;
  
    var daysInaMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  
    if (month === 2) {
      if (isLeapYear) {
        if (day === 29) {
          day = 1;
          month++;
        }
  
      } else {
        if (day === 28) {
          day = 1;
          month++;
        }
      }
    }
  
    else {
      if (day > daysInaMonth[month - 1]) {
        day = 1;
        month++;
      }
      if (month > 12) {
        month = 1;
        year++
      }
    }
    return { day: day, month: month, year: year };
  }
  
  function getNextPalindrome(date) {
    var count = 0;
    var nextDate = getNextdate(date);
  
    while (1) {
      count++;
      var ifPalindrome = palindromeAllFormats(nextDate);
  
      if (ifPalindrome) {
        break;
      }
      nextDate = getNextdate(nextDate);
  
    }
    return [count, nextDate];
  }
  
  
  function getPreviousDate(date){
    var day = date.day-1;
    var month = date.month;
    var year= date.year;
  
    var daysInaMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  
    if(day===0){
      month--;
      if(month===0){
        day=31;
        month=12;
      }else
        if(month===2){
          if(isLeapYear(year)){
            day=29;
            
          }else{
            day=28;
            
          }
        }
      else{
        day= daysInaMonth[month-1];
      }
      }
   return { day: day, month: month, year: year };
  }
  
  function getPreviousPalindrome(date){
    var lastDate= getPreviousDate(date);
    var count=0;
    
    while (1) {
      count++;
      var checkPalindrome= palindromeAllFormats(lastDate);
      if(checkPalindrome){
        break;
      }else{
        lastDate= getPreviousDate(lastDate);
      }
    }
     return [count, lastDate];
  }
  
  


  var input= document.querySelector("#input-btn");
  var button= document.querySelector("#check-btn");
  var output = document.querySelector("#output-info");
  var output2 = document.querySelector("#output-info2");

  function clicking(){
    var datevalue= input.value;

    if(datevalue!== ""){
    var birthdate= datevalue.split("-");

    var date = {
        day: Number(birthdate[2]),
        month: Number(birthdate[1]),
        year: Number(birthdate[0])
      }

    if(palindromeAllFormats(date)){
        console.log("Yayyyy!! Your birthday is Palindrome");
    }else{
        var [count,nextDate]= getNextPalindrome(date);
        var [count2, nextDate2]=getPreviousPalindrome(date);

        output.innerText="Next Palindrome date is on "+ nextDate.day +"-"+ nextDate.month +"-"+ nextDate.year +" You missed it by "+count+" days";
        output2.innerText= "Previous Palindrome date was on "+ nextDate2.day +"-"+ nextDate2.month +"-"+ nextDate2.year +" You missed it by "+count2+" days";

    }
    }
    
    }
  
  

  button.addEventListener("click", clicking);