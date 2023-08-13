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

// getToday();

function getToday() {
    return new Promise((resolve, reject) => {

        const currentDate = new Date().toISOString().split('T')[0];
        const url = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vS3-6MgEPFUcHbLfa7q97_I6BI8CJvLZA0FDPxMwKOEFKYZs1GAw_4CRt6oOIWhMEITpOKzYrW2u7Ef/pub?gid=0&single=true&output=csv';
        const cacheBuster = new Date().getTime();
        const urlWithCacheBuster = `${url}&_=${cacheBuster}`;
        fetch(urlWithCacheBuster, { cache: "no-store" })    
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
                    let dayIcon = correctDay.slice(-1);
                    setIcon(`images/${dayIcon}-16.png`);
                    resolve(colors); // resolve the promise with colors
                    return;
                }
            }
              // Example usage
              
            console.log(`No schedule found for ${currentDate}`);
        })
        .catch(error => console.error('An error occurred:', error));
    });
}
function setIcon(iconFilename) {
    console.log(iconFilename);
    if(chrome.action) {
        chrome.action.setIcon({ path: iconFilename });
    } else if(chrome.browserAction) {
        chrome.browserAction.setIcon({ path: iconFilename });
    }
}
function setArrow() {
    // //day is 720 min
    // //for testing using
    // var date = new Date();
    // var time = date.getHours() * 100 + date.getMinutes();
    // console.log(time);
    // // currTime = time - 800;
    // // currLeft = (time/720) * 100;
    // currLeft = (time/2400) * 100
    // floatLeft = currLeft + 0.0;
    // stringLeft = floatLeft + "%";
    // console.log(stringLeft);
    // // document.getElementById("arrow").style.left = stringLeft;
}

setInterval(setArrow, 60000);

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    console.log(request.type);
    setArrow();
    if (request.type === "getColors") {
      getToday().then(colors => {
        sendResponse({colors: colors});
      });
      return true;  // Indicates that the response will be sent asynchronously
    }
  });

  console.log("bg");
