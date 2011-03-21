TestCase("behavior", {
    testReturnsJQueryObject: function() {
        var content = $('<div></div>');
        var element = $('<div></div>').scrolla({content: content});

        assertNotUndefined(element.jquery);
    },

    testDOMStructure: function() {
        var content = $('<div></div>');
        var element = $('<div></div>').scrolla({content: content});
        var scrollClass = '.' + element.scrolla('option', 'class');
        
        assertEquals(1, element.children(scrollClass).length);
    },

    testScrollHasCorrectHeight_1: function() {
        var element = $('<div></div>');
        var content = $('<div></div>');

        element.height(100);
        content.height(200);

        element.scrolla({content: content});

        var scroll = element.scrolla('scroll');

        assertEquals('50%', scroll.css('height'));
    },

    testScrollHasCorrectHeight_2: function() {
        var element = $('<div></div>').css('position', 'relative');
        var content = $('<div></div>').css('position', 'absolute');

        element.height(100);
        content.height(400);

        element.scrolla({content: content});

        var scroll = element.scrolla('scroll');

        assertEquals('25%', scroll.css('height'));
    },

    testScrollHasCorrectPosition_1: function() {
        var element = $('<div></div>').css('position', 'relative').appendTo(document.body);
        var content = $('<div></div>').css('position', 'absolute').appendTo(element);

        element.height(100);
        content.height(400);
        content.css('top', '-200px');

        element.scrolla({content: content});

        var scroll = element.scrolla('scroll');

        assertEquals('50%', scroll.css('top'));
    },

    testScrollHasCorrectPosition_2: function() {
        var element = $('<div></div>').css('position', 'relative').appendTo(document.body);
        var content = $('<div></div>').css('position', 'absolute').appendTo(element);

        element.height(100);
        content.height(400);
        content.css('top', '-100px');

        element.scrolla({content: content});

        var scroll = element.scrolla('scroll');

        assertEquals('25%', scroll.css('top'));
    },

    testScrollHasCorrectPosition_3: function() {
        var element = $('<div></div>').css('position', 'relative').appendTo(document.body);
        var content = $('<div></div>').css('position', 'absolute').appendTo(element);

        element.height(100);
        content.height(400);
        content.css('top', '-300px');

        element.scrolla({content: content});

        var scroll = element.scrolla('scroll');

        assertEquals('75%', scroll.css('top'));
    },

    testScrollHasCorrectPosition_4: function() {
        var element = $('<div></div>').css('position', 'relative');
        var binder = $('<div></div>').css('position', 'absolute');
        var content = $('<div></div>').css('position', 'absolute');

        binder.append(content);
        element.append(binder);

        element.height(100);
        content.height(200);
        binder.height(300);

        element.appendTo(document.body);
        element.scrolla({content: content});

        var scroll = element.scrolla('scroll');

        assertEquals('0%', scroll.css('top'));
    },

    testScrollIsHiddenIfContentHasTheSameSizeAsViewport: function() {
        var element = $('<div></div>').css('position', 'relative').appendTo(document.body);
        var content = $('<div></div>').css('position', 'absolute').appendTo(element);

        element.height(100);
        content.height(100);

        element.scrolla({content: content});

        var scroll = element.scrolla('scroll');

        assertEquals('none', scroll.css('display'));
    },

    testContentPositionIsChangedWhenScrollIsDragged_1: function() {
        var element = $('<div></div>').css('position', 'absolute').appendTo(document.body);
        var content = $('<div></div>').css('position', 'absolute').appendTo(element);

        element.css({'top': '0px'});
        content.css({'top': '0px'});

        element.height(100);
        content.height(400);

        element.scrolla({content: content});

        var scroll = element.scrolla('scroll');

        scroll.trigger('dragstart', {position: {top: 0}});
        scroll.trigger('drag', {position: {top: 50}});
        scroll.trigger('dragstop', {position: {top: 50}});

        assertEquals(-200, content.position().top);
    },

    testContentPositionIsChangedWhenScrollIsDragged_2: function() {
        var element = $('<div></div>').css('position', 'absolute').appendTo(document.body);
        var content = $('<div></div>').css('position', 'absolute').appendTo(element);

        element.css({'top': '0px'});
        content.css({'top': '0px'});

        element.height(100);
        content.height(400);

        element.scrolla({content: content});

        var scroll = element.scrolla('scroll');

        scroll.trigger('dragstart', {position: {top: 0}});
        scroll.trigger('drag', {position: {top: 75}});
        scroll.trigger('dragstop', {position: {top: 75}});

        assertEquals(-300, content.position().top);
    },

    testContentPositionIsChangedWhenScrollIsDragged_3: function() {
        var element = $('<div></div>').css('position', 'relative').appendTo(document.body);
        var binder = $('<div></div>').css('position', 'absolute').appendTo(element);
        var content = $('<div></div>').css('position', 'absolute').appendTo(binder);

        binder.css('top', '-300px');
        content.css('top', '300px');
        element.css('margin', '200px')

        element.height(100);
        binder.height(700);
        content.height(400);

        element.scrolla({content: content});

        var scroll = element.scrolla('scroll');

        scroll.trigger('dragstart', {position: {top: 0}});
        scroll.trigger('drag', {position: {top: 75}});
        scroll.trigger('dragstop', {position: {top: 75}});

        assertEquals(-100, content.position().top);
    },

    testScrollPositionIsChangedWhenContentIsDragged_1: function() {
        var element = $('<div></div>').css('position', 'relative').appendTo(document.body);
        var content = $('<div></div>').css('position', 'absolute').appendTo(element);

        content.css({
            'position': 'absolute',
            'top': '0px'
        });

        element.height(100);
        content.height(400);

        element.scrolla({content: content});


        content.trigger('dragstart', {position: {top: 0}});

        content.css('top', '-200px');

        content.trigger('drag', {position: {top: -200}});
        content.trigger('dragstop', {position: {top: -200}});

        var scroll = element.scrolla('scroll');
        
        assertEquals('50%', scroll.css('top'));
    },

    testScrollPositionIsChangedWhenContentIsDragged_2: function() {
        var element = $('<div></div>').css('position', 'relative').appendTo(document.body);
        var content = $('<div></div>').css('position', 'absolute').appendTo(element);

        content.css({
            'position': 'absolute',
            'top': '0px'
        });

        element.height(100);
        content.height(400);

        element.scrolla({content: content});


        content.trigger('dragstart', {position: {top: 0}});

        content.css('top', '-300px');

        content.trigger('drag', {position: {top: -300}});
        content.trigger('dragstop', {position: {top: -300}});

        var scroll = element.scrolla('scroll');

        assertEquals('75%', scroll.css('top'));
    }
});