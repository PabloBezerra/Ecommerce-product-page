(function(){
    const header = document.querySelector('header')
    const carousel = document.querySelector('.carousel')
    const form = document.querySelector('.amount')
    const cartArea = document.querySelector('.cartInfo')
    const listCart = []
    let numberImage = 0

    header.addEventListener('click',(event)=>{
        actionHeader(event.target.getAttribute('marker'))
    })

    carousel.addEventListener('click', (event)=>{
        passImage(event.target.getAttribute('marker'))
    })

    form.addEventListener('click',(event)=>{
        addProduct(event.target.getAttribute('marker'))
    })

    form.addEventListener('submit',(event)=>{
        event.preventDefault()
        addCart()
    })

    function actionHeader(event){
        const actions = {
            iconMenu:()=>{
                const menuBar = header.querySelector('.menu-bar')
                menuBar.style.left = '0px'
            },
            close:()=>{
                const menuBar = header.querySelector('.menu-bar')
                menuBar.style.left = '' 
            },
            cart:()=>{
                const cartArea = header.querySelector('.cartArea')
                cartArea.classList.toggle('active')
            }
        }
        if(actions[event]){
            actions[event]()
        }
    }

    function passImage(event){
        if(event == 'next'){
            if(numberImage === -1200){
                numberImage = 0
            }else{
                numberImage -= 400
            }
        }else if(event == 'previous'){
            if(numberImage === 0){
                numberImage = -1200
            }else{
                numberImage += 400
            }
        }else{return}
        const image = carousel.querySelector('.screenImage')
        image.style.transform = `translateX(${numberImage}px)`
    }

    function addProduct(event){
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

    function CreateProcuct (name, price, amount, image){
        this.name = name
        this.price = price
        this.amount = amount
        this.image = image
    }

    listCart.forEach(element => {
        element
    });
    

})()