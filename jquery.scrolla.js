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
    var viewHeight, contHeight,
        viewOffset, contOffset,
        viewStep, contStep, scroll;

    var abs = Math.abs,
        floor = Math.floor,
        content = options.content;

    if (content == false) {
        content = viewport.children().eq(0);
    }

    scroll = $('<div></div>');
    scroll.addClass(options['class']);
    scroll.appendTo(viewport);

    scroll.draggable({containment: 'parent', axis: 'y'});

    content.bind('drag', updateScroll);
    scroll.bind('dragstart', updateVars);
    scroll.bind('drag', function(event, ui) {
        moveConent(ui.position.top);
    });

    function moveConent(scrollTop) {
        content.offset({top: floor(viewOffset - scrollTop / viewStep * contStep)});
    }

    function updateVars() {
        viewHeight = viewport.height();
        viewOffset = viewport.offset().top;
        viewStep = viewHeight / 100;

        contHeight = content.height();
        contOffset = content.offset().top;
        contStep = contHeight / 100;
    }

    function updateScroll() {
        updateVars();

        if (contHeight > viewHeight) {
            scroll.css('top', abs((contOffset - viewOffset) / contStep) + '%');
            scroll.css('height', floor(viewHeight / contStep) + '%');
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