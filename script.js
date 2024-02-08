const hourHand = document.querySelector('[hour-hand]')
const minuteHand = document.querySelector('[minute-hand]')
const secondHand = document.querySelector('[second-hand]')
const storeTimeBtn = document.getElementById('storeTimeBtn');

let storedTime = null;

function setClock() {
    const currentDate = new Date()
    const secondsRatio = currentDate.getSeconds() / 60
    const minutesRatio = (secondsRatio + currentDate.getMinutes()) / 60
    const hoursRatio = (minutesRatio + currentDate.getHours()) / 12
    setRotation(secondHand, secondsRatio)
    setRotation(minuteHand, minutesRatio)
    setRotation(hourHand, hoursRatio)

   

    if (storedTime !== null && currentDate >= storedTime) {
        console.log("Stored time reached:", storedTime); // Log stored time reached
        flashScreen();
        storedTime = null; // Reset stored time
    }
}

function setRotation(element, rotationRatio) {
    element.style.setProperty('--rotation', rotationRatio * 360)
}

function storeTime() {
  const currentDate = new Date();
  const futureTimeEastern = new Date(currentDate.getTime() + 15 * 60000); // 15 minutes from now (Eastern)
  const futureTimeCentral = new Date(currentDate.getTime() + 15 * 60000 ); // 15 minutes from now (Central)
  const futureTimeMountain = new Date(currentDate.getTime() + 15 * 60000 ); // 15 minutes from now (Mountain)
  const futureTimePacific = new Date(currentDate.getTime() + 15 * 60000 ); // 15 minutes from now (Pacific)

  console.log("Stored time (Eastern):", futureTimeEastern.toLocaleString('en-US', { timeZone: 'America/New_York' }));
  console.log("Stored time (Central):", futureTimeCentral.toLocaleString('en-US', { timeZone: 'America/Chicago' }));
  console.log("Stored time (Mountain):", futureTimeMountain.toLocaleString('en-US', { timeZone: 'America/Denver' }));
  console.log("Stored time (Pacific):", futureTimePacific.toLocaleString('en-US', { timeZone: 'Pacific/Honolulu' }));

  document.querySelector('section div:nth-child(4)').innerHTML = "Eastern Time <br>"+ futureTimeEastern.toLocaleString('en-US', { timeZone: 'America/New_York' });
  document.querySelector('section div:nth-child(3)').innerHTML = "Central Time <br>"+futureTimeCentral.toLocaleString('en-US', { timeZone: 'America/Chicago' });
  document.querySelector('section div:nth-child(2)').innerHTML = "Mountain Time <br>"+futureTimeMountain.toLocaleString('en-US', { timeZone: 'America/Denver' });
  document.querySelector('section div:nth-child(1)').innerHTML = "Pacific Time <br>"+futureTimePacific.toLocaleString('en-US', { timeZone: 'Pacific/Honolulu' });
}


function flashScreen() {
  console.log("Flashing screen..."); // Log flashing screen
  let count = 0;
  const interval = setInterval(() => {
      document.body.style.backgroundColor = count % 2 === 0 ? 'blue' : 'red'; // Toggle between blue and red
      count++;
      if (count === 40) { // Stop after 20 seconds (40 half-second intervals)
          clearInterval(interval);
          console.log("Flashing stopped."); // Log that flashing stopped
          document.body.style.backgroundColor = 'black'; // Set background color to black
      }
  }, 500);
}



storeTimeBtn.addEventListener('click', storeTime);
setInterval(setClock, 1000);
