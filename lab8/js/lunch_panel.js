// js/lunch_panel.js - управление панелью заказа на странице lunch.html

function updateOrderPanel() {
    const panel = document.getElementById('order-panel');
    const orderItems = document.getElementById('panel-order-items');
    const orderTotal = document.getElementById('panel-order-total');
    const checkoutLink = document.getElementById('go-to-checkout');
    
    if (!panel || !orderItems || !orderTotal || !checkoutLink) return;
    
    // Загружаем текущий заказ
    const currentOrder = getCurrentOrder() || {};
    const selectedCount = Object.values(currentOrder).filter(Boolean).length;
    
    // Показываем/скрываем панель
    if (selectedCount === 0) {
        panel.style.display = 'none';
        return;
    }
    
    panel.style.display = 'block';
    
    // Обновляем список блюд
    let itemsHTML = '';
    let totalPrice = 0;
    
    for (const [category, dish] of Object.entries(currentOrder)) {
        if (dish) {
            const categoryName = getCategoryDisplayName(category);
            itemsHTML += `<div>${categoryName}: ${dish.name} - ${dish.price} ₽</div>`;
            totalPrice += dish.price;
        }
    }
    
    orderItems.innerHTML = itemsHTML;
    orderTotal.textContent = `Итого: ${totalPrice} ₽`;
    
    // Проверяем валидность комбо
    const isValidCombo = checkComboValidity(currentOrder);
    checkoutLink.disabled = !isValidCombo;
    
    if (isValidCombo) {
        checkoutLink.removeAttribute('disabled');
        checkoutLink.style.opacity = '1';
        checkoutLink.style.cursor = 'pointer';
    } else {
        checkoutLink.setAttribute('disabled', 'disabled');
        checkoutLink.style.opacity = '0.6';
        checkoutLink.style.cursor = 'not-allowed';
    }
}

// Получить отображаемое имя категории
function getCategoryDisplayName(category) {
    const names = {
        'soup': 'Суп',
        'main-course': 'Главное',
        'drink': 'Напиток',
        'salad': 'Салат',
        'dessert': 'Десерт'
    };
    return names[category] || category;
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    // Загружаем блюда если нужно
    if (typeof loadDishes === 'function') {
        loadDishes().then(() => {
            updateOrderPanel();
        });
    } else {
        updateOrderPanel();
    }
    
    // Обновляем панель при клике на кнопку "Добавить"
    document.addEventListener('click', function(e) {
        if (e.target.matches('.dish-card button') || e.target.closest('.dish-card')) {
            setTimeout(updateOrderPanel, 100);
        }
    });
});

// Сделать функцию глобально доступной
window.updateOrderPanel = updateOrderPanel;