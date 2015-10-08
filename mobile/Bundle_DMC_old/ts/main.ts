/**
 * Created by Zsolt on 2015.09.30..
 *
 *
 * http://stackoverflow.com/questions/9446921/clues-on-sliding-between-pages-effect     lapozas
 */
/// <reference path="component/TeaserVideoPlayer.ts"/>
/// <reference path="component/AudioPlyrComponent.ts"/>

interface JQuery {
    jQTouch(options?: any): void;
}

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


            /*$(window).on('hashchange', function() {
                var hash = window.location.hash.replace(/^#/,'');
                alert(hash);
                return false;
            });*/
        }

        private _setAudioPlayer() {console.log('LEFUTOOOK')
            $.each($('.box'), function(key, value) {
                new component.AudioPlyrComponent(
                    {
                        box : value
                    }
                );
            });

            this.setAudioPlayer = true;
        }

        /*private changeUrl(page, url) {alert('32323')
            if (typeof (history.pushState) != "undefined") {
                var obj = { Page: page, Url: url };
                history.pushState(obj, obj.Page, obj.Url);
            } else {
                alert("Browser does not support HTML5.");
            }

            return false;
        }*/

    }
}

(function(doc, window, navigator) {
    'use strict';

    doc.addEventListener('DOMContentLoaded', function () {

        new Main.Main();
    });

    /*window.onload = function () {
        if (typeof history.pushState === "function") {
            history.pushState("jibberish", null, null);
            window.onpopstate = function () {
                history.pushState('newjibberish', null, null);
                // Handle the back (or forward) buttons here
                // Will NOT handle refresh, use onbeforeunload for this.
            };
        }
        else {
            var ignoreHashChange = true;
            window.onhashchange = function () {
                if (!ignoreHashChange) {
                    ignoreHashChange = true;
                    window.location.hash = Math.random();
                    // Detect and redirect change here
                    // Works in older FF and IE9
                    // * it does mess with your hash symbol (anchor?) pound sign
                    // delimiter on the end of the URL
                }
                else {
                    ignoreHashChange = false;
                }
            };
        }
    }*/
}(document, window, navigator));

