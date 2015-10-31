/// <reference path="../lib/jquery.d.ts"/>
var Tour;
(function (Tour_1) {
    var Tour = (function () {
        function Tour() {
            console.log($(window).height(), $('body').height(), $('a').offset().top);
            /*if($('body').height() > $('a').offset().top) {
                $('a').css({
                    position: 'absolute',
                    bottom: 0,
                    width: '100%'
                })
            }*/
        }
        return Tour;
    })();
    Tour_1.Tour = Tour;
})(Tour || (Tour = {}));
(function (doc, window, navigator) {
    'use strict';
    doc.addEventListener('DOMContentLoaded', function () {
        new Tour.Tour();
    });
}(document, window, navigator));
