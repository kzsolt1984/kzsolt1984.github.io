/**
 * Created by Zsolt on 2015.09.30..
 *
 *
 * http://stackoverflow.com/questions/9446921/clues-on-sliding-between-pages-effect     lapozas
 */
/// <reference path="component/TeaserVideoPlayer.ts"/>

module Main {
    export class Main {
        constructor() {
            new component.TeaserVideoPlayer({
               'videoId'    : '7110439',
                'youtubeId' : 'IrB5kcWPGoI'
            });
        }
    }
}

(function(doc, window, navigator) {
    'use strict';

    doc.addEventListener('DOMContentLoaded', function () {

        new Main.Main();
    });

}(document, window, navigator));
