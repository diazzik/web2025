async function loadDishes() {
  try {
    const res = await fetch("https://edu.std-900.ist.mospolytech.ru/labs/api/dishes?api_key=f670b644-5729-414b-a9aa-293521e72046");
    if (!res.ok) throw new Error("Ошибка API");
    dishes = await res.json();

    // Загружаем сохраненный заказ
    const savedOrder = loadOrderFromStorage();
    
    // рендерим все категории
    renderCategory("soup",    document.getElementById("soups"));
    renderCategory("main-course", document.getElementById("main"));
    renderCategory("drink",   document.getElementById("drinks"));
    renderCategory("salad",   document.getElementById("salads"));
    renderCategory("dessert", document.getElementById("desserts"));

    // ВАЖНО: инициализируем фильтры только после рендера
    if (typeof initFilters === "function") initFilters();
    
    // Обновляем панель заказа
    if (typeof updateOrderPanel === "function") updateOrderPanel();
    
  } catch (err) {
    console.error(err);
  }
}