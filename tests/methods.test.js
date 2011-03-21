TestCase("methods", {
    testScrollMethodReturnsJQueryObjectWithScroll: function() {
        var content = $('<div></div>');
        var element = $('<div></div>').scrolla({content: content});
        var scroll = element.scrolla('scroll');

        assertTrue(scroll.hasClass(element.scrolla('option', 'class')));
    },

    testUpdateMethodReturnsJQueryObject: function() {
        var content = $('<div></div>');
        var element = $('<div></div>').scrolla({content: content});

        assertEquals(element, element.scrolla('update'));
    },

    testUpdateMethodUpdatesScrollPositionIfContentPositionIsChanged: function() {
        var element = $('<div></div>').css('position', 'relative').appendTo(document.body);
        var content = $('<div></div>').css('position', 'absolute').appendTo(element);

        element.height(100);
        content.height(400);
        element.scrolla({content: content});

        var scroll = element.scrolla('scroll');

        assertEquals('0%', scroll.css('top'));

        content.css('top', '-200px');
        element.scrolla('update');

        assertEquals('50%', scroll.css('top'));
    },

    testUpdateMethodUpdatesScrollHeightContentHeightIsChanged: function() {
        var content = $('<div></div>')
            .css('position', 'absolute')
            .css('top', 0);

        var element = $('<div></div>')
            .append(content);

        element.height(100);
        content.height(400);
        element.scrolla({content: content});

        var scroll = element.scrolla('scroll');

        assertEquals('25%', scroll.css('height'));

        content.css('height', '1000px');
        element.scrolla('update');

        assertEquals('10%', scroll.css('height'));
    }
});