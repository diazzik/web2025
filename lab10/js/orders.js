let currentOrderId = null;

async function loadOrders() {
    const loadingElement = document.getElementById('loading-orders');
    const ordersListElement = document.getElementById('orders-list');
    const noOrdersElement = document.getElementById('no-orders-message');
    const errorElement = document.getElementById('error-message');
    
    console.log('Начало загрузки заказов...');
    
    try {
        if (typeof loadAllDishes === 'function') {
            try {
                await loadAllDishes();
                console.log('Блюда загружены успешно');
            } catch (dishError) {
                console.warn('Не удалось загрузить блюда:', dishError);
            }
        }
        
        const orders = await getAllOrders();
        
        loadingElement.style.display = 'none';
        
        if (orders.length === 0) {
            noOrdersElement.style.display = 'block';
            return;
        }
        
        orders.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        
        ordersListElement.style.display = 'block';
        noOrdersElement.style.display = 'none';
        
        displayOrders(orders);
        
    } catch (error) {
        console.error('Ошибка загрузки заказов:', error);
        loadingElement.style.display = 'none';
        ordersListElement.style.display = 'none';
        errorElement.textContent = `Ошибка: ${error.message}`;
        errorElement.style.display = 'block';
    }
}
function displayOrders(ordersList) {
    const ordersListElement = document.getElementById('orders-list');
    ordersListElement.innerHTML = '';
    
    ordersList.forEach((order, index) => {
        const orderElement = createOrderElement(order, index + 1);
        ordersListElement.appendChild(orderElement);
    });
}

function createOrderElement(order, index) {
    const orderElement = document.createElement('div');
    orderElement.className = 'order-item';
    orderElement.dataset.orderId = order.id;
    
    const formattedDate = formatDate(order.created_at);
    
    const deliveryTimeText = formatDeliveryTime(order);
    
    const dishNames = getDishNamesFromOrder(order);
    
    const totalPrice = calculateOrderTotal(order);
    
    orderElement.innerHTML = `
        <div class="order-header">
            <div class="order-number">Заказ #${index}</div>
            <div class="order-date">${formattedDate}</div>
        </div>
        <div class="order-content">
            <div class="order-dishes"><strong>Состав:</strong> ${dishNames}</div>
            <div class="order-customer"><strong>Клиент:</strong> ${order.full_name}</div>
            <div class="order-address"><strong>Адрес:</strong> ${order.delivery_address}</div>
        </div>
        <div class="order-info">
            <div class="order-price">${totalPrice} ₽</div>
            <div class="order-delivery-time">${deliveryTimeText}</div>
            <div class="order-actions">
                <button class="order-action-btn view-order-btn" title="Подробнее">
                    <i class="bi bi-eye"></i>
                </button>
                <button class="order-action-btn edit-order-btn" title="Редактировать">
                    <i class="bi bi-pencil"></i>
                </button>
                <button class="order-action-btn delete-order-btn" title="Удалить">
                    <i class="bi bi-trash"></i>
                </button>
            </div>
        </div>
    `;
    
    const viewBtn = orderElement.querySelector('.view-order-btn');
    const editBtn = orderElement.querySelector('.edit-order-btn');
    const deleteBtn = orderElement.querySelector('.delete-order-btn');
    
    viewBtn.addEventListener('click', () => showOrderDetails(order.id));
    editBtn.addEventListener('click', () => editOrder(order.id));
    deleteBtn.addEventListener('click', () => confirmDeleteOrder(order.id));
    
    return orderElement;
}

async function showOrderDetails(orderId) {
    try {
        const order = await getOrderById(orderId);
        
        document.getElementById('modal-order-id').textContent = order.id;
        
        const detailsElement = document.getElementById('modal-order-details');
        
        const formattedDate = formatDate(order.created_at);
        
        const deliveryTimeText = formatDeliveryTime(order);
        
        const dishNames = getDishNamesFromOrder(order);
        
        detailsElement.innerHTML = `
            <div class="detail-row">
                <span class="detail-label">Номер заказа:</span>
                <span class="detail-value">${order.id}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Дата оформления:</span>
                <span class="detail-value">${formattedDate}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Имя клиента:</span>
                <span class="detail-value">${order.full_name}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Email:</span>
                <span class="detail-value">${order.email}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Телефон:</span>
                <span class="detail-value">${order.phone}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Адрес доставки:</span>
                <span class="detail-value">${order.delivery_address}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Состав заказа:</span>
                <span class="detail-value">${dishNames}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Время доставки:</span>
                <span class="detail-value">${deliveryTimeText}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Комментарий:</span>
                <span class="detail-value">${order.comment || '—'}</span>
            </div>
            <div class="detail-row">
                <span class="detail-label">Стоимость:</span>
                <span class="detail-value">${calculateOrderTotal(order)} ₽</span>
            </div>
        `;
        
        document.getElementById('order-details-modal').style.display = 'block';
        
    } catch (error) {
        console.error('Ошибка:', error);
        showAlert('Не удалось загрузить детали заказа', true);
    }
}

async function editOrder(orderId) {
    currentOrderId = orderId;
    
    try {
        const order = await getOrderById(orderId);
        
        document.getElementById('edit-order-id').value = order.id;
        document.getElementById('edit-modal-order-id').textContent = order.id;
        document.getElementById('edit-full-name').value = order.full_name;
        document.getElementById('edit-email').value = order.email;
        document.getElementById('edit-phone').value = order.phone;
        document.getElementById('edit-address').value = order.delivery_address;
        document.getElementById('edit-comment').value = order.comment || '';
        
        const deliveryTypeRadios = document.querySelectorAll('#edit-order-form input[name="delivery_type"]');
        deliveryTypeRadios.forEach(radio => {
            radio.checked = radio.value === order.delivery_type;
        });
        
        const timeContainer = document.getElementById('edit-delivery-time-container');
        const timeInput = document.getElementById('edit-time');
        
        if (order.delivery_type === 'by_time') {
            timeContainer.style.display = 'block';
            timeInput.value = order.delivery_time || '';
            timeInput.required = true;
        } else {
            timeContainer.style.display = 'none';
            timeInput.required = false;
        }
        
        document.getElementById('edit-order-modal').style.display = 'block';
        
    } catch (error) {
        console.error('Ошибка:', error);
        showAlert('Не удалось загрузить заказ для редактирования', true);
    }
}

function confirmDeleteOrder(orderId) {
    currentOrderId = orderId;
    document.getElementById('delete-modal-order-id').textContent = orderId;
    document.getElementById('delete-order-modal').style.display = 'block';
}

function setupEditFormHandler() {
    const form = document.getElementById('edit-order-form');
    if (!form) return;
    
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const formData = new FormData(form);
        const orderData = {};
        
        for (const [key, value] of formData.entries()) {
            if (value !== '') {
                orderData[key] = value;
            }
        }
        
        if (orderData.delivery_type === 'by_time' && !orderData.delivery_time) {
            const errorsElement = document.getElementById('edit-form-errors');
            errorsElement.textContent = 'Укажите время доставки';
            errorsElement.style.display = 'block';
            return;
        }
        
        const saveBtn = form.querySelector('.modal-save-btn');
        const originalText = saveBtn.textContent;
        
        try {
            saveBtn.textContent = 'Сохранение...';
            saveBtn.disabled = true;
            
            await updateOrder(currentOrderId, orderData);
            
            showAlert('Заказ успешно изменён');
            document.getElementById('edit-order-modal').style.display = 'none';
            
            loadOrders();
            
        } catch (error) {
            const errorsElement = document.getElementById('edit-form-errors');
            errorsElement.textContent = error.message;
            errorsElement.style.display = 'block';
        } finally {
            saveBtn.textContent = originalText;
            saveBtn.disabled = false;
        }
    });
}

function setupDeleteHandler() {
    const confirmDeleteBtn = document.getElementById('confirm-delete-btn');
    if (!confirmDeleteBtn) return;
    
    confirmDeleteBtn.addEventListener('click', async function() {
        const deleteBtn = this;
        const originalText = deleteBtn.textContent;
        
        try {
            deleteBtn.textContent = 'Удаление...';
            deleteBtn.disabled = true;
            
            await deleteOrder(currentOrderId);
            
            showAlert('Заказ успешно удалён');
            document.getElementById('delete-order-modal').style.display = 'none';
            
            loadOrders();
            
        } catch (error) {
            showAlert('Ошибка удаления заказа: ' + error.message, true);
        } finally {
            deleteBtn.textContent = originalText;
            deleteBtn.disabled = false;
        }
    });
}

function setupModalHandlers() {
    const modals = document.querySelectorAll('.modal');
    const closeButtons = document.querySelectorAll('.close-modal, .modal-cancel-btn, .modal-ok-btn');
    
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            modals.forEach(modal => {
                modal.style.display = 'none';
            });
        });
    });
    
    window.addEventListener('click', function(event) {
        modals.forEach(modal => {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        });
    });
    
    const editDeliveryTypeRadios = document.querySelectorAll('#edit-order-form input[name="delivery_type"]');
    const editTimeContainer = document.getElementById('edit-delivery-time-container');
    const editTimeInput = document.getElementById('edit-time');
    
    editDeliveryTypeRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            if (this.value === 'by_time') {
                editTimeContainer.style.display = 'block';
                editTimeInput.required = true;
            } else {
                editTimeContainer.style.display = 'none';
                editTimeInput.required = false;
                editTimeInput.value = '';
            }
        });
    });
}

document.addEventListener('DOMContentLoaded', function() {
    console.log('Страница "Заказы" загружена');
    
    setupModalHandlers();
    
    setupEditFormHandler();
    
    setupDeleteHandler();
    
    loadOrders();
});