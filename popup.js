document.addEventListener("DOMContentLoaded", function() {
  // Send a message to the background script to request the colors
  console.log("ready");
  chrome.runtime.sendMessage({type: "getColors"}, function(response) {
    if (response && response.colors) {
      setColors(response.colors);
    } else {
      console.log("No response or colors received from background script.");
    }
  });
});

function setColors(colors) {
    console.log("set colors");
    for (let i = 0; i < colors.length; i++) {
      document.getElementById(`p${i}`).style.backgroundColor = colors[i];
      document.getElementById(`p${i}`).querySelector('.tooltip').textContent = colors[i];
    }
    return true;
  }

// chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
//     if (message.colors) {
//       setColors(message.colors);
//     }
//   });

console.log("popup");