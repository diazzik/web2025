// js/checkout.js - логика страницы оформления заказа

let currentOrder = {};

// Загрузить и отобразить заказ
async function loadAndDisplayOrder() {
    const container = document.getElementById('order-items-container');
    const emptyMessage = document.getElementById('empty-order-message');
    const orderForm = document.querySelector('.order-form-section');
    
    if (!container || !emptyMessage) return;
    
    // Загружаем блюда если ещё не загружены
    if (dishes.length === 0) {
        try {
            const res = await fetch("https://edu.std-900.ist.mospolytech.ru/labs/api/dishes?api_key=f670b644-5729-414b-a9aa-293521e72046");
            dishes = await res.json();
        } catch (error) {
            console.error('Ошибка загрузки блюд:', error);
            return;
        }
    }
    
    // Загружаем заказ из localStorage
    currentOrder = getCurrentOrder() || {};
    
    // Проверяем, есть ли выбранные блюда
    const selectedCount = Object.values(currentOrder).filter(Boolean).length;
    
    if (selectedCount === 0) {
        container.innerHTML = '';
        emptyMessage.style.display = 'block';
        orderForm.style.display = 'none';
        return;
    }
    
    // Скрываем сообщение о пустом заказе
    emptyMessage.style.display = 'none';
    orderForm.style.display = 'block';
    
    // Отображаем выбранные блюда
    container.innerHTML = '';
    
    for (const [category, dish] of Object.entries(currentOrder)) {
        if (dish) {
            const card = createOrderItemCard(dish, category);
            container.appendChild(card);
        }
    }
    
    // Обновляем форму заказа
    updateOrderForm();
}

// Создать карточку блюда для страницы заказа
function createOrderItemCard(dish, category) {
    const card = document.createElement("div");
    card.className = "dish-card";
    card.dataset.dish = dish.keyword;
    card.dataset.category = category;

    card.innerHTML = `
        <img src="${dish.image}" alt="${dish.name}">
        <p class="price">${dish.price} ₽</p>
        <p class="title">${dish.name}</p>
        <p class="weight">${dish.count}</p>
        <button class="delete-btn">Удалить</button>
    `;
    
    // Добавляем обработчик удаления
    const deleteBtn = card.querySelector('.delete-btn');
    deleteBtn.addEventListener('click', () => removeDishFromOrder(dish.keyword, category));
    
    return card;
}

// Удалить блюдо из заказа
function removeDishFromOrder(keyword, category) {
    // Удаляем из текущего заказа
    if (currentOrder[category] && currentOrder[category].keyword === keyword) {
        delete currentOrder[category];
    }
    
    // Обновляем localStorage
    const orderToSave = {};
    for (const cat in currentOrder) {
        if (currentOrder[cat]) {
            orderToSave[cat] = currentOrder[cat].keyword;
        }
    }
    localStorage.setItem('businessLunchOrder', JSON.stringify(orderToSave));
    
    // Обновляем отображение
    loadAndDisplayOrder();
}

// Обновить форму заказа
function updateOrderForm() {
    if (!currentOrder) return;
    
    // Обновляем отображение в левой части формы
    const categories = ['soup', 'main-course', 'drink', 'salad', 'dessert'];
    
    categories.forEach(category => {
        const dish = currentOrder[category];
        const contentElement = document.getElementById(`content-${category === 'main-course' ? 'main' : category}`);
        const inputElement = document.getElementById(`input-${category === 'main-course' ? 'main' : category}`);
        
        if (contentElement) {
            if (dish) {
                contentElement.textContent = `${dish.name} — ${dish.price} ₽`;
                if (inputElement) inputElement.value = dish.id;
            } else {
                contentElement.textContent = category === 'main-course' ? 'Не выбрано' : 'Не выбран';
                if (inputElement) inputElement.value = '';
            }
        }
    });
    
    // Обновляем общую стоимость
    const totalPrice = calculateTotalPrice(currentOrder);
    const totalElement = document.getElementById('order-total');
    if (totalElement) {
        totalElement.textContent = `Стоимость заказа: ${totalPrice} ₽`;
    }
    
    // Проверяем валидность комбо
    const isValidCombo = checkComboValidity(currentOrder);
    const submitBtn = document.querySelector('.submit-btn');
    if (submitBtn) {
        submitBtn.disabled = !isValidCombo;
    }
}

// Очистить весь заказ
function clearOrder() {
    if (confirm('Вы уверены, что хотите очистить весь заказ?')) {
        clearOrderFromStorage();
        currentOrder = {};
        loadAndDisplayOrder();
    }
}

// Инициализация страницы
document.addEventListener('DOMContentLoaded', function() {
    // Загружаем и отображаем заказ
    loadAndDisplayOrder();
    
    // Обработчик кнопки очистки заказа
    const clearBtn = document.getElementById('clear-order-btn');
    if (clearBtn) {
        clearBtn.addEventListener('click', clearOrder);
    }
    
    // Глобальная функция для обновления отображения (используется в order_api.js)
    window.updateOrderDisplay = loadAndDisplayOrder;
});