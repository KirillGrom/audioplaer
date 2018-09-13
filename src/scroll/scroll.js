//скролл списка треков
'use strict'
export const scroll = ()=>{
    let scrollBar = document.querySelector('.scroll-bar');
    const sctollTrack = document.querySelector('.scroll-bar__track');
    let listElem = document.querySelectorAll('.playlist__list');
    const event = new Event('scroll');

    listElem.forEach(function (item) {
        item.addEventListener('scroll',function (evt) {

            let listActive = document.querySelector('.playlist__list--active');
            sctollTrack.style.height =scrollBar.clientHeight * listActive.clientHeight / listActive.scrollHeight +"px";

            sctollTrack.style.top = scrollBar.clientHeight * listActive.scrollTop / listActive.scrollHeight +"px";
        });
    });



    listElem.forEach(function (item) {
        item.dispatchEvent(event);
    });
    sctollTrack.addEventListener('mousedown',function (start) {

        start.preventDefault();
        let offset = sctollTrack.offsetTop;
        const onMove =(end)=>{
            let listActive = document.querySelector('.playlist__list--active');
            let delta = end.pageY-start.pageY;

            sctollTrack.style.bacgroundColor ="#d24a43";
            sctollTrack.style.top =Math.min(scrollBar.clientHeight-sctollTrack.clientHeight,Math.max(0,offset+delta))+"px";
            sctollTrack.scrollTop=listElem.clientHeight+sctollTrack.offsetTop/scrollBar.clientHeight;
            listActive.scrollTop = (listActive.scrollHeight * sctollTrack.offsetTop / scrollBar.clientHeight);
        };

            document.addEventListener('mousemove', onMove);
            document.addEventListener('mouseup', function() {
                document.removeEventListener('mousemove', onMove);

            });


    });
};