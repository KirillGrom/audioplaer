'use strict'
import {carusel} from './carusel/carusel.js';
import {eventClick} from './eventclick/eventclick.js';
import {scroll} from './scroll/scroll.js';






document.addEventListener("DOMContentLoaded", function(event) {
    carusel();
    eventClick();
    scroll();

}); 