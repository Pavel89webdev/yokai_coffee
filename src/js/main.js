'use strict';

createTabAll();

function createTabAll(){
    const tabsSlider = document.querySelector('.tabs__slider'),
          tabsContent = document.querySelectorAll('.tab');

    let tabAll = document.createElement('div');
    tabAll.classList.add('tab');
    tabAll.setAttribute('id', tabsContent.length + 1);
    
    tabsSlider.append(tabAll);

    tabsContent.forEach( (item) => {
        tabAll.append(item.cloneNode(true));
    });

    //tabAll.append(tabsContent[0].cloneNode(true));
    console.log(tabsContent);
}

tabs();

function tabs(){
    const tabsSelector = document.querySelector('.tabs__selector'),
            tabsBtns = document.querySelectorAll('.tabs__selector__tab'),
            tabsContent = document.querySelectorAll('.tabs__slider > .tab'),
            tabsWrapper = document.querySelector('.tabs__wrapper'),
            tabsSlider = document.querySelector('.tabs__slider'),
            tabCintainer = document.querySelector('.tab__container');

let containerWidth = +getComputedStyle(document.querySelector('.container')).width.slice(0, -2) - +getComputedStyle(document.querySelector('.container')).paddingLeft.slice(0, -2),
    tabsSliderLeft = getComputedStyle(tabsSlider).left.slice(0, -2),
    currentTabID;

tabsBtns.forEach( (item) => {
    if( item.classList.contains('tabs__selector__tab_active')){
        currentTabID = item.getAttribute('id');
    } else {
        return;
    }
});

tabsWrapper.style.height = getComputedStyle(tabsSlider).height;
console.log(getComputedStyle(document.querySelector('.container')).paddingLeft);
tabsSlider.style.width = `${containerWidth}px`;
tabsWrapper.style.width = tabsSlider.style.width;
tabCintainer.style.width = tabsSlider.style.width;

tabsSelector.addEventListener('click', (event) => {
    if(event.target.classList.contains('tabs__selector__tab')){
        tabsBtns.forEach( (item) => {
            item.classList.remove('tabs__selector__tab_active');
        });
        event.target.classList.add('tabs__selector__tab_active');
        currentTabID = +event.target.getAttribute('id');
        tabsSlider.style.left = `-${(currentTabID - 1) * +containerWidth}px`;
        console.log(tabsContent);
        tabsWrapper.style.height = getComputedStyle(tabsContent[currentTabID - 1]).height;
    }
});

tabsContent.forEach( (tab) => {
    tabsSlider.append(tab);
    tabsSlider.style.width = `${+tabsSlider.style.width.slice(0, -2) + +containerWidth}px`;
} );
}

// навесить обработчик событий который достает id из нажатой кнопки

//получить таб из tab_all

//поместить их справа от tab_all и растянуть wrapper на 3 контейнера (ширина может меняться!)

//при нажатии на кнопку нужно двигать на соответсвующий id - лучше но мерной (all переделать в 0) (и нужен массив с табами)