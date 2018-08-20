'use strict'

   export const carusel = ()=>{
        const buttonSlider = document.querySelectorAll('.playlist__btn');
       const buttonNextClass = 'playlist__btn--next';
       const buttonPrevClass = 'playlist__btn--prev';
       let playListTitle = document.querySelector('.playlist__name--active');
       const sliderArry = document.querySelectorAll('.playlist__list');
       let sliderActive = document.querySelector('.playlist__list--active');
       const next = (slider,titlelist)=>{
           let nextSlider = slider.nextElementSibling;
           let nextTitle = titlelist.nextElementSibling;
           //текующие слайдер
           slider.classList.remove('playlist__list--active');
           titlelist.classList.remove('playlist__name--active');


           //следущие слайдер
           nextTitle.classList.add('playlist__name--active');
           nextSlider.classList.add('playlist__list--active');


           sliderActive = nextSlider;
           playListTitle=nextTitle;
       };
       const prev = (slider,titlelist)=>{
           let prevSlider = slider.previousElementSibling;
           let prevTitle = titlelist.previousElementSibling;


           slider.classList.remove('playlist__list--active');
           titlelist.classList.remove('playlist__name--active');

           prevSlider.classList.add('playlist__list--active');
           prevTitle.classList.add('playlist__name--active');
           sliderActive = prevSlider;
           playListTitle=prevTitle;
       };

        const indexSearh =()=>{
            for(let i = 0;i<sliderArry.length;i++){
                if (sliderArry[i].classList.contains('playlist__list--active')){
                    return i
                }
            }
        };


       for(let i =0;i<buttonSlider.length;i++){
           buttonSlider[i].addEventListener('click',(evt)=> {
            let indexNumber =indexSearh();
            let target = evt.currentTarget;

           if (target.classList.contains(buttonNextClass)){
               if(indexNumber < sliderArry.length-1 ){
                    next(sliderActive,playListTitle);

               }
               else {
                   return
               }

           }
           if (target.classList.contains(buttonPrevClass)){
               if(indexNumber > 0 ){
                   prev(sliderActive,playListTitle);

               }
               else {
                   return
               }
           }

           });

       }

    };

    
