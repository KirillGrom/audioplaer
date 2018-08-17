'use strict'

   export const carusel = ()=>{
        const buttonSlider = document.querySelectorAll('.playlist__btn');
       const buttonNextClass = 'playlist__btn--next';
       const buttonPrevClass = 'playlist__btn--prev';
       const sliderArry = document.querySelectorAll('.playlist__list');
       let sliderActive = document.querySelector('.playlist__list--active');
       const next = (slider)=>{
           let nextSlider = slider.nextElementSibling;


           slider.classList.remove('playlist__list--active');
           nextSlider.classList.add('playlist__list--active');

           sliderActive = nextSlider;

       };
       const prev = (slider)=>{
           let prevSlider = slider.previousElementSibling;


           slider.classList.remove('playlist__list--active');
           prevSlider.classList.add('playlist__list--active');
           sliderActive = prevSlider;
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
                    next(sliderActive);
                    console.log(sliderActive);
               }
               else {
                   return
               }

           }
           if (target.classList.contains(buttonPrevClass)){
               if(indexNumber > 0 ){
                   prev(sliderActive);
                   console.log(sliderActive);
               }
               else {
                   return
               }
           }

           });

       }

    };

    
