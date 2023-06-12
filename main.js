const dateInput = document.querySelectorAll(".date")


// Current date
const presentDate = new Date()
const presentYear = presentDate.getFullYear()
const presentMonth = presentDate.getMonth()
const presentDay = presentDate.getDate()

// Inputs
const inputYear = document.querySelector('input[data-date-input="year"]')
const inputMonth = document.querySelector('input[data-date-input="month"]')
const inputDay = document.querySelector('input[data-date-input="day"]')

// Errors
const errorYear = document.querySelector('p[data-date-error="year"]')
const errorMonth = document.querySelector('p[data-date-error="month"]')
const errorDay = document.querySelector('p[data-date-error="day"]')

// Displays
const displayYear = document.querySelector('span[data-display="year"]')
const displayMonth = document.querySelector('span[data-display="month"]')
const displayDay = document.querySelector('span[data-display="day"]')

const calculateButton = document.getElementById('caclulate-button')
calculateButton.addEventListener("click", function() {validateInput()})

function calculateAge(year, month, day) {
    let yearsDiff = presentYear - year
    let monthsDiff = presentMonth + 1 - month
    let daysDiff = presentDay - day

    if(daysDiff < 0) {
        monthsDiff--
        daysDiff += getMaxDays(year, month+1)
    }

    if(monthsDiff < 0) {
        yearsDiff--
        monthsDiff += 12
    }

    displayAge(yearsDiff, monthsDiff, daysDiff)
}

function validateInput() {
    let validDate = 0

    const dates = ["year", "month", "day"]

    dates.forEach(date => {
        const title = document.querySelector(`p[data-date-title="${date}"]`)
        const input = document.querySelector(`input[data-date-input="${date}"]`)
        const error = document.querySelector(`p[data-date-error="${date}"]`)

        let present = 1
        let max

        title.style.color = "hsl(0, 100%, 67%)"
        input.style.borderColor = "hsl(0, 100%, 67%)"

        switch (date) {
            case "year":
                present = presentYear
                max = presentYear
                break;
            case "month":
                present = presentMonth
                max = 12
                break;
            case "day":
                present = presentDay
                max = getMaxDays(inputYear.value, inputMonth.value < 12 ? inputMonth.value : 12)
                break;
        }

        if(input.value < 1 || (input.value > max && date != "year")) {
            error.innerText = "Must be a valid " + date
        } else if(date == "year" && input.value > max) {
            error.innerText = "Must be in the past"
        } else if(input.value == "") {
            error.innerText = "This field is required"
        } else {
            title.style.color = "hsl(0, 1%, 44%)"
            input.style.borderColor = "hsl(0, 0%, 86%)"
            error.innerText = ""
            validDate++
        }
    });

    if(validDate == 3) {
        calculateAge(inputYear.value, inputMonth.value, inputDay.value)
    }
}

function getMaxDays(year, month) {
    let date = new Date(year, month, 0);
    let maxDay = date.getDate();
    return maxDay;
}

let intervals = []
function displayAge(year, month, day) {
    intervals.forEach(i => clearInterval(i))
    startCountAnimation(0, year, 2000, displayYear)
    startCountAnimation(0, month, 2000, displayMonth)
    startCountAnimation(0, day, 2000, displayDay)
}

// Count animation
function startCountAnimation(start, end, duration, elem) {
    const range = end - start;
    let currentTime = 0;

    const timer = setInterval(() => {
        intervals.push(timer)
        currentTime += 10;
        const currentValue = easeInOut(currentTime, start, range, duration);
        elem.innerText = Math.round(currentValue)

        if (currentTime >= duration) {
            clearInterval(timer);
        }
    }, 10);
}

// Timing function
function easeInOut(currentTime, start, range, duration) {
    const timeFraction = currentTime / duration;
    const easingCoefficient = 0.5 * (1 - Math.cos(Math.PI * timeFraction));
    return start + range * easingCoefficient;
}