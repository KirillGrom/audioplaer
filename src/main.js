'use strict'


import {scroll} from './scroll/scroll.js';
import {audioPlayer} from "./audio/audio.js";


document.addEventListener("DOMContentLoaded", function(event) {

    scroll();
    audioPlayer();
}); 