document.addEventListener("DOMContentLoaded", function () {
    gsap.to(".fade-in", {opacity: 1, duration: 1.5, stagger: 0.5, ease: "power2.out"});
});

function redirectToMain() {
    window.location.href = "index.html";
}