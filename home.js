// Initialize AOS Library
AOS.init();

// Hide loader after page load
window.addEventListener('load', () => {
    document.getElementById('loader').style.display = 'none';
});

// Scroll Effect for Navbar
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Toggle Navbar for Mobile
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Back to Top Button
const backToTop = document.getElementById("back-to-top");
window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
        backToTop.style.display = "block"; // إظهار الزر عند التمرير لأسفل
    } else {
        backToTop.style.display = "none"; // إخفاء الزر عند العودة إلى الأعلى
    }
});

backToTop.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth" // تمرير ناعم إلى الأعلى
    });
});

// Dark Mode Toggle Button
const darkModeToggle = document.getElementById("darkModeToggle");
darkModeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode"); // تفعيل أو تعطيل الوضع المظلم
    const moonIcon = darkModeToggle.querySelector(".icon");
    if (document.body.classList.contains("dark-mode")) {
        moonIcon.classList.remove("fa-moon"); // إزالة أيقونة القمر
        moonIcon.classList.add("fa-sun"); // إضافة أيقونة الشمس
    } else {
        moonIcon.classList.remove("fa-sun"); // إزالة أيقونة الشمس
        moonIcon.classList.add("fa-moon"); // إضافة أيقونة القمر
    }
});
// Search Bar Functionality
const searchForm = document.querySelector('.search-bar');
searchForm.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent form submission
    const query = searchForm.querySelector('input').value.trim();
    if (query) {
        alert(`You searched for: ${query}`);
        // You can replace the alert with actual search functionality
    } else {
        alert('Please enter a search term.');
    }
});

// Dynamic Podcast Filtering (Optional)
function filterPodcasts(category) {
    const podcastItems = document.querySelectorAll('.podcast-item');
    podcastItems.forEach(item => {
        const title = item.querySelector('h4').textContent.toLowerCase();
        if (category === 'all' || title.includes(category)) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const category = button.getAttribute('data-category');
            filterPodcasts(category);
        });
    });

    // Handle User Authentication State
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const authButtons = document.getElementById('auth-buttons');
    const profileLink = document.getElementById('profile-link');
    const welcomeMessage = document.getElementById('welcome-message');

    if (isLoggedIn === 'true') {
        // Hide auth buttons and show profile link
        authButtons.style.display = 'none';
        profileLink.style.display = 'flex';

        // Update welcome message
        if (welcomeMessage) {
            welcomeMessage.textContent = 'مرحبًا بك مرة أخرى!';
        }
    } else {
        // Show auth buttons and hide profile link
        authButtons.style.display = 'flex';
        profileLink.style.display = 'none';
    }

    // Simulate Logout
    function simulateLogout() {
        localStorage.removeItem('isLoggedIn'); // Remove login state
        window.location.href = 'home.html'; // Redirect to home page
    }

    // Attach logout functionality to the logout button
    const logoutBtn = document.querySelector('.logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', simulateLogout);
    }
});

// Handle Contact Form Submission
const contactForm = document.querySelector('.contact-form');
const popup = document.getElementById('popup');
const closeBtn = document.querySelector('.close-btn');
const closePopupBtn = document.getElementById('close-popup');

contactForm.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent form submission

    // Get form values
    const name = contactForm.querySelector('#name').value.trim();
    const email = contactForm.querySelector('#email').value.trim();
    const message = contactForm.querySelector('#message').value.trim();

    if (name && email && message) {
        // Show the popup
        popup.style.display = 'flex';
        // Reset the form after submission
        contactForm.reset();
    } else {
        alert('يرجى ملء جميع الحقول.');
    }
});

// Close the popup when clicking the close button or outside the popup
closeBtn.addEventListener('click', () => {
    popup.style.display = 'none';
});

closePopupBtn.addEventListener('click', () => {
    popup.style.display = 'none';
});

// Close the popup when clicking outside of it
window.addEventListener('click', (event) => {
    if (event.target === popup) {
        popup.style.display = 'none';
    }
});
document.addEventListener("DOMContentLoaded", function () {
    const listenButtons = document.querySelectorAll(".listen-btn");

    listenButtons.forEach(button => {
        button.addEventListener("click", function (event) {
            event.preventDefault();

            const podcastItem = button.closest(".podcast-item");
            const playlistTitle = podcastItem.querySelector("h4").innerText;

            // تحويل العنوان إلى slug
            const slug = playlistTitle
                .toLowerCase()
                .replace(/\s+/g, "-") // استبدال المسافات بـ "-"
                .replace(/[^a-z0-9-]/g, ""); // إزالة أي رموز خاصة

            console.log("🔹 تحويل العنوان:", playlistTitle, "➡️", slug); // فحص التحويل

            window.location.href = `player.html?playlist=${encodeURIComponent(slug)}`;
        });
    });
});
