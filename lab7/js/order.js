document.addEventListener("DOMContentLoaded", () => {
    const selected = {
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
        blocks.soup.content.textContent = "Ничего не выбрано";
        blocks["main-course"].content.textContent = "Блюдо не выбрано";
        blocks.drink.content.textContent = "Блюдо не выбрано";
        blocks.salad.content.textContent = "Блюдо не выбрано";
        blocks.dessert.content.textContent = "Блюдо не выбрано";
        
        blocks.soup.wrap.style.display = "block";
        blocks.soup.title.style.display = "none"; 
        blocks["main-course"].wrap.style.display = "none";
        blocks.drink.wrap.style.display = "none";
        blocks.salad.wrap.style.display = "none";
        blocks.dessert.wrap.style.display = "none";
        
        blocks["main-course"].title.style.display = "";
        blocks.drink.title.style.display = "";
        blocks.salad.title.style.display = "";
        blocks.dessert.title.style.display = "";
        
        orderTotal.style.display = "none";

        Object.values(blocks).forEach(b => {
            if (b.input) b.input.value = "";
        });
    }

    initializeUI();

    function updateUI() {
        const chosenCount = Object.values(selected).filter(Boolean).length;

        if (chosenCount === 0) {
            initializeUI();
            return;
        }

        Object.values(blocks).forEach(b => {
            b.wrap.style.display = "block";
            blocks.soup.title.style.display = "";
        });

        if (selected.soup) {
            blocks.soup.title.style.display = "";
        }

        for (const category in selected) {
            const dish = selected[category];
            const block = blocks[category];

            if (dish && block) {
                block.content.textContent = `${dish.name} — ${dish.price} ₽`;
                if (block.input) block.input.value = dish.keyword;
            } else if (block) {
                block.content.textContent = "Блюдо не выбрано";
                if (block.input) block.input.value = "";
            }
        }

        const total = Object.values(selected)
            .filter(Boolean)
            .reduce((sum, dish) => sum + dish.price, 0);

        if (total > 0) {
            orderTotal.style.display = "block";
            orderTotal.textContent = `Стоимость заказа: ${total} ₽`;
        } else {
            orderTotal.style.display = "none";
        }
    }

    document.addEventListener("click", (e) => {
        const card = e.target.closest(".dish-card");
        if (!card) return;
        
        const keyword = card.dataset.dish;
        const dish = dishes.find(d => d.keyword === keyword);
        if (!dish) return;

        selected[dish.category] = dish;

        updateUI();
    });

    document.addEventListener("click", (e) => {
        if (e.target.matches(".dish-card button")) {
            const card = e.target.closest(".dish-card");
            if (!card) return;
            
            const keyword = card.dataset.dish;
            const dish = dishes.find(d => d.keyword === keyword);
            if (!dish) return;
        
            selected[dish.category] = dish;
            
            updateUI();
        }
    });
});