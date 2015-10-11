/**
 * Created by Zsolt on 2015.09.30..
 *
 *
 */
/// <reference path="../lib/jquery.d.ts"/>
/// <reference path="../lib/bxsilder.d.ts"/>

module Main {
    export class Main {
        private _openSubMenuStatus = 0;
        private _toursContainer : JQuery;
        private _toursSwipeContent: JQuery;
        private _toursSwipeContentWidth: number;
        private _adContainer : JQuery;

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

                return false;
            });

            $( "#language_chooser" ).on('click', ()=> {
                this._openSubMenu(this._langContainer);

                return false;
            });

            this._langContainer.find('a').on('click', ()=> {
                this._openSubMenu(this._toursContainer);

                return false;
            });

            $('.ad_elements').bxSlider({
                //auto: true,
                autoControls: false,
                controls: false,
                pager: false,
                touchEnabled: false,
                pause: 8000,
                minSlides: 1,
                maxSlides: 1
            });

            $('.tour_elements').bxSlider({
                auto: false,
                autoControls: false,
                controls: false,
                pager: false,
                touchEnabled: true,
                infiniteLoop: false,
                minSlides: 2,
                maxSlides: 3,
                speed: 100
            });
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
    }
}

(function(doc, window, navigator) {
    'use strict';

    doc.addEventListener('DOMContentLoaded', function () {

        new Main.Main();
    });

}(document, window, navigator));

