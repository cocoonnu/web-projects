// 判断闰年
function isLeapYear(year) {
    return (
        (year % 4 == 0 && year % 100 != 0 && year % 400 !=0) ||
        (year % 100 == 0 && year % 400 == 0)
    );
}

// 2月份的天数
function getFebDays(year) {
    return isLeapYear(year) ? 29 : 28;
}

// 变量命名：下划线命名法
let calender = document.querySelector('.calender');
// 头部month-picker
let month_picker = document.querySelector('#month-picker');
// 当前时间模块
let dateTimeFormate = document.querySelector('.date-time-formate');
// 当前时间：Today
let dayTextFormate = document.querySelector('.day-text-formate');
// 当前时间：time
let timeFormate = document.querySelector('.time-formate');
// 当前时间：date
let dateFormate = document.querySelector('.date-formate');
// 最底部的所有月份
let month_list = document.querySelector('.month-list');
month_list.classList.add('hideonce'); // 开始隐藏

let month_names = ['January','February','March','April','May','June','July','August',
'September','October','November','December',];

// 全局时间变量
let currentDate = new Date();
let currentMonth = currentDate.getMonth();
let currentYear = currentDate.getFullYear();
generateCalendar(currentMonth,currentYear);


// 初始化日历 10月则month=9(因为从0开始)
function generateCalendar(month,year) {
    // 内容：calender-days
    let calender_days = document.querySelector('.calender-days');
    calender_days.innerHTML = '';
    
    // 头部month_picker
    month_picker.innerHTML = month_names[month];

    // 头部：year-picker里面的year
    let calendar_header_year = document.querySelector('#year'); 
    calendar_header_year.innerHTML = year;
    
    let days_of_month = [31,getFebDays(year),31,30,31,30,31,31,30,31,30,31];

    // 得到当前时间date对象
    let currentDate = new Date();
    // 得到year年month+1月的第一天date对象 
    let first_day = new Date(year,month);
 
    // 初始化calender-days内容
    for (let i=0; i<=days_of_month[month]+first_day.getDay()-1; i++)
    {
        // 创建calender-days div
        let day = document.createElement('div');

        // 日期写入算法
        if (i >= first_day.getDay())
        {
            let divText = i - first_day.getDay() + 1;
            day.innerHTML = i - first_day.getDay() + 1;

            // 如果该日期为当前日期
            if (divText == currentDate.getDate() && year == currentDate.getFullYear() &&
                month == currentDate.getMonth()) {
                    day.classList.add('current-date');
            }
        }
        
        calender_days.appendChild(day);

        // day添加点击事件
        day.addEventListener('click',function() {
            
            let currentday = calender_days.querySelector('.current-date');
            if (currentday) {
                currentday.classList.remove('current-date');
            }
            this.classList.add('current-date');
        })
    }
}


// 当点击头部月份时
let isMonthListShow = false;
month_picker.onclick = () => {
    if (!isMonthListShow)
    {
        isMonthListShow = true;
        // 显示所有月份
        month_list.classList.remove('hideonce');
        month_list.classList.remove('hide');
        month_list.classList.add('show');
    
        // 隐藏当前时间
        dateTimeFormate.classList.remove('showtime');
        dateTimeFormate.classList.add('hidetime');
    } else
    {
        isMonthListShow = false;
        // 隐藏所有月份
        month_list.classList.replace('show','hide');

        // 显示当前时间
        dateTimeFormate.classList.remove('hidetime');
        dateTimeFormate.classList.add('showtime');
    }
}


// 初始化month_list
month_names.forEach(function(e,index) {
    let month = document.createElement('div');
    month.innerHTML = `<div>${e}</div>`;
    month_list.appendChild(month);

    // 添加点击事件
    month.onclick = () => {
        currentMonth = index;
        generateCalendar(currentMonth,currentYear);
        
        isMonthListShow = false; // 隐藏月份显示时间
        month_list.classList.replace('show','hide');
        dateTimeFormate.classList.remove('hidetime');
        dateTimeFormate.classList.add('showtime');
    }
})

// 实现左右按钮功能
document.querySelector('#pre-year').onclick = () => {
    generateCalendar(currentMonth,--currentYear);
}

document.querySelector('#next-year').onclick = () => {
    generateCalendar(currentMonth,++currentYear);
}

// 当点击Today时 显示当前日期
dayTextFormate.onclick = () => {
    let current = new Date();
    generateCalendar(current.getMonth(),current.getFullYear());
}

// 显示当前日期
const currshowDate = new Date();
let dateStr = currshowDate.getDate() + ' - ' + month_names[currshowDate.getMonth()] + ' - ' 
+ currshowDate.getFullYear();
dateFormate.innerHTML = dateStr;

// 显示当前时间
function setTimer() {
    const timer = new Date();
    let option = {
        hour : 'numeric',
        minute : 'numeric',
        second : 'numeric',
        hour12 : false,
    }
    
    let formateTimer = new Intl.DateTimeFormat('en-us',option).format(timer)
    timeFormate.innerHTML = formateTimer;
}
setTimer();
setInterval(setTimer,1000)