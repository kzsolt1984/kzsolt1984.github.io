/// <reference path="../lib/mediaelement.d.ts"/>
var Stories;
(function (Stories_1) {
    var Stories = (function () {
        function Stories() {
            $(document).ready(function () {
                $('#audio-player').mediaelementplayer({
                    alwaysShowControls: true,
                    features: ['playpause', 'volume'],
                    audioVolume: 'horizontal'
                });
            });
        }
        return Stories;
    })();
    Stories_1.Stories = Stories;
})(Stories || (Stories = {}));
(function (doc, win, navigator) {
    'use strict';
    doc.addEventListener('DOMContentLoaded', function () {
        new Stories.Stories();
    });
}(document, window, navigator));
