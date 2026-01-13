document.addEventListener("DOMContentLoaded", () => {

    const filterState = {
        soup: null,
        main: null,
        drink: null,
        salad: null,
        dessert: null
    };

    const categories = [
        { id: "filters-soup",    cat: "soup",    block: "soups" },
        { id: "filters-main",    cat: "main",    block: "main" },
        { id: "filters-drink",   cat: "drink",   block: "drinks" },
        { id: "filters-salad",   cat: "salad",   block: "salads" },
        { id: "filters-dessert", cat: "dessert", block: "desserts" }
    ];

    categories.forEach(({ id, cat, block }) => {

        const filterBlock = document.getElementById(id);
        const container = document.getElementById(block);

        filterBlock.addEventListener("click", e => {
            if (!e.target.matches("button")) return;

            const kind = e.target.dataset.kind;

            if (filterState[cat] === kind) {
                filterState[cat] = null;
                e.target.classList.remove("active");
                renderCategory(cat, container);
                return;
            }

            [...filterBlock.querySelectorAll("button")].forEach(btn => {
                btn.classList.remove("active", "cold", "hot", "water");
            });

            e.target.classList.add("active");
            if (cat === "drink") {
                if (kind === "cold") e.target.classList.add("cold");
                if (kind === "hot") e.target.classList.add("hot");
                if (kind === "water") e.target.classList.add("water");
            }
            filterState[cat] = kind;

            // рендерим только выбранный тип
            renderCategory(cat, container, kind);
        });
    });

});
