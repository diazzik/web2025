const dishes = [
    {
        keyword: "gazpacho",
        name: "Гаспачо",
        price: 195,
        category: "soup",
        count: "350 г",
        image: "images/gazpacho.jpg",
        kind: "veg"
    },
    {
        keyword: "mushroom_soup",
        name: "Грибной суп-пюре",
        price: 185,
        category: "soup",
        count: "330 г",
        image: "images/mushroom_soup.jpg",
        kind: "veg"
    },
    {
        keyword: "norwegian_soup",
        name: "Норвежский суп",
        price: 270,
        category: "soup",
        count: "330 г",
        image: "images/norwegian_soup.jpg",
        kind: "fish"
    },
    {
        keyword: "ramen",
        name: "Рамен",
        price: 375,
        category: "soup",
        count: "425 г",
        image: "images/ramen.jpg",
        kind: "meat"
    },
    {
        keyword: "tomyum",
        name: "Том ям с креветками",
        price: 650,
        category: "soup",
        count: "500 г",
        image: "images/tomyum.jpg",
        kind: "fish"
    },
    {
        keyword: "chicken",
        name: "Куриный суп",
        price: 330,
        category: "soup",
        count: "350 г",
        image: "images/chicken.jpg",
        kind: "meat"
    },
    {
        keyword: "chinese1",
        name: "Китайский суп «Вонтон» с пельменями",
        price: 300,
        category: "soup",
        count: "200 г",
        image: "images/chinese1.jpg",
        kind: "chinese"
    },
    {
        keyword: "chinese2",
        name: "Китайский остро-кислый суп",
        price: 350,
        category: "soup",
        count: "250 г",
        image: "images/chinese2.jpg",
        kind: "chinese"
    },


    {
        keyword: "friedpotatoeswithmushrooms",
        name: "Жареный картофель с грибами",
        price: 150,
        category: "main",
        count: "250 г",
        image: "images/friedpotatoeswithmushrooms1.jpg",
        kind: "veg"
    },
    {
        keyword: "lasagna",
        name: "Лазанья",
        price: 385,
        category: "main",
        count: "310 г",
        image: "images/lasagna.jpg",
        kind: "veg"
    },
    {
        keyword: "chickencutletsandmashedpotatoes",
        name: "Котлеты из курицы с картофельным пюре",
        price: 225,
        category: "main",
        count: "280 г",
        image: "images/chickencutletsandmashedpotatoes.jpg",
        kind: "meat"
    },
    {
        keyword: "fishrice",
        name: "Рыбная котлета с рисом и спаржей",
        price: 320,
        category: "main",
        count: "270 г",
        image: "images/fishrice.jpg",
        kind: "fish"
    },
    {
        keyword: "pizza",
        name: "Пицца Маргарита",
        price: 450,
        category: "main",
        count: "470 г",
        image: "images/pizza.jpg",
        kind: "meat"
    },
    {
        keyword: "shrimppasta",
        name: "Паста с креветками",
        price: 340,
        category: "main",
        count: "280 г",
        image: "images/shrimppasta.jpg",
        kind: "fish"
    },

    {
        keyword: "orange",
        name: "Апельсиновый сок",
        price: 120,
        category: "drink",
        count: "300 мл",
        image: "images/orangejuice.jpg",
        kind: "cold"
    },
    {
        keyword: "apple",
        name: "Яблочный сок",
        price: 90,
        category: "drink",
        count: "300 мл",
        image: "images/applejuice.jpg",
        kind: "cold"
    },
    {
        keyword: "carrot",
        name: "Морковный сок",
        price: 110,
        category: "drink",
        count: "300 мл",
        image: "images/carrotjuice.jpg",
        kind: "cold"
    },
    {
        keyword: "cappuccino",
        name: "Капучино",
        price: 180,
        category: "drink",
        count: "300 мл",
        image: "images/cappuccino.jpg",
        kind: "hot"
    },
    {
        keyword: "greentea",
        name: "Зеленый чай",
        price: 100,
        category: "drink",
        count: "300 мл",
        image: "images/greentea.jpg",
        kind: "hot"
    },
    {
        keyword: "tea",
        name: "Черный чай",
        price: 90,
        category: "drink",
        count: "300 мл",
        image: "images/tea.jpg",
        kind: "hot"
    },
    {
        keyword: "water",
        name: "Вода",
        price: 50,
        category: "drink",
        count: "300 мл",
        image: "images/water.jpg",
        kind: "water"
    },

    {
        keyword: "saladwithegg",
        name: "Корейский салат с овощами и яйцом",
        price: 330,
        category: "salad",
        count: "250 г",
        image: "images/saladwithegg.jpg",
        kind: "veg"
    },
    {
        keyword: "caesar",
        name: "Цезарь с цыпленком",
        price: 370,
        category: "salad",
        count: "220 г",
        image: "images/caesar.jpg",
        kind: "meat"
    },
    {
        keyword: "caprese",
        name: "Капрезе с моцареллой",
        price: 350,
        category: "salad",
        count: "235 г",
        image: "images/caprese.jpg",
        kind: "veg"
    },
    {
        keyword: "tunasalad",
        name: "Салат с тунцом",
        price: 480,
        category: "salad",
        count: "250 г",
        image: "images/tunasalad.jpg",
        kind: "fish"
    },
    {
        keyword: "frenchfries1",
        name: "Картофель фри с соусом Цезарь",
        price: 280,
        category: "salad",
        count: "235 г",
        image: "images/frenchfries1.jpg",
        kind: "veg"
    },
    {
        keyword: "frenchfries2",
        name: "Картофель фри с кетчупом",
        price: 260,
        category: "salad",
        count: "235 г",
        image: "images/frenchfries2.jpg",
        kind: "veg"
    },

    {
        keyword: "baklava",
        name: "Похлава",
        price: 220,
        category: "dessert",
        count: "300 г",
        image: "images/baklava.jpg",
        kind: "medium"
    },
    {
        keyword: "checheesecake",
        name: "Чизкейк",
        price: 240,
        category: "dessert",
        count: "125 г",
        image: "images/checheesecake.jpg",
        kind: "small"
    },
        {
        keyword: "chocolatecheesecake",
        name: "Шоколадный чизкейк",
        price: 260,
        category: "dessert",
        count: "125 г",
        image: "images/chocolatecheesecake.jpg",
        kind: "small"
    },
        {
        keyword: "chocolatecake",
        name: "Шоколадный торт",
        price: 270,
        category: "dessert",
        count: "140 г",
        image: "images/chocolatecake.jpg",
        kind: "small"
    },
    {
        keyword: "donuts2",
        name: "Пончики (3 штуки)",
        price: 410,
        category: "dessert",
        count: "350 г",
        image: "images/donuts2.jpg",
        kind: "medium"
    },
    {
        keyword: "donuts",
        name: "Пончики (6 штук)",
        price: 650,
        category: "dessert",
        count: "700 г",
        image: "images/donuts.jpg",
        kind: "big"
    },
];