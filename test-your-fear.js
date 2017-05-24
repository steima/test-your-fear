/* Test your fear implementation */

var tyf = {
    
    /** Show a slide and hide all others */
    showSlide(slideId) {
        if(!slideId.startsWith('#')) {
            slideId = '#' + slideId;
        }
        $('.slide').addClass('hidden');
        $(slideId).removeClass('hidden');
    },
    
    /** Setup the callback handlers for all buttons and slides */
    setupHandlers() {
        $('#ichhabeangst').click(function() {
            tyf.showSlide('schimpfwort');
            setTimeout(function() {
                tyf.showSlide('startscreen');
            }, 3000);
        });
    },
	
	init: function() {
        this.setupHandlers();
        this.showSlide('startscreen');
	}

};

$(document).ready(function() {
	tyf.init();
});
