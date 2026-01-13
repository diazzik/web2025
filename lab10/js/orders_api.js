const API_KEY = 'f670b644-5729-414b-a9aa-293521e72046';
const API_BASE_URL = 'https://edu.std-900.ist.mospolytech.ru/labs/api';

async function getAllOrders() {
    try {
        console.log('Запрос заказов...');
        const response = await fetch(`${API_BASE_URL}/orders?api_key=${API_KEY}`);
        
        if (!response.ok) {
            throw new Error(`Ошибка сервера: ${response.status}`);
        }
        
        const orders = await response.json();
        console.log('Получено заказов:', orders.length);
        return orders;
        
    } catch (error) {
        console.error('Ошибка при получении заказов:', error);
        throw error;
    }
}

async function getOrderById(orderId) {
    try {
        const response = await fetch(`${API_BASE_URL}/orders/${orderId}?api_key=${API_KEY}`);
        
        if (!response.ok) {
            throw new Error('Ошибка загрузки заказа');
        }
        
        return await response.json();
        
    } catch (error) {
        console.error('Ошибка при получении заказа:', error);
        throw error;
    }
}

async function updateOrder(orderId, orderData) {
    try {
        const response = await fetch(`${API_BASE_URL}/orders/${orderId}?api_key=${API_KEY}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(orderData)
        });
        
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Ошибка обновления заказа');
        }
        
        return await response.json();
        
    } catch (error) {
        console.error('Ошибка при обновлении заказа:', error);
        throw error;
    }
}

async function deleteOrder(orderId) {
    try {
        const response = await fetch(`${API_BASE_URL}/orders/${orderId}?api_key=${API_KEY}`, {
            method: 'DELETE'
        });
        
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Ошибка удаления заказа');
        }
        
        return await response.json();
        
    } catch (error) {
        console.error('Ошибка при удалении заказа:', error);
        throw error;
    }
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

function getDishNamesFromOrder(order) {
    const dishNames = [];
    
    if (order.soup_id) dishNames.push('Суп');
    if (order.main_course_id) dishNames.push('Главное блюдо');
    if (order.salad_id) dishNames.push('Салат');
    if (order.drink_id) dishNames.push('Напиток');
    if (order.dessert_id) dishNames.push('Десерт');
    
    return dishNames.length > 0 ? dishNames.join(', ') : 'Не указан';
}

function calculateOrderTotal(order) {
    const prices = {
        soup: 200,
        main_course: 350,
        salad: 150,
        drink: 100,
        dessert: 120
    };
    
    let total = 0;
    
    if (order.soup_id) total += prices.soup;
    if (order.main_course_id) total += prices.main_course;
    if (order.salad_id) total += prices.salad;
    if (order.drink_id) total += prices.drink;
    if (order.dessert_id) total += prices.dessert;
    
    return total;
}

function formatDeliveryTime(order) {
    if (order.delivery_type === 'by_time' && order.delivery_time) {
        return `На ${order.delivery_time}`;
    }
    return 'Как можно скорее (с 7:00 до 23:00)';
}

function showAlert(text, isError = false) {
    const cont = document.getElementById("alert-container");
    if (!cont) return;
    
    cont.innerHTML = "";
    const modal = document.createElement("div");
    modal.className = "alert-modal";
    modal.innerHTML = `<p>${text}</p><button onclick="this.parentElement.remove()">Окей</button>`;
    
    if (isError) {
        modal.style.backgroundColor = '#ffebee';
        modal.style.color = '#c62828';
    } else {
        modal.style.backgroundColor = '#e8f5e9';
        modal.style.color = '#2e7d32';
    }
    
    cont.appendChild(modal);
}

let allDishes = [];

async function loadAllDishes() {
    try {
        console.log('Загрузка списка блюд...');
        const response = await fetch(`${API_BASE_URL}/dishes?api_key=${API_KEY}`);
        
        if (!response.ok) {
            throw new Error(`Ошибка загрузки блюд: ${response.status}`);
        }
        
        allDishes = await response.json();
        console.log('Загружено блюд:', allDishes.length);
        return allDishes;
        
    } catch (error) {
        console.error('Ошибка при загрузке блюд:', error);
        throw error;
    }
}

function getDishById(dishId) {
    if (!allDishes || allDishes.length === 0) {
        console.warn('Список блюд не загружен');
        return null;
    }
    
    const dish = allDishes.find(d => d.id === dishId);
    
    if (!dish) {
        console.warn(`Блюдо с ID ${dishId} не найдено`);
    }
    
    return dish;
}

function getDishNameById(dishId) {
    const dish = getDishById(dishId);
    return dish ? dish.name : `Блюдо #${dishId}`;
}

function getDishPriceById(dishId) {
    const dish = getDishById(dishId);
    return dish ? dish.price : 0;
}

function getDishNamesFromOrder(order) {
    const dishNames = [];
    
    if (order.soup_id) {
        dishNames.push(getDishNameById(order.soup_id));
    }
    if (order.main_course_id) {
        dishNames.push(getDishNameById(order.main_course_id));
    }
    if (order.salad_id) {
        dishNames.push(getDishNameById(order.salad_id));
    }
    if (order.drink_id) {
        dishNames.push(getDishNameById(order.drink_id));
    }
    if (order.dessert_id) {
        dishNames.push(getDishNameById(order.dessert_id));
    }
    
    return dishNames.length > 0 ? dishNames.join(', ') : 'Не указан';
}

function calculateOrderTotal(order) {
    let total = 0;
    
    if (order.soup_id) total += getDishPriceById(order.soup_id);
    if (order.main_course_id) total += getDishPriceById(order.main_course_id);
    if (order.salad_id) total += getDishPriceById(order.salad_id);
    if (order.drink_id) total += getDishPriceById(order.drink_id);
    if (order.dessert_id) total += getDishPriceById(order.dessert_id);
    
    return total;
}