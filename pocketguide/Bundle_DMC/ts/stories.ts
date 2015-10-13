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

        public stop(id) {alert(111);
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
