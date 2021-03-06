/// <reference path="component/AudioPlyrComponent.ts"/>

module Stories {
    export class Stories {
        private _players = [];

        constructor() {

            $.each($('.box'), (key, value)=> {
                this._players.push( new component.AudioPlyrComponent(
                    {
                        box : value,
                        id: key,
                        self: this
                    }
                ));
            });
        }

        /**
         * Stop audio
         * @param id   number   audio number
         */
        public stop(id) {
            for(var i=0; i<this._players.length; i++) {
                if(id != i) {
                    this._players[i].stop();
                }
            }
        }
    }
}

(function(doc, win, navigator) {
    'use strict';

    doc.addEventListener('DOMContentLoaded', function () {

        new Stories.Stories();
    });
}(document, window, navigator));
