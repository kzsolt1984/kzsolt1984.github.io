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
                'youtubeId' : 'Jo-x0LWk2zk'
            });

            setTimeout(function(){
                alert($('#iphone_video').height() +':'+$('#iphone_video').width());
                alert($('iframe').height() +':'+$('iframe').width());
            }, 3000)

        }
    }
}

(function(doc, window, navigator) {
    'use strict';

    doc.addEventListener('DOMContentLoaded', function () {

        new Main.Main();
    });

}(document, window, navigator));

