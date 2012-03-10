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

test('"scroll-y" method', function() {
    this.element.scrolla();
    
    var scroll = this.element.scrolla('scroll-y');

    ok(scroll.hasClass(this.element.scrolla('option', 'class-y')));
});

test('"scroll-x" method', function() {
    this.element.scrolla();
    
    var scroll = this.element.scrolla('scroll-x');

    ok(scroll.hasClass(this.element.scrolla('option', 'class-x')));
});

test('"update" method #1', function() {
    this.element.height(100).width(100);
    this.content.height(400).width(400);
    this.element.scrolla();
    
    this.element.height(200).width(200);
    this.element.scrolla('update');
    
    var scrollY = this.element.scrolla('scroll-y');
    var scrollX = this.element.scrolla('scroll-x');
    
    equal(scrollY.height(), 100);
    equal(scrollX.width(), 100);
});

test('"update" method #2', function() {
    this.element.height(100).width(100);
    this.content.height(400).width(400);
    this.element.scrolla();
    
    var scrollY = this.element.scrolla('scroll-y');
    var scrollX = this.element.scrolla('scroll-x');
    
    scrollY.trigger('dragstart', {position: {top: 0}})
           .trigger('drag', {position: {top: 50}})
           .trigger('dragstop', {position: {top: 50}});
           
   scrollX.trigger('dragstart', {position: {left: 0}})
          .trigger('drag', {position: {left: 50}})
          .trigger('dragstop', {position: {left: 50}});
    
    this.element.height(200).width(200);
    this.element.scrolla('update');
    
    equal(scrollY.position().top, 100);
    equal(scrollX.position().left, 100);
});

test('"update" method #3', function() {
    this.element.height(100).width(100);
    this.content.height(400).width(400);
    this.element.scrolla();

    var scrollY = this.element.scrolla('scroll-y');
    var scrollX = this.element.scrolla('scroll-x');

    this.content.css('top', '-200px');
    this.content.css('left', '-200px');
    this.element.scrolla('update');

    equal(scrollY.position().top, 50);
    equal(scrollX.position().left, 50);
});