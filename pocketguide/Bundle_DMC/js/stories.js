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
                threshold: 75,
                excludedElements: "button, input, select, textarea, .noSwipe"
            };
            this._$box = $(options.box);
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
            $(function () {
                _this._$box.find('.audio_player_cover').swipe(_this._swipeOptions);
            });
        }
        /**
         * Create audio player
         * @param $aId   JQuery   audio tag
         * @private
         */
        AudioPlyrComponent.prototype._createPlayer = function ($aId) {
            var _this = this;
            $aId.mediaelementplayer({
                alwaysShowControls: true,
                features: ['playpause', 'progress'],
                audioVolume: 'horizontal',
                success: function (mediaElement, domObject) {
                    _this._mediaElement = mediaElement;
                    mediaElement.addEventListener('play', function (e) {
                        _this._$box.addClass('active');
                    }, false);
                    mediaElement.addEventListener('pause', function (e) {
                        _this._$box.removeClass('active');
                    }, false);
                }
            });
            /*this._$box.find('.audio_player_cover').on('click', (e)=> {
                alert('klikk')
            });

            this._$box.find('.audio_player_cover').on('touchstart', (e)=> {
                alert('touch')


            });*/
            //this._$box.find('.audio_player_cover').swipe(this._swipeOptions)
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
            this._mediaElement.stop();
        };
        AudioPlyrComponent.prototype._play = function () {
            if (!this._mediaElement) {
                return;
            }
            this._mediaElement.play();
        };
        AudioPlyrComponent.prototype._swipeStatus = function (a, b, c, d) {
            $('#test').text("You swiped " + d);
            //console.log(a,b,c,d)
        };
        return AudioPlyrComponent;
    })();
    component.AudioPlyrComponent = AudioPlyrComponent;
})(component || (component = {}));
/// <reference path="component/AudioPlyrComponent.ts"/>
var Stories;
(function (Stories_1) {
    var Stories = (function () {
        function Stories() {
            $.each($('.box'), function (key, value) {
                new component.AudioPlyrComponent({
                    box: value
                });
            });
        }
        return Stories;
    })();
    Stories_1.Stories = Stories;
})(Stories || (Stories = {}));
(function (doc, win, navigator) {
    'use strict';
    doc.addEventListener('DOMContentLoaded', function () {
        new Stories.Stories();
    });
}(document, window, navigator));
