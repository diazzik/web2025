// js/order.js - ИСПРАВЛЕННАЯ ВЕРСИЯ
document.addEventListener("DOMContentLoaded", () => {
    // ВАЖНО: Объявляем selected в глобальной области видимости
    window.selected = window.selected || {
        soup: null,
        "main-course": null,
        drink: null,
        salad: null,
        dessert: null
    };

    // Блоки категорий - оставляем как было
    const blocks = {
        soup: {
            wrap: document.getElementById("order-soup"),
            title: document.getElementById("title-soup"),
            content: document.getElementById("content-soup"),
            input: document.getElementById("input-soup")
        },
        "main-course": {
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

// ИНИЦИАЛИЗАЦИЯ - с проверкой элементов
function initializeUI() {
    // Проверяем существование ВСЕХ элементов перед работой с ними
    if (!blocks.soup.content || !blocks["main-course"].content || 
        !blocks.drink.content || !blocks.salad.content || !blocks.dessert.content) {
        console.warn("Не все элементы DOM загружены. Повторная попытка через 100мс");
        setTimeout(initializeUI, 100);
        return;
    }
    
    // Устанавливаем начальные значения
    blocks.soup.content.textContent = "Ничего не выбрано";
    blocks["main-course"].content.textContent = "Блюдо не выбрано";
    blocks.drink.content.textContent = "Блюдо не выбрано";
    blocks.salad.content.textContent = "Блюдо не выбрано";
    blocks.dessert.content.textContent = "Блюдо не выбрано";
    
    // Скрываем все, кроме супа
    if (blocks.soup.wrap) blocks.soup.wrap.style.display = "block";
    if (blocks.soup.title) blocks.soup.title.style.display = "none";
    if (blocks["main-course"].wrap) blocks["main-course"].wrap.style.display = "none";
    if (blocks.drink.wrap) blocks.drink.wrap.style.display = "none";
    if (blocks.salad.wrap) blocks.salad.wrap.style.display = "none";
    if (blocks.dessert.wrap) blocks.dessert.wrap.style.display = "none";
    
    // Показываем заголовки для остальных
    if (blocks["main-course"].title) blocks["main-course"].title.style.display = "";
    if (blocks.drink.title) blocks.drink.title.style.display = "";
    if (blocks.salad.title) blocks.salad.title.style.display = "";
    if (blocks.dessert.title) blocks.dessert.title.style.display = "";
    
    // Скрываем сумму
    if (orderTotal) orderTotal.style.display = "none";

    // Очищаем данные формы
    Object.values(blocks).forEach(b => {
        if (b.input) b.input.value = "";
    });
}

    initializeUI();

    // ОБНОВЛЕНИЕ UI ПОСЛЕ ВЫБОРА
    function updateUI() {
        const chosenCount = Object.values(window.selected).filter(Boolean).length;

        // Если ничего не выбрано — состояние по умолчанию
        if (chosenCount === 0) {
            initializeUI();
            return;
        }

        // Показать все категории (когда есть хотя бы один выбор)
        Object.values(blocks).forEach(b => {
            b.wrap.style.display = "block";
        });

        // Для супа показываем заголовок, если что-то выбрано
        if (window.selected.soup) {
            blocks.soup.title.style.display = "";
        }

        // Обновить данные для каждой категории
        for (const category in window.selected) {
            const dish = window.selected[category];
            const block = blocks[category];

            if (dish && block) {
                block.content.textContent = `${dish.name} — ${dish.price} ₽`;
                if (block.input) block.input.value = dish.keyword;
            } else if (block) {
                block.content.textContent = "Блюдо не выбрано";
                if (block.input) block.input.value = "";
            }
        }

        // Итоговая сумма
        const total = Object.values(window.selected)
            .filter(Boolean)
            .reduce((sum, dish) => sum + dish.price, 0);

        if (total > 0) {
            orderTotal.style.display = "block";
            orderTotal.textContent = `Стоимость заказа: ${total} ₽`;
        } else {
            orderTotal.style.display = "none";
        }
    }

    // Загружаем сохраненный заказ при загрузке страницы
    const savedOrder = loadOrderFromStorage ? loadOrderFromStorage() : null;
    if (savedOrder) {
        Object.keys(savedOrder).forEach(category => {
            window.selected[category] = savedOrder[category];
        });
        updateUI();
    }

    // ВЫБОР БЛЮДА ПО НАЖАТИЮ - исправленная версия
    document.addEventListener("click", (e) => {
        const card = e.target.closest(".dish-card");
        if (!card) return;
        
        const keyword = card.dataset.dish;
        const dish = dishes.find(d => d.keyword === keyword);
        if (!dish) return;
        
        // Обновляем выбранное блюдо в ГЛОБАЛЬНОЙ переменной
        window.selected[dish.category] = dish;
        
        // Сохраняем в localStorage
        if (typeof saveOrderToStorage === "function") {
            saveOrderToStorage(window.selected);
        }
        
        // Обновляем UI
        updateUI();
        
        // Обновляем панель заказа
        if (typeof updateOrderPanel === 'function') {
            updateOrderPanel();
        }
    });

    // Сделаем функцию updateUI доступной глобально
    window.updateUI = updateUI;
});