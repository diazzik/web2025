document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".order-form");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const picked = {
      soup: document.getElementById("input-soup").value,
      main: document.getElementById("input-main").value,
      drink: document.getElementById("input-drink").value,
      salad: document.getElementById("input-salad").value,
      dessert: document.getElementById("input-dessert").value
    };
    const has = { soup: !!picked.soup, main: !!picked.main, drink: !!picked.drink, salad: !!picked.salad, dessert: !!picked.dessert };

    if (!has.soup && !has.main && !has.drink && !has.salad && !has.dessert) return showAlert("Ничего не выбрано. Выберите блюда для заказа");
    if (!has.drink) return showAlert("Выберите напиток");
    if (has.soup && !has.main && !has.salad) return showAlert("Выберите главное блюдо или салат/стартер");
    if (has.salad && !has.soup && !has.main) return showAlert("Выберите суп или главное блюдо");
    if (has.drink && !has.soup && !has.main && !has.salad) return showAlert("Выберите главное блюдо");

    form.submit();
  });

  function showAlert(text) {
    const cont = document.getElementById("alert-container");
    cont.innerHTML = "";
    const modal = document.createElement("div");
    modal.className = "alert-modal";
    modal.innerHTML = `<p>${text}</p><button>Окей</button>`;
    modal.querySelector("button").onclick = () => modal.remove();
    cont.appendChild(modal);
  }
});
