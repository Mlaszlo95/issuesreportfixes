// ==UserScript==
// @name         Hiba bejelentő javítás
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Eltünik az üzzenet a invitech oldalán, ez a script automatikusa vissza rakja mezőbe az eltünt szöveget
// @author       Megyeri László
// @match        http://my-servicedesk.invitech.hu/
// @icon         https://www.google.com/s2/favicons?domain=tampermonkey.net
// @grant        none
// @require      http://code.jquery.com/jquery-3.6.0.min.js
// ==/UserScript==
/* globals jQuery, $, waitForKeyElements */

(function() {
    var inputText = '';
    var textLong = -1;
    var field = '#dijitEditorBody';

    $(field).on('keydown',function(evt){
        var long = $(field).val().length;

        var key = event.keyCode;

        evt = (evt) ? evt : window.event;
        var charCode = evt.keyCode;

        if (charCode > 31 && (charCode < 48 || charCode > 57) && charCode !=45 && ( charCode < 19 || charCode > 46 )) {
           inputText = inputText + event.key;
           textLong++;
        }else if(charCode == 8){
            inputText = inputText.slice(0, -1);
            textLong--;
        }else if(charCode == 13){
            inputText = inputText + "\n";
        }else{
           return;
        }

        if(long < textLong && textLong != 0){
           $(field).val(inputText);
        }

        console.log(textLong);
        console.log(long);

        console.log(inputText);
    });

})();