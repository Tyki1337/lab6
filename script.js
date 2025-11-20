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

const wrapper = document.querySelector(".reviews-wrapper");
const prevBtn = document.querySelector(".prev-btn");
const nextBtn = document.querySelector(".next-btn");

let reviews = [];
let currentIndex = 0;

async function fetchReview() {
try {
        const res = await fetch("https://corsproxy.io/?https://api.forismatic.com/api/1.0/?method=getQuote&format=jsonp&lang=ru&jsonp=?");
        const text = await res.text();
        
        const jsonString = text.replace(/^[^(]*\(/, '').replace(/\)$/, '');
        const data = JSON.parse(jsonString);

        return {
            content: data.quoteText.trim(),
            author: data.quoteAuthor || "Неизвестный автор"
        };
    } catch (err) {
        return {
            content: "Слова улетают, письменное остаётся.",
            author: "Латинская поговорка"
        };
    }
}


    async function loadReviews(count = 4) {
        const temp = document.createElement("div");
        temp.classList.add("review");
        temp.innerHTML = `<p class="loading">Загрузка...</p>`;
        wrapper.appendChild(temp);
        const promises = [];
        for (let i = 0; i < count; i++) {
            promises.push(fetchReview());
            await new Promise(r => setInterval(r, 1800));
        }
        reviews = await Promise.all((promises));
        renderReviews();
    }


function renderReviews() {
    wrapper.innerHTML = "";
    reviews.forEach(r => {
        const div = document.createElement("div");
        div.classList.add("review");
        div.innerHTML = `<p>"${r.content}"</p><span>- ${r.author}</span>`;
        wrapper.appendChild(div);
    });
    showReview(currentIndex);
}

function showReview(index) {
    if (index < 0) currentIndex = reviews.length - 1;
    else if (index >= reviews.length) currentIndex = 0;
    else currentIndex = index;
    wrapper.style.transform = `translateX(-${currentIndex * 100}%)`;
}

prevBtn.addEventListener("click", () => {
    showReview(currentIndex - 1);
});
nextBtn.addEventListener("click", () => {
    showReview(currentIndex + 1);
});

setInterval(() => {
    showReview(currentIndex + 1);
}, 5000);

loadReviews();



async function loadRandomImages(count = 6) {
    const container = document.getElementById("images");
    container.innerHTML = ""; 

    for (let i = 0; i < count; i++) {
        const img = document.createElement("img");
        img.src = `https://picsum.photos/300?random=${Math.random()}`;
        img.alt = "Random image";
        img.style.margin = "10px";
        img.style.borderRadius = "10px";
        container.appendChild(img);
    }
}
loadRandomImages(6);