module('options');

test('default options', function() {
    var element = $('<div><div></div></div>').scrolla();
    
    equal(element.scrolla('option', 'content'), false);
    equal(element.scrolla('option', 'class-x'), 'scrolla-x');
    equal(element.scrolla('option', 'class-y'), 'scrolla-y');
    equal(element.scrolla('option', 'tpl'), '<div/>');
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

test('"tpl" option', function() {
    var element = $('<div><div></div></div>').scrolla({tpl: '<i><b></b></i>'});
    
    var scrollY = element.scrolla('scroll-y');
    var scrollX = element.scrolla('scroll-x');

    equal(scrollY.prop('nodeName').toLowerCase(), 'i');
    equal(scrollX.prop('nodeName').toLowerCase(), 'i');
    equal(scrollY.html().toLowerCase(), '<b></b>');
    equal(scrollX.html().toLowerCase(), '<b></b>');
});