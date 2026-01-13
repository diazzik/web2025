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

    card.innerHTML = `
      <img src="${dish.image}" alt="${dish.name}">
      <p class="price">${dish.price} ₽</p>
      <p class="title">${dish.name}</p>
      <p class="weight">${dish.count}</p>
      <button>Добавить</button>
    `;
    container.appendChild(card);
  });
}
