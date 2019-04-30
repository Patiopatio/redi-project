let today = moment() ;
let currentMonth = today.month();
let currentYear = today.year();
let currentWeek = today.isoWeek();
let selectYear = document.getElementById("year");
let selectMonth = document.getElementById("month");

let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

let monthAndYear = document.getElementById("monthAndYear");
let weekHeader = document.getElementById("week");

showCalendar(currentMonth, currentYear);
showWeek(currentWeek);

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
    let firstDay = moment(new Date(year, month)).day() - 1;
    firstDay = firstDay == -1 ? 6 : firstDay;
    let daysInMonth = 32 - moment(new Date(year, month, 32)).date();

    let tbl = document.getElementById("calendar-body"); // body of the calendar

    // clearing all previous cells
    tbl.innerHTML = "";

    // filing data about month and in the page via DOM.
    monthAndYear.innerHTML = months[month] + " " + year;
    selectYear.value = year;
    selectMonth.value = month;

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
            else if (day>4) {
                date++;
                continue;
            }
            // append days to drew on row
            else {
                let cell = document.createElement("td");
                let cellText = document.createTextNode(date);
                // if its today add class for marking day
                if (date === today.date() && year === today.year() && month === today.month ()) {
                    cell.classList.add("bg-info");
                } // color today's date
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

// nextWeek

// previousWeek

// jumpWeek

function showWeek(week) {
  weekHeader.innerHTML = week

  // get first day of week of month e.g. 28 (for monday)
  firstDay = 28 // todo

  tbl = document.getElementById("week-body")

  date = firstDay
  /// display logic in table
  // loop over all days 5 0..5 i smaller 5

  for (let day = 0; day < 5; day++) {
      // creates row
     let row = document.createElement("tr");
     let cell = document.createElement("td");
     let cellText = document.createTextNode(date);
     cell.appendChild(cellText);
     row.appendChild(cell);
     date++
  }


  tbl.appendChild(row); // appending each row into calendar body.



}
