'use strict';

let currentID = 1;

tabs('tabs__selector', 'tabs__selector__tab', 'tab');

function tabs(tabsSelectorClass, tabsSelectorTabClass, tabClass){
    const tabsSelector = document.querySelector(`.${tabsSelectorClass}`),
            tabsBtns = document.querySelectorAll(`.${tabsSelectorTabClass}`),
            tabsContent = document.querySelectorAll(`.${tabClass}`);

    tabsSelector.addEventListener('click', (event) => {
        if(event.target.classList.contains(tabsSelectorTabClass)){
            tabsBtns.forEach( (item) =>{
                item.classList.remove(`${tabsSelectorTabClass}_active`);
            });
            event.target.classList.add(`${tabsSelectorTabClass}_active`);
            currentID = +event.target.getAttribute('id');

            tabsContent.forEach( (item) => {
                item.classList.remove(`${tabClass}_active`);
                if(+item.getAttribute('id') === currentID){
                    item.classList.add(`${tabClass}_active`);
                } else if( currentID === tabsContent.length + 1){
                    item.classList.add(`${tabClass}_active`);
                }
            });
        }
    });
}

// modal

//add event listener for all details buttons and click wrappers 
let items = document.querySelectorAll('.item');

items.forEach( item => {
    console.log(item.children[0].children[2].innerHTML);
    item.addEventListener('click', (event) => {
        if(event.target.getAttribute('id') == 'details' || event.target.getAttribute('id') != 'order'){
            renderModalFrom(item);
            showModal(); 
            
        }
    });
});

function renderModalFrom(item){
    const itemTitle = item.children[0].children[1].innerHTML,
          itemPrise = item.children[0].children[5].innerHTML,
          itemDescr1 = item.children[0].children[2].innerHTML,
          itemDescr2 = item.children[0].children[3].innerHTML,
          itemDescr3 = item.children[0].children[4].innerHTML;

    let modalTitle = document.querySelector('.modal__descr__title'),
        modalPrise = document.querySelector('.modal__descr__price'),
        modalDescr1 = document.querySelector('.modal__descr__text_1'),
        modalDescr2 = document.querySelector('.modal__descr__text_2'),
        modalDescr3 = document.querySelector('.modal__descr__text_3');

    modalTitle.textContent = itemTitle;
    modalPrise.textContent = itemPrise;
    modalDescr1.innerHTML = itemDescr1;
    modalDescr2.innerHTML = itemDescr2;
    modalDescr3.innerHTML = itemDescr3;
}


function showModal(){
    const modal = document.querySelector('.modal'),
          body = document.querySelector('body');

    modal.classList.add('modal_active');
    body.classList.add('body_blocked');
}

// add event listener to close modal

let modal = document.querySelector('.modal');

modal.addEventListener('click', (event) => {
    if(event.target.classList.contains('modal__fixed-overlay') || event.target.classList.contains('modal__fixed-close')){
        closeModal();
    }
});

function closeModal(){
    const modal = document.querySelector('.modal_active'),
          body = document.querySelector('body');

    modal.classList.remove('modal_active');
    body.classList.remove('body_blocked');
}


// shopping basket


