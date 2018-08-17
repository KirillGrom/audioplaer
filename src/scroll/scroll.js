//скролл списка треков
'use strict'
export const scroll = ()=>{
    let scrollElem = document.querySelector('.scroll__wrapp');

    scrollElem.addEventListener('scroll',function () {
            var scrolled = scrollElem.pageYOffset || scrollElem.documentElement.scrollTop;
            console.log(scrolled)
        })
}