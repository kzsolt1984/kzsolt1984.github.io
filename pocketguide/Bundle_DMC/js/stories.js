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
            /*$aId.mediaelementplayer({
                alwaysShowControls: true,
                features: ['playpause','progress'],
                audioVolume: 'horizontal',
                success: (mediaElement, domObject)=> {
                   this._mediaElement = mediaElement;

                    mediaElement.addEventListener('play', (e)=> {

                        this._$box.addClass('active');

                    }, false);

                    mediaElement.addEventListener('pause', (e)=> {

                        this._$box.removeClass('active');

                    }, false);

                    //console.log($(domObject).find('.mejs-controls'));
                    //console.log(this._$box.find('.mejs-controls'))
                    this._swipeWidht = this._$box.find('.mejs-time-slider').width();
                    //this._$box.find('.mejs-time-slider').swipe(this._swipeOptions);
                    this._$box.find('.audio_player_cover').swipe(this._swipeOptions)
                }
            });*/
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
                _this._swipeWidht;
                if (percent > 1) {
                    percent = 1;
                }
                percentValue = _this._swipeWidht * percent - 14;
                _this._$box.find('.mejs-time-handle').css('left', percentValue);
                console.log('juhhhhúúúúúúúú', percentValue);
                $('#test').text(percentValue + ' : ' + _this._mediaElement.currentTime);
            });
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
        };
        AudioPlyrComponent.prototype._swipeStatus = function (event, op, direction, distance) {
            if (!this._swipeWidht || !this._mediaElement) {
                return;
            }
            var percent = distance / this._swipeWidht, percentValue;
            if (percent > 1) {
                percent = 1;
            }
            console.log('juhhhhúúúúúúúú');
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
                    console.log('left', this._startValue, percentValue, n);
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
                console.log('end', this._mediaElement.currentTime);
                this._mediaElement.currentTime = this._mediaElement.currentTime;
            }
            //$('#test').append('<p>'+ this._mediaElement.currentTime +'</p>')
        };
        AudioPlyrComponent.prototype._getPercentValue = function (distance) {
            var percent = distance / this._swipeWidht;
            if (percent > 1) {
                percent = 1;
            }
            return this._mediaElement.duration * percent;
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
