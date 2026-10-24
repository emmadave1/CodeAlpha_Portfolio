const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");
const navItems = document.querySelectorAll(".nav-link");
const header = document.querySelector(".header");
const backToTop = document.getElementById("back-to-top");
const yearElement = document.getElementById("year");

// Automatically display the current year.
yearElement.textContent = new Date().getFullYear();

// Open and close the mobile navigation menu.
function closeMenu() {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation menu");
    document.body.classList.remove("menu-open");
}

menuToggle.addEventListener("click", () => {
    const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";

    menuToggle.setAttribute("aria-expanded", String(!isExpanded));
    menuToggle.setAttribute(
        "aria-label",
        isExpanded ? "Open navigation menu" : "Close navigation menu"
    );

    navLinks.classList.toggle("open", !isExpanded);
    document.body.classList.toggle("menu-open", !isExpanded);
});

// Close the mobile menu after selecting a section.
navItems.forEach((link) => {
    link.addEventListener("click", closeMenu);
});

// Close the menu when the Escape key is pressed.
document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        closeMenu();
    }
});

// Update the header and back-to-top button when scrolling.
function handleScroll() {
    const scrollPosition = window.scrollY;

    header.classList.toggle("scrolled", scrollPosition > 20);
    backToTop.classList.toggle("visible", scrollPosition > 450);
}

window.addEventListener("scroll", handleScroll, { passive: true });
handleScroll();

// Scroll back to the top when the button is clicked.
backToTop.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

// Reveal elements as they enter the viewport.
const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.12
        }
    );

    revealElements.forEach((element) => {
        revealObserver.observe(element);
    });
} else {
    revealElements.forEach((element) => {
        element.classList.add("visible");
    });
}

// Highlight the navigation link for the section currently in view.
const sections = document.querySelectorAll("main section[id]");

if ("IntersectionObserver" in window) {
    const sectionObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const currentId = entry.target.id;

                    navItems.forEach((link) => {
                        const isActive =
                            link.getAttribute("href") === `#${currentId}`;

                        link.classList.toggle("active", isActive);
                    });
                }
            });
        },
        {
            rootMargin: "-35% 0px -55% 0px"
        }
    );

    sections.forEach((section) => {
        sectionObserver.observe(section);
    });
}