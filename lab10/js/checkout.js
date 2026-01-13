let currentOrder = {};

async function loadAndDisplayOrder() {
    const container = document.getElementById('order-items-container');
    const emptyMessage = document.getElementById('empty-order-message');
    const orderForm = document.querySelector('.order-form-section');
    
    if (!container || !emptyMessage) return;
    
    if (dishes.length === 0) {
        try {
            const res = await fetch("https://edu.std-900.ist.mospolytech.ru/labs/api/dishes?api_key=f670b644-5729-414b-a9aa-293521e72046");
            dishes = await res.json();
        } catch (error) {
            console.error('Ошибка загрузки блюд:', error);
            return;
        }
    }
    
    currentOrder = getCurrentOrder() || {};
    
    const selectedCount = Object.values(currentOrder).filter(Boolean).length;
    
    if (selectedCount === 0) {
        container.innerHTML = '';
        emptyMessage.style.display = 'block';
        orderForm.style.display = 'none';
        return;
    }
    
    emptyMessage.style.display = 'none';
    orderForm.style.display = 'block';
    
    container.innerHTML = '';
    
    for (const [category, dish] of Object.entries(currentOrder)) {
        if (dish) {
            const card = createOrderItemCard(dish, category);
            container.appendChild(card);
        }
    }
    
    updateOrderForm();
}

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
    
    const deleteBtn = card.querySelector('.delete-btn');
    deleteBtn.addEventListener('click', () => removeDishFromOrder(dish.keyword, category));
    
    return card;
}

function removeDishFromOrder(keyword, category) {
    if (currentOrder[category] && currentOrder[category].keyword === keyword) {
        delete currentOrder[category];
    }
    
    const orderToSave = {};
    for (const cat in currentOrder) {
        if (currentOrder[cat]) {
            orderToSave[cat] = currentOrder[cat].keyword;
        }
    }
    localStorage.setItem('businessLunchOrder', JSON.stringify(orderToSave));
    
    loadAndDisplayOrder();
}

function updateOrderForm() {
    if (!currentOrder) return;
    
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
    
    const totalPrice = calculateTotalPrice(currentOrder);
    const totalElement = document.getElementById('order-total');
    if (totalElement) {
        totalElement.textContent = `Стоимость заказа: ${totalPrice} ₽`;
    }
    
    const isValidCombo = checkComboValidity(currentOrder);
    const submitBtn = document.querySelector('.submit-btn');
    if (submitBtn) {
        submitBtn.disabled = !isValidCombo;
    }
}

function clearOrder() {
    if (confirm('Вы уверены, что хотите очистить весь заказ?')) {
        clearOrderFromStorage();
        currentOrder = {};
        loadAndDisplayOrder();
    }
}

document.addEventListener('DOMContentLoaded', function() {
    loadAndDisplayOrder();
    
    const clearBtn = document.getElementById('clear-order-btn');
    if (clearBtn) {
        clearBtn.addEventListener('click', clearOrder);
    }
    
    window.updateOrderDisplay = loadAndDisplayOrder;
});