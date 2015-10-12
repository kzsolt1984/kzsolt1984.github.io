/**
 * Created by Zsolt on 2015.10.02..
 */
    /// <reference path="../../lib/mediaelement.d.ts"/>
    /// <reference path="../../lib/touchSwipe.d.ts"/>
module component {
    export class AudioPlyrComponent {
        private _$box : JQuery;
        private _mediaElement;

        constructor(options) {
            this._$box = $(options.box);

            this._createPlayer(this._$box.find('.myPlayer'));

            this._$box.find('.video-left').on('click', ()=>{
                this.setCurrentTime(false);
            });
            this._$box.find('.video-right').on('click', ()=>{
                this.setCurrentTime(true);
            });

            $(window).on('hashchange', ()=> {
                this.stopPlay();
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

                    console.log(domObject)


                }
            });

            this._$box.find('.audio_player_cover').on('click', (e)=> {
                alert('klikk')
            });

            this._$box.find('.audio_player_cover').on('touchstart', (e)=> {
                alert('touch')


            });

            this._$box.find('.audio_player_cover').swipe()

        }

        /**
         * Set current time
         * @param increase   boolean   increase current time?
         */
        private setCurrentTime(increase: boolean): void {
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

        private stopPlay(): void {
            if(!this._mediaElement) {
                return;
            }

            this._mediaElement.stop();
        }
    }
}
