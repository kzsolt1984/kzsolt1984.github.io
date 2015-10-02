/// <reference path="../lib/mediaelement.d.ts"/>

module Stories {
    export class Stories {
        constructor() {
            $(document).ready(function() {
                $('.myPlayer').mediaelementplayer({
                    alwaysShowControls: true,
                    features: ['playpause','volume'],
                    audioVolume: 'horizontal'
                });
            });
        }
    }
}

(function(doc, win, navigator) {
    'use strict';

    doc.addEventListener('DOMContentLoaded', function () {

        new Stories.Stories();
    });
}(document, window, navigator));
