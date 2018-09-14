'use strict';


export const audioPlayer =()=>{
    const   buttonPlay = document.querySelector('.audioPlayer__play');
    const buttonNext = document.querySelector('.audioPlayer__next');
    const buttonPrev = document.querySelector('.audioPlayer__prev');
    const buttonRepeat = document.querySelector('.audioPlayer__repeat');
    const  buttonRandom = document.querySelector('.random__random');
    const playList = [];
    const VOLUME_TRAKER = document.querySelector('.volume__item');
    const VOLUME_BAR = document.querySelector('.audioPlayer__volume');
    const PROGRES_BAR = document.querySelector('.audioPlayer__track');
    const PROGRES_TRACK = document.querySelector('.track__item');
    const PROGRES_WRAPP = document.querySelector('.audioPlayer__wrapp');
    const TRACK_CURRENT = document.querySelector('.track__current-time');

    const audioObj = new Audio();

    class Music   {//обьекта песня
        constructor(title,authorName,srcMusic,formatMusic,numblist){
            this.title = title;
            this.authorName = authorName;
            this.formatMusic = formatMusic;
            this.srcMusic = srcMusic +  this.authorName + '-'+  this.title  +'.'+ this.formatMusic;
            this.numblist = numblist;
            this.addPlayList();
        }

        addPlayList (){
            playList.push(this);
        }
    };
    new Music('_Save_Me','XXXTENTACION_','music/','mp3',0);
    new  Music('numb','xxxtentacion','music/','mp3',1);



    let songNumber =  null;
    const playrInnit = (playListPar)=>{//интцилизация плеера


        lastSong();
        audioObj.src=playListPar[0].srcMusic;
        songNumber = playListPar[0].numblist;






        // buttonNext.removeEventListener('click',buttonNextEvet);


        buttonNext.onclick=function (evt) {

            nextSong(playListPar);


        };
        buttonPrev.onclick=function (evt) {

            prevSong(playListPar);


        };


        audioObj.onended= ()=> {

            if(songsOfSearch(playListPar,audioObj.src)< playListPar.length -1){
                nextSong(playListPar)
            }

        };


    };


    const nextSong = (listplay)=>{//след. песня
        let index = songsOfSearch(listplay,audioObj.src);



        audioObj.src =listplay[index+1].srcMusic;
        songNumber=index+1;
        playOrPause();
        lastSong()
    };
    const prevSong = (listplay)=>{// предедущая песня
        let index = songsOfSearch(listplay,audioObj.src);
        audioObj.src =listplay[index-1].srcMusic;
        songNumber=index-1;

        playOrPause();
        lastSong()

    };
    const songsOfSearch = (arrySong,src)=>{
        src = src.split("/").slice(5).join("/");




        for(let i=0;i<arrySong.length;i++){

            if(arrySong[i].srcMusic == src){
                return i;
            }
        }
    };

    audioObj.addEventListener('timeupdate',function (evt) {
        let duration = evt.currentTarget.duration ;
        let currentTime  = evt.currentTarget.currentTime;

        PROGRES_TRACK.style.width =  100 / duration * currentTime + '%';
        // console.log(100 / duration * currentTime)
    });











    const  playOrPause =()=>{ //пауза и плей

        const svg = document.querySelector('.svg-play-js');


        if (audioObj.paused){
            audioObj.play();
            svg.classList.remove('svg-active');
            svg.nextElementSibling.classList.add('svg-active');

        }else {
            audioObj.pause();
            svg.classList.add('svg-active');
            svg.nextElementSibling.classList.remove('svg-active');
        }
    };


const  lastSong = ()=>{//проверка на последнюю песню
    if(songNumber <=0){
        buttonPrev.classList.add('song-last');
    }else {
        buttonPrev.classList.remove('song-last');
    }
    if(songNumber === playList.length-1){
        buttonNext.classList.add('song-last');
    }else{
        buttonNext.classList.remove('song-last');
    }

};



    buttonPlay.addEventListener('click',function () {
        playOrPause();
    });


    const volumInit =()=>{

        VOLUME_TRAKER.style.width  = audioObj.volume *100 +"%" ;

    };
    volumInit();

    VOLUME_BAR.addEventListener('mousedown',function (evt) {
        evt.preventDefault();
        let width = VOLUME_TRAKER.clientWidth;
        const changeOnSound = (end)=>{


            positionVolume(evt.pageX,end.pageX,width)
        };
        document.addEventListener('mousemove',changeOnSound );
        document.addEventListener('mouseup', function() {
            document.removeEventListener('mousemove', changeOnSound);

        });
    });

    VOLUME_BAR.addEventListener('click',function (evt) {

let widthTrack =(evt.currentTarget.offsetLeft - evt.pageX )  * -1;

            VOLUME_TRAKER.style.width  =  widthTrack +"px";
        volumeOfSong(widthTrack)


    });


    const positionVolume = (star,end,width)=>{//позиция трекера
        let delta =star - end;
        let fractionsWidth = VOLUME_TRAKER.clientWidth/1.6;
        VOLUME_TRAKER.style.width  = Math.min( width - delta,Math.max(0,VOLUME_BAR.clientWidth )) +"px";
        volumeOfSong(fractionsWidth);

    };
    const volumeOfSong = (fractionsWidth)=>{// громкость звука

        if(( 1 * fractionsWidth /100) > 1) {
        audioObj.volume = 1.0;
    } else{
        audioObj.volume =  1 * fractionsWidth /100;
    }
    };


    PROGRES_BAR.addEventListener('click',function (evt) {

        PROGRES_TRACK.style.width= 0;
            PROGRES_TRACK.style.width = (evt.offsetX / evt.currentTarget.offsetWidth)*100 + "%";
        audioObj.currentTime = currentTime(evt.offsetX,evt.currentTarget.offsetWidth)

    });
    const currentTime =(offset,width)=>{
        let cord = (offset / width)*100 ;
        return (cord * audioObj.duration)/100;
    };
    PROGRES_WRAPP.addEventListener('mouseover',function (evt) {
        evt.preventDefault();

        let start = evt.pageX;
        let offset = evt.offsetX ;
        const increaseLength = (evt)=>{
            let delta = start - evt.pageX;

            TRACK_CURRENT.style.left = Math.min( offset - delta,Math.max(0,PROGRES_WRAPP.offsetWidth)) +'px';
            TRACK_CURRENT.classList.add('visible');

            let time =currentTime(evt.offsetX,evt.target.offsetWidth);


            if(audioObj.duration<60){
                TRACK_CURRENT.textContent ="0."+Math.floor(time);

            }
            else {
                TRACK_CURRENT.textContent =(time/60).toFixed(2);
            }



        };

        document.addEventListener('mousemove',increaseLength );
        PROGRES_WRAPP.addEventListener('mouseout', function() {
            TRACK_CURRENT.classList.remove('visible');
            document.removeEventListener('mousemove', increaseLength);

        });
    });

    buttonRepeat.addEventListener('click',()=>{
        if( audioObj.loop){
            audioObj.loop=false
        }else {
            audioObj.loop =true
        }
    });
    buttonRandom.addEventListener('click',(evt)=> {
        const  playListStat =playList.slice();
        const button = evt.currentTarget;


        const sortOfPlaylist =(RandomList)=>{
            let j,elemRan;
            for(let i = RandomList.length - 1; i > 0; i--){
                j = Math.floor(Math.random()*(i + 1));
                elemRan = RandomList[j];
                RandomList[j] = RandomList[i];
                RandomList[i] = elemRan;
            }
            return RandomList
        };
        if(button.classList.contains('active')){
            let randomPlaylist = sortOfPlaylist(playListStat);

            playrInnit(randomPlaylist);


        }else{
            playrInnit(playList);
        }

        playOrPause();
    });

    playrInnit(playList);
};