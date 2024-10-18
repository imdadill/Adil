document.addEventListener('DOMContentLoaded', function() {
    let currentIndex2 = 0;
    let autoSlideInterval;

    function showSlide(index) {
        const carouselInner = document.querySelector('.carousel-inner');
        const totalItems = document.querySelectorAll('.carousel-item').length;
        currentIndex2 = index;
        const translateValue = -(currentIndex2 * 33.33);
        carouselInner.style.transform = `translateX(${translateValue}%)`;
        if (currentIndex2 >= totalItems - 3) {
            setTimeout(() => {
                carouselInner.style.transition = 'none';
                carouselInner.style.transform = `translateX(0)`;
                currentIndex2 = 0;
                setTimeout(() => {
                    carouselInner.style.transition = 'transform 0.5s ease';
                }, 50);
            }, 500);
        }
    }

    function nextSlide() {
        const totalItems = document.querySelectorAll('.carousel-item').length;
        showSlide((currentIndex2 + 1) % totalItems);
    }

    window.pauseCarousel = function() { // Make pauseCarousel accessible globally
        clearInterval(autoSlideInterval);
    }

    window.resumeCarousel = function() { // Make resumeCarousel accessible globally
        autoSlideInterval = setInterval(() => {
            nextSlide();
        }, 3000);
    }

    resumeCarousel();
});



// form input js

document.addEventListener('DOMContentLoaded', function() {
    // Function to show alert
    function showAlert(message) {
        const alertBox = document.createElement('div');
        alertBox.id = 'alertBox';
        alertBox.textContent = message;
        document.body.appendChild(alertBox);
        alertBox.style.display = 'block';

        setTimeout(() => {
            alertBox.style.display = 'none';
            alertBox.remove();
        }, 3000); // Alert will disappear after 3 seconds
    }

    document.getElementById('customOrderForm').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the form from submitting the traditional way

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const product = document.getElementById('product').value;
        const quantity = document.getElementById('moq').value; // Get the quantity value
        const message = document.getElementById('message').value;

        // Get the current date and time in Indian time zone
        const currentDateTime = new Date(new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" }));

        const formData = {
            name: name,
            email: email,
            phone: phone,
            product: product,
            quantity: quantity, // Add quantity to the data
            message: message,
            dateTime: currentDateTime // Add the current date and time to the data
        };

        let allInquiries = JSON.parse(localStorage.getItem('allInquiries')) || {};
        const dateString = currentDateTime.toISOString().split('T')[0]; // Get the date as YYYY-MM-DD

        if (!allInquiries[dateString]) {
            allInquiries[dateString] = []; // Create a new array for each day
        }
        allInquiries[dateString].push(formData);
        localStorage.setItem('allInquiries', JSON.stringify(allInquiries));

        // Display success message
        showAlert('YOUR INQUIRY HAS BEEN SAVED SUCCESSFULLY! 🎉');

        // Log inquiries to the console
        getInquiries();

        // Clear form fields after submission
        document.getElementById('customOrderForm').reset();
    });

    function getInquiries() {
        let allInquiries = JSON.parse(localStorage.getItem('allInquiries')) || {};
        console.log(allInquiries);
    }

    // Call getInquiries to see the stored inquiries in the console
    getInquiries();
});

// FAQs for service page

function toggleAnswer(id) {
    const answer = document.querySelector(`#${id} .faq-answer`);
    answer.style.display = answer.style.display === 'block' ? 'none' : 'block';
}
