// js/order.js
document.addEventListener("DOMContentLoaded", () => {

    // Все категории
    const selected = {
        soup: null,
        main: null,
        drink: null,
        salad: null,
        dessert: null
    };

    // Блоки категорий
    const blocks = {
        soup: {
            wrap: document.getElementById("order-soup"),
            title: document.getElementById("title-soup"),
            content: document.getElementById("content-soup"),
            input: document.getElementById("input-soup")
        },
        main: {
            wrap: document.getElementById("order-main"),
            title: document.getElementById("title-main"),
            content: document.getElementById("content-main"),
            input: document.getElementById("input-main")
        },
        drink: {
            wrap: document.getElementById("order-drink"),
            title: document.getElementById("title-drink"),
            content: document.getElementById("content-drink"),
            input: document.getElementById("input-drink")
        },
        salad: {
            wrap: document.getElementById("order-salad"),
            title: document.getElementById("title-salad"),
            content: document.getElementById("content-salad"),
            input: document.getElementById("input-salad")
        },
        dessert: {
            wrap: document.getElementById("order-dessert"),
            title: document.getElementById("title-dessert"),
            content: document.getElementById("content-dessert"),
            input: document.getElementById("input-dessert")
        }
    };

    // Блок стоимости
    const orderTotal = document.getElementById("order-total");

    // Блок, где отображаются все категории выбора
    const selectionBlock = document.querySelector(".order-selection");


    // ---------------------------
    // ИНИЦИАЛИЗАЦИЯ
    // ---------------------------
    function initializeUI() {
        // Показываем только одну строку — "Ничего не выбрано"
        blocks.soup.wrap.style.display = "block";
        blocks.soup.title.style.display = "none";
        blocks.soup.content.textContent = "Ничего не выбрано";

        // Все другие категории скрываем полностью
        ["main", "drink", "salad", "dessert"].forEach(cat => {
            blocks[cat].wrap.style.display = "none";
            blocks[cat].title.style.display = "none";
            blocks[cat].content.textContent = "";
        });

        // Скрываем сумму
        orderTotal.style.display = "none";

        // Очищаем данные формы
        Object.values(blocks).forEach(b => b.input.value = "");
    }

    initializeUI();


    // ---------------------------
    // ОБНОВЛЕНИЕ UI ПОСЛЕ ВЫБОРА
    // ---------------------------
    function updateUI() {
        const chosenCount = Object.values(selected).filter(Boolean).length;

        // Если ничего не выбрано — состояние по умолчанию
        if (chosenCount === 0) {
            initializeUI();
            return;
        }

        // Показать все категории
        Object.values(blocks).forEach(b => b.wrap.style.display = "block");

        // Обновить данные для каждой категории
        for (const category in selected) {
            const dish = selected[category];

            if (dish) {
                blocks[category].title.style.display = "";
                blocks[category].content.textContent = `${dish.name} — ${dish.price} ₽`;
                blocks[category].input.value = dish.keyword;
            } else {
                blocks[category].title.style.display = "";
                blocks[category].content.textContent = "Блюдо не выбрано";
                blocks[category].input.value = "";
            }
        }

        // Итоговая сумма
        const total = Object.values(selected)
            .filter(Boolean)
            .reduce((sum, dish) => sum + dish.price, 0);

        orderTotal.style.display = "block";
        orderTotal.textContent = `Стоимость заказа: ${total} ₽`;
    }


    // ---------------------------
    // ВЫБОР БЛЮДА ПО НАЖАТИЮ
    // ---------------------------
    document.addEventListener("click", (e) => {
        const card = e.target.closest(".dish-card");
        if (!card) return;

        const keyword = card.dataset.dish;
        const dish = dishes.find(d => d.keyword === keyword);
        if (!dish) return;

        selected[dish.category] = dish;
        updateUI();
    });

});
