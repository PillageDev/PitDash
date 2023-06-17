function updateTime() {
  let today = new Date();
  let hours = today.getHours();
  let minutes = today.getMinutes();
  let seconds = today.getSeconds();
  let ampm = hours >= 12 ? ' PM' : ' AM';
  hours = hours % 12;
  hours = hours ? hours : 12;
  minutes = minutes < 10 ? '0' + minutes : minutes;
  seconds = seconds < 10 ? '0' + seconds : seconds; 
  let time = hours + ':' + minutes + ':' + seconds + ' ' + ampm;
  let fstime = '<span class="hour">' + hours + '</span>:<span class="minute">' + minutes + '</span>:<span class="second">' + seconds + '</span><span class="ampm">' + ' ' + ampm + '</span>';
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
    document.getElementById('homescreen').style.display = 'flex';
    hideCalendar();
    hideFullTime();
}

function hideHomescreen() {
    document.getElementById('homescreen').style.display = 'none';
}

function convMtoS(monthNumber) {
  const date = new Date();
  date.setMonth(monthNumber);
  const monthStr = date.toLocaleDateString('default', { month: 'long' });
  return monthStr;
}

// Function to generate the calendar
function generateCalendar() {
  const closeEditEvents = document.getElementsByClassName('closeEditEvents')[0];
  const eventEditor = document.getElementsByClassName('editEventsPopup')[0];
  const editEventButton = document.getElementsByClassName('editEvents')[0];
  const closeEventButton = document.getElementsByClassName('closeButton')[0];
  const events = document.getElementsByClassName('events')[0];

  closeEditEvents.addEventListener('click', function () {
    if (eventEditor instanceof Element) {
      const editEventDisplay = window.getComputedStyle(eventEditor).getPropertyValue('display');
      if (editEventDisplay === 'flex') {
        eventEditor.style.display = 'none';
      } else {
        eventEditor.style.display = 'flex';
        console.log(editEventDisplay);
        console.log('Events are already hidden');
      }
    } else {
      console.log('eventEditor is not an element');
    }
  });

  closeEventButton.addEventListener('click', function () {
    const eventsDisplay = window.getComputedStyle(events).getPropertyValue('display');
    if (eventsDisplay === 'flex') {
      events.style.display = 'none';
    } else {
      console.log('Events are already hidden');
    }
  });
  // Get the calendar element
  const calendar = document.getElementById('calendar');

  // Get the current date
  const currentDate = new Date();

  // Get the current month and year
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  const monthStr = convMtoS(currentMonth);
  document.getElementsByClassName('monthName')[0].innerText = monthStr;
  document.getElementsByClassName('year')[0].innerText = currentYear;



  // Get the number of days in the current month
  const numDays = new Date(currentYear, currentMonth + 1, 0).getDate();

  // Get the first day of the month
  const firstDay = new Date(currentYear, currentMonth, 1).getDay();

  // Clear the calendar
  calendar.innerHTML = '';

  // Add the empty boxes for days before the first day of the month
  for (let i = 0; i < firstDay; i++) {
    const emptyDay = document.createElement('div');
    emptyDay.classList.add('day', 'empty-day');
    calendar.appendChild(emptyDay);
  }

  // Add the days to the calendar
  for (let i = 0; i < numDays; i++) {
    const day = document.createElement('div');
    day.classList.add('day');

    // Calculate the day number
    const dayNumber = i + 1;

    day.textContent = dayNumber;

    // Highlight the current day
    if (
      dayNumber === currentDate.getDate() &&
      currentMonth === currentDate.getMonth() &&
      currentYear === currentDate.getFullYear()
    ) {
      day.classList.add('current-day');
    }

    day.addEventListener('click', function () {
      const eventsDisplay = window.getComputedStyle(events).getPropertyValue('display');
      if (eventsDisplay === 'flex') {
        events.style.display = 'none';
      } else {
        events.style.display = 'flex';
        events.classList.add('events');
      }
    });

    editEventButton.addEventListener('click', function () {
      let localDayNumber;
      const dayInputField = document.getElementById('editEventDate');
      console.log('Clicked');
      const editEventDisplay = window.getComputedStyle(eventEditor).getPropertyValue('display');
      if (editEventDisplay === 'none') {
        eventEditor.style.display = 'flex';
        const eventEditorTitle = document.getElementsByClassName('editEventsTitle')[0];
        dayInputField.addEventListener('input', function(event) {
          localDayNumber = event.target.value;
          if (isNaN(localDayNumber) ) {
            alert('Please enter a number');
            dayInputField.value = '';
            eventEditorTitle.innerText = 'Edit Event';
          }
          else if (localDayNumber > numDays) {
            alert('Please enter a valid day');
            dayInputField.value = '';
            eventEditorTitle.innerText = 'Edit Event';
          } else if (localDayNumber < 1) {
            alert('Please enter a valid day');
            dayInputField.value = '';
            eventEditorTitle.innerText = 'Edit Event';
          } else {
            eventEditorTitle.innerText = 'Edit Event for ' + monthStr + ' ' + localDayNumber;
          }
        });

        const nameInputField = document.getElementById('editEventName');
        let nameInputValue = nameInputField.value;

        const hourInputField = document.getElementById('editEventHour');
        let hourInputValue;
        hourInputField.addEventListener('input', function(event) {
          hourInputValue = event.target.value;
          if (isNaN(hourInputValue) ) {
            alert('Please enter a number');
            hourInputField.value = '';
          }
          else if (hourInputValue > 12) {
            alert('Please enter a valid hour');
            hourInputField.value = '';
          } else if (hourInputValue < 1) {
            alert('Please enter a valid hour');
            hourInputField.value = '';
          }
        });

        const minuteInputField = document.getElementById('editEventMinute');
        let minuteInputValue;
        minuteInputField.addEventListener('input', function(event) {
          minuteInputValue = event.target.value;
          if (isNaN(minuteInputValue) ) {
            alert('Please enter a number');
            minuteInputField.value = '';
          }
          else if (minuteInputValue > 59) {
            alert('Please enter a valid minute');
            minuteInputField.value = '';
          } else if (minuteInputValue < 0) {
            alert('Please enter a valid minute');
            minuteInputField.value = '';
          }
        });

        const ampmInputField = document.getElementById('editEventAmPm');
        let ampmInputValue;

        ampmInputField.addEventListener('input', function(event) {
          ampmInputValue = event.target.value;

          const blurListener = function(event) {
            if (ampmInputValue !== 'AM' && ampmInputValue !== 'PM') {
              if (!ampmInputValue.match(/^[AP]M$/i)) {
                alert('Please enter either AM or PM');
              }
              ampmInputField.value = '';
            }
            ampmInputField.removeEventListener('blur', blurListener);
          };

          ampmInputField.addEventListener('blur', blurListener);
        });

        const descriptionInputField = document.getElementById('editEventDescription');
        let descriptionInputValue = descriptionInputField.value;
        
        const addEventButton = document.getElementById('addEventButton');
        addEventButton.addEventListener('click', function() {
          addEventToLocalStorage(nameInputValue, localDayNumber, hourInputValue, minuteInputValue, ampmInputValue, descriptionInputValue);
          console.log('Event added');
        console.log(nameInputValue, localDayNumber, hourInputValue, minuteInputValue, ampmInputValue, descriptionInputValue);
        });
      }
    });

    calendar.appendChild(day);
  }
}
// Generate the calendar when the page loads
generateCalendar();

function addEventToLocalStorage(eventName, eventDate, eventHour, eventMinute, eventDesc) {
  const storedEventData = JSON.parse(localStorage.getItem('events')) || {};

  storedEventData[eventName] = {
    eventDate: eventDate,
    eventHour: eventHour,
    eventMinute: eventMinute,
    eventDesc: eventDesc
  };

  localStorage.setItem('events', JSON.stringify(storedEventData));
}

function getEventFromLocalStorage(eventName) {
  const events = JSON.parse(localStorage.getItem('events'));

  // Find the event with the specified name
  for (const day in events) {
    if (events.hasOwnProperty(day)) {
      const dayEvents = events[day];
      if (dayEvents.hasOwnProperty(eventName)) {
        return dayEvents[eventName];
      }
    }
  }

  // Return null if the event is not found
  return null;
}

function showFullTime() {
    document.getElementById('fullTimeScreen').style.display = 'block';
    hideHomescreen();
    hideCalendar();
}

function hideFullTime() {
    document.getElementById('fullTimeScreen').style.display = 'none';
}

// window.onerror = function(message, source, lineno, colno, error) {
//   alert(`Error: ${message}\nSource: ${source}\nLine: ${lineno}\nColumn: ${colno}`);
// };

const nextScreen = document.getElementById('nextScreen');
const homeScreen = document.getElementById('homescreen');
const fullTimeScreen = document.getElementById('fullTimeScreen');
const fullScreenTimeCalendar = document.getElementById('fullScreenTimeCalendar');

nextScreen.addEventListener('click', () => {
  if (getComputedStyle(homeScreen).display === 'flex' && getComputedStyle(fullTimeScreen).display === 'none' && getComputedStyle(fullScreenTimeCalendar).display === 'none') {
    showCalendar();
    console.log('showCalendar');
  } else if (getComputedStyle(fullScreenTimeCalendar).display === 'block' && getComputedStyle(fullTimeScreen).display === 'none' && getComputedStyle(homeScreen).display === 'none') {
    showFullTime();
    console.log('showFullTime');
  } else if (getComputedStyle(fullTimeScreen).display === 'block' && getComputedStyle(fullScreenTimeCalendar).display === 'none' && getComputedStyle(homeScreen).display === 'none') {
    showHomescreen();
    console.log('showHomescreen');
  }
    
  }
);

window.showCalendar = function() {
  document.getElementById('fullScreenTimeCalendar').style.display = 'block';
  hideHomescreen();
}

window.showFullTime = function() {
  document.getElementById('fullTimeScreen').style.display = 'block';
  hideHomescreen();
  hideCalendar();
}

window.addEventToLocalStorage = function() {
  const storedEventData = JSON.parse(localStorage.getItem('events')) || {};

  storedEventData[eventName] = {
    eventDate: eventDate,
    eventHour: eventHour,
    eventMinute: eventMinute,
    eventDesc: eventDesc
  };

  localStorage.setItem('events', JSON.stringify(storedEventData));
}

window.getEventFromLocalStorage = function() {
    const events = JSON.parse(localStorage.getItem('events'));
  
    // Find the event with the specified name
    for (const day in events) {
      if (events.hasOwnProperty(day)) {
        const dayEvents = events[day];
        if (dayEvents.hasOwnProperty(eventName)) {
          return dayEvents[eventName];
        }
      }
    }
  
    // Return null if the event is not found
    return null;
  }
  //TODO: Add event to local storage