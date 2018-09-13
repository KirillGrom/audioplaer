'use strict'


export const eventClick = () => {
    const buttonPlay = document.querySelector('.audioPlayer__play');
    const buttonNext = document.querySelector('.audioPlayer__next');
    const buttonPrev = document.querySelector('.audioPlayer__prev');
    const buttonRepeat = document.querySelector('.audioPlayer__repeat');
    const  buttonRandom = document.querySelector('.random__random');

    //плейлист активный
    const listItemActive = () => {
        const listItem = document.querySelectorAll('.playlist__item');

        listItem.forEach(function (item) {
            item.addEventListener('click', function (evt) {
                let target = event.currentTarget;


                listItem.forEach(function (item) {
                    item.classList.remove('playlist__item--active')
                });

                if (target.classList.contains('playlist__item--active')) {
                    return
                }
                else {
                    target.classList.add('playlist__item--active');
                }

            })
        })

    };
    listItemActive();

    // buttonPlay.addEventListener('click', function (evt) {
    //     let button = evt.currentTarget;
    //     let svgElements = button.children;
    //     if (svgElements[0].classList.contains('svg-active')) {
    //         svgElements[1].classList.add('svg-active');
    //         svgElements[0].classList.remove('svg-active');
    //     } else {
    //         svgElements[0].classList.add('svg-active');
    //         svgElements[1].classList.remove('svg-active');
    //     }
    // });
    buttonNext.addEventListener('click', function (evt) {
        let button = evt.currentTarget;
        let svgElements = buttonPlay.children;
        if (button.classList.contains('song-last')) {
            return;
        } else {
            svgElements[1].classList.add('svg-active');
            svgElements[0].classList.remove('svg-active');
        }
    });
    buttonPrev.addEventListener('click', function (evt) {
        let svgElements = buttonPlay.children;
        let button = evt.currentTarget;
        if (button.classList.contains('song-last')) {
            return;
        } else {
            svgElements[1].classList.add('svg-active');
            svgElements[0].classList.remove('svg-active');
        }


    });

    buttonRepeat.addEventListener('click', (evt) => {


        makeButtonActive(evt.currentTarget)

    });
    buttonRandom.addEventListener('click', (evt) => {


        makeButtonActive(evt.currentTarget)

    });


const makeButtonActive =(evt)=>{
    const target = evt;
    if (!target.classList.contains('active')) {
        target.classList.add('active');
    }
    else {
        target.classList.remove('active');
    }
}

};
