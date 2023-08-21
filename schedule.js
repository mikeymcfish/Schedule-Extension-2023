// Defining the new time slots
const times = {
    weekday: [0, 800, 805, 915, 1020, 1050, 1200, 1250, 1415, 1520],
};

const schedule = {
    NAVY: {
        dayA: ['violet', 'pink', 'red', 'yellow', 'orange'],
        dayB: ['green', 'blue', 'tan', 'violet', 'pink'],
        dayC: ['yellow', 'red', 'orange', 'green', 'blue'],
        dayD: ['tan', 'violet', 'pink', 'red', 'yellow'],
        dayE: ['orange', 'green', 'blue', 'tan', 'violet'],
        dayF: ['pink', 'red', 'yellow', 'orange', 'green'],
        dayG: ['blue', 'tan', 'violet', 'pink', 'red'],
        dayH: ['yellow', 'orange', 'green', 'blue', 'tan']
        }
};

document.addEventListener("DOMContentLoaded", function() {
    getToday();
});
  
function setColors(day) {
    console.log(day);
    console.log("here");
    const upperElements = document.querySelectorAll('.Upper div');
    const middleElements = document.querySelectorAll('.Middle div');
    
    for (let i = 0; i < day.length; i++) {
        upperElements[i].style.backgroundColor = day[i];
        upperElements[i].querySelector('.tooltip').textContent = day[i];
        middleElements[i].style.backgroundColor = day[i];
        middleElements[i].querySelector('.tooltip').textContent = day[i];
    }
}

function setArrow() {
    //day is 720 min
    //for testing using
    var date = new Date();
    var time = date.getHours() * 100 + date.getMinutes();
    console.log(time);
    // currTime = time - 800;
    // currLeft = (time/720) * 100;
    currLeft = (time/2400) * 100
    floatLeft = currLeft + 0.0;
    stringLeft = floatLeft + "%";
    console.log(stringLeft);
    document.getElementById("arrow").style.left = stringLeft;
}

function getToday() {
    setArrow();
    setInterval(setArrow, 60000);
    const currentDate = new Date().toISOString().split('T')[0];
    fetch('https://docs.google.com/spreadsheets/d/e/2PACX-1vS3-6MgEPFUcHbLfa7q97_I6BI8CJvLZA0FDPxMwKOEFKYZs1GAw_4CRt6oOIWhMEITpOKzYrW2u7Ef/pub?gid=0&single=true&output=csv')
        .then(response => response.text())
        .then(data => {
        // Splitting the CSV data into lines and parsing
        const lines = data.split('\n');
        for (let i = 1; i < lines.length; i++) {
        const [date, scheduleDay] = lines[i].split(',');
        if (date === currentDate) {
            correctDay = scheduleDay.trim()
            console.log(correctDay)
            console.log("hi");
            colors = schedule.NAVY[correctDay];
            setColors(colors);
            return;
        }
        }
        console.log(`No schedule found for ${currentDate}`);
    })
    .catch(error => console.error('An error occurred:', error));

}

