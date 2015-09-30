/**
 * Created by Zsolt on 2015.09.30..
 *
 *
 * http://stackoverflow.com/questions/9446921/clues-on-sliding-between-pages-effect     lapozas
 */
var Main;
(function (Main_1) {
    var Main = (function () {
        function Main() {
            console.log('SSSSSS111');
        }
        return Main;
    })();
    Main_1.Main = Main;
})(Main || (Main = {}));
(function (doc, win, navigator) {
    'use strict';
    doc.addEventListener('DOMContentLoaded', function () {
        new Main.Main();
    });
}(document, window, navigator));
