let filterState = {
  soup: null, main: null, drink: null, salad: null, dessert: null
};

function initFilters() {
  const categories = [
    { id: "filters-soup",    cat: "soup",    block: "soups" },
    { id: "filters-main",    cat: "main-course",    block: "main" },
    { id: "filters-drink",   cat: "drink",   block: "drinks" },
    { id: "filters-salad",   cat: "salad",   block: "salads" },
    { id: "filters-dessert", cat: "dessert", block: "desserts" }
  ];

  categories.forEach(({ id, cat, block }) => {
    const filterBlock = document.getElementById(id);
    const container = document.getElementById(block);
    if (!filterBlock) return;

    filterBlock.addEventListener("click", e => {
      if (!e.target.matches("button")) return;
      const kind = e.target.dataset.kind;

      if (filterState[cat] === kind) {
        filterState[cat] = null;
        [...filterBlock.querySelectorAll("button")].forEach(btn => btn.classList.remove("active"));
        renderCategory(cat, container);
        return;
      }

      [...filterBlock.querySelectorAll("button")].forEach(btn => btn.classList.remove("active"));
      e.target.classList.add("active");
      filterState[cat] = kind;
      renderCategory(cat, container, kind);
    });
  });
}
