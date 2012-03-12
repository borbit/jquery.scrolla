/*    
    jQuery.Scrolla 0.1.0
    
    Simple and lightweight plugin to make scrollbars 
    for a draggable content. For more info visit:
    https://github.com/borbit/jquery.scrolla/
    
    Copyright (c) 2011-2012 Serge Borbit <serge.borbit@gmail.com>
    
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
    var viewWidth, viewHeight, viewOffset, scrollYStep,
        contWidth, contHeight, contOffset, scrollXStep;
    
    var scrollX = $('<div/>').addClass(options['class-x']).appendTo(viewport);
    var scrollY = $('<div/>').addClass(options['class-y']).appendTo(viewport);
    
    scrollX.draggable({containment: 'parent', axis: 'x'});
    scrollY.draggable({containment: 'parent', axis: 'y'});
    
    content.bind('drag', function() {
        contOffset = content.offset();
        updateScrollsPosition();
    });
    
    scrollY.bind('drag', function(event, ui) {
        content.offset({top: viewOffset.top - (ui.position.top*scrollYStep)});
    });
    
    scrollX.bind('drag', function(event, ui) {
        content.offset({left: viewOffset.left - (ui.position.left*scrollXStep)});
    });

    function init() {
        viewOffset = viewport.offset();
        viewOffset.left += parseInt(viewport.css('border-left-width'), 10);
        viewOffset.top += parseInt(viewport.css('border-top-width'), 10);
        
        viewHeight = viewport.height();
        viewWidth = viewport.width();
        
        contOffset = content.offset();
        contHeight = content.height();
        contWidth = content.width();
        
        scrollYStep = (contHeight/100) / (viewHeight/100);
        scrollXStep = (contWidth/100) / (viewWidth/100);
        
        updateScrollsVisibility();
        updateScrollsPosition();
        updateScrollsSize();
    }
    
    function updateScrollsVisibility() {
        if (contHeight > viewHeight) {
            scrollY.show();
        } else {
            scrollY.hide();
        }
        if (contWidth > viewWidth) {
            scrollX.show();
        } else {
            scrollX.hide();
        }
    }
    
    function updateScrollsPosition() {
        scrollY.css('top', Math.abs((contOffset.top - viewOffset.top) / scrollYStep));
        scrollX.css('left', Math.abs((contOffset.left - viewOffset.left) / scrollXStep));
    }
    
    function updateScrollsSize() {
        scrollY.css('height', viewHeight / scrollYStep);
        scrollX.css('width', viewWidth / scrollXStep);
    }
    
    return {
        update: init
      , scrollX: scrollX
      , scrollY: scrollY
    };
}

})(jQuery);