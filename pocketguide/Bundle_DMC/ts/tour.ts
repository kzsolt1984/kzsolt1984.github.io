/// <reference path="../lib/jquery.d.ts"/>

module Tour {
    export class Tour {

        constructor() {
            console.log($(window).height(), $('body').height(), $('a').offset().top)

            /*if($('body').height() > $('a').offset().top) {
                $('a').css({
                    position: 'absolute',
                    bottom: 0,
                    width: '100%'
                })
            }*/
        }
    }
}

(function(doc, window, navigator) {
    'use strict';

    doc.addEventListener('DOMContentLoaded', function () {

        new Tour.Tour();
    });

}(document, window, navigator));


