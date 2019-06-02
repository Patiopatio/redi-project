// Current times
let today = moment();
let currentMonth = today.month();
let currentYear = today.year();
let currentWeek = today.clone().startOf("week").add(1, 'day');

// helpers
let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
let countryNames = ["Germany", "United Kingdom", "India"];


// Selected time
let selectYear = document.getElementById("year");
let selectMonth = document.getElementById("month");
let monthAndYear = document.getElementById("monthAndYear");
let weekHeader = document.getElementById("week");

let events = [];

showCalendar(currentMonth, currentYear);
showWeek(currentWeek);

// What is this ???
for (let country of countryNames) {
  moment.modifyHolidays.add(country)
}


//////////////////////////////
///////////// Event Handler /////////////////
//////////////////////////////
//////////////////////////////

// This function saves all the events to local storage


let timezone = moment.tz.guess()
console.log(timezone)
let timeZoneElement = document.getElementById("time-zone-selector")

function saveEvents() {
  localStorage.setItem("EVENTS", JSON.stringify(events));
}

// get data of dom elements
//Skip this // create object event = {title: ... }
// take the values and put them into the calendar



// This function loads all the events from local storage
function loadEvents() {
  let eventString = localStorage.getItem("EVENTS")
  if (eventString !== null) {
    for (event of events) {
      event.start = moment.utc(event.start)
      event.end = moment.utc(event.start)
    }
  }
}

function isSameDay(day1, day2) {
  return day1.year() === day2.year() && day1.dayOfYear() === day2.dayOfYear();
}

// not yet used
function renderDayView(day, dayDivElement) {
  // go through ALL our events
  for (let event of events) {
    if (isSameDay(event.start, day)) {
      // the event starts today, render it!
      let eventDivElement = document.createElement("div");
      eventDivElement.textContent = event.start.format("HH:mm")
        + " - "
        + event.end.format("HH:mm")
        + ": "
        + event.title;
      dayDivElement.appendChild(eventDivElement);
    }
  }
}

function addEvent() {
  let title = document.getElementById("title").value
  let startDate = document.getElementById("date-start").value
  let startTime = document.getElementById("time-start").value
  let endDate = document.getElementById("date-end").value
  let endTime = document.getElementById("time-end").value

  let newEvent = {
    title: title,
    //start: moment.tz(startDate + " " + startTime, timezone).utc(),
    start: moment(startDate + " " + startTime),
    //end: moment.tz(endDate + " " + endTime, timezone).utc()
    end: moment(endDate + " " + endTime)
  }

  events.push(newEvent);
  saveEvents();
  showWeek(currentWeek)
  showCalendar(currentMonth, currentYear);
}

function changeTimeZone() {
  // TODO
}

//////////////////////////////
///////////// Month /////////////////
//////////////////////////////
//////////////////////////////

function next() {
  currentYear = (currentMonth === 11) ? currentYear + 1 : currentYear;
  currentMonth = (currentMonth + 1) % 12;
  showCalendar(currentMonth, currentYear);
}

function previous() {
  currentYear = (currentMonth === 0) ? currentYear - 1 : currentYear;
  currentMonth = (currentMonth === 0) ? 11 : currentMonth - 1;
  showCalendar(currentMonth, currentYear);
}

function jump() {
  currentYear = parseInt(selectYear.value);
  currentMonth = parseInt(selectMonth.value);
  showCalendar(currentMonth, currentYear);
}

function showCalendar(month, year) {

  // first day is default sunday so we substract 1
  let firstDay = moment(new Date(year, month)).utc().day() - 1;
  firstDay = firstDay == -1 ? 6 : firstDay;
  let daysInMonth = 32 - moment(new Date(year, month, 32)).date();

  let tbl = document.getElementById("calendar-body"); // body of the calendar

  // clearing all previous cells
  tbl.innerHTML = "";

  // filing data about month and in the page via DOM.
  monthAndYear.innerHTML = months[month] + " " + year;
  selectYear.value = year;
  selectMonth.value = month;

  console.log(events)

  // creating all cells
  let date = 1;
  for (let week = 0; week < 6; week++) {
    // creates a table row
    let row = document.createElement("tr");

    //creating individual cells, filing them up with data.
    for (let day = 0; day < 7; day++) {

      // empty text cell for first week
      if (week === 0 && day < firstDay) {
        let cell = document.createElement("td");
        let cellText = document.createTextNode("");
        cell.appendChild(cellText);
        row.appendChild(cell);
      }
      else if (date > daysInMonth) {
        break;
      }
      // if saturday or sunday - skip cell
      else if (day > 4) {
        date++;
        continue;
      }
      // append days to drew on row
      else {
        let cell = document.createElement("td");
        let content = date;
        let timezone = moment.tz.guess()
        //let todaysDate = moment.tz({ year :year, month :month, day :date},timezone).utc();
        let todaysDate = moment({ year: year, month: month, day: date });
        let holiday = todaysDate.isHoliday();
        if (holiday) {
          content += " " + holiday;
        }

        console.log(date);
        for (let event of events) {
          if (todaysDate.isBetween(event.start, event.end, 'days', '[]')) {
            content += " " + event.title;
            console.log(event.start);
            console.log(event.end);
            console.log(todaysDate)
          }
        }
        let cellText = document.createTextNode(content);
        cell.appendChild(cellText);
        row.appendChild(cell);
        date++;
      }
    }

    tbl.appendChild(row); // appending each row into calendar body.
  }
}

//////////////////////////////
///////////// Week /////////////////
//////////////////////////////
//////////////////////////////

function nextWeek() {
  currentWeek.add(1, 'week')
  showWeek(currentWeek)
}

function previousWeek() {
  currentWeek.subtract(1, "week")
  showWeek(currentWeek)
}

// jumpWeek

// get first day of week of month  (for monday)
// display date ranger in the header and
function showWeek(firstDayOfWeek) {

  // clear the previous view
  let lastDayOfWeek = firstDayOfWeek.clone().add(4, 'day')
  let dateRange = firstDayOfWeek.format('MM.DD') + ' - ' + lastDayOfWeek.format('MM.DD')
  weekHeader.innerHTML = dateRange

  //function renderWeekView(firstDay) {

  const MondayIndex = 0
  const FridayIndex = 4

  // creates a table row
  let row = document.createElement("tr");

  // loop over all days 5 0..5 i smaller 5
  for (let firstD = MondayIndex; firstD <= FridayIndex; ++firstD) {
    let dayCellElement = document.createElement("td")

    let day = firstDayOfWeek.clone()
    day.add(firstD, 'days')
    let dayString = day.format("DD. MM")
    let content = ""

    let holiday = day.isHoliday()
    if (holiday) {
      content += " " + holiday
    }
    content += " " + dayString
    dayCellElement.innerHTML = content
    row.appendChild(dayCellElement)
  }

  tbl = document.getElementById("week-body")
  tbl.innerHTML = ''

  tbl.appendChild(row); // appending each row into calendar body.
}
