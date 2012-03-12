module('General', {
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
    
    var scrollYClass = this.element.scrolla('option', 'class-y');
    var scrollXClass = this.element.scrolla('option', 'class-x');
    
    equal(this.element.children('.' + scrollYClass).length, 1);
    equal(this.element.children('.' + scrollXClass).length, 1);
});

test('scroll-y has correct height #1', function() {
    this.element.height(100);
    this.content.height(200);
    this.element.scrolla();

    var scroll = this.element.scrolla('scroll-y').get(0);

    equal(scroll.style.height, '50%');
});

test('scroll-y has correct height #2', function() {
    this.element.height(100);
    this.content.height(400);
    this.element.scrolla();

    var scroll = this.element.scrolla('scroll-y').get(0);

    equal(scroll.style.height, '25%');
});

test('scroll-x has correct height #1', function() {
    this.element.width(100);
    this.content.width(200);
    this.element.scrolla();

    var scroll = this.element.scrolla('scroll-x').get(0);

    equal(scroll.style.width, '50%');
});

test('scroll-x has correct height #2', function() {
    this.element.width(100);
    this.content.width(400);
    this.element.scrolla();

    var scroll = this.element.scrolla('scroll-x').get(0);

    equal(scroll.style.width, '25%');
});

test('scroll-y has correct position #1', function() {
    this.content.css({height: '400px', top: '-200px'});
    this.element.css({height: '100px'});
    this.element.scrolla();

    var scroll = this.element.scrolla('scroll-y').get(0);

    equal(scroll.style.top, '50%');
});

test('scroll-y has correct position #2', function() {
    this.content.css({height: '400px', top: '-100px'});
    this.element.css({height: '100px'});
    this.element.scrolla();

    var scroll = this.element.scrolla('scroll-y').get(0);

    equal(scroll.style.top, '25%');
});

test('scroll-y has correct position #3', function() {
    this.content.css({height: '400px', top: '-300px'});
    this.element.css({height: '100px'});
    this.element.scrolla();

    var scroll = this.element.scrolla('scroll-y').get(0);

    equal(scroll.style.top, '75%');
});

test('scroll-y has correct position #4', function() {
    var binder = $('<div/>').css({position: 'absolute', height: '300px'})
      , element = $('<div/>').css({position: 'relative', height: '100px'})
      , content = $('<div/>').css({position: 'absolute', height: '200px'});

    binder.append(content).appendTo(element);

    element.appendTo(document.body);
    element.scrolla({content: content});

    var scroll = element.scrolla('scroll-y').get(0);

    equal(scroll.style.top, '0%');
    
    element.remove();
});

test('scroll-x has correct position #1', function() {
    this.content.css({width: '400px', left: '-200px'});
    this.element.css({width: '100px'});
    this.element.scrolla();

    var scroll = this.element.scrolla('scroll-x').get(0);

    equal(scroll.style.left, '50%');
});

test('scroll-x has correct position #2', function() {
    this.content.css({width: '400px', left: '-100px'});
    this.element.css({width: '100px'});
    this.element.scrolla();

    var scroll = this.element.scrolla('scroll-x').get(0);

    equal(scroll.style.left, '25%');
});

test('scroll-x has correct position #3', function() {
    this.content.css({width: '400px', left: '-300px'});
    this.element.css({width: '100px'});
    this.element.scrolla();

    var scroll = this.element.scrolla('scroll-x').get(0);

    equal(scroll.style.left, '75%');
});

test('scroll-x has correct position #4', function() {
    var binder = $('<div/>').css({position: 'absolute', width: '300px'})
      , element = $('<div/>').css({position: 'relative', width: '100px'})
      , content = $('<div/>').css({position: 'absolute', width: '200px'});

    binder.append(content).appendTo(element);

    element.appendTo(document.body);
    element.scrolla({content: content});

    var scroll = element.scrolla('scroll-x').get(0);

    equal(scroll.style.left, '0%');
    
    element.remove();
});

test('scroll-y is hidden if content has the same size as viewport', function() {
    this.element.height(100);
    this.content.height(100);
    this.element.scrolla();

    var scroll = this.element.scrolla('scroll-y');

    equal(scroll.css('display'), 'none');
});

test('scroll-x is hidden if content has the same size as viewport', function() {
    this.element.width(100);
    this.content.width(100);
    this.element.scrolla();

    var scroll = this.element.scrolla('scroll-x');

    equal(scroll.css('display'), 'none');
});

test('content position is changed after scrolls are dragged #1', function() {
    this.element.css({top: '0px', left: '0px', height: '100px', width: '100px'});
    this.content.css({top: '0px', left: '0px', height: '400px', width: '400px'});
    this.element.scrolla();

    var scrollY = this.element.scrolla('scroll-y');
    var scrollX = this.element.scrolla('scroll-x');

    scrollY.trigger('dragstart', {position: {top: 0}});
    scrollY.trigger('drag', {position: {top: 50}});
    scrollY.trigger('dragstop', {position: {top: 50}});
    
    scrollX.trigger('dragstart', {position: {left: 0}});
    scrollX.trigger('drag', {position: {left: 50}});
    scrollX.trigger('dragstop', {position: {left: 50}});

    equal(this.content.position().top, -200);
    equal(this.content.position().left, -200);
});

test('content position is changed after scrolls are dragged #2', function() {
    this.element.css({top: '0px', left: '0px', height: '100px', width: '100px'});
    this.content.css({top: '0px', left: '0px', height: '400px', width: '400px'});
    this.element.scrolla();

    var scrollY = this.element.scrolla('scroll-y');
    var scrollX = this.element.scrolla('scroll-x');

    scrollY.trigger('dragstart', {position: {top: 0}});
    scrollY.trigger('drag', {position: {top: 75}});
    scrollY.trigger('dragstop', {position: {top: 75}});
    
    scrollX.trigger('dragstart', {position: {left: 0}});
    scrollX.trigger('drag', {position: {left: 75}});
    scrollX.trigger('dragstop', {position: {left: 75}});

    equal(this.content.position().top, -300);
    equal(this.content.position().left, -300);
});

test('content position is changed after scrolls are dragged #3', function() {
    var binder = $('<div/>').css({
        position: 'absolute'
      , height: '700px'
      , width: '700px'
      , left: '-300px'
      , top: '-300px'
    });
    var element = $('<div/>').css({
        position: 'relative'
      , margin: '200px'
      , height: '100px'
      , width: '100px'
    });
    var content = $('<div/>').css({
        position: 'absolute'
      , height: '400px'
      , width: '400px'
      , left: '300px'
      , top: '300px'
    });
    
    binder.append(content);
    element.append(binder).appendTo(document.body);
    element.scrolla({content: content});

    var scrollY = element.scrolla('scroll-y');
    var scrollX = element.scrolla('scroll-x');
        
    scrollY.trigger('dragstart', {position: {top: 0}});
    scrollY.trigger('drag', {position: {top: 75}});
    scrollY.trigger('dragstop', {position: {top: 75}});
    
    scrollX.trigger('dragstart', {position: {left: 0}});
    scrollX.trigger('drag', {position: {left: 75}});
    scrollX.trigger('dragstop', {position: {left: 75}});

    equal(content.position().top, 0);
    equal(content.position().left, 0);
    
    element.remove();
});

test('content position is changed after scrolls is dragged #4', function() {
    this.element.css({top: '0px', left: '0px', height: '100px', width: '100px', border: '10px solid #000'});
    this.content.css({top: '0px', left: '0px', height: '400px', width: '400px'});
    this.element.scrolla();

    var scrollY = this.element.scrolla('scroll-y');
    var scrollX = this.element.scrolla('scroll-x');

    scrollY.trigger('dragstart', {position: {top: 0}});
    scrollY.trigger('drag', {position: {top: 75}});
    scrollY.trigger('dragstop', {position: {top: 75}});
    
    scrollX.trigger('dragstart', {position: {left: 0}});
    scrollX.trigger('drag', {position: {left: 75}});
    scrollX.trigger('dragstop', {position: {left: 75}});

    equal(this.content.position().top, -300);
    equal(this.content.position().left, -300);
});

test('scroll-y position is changed after content is dragged #1', function() {
    this.element.height(100);
    this.content.height(400);
    this.content.css({top: '0px'});

    this.element.scrolla();

    this.content.trigger('dragstart', {position: {top: 0}}).css('top', '-200px');
    this.content.trigger('drag', {position: {top: -200}});
    this.content.trigger('dragstop', {position: {top: -200}});

    var scroll = this.element.scrolla('scroll-y');
    
    equal(scroll.position().top, 50);
});

test('scroll-y position is changed after content is dragged #2', function() {
    this.element.height(100);
    this.content.height(400);
    this.content.css({top: '0px'});

    this.element.scrolla();

    this.content.trigger('dragstart', {position: {top: 0}}).css('top', '-300px');
    this.content.trigger('drag', {position: {top: -300}});
    this.content.trigger('dragstop', {position: {top: -300}});

    var scroll = this.element.scrolla('scroll-y');

    equal(scroll.position().top, 75);
});

test('scroll-x position is changed after content is dragged #1', function() {
    this.element.width(100);
    this.content.width(400);
    this.content.css({left: '0px'});

    this.element.scrolla();

    this.content.trigger('dragstart', {position: {left: 0}}).css('left', '-200px');
    this.content.trigger('drag', {position: {left: -200}});
    this.content.trigger('dragstop', {position: {left: -200}});

    var scroll = this.element.scrolla('scroll-x');
    
    equal(scroll.position().left, 50);
});

test('scroll-x position is changed after content is dragged #2', function() {
    this.element.width(100);
    this.content.width(400);
    this.content.css({left: '0px'});

    this.element.scrolla();

    this.content.trigger('dragstart', {position: {left: 0}}).css('left', '-300px');
    this.content.trigger('drag', {position: {left: -300}});
    this.content.trigger('dragstop', {position: {left: -300}});

    var scroll = this.element.scrolla('scroll-x');

    equal(scroll.position().left, 75);
});