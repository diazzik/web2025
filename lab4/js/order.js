// js/order.js
document.addEventListener("DOMContentLoaded", () => {

    const selected = {
        soup: null,
        main: null,
        drink: null
    };

    // Элементы интерфейса
    const contentSoup = document.getElementById("content-soup");
    const contentMain = document.getElementById("content-main");
    const contentDrink = document.getElementById("content-drink");

    const titleSoup = document.getElementById("title-soup");
    const titleMain = document.getElementById("title-main");
    const titleDrink = document.getElementById("title-drink");

    const blockSoup = document.getElementById("order-soup");
    const blockMain = document.getElementById("order-main");
    const blockDrink = document.getElementById("order-drink");

    const inputSoup = document.getElementById("input-soup");
    const inputMain = document.getElementById("input-main");
    const inputDrink = document.getElementById("input-drink");

    const orderTotal = document.getElementById("order-total");

    // Главный блок — показываем когда ничего не выбрано
    const orderSelection = document.querySelector(".order-selection");

    // ИНИЦИАЛИЗАЦИЯ
    function initializeUI() {
        // Показываем только одну строку
        contentSoup.textContent = "Ничего не выбрано";

        // Скрываем остальные категории целиком
        blockMain.style.display = "none";
        blockDrink.style.display = "none";

        // Исключение: блок SUP может быть видим, но только он
        blockSoup.style.display = "block";
        titleSoup.style.display = "none";

        // Скрываем стоимость
        orderTotal.style.display = "none";

        inputSoup.value = "";
        inputMain.value = "";
        inputDrink.value = "";
    }

    initializeUI();

    // Обновление UI после выбора
    function updateUI() {
        const chosenCount =
            (selected.soup ? 1 : 0) +
            (selected.main ? 1 : 0) +
            (selected.drink ? 1 : 0);

        if (chosenCount === 0) {
            initializeUI();
            return;
        }

        // Показываем все категории
        blockSoup.style.display = "block";
        blockMain.style.display = "block";
        blockDrink.style.display = "block";

        // Показываем заголовки
        titleSoup.style.display = "";
        titleMain.style.display = "";
        titleDrink.style.display = "";

        // Суп
        if (selected.soup) {
            contentSoup.textContent = `${selected.soup.name} — ${selected.soup.price} ₽`;
            inputSoup.value = selected.soup.keyword;
        } else {
            contentSoup.textContent = "Суп не выбран";
            inputSoup.value = "";
        }

        // Главное
        if (selected.main) {
            contentMain.textContent = `${selected.main.name} — ${selected.main.price} ₽`;
            inputMain.value = selected.main.keyword;
        } else {
            contentMain.textContent = "Главное блюдо не выбрано";
            inputMain.value = "";
        }

        // Напиток
        if (selected.drink) {
            contentDrink.textContent = `${selected.drink.name} — ${selected.drink.price} ₽`;
            inputDrink.value = selected.drink.keyword;
        } else {
            contentDrink.textContent = "Напиток не выбран";
            inputDrink.value = "";
        }

        // Итоговая стоимость
        const total =
            (selected.soup ? selected.soup.price : 0) +
            (selected.main ? selected.main.price : 0) +
            (selected.drink ? selected.drink.price : 0);

        orderTotal.style.display = "block";
        orderTotal.textContent = `Стоимость заказа: ${total} ₽`;
    }

    // Выбор блюда по клику
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
