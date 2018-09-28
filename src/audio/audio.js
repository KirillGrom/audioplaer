'use strict';

import {carusel} from '../carusel/carusel.js';
import {eventClick} from "../eventclick/eventclick";




export const audioPlayer = () => {
    const buttonPlay = document.querySelector('.audioPlayer__play');
    const buttonNext = document.querySelector('.audioPlayer__next');
    const buttonPrev = document.querySelector('.audioPlayer__prev');
    const buttonRepeat = document.querySelector('.audioPlayer__repeat');
    const buttonRandom = document.querySelector('.random__random');
    const VOLUME_TRAKER = document.querySelector('.volume__item');
    const VOLUME_BAR = document.querySelector('.audioPlayer__volume');
    const PROGRES_BAR = document.querySelector('.audioPlayer__track');
    const PROGRES_TRACK = document.querySelector('.track__item');
    const PROGRES_WRAPP = document.querySelector('.audioPlayer__wrapp');
    const TRACK_CURRENT = document.querySelector('.track__current-time');

    const audioObj = new Audio();
    let JSON_PLAYLIST;



    const gettingPlaylist =()=>{//Подгружаем json
        return new Promise(function (resolve, reject) {
            let request = new XMLHttpRequest();
            request.open('GET','../../json/playlist.json',true);
            request.addEventListener('readystatechange', function() {

                if ((request.readyState==4) && (request.status==200)) {
                    resolve(request.response)
                }
            });
            request.send();
        })

    };

      gettingPlaylist().then((response)=> generatePlaylists(JSON.parse(response),playrInnit,musicOfClick));




    const generatePlaylists = (playlist , playrInnitFunc, musicOfClick)=>{//генерируем html
       let nameplaylist = Object.getOwnPropertyNames(playlist);
       let sliderParent =  document.getElementById('slider');
        const generate =(objPlaylist)=>{
            let source   = document.getElementById('template').innerHTML;
            let template = Handlebars.compile(source);
            let arr = objPlaylist;
            let context =arr;
            let html    = template(context);

            sliderParent.innerHTML = document.getElementById('slider').innerHTML + html ;

        };

        for(let i =0; i<nameplaylist.length;i++){
            generate(playlist[nameplaylist[i]])
        }
        let oneList =sliderParent.querySelector('.playlist__list');

        oneList.classList.add('playlist__list--active');
        oneList.classList.add('slider--active');
        playrInnitFunc(playlist.playlistOne);
        musicOfClick(playlist);
        JSON_PLAYLIST = playlist;
        carusel();//модуль карусель вызваем
        eventClick();//модуль событий
    };



    const playrInnit = (playListPar,indexSong = playListPar[0]) => {//интцилизация плеера
        audioObj.src = indexSong.srcMusic;
        removeClass(document.querySelectorAll('.playlist__item'),'playlist__item--active');

        let itaem = document.querySelector('[data-url="'+indexSong.srcMusic+'"]');
        itaem.classList.add('playlist__item--active');




        buttonNext.onclick = function (evt) {//событие кнопки некс
            if (songsOfSearch(playListPar, audioObj.src) < playListPar.length - 1) {
                nextSong(playListPar);
            } else {
                return;
            }


        };
        buttonPrev.onclick = function (evt) {

            if (songsOfSearch(playListPar, audioObj.src)  > 0 ) {
                prevSong(playListPar);
            } else {
                return;
            }


        };


        audioObj.onended = () => {//событие конца песни

            if (songsOfSearch(playListPar, audioObj.src) < playListPar.length - 1) {
                nextSong(playListPar)
            }
            else {
                playOrPause();
                playOrPause();
            }

        };



    };


    const nextSong = (listplay) => {//след. песня
        removeClass(document.querySelectorAll('.playlist__item'),'playlist__item--active');
        let index = songsOfSearch(listplay, audioObj.src);
        const NEXT_ITEM_LIST = document.querySelector('[data-url="'+listplay[index + 1].srcMusic+'"]');
        NEXT_ITEM_LIST.classList.add('playlist__item--active');
        audioObj.src = listplay[index + 1].srcMusic;
        playOrPause();

    };

    const prevSong = (listplay) => {// предедущая песня
        let index = songsOfSearch(listplay, audioObj.src);
        removeClass(document.querySelectorAll('.playlist__item'),'playlist__item--active');
        const PREV_ITEM_LIST = document.querySelector('[data-url="'+listplay[index - 1].srcMusic+'"]');
        PREV_ITEM_LIST.classList.add('playlist__item--active');
        audioObj.src = listplay[index - 1].srcMusic;
        playOrPause();


    };
    const songsOfSearch = (arrySong, src) => {//поиск песни
        let reg ;
        let pattern ;
        for (let i = 0; i < arrySong.length; i++) {
            pattern =arrySong[i].srcMusic;
            reg = new RegExp(pattern);
            if (reg.test(src)) {
                return i;
            }
        }
    };


    audioObj.addEventListener('timeupdate', function (evt) { // изменение шкалы прогреса
        let duration = evt.currentTarget.duration;
        let currentTime = evt.currentTarget.currentTime;

        PROGRES_TRACK.style.width = 100 / duration * currentTime + '%';
        // console.log(100 / duration * currentTime)
    });


    const playOrPause = () => { //пауза и плей

        const svg = document.querySelector('.svg-play-js');


        if (audioObj.paused) {
            audioObj.play();
            svg.classList.remove('svg-active');
            svg.nextElementSibling.classList.add('svg-active');

        } else {
            audioObj.pause();
            svg.classList.add('svg-active');
            svg.nextElementSibling.classList.remove('svg-active');
        }
    };

    buttonPlay.addEventListener('click', function () {
        playOrPause();
    });


    const volumInit = () => {//шкала звука

        VOLUME_TRAKER.style.width = audioObj.volume * 100 + "%";

    };
    volumInit();

    VOLUME_BAR.addEventListener('mousedown', function (evt) {//изменение громкости при свайпе
        evt.preventDefault();
        let width = VOLUME_TRAKER.clientWidth;
        const changeOnSound = (end) => {


            positionVolume(evt.pageX, end.pageX, width)
        };
        document.addEventListener('mousemove', changeOnSound);
        document.addEventListener('mouseup', function () {
            document.removeEventListener('mousemove', changeOnSound);

        });
    });

    VOLUME_BAR.addEventListener('click', function (evt) {////изменение громкости при клике

        let widthTrack = (evt.currentTarget.offsetLeft - evt.pageX) * -1;

        VOLUME_TRAKER.style.width = widthTrack + "px";
        volumeOfSong(widthTrack)


    });


    const positionVolume = (star, end, width) => {//позиция трекера
        let delta = star - end;
        let fractionsWidth = VOLUME_TRAKER.clientWidth / 1.6;
        VOLUME_TRAKER.style.width = Math.min(width - delta, Math.max(0, VOLUME_BAR.clientWidth)) + "px";
        volumeOfSong(fractionsWidth);

    };
    const volumeOfSong = (fractionsWidth) => {// громкость звука

        if ((1 * fractionsWidth / 100) > 1) {
            audioObj.volume = 1.0;
        } else {
            audioObj.volume = 1 * fractionsWidth / 100;
        }
    };


    PROGRES_BAR.addEventListener('click', function (evt) { //изменение шкалы прогресса по клику

        PROGRES_TRACK.style.width = 0;
        PROGRES_TRACK.style.width = (evt.offsetX / evt.currentTarget.offsetWidth) * 100 + "%";
        audioObj.currentTime = currentTime(evt.offsetX, evt.currentTarget.offsetWidth)

    });
    const currentTime = (offset, width) => {//перевод длины песни в %
        let cord = (offset / width) * 100;
        return (cord * audioObj.duration) / 100;
    };
    PROGRES_WRAPP.addEventListener('mouseover', function (evt) {//перемотка песни   при свайпе
        evt.preventDefault();

        let start = evt.pageX;
        let offset = evt.offsetX;
        const increaseLength = (evt) => {
            let delta = start - evt.pageX;

            TRACK_CURRENT.style.left = Math.min(offset - delta, Math.max(0, PROGRES_WRAPP.offsetWidth)) + 'px';
            TRACK_CURRENT.classList.add('visible');

            let time = currentTime(evt.offsetX, evt.target.offsetWidth);


            if (audioObj.duration < 60) {
                TRACK_CURRENT.textContent = "0." + Math.floor(time);

            }
            else {
                TRACK_CURRENT.textContent = (time / 60).toFixed(2);
            }


        };

        document.addEventListener('mousemove', increaseLength);
        PROGRES_WRAPP.addEventListener('mouseout', function () {
            TRACK_CURRENT.classList.remove('visible');
            document.removeEventListener('mousemove', increaseLength);

        });
    });

    buttonRepeat.addEventListener('click', (evt) => {// зацикливание песни
        makeButtonActive(evt.currentTarget);
        if (audioObj.loop) {
            audioObj.loop = false
        } else {
            audioObj.loop = true
        }
    });

    const playlistOfSearch = (playlist)=>{//поиск активного плейлиста

        for(let i =0; i <playlist.length;i++){
            if(playlist[i].classList.contains('playlist__list--active')){
                return i
            }

        }
    };




let flag ;//запоминаю индекс плайлиста при активной кнопки рандом
const playListIndex = (evt,playlist)=>{
        let index  = playlistOfSearch(playlist);

        if(!evt.classList.contains('active')){
            index = flag;
        }else{
            flag = index
        }
    return   index;
};









    buttonRandom.addEventListener('click', (evt) => {//рандомим плейлист при клике
        makeButtonActive(evt.currentTarget);
        const PLAYLIST_ELEM = document.querySelectorAll('.playlist__list');
        let namePlaylist = Object.getOwnPropertyNames(JSON_PLAYLIST);
        const button = evt.currentTarget;

        let plalistNumb =playListIndex(button,PLAYLIST_ELEM);
        const playListStat = JSON_PLAYLIST[namePlaylist[plalistNumb]].slice();
        const sortOfPlaylist = (RandomList) => {
            let j, elemRan;
            for (let i = RandomList.length - 1; i > 0; i--) {
                j = Math.floor(Math.random() * (i + 1));
                elemRan = RandomList[j];
                RandomList[j] = RandomList[i];
                RandomList[i] = elemRan;
            }
            return RandomList
        };
        if (button.classList.contains('active')) {
            let randomPlaylist = sortOfPlaylist(playListStat);

            playrInnit(randomPlaylist);


        } else {
            playrInnit(JSON_PLAYLIST[namePlaylist[plalistNumb]]);
        }

        playOrPause();
    });



    const musicOfClick = (listOfSongs)=>{//при нажатии на песню в плейлисте воспроизводим ее
        const MUSIC_ITEM = document.querySelectorAll('.playlist__item');
        let namePlaylist = Object.getOwnPropertyNames(listOfSongs);

        MUSIC_ITEM.forEach(function (item) {
            item.onclick= (evt) => {
                const PLAYLIST_ELEM = document.querySelectorAll('.playlist__list');
                let src = evt.currentTarget.getAttribute("data-url");
                let numbList;
                let nameArry ;
                for(let i =0; i <PLAYLIST_ELEM.length;i++){

                    if(PLAYLIST_ELEM[i].classList.contains('playlist__list--active')){
                        numbList=  songsOfSearch(listOfSongs[namePlaylist[i]],src);

                        nameArry=namePlaylist[i];
                        playrInnit(listOfSongs[nameArry],listOfSongs[nameArry][numbList]);

                    }
                }
                playOrPause();
            };
        })
    };


    const makeButtonActive =(evt)=>{//вешаем класс актив на кнопки repeat and random
        const target = evt;
        if (!target.classList.contains('active')) {
            target.classList.add('active');
        }
        else {
            target.classList.remove('active');
        }
    };
    const removeClass =(items,itemClass)=>{//удаляем классы у переданных элементов
        for(let i =0;i<items.length;i++){
            items[i].classList.remove(itemClass);
        }
    }

};