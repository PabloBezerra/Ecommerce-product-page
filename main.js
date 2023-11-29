(function(){
    "use strict"

    // Variables
    const header = document.querySelector('header')
    const carousel = document.querySelector('.carousel')
    const information = document.querySelector('.information')
    const purchase = document.querySelector('.purchase')
    const form = document.querySelector('.amount')
    const cartInfo = document.querySelector('.cartInfo')
    const curtain = document.querySelector('.curtain')
    const cartArea = document.querySelector('.cartArea')
    let listCart = []
    let numberImage = 0

    // Simulating de product

    const currentProduct = {
        title : 'Fall Limited Edition Sneakers',
        brand : 'Sneaker Company',
        description: "These low-profile sneakers are your perfect casual wear companion. Featuring a durable rubber outer sole, they’ll withstand everything the weather can offer.",
        prices: {current: 125.00, old: 250.00},
        images: ['./images/image-product-1.jpg', './images/image-product-2.jpg', './images/image-product-3.jpg', './images/image-product-4.jpg'],
        miniatures: ['./images/image-product-1-thumbnail.jpg', './images/image-product-2-thumbnail.jpg', './images/image-product-3-thumbnail.jpg', './images/image-product-4-thumbnail.jpg']
    }

    //Create Product Page

    const screenImage = carousel.querySelector('.screenImage')
    currentProduct.images.forEach((element, index)=>{
        const img = document.createElement('img')
        img.src = `${element}`
        img.alt = `image product n°${index + 1}`
        screenImage.appendChild(img)
    })

    information.querySelector('.brand').innerHTML = `${currentProduct.brand}`
    information.querySelector('.titleProduct').innerHTML = `${currentProduct.title}`
    information.querySelector('.description').innerHTML = `${currentProduct.description}`

    purchase.querySelector('.currentPrice').innerHTML = `${currentProduct.prices.current.toLocaleString('en',{style:'currency', currency:'USD'})}`
    const discounts = 100 - ((currentProduct.prices.current * 100)/currentProduct.prices.old)
    purchase.querySelector('.discounts').innerHTML = `${parseInt(discounts)}%`
    purchase.querySelector('.oldPrice').innerHTML = `${currentProduct.prices.old.toLocaleString('en',{style:'currency', currency:'USD'})}`

    // Adding event listenes to the main elements

    header.addEventListener('click',(event)=>{ // header events
        actionHeader(event.target.getAttribute('marker'))
    })

    carousel.addEventListener('click', (event)=>{ // carousel of images events
        passImage(event.target.getAttribute('marker'))
    })

    form.addEventListener('click',(event)=>{ // event of increasing or decreasing the quantity
        amountProduct(event.target.getAttribute('marker'))
    })

    form.addEventListener('submit',(event)=>{ // add product to cart event
        event.preventDefault()
        const amount = form.querySelector('input')
        listCart.push(new AddCart(currentProduct.title, +amount.value, currentProduct.prices.current,currentProduct.miniatures[0]))
        saveCart()
        amount.value = 0
        amountProduct('minus')
    })

    const products = cartInfo.getElementsByClassName('product')
    cartInfo.addEventListener('click',(event)=>{ // event of remove product the cart
        if(event.target.getAttribute('marker') === 'remove'){
            let element = event.target
            while (!element.classList.contains('product')){
                element = element.parentElement
            }
            const item = [...products].indexOf(element)
            console.log(item)
            listCart.splice(item ,1)
            saveCart()
        }
    })

    curtain.addEventListener('click',()=>{
        actionHeader('close')
        actionHeader('cartClose')
    })

    // Funtions

    function actionHeader(event){ // function of actions of header
        const menuBar = header.querySelector('.menuBar')
        const actions = {
            iconMenu:()=>{
                menuBar.style.left = '0px'
                curtain.style.display = 'block'
                curtain.style.opacity = '50%'
            },
            close:()=>{
                menuBar.style.left = '' 
                curtain.style.display = 'none'
            },
            cart:()=>{
                cartArea.classList.add('active')
                curtain.style.display = 'block'
                curtain.style.opacity = '0%'
            },
            cartClose:()=>{
                cartArea.classList.remove('active')
                curtain.style.display = 'none'
            }
        }
        if(actions[event]){
            actions[event]()
        }
    }

    function passImage(event){ // funtion of passin images from the caroucel
        const numberMax = 400 * (currentProduct.images.length -1)
        if(event === 'next'){
            if(numberImage === - numberMax){
                numberImage = 0
            }else{
                numberImage -= 400
            }
        }else if(event === 'previous'){
            if(numberImage === 0){
                numberImage = - numberMax
            }else{
                numberImage += 400
            }
        }else{return}
        const image = carousel.querySelector('.screenImage')
        image.style.transform = `translateX(${numberImage}px)`
    }

    function amountProduct(event){ // funcion of increasing or decreasing of quantity
        if(event !== 'minus' && event !== 'plus' && event !== 'input' ){return}
        let input = form.querySelector('input')
        const button = form.querySelector('button[type="submit"]')
        if(event === 'plus'){
            if(+input.value === 99){
                input.value = 98
            }
            input.value = +input.value + 1
        }else if(event === 'minus'){
            if(+input.value === 0){
                input.value = 1
            }
            input.value = +input.value - 1
        }
        button.disabled = +input.value === 0
    }

    function AddCart(title, amount, price, image){ // array cart element criation function
        this.title = title,
        this.amount = amount,
        this.price = price,
        this.image = image,
        this.total = this.price * this.amount
    }

    function updateCart(){ // function that creates the HTML elements of the cart using the cart array
        const cart = cartInfo.parentElement.previousElementSibling
        if(listCart.length === 0){
            cartInfo.innerHTML = 'Your cart is empity'
            cart.classList.remove('content')
            cartArea.lastElementChild.style.display = 'none'
            return
        }
        cartInfo.innerHTML = ''
        listCart.forEach(element=>{
            const div = document.createElement('div')
            div.classList.add('product')
            div.innerHTML=`
            <img src="${element.image}" alt="product image">
            <div class="infoProduct">
              <p class="titleProduct">${element.title}</p>
              <p class="priceProduct">${element.price.toLocaleString('en',{style:'currency', currency:'USD'})} x ${element.amount} <span>${element.total.toLocaleString('en',{style:'currency', currency:'USD'})}</span></p>
            </div>
            <svg width="14" height="16" marker="remove" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><defs><path marker="remove" d="M0 2.625V1.75C0 1.334.334 1 .75 1h3.5l.294-.584A.741.741 0 0 1 5.213 0h3.571a.75.75 0 0 1 .672.416L9.75 1h3.5c.416 0 .75.334.75.75v.875a.376.376 0 0 1-.375.375H.375A.376.376 0 0 1 0 2.625Zm13 1.75V14.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 1 14.5V4.375C1 4.169 1.169 4 1.375 4h11.25c.206 0 .375.169.375.375ZM4.5 6.5c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Zm3 0c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Zm3 0c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Z" id="a"/></defs><use marker="remove" fill="#C3CAD9" fill-rule="nonzero" xlink:href="#a"/></svg>
            `
            cartInfo.appendChild(div)
        })
        cart.classList.add('content')
        cart.firstElementChild.innerHTML = `${listCart.length}`
        cartArea.lastElementChild.style.display = 'block'
    }

    // Storage

    function saveCart(){ // funcion that save the current states of the cart array in local storage
        localStorage.setItem('cartList', JSON.stringify(listCart))
        updateCart()
    }
    
    function getCart(){ // funcion that retrieves of the cart from local storage
        if(!localStorage.getItem('cartList')){
            return
        }
        listCart = JSON.parse(localStorage.getItem('cartList'))
        saveCart()
    }
    getCart()


})()