/**
 * THE BEAUTY BAR - PREMIUM SALON & BRIDAL STUDIO
 * CORE INTERACTION ENGINE (VANILLA JS)
 */

document.addEventListener("DOMContentLoaded", () => {
  
  // ==========================================================================
  // 1. MOBILE NAVIGATION & DRAWER TOGGLE
  // ==========================================================================
  const navToggle = document.getElementById("nav-toggle");
  const navMenu = document.getElementById("nav-menu");
  const navLinks = document.querySelectorAll(".nav-link");

  if (navToggle && navMenu) {
    navToggle.addEventListener("click", () => {
      navToggle.classList.toggle("open");
      navMenu.classList.toggle("active");
    });

    // Close menu when clicking on any link
    navLinks.forEach(link => {
      link.addEventListener("click", () => {
        navToggle.classList.remove("open");
        navMenu.classList.remove("active");
        
        // Update active class on links
        navLinks.forEach(l => l.classList.remove("active"));
        link.classList.add("active");
      });
    });
  }


  // ==========================================================================
  // 2. SCROLL INDICATORS & STICKY HEADER
  // ==========================================================================
  const header = document.getElementById("header");
  const scrollToTopBtn = document.getElementById("scroll-to-top");

  window.addEventListener("scroll", () => {
    const scrollPos = window.scrollY;

    // Sticky header shrink state
    if (scrollPos > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }

    // Scroll to top button visibility trigger
    if (scrollPos > 400) {
      scrollToTopBtn.classList.add("active");
    } else {
      scrollToTopBtn.classList.remove("active");
    }
  });

  // Smooth scroll back to top on click
  if (scrollToTopBtn) {
    scrollToTopBtn.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
  }


  // ==========================================================================
  // 3. DYNAMIC SERVICES FILTERING (TABS INTERACTION)
  // ==========================================================================
  const tabButtons = document.querySelectorAll(".tab-btn");
  const serviceCards = document.querySelectorAll(".service-card");

  tabButtons.forEach(button => {
    button.addEventListener("click", () => {
      // Remove active class from all buttons
      tabButtons.forEach(btn => btn.classList.remove("active"));
      // Add active state to clicked tab
      button.classList.add("active");

      const targetCategory = button.getAttribute("data-target");

      serviceCards.forEach(card => {
        const cardCategory = card.getAttribute("data-category");

        // Handle animation transition out first
        card.style.opacity = "0";
        card.style.transform = "scale(0.95)";

        setTimeout(() => {
          if (targetCategory === "all" || cardCategory === targetCategory) {
            card.style.display = "flex";
            // Tiny timeout to trigger transition in smoothly
            setTimeout(() => {
              card.style.opacity = "1";
              card.style.transform = "scale(1)";
            }, 50);
          } else {
            card.style.display = "none";
          }
        }, 250);
      });
    });
  });


  // ==========================================================================
  // 4. ANIMATED TESTIMONIALS SLIDER
  // ==========================================================================
  const slides = document.querySelectorAll(".testimonial-slide");
  const dots = document.querySelectorAll(".dot");
  const prevBtn = document.getElementById("slider-prev");
  const nextBtn = document.getElementById("slider-next");
  let currentSlideIndex = 0;
  const totalSlides = slides.length;
  let autoplayTimer;

  function showSlide(index) {
    // Range protection
    if (index >= totalSlides) {
      currentSlideIndex = 0;
    } else if (index < 0) {
      currentSlideIndex = totalSlides - 1;
    } else {
      currentSlideIndex = index;
    }

    // Deactivate all slides & dots
    slides.forEach(slide => slide.classList.remove("active"));
    dots.forEach(dot => dot.classList.remove("active"));

    // Activate selected slide and its corresponding dot
    slides[currentSlideIndex].classList.add("active");
    if (dots[currentSlideIndex]) {
      dots[currentSlideIndex].classList.add("active");
    }

    // Reset autoplay timer whenever slide is explicitly changed
    resetAutoplay();
  }

  // Navigation Arrow clicks
  if (prevBtn && nextBtn) {
    prevBtn.addEventListener("click", () => {
      showSlide(currentSlideIndex - 1);
    });

    nextBtn.addEventListener("click", () => {
      showSlide(currentSlideIndex + 1);
    });
  }

  // Dot indicators click
  dots.forEach(dot => {
    dot.addEventListener("click", (e) => {
      const targetIndex = parseInt(e.target.getAttribute("data-index"), 10);
      showSlide(targetIndex);
    });
  });

  // Testimonials autoplay
  function startAutoplay() {
    autoplayTimer = setInterval(() => {
      showSlide(currentSlideIndex + 1);
    }, 5500); // Transitions every 5.5 seconds
  }

  function resetAutoplay() {
    clearInterval(autoplayTimer);
    startAutoplay();
  }

  // Initiate Autoplay
  if (totalSlides > 0) {
    startAutoplay();
  }


  // ==========================================================================
  // 5. LUXURY RESERVATIONS MODAL TOGGLES & AUTOMATION
  // ==========================================================================
  const modal = document.getElementById("booking-modal");
  const closeModalBtn = document.getElementById("close-modal-btn");
  const openModalBtns = document.querySelectorAll(".open-booking-modal");
  const serviceBookBtns = document.querySelectorAll(".service-book-btn");
  const sigBookBtns = document.querySelectorAll(".sig-book-btn");
  const selectModalService = document.getElementById("modal-service");

  // Open modal generic setup
  function openBookingModal(preSelectedService = "") {
    if (modal) {
      modal.classList.add("active");
      document.body.style.overflow = "hidden"; // Prevent background body scroll

      // If a specific service was passed, select it automatically in dropdown
      if (preSelectedService && selectModalService) {
        // Run through options to match value or text
        for (let i = 0; i < selectModalService.options.length; i++) {
          const option = selectModalService.options[i];
          if (option.value === preSelectedService || option.text.includes(preSelectedService)) {
            selectModalService.selectedIndex = i;
            break;
          }
        }
      }
    }
  }

  function closeBookingModal() {
    if (modal) {
      modal.classList.remove("active");
      document.body.style.overflow = ""; // Restore scrolling behavior
    }
  }

  // Generic trigger buttons click
  openModalBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      openBookingModal();
    });
  });

  // Services-specific book buttons clicks - Auto open modal with category choice preselected
  serviceBookBtns.forEach(btn => {
    btn.addEventListener("click", (e) => {
      const selectedService = e.target.getAttribute("data-service");
      openBookingModal(selectedService);
    });
  });

  // Signature Package-specific book clicks
  sigBookBtns.forEach(btn => {
    btn.addEventListener("click", (e) => {
      const selectedPackage = e.target.getAttribute("data-service");
      openBookingModal(selectedPackage);
    });
  });

  // Close triggers
  if (closeModalBtn) {
    closeModalBtn.addEventListener("click", closeBookingModal);
  }

  // Close modal when backing out by clicking dark blurry overlay
  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        closeBookingModal();
      }
    });

    // Close on pressing Escape key on keyboard
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && modal.classList.contains("active")) {
        closeBookingModal();
      }
    });
  }


  // ==========================================================================
  // 6. WHATSAPP INQUIRY FORMATTERS & FORM HANDLERS
  // ==========================================================================
  const WHATSAPP_NUMBER = "923411111005"; // Target Shop Phone & WhatsApp
  const contactForm = document.getElementById("contact-booking-form");
  const modalForm = document.getElementById("modal-booking-form");

  /**
   * Helper function to formats fields into a gorgeous, readable billing outline
   */
  function buildWhatsAppMessage(name, phone, service, date, notes = "") {
    let msg = `✨ *APPOINTMENT RESERVATION - THE BEAUTY BAR* ✨\n\n`;
    msg += `👤 *Client Name:* ${name}\n`;
    msg += `📱 *WhatsApp Phone:* ${phone}\n`;
    msg += `💅 *Beauty Service:* ${service}\n`;
    msg += `📅 *Preferred Date:* ${date}\n`;
    
    if (notes.trim()) {
      msg += `📝 *Notes/Requests:* ${notes.trim()}\n`;
    }
    
    msg += `\nHello! I would like to confirm my booking. Please check availability and confirm back! Thank you.`;
    
    // Elegant URL Encoding
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
  }

  // Main Section Contact Booking form submission
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = document.getElementById("form-name").value;
      const phone = document.getElementById("form-phone").value;
      const service = document.getElementById("form-service").value;
      const date = document.getElementById("form-date").value;
      const notes = document.getElementById("form-notes").value;

      // Build target Whatsapp URL and redirect
      const whatsappUrl = buildWhatsAppMessage(name, phone, service, date, notes);
      
      // Open in a new tab
      window.open(whatsappUrl, "_blank", "noopener,noreferrer");
      
      // Reset form after a small layout delay
      setTimeout(() => {
        contactForm.reset();
      }, 1000);
    });
  }

  // Modal form booking submission
  if (modalForm) {
    modalForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = document.getElementById("modal-name").value;
      const phone = document.getElementById("modal-phone").value;
      const service = document.getElementById("modal-service").value;
      const date = document.getElementById("modal-date").value;
      
      // Build WhatsApp URL
      const whatsappUrl = buildWhatsAppMessage(name, phone, service, date);

      // Close modal first
      closeBookingModal();

      // Open WhatsApp link in new tab
      window.open(whatsappUrl, "_blank", "noopener,noreferrer");

      // Reset modal form
      setTimeout(() => {
        modalForm.reset();
      }, 1000);
    });
  }


  // ==========================================================================
  // 7. PREVENT RE-SUBMISSION ON DATE INPUT OUTLINES
  // ==========================================================================
  // Automatically restrict dates to prevent selecting historic days for appointments
  const dateInputs = document.querySelectorAll('input[type="date"]');
  const today = new Date();
  const year = today.getFullYear();
  let month = today.getMonth() + 1;
  let day = today.getDate();

  // Padding
  if (month < 10) month = `0${month}`;
  if (day < 10) day = `0${day}`;

  const minDateFormatted = `${year}-${month}-${day}`;
  
  dateInputs.forEach(input => {
    input.setAttribute("min", minDateFormatted);
  });


  // ==========================================================================
  // 8. ON-VIEW INTERSECTION OBSERVER FOR LUXURIOUS ENTRANCE REVEALS
  // ==========================================================================
  // Setup custom fade-in on scroll triggers to reinforce premium high-end aesthetics
  const fadeUpElements = [
    ...document.querySelectorAll(".section-header"),
    ...document.querySelectorAll(".service-card"),
    ...document.querySelectorAll(".why-card"),
    ...document.querySelectorAll(".signature-card"),
    ...document.querySelectorAll(".highlight-box"),
    ...document.querySelectorAll(".frame-decorative")
  ];

  // Apply default entrance styles to all transition elements
  fadeUpElements.forEach(el => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = "opacity 0.8s cubic-bezier(0.25, 1, 0.5, 1), transform 0.8s cubic-bezier(0.25, 1, 0.5, 1)";
  });

  // Create standard IntersectionObserver
  if ("IntersectionObserver" in window) {
    const entranceObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          el.style.opacity = "1";
          el.style.transform = "translateY(0)";
          // Stop observing once transition complete
          observer.unobserve(el);
        }
      });
    }, {
      root: null,
      threshold: 0.15,
      rootMargin: "0px 0px -50px 0px" // Triggers offset slightly before standard view line
    });

    fadeUpElements.forEach(el => entranceObserver.observe(el));
  } else {
    // Fallback if browser is very outdated
    fadeUpElements.forEach(el => {
      el.style.opacity = "1";
      el.style.transform = "translateY(0)";
    });
  }

});
