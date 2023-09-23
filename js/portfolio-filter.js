const portfolioListRef = document.querySelector(".portfolio-list-js");
const filterContainerRef = document.querySelector(".filter-js");

fetchFilters();
fetchData("all");

filterContainerRef.addEventListener("click", onFilterClick);

function onFilterClick(e) {
  if (e.target.nodeName === "BUTTON") {
    const allFiltersBtnRef = document.querySelectorAll(".filter-btn");
    allFiltersBtnRef.forEach((btn) => {
      btn.classList.remove("filter-btn-active");
    });
    e.target.classList.add("filter-btn-active");
    fetchData(e.target.value);
  }
}

function fetchData(activeFilter) {
  fetch("data.json")
    .then((response) => response.json())
    .then((data) => {
      let filteredList = [];
      if (activeFilter === "all") {
        filteredList = data;
      } else {
        filteredList = data.filter(({ type }) => type === activeFilter);
      }
      updatePage(filteredList);
    })
    .catch((error) => {
      console.error("Произошла ошибка при получении данных:", error);
    });
}

function fetchFilters() {
  fetch("data.json")
    .then((response) => response.json())
    .then((data) => {
      const filtersList = [];
      data.forEach(({ type }) => {
        if (!filtersList.includes(type)) {
          filtersList.push(type);
        }
      });
      updateFilters(filtersList);
    })
    .catch((error) => {
      console.error("Произошла ошибка при получении данных:", error);
    });
}

function updatePage(list) {
  const markup = list
    .map(
      (item) => `<li class="grid portfolio-card">
  <a class="link portfolio-card-link" href="">
    <div class="image-card">
      <picture>
      <!-- Mobile - webp -->
        <source
          srcset="
            ./images/portfolio/mobile/${item.imgName}.webp    1x,
            ./images/portfolio/mobile/${item.imgName}@2x.webp 2x,
            ./images/portfolio/mobile/${item.imgName}@3x.webp 3x
          "
          type="image/webp"
          media="(max-width: 767px)"
        />
        <!-- Mobile - jpg -->
        <source
          srcset="
            ./images/portfolio/mobile/${item.imgName}.jpg    1x,
            ./images/portfolio/mobile/${item.imgName}@2x.jpg 2x,
            ./images/portfolio/mobile/${item.imgName}@3x.jpg 3x
          "
          type="image/jpeg"
          media="(max-width: 767px)"
        />
        <!-- Tablet - webp -->
        <source
          srcset="
            ./images/portfolio/tablet/${item.imgName}.webp    1x,
            ./images/portfolio/tablet/${item.imgName}@2x.webp 2x,
            ./images/portfolio/tablet/${item.imgName}@3x.webp 3x
          "
          type="image/webp"
          media="(max-width: 1157px)"
        />
        <!-- Tablet - jpg -->
        <source
          srcset="
            ./images/portfolio/tablet/${item.imgName}.jpg    1x,
            ./images/portfolio/tablet/${item.imgName}@2x.jpg 2x,
            ./images/portfolio/tablet/${item.imgName}@3x.jpg 3x
          "
          type="image/jpeg"
          media="(max-width: 1157px)"
        />
        <!-- Desktop - webp -->
        <source
          srcset="
            ./images/portfolio/desktop/${item.imgName}.webp    1x,
            ./images/portfolio/desktop/${item.imgName}@2x.webp 2x,
            ./images/portfolio/desktop/${item.imgName}@3x.webp 3x
          "
          type="image/webp"
          media="(min-width: 1158px)"
        />
        <!-- Desktop - jpg -->
        <source
          srcset="
            ./images/portfolio/desktop/${item.imgName}.jpg    1x,
            ./images/portfolio/desktop/${item.imgName}@2x.jpg 2x,
            ./images/portfolio/desktop/${item.imgName}@3x.jpg 3x
          "
          type="image/jpeg"
          media="(min-width: 1158px)"
        />
        <img
          class="img-portfolio-card"
          src="./images/portfolio/mobile/${item.imgName}.jpg"
          alt="${item.title}"
          loading="lazy"
        />
      </picture>

      <p class="overlay-portfolio">
        ${item.description}
      </p>
    </div>
    <div class="portfolio-card-text">
      <h2 class="portfolio-card-title">
      ${item.title}
      </h2>
      <p class="portfolio-card-dscr">${item.type}</p>
    </div>
  </a>
</li>`
    )
    .join("");

  portfolioListRef.innerHTML = markup;
}

function updateFilters(array) {
  const markup = array
    .map(
      (type) => `
    <li>
                <button type="button" class="btn filter-btn" value="${type}">
                  ${type}
                </button>
              </li>`
    )
    .join("");

  filterContainerRef.insertAdjacentHTML("beforeend", markup);
}
