async function loadDishes() {
  try {
    const res = await fetch("https://edu.std-900.ist.mospolytech.ru/labs/api/dishes");
    if (!res.ok) throw new Error("Ошибка API");
    dishes = await res.json();

    renderCategory("soup",    document.getElementById("soups"));
    renderCategory("main-course",    document.getElementById("main"));
    renderCategory("drink",   document.getElementById("drinks"));
    renderCategory("salad",   document.getElementById("salads"));
    renderCategory("dessert", document.getElementById("desserts"));

    if (typeof initFilters === "function") initFilters();
  } catch (err) {
    console.error(err);
  }
}

document.addEventListener("DOMContentLoaded", loadDishes);
