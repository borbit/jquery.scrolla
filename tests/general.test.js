module('Initialization', {
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

test('returns jQuery object', function() {
    ok(this.element.jquery);
});

test('dom structure', function() {
    this.element.scrolla();
    
    var scrollClass = this.element.scrolla('option', 'class');
    
    equal(this.element.children('.' + scrollClass).length, 1);
});

test('scroll has correct height #1', function() {
    this.element.height(100);
    this.content.height(200);
    this.element.scrolla();

    var scroll = this.element.scrolla('scroll').get(0);

    equal(scroll.style.height, '50%');
});

test('scroll has correct height #2', function() {
    this.element.height(100);
    this.content.height(400);
    this.element.scrolla();

    var scroll = this.element.scrolla('scroll').get(0);

    equal(scroll.style.height, '25%');
});

test('scroll has correct position #1', function() {
    this.content.css({height: '400px', top: '-200px'});
    this.element.css({height: '100px'});
    this.element.scrolla();

    var scroll = this.element.scrolla('scroll').get(0);

    equal(scroll.style.top, '50%');
});

test('scroll has correct position #2', function() {
    this.content.css({height: '400px', top: '-100px'});
    this.element.css({height: '100px'});
    this.element.scrolla();

    var scroll = this.element.scrolla('scroll').get(0);

    equal(scroll.style.top, '25%');
});


test('scroll has correct position #3', function() {
    this.content.css({height: '400px', top: '-300px'});
    this.element.css({height: '100px'});
    this.element.scrolla();

    var scroll = this.element.scrolla('scroll').get(0);

    equal(scroll.style.top, '75%');
});

test('scroll has correct position #4', function() {
    var binder = $('<div/>').css({position: 'absolute', height: '300px'})
      , element = $('<div/>').css({position: 'relative', height: '100px'})
      , content = $('<div/>').css({position: 'absolute', height: '200px'});

    binder.append(content).appendTo(element);

    element.appendTo(document.body);
    element.scrolla({content: content});

    var scroll = element.scrolla('scroll').get(0);

    equal(scroll.style.top, '0%');
});


test('scroll is hidden if content has the same size as viewport', function() {
    this.element.height(100);
    this.content.height(100);
    this.element.scrolla();

    var scroll = this.element.scrolla('scroll');

    equal(scroll.css('display'), 'none');
});

test('content position is changed after scroll is dragged #1', function() {
    this.element.css({top: '0px', height: '100px'});
    this.content.css({top: '0px', height: '400px'});
    this.element.scrolla();

    var scroll = this.element.scrolla('scroll');

    scroll.trigger('dragstart', {position: {top: 0}});
    scroll.trigger('drag', {position: {top: 50}});
    scroll.trigger('dragstop', {position: {top: 50}});

    equal(this.content.position().top, -200);
});

test('content position is changed after scroll is dragged #2', function() {
    this.element.css({top: '0px', height: '100px'});
    this.content.css({top: '0px', height: '400px'});
    this.element.scrolla();

    var scroll = this.element.scrolla('scroll');

    scroll.trigger('dragstart', {position: {top: 0}});
    scroll.trigger('drag', {position: {top: 75}});
    scroll.trigger('dragstop', {position: {top: 75}});

    equal(this.content.position().top, -300);
});


test('content position is changed after scroll is dragged #3', function() {
    var binder = $('<div/>').css({position: 'absolute', height: '700px', top: '-300px'})
      , element = $('<div/>').css({position: 'relative', height: '100px', margin: '200px'})
      , content = $('<div/>').css({position: 'absolute', height: '400px', top: '300px'});
    
    binder.append(content);
    element.append(binder).appendTo(document.body);
    element.scrolla({content: content});

    var scroll = element.scrolla('scroll');
        
    scroll.trigger('dragstart', {position: {top: 0}});
    scroll.trigger('drag', {position: {top: 75}});
    scroll.trigger('dragstop', {position: {top: 75}});

    equal(content.position().top, 0);
});

test('scroll position is changed after content is dragged #1', function() {
    this.element.height(100);
    this.content.height(400);
    this.content.css({top: '0px'});

    this.element.scrolla();

    this.content.trigger('dragstart', {position: {top: 0}}).css('top', '-200px');
    this.content.trigger('drag', {position: {top: -200}});
    this.content.trigger('dragstop', {position: {top: -200}});

    var scroll = this.element.scrolla('scroll');
    
    equal(scroll.position().top, 50);
});

test('scroll position is changed after content is dragged #2', function() {
    this.element.height(100);
    this.content.height(400);
    this.content.css({top: '0px'});

    this.element.scrolla();

    this.content.trigger('dragstart', {position: {top: 0}}).css('top', '-300px');
    this.content.trigger('drag', {position: {top: -300}});
    this.content.trigger('dragstop', {position: {top: -300}});

    var scroll = this.element.scrolla('scroll');

    equal(scroll.position().top, 75);
});