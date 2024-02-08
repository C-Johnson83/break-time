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
  const futureTimeCentral = new Date(currentDate.getTime() + 15 * 60000 - (5 * 60 * 60000)); // 15 minutes from now (Central)
  const futureTimeMountain = new Date(currentDate.getTime() + 15 * 60000 - (6 * 60 * 60000)); // 15 minutes from now (Mountain)
  const futureTimePacific = new Date(currentDate.getTime() + 15 * 60000 - (7 * 60 * 60000)); // 15 minutes from now (Pacific)

  console.log("Stored time (Eastern):", futureTimeEastern.toLocaleString('en-US', { timeZone: 'America/New_York' }));
  console.log("Stored time (Central):", futureTimeCentral.toLocaleString('en-US', { timeZone: 'America/Chicago' }));
  console.log("Stored time (Mountain):", futureTimeMountain.toLocaleString('en-US', { timeZone: 'America/Denver' }));
  console.log("Stored time (Pacific):", futureTimePacific.toLocaleString('en-US', { timeZone: 'America/Los_Angeles' }));
}


function flashScreen() {
    console.log("Flashing screen..."); // Log flashing screen
    document.body.style.backgroundColor = 'blue';
    setTimeout(() => {
        document.body.style.backgroundColor = 'red';
    }, 500);
}

storeTimeBtn.addEventListener('click', storeTime);
setInterval(setClock, 1000);
