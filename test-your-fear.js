/* Test your fear implementation */

var tyf = {
    
    /** List of available curse words */
    shimpfwoerter: [
        'Du Weichei!',
        'Du Warmd- uscher!',
        'Du Angst- hase!',
        'Du feige Sau!',
        'Du Lulu!',
        'Du Security Freak!',
        'Du Drücke- berger!',
        'Du Wasch- lappen!',
        'Du Becken- rand- schwim- mer!',
        'Du Schisser!',
        'Du fade Nudl!',
        'Du Kakao- trinker!',
        'Du Karusell- bremser!',
        'Du Spielver- derber!',
        'Du Socken- sortierer!'
    ],
    
    /** Select a string at random from an array */
    selectRandomFromArray(arr) {
        var r = Math.floor(Math.random()*arr.length);
        return arr[r];
    },
    
    /** Select a curse word at random */
    selectSchimpfwort() {
        return this.selectRandomFromArray(this.shimpfwoerter);
    },
    
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
            $('#beschimpfung').html(tyf.selectSchimpfwort());
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
