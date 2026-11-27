
const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");
const searchResults = document.getElementById("search-results");

searchForm.addEventListener("submit", function(e) {
    e.preventDefault();

    const query = searchInput.value.trim().toLowerCase();

    searchResults.innerHTML = "";
    searchResults.style.display = "block";

    if (query.length < 2) {
        searchResults.textContent = "Wpisz minimum 2 znaki.";
        return;
    }

    const results = window.SEARCH_INDEX.filter(item =>
        item.title.toLowerCase().includes(query)
    );

    if (results.length === 0) {
        searchResults.textContent = "Nie znaleziono wyników.";
        return;
    }

    results.forEach(item => {
        const link = document.createElement("a");

        link.className = "search-result";
        link.href = item.page + "#" + item.id;

        const title = document.createElement("strong");
        title.textContent = item.title;

        const page = document.createElement("small");
        page.textContent = "Strona: " + item.page;

        link.append(title, page);
        searchResults.appendChild(link);
    });
});

window.addEventListener("DOMContentLoaded", function() {
    if (!window.location.hash) return;

    const id = decodeURIComponent(location.hash.substring(1));
    const heading = document.getElementById(id);

    if (heading && heading.tagName === "H2") {
        setTimeout(() => {
            heading.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });

            heading.classList.add("search-highlight");

            setTimeout(() => {
                heading.classList.remove("search-highlight");
            }, 2500);
        }, 300);
    }
});

document.addEventListener("click", function(e) {
    if (!e.target.closest(".search-container")) {
        searchResults.style.display = "none";
    }
});
