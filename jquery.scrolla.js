/*    
    jQuery.Scrolla 0.1.0
    
    Simple and lightweight plugin to make scrollbars 
    for a draggable content. For more info visit:
    https://github.com/borbit/jquery.scrolla/
    
    Copyright (c) 2012 Serge Borbit <serge.borbit@gmail.com>
    
    Licensed under the MIT license
*/
(function($) {

$.widget('ui.scrolla', {
    options: {
        content: false
      , 'class-y': 'scrolla-y'
      , 'class-x': 'scrolla-x'
    },
    _create: function() {
        this.scrolla = createScrolla(this.element, this.options);
        this.scrolla.update()
    },
    'scroll-x': function() {
        return this.scrolla.scrollX;
    },
    'scroll-y': function() {
        return this.scrolla.scrollY;
    },
    update: function() {
        this.scrolla.update();
    }
});

function createScrolla(viewport, options) {
    var content = options.content || viewport.children().eq(0);
    var viewWidth, viewHeight, viewOffset, viewStepY, viewStepX,
        contWidth, contHeight, contOffset, contStepY, contStepX;
    
    var scrollX = $('<div/>').addClass(options['class-x']).appendTo(viewport);
    var scrollY = $('<div/>').addClass(options['class-y']).appendTo(viewport);
    
    scrollX.draggable({containment: 'parent', axis: 'x'});
    scrollY.draggable({containment: 'parent', axis: 'y'});
    
    content.bind('drag', function() {
        contOffset = content.offset();
        updateScrolls();
    });
    
    scrollY.bind('drag', function(event, ui) {
        content.offset({top: Math.floor(viewOffset.top - ui.position.top / viewStepY * contStepY)});
    });
    
    scrollX.bind('drag', function(event, ui) {
        content.offset({left: Math.floor(viewOffset.left - ui.position.left / viewStepX * contStepX)});
    });

    function init() {
        viewOffset = viewport.offset();
        viewHeight = viewport.height();
        viewWidth = viewport.width();
        viewStepY  = viewHeight / 100;
        viewStepX  = viewWidth / 100;
        
        contOffset = content.offset();
        contHeight = content.height();
        contWidth = content.width();
        contStepY  = contHeight / 100;
        contStepX  = contWidth / 100;
        
        updateScrolls();
    }
    
    function updateScrolls() {
        if (contHeight > viewHeight) {
            scrollY.css({
                top: Math.abs((contOffset.top - viewOffset.top) / contStepY) + '%'
              , height: Math.floor(viewHeight / contStepY) + '%'
            }).show();
        } else {
            scrollY.hide();
        }
        
        if (contWidth > viewWidth) {
            scrollX.css({
                left: Math.abs((contOffset.left - viewOffset.left) / contStepX) + '%'
              , width: Math.floor(viewWidth / contStepX) + '%'
            }).show();
        } else {
            scrollX.hide();
        }
    }
    
    return {
        update: init
      , scrollX: scrollX
      , scrollY: scrollY
    };
}

})(jQuery);