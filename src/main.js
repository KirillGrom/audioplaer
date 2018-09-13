'use strict'
import {carusel} from './carusel/carusel.js';
import {eventClick} from './eventclick/eventclick.js';
import {scroll} from './scroll/scroll.js';
import {audioPlayer} from "./audio/audio.js";


document.addEventListener("DOMContentLoaded", function(event) {
    carusel();
    eventClick();
    scroll();
    audioPlayer();
}); 