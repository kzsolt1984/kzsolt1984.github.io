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
               'videoId' : '6815537',
                'youtubeId' : 'FKHWcd2wA30'
            });

            $('.card').on('click', ()=> {
                //this.changeUrl('Page1', 'start.html');
            });

            $(window).on('hashchange', function() {
                var hash = window.location.hash.replace(/^#/,'');
                alert(hash);
            });
        }

        private changeUrl(page, url) {alert('32323')
            if (typeof (history.pushState) != "undefined") {
                var obj = { Page: page, Url: url };
                history.pushState(obj, obj.Page, obj.Url);
            } else {
                alert("Browser does not support HTML5.");
            }
alert(window.location)
            return false;
        }

        private hashChange() {}
    }
}

(function(doc, win, navigator) {
    'use strict';

    doc.addEventListener('DOMContentLoaded', function () {

        new Main.Main();
    });
}(document, window, navigator));

