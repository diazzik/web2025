function renderDishes() {

    // сортировка
    dishes.sort((a, b) => a.name.localeCompare(b.name));

    const soupContainer = document.getElementById("soups");
    const mainContainer = document.getElementById("main");
    const drinkContainer = document.getElementById("drinks");

    dishes.forEach(dish => {
        const card = document.createElement("div");
        card.classList.add("dish-card");
        card.setAttribute("data-dish", dish.keyword);

        card.innerHTML = `
            <img src="${dish.image}" alt="${dish.name}">
            <p class="price">${dish.price} ₽</p>
            <p class="title">${dish.name}</p>
            <p class="weight">${dish.count}</p>
            <button>Добавить</button>
        `;

        // по категории отправляем в нужный блок
        if (dish.category === "soup") soupContainer.appendChild(card);
        if (dish.category === "main") mainContainer.appendChild(card);
        if (dish.category === "drink") drinkContainer.appendChild(card);
    });
}

renderDishes();
