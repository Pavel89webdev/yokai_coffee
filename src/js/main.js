'use strict';

let currentID = 1;

const body = document.querySelector('body');

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
    item.addEventListener('click', (event) => {
        if(event.target.getAttribute('id') == 'details' || event.target.getAttribute('id') != 'order'){
            renderModalFrom(item);
            showModal(); 
        }

        if(event.target.getAttribute('id') == 'order'){

            addOneItemToLS( item );
            showOrHideBasketIcon('basket');
            basketFromLSToBasketWindow(getBasketObj('basket'));
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

    modal.addEventListener('click', (event) => {
        if( event.target.getAttribute('id') == 'order'){
            let value = +document.querySelector('#quantity').value;
            addNumberOfItemToLS( item, value );
            showOrHideBasketIcon('basket');
            basketFromLSToBasketWindow(getBasketObj('basket'));
        }
    });

}


function showModal(){
    const modal = document.querySelector('.modal');

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
    const modal = document.querySelector('.modal_active');

    modal.classList.remove('modal_active');
    body.classList.remove('body_blocked');
}


// shopping basket
const basketIcon = document.querySelector('.basket'),
      basketWindow = document.querySelector('.basket-window');

// add event listeners to open and close basket-window
basketIcon.addEventListener('click', openBasketWindow);
basketWindow.addEventListener('click', (event) => {
    if(
        event.target.classList.contains('basket-window__fixed-overlay') || 
        event.target.classList.contains('container') ||
        event.target.classList.contains('basket-window__fixed-close')){
            closeBasketWindow();
    }
});

//open basket
function openBasketWindow(){
    basketWindow.classList.add('basket-window_active');
    body.classList.add('body_blocked');
}

//close basket
function closeBasketWindow(){
    basketWindow.classList.remove('basket-window_active');
    body.classList.remove('body_blocked');
}

//check LS [basket]..
let basketObj = {};


//clean for test
window.localStorage.clear();

//chek LS

function setBasketObj(key, basketObj){
    window.localStorage.setItem(key, JSON.stringify(basketObj));
}

function getBasketObj(key){
    return JSON.parse(window.localStorage.getItem(key));
}

function checkBasketObj(key){
    if(getBasketObj(key)){
        basketObj = getBasketObj(key);
    } else {
        let basketObj0 = {};
        items.forEach( (item) => {
            let itemTitle = item.children[0].children[1].innerHTML.trim();
            basketObj0[itemTitle] = 0;
        });
        setBasketObj('basket', basketObj0);
    }
}

checkBasketObj('basket');

console.log(getBasketObj('basket'));

// basket icon

function showBasketIcon(basketClass, i){
    document.querySelector(`.${basketClass}`).classList.add(`${basketClass}_active`);
    document.querySelector(`.${basketClass}`).classList.add(`${basketClass}_animated`);
    document.querySelector(`.${basketClass}__items`).textContent = i;
    setTimeout( () => {
        document.querySelector(`.${basketClass}`).classList.remove(`${basketClass}_animated`);
    }, 1000);
}

function hideBasketIcon(basketClass){
    document.querySelector(`.${basketClass}`).classList.remove(`${basketClass}_active`);
    document.querySelector(`.${basketClass}`).classList.remove(`${basketClass}_animated`);
}

function showOrHideBasketIcon(basketClass){
    let i = 0;
    basketObj = getBasketObj('basket');
    for( let key in basketObj){
        if( basketObj[key] > 0){
            ++i;
        }
    }
    if( i > 0){
        showBasketIcon(basketClass, i);
    } else {
        hideBasketIcon(basketClass);
    }
}

showOrHideBasketIcon('basket');


function addOneItemToLS( item ){
    let itemTitle = item.children[0].children[1].innerHTML.trim();
    let basketObj = getBasketObj('basket');
    for( let key in basketObj){
        if( key == itemTitle){
            ++basketObj[key]; 
        }
    }
    setBasketObj('basket', basketObj);
}

function addNumberOfItemToLS( item, value ){
    let itemTitle = item.children[0].children[1].innerHTML.trim();
    let basketObj = getBasketObj('basket');
    for( let key in basketObj){
        if( key == itemTitle){
            basketObj[key] += value; 
        }
    }
    setBasketObj('basket', basketObj);
}

function renderBasketWindow( key, value = 0 ){
    if(value > 0){
        let basketWindowContent = document.querySelector('.basket-window__content__items');

        let addingItem = document.createElement('div');
        addingItem.classList.add('basket-window__item');

        let price;
        items.forEach( (item) =>{

            if( item.children[0].children[1].innerHTML.trim() == key ){
                price = +item.children[0].children[5].innerHTML.trim().replace(/\W/g, '');
                
            }
        });

        let itemSum;

        if(value == 1){
            itemSum = price; 
        } else 
        if(value == 2 || value == 3){
            itemSum = price*value*0.85;
        } else
        if(value > 3){
            itemSum = price*value*0.75;
        }

        addingItem.innerHTML = `
                <div class="basket-window__item__img">
                    <img src="img/products/colombia.jpg" alt="">
                </div>

                <div class="basket-window__item__wrapper">
                    <div class="basket-window__item__title">
                        ${key}
                    </div>

                    <div class="basket-window__item__subtitle">
                        Упаковка: 250 гр.
                    </div>
                </div>

                <div class="basket-window__item__qantity">
                    <div class="plus-minus">
                        <img src="img/icons/minus.svg" alt="minus" id="minus">
                    </div>

                    <div class="basket-window__item__qantity__text">${value}</div>
                    
                    <div class="plus-minus">
                        <img src="img/icons/plus.svg" alt="plus"  id="plus">
                    </div>
                </div>

                <div class="basket-window__item__price">
                    ${itemSum} р.
                </div>

                <div class="basket-window__item__delete">
                    <img src="img/icons/plus.svg" alt="delete" id="delete">
                </div>
        `;

        basketWindowContent.append(addingItem);
        
        addingItem.addEventListener('click', (event) => {
            
            if(event.target.getAttribute('id') == 'plus'){
                plusItemToLS( addingItem.children[1].children[0].innerHTML.trim() );
            } else 
            if(event.target.getAttribute('id') == 'minus'){
                minusItemToLS( addingItem.children[1].children[0].innerHTML.trim() );
            } else
            if(event.target.getAttribute('id') == 'delete'){
                deleteItemToLS( addingItem.children[1].children[0].innerHTML.trim() );
            }
        });

    } else {
        return;
    }

    
}

function basketFromLSToBasketWindow(basketObj){
    let basketWindowContent = document.querySelector('.basket-window__content__items');
    basketWindowContent.innerHTML = '';

    for( let key in basketObj){
        
        renderBasketWindow( key, basketObj[key] );
    }

    let itemsSumArr = document.querySelectorAll('.basket-window__item__price');
    
    let sum = 0;
    

    itemsSumArr.forEach( (item) => {
        sum += +item.innerHTML.trim().replace(/\D/g, '');
    });

    let basketWindowSumm = document.querySelector('.basket-window__summ');
    basketWindowSumm.textContent = `Сумма: ${sum} р.`;
}

function plusItemToLS( itemTitle ){
    basketObj = getBasketObj('basket');
    for( let key in basketObj){
        if( key == itemTitle){
            ++basketObj[key];
        }
    }
    setBasketObj( 'basket', basketObj);
    basketFromLSToBasketWindow( getBasketObj('basket') );
}

function minusItemToLS( itemTitle ){
    basketObj = getBasketObj('basket');
    for( let key in basketObj){
        if( key == itemTitle && basketObj[key] > 1){
            --basketObj[key];
        }
    }
    setBasketObj( 'basket', basketObj);
    basketFromLSToBasketWindow( getBasketObj('basket') );
    showOrHideBasketIcon('basket');
}

function deleteItemToLS( itemTitle ){
    basketObj = getBasketObj('basket');
    for( let key in basketObj){
        if( key == itemTitle ){
            basketObj[key] = 0;
        }
    }
    setBasketObj( 'basket', basketObj);
    basketFromLSToBasketWindow( getBasketObj('basket') );
}

const form = document.querySelector('form');
form.addEventListener('submit', (event) => {
    event.preventDefault();
    sendOrder();
});

async function sendOrder () {

    let formData = new FormData(form);

    const titles = document.querySelectorAll('.basket-window__item__title'),
          quantities = document.querySelectorAll('.basket-window__item__qantity__text'),
          prices = document.querySelectorAll('.basket-window__item__price'),
          summ = document.querySelector('.basket-window__summ');

    console.log(titles[0].textContent.replace(/\n/gm, '').trim());
    console.log(quantities[0].textContent.replace(/\n/gm, '').trim());
    console.log(prices[0].textContent.replace(/\n/gm, '').trim());


    let itemArr = [];
    itemArr = itemArr.concat(1, 3, 5);

    console.log(itemArr);
    //formData.append( 'item1', 'YES');

    let response = await fetch('mailer/smart.php', {
        method: 'POST',
        body: formData
    });

    let result = await response;

    if(result.status == 200){
        console.log(result);
        closeBasketWindow();
        window.localStorage.clear();
        checkBasketObj('basket');
        basketFromLSToBasketWindow( getBasketObj('basket') );
        showOrHideBasketIcon('basket');
        goToThankYouPage();
        
    } else {
        showErrorMessage();
    }

    console.log(response);
}

function goToThankYouPage(){
    console.log('go to thankyou page');
}

function showErrorMessage(){
    console.log('Something goes wrong');
}