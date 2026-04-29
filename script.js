const images = [
  //nature
  { title: "Neelum Valley", category: "nature", location: "Azad Kashmir", mood: "River Serenity", description: "Crystal water, green slopes, and a peaceful valley landscape.", search: "Neelum Valley Azad Kashmir river landscape", localSrc: "images/neelum-valley.png" },
  { title: "Hunza Mountains", category: "nature", location: "Gilgit-Baltistan", mood: "Alpine Calm", description: "Sharp rocky peaks rising above a scenic northern route.", search: "Hunza Valley mountains Pakistan road", localSrc: "images/hunza-mountains.png" },
  { title: "Fairy Meadows", category: "nature", location: "Diamer", mood: "Dreamy Camp", description: "A reflective meadow view opening toward snow-covered giants.", search: "Fairy Meadows Pakistan reflection", localSrc: "images/fairy-meadows.jpg" },
  { title: "K2" , category: "nature" , location: "Gilgit-Baltistan", mood: "Majestic Peak" , description: "The towering second highest mountain in the world, a symbol of natural grandeur." , search: "K2 mountain Pakistan", localSrc: "images/K2.webp"},
  //city
  { title: "Islamabad", category: "city", mood: "Capital Calm", description: "Modern avenues, green sectors, and clean city geometry.", search: "Islamabad city Pakistan", localSrc: "images/islamabad.jpg"},
  { title: "Lahore", category: "city", mood: "Historic Energy", description: "Busy roads, heritage corners, and a strong cultural pulse.", search: "Lahore city Pakistan", localSrc: "images/lahore.jpg" },
  { title: "Karachi", category: "city", mood: "Urban Motion", description: "Sea breeze meeting Pakistan's biggest city rhythm.", search: "Karachi city Pakistan", localSrc: "images/karachi.webp" },
  { title: "Peshawar", category: "city",mood: "Old City Texture", description: "Traditional markets and deep architectural character.", search: "Peshawar city Pakistan", localSrc: "images/peshawar.webp" },
  { title: "Faisalabad", category: "city", mood: "Commercial Heritage", description: "A familiar city center landmark framed by market life.", search: "Faisalabad city Pakistan", localSrc: "images/faisalabad.webp" },
  // ANIMALS
  { title: "Markhor", category: "animals", location: "Northern Ranges", mood: "National Pride", description: "Pakistan's iconic wild goat with striking spiral horns.", search: "Markhor Pakistan", localSrc: "images/markhor.jpg" },
  { title: "Himalayan Brown Bear", category: "animals", location: "Deosai", mood: "Wild Strength", description: "A powerful species seen in Pakistan's high plains.", search: "Himalayan brown bear Pakistan", localSrc: "images/brown-bear.jpg" },
  { title: "Ibex", category: "animals", location: "Rocky Heights", mood: "Cliff Walker", description: "Perfectly balanced on the steep terrain of the north.", search: "ibex Pakistan mountains", localSrc: "images/ibex.jpg" },
  { title: "Chukar", category: "animals", location: "Hilly Terrain", mood: "Desert Feather", description: "A beautiful partridge often seen in rugged landscapes.", search: "chukar partridge Pakistan", localSrc: "images/chukar.jpg" },

  // TRAVEL 
{ title: "Karakoram Highway", category: "travel", location: "Northern Route", mood: "Epic Journey", description: "One of the world's most scenic mountain roads.", search: "Karakoram Highway Pakistan", localSrc: "images/karakoram-mountains.jpg" },
{ title: "Khunjerab Pass", category: "travel", location: "Pakistan-China Border", mood: "Border Adventure", description: "High-altitude travel framed by snow and open roads.", search: "Khunjerab Pass Pakistan", localSrc: "images/khunjerab-Pass.jpg" },
{ title: "Swat Valley", category: "travel", location: "Khyber Pakhtunkhwa", mood: "Valley Retreat", description: "A peaceful travel destination of rivers and mountains.", search: "Swat Valley Pakistan travel", localSrc: "images/swat-valley.jpg" },
{ title: "Badshahi Mosque", category: "travel", location: "Lahore", mood: "Historic Landmark", description: "A grand Mughal-era mosque showcasing stunning architecture and history.", search: "Badshahi Mosque Lahore Pakistan", localSrc: "images/Badshahi-Mosque.jpg" },
{ title: "Clifton Beach", category: "travel", location: "Karachi", mood: "Sea Breeze", description: "A popular seaside spot where city life meets the Arabian Sea.", search: "Clifton Beach Karachi Pakistan", localSrc: "images/clifton-beach.jpg" },
{ title: "Faisal Mosque", category: "travel", location: "Islamabad", mood: "Modern Heritage", description: "A unique and iconic mosque set against the Margalla Hills.", search: "Faisal Mosque Islamabad Pakistan", localSrc: "images/faisal-mosque.jpg" },

 // FOOD
{ title: "Biryani", category: "food", mood: "Spice Heat", description: "A flavorful rice dish layered with spices, meat, and rich aroma.", search: "Pakistani biryani", localSrc: "images/biryani.jpg" },
{ title: "Chicken Karahi", category: "food", mood: "Street Favorite", description: "A sizzling dish cooked in a wok with tomatoes, chilies, and spices.", search: "chicken karahi Pakistan", localSrc: "images/karahi.jpg" },
{ title: "Chapli Kebab", category: "food", mood: "Smoky Bite", description: "A crispy, juicy kebab packed with bold spices and herbs.", search: "chapli kebab Pakistan", localSrc: "images/chapli-kebab.jpg" },
{ title: "Jalebi", category: "food", mood: "Sweet Spiral", description: "A crispy, syrup-soaked dessert loved across the country.", search: "jalebi Pakistan", localSrc: "images/jalebi.webp" }
];

const galleryGrid = document.getElementById("galleryGrid");
const filterButtons = document.querySelectorAll(".filter-btn");
const searchInput = document.getElementById("searchInput");
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxCaption = document.getElementById("lightboxCaption");
const lightboxCounter = document.getElementById("lightboxCounter");
const closeLightboxBtn = document.getElementById("closeLightbox");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const activeCategoryLabel = document.getElementById("activeCategory");
const visibleCountLabel = document.getElementById("visibleCount");
const searchStateLabel = document.getElementById("searchState");

let activeFilter = "all";
let searchTerm = "";
let visibleImages = [...images];
let currentIndex = 0;

function joinParts(parts) {
  return parts.filter((part) => typeof part === "string" && part.trim()).join(" - ");
}

function buildFallbackUrl(img, index) {
  const seed = `${img.category}-${img.title.toLowerCase().replace(/\s+/g, "-")}-${index}`;
  return `https://picsum.photos/seed/${seed}/1600/1000`;
}

function getImageUrl(img, index) {
  return img.localSrc || buildFallbackUrl(img, index);
}

function renderGallery() {
  const normalizedSearch = searchTerm.trim().toLowerCase();

  visibleImages = images.filter((img) => {
    const matchesFilter = activeFilter === "all" || img.category === activeFilter;
    const haystack = `${img.title} ${img.location} ${img.category} ${img.description} ${img.mood}`.toLowerCase();
    const matchesSearch = !normalizedSearch || haystack.includes(normalizedSearch);
    return matchesFilter && matchesSearch;
  });

  const prettyFilter = activeFilter.charAt(0).toUpperCase() + activeFilter.slice(1);
  activeCategoryLabel.textContent = `Category: ${prettyFilter === "All" ? "All" : prettyFilter}`;
  visibleCountLabel.textContent = `Images: ${visibleImages.length}`;
  searchStateLabel.textContent = `Search: ${searchTerm.trim() || "All"}`;

  galleryGrid.innerHTML = "";

  if (!visibleImages.length) {
    galleryGrid.innerHTML = `
      <article class="card empty-state" aria-live="polite">
        <div class="card-info">
          <span class="card-tag">No Match</span>
          <h3>No images found</h3>
          <p>Try another keyword like Lahore, Hunza, Karachi, mosque, or biryani.</p>
        </div>
      </article>
    `;
    return;
  }

  visibleImages.forEach((img, index) => {
    const card = document.createElement("button");
    card.className = `card ${img.category}`;
    card.type = "button";
    card.setAttribute("aria-label", `${img.title} (${img.category})`);

    card.innerHTML = `
      <img alt="${img.title}" loading="lazy" />
      <span class="card-info">
        <span class="card-topline">
          <span class="card-tag">${img.category}</span>
          <span class="card-count">${String(index + 1).padStart(2, "0")}</span>
        </span>
        <h3>${img.title}</h3>
        <p>${img.description}</p>
        <span class="card-bottomline">
          <span class="card-location">${img.location || ""}</span>
          <span class="card-location">${img.mood || ""}</span>
        </span>
      </span>
    `;

    const imageEl = card.querySelector("img");
    imageEl.src = getImageUrl(img, index);
    imageEl.onerror = () => {
      imageEl.src = buildFallbackUrl(img, index);
    };

    card.addEventListener("click", () => openLightbox(index));
    galleryGrid.appendChild(card);
  });
}

function openLightbox(index) {
  currentIndex = index;
  const img = visibleImages[currentIndex];

  lightboxImage.src = getImageUrl(img, currentIndex);
  lightboxImage.alt = img.title;
  lightboxCounter.textContent = `${currentIndex + 1} / ${visibleImages.length}`;
  lightboxCaption.textContent = joinParts([img.title, img.location, img.description]);
  lightbox.classList.add("open");
  lightbox.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
  lightboxImage.onerror = () => {
    lightboxImage.src = buildFallbackUrl(img, currentIndex);
  };
}

function closeLightbox() {
  lightbox.classList.remove("open");
  lightbox.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

function showNext() {
  if (!visibleImages.length) return;
  currentIndex = (currentIndex + 1) % visibleImages.length;
  openLightbox(currentIndex);
}

function showPrev() {
  if (!visibleImages.length) return;
  currentIndex = (currentIndex - 1 + visibleImages.length) % visibleImages.length;
  openLightbox(currentIndex);
}

filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    activeFilter = btn.dataset.filter;

    filterButtons.forEach((item) => item.classList.remove("active"));
    btn.classList.add("active");

    renderGallery();
  });
});

searchInput.addEventListener("input", (event) => {
  searchTerm = event.target.value;
  renderGallery();
});

nextBtn.addEventListener("click", showNext);
prevBtn.addEventListener("click", showPrev);
closeLightboxBtn.addEventListener("click", closeLightbox);

lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) {
    closeLightbox();
  }
});

document.addEventListener("keydown", (event) => {
  if (!lightbox.classList.contains("open")) return;

  if (event.key === "Escape") closeLightbox();
  if (event.key === "ArrowRight") showNext();
  if (event.key === "ArrowLeft") showPrev();
});

renderGallery();
