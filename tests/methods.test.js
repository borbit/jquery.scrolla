module('methods', {
    setup: function() {
        this.element = $('<div/>').css({position: 'relative'});
        this.content = $('<div/>').css({position: 'absolute'});

        this.element.append(this.content);
        this.element.appendTo(document.body);
    },
    
    teardown: function() {
        this.element.remove();
    }
});

test('"scroll" method', function() {
    this.element.scrolla();
    
    var scroll = this.element.scrolla('scroll');

    ok(scroll.hasClass(this.element.scrolla('option', 'class')));
});

test('"update" method #1', function() {
    this.element.height(100);
    this.content.height(400);
    this.element.scrolla();
    
    this.element.height(200);
    this.element.scrolla('update');
    
    var scroll = this.element.scrolla('scroll');
    
    equal(scroll.height(), 100);
});

test('"update" method #2', function() {
    this.element.height(100);
    this.content.height(400);
    this.element.scrolla();
    
    var scroll = this.element.scrolla('scroll');
    
    scroll.trigger('dragstart', {position: {top: 0}});
    scroll.trigger('drag', {position: {top: 50}});
    scroll.trigger('dragstop', {position: {top: 50}});
    
    this.element.height(200);
    this.element.scrolla('update');
    
    equal(scroll.position().top, 100);
});

test('"update" method #3', function() {
    this.element.height(100);
    this.content.height(400);
    this.element.scrolla();

    var scroll = this.element.scrolla('scroll');

    this.content.css('top', '-200px');
    this.element.scrolla('update');

    equal(50, scroll.position().top);
});