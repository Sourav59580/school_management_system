//show month coding

var dt = new Date();
function RenderDate(){
var month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
document.getElementById("month").innerHTML = (month[dt.getMonth()]);
document.getElementById("date_str").innerHTML = dt.toDateString();

//show days command
var endDate = new Date(
    dt.getFullYear(),
    dt.getMonth() + 1,
    0
).getDate();
var prevDate = new Date(
    dt.getFullYear(),
    dt.getMonth(),
    0
).getDate();
console.log(prevDate);
var todayDate = new Date();
console.log(todayDate);
var prevDay = dt.getDay();
var day = " ";
for (x = prevDay; x>0; x--) {
    day += "<div class='prev_m_days'>" + (prevDate-x+1) + "</div>";
   
}

for (i = 1; i <= endDate; i++) {
    if(i==todayDate.getDate() && dt.getMonth()==todayDate.getMonth())
    day += "<div class='active'>" + i + "</div>";
    else
    day += "<div>" + i + "</div>";
}
// var k=1;
// for (x = prevDay; x>0; x--) {
//     day += "<div class='next_m_days'>" + k + "</div>";
//     k+=1;
// }
document.getElementsByClassName("days")[0].innerHTML = day;
}

function moveDate(event){
    if(event=='prev')
    {
    console.log(event);
    dt.setMonth(dt.getMonth()-1);
    RenderDate();
    }
   
    else if(event=='next'){
    console.log(event);
    dt.setMonth(dt.getMonth()+1);
    RenderDate();
    }
}



