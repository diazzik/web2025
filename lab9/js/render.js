function renderCategory(category, container, filterKind = null) {
  container.innerHTML = "";
  const items = dishes
    .filter(d => d.category === category)
    .filter(d => !filterKind || d.kind === filterKind)
    .sort((a, b) => a.name.localeCompare(b.name));
  
  items.forEach(dish => {
    const card = document.createElement("div");
    card.className = "dish-card";
    card.dataset.dish = dish.keyword;
    card.dataset.category = dish.category;

    card.innerHTML = `
      <img src="${dish.image}" alt="${dish.name}">
      <p class="price">${dish.price} ₽</p>
      <p class="title">${dish.name}</p>
      <p class="weight">${dish.count}</p>
      <button class="add-btn">Добавить</button>
    `;
    container.appendChild(card);
  });
}

async function loadDishes() {
  try {
    const res = await fetch("https://edu.std-900.ist.mospolytech.ru/labs/api/dishes?api_key=f670b644-5729-414b-a9aa-293521e72046");
    if (!res.ok) throw new Error("Ошибка API");
    dishes = await res.json();

    console.log("Все категории из API:", [...new Set(dishes.map(d => d.category))]);

    renderCategory("soup", document.getElementById("soups"));
    renderCategory("main-course", document.getElementById("main"));
    renderCategory("drink", document.getElementById("drinks"));
    renderCategory("salad", document.getElementById("salads"));
    renderCategory("dessert", document.getElementById("desserts"));

    if (typeof initFilters === "function") initFilters();
  } catch (err) {
    console.error(err);
  }
}