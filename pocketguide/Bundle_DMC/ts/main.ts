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
        }

        private changeUrl(page, url) {
            if (typeof (history.pushState) != "undefined") {
                var obj = { Page: page, Url: url };
                history.pushState(obj, obj.Page, obj.Url);
            } else {
                alert("Browser does not support HTML5.");
            }
        }
    }
}

(function(doc, win, navigator) {
    'use strict';

    doc.addEventListener('DOMContentLoaded', function () {

        new Main.Main();
    });
}(document, window, navigator));

