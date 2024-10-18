document.addEventListener('DOMContentLoaded', function() {
    const images = [
        {
            url: 'Eamil.images/Eamil.hero.jpg',
            headline: 'Craftsmanship at Its Finest',
            subheadline: 'Experience the Art of Leather Manufacturing'
        },
        {
            url: 'Eamil.images/Eamil.hero2.jpg',
            headline: 'Exquisite Leather Products',
            subheadline: 'Quality and Elegance in Every Piece'
        },
        {
            url: 'Eamil.images/Eamil.hero3.jpg',
            headline: 'Sustainable Practices',
            subheadline: 'Commitment to a Greener Future'
        },
        {
            url: 'Eamil.images/Eamil.hero4.jpg',
            headline: 'Dedicated Workforce',
            subheadline: 'Our People, Our Strength'
        },
        {
            url: 'Eamil.images/Eamil.hero5.jpg',
            headline: 'Innovative Manufacturing',
            subheadline: 'Leading the Way in Leather Production'
        }
    ];
    
    let currentIndex = 0;

    function updateHeroSection() {
        const heroSection = document.querySelector('.hero-section');
        const heroHeadline = document.getElementById('hero-headline');
        const heroSubheadline = document.getElementById('hero-subheadline');

        // Update the background image and text
        heroSection.style.backgroundImage = `url(${images[currentIndex].url})`;
        heroHeadline.textContent = images[currentIndex].headline;
        heroSubheadline.textContent = images[currentIndex].subheadline;

        // Ensure the section becomes visible
        heroSection.classList.add('visible');

        // Update bullets
        document.querySelectorAll('.bullet').forEach((bullet, index) => {
            bullet.classList.toggle('active', index === currentIndex);
        });
    }

    function showNextImage() {
        currentIndex = (currentIndex + 1) % images.length; // Move to the next image
        updateHeroSection(); // Update the hero section
    }

    function showPreviousImage() {
        currentIndex = (currentIndex - 1 + images.length) % images.length; // Move to the previous image
        updateHeroSection(); // Update the hero section
    }

    // Event listeners for navigation buttons
    document.getElementById('right-arrow').addEventListener('click', showNextImage);
    document.getElementById('left-arrow').addEventListener('click', showPreviousImage);

    // Event listeners for bullets
    document.querySelectorAll('.bullet').forEach((bullet, index) => {
        bullet.addEventListener('click', () => {
            currentIndex = index;
            updateHeroSection();
        });
    });

    // Initialize the hero section and set interval for automatic transition
    updateHeroSection(); // Initial update
    setInterval(showNextImage, 3000); // Change image every 3 seconds
});


const sliderContainer = document.querySelector('.slider-container');
const testimonialCards = document.querySelectorAll('.testimonial-card');
const totalSlides = testimonialCards.length;
let currentSlide = 0;
let autoSlideInterval;

const leftBtn = document.querySelector('.left-btn');
const rightBtn = document.querySelector('.right-btn');

// Function to move to the next slide
function nextSlide() {
    if (currentSlide < totalSlides - 4) {
        currentSlide += 1;
    } else {
        currentSlide = 0; // Reset to first slide
    }
    updateSlider();
    updateButtons();
}

// Function to move to the previous slide
function prevSlide() {
    if (currentSlide > 0) {
        currentSlide -= 1;
    } else {
        currentSlide = totalSlides - 4; // Go to last set of slides
    }
    updateSlider();
    updateButtons();
}

// Function to start auto sliding
function startAutoSlide() {
    autoSlideInterval = setInterval(() => {
        if (currentSlide < totalSlides - 4) {
            currentSlide += 1; // Move to the next slide
        } else {
            clearInterval(autoSlideInterval);
            setTimeout(() => {
                currentSlide = 0; // Reset to the first slide
                updateSlider();
                startAutoSlide(); // Restart auto sliding
            }, 5000); // 5 seconds pause
            return; // Exit the current iteration
        }
        updateSlider();
        updateButtons();
    }, 3000); // Change slide every 3 seconds
}

// Function to update slider position
function updateSlider() {
    const translateValue = -(currentSlide * 100) / 4; // Adjust for 4 images visible
    sliderContainer.style.transform = `translateX(${translateValue}%)`;
}

// Function to stop auto sliding
function stopAutoSlide() {
    clearInterval(autoSlideInterval);
}

// Function to update button states
function updateButtons() {
    leftBtn.disabled = currentSlide === 0;
    rightBtn.disabled = currentSlide >= totalSlides - 4;
}

// Event listeners for arrow buttons
rightBtn.addEventListener('click', () => {
    nextSlide();
    stopAutoSlide(); // Stop auto sliding when clicked
});

leftBtn.addEventListener('click', () => {
    prevSlide();
    stopAutoSlide(); // Stop auto sliding when clicked
});

// Add mouse event listeners to testimonial cards for hover effects
testimonialCards.forEach(card => {
    card.addEventListener('mouseenter', stopAutoSlide); // Stop auto slide on hover
    card.addEventListener('mouseleave', startAutoSlide); // Restart auto slide when not hovering
});

// Add mouse event listeners to arrow buttons for hover effects
[leftBtn, rightBtn].forEach(btn => {
    btn.addEventListener('mouseenter', stopAutoSlide); // Stop auto slide on hover
    btn.addEventListener('mouseleave', startAutoSlide); // Restart auto slide when not hovering
});

// Initialize the auto slide when the script loads
updateButtons(); // Initialize button states

// Intersection Observer to start auto-slide when the slider is in view
const sliderSection = document.querySelector('.slider-section'); // Assuming the section has this class

const observerOptions = {
    root: null, // null means it observes the viewport
    threshold: 0.5 // 50% of the slider section must be visible
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Start the auto-slide when the section is in view
            startAutoSlide();
        } else {
            // Stop the auto-slide when the section is out of view
            stopAutoSlide();
        }
    });
}, observerOptions);

// video section

document.addEventListener('DOMContentLoaded', () => {
    const headlines = document.querySelectorAll('.headline');
    const subtexts = document.querySelectorAll('.subtext');
    let index = 0;

    function showText() {
        // Set all headlines and subtexts to hidden
        headlines.forEach((headline) => headline.style.opacity = '0');
        subtexts.forEach((subtext) => subtext.style.opacity = '0');

        // Show the current headline and subtext
        headlines[index].style.opacity = '1';
        subtexts[index].style.opacity = '1';

        // Update index
        index = (index + 1) % headlines.length;
    }

    // Initial display
    showText();

    // Show new text every 5 seconds
    setInterval(showText, 5000);
});

// footer part

document.addEventListener("DOMContentLoaded", function () {
    // Chat window functionality
    let isChatOpen = false;

    document.getElementById("whatsappIcon").addEventListener("click", function () {
        const chatWindow = document.getElementById("chatWindow");
        const chatBody = document.getElementById("chatBody");

        if (!isChatOpen) {
            chatWindow.style.display = "block";
            isChatOpen = true;

            setTimeout(() => {
                addMessage("received", "Hi, welcome to Eamil International! How can I help you?");
            }, 1000);
        } else {
            chatWindow.style.display = "none";
            chatBody.innerHTML = "";
            isChatOpen = false;
        }
    });

    document.getElementById("closeChat").addEventListener("click", function () {
        const chatWindow = document.getElementById("chatWindow");
        const chatBody = document.getElementById("chatBody");

        chatWindow.style.display = "none";
        chatBody.innerHTML = "";
        isChatOpen = false;
    });

    // Scroll to Top Button functionality
    const scrollTopBtn = document.createElement("button");
    scrollTopBtn.id = "scrollTopBtn";
    scrollTopBtn.className = "scroll-top-btn";
    scrollTopBtn.innerHTML = "&uarr;"; // Using an upward arrow
    document.body.appendChild(scrollTopBtn);

    scrollTopBtn.addEventListener("click", function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    window.onscroll = function () {
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            scrollTopBtn.style.display = "block";
        } else {
            scrollTopBtn.style.display = "none";
        }
    };

    // Send Message Functionality
    document.getElementById("sendBtn").addEventListener("click", sendMessage);
    document.getElementById("userMessage").addEventListener("keydown", function (e) {
        if (e.key === "Enter") {
            e.preventDefault();
            sendMessage();
        }
    });

    function sendMessage() {
        const userMessage = document.getElementById("userMessage").value;
        if (userMessage.trim()) {
            addMessage("sent", userMessage);
            document.getElementById("userMessage").value = "";

            // Add typing indicator (once)
            document.getElementById("typingIndicator").style.display = "flex";

            // Simulate WhatsApp chat after 2 seconds
            setTimeout(() => {
                document.getElementById("typingIndicator").style.display = "none";
                addMessage("received", `Please <a href="https://wa.me/yourphonenumber" target="_blank">click here</a> to chat further.`);
            }, 2000);
        }
    }

    function addMessage(type, message) {
        const chatBody = document.getElementById("chatBody");
        const messageDiv = document.createElement("div");
        messageDiv.classList.add("message", type);

        const messageContent = document.createElement("p");
        messageContent.innerHTML = message;

        const timeDiv = document.createElement("div");
        timeDiv.classList.add("message-time");
        const currentTime = new Date();
        timeDiv.innerText = currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        messageDiv.appendChild(messageContent);
        messageDiv.appendChild(timeDiv);
        chatBody.appendChild(messageDiv);
        chatBody.scrollTop = chatBody.scrollHeight;

        if (type === "sent") {
            const readReceipt = document.createElement("i");
            readReceipt.classList.add("fas", "fa-check-double", "read-receipt");
            messageDiv.appendChild(readReceipt);
        }
    }
});

// newsletter

// document.addEventListener('DOMContentLoaded', function() {
//     const newsletterSignupForm = document.getElementById('newsletterSignupForm');
//     const newsletterEmail = document.getElementById('newsletterEmail');

//     if (newsletterSignupForm && newsletterEmail) {
//         newsletterSignupForm.addEventListener('submit', function(event) {
//             event.preventDefault(); // Prevent the form from submitting the traditional way

//             // Get the value of the email input field
//             const email = newsletterEmail.value;

//             // Get the current date and time in Indian time zone
//             const currentDateTime = new Date(new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" }));
//             const dateString = currentDateTime.toISOString().split('T')[0]; // Get the date as YYYY-MM-DD

//             // Create an object with email and dateTime
//             const formData = {
//                 email: email,
//                 dateTime: currentDateTime
//             };

//             // Retrieve existing emails from local storage
//             let allInquiries = JSON.parse(localStorage.getItem('newsletterData')) || {};

//             // If the date key doesn't exist, create a new array for that date
//             if (!allInquiries[dateString]) {
//                 allInquiries[dateString] = [];
//             }

//             // Add the new email and dateTime to the array for that date
//             allInquiries[dateString].push(formData);

//             // Store the updated array in local storage
//             localStorage.setItem('newsletterData', JSON.stringify(allInquiries));

//             // Display a success message
//             showAlert('Thank you for subscribing! 🎉');

//             // Clear the input field after submission
//             newsletterSignupForm.reset();
//         });

//         // Function to retrieve and log emails (for your use only)
//         function getNewsletterData() {
//             let newsletterData = JSON.parse(localStorage.getItem('newsletterData')) || {};
//             console.log(newsletterData);
//         }

//         // Call getNewsletterData to see the stored emails in the console
//         getNewsletterData();
//     } else {
//         console.error("The element with the ID 'newsletterSignupForm' or 'newsletterEmail' was not found.");
//     }
// });

// function showAlert(message) {
//     const alertBox = document.createElement('div');
//     alertBox.id = 'alertBox';
//     alertBox.textContent = message;
//     document.body.appendChild(alertBox);
//     alertBox.style.display = 'block';

//     setTimeout(() => {
//         alertBox.style.display = 'none';
//         alertBox.remove();
//     }, 5000); // Alert will disappear after 3 seconds
// }


// revised code

document.addEventListener('DOMContentLoaded', function() {
    function showAlert(message) {
        const alertBox = document.createElement('div');
        alertBox.id = 'alertBox';
        alertBox.textContent = message;
        document.body.appendChild(alertBox);
        alertBox.style.display = 'block';

        setTimeout(() => {
            alertBox.style.display = 'none';
            alertBox.remove();
        }, 5000); // Alert will disappear after 5 seconds
    }

    const newsletterSignupForm = document.getElementById('newsletterSignupForm');
    const newsletterEmail = document.getElementById('newsletterEmail');

    if (newsletterSignupForm && newsletterEmail) {
        newsletterSignupForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent the form from submitting the traditional way

            // Get the value of the email input field
            const email = newsletterEmail.value;

            // Get the current date and time in Indian time zone
            const currentDateTime = new Date(new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" }));
            const dateString = currentDateTime.toISOString().split('T')[0]; // Get the date as YYYY-MM-DD

            // Create an object with email and dateTime
            const formData = {
                email: email,
                dateTime: currentDateTime
            };

            // Retrieve existing emails from local storage
            let allInquiries = JSON.parse(localStorage.getItem('newsletterData')) || {};

            // If the date key doesn't exist, create a new array for that date
            if (!allInquiries[dateString]) {
                allInquiries[dateString] = [];
            }

            // Add the new email and dateTime to the array for that date
            allInquiries[dateString].push(formData);

            // Store the updated array in local storage
            localStorage.setItem('newsletterData', JSON.stringify(allInquiries));

            // Display a success message
            showAlert('Thank you for subscribing!');

            // Clear the input field after submission
            newsletterSignupForm.reset();
        });

        // Function to retrieve and log emails (for your use only)
        function getNewsletterData() {
            let newsletterData = JSON.parse(localStorage.getItem('newsletterData')) || {};
            console.log(newsletterData);
        }

        // Call getNewsletterData to see the stored emails in the console
        getNewsletterData();
    } else {
        console.error("The element with the ID 'newsletterSignupForm' or 'newsletterEmail' was not found.");
    }
});
