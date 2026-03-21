const header = document.getElementById("header");
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const navItems = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll("section[id]");
const revealItems = document.querySelectorAll(".reveal");
const tabButtons = document.querySelectorAll(".tab-btn");
const foodCards = document.querySelectorAll(".food-card");
const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
  if (window.scrollY > 30) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }

  if (window.scrollY > 300) {
    backToTop.classList.add("show");
  } else {
    backToTop.classList.remove("show");
  }

  updateActiveNav();
  revealOnScroll();
});

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("show");
});

navItems.forEach((item) => {
  item.addEventListener("click", () => {
    navLinks.classList.remove("show");
  });
});

function updateActiveNav() {
  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 140;
    const sectionHeight = section.offsetHeight;

    if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
      current = section.getAttribute("id");
    }
  });

  navItems.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
}

tabButtons.forEach((button) => {
  button.addEventListener("click", () => {
    tabButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");

    const filter = button.dataset.filter;

    foodCards.forEach((card) => {
      if (filter === "all" || card.dataset.category === filter) {
        card.style.display = "";
      } else {
        card.style.display = "none";
      }
    });
  });
});

function revealOnScroll() {
  const triggerBottom = window.innerHeight * 0.9;

  revealItems.forEach((item) => {
    const itemTop = item.getBoundingClientRect().top;

    if (itemTop < triggerBottom) {
      item.classList.add("active");
    }
  });
}

backToTop.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

window.addEventListener("load", () => {
  updateActiveNav();
  revealOnScroll();
});
