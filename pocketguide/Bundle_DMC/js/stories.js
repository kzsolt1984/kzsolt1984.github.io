/**
 * Created by Zsolt on 2015.10.02..
 */
/// <reference path="../../lib/mediaelement.d.ts"/>
var component;
(function (component) {
    var AudioPlyrComponent = (function () {
        function AudioPlyrComponent(options) {
            var _this = this;
            this._$box = $(options.box);
            this._createPlayer(this._$box.find('.myPlayer'));
            this._$box.find('.video-left').on('click', function () {
                _this.setCurrentTime(false);
            });
            this._$box.find('.video-right').on('click', function () {
                _this.setCurrentTime(true);
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
                        alert(1);
                        _this._$box.addClass('active');
                    }, false);
                    mediaElement.addEventListener('pause', function (e) {
                        _this._$box.removeClass('active');
                    }, false);
                }
            });
        };
        /**
         * Set current time
         * @param increase   boolean   increase current time?
         */
        AudioPlyrComponent.prototype.setCurrentTime = function (increase) {
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
