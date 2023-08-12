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
    setColors(schedule.NAVY.dayA);
});
  
function setColors(day) {
    document.getElementById("p0").style.backgroundColor = day[0];
    document.getElementById("p1").style.backgroundColor = day[1];
    document.getElementById("p2").style.backgroundColor = day[2];
    document.getElementById("p3").style.backgroundColor = day[3];
    document.getElementById("p4").style.backgroundColor = day[4];
}