/**
 * Created by Zsolt on 2015.09.30..
 *
 *
 */
/// <reference path="../lib/jquery.d.ts"/>
/// <reference path="../lib/bxsilder.d.ts"/>
/// <reference path="../lib/touchSwipe.d.ts"/>
var Main;
(function (Main_1) {
    var Main = (function () {
        function Main() {
            var _this = this;
            this._openSubMenuStatus = 0;
            this._swipeLeftValue = 0;
            this._swipeOptions = {
                triggerOnTouchEnd: true,
                swipeStatus: function (a, b, c, d) { _this._swipeStatus(a, b, c, d); },
                allowPageScroll: "vertical",
                threshold: 75,
                excludedElements: "button, input, select, textarea, .noSwipe"
            };
            this._activeSubmenu = null;
            this._toursContainer = $('#tours_container');
            this._toursSwipeContent = this._toursContainer.find('.elements');
            this._toursSwipeContentWidth = this._toursSwipeContent.width();
            this._adContainer = $('#ad_container');
            this._langContainer = $('#lang_container');
            $("#start_btn").on('click', function () {
                _this._openSubMenu(_this._toursContainer);
                return false;
            });
            $("#language_chooser").on('click', function () {
                _this._openSubMenu(_this._langContainer);
                return false;
            });
            this._langContainer.find('a').on('click', function () {
                _this._openSubMenu(_this._toursContainer);
                return false;
            });
            /*$('.ad_elements').bxSlider({
                auto: true,
                autoControls: false,
                controls: false,
                pager: false,
                touchEnabled: false,
                pause: 8000
            });*/
            alert($(window).height() + ' : ' + $(window).width() + ' : ' + $('.ad_elements').children().width());
            $(window).on('orientationchange resize', function () {
                //this._toursContainer.swipe('destroy');
                // swipe es adatok frissitese
                _this._calcSwipeContentDimension();
            });
            this._calcSwipeContentDimension();
            this._toursContainer.swipe(this._swipeOptions);
        }
        Main.prototype._calcSwipeContentDimension = function () {
            var $window = $(window);
            if ($window.height() > $window.width()) {
                //portrait
                this._calculateTourSwipeElementWidth(false);
            }
            else {
                //landscape
                this._calculateTourSwipeElementWidth(true);
            }
        };
        Main.prototype._calculateTourSwipeElementWidth = function (square) {
            var $element = this._toursSwipeContent.children(), elementLength = $element.length, marginValue = parseInt($element.css('margin-right')), contentWidth = 0;
            this._toursSwipeContent.css('left', 0);
            $element.removeAttr('style');
            if (square) {
                $element.width($('#tour_height_sample').height());
            }
            else {
                this._toursSwipeContent.width($(window).width() * 2.87);
                console.log('p', this._toursSwipeContent.css('width'), $element.css('width'));
                $element.width($element.css('width'));
            }
            contentWidth = ($element.width() + marginValue) * elementLength;
            this._toursSwipeContent.width(contentWidth);
            this._toursSwipeContentWidth = contentWidth;
            //this._toursContainer.swipe(this._swipeOptions);
        };
        Main.prototype._openSubMenu = function ($element) {
            var _this = this;
            var id = $element.attr('id');
            if (this._openSubMenuStatus === 1) {
                return;
            }
            if (this._activeSubmenu && id === this._activeSubmenu) {
                this._closeSubMenu($element);
                return;
            }
            else if (this._activeSubmenu && id !== this._activeSubmenu) {
                this._closeSubMenu($('#' + this._activeSubmenu));
            }
            this._activeSubmenu = id;
            $element.animate({
                height: '65.6%',
                opacity: 1
            }, {
                duration: 1000,
                height: "easeOutBounce",
                step: function (now, fx) {
                    if (now > 50 && _this._openSubMenuStatus !== 1) {
                        _this._openSubMenuStatus = 1;
                        _this._adContainer.addClass('min');
                    }
                },
                complete: function () {
                    _this._openSubMenuStatus = 2;
                }
            });
            return false;
        };
        Main.prototype._closeSubMenu = function ($element) {
            var _this = this;
            this._activeSubmenu = null;
            $element.animate({
                height: '0',
                opacity: 0
            }, {
                duration: 1000,
                height: "easeOutBounce",
                step: function (now, fx) {
                    if (now < 20 && _this._openSubMenuStatus !== 1) {
                        _this._openSubMenuStatus = 1;
                        _this._adContainer.removeClass('min');
                    }
                },
                complete: function () {
                    _this._openSubMenuStatus = 0;
                }
            });
        };
        Main.prototype._swipeStatus = function (event, phase, direction, distance) {
            //If we are moving before swipe, and we are going L or R in X mode, or U or D in Y mode then drag.
            if (phase == "move" && (direction == "left" || direction == "right")) {
                var distanceDir = (direction === "left") ? distance * (-1) : distance, newLeft = distanceDir + this._swipeLeftValue;
                if (newLeft > 0) {
                    newLeft = 0;
                }
                else if (newLeft < ((this._toursSwipeContentWidth - $(window).width()) * (-1))) {
                    newLeft = ((this._toursSwipeContentWidth - $(window).width() - 5) * (-1));
                }
                this._toursSwipeContent.css('left', newLeft);
            }
            else if (phase == "end") {
                this._swipeLeftValue = parseInt(this._toursSwipeContent.css('left'));
            }
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
}(document, window, navigator));
