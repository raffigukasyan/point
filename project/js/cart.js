/**
 * @author Raffi
 * @version 1.0.0
 * 
 */

class Cart {

    /**
     * 
     * Создаем класс Cart
     * @constructor
     * @param {*} cartProductsBtn 
     * @param {*} cartProductsLister 
     * @param {*} cartBasket 
     * @param {*} cartQuantityBasket 
     * @param {*} cartFullPrice 
     * @param {Number} cartPrice 
     */

    constructor(cartProductsBtn, cartProductsLister, cartBasket, cartQuantityBasket, cartFullPrice, cartPrice) {
        this.cartProductsBtn = cartProductsBtn;
        this.cartProductsLister = cartProductsLister;
        this.cartBasket = cartBasket;
        this.cartQuantityBasket = cartQuantityBasket;
        this.cartFullPrice = cartFullPrice;
        this.cartPrice = cartPrice;
    }

    /** @return {*} - Это функция даёт рандомние id элементам */

    randomId(){
        return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    }
    
    /**
     * @param {String} str 
     * @return {String} - Это функция удаляет пробелы строки
     */

    priceWithoutSpaces(str){
        return str.replace(/\s/g, '');
    }
    
    /**
     * 
     * @param {String} str 
     * @returns {String} - Это фунция делает обратный вид priceWithoutSpaces
     */

    normalPrice(str){
        return String(str).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1' );
    }

    /**
     * 
     * @param {Number} currentPrice Суммирование 
     * @returns {Number}
     */
    // Суммирование
    plusFullPrice(currentPrice){
        return this.cartPrice += currentPrice;
    }

    /**
     *
     *
     * @param {Number} currentPrice 
     * @this {Cart} 
     */
    minusFullPrice = (currentPrice) => {
        return this.cartPrice -= currentPrice;
    }
    

    printFullPrice = () => {
        this.cartFullPrice.textContent = `${this.normalPrice(this.cartPrice)} руб.`;
    }

    /**
     * @this {Cart}
     */
    printQuantity(){
        let length = this.cartProductsLister.querySelector('.simplebar-content').children.length; 
        this.cartQuantityBasket.textContent = length;
        if(length > 0) {
            $('.basket__title').hover(function() {
            $('.bakset__cart').slideDown(400);
        }, function() {
            $('.bakset__cart').slideUp(400)
        });
        }
    }

    /**
     *
     *
     * @param {Object} img
     * @param {Object} title
     * @param {Object} priceN
     * @param {Object} id
     * @return {Object} - генериркет карточку продукции  
     * @memberof Cart
     */
    generateCartProduct(img, title, priceN, id){
        return `
        
        <li class="cart-content__item">
            <div class="cart-content__product cart-product" data-id = "${id}">
                <img src="${img}" alt="" class="cart-product__img">
                <div class="cart-product__text">
                    <h3 class="cart-product__title">${title}</h3>
                        <span class="cart-product__price">${this.normalPrice(priceN)} руб.</span>
                 </div>
                <button class="cart-product__delete"></button>
            </div>
        </li>
        `
    }

    

    /**
     *
     *
     * @param {Object} productParent - это функция удаляет элемент(Картчку)
     * @memberof Cart
     */
    deleteProducts(productParent){
        // 1. получить id
        let id = productParent.querySelector('.cart-product').dataset.id;
        // 2. disabled false
        document.querySelector(`.product-price[data-id="${id}"]`).querySelector('.product__btn').disabled = false;
        // 3. minus price
        let currentPrice = parseInt(this.priceWithoutSpaces(productParent.querySelector('.cart-product__price').textContent))
        this.minusFullPrice(currentPrice)
        // 4. print fullprice
        this.printFullPrice();
        // 5. remove productparent
        productParent.remove();
        // 6. count and print quantity
        this.printQuantity();
    }

}


const productsBtn = document.querySelectorAll('.product__btn'); // кнопка доб. в корзину
const cartProductsList = document.querySelector('.cart-content__list'); // list продукта
const basket = document.querySelector('.basket'); // корзинка
const cartQuantity = document.querySelector('.header-basket__quantity'); // счетчик корзинки
const fullPrice = document.querySelector('.fullprice'); // итоговая цена
let price = 0; // цена чтобы считать

let cart2 = new Cart(productsBtn, cartProductsList, basket, cartQuantity, fullPrice, price);

productsBtn.forEach((item) => {

    item.closest('.product-price').setAttribute('data-id', cart2.randomId());
    item.addEventListener('click', (event) => {

        let self = event.currentTarget;
        const cart = event.target.closest('.product-price');

        const productInfo = {
            id: cart.dataset.id,
            img: cart.querySelector('.product__img').getAttribute('src'),
            title: cart.querySelector('.product__title').textContent,
            priceNumber: parseInt(cart2.priceWithoutSpaces(cart.querySelector('.product__price').textContent)),
        }

        cart2.plusFullPrice(productInfo.priceNumber);
        cart2.printFullPrice();
        cartProductsList.querySelector('.simplebar-content').insertAdjacentHTML('afterbegin', cart2.generateCartProduct(productInfo.img, productInfo.title, productInfo.priceNumber, productInfo.id));
        cart2.printQuantity();
        self.disabled = true;
    });

});

cartProductsList.addEventListener('click', (event) => {
    if(event.target.classList.contains('cart-product__delete')) {
        cart2.deleteProducts(event.target.closest('.cart-content__item'));
    }
});
