// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
  // Get the shimmer preloader
  const preloader = document.querySelector(".shimmer-preloader");

  // Hide preloader when page is loaded
  window.addEventListener("load", function () {
    setTimeout(function () {
      preloader.classList.add("hidden");
      setTimeout(function () {
        preloader.remove();
      }, 400);
    }, 1500);
  });

  // Initialize AOS animation library
  if (typeof AOS !== "undefined") {
    AOS.init({
      duration: 600,
      easing: "ease-out",
      once: true,
      mirror: false,
      offset: 50,
    });
  }

  // Initialize particles background - MINIMAL PROFESSIONAL
  if (typeof particlesJS !== "undefined") {
    particlesJS("particles-js", {
      particles: {
        number: { value: 40, density: { enable: true, value_area: 800 } },
        color: { value: "#ffffff" },
        shape: { type: "circle" },
        opacity: { value: 0.2, random: true },
        size: { value: 2, random: true },
        line_linked: {
          enable: true,
          distance: 150,
          color: "#ffffff",
          opacity: 0.15,
          width: 1,
        },
        move: {
          enable: true,
          speed: 1,
          direction: "none",
          random: true,
          straight: false,
          out_mode: "out",
          bounce: false,
        },
      },
      interactivity: {
        detect_on: "canvas",
        events: {
          onhover: { enable: true, mode: "grab" },
          onclick: { enable: false },
          resize: true,
        },
        modes: {
          grab: { 
            distance: 120, 
            line_linked: { opacity: 0.3 } 
          },
        },
      },
      retina_detect: true,
    });
  }

  // Staggered animations for skills
  document.querySelectorAll(".hexagon").forEach((item, index) => {
    item.setAttribute("data-aos-delay", (index * 40).toString());
  });

  // Staggered animations for expertise cards
  document.querySelectorAll(".expertise-card").forEach((card, index) => {
    card.setAttribute("data-aos-delay", (index * 80).toString());
  });

  // Add counter animations for experience counters
  const startCounters = () => {
    document.querySelectorAll(".counter-value").forEach((counter) => {
      const target = parseInt(counter.getAttribute("data-count"));
      const duration = 2000;
      let startValue = 0;
      const increment = target / (duration / 16);

      const updateCounter = () => {
        startValue += increment;
        counter.textContent = Math.floor(startValue);
        if (startValue < target) {
          requestAnimationFrame(updateCounter);
        } else {
          counter.textContent = target;
        }
      };

      updateCounter();
    });
  };

  // Create intersection observer for counters
  const counterSection = document.querySelector(".experience-counter");
  if (counterSection) {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        startCounters();
        observer.unobserve(counterSection);
      }
    });
    observer.observe(counterSection);
  }

  // Navbar scroll effect
  const navbar = document.querySelector(".navbar");
  const navLinks = document.querySelectorAll(".nav-link");
  const sections = document.querySelectorAll("section[id]");

  window.addEventListener("scroll", function () {
    // Add shadow to navbar when scrolling
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }

    // Active link based on scroll position
    let current = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.offsetHeight;

      if (
        window.scrollY >= sectionTop &&
        window.scrollY < sectionTop + sectionHeight
      ) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href").slice(1) === current) {
        link.classList.add("active");
      }
    });
  });

  // Parallax scrolling effect
  function initParallax() {
    // Add parallax class to elements
    document.querySelectorAll(".parallax-element").forEach((element) => {
      if (!element.getAttribute("data-speed")) {
        element.setAttribute("data-speed", "-0.1");
      }
    });

    // Create minimal decorative elements in the hero section
    const heroSection = document.getElementById("hero");
    if (heroSection) {
      for (let i = 0; i < 3; i++) {
        const circle = document.createElement("div");
        circle.className = "decorative-circle parallax-element";
        circle.style.width = `${Math.random() * 120 + 80}px`;
        circle.style.height = circle.style.width;
        circle.style.left = `${Math.random() * 100}%`;
        circle.style.top = `${Math.random() * 100}%`;
        circle.style.opacity = `${Math.random() * 0.2 + 0.05}`;
        circle.setAttribute(
          "data-speed",
          (Math.random() * 0.3 - 0.15).toFixed(2)
        );
        heroSection.appendChild(circle);
      }
    }

    // Parallax effect on scroll
    window.addEventListener("scroll", () => {
      const scrollY = window.scrollY;

      document.querySelectorAll(".parallax-element").forEach((element) => {
        const speed = element.getAttribute("data-speed") || -0.1;
        element.style.transform = `translateY(${scrollY * speed}px)`;
      });
    });
  }

  // Initialize parallax
  initParallax();

  // Page transitions
  function initPageTransitions() {
    // Create transition overlay
    const transitionOverlay = document.createElement("div");
    transitionOverlay.className = "page-transition-overlay";
    document.body.appendChild(transitionOverlay);

    // Add transitions to nav links
    document.querySelectorAll('a[href^="#"]').forEach((link) => {
      link.addEventListener("click", (e) => {
        const target = link.getAttribute("href");
        if (target === "#") return;

        e.preventDefault();

        // Start transition
        transitionOverlay.classList.add("active");
        document.body.classList.add("animating");

        setTimeout(() => {
          // Navigate to section
          const targetElement = document.querySelector(target);
          if (targetElement) {
            const offset = 80;
            const targetPosition = targetElement.offsetTop - offset;

            window.scrollTo({
              top: targetPosition,
              behavior: "auto",
            });
          }

          // End transition
          transitionOverlay.classList.add("exit");

          setTimeout(() => {
            transitionOverlay.classList.remove("active");
            transitionOverlay.classList.remove("exit");
            document.body.classList.remove("animating");
          }, 500);
        }, 500);
      });
    });
  }

  // Initialize page transitions
  initPageTransitions();

  // Reveal sections on scroll
  function revealSections() {
    const sections = document.querySelectorAll("section");

    const checkVisibility = () => {
      sections.forEach((section) => {
        const sectionTop = section.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if (sectionTop < windowHeight * 0.8) {
          section.classList.add("visible");
        }
      });
    };

    // Initial reveal
    checkVisibility();

    // Reveal on scroll
    window.addEventListener("scroll", checkVisibility);
  }

  // Initialize section revealing
  revealSections();

  // Contact form submission
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Get form values
      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const message = document.getElementById("message").value;
      const timestamp = new Date().toISOString();

      // Show loading state
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalBtnText = submitBtn.textContent;
      submitBtn.textContent = "Sending...";
      submitBtn.disabled = true;

      // Replace with your Google Sheet Web App URL
      const scriptURL = "YOUR_SCRIPT_URL_HERE";
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("message", message);
      formData.append("timestamp", timestamp);

      // Send data to Google Sheets
      fetch(scriptURL, { method: "POST", body: formData })
        .then((response) => {
          console.log("Success!", response);

          // Display success message
          const alertDiv = document.createElement("div");
          alertDiv.className = "alert alert-success mt-3";
          alertDiv.style.cssText = "padding: 1rem; background: rgba(37, 99, 235, 0.1); border: 1px solid rgba(37, 99, 235, 0.3); border-radius: 6px; color: #fff;";
          alertDiv.textContent = "Message sent successfully! I'll get back to you soon.";
          contactForm.insertAdjacentElement("afterend", alertDiv);

          // Reset form
          contactForm.reset();

          // Remove alert after 5 seconds
          setTimeout(() => {
            alertDiv.remove();
          }, 5000);
        })
        .catch((error) => {
          console.error("Error!", error.message);

          // Display error message
          const alertDiv = document.createElement("div");
          alertDiv.className = "alert alert-danger mt-3";
          alertDiv.style.cssText = "padding: 1rem; background: rgba(239, 68, 68, 0.1); border: 1px solid rgba(239, 68, 68, 0.3); border-radius: 6px; color: #fff;";
          alertDiv.textContent = "Failed to send message. Please contact me directly at jatanmandaliya@gmail.com";
          contactForm.insertAdjacentElement("afterend", alertDiv);

          // Remove alert after 5 seconds
          setTimeout(() => {
            alertDiv.remove();
          }, 5000);
        })
        .finally(() => {
          // Reset button state
          submitBtn.textContent = originalBtnText;
          submitBtn.disabled = false;
        });
    });
  }

  // Project carousel custom navigation
  const projectCarousel = document.getElementById("projectCarousel");
  if (projectCarousel) {
    // Initialize the carousel with options
    const carousel = new bootstrap.Carousel(projectCarousel, {
      interval: 5000,
      wrap: true,
      touch: true,
    });

    // Add keyboard navigation for the carousel
    document.addEventListener("keydown", function (e) {
      if (e.key === "ArrowLeft") {
        carousel.prev();
      } else if (e.key === "ArrowRight") {
        carousel.next();
      }
    });
  }

  // Add typing animation to hero title (optional - subtle)
  const heroTitle = document.querySelector(".hero-title");
  if (heroTitle) {
    const text = heroTitle.textContent;
    heroTitle.textContent = "";

    let i = 0;
    const typingSpeed = 80;

    function typeWriter() {
      if (i < text.length) {
        heroTitle.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, typingSpeed);
      }
    }

    // Start typing animation after a slight delay
    setTimeout(typeWriter, 800);
  }

  // Add hover effects for skill items
  const hexagonItems = document.querySelectorAll(".hexagon");
  hexagonItems.forEach((item) => {
    item.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-8px)";
    });

    item.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0)";
    });
  });
});
