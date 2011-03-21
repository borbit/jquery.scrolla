(function($) {

$.widget('ui.scrolla', {
    options: {
        content: false,
        'class': 'scrolla'
    },
    _create: function() {
        this.scrolla = createScrolla(this.element, this.options);
        this.scrolla.update()
    },
    scroll: function() {
        return this.scrolla.element;
    },
    update: function() {
        this.scrolla.update();
    }
});

function createScrolla(viewport, options) {
    var content = options.content;

    if (content == false) {
        content = viewport.children().eq(0);
    }
    
    var scroll = $('<div></div>')
        .css('position', 'absolute')
        .addClass(options['class'])
        .appendTo(viewport);
    
    scroll.draggable({containment: 'parent', axis: 'y'});
    scroll.bind('dragstart', updateVars);
    content.bind('drag', updateScroll);
    
    scroll.bind('drag', function(event, ui) {
        content.css('top', -Math.floor(ui.position.top / viewStep) * contStep);
    });

    var viewHeight = 0,
        contHeight = 0,
        viewStep = 0,
        contStep = 0;

    function updateVars() {
        viewHeight = viewport.height();
        contHeight = content.height();
        viewStep = Math.floor(viewHeight / 100);
        contStep = Math.floor(contHeight / 100);
    }

    function updateScroll() {
        updateVars();
        
        if (contHeight > viewHeight) {
            scroll.css('top', Math.abs(content.position().top / contStep) + '%');
            scroll.css('height', Math.floor(viewHeight / contStep) + '%');
            scroll.show();
        } else {
            scroll.hide();
        }
    }

    return {
        element: scroll,
        update: updateScroll
    };
}

})(jQuery);