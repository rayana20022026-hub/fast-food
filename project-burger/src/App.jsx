import { useEffect, useMemo, useState } from 'react'
import './App.css'

const photos = {
  hero: 'https://pngimg.com/d/burger_sandwich_PNG4135.png',
  duo: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?auto=format&fit=crop&w=900&q=85',
  cheeseburger: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=900&q=85',
  chickenBurger: 'https://images.unsplash.com/photo-1606755962773-d324e0a13086?auto=format&fit=crop&w=900&q=85',
  pizza: 'https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?auto=format&fit=crop&w=900&q=85',
  wings: 'https://images.unsplash.com/photo-1527477396000-e27163b481c2?auto=format&fit=crop&w=900&q=85',
  nuggets: 'https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=900&q=85',
  cola: 'https://images.unsplash.com/photo-1554866585-cd94860890b7?auto=format&fit=crop&w=900&q=85',
  fanta: 'https://images.unsplash.com/photo-1624517452488-04869289c4ca?auto=format&fit=crop&w=900&q=85',
  pepsi: 'https://images.unsplash.com/photo-1629203851122-3726ecdf080e?auto=format&fit=crop&w=900&q=85',
  donuts: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=900&q=85',
  party: 'https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?auto=format&fit=crop&w=900&q=85',
  truffle: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=900&q=85',
  bbqBurger: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=900&q=85',
  fourCheese: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=900&q=85',
  bbqPizza: 'https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?auto=format&fit=crop&w=900&q=85',
  strips: 'https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=900&q=85',
  icedTea: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=900&q=85',
  cheesecake: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=900&q=85',
  sundae: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=900&q=85',
}

const translations = {
  en: {
    navMenu: 'Menu', navStory: 'Our story', navReviews: 'Reviews', openCart: 'Open cart', headerOrder: 'Your order', openStatus: '24/7 HOT DELIVERY',
    eyebrow: 'GOOD FOOD. GOOD MOOD.', heroTitle: 'Big flavor.<br />Zero <em>rules.</em>',
    heroText: 'Smash burgers, golden sides, and late-night favorites. Made fresh, delivered fast, gone in a flash.',
    orderNow: 'Order now', exploreMenu: 'Explore menu', rating: 'Loved by 12k+ locals',
    scroll: 'Scroll to explore', delivery: 'FAST DELIVERY', deliveryTime: '25–35 min',
    fresh: 'ALWAYS FRESH', freshText: 'Made to order', locations: 'IN BISHKEK', locationText: 'Your neighborhood',
    menuLabel: 'THE GOOD STUFF', menuTitle: 'Cravings, handled.', menuText: 'Big portions, better ingredients, no second guessing.',
    all: 'All', combos: 'Combos', burgers: 'Burgers', pizzaCat: 'Pizza', chicken: 'Chicken & Wings', drinks: 'Drinks', desserts: 'Desserts',
    add: 'Add', best: 'BESTSELLER 🔥', hot: 'HOT ⚡', new: 'NEW DROP', popular: 'MUST TRY 🌟',
    reviewsTag: 'THE PEOPLE HAVE SPOKEN', reviewsTitle: 'Don’t take our word for it.', reviewsText: 'Real love from the people who know good food.',
    verified: 'Verified buyer', storyTag: 'A LITTLE ABOUT US', storyTitle: 'Made for the<br />munchies.',
    storyText: 'We believe a great meal should feel like the best part of your day. So we source better, cook to order, and never skimp on the good stuff.',
    storyFact: 'Fresh ingredients. Loud flavors. Zero shortcuts.',
    footerLine: 'Good food, good people, good times.', footerRights: '© 2026 STACKED. MADE WITH EXTRA SAUCE.',
    cartTitle: 'Your bag', emptyCart: 'Your bag is looking a little hungry.', emptyHint: 'Add something delicious to get started.',
    subtotal: 'Subtotal', deliveryFee: 'Delivery', total: 'Total', checkout: 'Place order',
    deliveryIncluded: 'Calculated at checkout', freeDelivery: 'Free', close: 'Close',
    added: 'added to your bag', orderReady: 'You’re one bite away.', orderMessage: 'Thank you for your order! We will contact you shortly to confirm.',
    orderDetails: 'Your order', confirm: 'Done, thanks!', telegram: 'Share via Telegram',
    noResults: 'Nothing on the menu here yet.', searchPlaceholder: 'Search the menu',
    comboMovie: 'Strips Box', comboMovieDesc: 'Burger + crispy chicken strips + French fries + signature dip + Coca-Cola',
    comboDuo: 'Pizza Trio', comboDuoDesc: '3 large pizzas + 2 chilled drinks',
    comboFeast: 'Mega Wings Feast', comboFeastDesc: '28 spicy wings + 30cm pizza + fries + 2 signature dips + 1.5L soda',
    comboParty: 'Burger Duo Set', comboPartyDesc: '2 cheeseburgers + nuggets + golden fries + 2 soda cans',
    doubleCheese: 'Double Smash Cheeseburger', doubleCheeseDesc: 'Two smashed patties, melty cheddar, house sauce.',
    truffleBurger: 'Truffle Beef Burger', truffleBurgerDesc: 'Prime beef, aged Swiss, truffle aioli, toasted brioche.',
    chickenBurger: 'Spicy Crispy Chicken Burger', chickenBurgerDesc: 'Crispy hot chicken, cool slaw, fire sauce.',
    bbqBurger: 'BBQ Bacon Burger', bbqBurgerDesc: 'Smoky BBQ glaze, crisp bacon, cheddar, pickles.',
    pepperoni: 'Pepperoni Supreme', pepperoniDesc: 'Stone-baked crust, mozzarella, a little extra pepperoni.',
    fourCheese: '4 Cheese Gourmet', fourCheeseDesc: 'Mozzarella, gorgonzola, parmesan and creamy ricotta.',
    bbqPizza: 'BBQ Chicken Pizza', bbqPizzaDesc: 'Smoky BBQ chicken, red onion, mozzarella, fresh herbs.',
    wingsItem: 'Spicy Buffalo Wings', wingsDesc: 'Crispy, saucy Buffalo wings with a proper kick.',
    stripsItem: 'Crispy Chicken Strips', stripsDesc: 'Golden hand-breaded chicken strips with house dip.',
    nuggetsItem: 'Golden Nuggets', nuggetsDesc: 'Six crispy chicken bites with a side of dip.',
    colaItem: 'Coca-Cola', colaDesc: 'The original ice-cold classic. 0.5L',
    fantaItem: 'Fanta Orange', fantaDesc: 'Bright, bubbly orange. 0.5L',
    pepsiItem: 'Pepsi', pepsiDesc: 'Bold, cold, and ready to fizz. 0.5L',
    icedTea: 'Peach Iced Tea', icedTeaDesc: 'Brewed tea, ripe peach and a bright squeeze of lemon.',
    donutsItem: 'Sugar Rush Donuts', donutsDesc: 'Fluffy, glazed, and gone before you know it. (3 pcs)',
    cheesecake: 'New York Cheesecake', cheesecakeDesc: 'Silky baked cheesecake with a buttery biscuit base.',
    sundae: 'Classic Sundae', sundaeDesc: 'Creamy vanilla soft serve, chocolate sauce and crunchy toppings.',
    review1: 'That double cheeseburger is dangerously good. The bun, the sauce, the crunch — all of it just hits.', review2: 'Ordered for movie night and now it’s our weekly ritual. The wings are unreal.', review3: 'Finally, delivery that arrives hot and looks like the photos. The team gets it.',
    customer1: 'Aida M.', customer2: 'Timur K.', customer3: 'Nura B.',
  },
  ru: {
    navMenu: 'Меню', navStory: 'О нас', navReviews: 'Отзывы', openCart: 'Открыть корзину', headerOrder: 'Корзина', openStatus: 'ДОСТАВКА 24/7',
    eyebrow: 'ВКУСНО. ЯРКО. ПО-НАШЕМУ.', heroTitle: 'Яркий вкус.<br />Никаких <em>правил.</em>',
    heroText: 'Сочные бургеры, хрустящий картофель и любимые блюда на ночь. Готовим свежими, доставляем быстро.',
    orderNow: 'Заказать', exploreMenu: 'Смотреть меню', rating: 'Нас любят 12 000+ гостей',
    scroll: 'Листайте ниже', delivery: 'БЫСТРАЯ ДОСТАВКА', deliveryTime: '25–35 мин',
    fresh: 'ВСЕГДА СВЕЖЕЕ', freshText: 'Готовим к заказу', locations: 'В БИШКЕКЕ', locationText: 'Рядом с вами',
    menuLabel: 'ТО, ЧТО НУЖНО', menuTitle: 'Утолим любой голод.', menuText: 'Большие порции, хорошие продукты — и никаких сомнений.',
    all: 'Всё', combos: 'Комбо', burgers: 'Бургеры', pizzaCat: 'Пицца', chicken: 'Курица & крылышки', drinks: 'Напитки', desserts: 'Десерты',
    add: 'Добавить', best: 'ХИТ ПРОДАЖ 🔥', hot: 'ОСТРОЕ ⚡', new: 'НОВИНКА', popular: 'ПОПРОБУЙТЕ 🌟',
    reviewsTag: 'ВАШИ ОТЗЫВЫ', reviewsTitle: 'Лучше нас скажут гости.', reviewsText: 'Искренние отзывы тех, кто знает толк во вкусной еде.',
    verified: 'Покупка подтверждена', storyTag: 'НЕМНОГО О НАС', storyTitle: 'Созданы для<br />удовольствия.',
    storyText: 'Мы верим, что хорошая еда — лучшая часть дня. Поэтому выбираем качественные продукты, готовим после заказа и не жалеем начинки.',
    storyFact: 'Свежие продукты. Яркий вкус. Никаких компромиссов.',
    footerLine: 'Вкусная еда, хорошие люди, отличное настроение.', footerRights: '© 2026 STACKED. С ЛЮБОВЬЮ И СОУСОМ.',
    cartTitle: 'Ваша корзина', emptyCart: 'В корзине пока пусто.', emptyHint: 'Добавьте что-нибудь вкусное!',
    subtotal: 'Подытог', deliveryFee: 'Доставка', total: 'Итого', checkout: 'Оформить заказ',
    deliveryIncluded: 'Рассчитаем при оформлении', freeDelivery: 'Бесплатно', close: 'Закрыть',
    added: 'добавлено в корзину', orderReady: 'Остался один шаг до вкусного.', orderMessage: 'Спасибо за заказ! Мы скоро свяжемся с вами для подтверждения.',
    orderDetails: 'Ваш заказ', confirm: 'Готово, спасибо!', telegram: 'Поделиться в Telegram',
    noResults: 'В этой категории пока ничего нет.', searchPlaceholder: 'Найти в меню',
    comboMovie: 'Сет со стрипсами', comboMovieDesc: 'Бургер + хрустящие куриные стрипсы + картофель фри + фирменный соус + Coca-Cola',
    comboDuo: 'Пицца Трио', comboDuoDesc: '3 большие пиццы + 2 охлаждённых напитка',
    comboFeast: 'Мега Крылышки', comboFeastDesc: '28 острых крылышек + пицца 30 см + картофель фри + 2 фирменных соуса + газировка 1,5 л',
    comboParty: 'Бургер Дуэт', comboPartyDesc: '2 чизбургера + наггетсы + золотистый картофель фри + 2 банки газировки',
    doubleCheese: 'Двойной смэш-чизбургер', doubleCheeseDesc: 'Две сочные котлеты, чеддер и фирменный соус.',
    truffleBurger: 'Бургер с трюфелем', truffleBurgerDesc: 'Говядина, выдержанный швейцарский сыр и трюфельный айоли.',
    chickenBurger: 'Острый хрустящий бургер с курицей', chickenBurgerDesc: 'Хрустящая острая курица, капустный салат и соус.',
    bbqBurger: 'Бургер BBQ с беконом', bbqBurgerDesc: 'Дымный BBQ-соус, хрустящий бекон, чеддер и огурчики.',
    pepperoni: 'Пепперони Supreme', pepperoniDesc: 'Тесто из печи, моцарелла и побольше пепперони.',
    fourCheese: 'Гурме «Четыре сыра»', fourCheeseDesc: 'Моцарелла, горгонзола, пармезан и нежная рикотта.',
    bbqPizza: 'Пицца BBQ с курицей', bbqPizzaDesc: 'Курица в BBQ-соусе, красный лук, моцарелла и зелень.',
    wingsItem: 'Острые крылышки Buffalo', wingsDesc: 'Хрустящие крылышки в соусе Buffalo с огоньком.',
    stripsItem: 'Хрустящие куриные стрипсы', stripsDesc: 'Курица в золотистой панировке с фирменным соусом.',
    nuggetsItem: 'Золотистые наггетсы', nuggetsDesc: 'Шесть кусочков курицы с соусом.',
    colaItem: 'Coca-Cola', colaDesc: 'Классика со льдом. 0,5 л',
    fantaItem: 'Fanta Orange', fantaDesc: 'Яркий апельсиновый вкус. 0,5 л',
    pepsiItem: 'Pepsi', pepsiDesc: 'Насыщенная, холодная, с пузырьками. 0,5 л',
    icedTea: 'Персиковый холодный чай', icedTeaDesc: 'Заварной чай, спелый персик и лимон.',
    donutsItem: 'Пончики «Сладкий миг»', donutsDesc: 'Нежные, глазированные — три штуки.',
    cheesecake: 'Нью-Йоркский чизкейк', cheesecakeDesc: 'Нежный запечённый чизкейк на хрустящей основе.',
    sundae: 'Классический сандей', sundaeDesc: 'Нежное ванильное мороженое, шоколадный соус и хрустящая посыпка.',
    review1: 'Двойной чизбургер просто опасно вкусный. Булочка, соус, хруст — всё идеально.', review2: 'Заказали на вечер кино, теперь это наша еженедельная традиция. Крылышки — огонь!', review3: 'Наконец-то доставка приезжает горячей и выглядит как на фото. Ребята знают своё дело.',
    customer1: 'Аида М.', customer2: 'Тимур К.', customer3: 'Нура Б.',
  },
  ky: {
    navMenu: 'Меню', navStory: 'Биз жөнүндө', navReviews: 'Пикирлер', openCart: 'Себетти ачуу', headerOrder: 'Буйрутма', openStatus: '24/7 ЖЕТКИРҮҮ',
    eyebrow: 'ДААМДУУ. КӨҢҮЛДҮҮ. СЕНИКИ.', heroTitle: 'Даамы күчтүү.<br /><em>Эреже</em> жок.',
    heroText: 'Ширелүү бургерлер, кытырак картошка жана түнкү сүйүктүү тамактар. Жаңы даярдап, тез жеткиребиз.',
    orderNow: 'Буйрутма берүү', exploreMenu: 'Менюну көрүү', rating: '12 000+ конок жакшы көрөт',
    scroll: 'Төмөн карай жылдырыңыз', delivery: 'ТЕЗ ЖЕТКИРҮҮ', deliveryTime: '25–35 мүн',
    fresh: 'АР ДАЙЫМ ЖАҢЫ', freshText: 'Буйрутмага даярдалат', locations: 'БИШКЕКТЕ', locationText: 'Жаныңызда',
    menuLabel: 'ЭҢ ДААМДУУСУ', menuTitle: 'Каалооңузду кандырабыз.', menuText: 'Чоң порциялар, мыкты азыктар жана күмөнсүз даам.',
    all: 'Баары', combos: 'Комбо', burgers: 'Бургерлер', pizzaCat: 'Пицца', chicken: 'Тоок & канаттар', drinks: 'Суусундуктар', desserts: 'Таттуулар',
    add: 'Кошуу', best: 'ЭҢ САТЫЛГАН 🔥', hot: 'АЧУУ ⚡', new: 'ЖАҢЫ', popular: 'СЫНАП КӨРҮҢҮЗ 🌟',
    reviewsTag: 'КОНокторДУН ПИКИРИ', reviewsTitle: 'Бизге ишенбесеңиз, сурап көрүңүз.', reviewsText: 'Даамдуу тамакты жакшы билгендердин чыныгы пикири.',
    verified: 'Сатып алуу ырасталды', storyTag: 'БИЗ ЖӨНҮНДӨ', storyTitle: 'Даамдануу<br />үчүн жаралган.',
    storyText: 'Жакшы тамак күнүңүздүн эң сонун бөлүгү болушу керек деп ишенебиз. Ошондуктан мыкты азыктарды тандап, буйрутмага даярдайбыз.',
    storyFact: 'Жаңы азыктар. Күчтүү даам. Компромисс жок.',
    footerLine: 'Даамдуу тамак, жакшы адамдар, сонун маанай.', footerRights: '© 2026 STACKED. СИЗ ҮЧҮН ДАЯРДАЛДЫ.',
    cartTitle: 'Себетиңиз', emptyCart: 'Себетиңиз азырынча бош.', emptyHint: 'Даамдуу бир нерсе кошуңуз!',
    subtotal: 'Аралык сумма', deliveryFee: 'Жеткирүү', total: 'Жалпы', checkout: 'Буйрутма берүү',
    deliveryIncluded: 'Буйрутмада эсептелет', freeDelivery: 'Акысыз', close: 'Жабуу',
    added: 'себетке кошулду', orderReady: 'Дагы бир аз калды!', orderMessage: 'Буйрутмаңыз үчүн рахмат! Биз сиз менен тез арада байланышабыз.',
    orderDetails: 'Буйрутмаңыз', confirm: 'Даяр, рахмат!', telegram: 'Telegram менен бөлүшүү',
    noResults: 'Бул бөлүмдө азырынча тамак жок.', searchPlaceholder: 'Менюдан издөө',
    comboMovie: 'Стрипс сет', comboMovieDesc: 'Бургер + кытырак тоок стрипстери + фри + фирмалык соус + Coca-Cola',
    comboDuo: 'Пицца Трио', comboDuoDesc: '3 чоң пицца + 2 муздак суусундук',
    comboFeast: 'Мега канаттар', comboFeastDesc: '28 ачуу канат + 30 см пицца + фри + 2 фирмалык соус + 1,5 л суусундук',
    comboParty: 'Бургер дуэти', comboPartyDesc: '2 чизбургер + наггетстер + алтын түстүү фри + 2 банка суусундук',
    doubleCheese: 'Кош smash чизбургер', doubleCheeseDesc: 'Эки ширелүү котлет, чеддер жана фирмалык соус.',
    truffleBurger: 'Трюфель кошулган бургер', truffleBurgerDesc: 'Уй эти, швейцар сыры жана трюфель айоли соусу.',
    chickenBurger: 'Ачуу кытырак тоок бургер', chickenBurgerDesc: 'Кытырак ачуу тоок, капуста салаты жана соус.',
    bbqBurger: 'BBQ бекон бургер', bbqBurgerDesc: 'Ышталган BBQ соусу, кытырак бекон, чеддер жана бадыраң.',
    pepperoni: 'Pepperoni Supreme', pepperoniDesc: 'Таш меште бышкан камыр, моцарелла жана пепперони.',
    fourCheese: '«Төрт сыр» гурме пицца', fourCheeseDesc: 'Моцарелла, горгонзола, пармезан жана рикотта.',
    bbqPizza: 'BBQ тоок пиццасы', bbqPizzaDesc: 'BBQ соусундагы тоок, кызыл пияз, моцарелла жана көк чөп.',
    wingsItem: 'Ачуу Buffalo канаттары', wingsDesc: 'Ачуу Buffalo соусундагы кытырак канаттар.',
    stripsItem: 'Кытырак тоок тилкелери', stripsDesc: 'Фирмалык соус менен алтын түстө куурулган тоок.',
    nuggetsItem: 'Алтын наггетстер', nuggetsDesc: 'Соус менен берилген алты кытырак тоок эти.',
    colaItem: 'Coca-Cola', colaDesc: 'Муздак классикалык даам. 0,5 л',
    fantaItem: 'Fanta Orange', fantaDesc: 'Апельсиндин жаркын даамы. 0,5 л',
    pepsiItem: 'Pepsi', pepsiDesc: 'Күчтүү, муздак жана көбүктүү. 0,5 л',
    icedTea: 'Шабдалы муздак чайы', icedTeaDesc: 'Демделген чай, бышкан шабдалы жана лимон.',
    donutsItem: 'Таттуу пончиктер', donutsDesc: 'Жумшак, глазурь менен — үч даана.',
    cheesecake: 'Нью-Йорк чизкейки', cheesecakeDesc: 'Жумшак бышырылган чизкейк жана кытырак негиз.',
    sundae: 'Классикалык сандей', sundaeDesc: 'Ваниль балмуздагы, шоколад соусу жана кытырак себинди.',
    review1: 'Кош чизбургер укмуш даамдуу. Булочкасы, соусу, кытырактыгы — баары сонун.', review2: 'Кино кечеси үчүн алып, эми жума сайын буйрутма беребиз. Канаттары укмуш!', review3: 'Акыры ысык жана сүрөттөгүдөй тамак жеткирилди. Команда өз ишин билет.',
    customer1: 'Аида М.', customer2: 'Тимур К.', customer3: 'Нура Б.',
  },
}

const categories = ['all', 'combos', 'burgers', 'pizzaCat', 'chicken', 'drinks', 'desserts']
const categoryIcons = {
  all: '🍱',
  combos: '⚡',
  burgers: '🍔',
  pizzaCat: '🍕',
  chicken: '🍗',
  drinks: '🥤',
  desserts: '🍰',
}
const products = [
  { id: 'strips-box', name: 'comboMovie', description: 'comboMovieDesc', category: 'combos', price: 990, image: photos.strips, badge: 'best' },
  { id: 'pizza-trio', name: 'comboDuo', description: 'comboDuoDesc', category: 'combos', price: 2490, image: photos.party, badge: 'popular' },
  { id: 'mega-wings', name: 'comboFeast', description: 'comboFeastDesc', category: 'combos', price: 2790, image: photos.wings, badge: 'hot' },
  { id: 'burger-duo', name: 'comboParty', description: 'comboPartyDesc', category: 'combos', price: 1490, image: photos.duo, badge: 'new' },
  { id: 'double-cheese', name: 'doubleCheese', description: 'doubleCheeseDesc', category: 'burgers', price: 490, image: photos.cheeseburger, badge: 'best' },
  { id: 'truffle-burger', name: 'truffleBurger', description: 'truffleBurgerDesc', category: 'burgers', price: 650, image: photos.truffle, badge: 'popular' },
  { id: 'chicken-burger', name: 'chickenBurger', description: 'chickenBurgerDesc', category: 'burgers', price: 420, image: photos.chickenBurger, badge: 'hot' },
  { id: 'bbq-burger', name: 'bbqBurger', description: 'bbqBurgerDesc', category: 'burgers', price: 590, image: photos.bbqBurger, badge: 'new' },
  { id: 'pepperoni', name: 'pepperoni', description: 'pepperoniDesc', category: 'pizzaCat', price: 790, image: photos.pizza, badge: 'popular' },
  { id: 'four-cheese', name: 'fourCheese', description: 'fourCheeseDesc', category: 'pizzaCat', price: 890, image: photos.fourCheese, badge: 'best' },
  { id: 'bbq-pizza', name: 'bbqPizza', description: 'bbqPizzaDesc', category: 'pizzaCat', price: 920, image: photos.bbqPizza, badge: 'hot' },
  { id: 'wings', name: 'wingsItem', description: 'wingsDesc', category: 'chicken', price: 520, image: photos.wings, badge: 'hot' },
  { id: 'strips', name: 'stripsItem', description: 'stripsDesc', category: 'chicken', price: 390, image: photos.strips, badge: 'popular' },
  { id: 'nuggets', name: 'nuggetsItem', description: 'nuggetsDesc', category: 'chicken', price: 290, image: photos.nuggets, badge: null },
  { id: 'cola', name: 'colaItem', description: 'colaDesc', category: 'drinks', price: 120, image: photos.cola, badge: null },
  { id: 'fanta', name: 'fantaItem', description: 'fantaDesc', category: 'drinks', price: 120, image: photos.fanta, badge: 'new' },
  { id: 'pepsi', name: 'pepsiItem', description: 'pepsiDesc', category: 'drinks', price: 120, image: photos.pepsi, badge: null },
  { id: 'iced-tea', name: 'icedTea', description: 'icedTeaDesc', category: 'drinks', price: 150, image: photos.icedTea, badge: 'new' },
  { id: 'donuts', name: 'donutsItem', description: 'donutsDesc', category: 'desserts', price: 260, image: photos.donuts, badge: 'new' },
  { id: 'cheesecake', name: 'cheesecake', description: 'cheesecakeDesc', category: 'desserts', price: 320, image: photos.cheesecake, badge: 'popular' },
  { id: 'sundae', name: 'sundae', description: 'sundaeDesc', category: 'desserts', price: 220, image: photos.sundae, badge: 'new' },
]

const reviews = [
  { key: 'review1', customer: 'customer1', avatar: 'AM', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80' },
  { key: 'review2', customer: 'customer2', avatar: 'TK', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80' },
  { key: 'review3', customer: 'customer3', avatar: 'NB', image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=120&q=80' },
]

function Icon({ name, size = 20 }) {
  const paths = {
    bag: <><path d="M5 8h14l1 13H4L5 8Z" /><path d="M9 9V6a3 3 0 0 1 6 0v3" /></>,
    moon: <path d="M20.5 14.5A8.5 8.5 0 0 1 9.5 3.5 8.5 8.5 0 1 0 20.5 14.5Z" />,
    sun: <><circle cx="12" cy="12" r="4" /><path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42" /></>,
    plus: <path d="M12 5v14m-7-7h14" />,
    minus: <path d="M5 12h14" />,
    close: <path d="m18 6-12 12M6 6l12 12" />,
    arrow: <><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></>,
    search: <><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></>,
    star: <path d="m12 3 2.7 5.5 6.1.9-4.4 4.3 1 6.1-5.4-2.9-5.4 2.9 1-6.1-4.4-4.3 6.1-.9L12 3Z" />,
    pin: <><path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></>,
  }
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>
}

function App() {
  const [language, setLanguage] = useState('en')
  const [dark, setDark] = useState(true)
  const [category, setCategory] = useState('all')
  const [query, setQuery] = useState('')
  const [cart, setCart] = useState({})
  const [cartOpen, setCartOpen] = useState(false)
  const [orderOpen, setOrderOpen] = useState(false)
  const [toast, setToast] = useState('')
  const t = translations[language]

  const cartItems = useMemo(
    () => products.filter((product) => cart[product.id]).map((product) => ({ ...product, quantity: cart[product.id] })),
    [cart],
  )
  const cartQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0)
  const cartTotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const visibleProducts = products.filter((product) => {
    const matchesCategory = category === 'all' || product.category === category
    const matchesQuery = `${t[product.name]} ${t[product.description]}`.toLowerCase().includes(query.trim().toLowerCase())
    return matchesCategory && matchesQuery
  })
  const telegramText = cartItems.map((item) => `${t[item.name]} × ${item.quantity}`).join(', ')
  const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent(window.location.href.split('#')[0])}&text=${encodeURIComponent(`${t.orderDetails}: ${telegramText}. ${t.total}: ${cartTotal} сом.`)}`

  useEffect(() => {
    if (!toast) return undefined
    const timer = window.setTimeout(() => setToast(''), 2200)
    return () => window.clearTimeout(timer)
  }, [toast])

  useEffect(() => {
    document.documentElement.lang = language
  }, [language])

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setCartOpen(false)
        setOrderOpen(false)
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  const updateCart = (id, change) => {
    setCart((current) => {
      const quantity = (current[id] || 0) + change
      if (quantity <= 0) {
        const next = { ...current }
        delete next[id]
        return next
      }
      return { ...current, [id]: quantity }
    })
  }

  const addToCart = (product) => {
    updateCart(product.id, 1)
    setToast(`${t[product.name]} ${t.added}`)
  }

  const finishOrder = () => {
    setCart({})
    setOrderOpen(false)
    setCartOpen(false)
  }

  return (
    <div className={`app-shell ${dark ? 'theme-dark' : 'theme-light'}`}>
      <header className="site-header">
        <a href="#top" className="brand" aria-label="Stacked home">
          <span className="brand-mark">S<span>.</span></span>
          <span className="brand-lockup"><span className="brand-word">STACKED<span>.</span></span><span className="brand-status"><i />{t.openStatus}</span></span>
        </a>
        <nav className="main-nav" aria-label="Main navigation">
          <a href="#menu">{t.navMenu}</a><a href="#story">{t.navStory}</a><a href="#reviews">{t.navReviews}</a>
        </nav>
        <div className="header-actions">
          <div className="language-select" role="group" aria-label="Language">
            {['ru', 'ky', 'en'].map((code) => <button key={code} type="button" aria-pressed={language === code} className={language === code ? 'language-option active' : 'language-option'} onClick={() => setLanguage(code)}>{code.toUpperCase()}</button>)}
          </div>
          <button className="icon-button theme-toggle" type="button" onClick={() => setDark((value) => !value)} aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}>
            <Icon name={dark ? 'sun' : 'moon'} size={18} />
          </button>
          <button className="cart-trigger" type="button" onClick={() => setCartOpen(true)} aria-label={`${t.openCart}, ${cartQuantity} items`}>
            <Icon name="bag" size={18} /><span className="cart-trigger-label">{t.headerOrder}</span><span className="cart-count">{cartQuantity}</span>
          </button>
        </div>
      </header>

      <main id="top">
        <section className="hero-section">
          <div className="hero-copy">
            <div className="eyebrow"><span className="eyebrow-line" />{t.eyebrow}</div>
            <h1 dangerouslySetInnerHTML={{ __html: t.heroTitle }} />
            <p className="hero-description">{t.heroText}</p>
            <div className="hero-actions">
              <a className="button button-lime" href="#menu">{t.orderNow}<Icon name="arrow" size={17} /></a>
              <a className="text-link" href="#menu">{t.exploreMenu}<span>↘</span></a>
            </div>
            <div className="hero-proof">
              <div className="proof-avatars"><img src={reviews[0].image} alt="" /><img src={reviews[1].image} alt="" /><img src={reviews[2].image} alt="" /></div>
              <div><div className="stars" aria-label="5 out of 5 stars">★★★★★</div><span>{t.rating}</span></div>
            </div>
          </div>
          <div className="hero-visual">
            <div className="hero-orbit orbit-one" /><div className="hero-orbit orbit-two" />
            <div className="hero-image-glow" />
            <img className="hero-food-image" src={photos.hero} alt="Stacked cheeseburger with fresh lettuce and tomato" />
            <div className="hero-sticker"><span>100%</span><small>REAL<br />FLAVOR</small></div>
            <div className="hero-price-card"><span className="price-dot" />Fresh off the grill<span>Since 2018</span></div>
          </div>
          <div className="hero-side-note">BISHKEK · EST. 2018</div>
          <a className="scroll-cue" href="#menu"><span />{t.scroll}</a>
        </section>

        <section className="perks-strip" aria-label="Our promises">
          <div><span className="perk-icon">↗</span><p><strong>{t.delivery}</strong><span>{t.deliveryTime}</span></p></div>
          <div><span className="perk-icon">✳</span><p><strong>{t.fresh}</strong><span>{t.freshText}</span></p></div>
          <div><span className="perk-icon"><Icon name="pin" size={19} /></span><p><strong>{t.locations}</strong><span>{t.locationText}</span></p></div>
          <span className="perks-note">MADE WITH CRAVE</span>
        </section>

        <section className="menu-section section-wrap" id="menu">
          <div className="section-heading">
            <div><div className="eyebrow"><span className="eyebrow-line" />{t.menuLabel}</div><h2>{t.menuTitle}</h2><p>{t.menuText}</p></div>
            <label className="search-box"><Icon name="search" size={17} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={t.searchPlaceholder} /></label>
          </div>
          <div className="menu-toolbar">
            <div className="category-tabs" role="tablist" aria-label="Menu categories">
              {categories.map((item) => <button key={item} type="button" role="tab" aria-selected={category === item} className={category === item ? 'category-tab active' : 'category-tab'} onClick={() => setCategory(item)}><span className="category-icon" aria-hidden="true">{categoryIcons[item]}</span><span>{t[item]}</span></button>)}
            </div>
            <span className="menu-count">{String(visibleProducts.length).padStart(2, '0')} <span>/ {products.length}</span></span>
          </div>
          {visibleProducts.length > 0 ? (
            <div className="food-grid">
              {visibleProducts.map((product, index) => (
                <article className="food-card" key={product.id} style={{ '--card-index': index }}>
                  <div className="food-image-wrap">
                    <img className="food-image" src={product.image} alt={t[product.name]} loading="lazy" />
                    {product.badge && <span className={`food-badge badge-${product.badge}`}>{t[product.badge]}</span>}
                    <button className="quick-add" type="button" onClick={() => addToCart(product)} aria-label={`${t.add} ${t[product.name]}`}><Icon name="plus" size={19} /></button>
                  </div>
                  <div className="food-card-content">
                    <div className="food-name-row"><h3>{t[product.name]}</h3><span className="food-price">{product.price}<small> сом</small></span></div>
                    <p>{t[product.description]}</p>
                    <button className="add-button" type="button" onClick={() => addToCart(product)}>{t.add}<Icon name="plus" size={15} /></button>
                  </div>
                </article>
              ))}
            </div>
          ) : <div className="empty-results">{t.noResults}</div>}
        </section>

        <section className="story-section" id="story">
          <div className="story-photo"><img src="https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=1200&q=90" alt="Freshly made burger on a wooden table" loading="lazy" /><span className="photo-caption">FRESHLY MADE, EVERY TIME</span></div>
          <div className="story-copy">
            <div className="eyebrow"><span className="eyebrow-line" />{t.storyTag}</div>
            <h2 dangerouslySetInnerHTML={{ __html: t.storyTitle }} />
            <p>{t.storyText}</p>
            <div className="story-fact"><span>✳</span>{t.storyFact}</div>
            <a href="#menu" className="text-link">{t.exploreMenu}<span>↗</span></a>
          </div>
          <div className="story-number">01 <span>— 03</span></div>
        </section>

        <section className="reviews-section section-wrap" id="reviews">
          <div className="reviews-heading">
            <div><div className="eyebrow"><span className="eyebrow-line" />{t.reviewsTag}</div><h2>{t.reviewsTitle}</h2><p>{t.reviewsText}</p></div>
            <div className="review-score"><strong>4.9</strong><div><span className="stars">★★★★★</span><small>2,400+ reviews</small></div></div>
          </div>
          <div className="reviews-grid">
            {reviews.map((review) => <article className="review-card" key={review.key}>
              <div className="review-stars">★★★★★</div><p>“{t[review.key]}”</p>
              <div className="review-author"><img src={review.image} alt="" loading="lazy" /><div><strong>{t[review.customer]}</strong><span><i />{t.verified}</span></div><span className="quote-mark">”</span></div>
            </article>)}
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <a href="#top" className="brand"><span className="brand-mark">S<span>.</span></span><span className="brand-word">STACKED<span>.</span></span></a>
        <p>{t.footerLine}</p><span>{t.footerRights}</span>
      </footer>

      {(cartOpen || orderOpen) && <button className="overlay" type="button" aria-label={t.close} onClick={() => { setCartOpen(false); setOrderOpen(false) }} />}
      <aside className={`cart-drawer ${cartOpen ? 'drawer-open' : ''}`} aria-hidden={!cartOpen} aria-label={t.cartTitle}>
        <div className="drawer-heading"><div><span className="eyebrow">{cartQuantity} {cartQuantity === 1 ? 'ITEM' : 'ITEMS'}</span><h2>{t.cartTitle}</h2></div><button className="icon-button" type="button" onClick={() => setCartOpen(false)} aria-label={t.close}><Icon name="close" /></button></div>
        {cartItems.length ? <>
          <div className="cart-lines">{cartItems.map((item) => <div className="cart-line" key={item.id}>
            <img src={item.image} alt="" /><div className="cart-line-info"><strong>{t[item.name]}</strong><span>{item.price} сом</span><div className="quantity-control"><button type="button" onClick={() => updateCart(item.id, -1)} aria-label={`Remove one ${t[item.name]}`}><Icon name="minus" size={14} /></button><span>{item.quantity}</span><button type="button" onClick={() => updateCart(item.id, 1)} aria-label={`Add one ${t[item.name]}`}><Icon name="plus" size={14} /></button></div></div><strong className="cart-line-total">{item.price * item.quantity} <small>сом</small></strong>
          </div>)}</div>
          <div className="cart-summary"><div><span>{t.subtotal}</span><strong>{cartTotal} сом</strong></div><div><span>{t.deliveryFee}</span><span className="muted">{t.deliveryIncluded}</span></div><div className="summary-total"><span>{t.total}</span><strong>{cartTotal} сом</strong></div></div>
          <button className="button button-lime checkout-button" type="button" onClick={() => setOrderOpen(true)}>{t.checkout}<Icon name="arrow" size={18} /></button>
        </> : <div className="empty-cart"><span className="empty-bag"><Icon name="bag" size={27} /></span><h3>{t.emptyCart}</h3><p>{t.emptyHint}</p><button className="button button-lime" type="button" onClick={() => setCartOpen(false)}>{t.exploreMenu}<Icon name="arrow" size={17} /></button></div>}
      </aside>

      {orderOpen && <section className="order-modal" role="dialog" aria-modal="true" aria-labelledby="order-title">
        <button className="icon-button modal-close" type="button" onClick={() => setOrderOpen(false)} aria-label={t.close}><Icon name="close" /></button>
        <div className="order-check">✓</div><span className="eyebrow">{t.orderDetails}</span><h2 id="order-title">{t.orderReady}</h2><p>{t.orderMessage}</p>
        <div className="order-recap">{cartItems.map((item) => <div key={item.id}><span>{t[item.name]} × {item.quantity}</span><strong>{item.price * item.quantity} сом</strong></div>)}<div className="order-recap-total"><strong>{t.total}</strong><strong>{cartTotal} сом</strong></div></div>
        <div className="order-actions"><button className="button button-lime" type="button" onClick={finishOrder}>{t.confirm}</button><a className="telegram-link" href={telegramUrl} target="_blank" rel="noreferrer">{t.telegram}<Icon name="arrow" size={15} /></a></div>
      </section>}

      {toast && <div className="toast-message" role="status"><span>✓</span>{toast}</div>}
    </div>
  )
}

export default App
