module('options');

test('default options', function() {
    var element = $('<div><div></div></div>').scrolla();
    
    equal(element.scrolla('option', 'content'), false);
    equal(element.scrolla('option', 'class'), 'scrolla');
})

test('"class" option', function() {
    var myClass = 'myClass';
    var element = $('<div><div></div></div>').scrolla({'class': myClass});
    var scroll = element.scrolla('scroll');

    ok(scroll.hasClass(myClass));
});