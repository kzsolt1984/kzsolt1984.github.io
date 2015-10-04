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
               'videoId' : '6815537',
                'youtubeId' : 'FKHWcd2wA30'
            });

            $('.card').on('click', (e)=> {
                var $e = $(e.currentTarget);
                if($e.hasClass('noHash')) {
                    window.location.href = $e.attr('href');
                }
                else {
                    var newPageId = $e.attr('href').replace(/^#/,'');

                    window.location.hash = newPageId;

                    if(newPageId && !this.setAudioPlayer) {
                        this._setAudioPlayer();
                    }
                }

            });

            if(window.location.hash.indexOf('stories') !== -1) {
                this._setAudioPlayer();
            }
        }

        private _setAudioPlayer() {
            $.each($('.box'), function(key, value) {
                new component.AudioPlyrComponent(
                    {
                        box : value
                    }
                );
            });

            this.setAudioPlayer = true;
        }
    }
}

(function(doc, window, navigator) {
    'use strict';

    doc.addEventListener('DOMContentLoaded', function () {

        new Main.Main();
    });

}(document, window, navigator));

