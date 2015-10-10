/**
 * Created by Zsolt on 2015.09.30..
 *
 *
 */
/// <reference path="../lib/jquery.d.ts"/>
/// <reference path="../lib/bxsilder.d.ts"/>
/// <reference path="../lib/touchSwipe.d.ts"/>

module Main {
    export class Main {
        private _openSubMenuStatus = 0;
        private _toursContainer : JQuery;
        private _toursSwipeContent: JQuery;
        private _toursSwipeContentWidth: number;
        private _adContainer : JQuery;
        private _swipeLeftValue: number = 0;
        private _swipeOptions = {
            triggerOnTouchEnd: true,
            swipeStatus: (a,b,c,d)=> {this._swipeStatus(a,b,c,d)},
            allowPageScroll: "vertical",
            threshold: 75,
            excludedElements: "button, input, select, textarea, .noSwipe",
        };
        private _langContainer: JQuery;
        private _activeSubmenu = null;

        constructor() {
            this._toursContainer = $('#tours_container');
            this._toursSwipeContent = this._toursContainer.find('.elements');
            this._toursSwipeContentWidth = this._toursSwipeContent.width();
            this._adContainer    = $('#ad_container');
            this._langContainer = $('#lang_container');

            $( "#start_btn" ).on('click', ()=> {
                this._openSubMenu(this._toursContainer);
            });

            $( "#language_chooser" ).on('click', ()=> {
                this._openSubMenu(this._langContainer);
            });

            $('.ad_elements').bxSlider({
                auto: true,
                autoControls: false,
                controls: false,
                pager: false,
                touchEnabled: false,
                pause: 8000
            });

            this._toursContainer.swipe(this._swipeOptions);
        }

        private _openSubMenu($element:JQuery) {
            var id = $element.attr('id');

            if(this._openSubMenuStatus === 1) {
                return;
            }

            if(this._activeSubmenu && id === this._activeSubmenu) {
                this._closeSubMenu($element);

                return;
            }
            else if(this._activeSubmenu && id !== this._activeSubmenu) {
                this._closeSubMenu($('#' + this._activeSubmenu));
            }

            this._activeSubmenu = id;

            $element.animate({
                height: '65.6%',
                opacity: 1
            }, {
                duration: 1000,
                height: "easeOutBounce",
                step: ( now, fx )=> {
                    if(now > 50 && this._openSubMenuStatus !== 1) {
                        this._openSubMenuStatus = 1;
                        this._adContainer.addClass('min');

                    }
                },
                complete: ()=> {
                    this._openSubMenuStatus = 2;
                }
            });

            return false;
        }

        private _closeSubMenu($element:JQuery): void {
            this._activeSubmenu = null;

            $element.animate({
                height: '0',
                opacity: 0
            }, {
                duration: 1000,
                height: "easeOutBounce",
                step: ( now, fx )=> {
                    if(now < 20 && this._openSubMenuStatus !== 1) {
                        this._openSubMenuStatus = 1;
                        this._adContainer.removeClass('min');
                    }
                },
                complete: ()=> {
                    this._openSubMenuStatus = 0;
                }
            });
        }

        private _swipeStatus(event, phase, direction, distance) {
            //If we are moving before swipe, and we are going L or R in X mode, or U or D in Y mode then drag.
            if (phase == "move" && (direction == "left" || direction == "right")) {
                var distanceDir = (direction === "left") ? distance * (-1): distance,
                    newLeft = distanceDir + this._swipeLeftValue;

                if(newLeft > 0) {
                    newLeft = 0;
                }
                else if(newLeft < ((this._toursSwipeContentWidth - $(window).width()) * (-1))) {
                    newLeft = ((this._toursSwipeContentWidth - $(window).width() - 30) * (-1));
                }

                this._toursSwipeContent.css('left', newLeft);

            }
            else if(phase == "end") {
                this._swipeLeftValue = parseInt( this._toursSwipeContent.css('left') );
            }
        }
    }
}

(function(doc, window, navigator) {
    'use strict';

    doc.addEventListener('DOMContentLoaded', function () {

        new Main.Main();
    });

}(document, window, navigator));

