document.getElementById('hamburger').addEventListener('click', function () {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('active');
});
document.querySelectorAll('.toggle-content').forEach(header => {
    header.addEventListener('click', function () {
        const targetId = this.getAttribute('data-target');
        const targetContent = document.querySelector(targetId);
        targetContent.classList.toggle('hidden-content');

        // Toggle display style
        targetContent.style.display = targetContent.style.display === 'block' ? 'none' : 'block';
    });
});
// JavaScript for Review Carousel

let currentReview = 0;
const reviews = document.querySelectorAll('.review');

// Show the current review
function showReview(n) {
    reviews.forEach((review, index) => {
        review.classList.remove('active'); // Hide all reviews
        review.style.display = 'none'; // Ensure they're not displayed
    });

    reviews[n].classList.add('active'); // Show the current review
    reviews[n].style.display = 'block'; // Set display to block
}

// Change the current review (prev/next)
function changeReview(n) {
    currentReview += n;

    if (currentReview >= reviews.length) {
        currentReview = 0; // Loop back to the first review
    } else if (currentReview < 0) {
        currentReview = reviews.length - 1; // Loop to the last review
    }

    showReview(currentReview);
}

// Initialize the first review to be shown
showReview(currentReview);
