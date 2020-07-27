'use strict';

let currentID = 1;

tabs();

function tabs(){
    const tabsSelector = document.querySelector('.tabs__selector'),
            tabsBtns = document.querySelectorAll('.tabs__selector__tab'),
            tabsContent = document.querySelectorAll('.tab');

    tabsSelector.addEventListener('click', (event) => {
        if(event.target.classList.contains('tabs__selector__tab')){
            tabsBtns.forEach( (item) =>{
                item.classList.remove('tabs__selector__tab_active');
            });
            event.target.classList.add('tabs__selector__tab_active');
            currentID = +event.target.getAttribute('id');

            tabsContent.forEach( (item) => {
                item.classList.remove('tab_active');
                if(+item.getAttribute('id') === currentID){
                    item.classList.add('tab_active');
                } else if( currentID === tabsContent.length + 1){
                    item.classList.add('tab_active');
                }
            });
        }
    });
}

