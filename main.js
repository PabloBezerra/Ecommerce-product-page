(function(){
    const header = document.querySelector('header')

    header.addEventListener('click',(event)=>{
        actionHeader(event.target.getAttribute('marker'))
    });

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

})()