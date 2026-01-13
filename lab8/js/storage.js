// js/storage.js - работа с localStorage

const STORAGE_KEY = 'businessLunchOrder';

// Сохранить текущий заказ
function saveOrderToStorage(order) {
    try {
        // Сохраняем только ключевые слова блюд
        const orderToSave = {};
        for (const category in order) {
            if (order[category]) {
                orderToSave[category] = order[category].keyword;
            }
        }
        localStorage.setItem(STORAGE_KEY, JSON.stringify(orderToSave));
        return true;
    } catch (error) {
        console.error('Ошибка сохранения заказа:', error);
        return false;
    }
}

// Загрузить заказ из localStorage
function loadOrderFromStorage() {
    try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (!saved) return null;
        
        const orderData = JSON.parse(saved);
        const order = {};
        
        // Преобразуем ключевые слова в объекты блюд
        for (const category in orderData) {
            const dish = dishes.find(d => d.keyword === orderData[category]);
            if (dish) {
                order[category] = dish;
            }
        }
        
        return order;
    } catch (error) {
        console.error('Ошибка загрузки заказа:', error);
        return null;
    }
}

// Очистить заказ из localStorage
function clearOrderFromStorage() {
    try {
        localStorage.removeItem(STORAGE_KEY);
        return true;
    } catch (error) {
        console.error('Ошибка очистки заказа:', error);
        return false;
    }
}

// Получить ID выбранных блюд для отправки на сервер
function getOrderIdsForAPI() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return {};
    
    const orderData = JSON.parse(saved);
    const ids = {};
    
    for (const category in orderData) {
        const dish = dishes.find(d => d.keyword === orderData[category]);
        if (dish) {
            // Преобразуем названия категорий в формат API
            const apiFieldName = category === 'main-course' ? 'main_course_id' : `${category}_id`;
            ids[apiFieldName] = dish.id;
        }
    }
    
    return ids;
}

// Проверить, соответствует ли заказ одному из комбо
function checkComboValidity(order) {
    const has = {
        soup: !!order.soup,
        main: !!order['main-course'],
        drink: !!order.drink,
        salad: !!order.salad,
        dessert: !!order.dessert
    };

    // Комбо 1: Суп + Главное + Салат + Напиток
    if (has.soup && has.main && has.salad && has.drink) return true;
    
    // Комбо 2: Суп + Главное + Напиток
    if (has.soup && has.main && has.drink && !has.salad) return true;
    
    // Комбо 3: Суп + Салат + Напиток
    if (has.soup && has.salad && has.drink && !has.main) return true;
    
    // Комбо 4: Главное + Салат + Напиток
    if (has.main && has.salad && has.drink && !has.soup) return true;
    
    // Комбо 5: Главное + Напиток
    if (has.main && has.drink && !has.soup && !has.salad) return true;
    
    // Десерт можно добавить к любому комбо, но отдельно - нет
    return false;
}

// Получить текущий заказ (синхронная версия)
function getCurrentOrder() {
    return loadOrderFromStorage() || {};
}

// Подсчитать общую стоимость
function calculateTotalPrice(order) {
    return Object.values(order)
        .filter(Boolean)
        .reduce((sum, dish) => sum + dish.price, 0);
}