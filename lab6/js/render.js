function renderCategory(category, container, filterKind = null) {
    container.innerHTML = "";

    const items = dishes
        .filter(d => d.category === category)
        .filter(d => !filterKind || d.kind === filterKind)
        .sort((a, b) => a.name.localeCompare(b.name));

    items.forEach(dish => {
        const card = document.createElement("div");
        card.classList.add("dish-card");

        if (dish.category === "drink") {
            if (dish.kind === "cold") card.classList.add("cold-drink");
            if (dish.kind === "hot") card.classList.add("hot-drink");
            if (dish.kind === "water") card.classList.add("water-drink");
        }

        card.setAttribute("data-dish", dish.keyword);

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

renderCategory("soup", document.getElementById("soups"));
renderCategory("main", document.getElementById("main"));
renderCategory("drink", document.getElementById("drinks"));
renderCategory("salad", document.getElementById("salads"));
renderCategory("dessert", document.getElementById("desserts"));


