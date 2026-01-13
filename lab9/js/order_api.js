const API_KEY = 'f670b644-5729-414b-a9aa-293521e72046'; // Замените на ваш ключ
const API_BASE_URL = 'https://edu.std-900.ist.mospolytech.ru/labs/api';

function showAlert(text, isError = false) {
    const cont = document.getElementById("alert-container");
    if (!cont) return;
    
    cont.innerHTML = "";
    const modal = document.createElement("div");
    modal.className = "alert-modal";
    modal.innerHTML = `<p>${text}</p><button>Окей</button>`;
    
    if (isError) {
        modal.style.backgroundColor = '#ffebee';
        modal.style.color = '#c62828';
    } else {
        modal.style.backgroundColor = '#e8f5e9';
        modal.style.color = '#2e7d32';
    }
    
    modal.querySelector("button").onclick = () => modal.remove();
    cont.appendChild(modal);
}

function validateDeliveryTime(deliveryTime, deliveryType) {
    if (deliveryType === 'by_time' && !deliveryTime) {
        return 'Укажите время доставки';
    }
    
    if (deliveryType === 'by_time' && deliveryTime) {
        const [hours, minutes] = deliveryTime.split(':').map(Number);
        const now = new Date();
        const deliveryDate = new Date();
        deliveryDate.setHours(hours, minutes, 0, 0);
        
        if (deliveryDate < now) {
            return 'Время доставки не может быть в прошлом';
        }
        
        if (hours < 7 || hours > 23 || (hours === 23 && minutes > 0)) {
            return 'Доставка доступна с 7:00 до 23:00';
        }
    }
    
    return null;
}

async function submitOrder(orderData) {
    try {
        const url = `${API_BASE_URL}/orders?api_key=${API_KEY}`;
        
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(orderData)
        });
        
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || `Ошибка сервера: ${response.status}`);
        }
        
        const result = await response.json();
        return result;
        
    } catch (error) {
        console.error('Ошибка при отправке заказа:', error);
        throw error;
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const checkoutForm = document.getElementById('checkout-form');
    if (!checkoutForm) return;
    
    const deliveryTypeRadios = document.querySelectorAll('input[name="delivery_type"]');
    const deliveryTimeContainer = document.getElementById('delivery-time-container');
    const deliveryTimeInput = document.getElementById('time');
    
    deliveryTypeRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            if (this.value === 'by_time') {
                deliveryTimeContainer.style.display = 'block';
                deliveryTimeInput.required = true;
            } else {
                deliveryTimeContainer.style.display = 'none';
                deliveryTimeInput.required = false;
            }
        });
    });
    
    checkoutForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const formData = new FormData(checkoutForm);
        const orderData = {};

        for (const [key, value] of formData.entries()) {
            if (key === 'subscribe') {
                orderData[key] = value === '1' ? 1 : 0;
            } else {
                orderData[key] = value;
            }
        }
        
        Object.keys(orderData).forEach(key => {
            if (orderData[key] === '') {
                delete orderData[key];
            }
        });
        
        const currentOrder = getCurrentOrder();
        if (!checkComboValidity(currentOrder)) {
            showAlert('Выберите одно из доступных комбо блюд', true);
            return;
        }
        
        const timeError = validateDeliveryTime(orderData.delivery_time, orderData.delivery_type);
        if (timeError) {
            showAlert(timeError, true);
            return;
        }
        
        const dishIds = getOrderIdsForAPI();
        Object.assign(orderData, dishIds);
        
        const requiredFields = ['full_name', 'email', 'phone', 'delivery_address', 'delivery_type'];
        const missingFields = requiredFields.filter(field => !orderData[field]);
        
        if (missingFields.length > 0) {
            showAlert('Заполните все обязательные поля', true);
            return;
        }
        
        if (!orderData.drink_id) {
            showAlert('Выберите напиток', true);
            return;
        }
        
        try {
            const submitBtn = checkoutForm.querySelector('.submit-btn');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Отправка...';
            submitBtn.disabled = true;
            
            const result = await submitOrder(orderData);
            
            clearOrderFromStorage();
            
            showAlert('Заказ успешно оформлен! Номер заказа: ' + result.id, false);
            
            checkoutForm.reset();
            
            if (typeof updateOrderDisplay === 'function') {
                updateOrderDisplay();
            }
            
        } catch (error) {
            showAlert('Ошибка при оформлении заказа: ' + error.message, true);
        } finally {
            const submitBtn = checkoutForm.querySelector('.submit-btn');
            if (submitBtn) {
                submitBtn.textContent = 'Оформить заказ';
                submitBtn.disabled = false;
            }
        }
    });
});