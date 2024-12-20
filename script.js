document.addEventListener("DOMContentLoaded", function () {
    const calendar = document.querySelector(".calendar");
    const countdown = document.getElementById("countdown");
    const today = new Date();
    const currentDate = today.getDate();  // Day of the month (1-31)
  
    // Update the countdown
    const christmas = new Date(today.getFullYear(), 11, 25); // Christmas Day (Dec 25)
    const daysLeft = Math.ceil((christmas - today) / (1000 * 60 * 60 * 24));
    countdown.textContent = `Only ${daysLeft} days left until Christmas!`;
  
    // Create the calendar days (1 to 24)
    for (let day = 1; day <= 24; day++) {
      const dayElement = document.createElement("div");
      dayElement.classList.add("calendar-day");
  
      // Add text for the day (e.g., Day 1, Day 2)
      const daySpan = document.createElement("span");
      daySpan.textContent = `Day ${day}`;
      dayElement.appendChild(daySpan);
  
      // Check if the current day is past this one
      if (day <= currentDate) {
        // Mark the day as open and change its appearance
        dayElement.classList.add("open");
        dayElement.textContent = `Day ${day} - Opened!`;  // You can also put an image or a message here
      } else {
        // Leave the day closed if it hasn't been reached yet
        dayElement.classList.add("closed");
        dayElement.textContent = `Day ${day}`;
      }
  
      // Add event listener to open a door if clicked (only if it's not already open)
      dayElement.addEventListener("click", function () {
        if (day <= currentDate && !dayElement.classList.contains("open")) {
          alert(`You opened Day ${day}!`);
          dayElement.classList.add("open");
          dayElement.textContent = `Day ${day} - Opened!`; // Change text or show something special
        } else {
          alert("This day is not yet open!");
        }
      });
  
      // Append the day element to the calendar
      calendar.appendChild(dayElement);
    }
  });

  