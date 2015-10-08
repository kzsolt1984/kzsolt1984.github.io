module component {
    export class AudioPlayerComponent {
        // player object
        public player = null;
        // soundtrack object
        public waveImg = null;
        // player is ready
        public readyPlayer = false;
        // set sound current time
        public setPosition = false;
        public options = null;
        public $el = null;

        constructor(options) {
            this.options = options;
            this.$el = $(this.options.el);
            this.$playerButton = this.options.playerBtn;

            this._bindEvents();
            this._createSoundTrack();
        }

        /**
         * Binding events
         * @private
         */
        private _bindEvents() {
            this.$playerButton.on('click', _.bind(this._playerClickHandler, this));
        }

        /**
         * Handle click on play/pause button
         */
        private _playerClickHandler(e){
            if(!this.player) {
                this._createAudioTag();
            }

            if (this.$playerButton.hasClass('play')) {
                this._play();
            }
            else if (this.$playerButton.hasClass('pause')) {
                this._pause();
            }

            return false;
        }

        /**
         * Create audio tag
         * @private
         */
        private _createAudioTag() {
            var player = '<audio src="'+ this.options.songUrl +'" preload="auto"></audio>',
                self = this;

            this.$el.append(player);

            this.player = this.$el.find('audio').get(0);

            this.player.ontimeupdate = function() {
                if(!self.setPosition) {
                    self._setPositionBox(self.player.duration)
                }

                self._refreshPositionBox(self.player.currentTime);
            };
        }

        /**
         * Create soundtrack tag
         * @private
         */
        private _createSoundTrack() {
            var track = '<div class="wave"><div class="wavePosition"></div><div class="waveContent" style="background-image: url('+ this.options.soundTrackImg +')"></div></div>';

            this.$el.append(track);

            this.waveImg = this.$el.find('.wave');
            this.wavePosition = this.$el.find('.wavePosition');

            this._getWaveClickPosition(this.waveImg);
        }

        /**
         * Create sound position tag and calculate pixel rate
         * @param {number}   duration   duration of the song
         * @private
         */
        private _setPositionBox(duration) {
            this.setPosition = true;

            this.pixelRate = (this.waveImg.width()-1) / duration;
        }

        /**
         * Set position of the sound position element
         * @param {number}   currentTime   current time of the song
         * @private
         */
        private _refreshPositionBox(currentTime) {
            var newPos = this._getPixelFromCurrentTime(currentTime);

            this.wavePosition.css('left', newPos);
        }

        /**
         * Set current time from clicked position
         * @param {JQuery}   $wave   soundtrack element
         * @private
         */
        private _getWaveClickPosition($wave) {
            $wave.on('click', _.bind(function(e){
                var parentOffset = $(e.currentTarget).parent().offset();

                var relX = e.pageX - parentOffset.left,
                //relY = e.pageY - parentOffset.top,
                    currentTime = this._getCurrentTimeFromPixel(relX);

                this.player.currentTime = currentTime;
                this._refreshPositionBox(currentTime);
            }, this));
        }

        /**
         * Get pixel from the current time
         * @param   {number}   currentTime  current time of the song
         * @returns {number}   pixel        value
         * @private
         */
        private _getPixelFromCurrentTime(currentTime) {
            return currentTime * this.pixelRate;
        }

        /**
         * Get time from the position
         * @param    {number}   pixel   position of the click event
         * @returns  {number}   time    value
         * @private
         */
        private _getCurrentTimeFromPixel(pixel) {
            return pixel / this.pixelRate;
        }

        /**
         * Play song
         */
        private _play() {
            if(!this.player) {
                return;
            }

            if(this.readyPlayer) {
                this._playOp();
            }
            else {
                this.player.addEventListener('canplay', _.bind(function() {
                    this._playOp();
                }, this));


                this.player.addEventListener('error', function() {
                    self.readyPlayer = false;
                });
            }
        }

        /**
         * Play song actions
         * @private
         */
        private _playOp() {
            this.readyPlayer = true;

            $(this.el).addClass('onPlaying');
            this.player.play();
            this.$playerButton.attr('class', 'pause');
            this.$playerButton.find('i').removeAttr('class').addClass('fa fa-pause');
        }

        /**
         * Pause song
         */
        private _pause() {
            if(this.player && this.readyPlayer) {
                $(this.el).removeClass('onPlaying');
                this.player.pause();
                this.$playerButton.attr('class', 'play');
                this.$playerButton.find('i').removeAttr('class').addClass('fa fa-play-circle');
            }
        }

        /**
         * Set playing to pause
         */
        public pause() {
            this._pause();
        }
    }
}
