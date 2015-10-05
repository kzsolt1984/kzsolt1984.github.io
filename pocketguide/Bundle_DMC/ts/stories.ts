/// <reference path="component/AudioPlyrComponent.ts"/>

module Stories {
    export class Stories {
        constructor() {
            $.each($('.box'), function(key, value) {
                new component.AudioPlyrComponent(
                    {
                        box : value
                    }
                );
            });
        }
    }
}

(function(doc, win, navigator) {
    'use strict';

    doc.addEventListener('DOMContentLoaded', function () {

        new Stories.Stories();
    });
}(document, window, navigator));
