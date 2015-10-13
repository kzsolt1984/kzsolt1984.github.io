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
            threshold: 0,
            excludedElements: "button, input, select, textarea, .noSwipe"
        };
        private _swipeWidht = 0;
        private _startValue = 0;
        private _id;
        private _mainC;

        constructor(options) {
            this._$box = $(options.box);
            this._id = options.id;
            this._mainC = options.self;

            this._swipeWidht = this._$box.find('.audio-player').width();

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
        }

        /**
         * Create audio player
         * @param $aId   JQuery   audio tag
         * @private
         */
        private _createPlayer($aId: JQuery): void {
            this._mediaElement = $aId.get(0);

            this._mediaElement.addEventListener('play', (e)=> {

                this._$box.addClass('active');

            }, false);

            this._mediaElement.addEventListener('pause', (e)=> {

                this._$box.removeClass('active');

            }, false);

            this._mediaElement.addEventListener("timeupdate", (e)=> {
                var percent = this._mediaElement.currentTime / this._mediaElement.duration,
                    percentValue;

                if(percent > 1) {
                    percent = 1;
                }
0
                percentValue = (100 * percent) + ((this._$box.find('.mejs-time-handle').width() / 2) / this._swipeWidht * (-100));
$('#test').text(percentValue + ' : ' + percent)
                this._$box.find('.mejs-time-handle').css('left', percentValue + '%');
            });

            this._$box.find('.mejs-time-handle').css('left', ((this._$box.find('.mejs-time-handle').width() / 2) / this._swipeWidht * (-100)) + '%');

            this._swipeWidht = this._$box.find('.mejs-time-slider').width();
            this._$box.find('.mejs-time-slider').swipe(this._swipeOptions);}

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

            this._mediaElement.pause();
        }

        private _play(): void {
            if(!this._mediaElement) {
                return;
            }

            this._mediaElement.play();
            this._mainC.stop(this._id);
        }

        private _swipeStatus(event,op,direction,distance) {
            if(!this._swipeWidht || !this._mediaElement) {return;}

            var percent = distance / this._swipeWidht,
                percentValue;

            if(percent > 1) {
                percent = 1;
            }

            percentValue = this._mediaElement.duration * percent;

            if(op === 'start') {
                this._startValue = this._mediaElement.currentTime;
            }

            if($(event.target).hasClass('mejs-time-handle')) {
                if(!distance) {return;}

                if(op === 'move' && direction === 'left') {
                    var n:number = this._startValue - percentValue;

                    this._mediaElement.currentTime = (n > 0) ? n : 0;
                }
                else if(op === 'move') {
                    //right
                    var n:number = this._startValue + percentValue;
                    //console.log('right', n)
                    this._mediaElement.currentTime = (n > this._mediaElement.duration) ? this._mediaElement.currentTime : n;
                }
            }

            if(op === 'end') {
                this._mediaElement.currentTime = this._mediaElement.currentTime;
            }
        }

        public stop(): void {
            this._stop();
        }
    }
}
