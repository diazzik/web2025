function updateOrderPanel() {
    const panel = document.getElementById('order-panel');
    const orderItems = document.getElementById('panel-order-items');
    const orderTotal = document.getElementById('panel-order-total');
    const checkoutLink = document.getElementById('go-to-checkout');
    
    if (!panel || !orderItems || !orderTotal || !checkoutLink) return;
    
    const currentOrder = getCurrentOrder() || {};
    const selectedCount = Object.values(currentOrder).filter(Boolean).length;
    
    if (selectedCount === 0) {
        panel.style.display = 'none';
        return;
    }
    
    panel.style.display = 'block';
    
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

document.addEventListener('DOMContentLoaded', function() {
    if (typeof loadDishes === 'function') {
        loadDishes().then(() => {
            updateOrderPanel();
        });
    } else {
        updateOrderPanel();
    }
    
    document.addEventListener('click', function(e) {
        if (e.target.matches('.dish-card button') || e.target.closest('.dish-card')) {
            setTimeout(updateOrderPanel, 100);
        }
    });
});

window.updateOrderPanel = updateOrderPanel;