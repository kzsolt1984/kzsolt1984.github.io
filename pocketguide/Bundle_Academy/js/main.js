/**
 * Created by Zsolt on 2015.10.01..
 */
/// <reference path="../../lib/jquery.d.ts"/>
var component;
(function (component) {
    var TeaserVideoPlayer = (function () {
        function TeaserVideoPlayer(opt) {
            this._videoId = opt.videoId;
            this._youtubeId = opt.youtubeId;
            this._createVideo();
        }
        TeaserVideoPlayer.prototype._siteRedirect = function () {
            window.location.href = 'start.html?pocketguide_video=' + this._videoId + '_en&youtube=1';
        };
        TeaserVideoPlayer.prototype._createVideo = function () {
            var _this = this;
            if ((navigator.userAgent.match(/Android/i)) || (navigator.userAgent.match(/android/i))) {
                $('#play_box')
                    .on('click', function () {
                    window.location.href = "http://www.youtube.com/watch?v=" + _this._youtubeId + "&feature=youtu.be";
                });
            }
            else if ((navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPad/i)) || (navigator.userAgent.match(/iPod/i))) {
                if (window.location.href.indexOf('youtube=1') !== -1) {
                    $('#play_box')
                        .on('click', function () {
                        window.history.go(-1);
                    });
                    $('#iphone_video').html('<iframe id="frame1" scrolling="no" src="http://www.youtube.com/embed/' + this._youtubeId + '?controls=0&showinfo=0&rel=0&autoplay=1" frameborder="0" allowfullscreen></iframe>');
                }
                else {
                    $('#play_box')
                        .on('click', function () {
                        _this._siteRedirect();
                    });
                }
            }
        };
        return TeaserVideoPlayer;
    })();
    component.TeaserVideoPlayer = TeaserVideoPlayer;
})(component || (component = {}));
/**
 * Created by Zsolt on 2015.09.30..
 *
 *
 * http://stackoverflow.com/questions/9446921/clues-on-sliding-between-pages-effect     lapozas
 */
/// <reference path="component/TeaserVideoPlayer.ts"/>
var Main;
(function (Main_1) {
    var Main = (function () {
        function Main() {
            new component.TeaserVideoPlayer({
                'videoId': '7110439',
                'youtubeId': 'IrB5kcWPGoI'
            });
        }
        return Main;
    })();
    Main_1.Main = Main;
})(Main || (Main = {}));
(function (doc, window, navigator) {
    'use strict';
    doc.addEventListener('DOMContentLoaded', function () {
        new Main.Main();
    });
}(document, window, navigator));
