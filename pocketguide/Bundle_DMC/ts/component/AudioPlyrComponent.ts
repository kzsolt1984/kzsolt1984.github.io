/**
 * Created by Zsolt on 2015.10.02..
 */
    /// <reference path="../../lib/mediaelement.d.ts"/>
    /// <reference path="../../lib/touchSwipe.d.ts"/>
module component {
    export class AudioPlyrComponent {
        private _$box : JQuery;
        private _mediaElement;
        private _swipeOptions = {
            triggerOnTouchEnd: true,
            swipeStatus: (a,b,c,d)=> {this._swipeStatus(a,b,c,d)},
            allowPageScroll: "vertical",
            threshold: 75,
            excludedElements: "button, input, select, textarea, .noSwipe"
        };

        constructor(options) {
            this._$box = $(options.box);

            this._createPlayer(this._$box.find('.myPlayer'));

            this._$box.find('.video-left').on('click', ()=>{
                this._setCurrentTime(false);
            });
            this._$box.find('.video-right').on('click', ()=>{
                this._setCurrentTime(true);
            });

            this._$box.find('.play_btn_content').on('click', (e)=>{
                var $e = $(e.currentTarget);

                if($e.find('.play_btn').css('display') !== 'none') {
                    this._play();
                }
                else {
                    this._stop()
                }
            });

            $(window).on('hashchange', ()=> {
                this._stop();
            });

            $(()=> {
                this._$box.find('.audio_player_cover').swipe(this._swipeOptions)
            });


        }

        /**
         * Create audio player
         * @param $aId   JQuery   audio tag
         * @private
         */
        private _createPlayer($aId: JQuery): void {
            $aId.mediaelementplayer({
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
                }
            });

            /*this._$box.find('.audio_player_cover').on('click', (e)=> {
                alert('klikk')
            });

            this._$box.find('.audio_player_cover').on('touchstart', (e)=> {
                alert('touch')


            });*/

            //this._$box.find('.audio_player_cover').swipe(this._swipeOptions)


        }

        /**
         * Set current time
         * @param increase   boolean   increase current time?
         */
        private _setCurrentTime(increase: boolean): void {
            if(!this._mediaElement) {
                return;
            }

            if(increase) {
                this._mediaElement.currentTime += 15;
            }
            else {
                this._mediaElement.currentTime -= 15;
            }
        }

        private _stop(): void {
            if(!this._mediaElement) {
                return;
            }

            this._mediaElement.stop();
        }

        private _play(): void {
            if(!this._mediaElement) {
                return;
            }

            this._mediaElement.play();
        }

        private _swipeStatus(a,b,c,d) {
            $('#test').text("You swiped " + d );
            //console.log(a,b,c,d)
        }
    }
}
