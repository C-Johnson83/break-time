// Querying DOM elements
const hourHand = document.querySelector('[hour-hand]');
const minuteHand = document.querySelector('[minute-hand]');
const secondHand = document.querySelector('[second-hand]');
const storeTimeBtn = document.getElementById('storeTimeBtn');
const breakDurationInput = document.getElementById('breakDuration');

// Variable to store the stored time
let storedTime = null;

// Function to set the clock
function setClock() {
    const currentDate = new Date();
    const secondsRatio = currentDate.getSeconds() / 60;
    const minutesRatio = (secondsRatio + currentDate.getMinutes()) / 60;
    const hoursRatio = (minutesRatio + currentDate.getHours()) / 12;
    setRotation(secondHand, secondsRatio);
    setRotation(minuteHand, minutesRatio);
    setRotation(hourHand, hoursRatio);

    // Check if stored time is reached
    if (storedTime !== null && currentDate >= storedTime) {
        console.log("Stored time reached:", storedTime); // Log stored time reached
        flashScreen();
        storedTime = null; // Reset stored time
    }
}

// Function to set rotation of clock hands
function setRotation(element, rotationRatio) {
    element.style.setProperty('--rotation', rotationRatio * 360);
}

// Function to store time based on break duration
function storeTime() {
    const currentDate = new Date();
    const breakDuration = parseInt(breakDurationInput.value); // Get break duration from input
    if (isNaN(breakDuration) || breakDuration <= 0) {
        console.error("Invalid break duration");
        return;
    }

    const futureTimeEastern = new Date(currentDate.getTime() + breakDuration * 60000); // Future time based on break duration
    const futureTimeCentral = new Date(currentDate.getTime() + breakDuration * 60000);
    const futureTimeMountain = new Date(currentDate.getTime() + breakDuration * 60000);
    const futureTimePacific = new Date(currentDate.getTime() + breakDuration * 60000);
    const futureTimeHST = new Date(currentDate.getTime() + breakDuration * 60000);

    // Log stored times in different time zones
    console.log("Stored time (Eastern):", futureTimeEastern.toLocaleString('en-US', { timeZone: 'America/New_York' }));
    console.log("Stored time (Central):", futureTimeCentral.toLocaleString('en-US', { timeZone: 'America/Chicago' }));
    console.log("Stored time (Mountain):", futureTimeMountain.toLocaleString('en-US', { timeZone: 'America/Denver' }));
    console.log("Stored time (Pacific):", futureTimePacific.toLocaleString('en-US', { timeZone: 'America/Los_Angeles' }));
    console.log("Stored time (Pacific):", futureTimePacific.toLocaleString('en-US', { timeZone: 'Pacific/Honolulu' }));

    // Set innerHTML of divs to display stored times in different time zones
    document.querySelector('section div:nth-child(5)').innerHTML = "Eastern Time <br>" + futureTimeEastern.toLocaleString('en-US', { timeZone: 'America/New_York' });
    document.querySelector('section div:nth-child(4)').innerHTML = "Central Time <br>" + futureTimeCentral.toLocaleString('en-US', { timeZone: 'America/Chicago' });
    document.querySelector('section div:nth-child(3)').innerHTML = "Mountain Time <br>" + futureTimeMountain.toLocaleString('en-US', { timeZone: 'America/Denver' });
    document.querySelector('section div:nth-child(2)').innerHTML = "Pacific Time <br>" + futureTimePacific.toLocaleString('en-US', { timeZone: 'America/Los_Angeles' });
    document.querySelector('section div:nth-child(1)').innerHTML = "Hawaii-Aleutian Time <br>" + futureTimeHST.toLocaleString('en-US', { timeZone: 'Pacific/Honolulu' });

    // Store future time
    storedTime = futureTimeEastern;
}

// Function to flash screen
function flashScreen() {
    console.log("Flashing screen..."); // Log flashing screen
    let count = 0;
    const interval = setInterval(() => {
        document.body.style.backgroundColor = count % 2 === 0 ? 'blue' : 'red'; // Toggle between blue and red
        count++;
        if (count === 20) { // Stop after 10 seconds (40 half-second intervals)
            clearInterval(interval);
            console.log("Flashing stopped."); // Log that flashing stopped
            document.body.style.backgroundColor = 'white'; // Set background color to black
        }
    }, 500);
}

// Event listener for the store time button
storeTimeBtn.addEventListener('click', storeTime);

// Interval to update clock every second
setInterval(setClock, 1000);
