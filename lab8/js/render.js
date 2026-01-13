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
    card.dataset.category = dish.category; // Добавляем категорию в data-атрибут

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

// Обновляем вызовы renderCategory в load.js
async function loadDishes() {
  try {
    const res = await fetch("https://edu.std-900.ist.mospolytech.ru/labs/api/dishes?api_key=f670b644-5729-414b-a9aa-293521e72046");
    if (!res.ok) throw new Error("Ошибка API");
    dishes = await res.json();

    // Проверяем, какие категории есть в данных
    console.log("Все категории из API:", [...new Set(dishes.map(d => d.category))]);

    // Рендерим все категории с правильными именами
    renderCategory("soup", document.getElementById("soups"));
    renderCategory("main-course", document.getElementById("main")); // Возможно "main" или "main-course"
    renderCategory("drink", document.getElementById("drinks"));
    renderCategory("salad", document.getElementById("salads"));
    renderCategory("dessert", document.getElementById("desserts"));

    if (typeof initFilters === "function") initFilters();
  } catch (err) {
    console.error(err);
  }
}