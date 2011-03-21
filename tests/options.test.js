TestCase("options", {
    testDefaultOptions: function() {
        var element = $('<div><div></div></div>').scrolla();
        
        assertFalse(element.scrolla('option', 'content'));
        assertEquals('scrolla', element.scrolla('option', 'class'));
    },

    testClassOption: function() {
        var myClass = 'myClass';
        var element = $('<div><div></div></div>').scrolla({'class': myClass});
        var scroll = element.scrolla('scroll');

        assertTrue(scroll.hasClass(myClass));
    }
});