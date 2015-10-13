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
 * Created by Zsolt on 2015.10.02..
 */
/// <reference path="../../lib/mediaelement.d.ts"/>
/// <reference path="../../lib/touchSwipe.d.ts"/>
var component;
(function (component) {
    var AudioPlyrComponent = (function () {
        function AudioPlyrComponent(options) {
            var _this = this;
            this._swipeOptions = {
                triggerOnTouchEnd: true,
                swipeStatus: function (a, b, c, d) { _this._swipeStatus(a, b, c, d); },
                allowPageScroll: "vertical",
                threshold: 0,
                excludedElements: "button, input, select, textarea, .noSwipe"
            };
            this._swipeWidht = 0;
            this._startValue = 0;
            this._$box = $(options.box);
            this._id = options.id;
            this._mainC = options.self;
            this._swipeWidht = this._$box.find('.audio-player').width();
            this._createPlayer(this._$box.find('.myPlayer'));
            this._$box.find('.video-left').on('click', function () {
                _this._setCurrentTime(false);
            });
            this._$box.find('.video-right').on('click', function () {
                _this._setCurrentTime(true);
            });
            this._$box.find('.play_btn_content').on('click', function (e) {
                var $e = $(e.currentTarget);
                if ($e.find('.play_btn').css('display') !== 'none') {
                    _this._play();
                }
                else {
                    _this._stop();
                }
            });
            $(window).on('hashchange', function () {
                _this._stop();
            });
        }
        /**
         * Create audio player
         * @param $aId   JQuery   audio tag
         * @private
         */
        AudioPlyrComponent.prototype._createPlayer = function ($aId) {
            var _this = this;
            this._mediaElement = $aId.get(0);
            this._mediaElement.addEventListener('play', function (e) {
                _this._$box.addClass('active');
            }, false);
            this._mediaElement.addEventListener('pause', function (e) {
                _this._$box.removeClass('active');
            }, false);
            this._mediaElement.addEventListener("timeupdate", function (e) {
                console.log('update', _this._mediaElement.currentTime);
                var percent = _this._mediaElement.currentTime / _this._mediaElement.duration, percentValue;
                if (percent > 1) {
                    percent = 1;
                }
                percentValue = 100 * percent - ((_this._$box.find('.mejs-time-handle').width() / 2) / _this._swipeWidht * 100);
                _this._$box.find('.mejs-time-handle').css('left', percentValue + '%');
            });
            this._$box.find('.mejs-time-handle').css('left', ((this._$box.find('.mejs-time-handle').width() / 2) / this._swipeWidht * (-100)) + '%');
            this._swipeWidht = this._$box.find('.mejs-time-slider').width();
            this._$box.find('.mejs-time-slider').swipe(this._swipeOptions);
        };
        /**
         * Set current time
         * @param increase   boolean   increase current time?
         */
        AudioPlyrComponent.prototype._setCurrentTime = function (increase) {
            if (!this._mediaElement) {
                return;
            }
            if (increase) {
                this._mediaElement.currentTime += 15;
            }
            else {
                this._mediaElement.currentTime -= 15;
            }
        };
        AudioPlyrComponent.prototype._stop = function () {
            if (!this._mediaElement) {
                return;
            }
            this._mediaElement.pause();
        };
        AudioPlyrComponent.prototype._play = function () {
            if (!this._mediaElement) {
                return;
            }
            this._mediaElement.play();
            this._mainC.stop(this._id);
        };
        AudioPlyrComponent.prototype._swipeStatus = function (event, op, direction, distance) {
            if (!this._swipeWidht || !this._mediaElement) {
                return;
            }
            var percent = distance / this._swipeWidht, percentValue;
            if (percent > 1) {
                percent = 1;
            }
            percentValue = this._mediaElement.duration * percent;
            if (op === 'start') {
                this._startValue = this._mediaElement.currentTime;
            }
            if ($(event.target).hasClass('mejs-time-handle')) {
                if (!distance) {
                    return;
                }
                if (op === 'move' && direction === 'left') {
                    var n = this._startValue - percentValue;
                    this._mediaElement.currentTime = (n > 0) ? n : 0;
                }
                else if (op === 'move') {
                    //right
                    var n = this._startValue + percentValue;
                    //console.log('right', n)
                    this._mediaElement.currentTime = (n > this._mediaElement.duration) ? this._mediaElement.currentTime : n;
                }
            }
            if (op === 'end') {
                this._mediaElement.currentTime = this._mediaElement.currentTime;
            }
        };
        AudioPlyrComponent.prototype.stop = function () {
            this._stop();
        };
        return AudioPlyrComponent;
    })();
    component.AudioPlyrComponent = AudioPlyrComponent;
})(component || (component = {}));
/**
 * Created by Zsolt on 2015.09.30..
 *
 *
 * http://stackoverflow.com/questions/9446921/clues-on-sliding-between-pages-effect     lapozas
 */
/// <reference path="component/TeaserVideoPlayer.ts"/>
/// <reference path="component/AudioPlyrComponent.ts"/>
var Main;
(function (Main_1) {
    var Main = (function () {
        function Main() {
            this.setAudioPlayer = false;
            new component.TeaserVideoPlayer({
                //'videoId'    : '6815537',
                //'youtubeId' : 'iFuuondxVX4'
                'videoId': 'NewYorkDMC',
                'youtubeId': 'iFuuondxVX4'
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
