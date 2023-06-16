function updateTime() {
  let today = new Date();
  let hours = today.getHours();
  let minutes = today.getMinutes();
  let seconds = today.getSeconds();
  let ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12;
  minutes = minutes < 10 ? '0' + minutes : minutes;
  seconds = seconds < 10 ? '0' + seconds : seconds; 
  let time = hours + ':' + minutes + ':' + seconds + ' ' + ampm;
  let fstime = '<span class="hour">' + hours + '</span>:<span class="minute">' + minutes + '</span>:<span class="second">' + seconds + '</span>:<span class="ampm">' + ampm + '</span>';
  document.getElementById('time').innerHTML = time;
  document.getElementById('fullTime').innerHTML = fstime;
}

setInterval(updateTime, 1000); 

function updateDate() {
    let today = new Date();
    let options = { year: 'numeric', month: 'short', day: 'numeric' };
    let date = today.toLocaleDateString('en-US', options);
    document.getElementById('date').innerHTML = date + ' ' + ' > ';
}

setInterval(updateDate, 1000);

function updateClock() {
    let today = new Date();
    let hours = today.getHours();
    let minutes = today.getMinutes();
    let seconds = today.getSeconds();
    let hourAngle = (hours % 12) * 30 + minutes / 2;
    let minuteAngle = minutes * 6;
    let secondAngle = seconds * 6;
    document.getElementById('hour-hand').style.transform = 'rotate(' + hourAngle + 'deg)';
    document.getElementById('minute-hand').style.transform = 'rotate(' + minuteAngle + 'deg)';
    document.getElementById('second-hand').style.transform = 'rotate(' + secondAngle + 'deg)';
}

setInterval(updateClock, 1000); 

function showCalendar() {
    document.getElementById('fullScreenTimeCalendar').style.display = 'block';
    hideHomescreen();
}

function hideCalendar() {
    document.getElementById('fullScreenTimeCalendar').style.display = 'none';
}

function showHomescreen() {
    document.getElementById('homescreen').style.display = 'block';
    hideCalendar();
}

function hideHomescreen() {
    document.getElementById('homescreen').style.display = 'none';
}

function createCalendar(month, year) {
    let daysInMonth = new Date(year, month + 1, 0).getDate();
    let firstDayOfMonth = new Date(year, month, 1).getDay();
    let lastDayOfMonth = new Date(year, month, daysInMonth).getDay();
    let daysInLastMonth = new Date(year, month, 0).getDate();
    let daysInNextMonth = 1;
    let calendarDays = [];
  
    // Add days from last month
    for (let i = firstDayOfMonth - 1; i >= 0; i--) {
      calendarDays.push(daysInLastMonth - i);
    }
  
    // Add days from this month
    for (let i = 1; i <= daysInMonth; i++) {
      calendarDays.push(i);
    }
  
    // Add days from next month
    for (let i = lastDayOfMonth + 1; i <= 6; i++) {
      calendarDays.push(daysInNextMonth++);
    }
  
    let calendar = document.getElementById('calendar');
    if (!calendar) {
      console.error('Could not find element with id "calendar"');
      return;
    }
  
    let monthElement = calendar.querySelector('.month');
    if (!monthElement) {
      console.error('Could not find element with class "month"');
      return;
    }
  
    let weekdaysElement = calendar.querySelector('.weekdays');
    if (!weekdaysElement) {
      console.error('Could not find element with class "weekdays"');
      return;
    }
  
    let daysElement = calendar.querySelector('.days');
    if (!daysElement) {
      console.error('Could not find element with class "days"');
      return;
    }
  
    monthElement.innerHTML = new Date(year, month).toLocaleString('default', { month: 'long' });
  
    weekdaysElement.innerHTML = '';
    for (let i = 0; i < 7; i++) {
      weekdaysElement.innerHTML += '<div>' + ['S', 'M', 'T', 'W', 'T', 'F', 'S'][i] + '</div>';
    }
  
    daysElement.innerHTML = '';
    for (let i = 0; i < calendarDays.length; i++) {
      let day = calendarDays[i];
      let className = '';
      if (day === new Date().getDate() && year === new Date().getFullYear() && month === new Date().getMonth()) {
        className = 'today';
      }
      daysElement.innerHTML += '<div class="' + className + '">' + day + '</div>';
    }
  }
  
  let today = new Date();
  createCalendar(today.getMonth(), today.getFullYear());

function showFullTime() {
    document.getElementById('fullTimeScreen').style.display = 'block';
    hideHomescreen();
    hideCalendar();
}

function hideFullTime() {
    document.getElementById('fullTimeScreen').style.display = 'none';
}

function updateWeather() {
    
  }