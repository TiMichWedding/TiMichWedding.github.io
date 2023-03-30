// Script: jquery.progressivebg: progressive background image loader
// Version: .01
// Author: Brett Kellgren
//
// Usage:
//
// 1. Output a low quality version of your background image and place it in the same directory
// 2. Rename both files including a unique suffix (defaults are "_low" and "_high")
// 3. In your css, set the element background-image as the low quality version
//    (note: you must set additonal background-foo properties separately from background-image)
// 4. In your document.onReady, call progressiveBG() on each jQuery element to progressively load
//
// Options:
//
// suffix_low (str) suffix for low quality image filename
// suffix_high (str) suffix for low quality image filename
// delay (int) delay, in ms, to display high quality image AFTER loading is complete
//
// Example:
//
// .html
//     <div id="foo"></div>
//
// .css
//     #foo{
//         background: url(/path/to/image/bg_foo_low.jpg) no-repeat left top;
//     }
//      PLEASE NOTE: FOR IE7/8 SUPPORT DO NOT USE % BASED BACKGROUND POSITIONS WITH THIS PLUGIN
//
// .js
//
//     $(function(){
//         $('#foo').progressiveBG();
//     });
//

//  ADD THE FOLLOWING TO SRC
//
// <![if !IE]>
//     <script>
//     /**
//     * jQuery backgroundPosition for MSIE
//     *
//     * @author: Brandon Lee Kitajchuk
//     * http://blkcreative.com
//     *
//     * @use: keep this comment with the code
//     *
//     */
//     (function ( $ ) {
//         $.cssHooks.backgroundPosition = {
//             get: function ( elem, computed, extra ) {
//                 var $elem   = $( elem ),
//                     posX    = $elem.css( "backgroundPositionX" ),
//                     posY    = $elem.css( "backgroundPositionY" );

//                 return posX + " " + posY;
//             },

//             set: function ( elem, value ) {
//                 var $elem   = $( elem ),
//                     values  = value.split( " " ),
//                     posX    = values[0],
//                     posY    = values[1];

//                 $elem.css({
//                     "backgroundPositionX": posX,
//                     "backgroundPositionY": posY
//                 });
//             }
//         };
//     })( jQuery );
//     </script>
// <![endif]>


(function($){
    $.fn.extend({
        progressiveBG: function(options) {
            var defaults = {
                suffix_low: '-low',
                suffix_high: '-high',
                delay: 0,
                destroy: false
            },
            options =  $.extend(defaults, options);
            return this.each(function() {
                    var $el = $(this),
                    o = options;
                if (o.destroy) {
                    if ($el.hasClass('progressivebg-loaded')) {
                        $el
                            .attr('style', '')
                            .removeClass('progressivebg-loaded')
                            .html($el.children('.progressive-bg').html());
                    }
                } else {
                    // retrieve $(this)'s original bg path
                    // update str with high qual suffix
                    var cssBg = $el.css('background-image'),
                    newCssBg = cssBg.replace(o.suffix_low, o.suffix_high),
                    // remove css string noise
                    path = cssBg.replace('url(', '').replace(')', '').replace(/"/g,'');

                    // create a temp img element positioned off screen
                    var $progBG = $el.children('.progressive-bg');
                    if($progBG.length){
                        $progBG.children().appendTo($el);
                        $progBG.remove();
                    }
                    $temp = $('<div/>');
                    $temp
                        .css({
                            'background-image': newCssBg,
                            'background-repeat': $el.css('background-repeat'),
                            'background-position': $el.css('background-position')
                        })
                        .addClass('progressive-bg')
                    $el.children().appendTo($temp);
                    $el.append($temp);
                    $el.addClass('progressivebg-loaded');
                }
            });
        }
    });
})(jQuery);