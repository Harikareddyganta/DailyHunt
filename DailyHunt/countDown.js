function updateClock() {
    const now = new Date();

    // Calculate the start of the next day
    const endOfDay = new Date();
    endOfDay.setHours(24, 0, 0, 0); // Sets the time to 24:00 of the current day

    // If it's after 24:00, set endOfDay to the start of the next day
    if (now.getHours() >= 24) {
        endOfDay.setDate(endOfDay.getDate() + 1);
    }

    // Calculate remaining time until the end of the day
    const timeRemaining = endOfDay - now;

    if (timeRemaining <= 0) {
        document.getElementById('clock').textContent = '00:00:00';
        return;
    }

    const hours = Math.floor((timeRemaining / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((timeRemaining / (1000 * 60)) % 60);
    const seconds = Math.floor((timeRemaining / 1000) % 60);

    document.getElementById('clock').textContent = 
        String(hours).padStart(2, '0') + ':' + 
        String(minutes).padStart(2, '0') + ':' + 
        String(seconds).padStart(2, '0');
}

// Update the clock every second
updateClock(); // Initial call
setInterval(updateClock, 1000);
