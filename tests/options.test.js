module('options');

test('default options', function() {
    var element = $('<div><div></div></div>').scrolla();
    
    equal(element.scrolla('option', 'content'), false);
    equal(element.scrolla('option', 'class-x'), 'scrolla-x');
    equal(element.scrolla('option', 'class-y'), 'scrolla-y');
})

test('"class" option', function() {
    var myClassX = 'myClassX'
      , myClassY = 'myClassY';
    
    var element = $('<div><div></div></div>').scrolla({
        'class-y': myClassY
      , 'class-x': myClassX
    });
    
    var scrollY = element.scrolla('scroll-y');
    var scrollX = element.scrolla('scroll-x');

    ok(scrollY.hasClass(myClassY));
    ok(scrollX.hasClass(myClassX));
});