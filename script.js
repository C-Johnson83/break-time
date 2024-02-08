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

    console.log("Current time:", currentDate); // Log current time

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
    const futureTime = new Date(currentDate.getTime() + 15 * 60000); // 15 minutes from now
    storedTime = futureTime;
    console.log("Stored time:", storedTime); // Log stored time
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
