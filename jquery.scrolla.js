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

    var scroll = $('<div></div>');
    scroll.addClass(options['class']);
    scroll.appendTo(viewport);

    scroll.draggable({containment: 'parent', axis: 'y'});

    scroll.bind('dragstart', updateVars);
    content.bind('drag', updateScroll);

    scroll.bind('drag', function(event, ui) {
        content.css('top', viewOffset - Math.floor(ui.position.top / viewStep) * contStep);
    });

    var viewHeight, contHeight,
        viewOffset, contOffset,
        viewStep, contStep;

    function updateVars() {
        viewHeight = viewport.height();
        contHeight = content.height();
        viewOffset = viewport.offset().top;
        contOffset = content.offset().top;
        viewStep = Math.floor(viewHeight / 100);
        contStep = Math.floor(contHeight / 100);
    }

    function updateScroll() {
        updateVars();

        if (contHeight > viewHeight) {
            scroll.css('top', Math.abs((contOffset - viewOffset) / contStep) + '%');
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