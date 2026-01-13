document.addEventListener("DOMContentLoaded", () => {
    setTimeout(() => {
        const form = document.querySelector(".order-form");
        
        if (!form) {
            console.warn("Форма .order-form не найдена на странице");
            return;
        }
        
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            const picked = {
                soup: document.getElementById("input-soup")?.value || "",
                main: document.getElementById("input-main")?.value || "",
                drink: document.getElementById("input-drink")?.value || "",
                salad: document.getElementById("input-salad")?.value || "",
                dessert: document.getElementById("input-dessert")?.value || ""
            };
            
            const has = { 
                soup: !!picked.soup, 
                main: !!picked.main, 
                drink: !!picked.drink, 
                salad: !!picked.salad, 
                dessert: !!picked.dessert 
            };

            if (!has.soup && !has.main && !has.drink && !has.salad && !has.dessert) {
                showAlert("Ничего не выбрано. Выберите блюда для заказа");
                return;
            }
            if (!has.drink) {
                showAlert("Выберите напиток");
                return;
            }
            if (has.soup && !has.main && !has.salad) {
                showAlert("Выберите главное блюдо или салат/стартер");
                return;
            }
            if (has.salad && !has.soup && !has.main) {
                showAlert("Выберите суп или главное блюдо");
                return;
            }
            if (has.drink && !has.soup && !has.main && !has.salad) {
                showAlert("Выберите главное блюдо");
                return;
            }

            form.submit();
        });

        function showAlert(text) {
            const cont = document.getElementById("alert-container");
            if (!cont) {
                console.error("Контейнер alert-container не найден");
                alert(text);
                return;
            }
            
            cont.innerHTML = "";
            const modal = document.createElement("div");
            modal.className = "alert-modal";
            modal.innerHTML = `<p>${text}</p><button>Окей</button>`;
            modal.querySelector("button").onclick = () => modal.remove();
            cont.appendChild(modal);
        }
    }, 100);
});