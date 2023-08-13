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
    document.getElementById("p0").style.backgroundColor = day[0];
    document.getElementById("p1").style.backgroundColor = day[1];
    document.getElementById("p2").style.backgroundColor = day[2];
    document.getElementById("p3").style.backgroundColor = day[3];
    document.getElementById("p4").style.backgroundColor = day[4];

    document.getElementById("p0").querySelector('.tooltip').textContent = day[0];
    document.getElementById("p1").querySelector('.tooltip').textContent = day[1];
    document.getElementById("p2").querySelector('.tooltip').textContent = day[2];
    document.getElementById("p3").querySelector('.tooltip').textContent = day[3];
    document.getElementById("p4").querySelector('.tooltip').textContent = day[4];
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
            colors = schedule.NAVY[correctDay];
            setColors(colors);
            return;
        }
        }
        console.log(`No schedule found for ${currentDate}`);
    })
    .catch(error => console.error('An error occurred:', error));

}

