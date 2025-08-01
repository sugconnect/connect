// Mobile Navigation Toggle
document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.querySelector(".hamburger")
  const navMenu = document.querySelector(".nav-menu")

  if (hamburger && navMenu) {
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("active")
      navMenu.classList.toggle("active")
    })

    // Close menu when clicking on a link
    document.querySelectorAll(".nav-menu a").forEach((link) => {
      link.addEventListener("click", () => {
        hamburger.classList.remove("active")
        navMenu.classList.remove("active")
      })
    })
  }

  // Image Slider Functionality
  initializeSlider()

  // News Filters
  initializeNewsFilters()

  // Calendar Functionality
  initializeCalendar()

  // Contact Form
  initializeContactForm()
})

// Image Slider
let currentSlideIndex = 0
const slides = document.querySelectorAll(".slide")
const dots = document.querySelectorAll(".dot")

function initializeSlider() {
  if (slides.length === 0) return

  // Auto-advance slides
  setInterval(() => {
    changeSlide(1)
  }, 5000)
}

function changeSlide(direction) {
  if (slides.length === 0) return

  slides[currentSlideIndex].classList.remove("active")
  if (dots.length > 0) {
    dots[currentSlideIndex].classList.remove("active")
  }

  currentSlideIndex += direction

  if (currentSlideIndex >= slides.length) {
    currentSlideIndex = 0
  } else if (currentSlideIndex < 0) {
    currentSlideIndex = slides.length - 1
  }

  slides[currentSlideIndex].classList.add("active")
  if (dots.length > 0) {
    dots[currentSlideIndex].classList.add("active")
  }
}

function currentSlide(index) {
  if (slides.length === 0) return

  slides[currentSlideIndex].classList.remove("active")
  if (dots.length > 0) {
    dots[currentSlideIndex].classList.remove("active")
  }

  currentSlideIndex = index - 1

  slides[currentSlideIndex].classList.add("active")
  if (dots.length > 0) {
    dots[currentSlideIndex].classList.add("active")
  }
}

// News Filters
function initializeNewsFilters() {
  const filterButtons = document.querySelectorAll(".filter-btn")
  const newsItems = document.querySelectorAll(".news-item")

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // Remove active class from all buttons
      filterButtons.forEach((btn) => btn.classList.remove("active"))
      // Add active class to clicked button
      button.classList.add("active")

      const filter = button.getAttribute("data-filter")

      newsItems.forEach((item) => {
        if (filter === "all" || item.getAttribute("data-category") === filter) {
          item.style.display = "grid"
        } else {
          item.style.display = "none"
        }
      })
    })
  })
}

// Calendar Functionality
let currentMonth = new Date().getMonth()
let currentYear = new Date().getFullYear()

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]

function initializeCalendar() {
  const calendarBody = document.getElementById("calendarBody")
  if (calendarBody) {
    generateCalendar()
  }
}

function generateCalendar() {
  const calendarBody = document.getElementById("calendarBody")
  const currentMonthElement = document.getElementById("currentMonth")

  if (!calendarBody || !currentMonthElement) return

  currentMonthElement.textContent = `${months[currentMonth]} ${currentYear}`

  // Clear previous calendar
  calendarBody.innerHTML = ""

  // Get first day of month and number of days
  const firstDay = new Date(currentYear, currentMonth, 1).getDay()
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate()
  const daysInPrevMonth = new Date(currentYear, currentMonth, 0).getDate()

  // Add previous month's trailing days
  for (let i = firstDay - 1; i >= 0; i--) {
    const dayElement = document.createElement("div")
    dayElement.className = "calendar-day other-month"
    dayElement.textContent = daysInPrevMonth - i
    calendarBody.appendChild(dayElement)
  }

  // Add current month's days
  for (let day = 1; day <= daysInMonth; day++) {
    const dayElement = document.createElement("div")
    dayElement.className = "calendar-day"
    dayElement.textContent = day

    // Add event indicators for specific dates (example)
    if ([5, 12, 18, 25].includes(day)) {
      dayElement.classList.add("has-event")
    }

    calendarBody.appendChild(dayElement)
  }

  // Add next month's leading days
  const totalCells = calendarBody.children.length
  const remainingCells = 42 - totalCells // 6 rows × 7 days = 42 cells

  for (let day = 1; day <= remainingCells; day++) {
    const dayElement = document.createElement("div")
    dayElement.className = "calendar-day other-month"
    dayElement.textContent = day
    calendarBody.appendChild(dayElement)
  }
}

function previousMonth() {
  currentMonth--
  if (currentMonth < 0) {
    currentMonth = 11
    currentYear--
  }
  generateCalendar()
}

function nextMonth() {
  currentMonth++
  if (currentMonth > 11) {
    currentMonth = 0
    currentYear++
  }
  generateCalendar()
}

// Contact Form
function initializeContactForm() {
  const contactForm = document.getElementById("contactForm")

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault()

      // Get form data
      const formData = new FormData(contactForm)
      const data = Object.fromEntries(formData)

      // Basic validation
      if (!data.name || !data.email || !data.subject || !data.message) {
        alert("Please fill in all required fields.")
        return
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(data.email)) {
        alert("Please enter a valid email address.")
        return
      }

      // Simulate form submission
      alert("Thank you for your message! We will get back to you soon.")
      contactForm.reset()

      // In a real application, you would send this data to your server
      console.log("Form submitted:", data)
    })
  }
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})

// Add loading animation for images
document.addEventListener("DOMContentLoaded", () => {
  const images = document.querySelectorAll("img")

  images.forEach((img) => {
    img.addEventListener("load", function () {
      this.style.opacity = "1"
    })

    // Set initial opacity
    img.style.opacity = "0"
    img.style.transition = "opacity 0.3s ease"
  })
})
