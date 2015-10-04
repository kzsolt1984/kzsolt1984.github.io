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
            alert('fasz: ');
            //window.location.href = 'start.html?pocketguide_video='+ this._videoId +'&youtube=1';
            window.location.href = '/stories.html';
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
                    //$('#play_box').html('<a href="javascript:window.history.go(-1)">&nbsp;</a>');
                    $('#play_box')
                        .on('click', function () {
                        window.history.go(-1);
                    });
                    alert('youtube');
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
            $(window).on('hashchange', function () {
                _this.stopPlay();
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
        AudioPlyrComponent.prototype.stopPlay = function () {
            if (!this._mediaElement) {
                return;
            }
            this._mediaElement.stop();
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
            var _this = this;
            this.setAudioPlayer = false;
            new component.TeaserVideoPlayer({
                'videoId': '6815537',
                'youtubeId': 'FKHWcd2wA30'
            });
            $('.card').on('click', function (e) {
                var $e = $(e.currentTarget);
                if ($e.hasClass('noHash')) {
                    window.location.href = $e.attr('href');
                }
                else {
                    var newPageId = $e.attr('href').replace(/^#/, '');
                    window.location.hash = newPageId;
                    if (newPageId && !_this.setAudioPlayer) {
                        _this._setAudioPlayer();
                    }
                }
            });
            if (window.location.hash.indexOf('stories') !== -1) {
                this._setAudioPlayer();
            }
            /*$(window).on('hashchange', function() {
                var hash = window.location.hash.replace(/^#/,'');
                alert(hash);
                return false;
            });*/
        }
        Main.prototype._setAudioPlayer = function () {
            console.log('LEFUTOOOK');
            $.each($('.box'), function (key, value) {
                new component.AudioPlyrComponent({
                    box: value
                });
            });
            this.setAudioPlayer = true;
        };
        return Main;
    })();
    Main_1.Main = Main;
})(Main || (Main = {}));
(function (doc, window, navigator) {
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
