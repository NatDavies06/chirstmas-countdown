document.addEventListener("DOMContentLoaded", function () {
    const calendar = document.querySelector(".calendar");
    const countdown = document.getElementById("countdown");
    const today = new Date();
    // day of the month (1 to 31)
    const currentDate = today.getDate();
  
    // Update the countdown
    const christmas = new Date(today.getFullYear(), 11, 25); // Christmas Day (Dec 25)
    const daysLeft = Math.ceil((christmas - today) / (1000 * 60 * 60 * 24));

    if (currentDate === 25) {
        countdown.textContent = "Merry Christmas!";
    } else {
      countdown.textContent = `Only ${daysLeft} days left until Christmas!`;
    }

    // Create the calendar days (1 to 25)
    for (let day = 1; day <= 25; day++) {
      const dayElement = document.createElement("div");
      dayElement.classList.add("calendar-day");
  
      // Add text for the day (Day 1, Day 2)
      const daySpan = document.createElement("span");
      daySpan.textContent = `Day ${day}`;
      dayElement.appendChild(daySpan);
  
  
      if (day < 25) {
        // Check if the current day is past this one
        if (day <= currentDate) {
            // Mark the day as open and change its appearance
            dayElement.classList.add("open");
            dayElement.textContent = `Day ${day} - Opened!`; // You can also put an image or a message here
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
          dayElement.textContent = `Day ${day} - Opened!`;
        } else {
          alert("This day is not yet open!");
        }
      });
    } else if (day === 25) {
      // Special handling for Christmas Day
      dayElement.textContent = "Merry Christmas!";
      dayElement.classList.add("christmas-day");
    }

  
      calendar.appendChild(dayElement);
  }
  
    // Snow effects
    const snowContainer = document.querySelector(".snow-container");
    const particlesPerThousandPixels = 0.1;

    const fallSpeed = 1.25;
    const pauseWhenNotActive = true;
    const maxSnowflakes = 200;
    const snowflakes = [];

    let snowflakeInterval;
    let isTabActive = true;

    function resetSnowflake(snowflake) {
        const size = Math.random() * 5 + 1;
        // snowflake size
        const viewportWidth = window.innerWidth - size;
        const viewportHeight = window.innerHeight;

        snowflake.style.width = `${size}px`;
        snowflake.style.height = `${size}px`;
        snowflake.style.left = `${Math.random() * 
         // Constrain within viewport width
          viewportWidth}px`;
        snowflake.style.top = `-${size}px`;

        const animationDuration = (Math.random() * 3 + 2) / fallSpeed;
        snowflake.style.animationDuration = `${animationDuration}s`;
        snowflake.style.animationTimingFunction = "linear";
        snowflake.style.animationName =
            Math.random() < 0.5 ? "fall" : "diagonal-fall";

        setTimeout(() => {
            if (parseInt(snowflake.style.top, 10) < viewportHeight) {
                resetSnowflake(snowflake);
            } else {
              // Remove when it goes off the bottom edge
                snowflake.remove(); 
            }
        }, animationDuration * 1000);
    }

    function createSnowflake() {
        if (snowflakes.length < maxSnowflakes) {
            const snowflake = document.createElement("div");
            snowflake.classList.add("snowflake");
            snowflakes.push(snowflake);
            snowContainer.appendChild(snowflake);
            resetSnowflake(snowflake);
        }
    }

    function generateSnowflakes() {
        const numberOfParticles =
            Math.ceil((window.innerWidth * window.innerHeight) / 1000) *
            particlesPerThousandPixels;
        const interval = 5000 / numberOfParticles;

        clearInterval(snowflakeInterval);
        snowflakeInterval = setInterval(() => {
            if (isTabActive && snowflakes.length < maxSnowflakes) {
                requestAnimationFrame(createSnowflake);
            }
        }, interval);
    }

    function handleVisibilityChange() {
        if (!pauseWhenNotActive) return;

        isTabActive = !document.hidden;
        if (isTabActive) {
            generateSnowflakes();
        } else {
            clearInterval(snowflakeInterval);
        }
    }

    generateSnowflakes();

    window.addEventListener("resize", () => {
        clearInterval(snowflakeInterval);
        setTimeout(generateSnowflakes, 1000);
    });

    document.addEventListener("visibilitychange", handleVisibilityChange);
});


  