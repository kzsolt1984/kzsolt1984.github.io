/**
 * Created by Zsolt on 2015.09.30..
 *
 *
 * http://stackoverflow.com/questions/9446921/clues-on-sliding-between-pages-effect     lapozas
 */
/// <reference path="component/TeaserVideoPlayer.ts"/>
/// <reference path="component/AudioPlyrComponent.ts"/>

module Main {
    export class Main {
        private setAudioPlayer: boolean = false;

        constructor() {
            new component.TeaserVideoPlayer({
               'videoId'    : 'NewYorkDMC',
                'youtubeId' : 'iFuuondxVX4'
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

