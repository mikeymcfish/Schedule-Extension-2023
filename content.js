window.onload = function() {
    fetch(chrome.runtime.getURL('index.html'))
      .then(response => response.text())
      .then(data => {
          var div = document.createElement('div');
          div.innerHTML = data.trim();
          document.body.prepend(div);
          console.log(div);
          // Send a message to the background script to request the colors
          chrome.runtime.sendMessage({type: "getColors"}, function(response) {
            if (response.colors) {
              setColors(response.colors);
              setArrow();
            }
          });
          chrome.runtime.sendMessage({type: "hideAll"}, function(response) {
            hideBar();
          });
          chrome.runtime.sendMessage({type: "showAll"}, function(response) {
            showBar();
          });
      });
  }

  function hideBar() {
    console.log("hiding bar");
    document.getElementById("top-bar").style.visibility = "hidden";
  }

  function showBar() {
    console.log("showing bar");
    document.getElementById("top-bar").style.visibility = "visible";
  }

 function setArrow() {
    var date = new Date();
    var time = date.getHours() * 100 + date.getMinutes();
    console.log(time);
    currTime = time - 800;
    currLeft = ((time - 800) / 720) * 100;
    //currLeft = (time/2400) * 100;
    floatLeft = currLeft + 0.0;
    stringLeft = floatLeft + "%";
    console.log(stringLeft);
    try {
        document.getElementById("arrow").style.left = stringLeft;
    } catch (error) {
        console.error('An error occurred:', error);
    }
  }

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === "setArrow") {
        setArrow();
    }
});