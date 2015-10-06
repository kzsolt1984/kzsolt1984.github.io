/**
 * Created by Zsolt on 2015.10.01..
 */
/// <reference path="../../lib/jquery.d.ts"/>

module component {
    export class TeaserVideoPlayer {
        private _videoId: string;
        private _youtubeId: string;

        constructor(opt) {
            this._videoId = opt.videoId;
            this._youtubeId = opt.youtubeId;

            this._createVideo();
        }

        private _siteRedirect() {
            window.location.href = 'start.html?pocketguide_video='+ this._videoId +'_en&youtube=1';
        }

        private _createVideo() {
            if( (navigator.userAgent.match(/Android/i)) || (navigator.userAgent.match(/android/i)) ) {
                $('#play_box')
                    .on('click', ()=> {
                        window.location.href = "http://www.youtube.com/watch?v="+ this._youtubeId +"&feature=youtu.be";
                    });
            }
            else if( (navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPad/i)) || (navigator.userAgent.match(/iPod/i)) ) {
                if (window.location.href.indexOf('youtube=1') !== -1 ) {
                    $('#play_box')
                        .on('click', ()=> {
                            window.history.go(-1);
                        });

                    $('#iphone_video').html('<iframe id="frame1" scrolling="no" src="http://www.youtube.com/embed/'+ this._youtubeId +'?controls=0&showinfo=0&rel=0&autoplay=1" frameborder="0" allowfullscreen></iframe>');
                }
                else {
                    $('#play_box')
                        //.html('<span>&nbsp;</span>')
                            .on('click', ()=> {
                            this._siteRedirect();
                        });
                }
            }
        }
    }
}