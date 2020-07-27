/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/main.js":
/*!************************!*\
  !*** ./src/js/main.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


createTabAll();

function createTabAll() {
  const tabsSlider = document.querySelector('.tabs__slider'),
        tabsContent = document.querySelectorAll('.tab');
  let tabAll = document.createElement('div');
  tabAll.classList.add('tab');
  tabAll.setAttribute('id', tabsContent.length + 1);
  tabsSlider.append(tabAll);
  tabsContent.forEach(item => {
    tabAll.append(item.cloneNode(true));
  }); //tabAll.append(tabsContent[0].cloneNode(true));

  console.log(tabsContent);
}

tabs();

function tabs() {
  const tabsSelector = document.querySelector('.tabs__selector'),
        tabsBtns = document.querySelectorAll('.tabs__selector__tab'),
        tabsContent = document.querySelectorAll('.tabs__slider > .tab'),
        tabsWrapper = document.querySelector('.tabs__wrapper'),
        tabsSlider = document.querySelector('.tabs__slider'),
        tabCintainer = document.querySelector('.tab__container');
  let containerWidth = +getComputedStyle(document.querySelector('.container')).width.slice(0, -2) - +getComputedStyle(document.querySelector('.container')).paddingLeft.slice(0, -2),
      tabsSliderLeft = getComputedStyle(tabsSlider).left.slice(0, -2),
      currentTabID;
  tabsBtns.forEach(item => {
    if (item.classList.contains('tabs__selector__tab_active')) {
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
  tabsSelector.addEventListener('click', event => {
    if (event.target.classList.contains('tabs__selector__tab')) {
      tabsBtns.forEach(item => {
        item.classList.remove('tabs__selector__tab_active');
      });
      event.target.classList.add('tabs__selector__tab_active');
      currentTabID = +event.target.getAttribute('id');
      tabsSlider.style.left = `-${(currentTabID - 1) * +containerWidth}px`;
      console.log(tabsContent);
      tabsWrapper.style.height = getComputedStyle(tabsContent[currentTabID - 1]).height;
    }
  });
  tabsContent.forEach(tab => {
    tabsSlider.append(tab);
    tabsSlider.style.width = `${+tabsSlider.style.width.slice(0, -2) + +containerWidth}px`;
  });
} // навесить обработчик событий который достает id из нажатой кнопки
//получить таб из tab_all
//поместить их справа от tab_all и растянуть wrapper на 3 контейнера (ширина может меняться!)
//при нажатии на кнопку нужно двигать на соответсвующий id - лучше но мерной (all переделать в 0) (и нужен массив с табами)

/***/ })

/******/ });
//# sourceMappingURL=script.js.map