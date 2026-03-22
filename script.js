const loader = document.getElementById("loader");
const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");
const navItems = document.querySelectorAll(".nav-link");
const navbar = document.getElementById("navbar");
const backToTop = document.getElementById("backToTop");
const progressBar = document.getElementById("scroll-progress");
const revealElements = document.querySelectorAll(".reveal");
const counters = document.querySelectorAll(".counter");
const filterButtons = document.querySelectorAll(".filter-btn");
const destinationItems = document.querySelectorAll(".destination-item");
const rippleButtons = document.querySelectorAll(".ripple-btn");
const sections = document.querySelectorAll("section, header");
const typingText = document.getElementById("typing-text");
const themeToggle = document.getElementById("theme-toggle");
const galleryItems = document.querySelectorAll(".gallery-item");
const imageModal = document.getElementById("image-modal");
const modalImage = document.getElementById("modal-image");
const closeModal = document.getElementById("close-modal");
const faqItems = document.querySelectorAll(".faq-item");
const testimonialTrack = document.getElementById("testimonial-track");

window.addEventListener("load", () => {
  setTimeout(() => {
    loader.classList.add("hide");
  }, 800);
});

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("show");
});

navItems.forEach((item) => {
  item.addEventListener("click", () => {
    navLinks.classList.remove("show");
  });
});

window.addEventListener("scroll", () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = (scrollTop / docHeight) * 100;
  progressBar.style.width = progress + "%";

  if (scrollTop > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }

  if (scrollTop > 300) {
    backToTop.classList.add("show");
  } else {
    backToTop.classList.remove("show");
  }

  let current = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 140;
    if (scrollTop >= sectionTop) {
      current = section.getAttribute("id");
    }
  });

  navItems.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
});

backToTop.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("active");
    }
  });
}, {
  threshold: 0.15
});

revealElements.forEach((el) => observer.observe(el));

const counterObserver = new IntersectionObserver((entries, observerInstance) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const counter = entry.target;
      const target = +counter.dataset.target;
      let count = 0;
      const step = Math.max(1, Math.ceil(target / 60));

      const updateCounter = () => {
        count += step;
        if (count < target) {
          counter.textContent = count;
          requestAnimationFrame(updateCounter);
        } else {
          counter.textContent = target;
        }
      };

      updateCounter();
      observerInstance.unobserve(counter);
    }
  });
}, { threshold: 0.5 });

counters.forEach((counter) => counterObserver.observe(counter));

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");

    const filter = button.dataset.filter;

    destinationItems.forEach((item) => {
      if (filter === "all" || item.dataset.category === filter) {
        item.classList.remove("hide");
      } else {
        item.classList.add("hide");
      }
    });
  });
});

rippleButtons.forEach((button) => {
  button.addEventListener("click", function (e) {
    const circle = document.createElement("span");
    const diameter = Math.max(this.clientWidth, this.clientHeight);
    const radius = diameter / 2;

    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${e.clientX - this.getBoundingClientRect().left - radius}px`;
    circle.style.top = `${e.clientY - this.getBoundingClientRect().top - radius}px`;
    circle.classList.add("ripple");

    const ripple = this.getElementsByClassName("ripple")[0];
    if (ripple) ripple.remove();

    this.appendChild(circle);
  });
});

const typingWords = ["premium plus", "hiện đại", "mượt mà", "ấn tượng"];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
  const currentWord = typingWords[wordIndex];
  if (!isDeleting) {
    typingText.textContent = currentWord.substring(0, charIndex + 1);
    charIndex++;
    if (charIndex === currentWord.length) {
      isDeleting = true;
      setTimeout(typeEffect, 1200);
      return;
    }
  } else {
    typingText.textContent = currentWord.substring(0, charIndex - 1);
    charIndex--;
    if (charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % typingWords.length;
    }
  }
  setTimeout(typeEffect, isDeleting ? 60 : 110);
}
typeEffect();

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  themeToggle.textContent = document.body.classList.contains("dark") ? "☀" : "☾";
});

galleryItems.forEach((item) => {
  item.addEventListener("click", () => {
    imageModal.classList.add("show");
    modalImage.src = item.src;
  });
});

closeModal.addEventListener("click", () => {
  imageModal.classList.remove("show");
});

imageModal.addEventListener("click", (e) => {
  if (e.target === imageModal) {
    imageModal.classList.remove("show");
  }
});

faqItems.forEach((item) => {
  const question = item.querySelector(".faq-question");
  question.addEventListener("click", () => {
    item.classList.toggle("active");
  });
});

let testimonialIndex = 0;
function moveTestimonials() {
  const cards = document.querySelectorAll(".testimonial-card");
  const visibleCards = window.innerWidth <= 700 ? 1 : window.innerWidth <= 1100 ? 2 : 3;
  const totalSlides = cards.length - visibleCards;

  if (totalSlides <= 0) return;

  testimonialIndex++;
  if (testimonialIndex > totalSlides) {
    testimonialIndex = 0;
  }

  const cardWidth = cards[0].offsetWidth + 22;
  testimonialTrack.style.transform = `translateX(-${testimonialIndex * cardWidth}px)`;
}
setInterval(moveTestimonials, 3000);

const contactForm = document.querySelector(".contact-form");
contactForm.addEventListener("submit", (e) => {
  e.preventDefault();
  alert("Đã gửi thông tin thành công!");
  contactForm.reset();
});
