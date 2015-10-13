/**
 * Created by Zsolt on 2015.10.02..
 */
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
        }
        /**
         * Create audio player
         * @param $aId   JQuery   audio tag
         * @private
         */
        AudioPlyrComponent.prototype._createPlayer = function ($aId) {
            var _this = this;
            this._mediaElement = $aId.get(0);
            var startPos = (this._$box.find('.mejs-time-handle').width() / 2) / this._swipeWidht * (-100);
            this._$box.find('.mejs-time-handle').css('left', startPos + '%');
            this._swipeWidht = this._$box.find('.mejs-time-slider').width();
            this._$box.find('.mejs-time-slider').swipe(this._swipeOptions);
            this._mediaElement.addEventListener('play', function (e) {
                _this._$box.addClass('active');
            }, false);
            this._mediaElement.addEventListener('pause', function (e) {
                _this._$box.removeClass('active');
            }, false);
            this._mediaElement.addEventListener("timeupdate", function (e) {
                var percent = _this._mediaElement.currentTime / _this._mediaElement.duration, percentValue;
                if (percent > 1) {
                    percent = 1;
                }
                percentValue = (100 * percent) + startPos;
                _this._$box.find('.mejs-time-handle').css('left', percentValue + '%');
            });
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
        /**
         * Stop audio
         * @private
         */
        AudioPlyrComponent.prototype._stop = function () {
            if (!this._mediaElement) {
                return;
            }
            this._mediaElement.pause();
        };
        /**
         * Start audio
         * @private
         */
        AudioPlyrComponent.prototype._play = function () {
            if (!this._mediaElement) {
                return;
            }
            this._mediaElement.play();
            this._mainC.stop(this._id);
        };
        /**
         * swipe audio time
         * @param             event   object   event type
         * @param             op   string   swipe action
         * @param direction   string swipe direction
         * @param distance    number   swipe distance
         * @private
         */
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
        /**
         * Stop audio
         */
        AudioPlyrComponent.prototype.stop = function () {
            this._stop();
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
            var _this = this;
            this._players = [];
            $.each($('.box'), function (key, value) {
                _this._players.push(new component.AudioPlyrComponent({
                    box: value,
                    id: key,
                    self: _this
                }));
            });
        }
        /**
         * Stop audio
         * @param id   number   audio number
         */
        Stories.prototype.stop = function (id) {
            for (var i = 0; i < this._players.length; i++) {
                if (id != i) {
                    this._players[i].stop();
                }
            }
        };
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
