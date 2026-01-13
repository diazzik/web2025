document.addEventListener("DOMContentLoaded", () => {
    window.selected = window.selected || {
        soup: null,
        "main-course": null,
        drink: null,
        salad: null,
        dessert: null
    };

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

    const orderTotal = document.getElementById("order-total");

function initializeUI() {
    if (!blocks.soup.content || !blocks["main-course"].content || 
        !blocks.drink.content || !blocks.salad.content || !blocks.dessert.content) {
        console.warn("Не все элементы DOM загружены. Повторная попытка через 100мс");
        setTimeout(initializeUI, 100);
        return;
    }
    
    blocks.soup.content.textContent = "Ничего не выбрано";
    blocks["main-course"].content.textContent = "Блюдо не выбрано";
    blocks.drink.content.textContent = "Блюдо не выбрано";
    blocks.salad.content.textContent = "Блюдо не выбрано";
    blocks.dessert.content.textContent = "Блюдо не выбрано";
    
    if (blocks.soup.wrap) blocks.soup.wrap.style.display = "block";
    if (blocks.soup.title) blocks.soup.title.style.display = "none";
    if (blocks["main-course"].wrap) blocks["main-course"].wrap.style.display = "none";
    if (blocks.drink.wrap) blocks.drink.wrap.style.display = "none";
    if (blocks.salad.wrap) blocks.salad.wrap.style.display = "none";
    if (blocks.dessert.wrap) blocks.dessert.wrap.style.display = "none";
    
    if (blocks["main-course"].title) blocks["main-course"].title.style.display = "";
    if (blocks.drink.title) blocks.drink.title.style.display = "";
    if (blocks.salad.title) blocks.salad.title.style.display = "";
    if (blocks.dessert.title) blocks.dessert.title.style.display = "";
    
    if (orderTotal) orderTotal.style.display = "none";

    Object.values(blocks).forEach(b => {
        if (b.input) b.input.value = "";
    });
}

    initializeUI();

    function updateUI() {
        const chosenCount = Object.values(window.selected).filter(Boolean).length;

        if (chosenCount === 0) {
            initializeUI();
            return;
        }

        Object.values(blocks).forEach(b => {
            b.wrap.style.display = "block";
        });

        if (window.selected.soup) {
            blocks.soup.title.style.display = "";
        }

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

    const savedOrder = loadOrderFromStorage ? loadOrderFromStorage() : null;
    if (savedOrder) {
        Object.keys(savedOrder).forEach(category => {
            window.selected[category] = savedOrder[category];
        });
        updateUI();
    }

    document.addEventListener("click", (e) => {
        const card = e.target.closest(".dish-card");
        if (!card) return;
        
        const keyword = card.dataset.dish;
        const dish = dishes.find(d => d.keyword === keyword);
        if (!dish) return;
        
        window.selected[dish.category] = dish;
        
        if (typeof saveOrderToStorage === "function") {
            saveOrderToStorage(window.selected);
        }
        
        updateUI();
        
        if (typeof updateOrderPanel === 'function') {
            updateOrderPanel();
        }
    });

    window.updateUI = updateUI;
});