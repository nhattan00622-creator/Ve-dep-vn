const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");
const navItems = document.querySelectorAll(".nav-links a");

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("show");
});

navItems.forEach((item) => {
  item.addEventListener("click", () => {
    navLinks.classList.remove("show");
  });
});
