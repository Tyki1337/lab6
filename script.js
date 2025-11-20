let savedTheme = localStorage.getItem("theme");

if (savedTheme) {
  document.body.classList.add(savedTheme);
} else {
  document.body.classList.add("light");
  localStorage.setItem("theme", "light");
}



function toggleTheme() {
  let savedTheme = localStorage.getItem("theme");
  let newTheme = savedTheme === "light" ? "dark" : "light";

  document.body.classList.remove("light", "dark");
  document.body.classList.add(newTheme);

  localStorage.setItem("theme", newTheme);
}

document.getElementById("themeButton").addEventListener("click", toggleTheme);
    
const btn = document.getElementById("toTopBtn");

window.addEventListener("scroll", () => {
    if (window.scrollY > 200) {
        btn.style.display = "block";
    } else {
        btn.style.display = "none";
    }
});

btn.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});
document.querySelectorAll(".accordion-title").forEach(title => {
    title.addEventListener("click", () => {
        const item = title.parentElement;
        item.classList.toggle("active");
    });
});

const filterButtons = document.querySelectorAll(".filters button");
const images = document.querySelectorAll(".gallery img");

filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        const category = btn.dataset.category;

        filterButtons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");

        images.forEach(img => {
            img.style.display = (category === "all" || img.dataset.category === category)
                ? "block"
                : "none";
        });
    });
});

const modal = document.getElementById("modal");
const modalImg = document.getElementById("modalImg");
const closeBtn = document.querySelector(".close");

images.forEach(img => {
    img.addEventListener("click", () => {
        modal.style.display = "block";
        modalImg.src = img.src;
    });
});

closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
});

modal.addEventListener("click", (e) => {
    if (e.target === modal) {
        modal.style.display = "none";
    }
});