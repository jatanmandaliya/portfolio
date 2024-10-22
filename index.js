var tablinks = document.getElementsByClassName("tab-links");
var tabcontents = document.getElementsByClassName("tab-contents");

function opentab(tabname) {
    for (tablink of tablinks) {
        tablink.classList.remove("active-link");
    }
    for (tabcontent of tabcontents) {
        tabcontent.classList.remove("active-tab");
    }
    event.currentTarget.classList.add("active-link");
    document.getElementById(tabname).classList.add("active-tab")
}

var sidemenu = document.getElementById("sidemenu");

function openmenu() {
    sidemenu.style.right = "0";
}

function closemenu() {
    sidemenu.style.right = "-200px";
}

if (window.innerWidth > 1024) {
    const sections = document.querySelectorAll('.section');
    let currentSection = 0;
    let isScrolling = false; // Flag to prevent multiple scrolls
    
    // Function to scroll to a specific section
    function scrollToSection(index) {
        if (index >= 0 && index < sections.length && !isScrolling) {
            isScrolling = true; // Lock scrolling
            
            // Smoothly scroll to the target section
            sections[index].scrollIntoView({ behavior: 'smooth' });
            
            currentSection = index; // Update the current section index
            
            // Set a timeout to release the scroll lock after the smooth scroll completes
            setTimeout(() => {
                isScrolling = false; // Unlock scrolling after 1 second (smooth scroll duration)
            }, 1000); // Adjust the time if your smooth scroll duration is different
        }
    }
    
    // Event listener for scroll events (wheel or touchpad)
    window.addEventListener('wheel', function (event) {
        if (!isScrolling) { // Only trigger if no scroll is in progress
            if (event.deltaY > 0) {
                // Scroll down to next section
                scrollToSection(currentSection + 1);
            } else {
                // Scroll up to previous section
                scrollToSection(currentSection - 1);
            }
        }
    });
    
    // Touchscreen support for swiping between sections
    let touchStartY = 0;
    window.addEventListener('touchstart', function (event) {
        touchStartY = event.touches[0].clientY;
    });
} else {

}

window.addEventListener('touchmove', function (event) {
    if (!isScrolling) { // Only trigger if no scroll is in progress
        const touchEndY = event.touches[0].clientY;
        if (touchStartY - touchEndY > 50) {
            // Swipe up (move to next section)
            scrollToSection(currentSection + 1);
        } else if (touchEndY - touchStartY > 50) {
            // Swipe down (move to previous section)
            scrollToSection(currentSection - 1);
        }
    }
});


const scriptURL = 'https://script.google.com/macros/s/AKfycbzy2ISXuNmo9p4Cwmgvj1iqTdxgP4Rd7-ZArxkBuLE6YmElxyx04QJ7h5oVcoyaHIPtiw/exec'
const form = document.forms['submit-to-google-sheet']
const msg = document.getElementById("msg")

form.addEventListener('submit', e => {
    e.preventDefault()
    fetch(scriptURL, { method: 'POST', body: new FormData(form) })
        .then(response => {
            msg.innerHTML = "Message Sent Successfully :)"
            setTimeout(function () {
                msg.innerHTML = ""
            }, 5000)
            form.reset()
        })
        .catch(error => console.error('Error!', error.message))
})