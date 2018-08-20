'use strict'


export const eventClick = ()=>{

    //плейлист активный
    const listItemActive = ()=>{
        const listItem = document.querySelectorAll('.playlist__item');

        listItem.forEach(function (item) {
            item.addEventListener('click',function (evt) {
                let target = event.currentTarget;


                listItem.forEach(function (item) {
                    item.classList.remove('playlist__item--active')
                });

                if(target.classList.contains('playlist__item--active')){
                    return;
                }
                else {
                    target.classList.add('playlist__item--active');
                }

            })
        })

    };listItemActive();









};
