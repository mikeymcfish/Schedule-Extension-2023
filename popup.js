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
    console.log(colors);
    if (colors.upper && colors.middle) {
        const upperElements = document.querySelectorAll('.Upper div');
        const middleElements = document.querySelectorAll('.Middle div');
    
        for (let i = 0; i < colors.upper.length; i++) {
            const elementId = `p${i}`;
            console.log(elementId);
            const element = document.querySelectorAll('.Upper #' + elementId)[0];
            console.log(element);
            element.style.backgroundColor = colors.upper[i];
            const tooltip = element.querySelector('.tooltip');
            if (tooltip) {
                tooltip.textContent = colors.upper[i];
            }
  
        }
    
        for (let i = 0; i < colors.middle.length; i++) {
            console.log(i);
            const elementId = `p${i}`;

            const element = document.querySelectorAll('.Middle #' + elementId)[0];
            element.style.backgroundColor = colors.middle[i];
            const tooltip = element.querySelector('.tooltip');
            if (tooltip) {
                tooltip.textContent = colors.middle[i];
            }

        }
    }
    return true;
}



console.log("popup");