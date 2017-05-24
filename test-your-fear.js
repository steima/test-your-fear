"use strict";
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
    
    /** Aufgaben die der Nutzer bewältigen darf */
    aufgaben: [
        {
            taskKey: 'aliens',
            befehl: 'Nimm Kontakt mit Aliens auf!',
            details: 'Halte deinen Screen gerade vor dir und bewege ihn mehrmals ehrfurchtsvoll Richtung Himmel.',
            successTitle: 'Yippie!',
            successSubTitle: 'Du hast keine Angst!',
            successTeaser: 'Berühre den Bildschirm und schau\' dir die Antwort der Aliens an.',
            style: 'turkisgelb'
        },
        {
            taskKey: 'scream',
            befehl: 'Schrei so laut du kannst!',
            details: 'Halte deinen Screen gerade vor dir und schrei\' so laut du kannst ins Mikrofon.',
            successTitle: 'Wow!',
            successSubTitle: 'Du kannst schreien!',
            successTeaser: 'Berühre den Bildschirm und schau\' dir an wie wir schreien.',
            style: 'blaugelb'
        },
        {
            taskKey: 'spin',
            befehl: 'Dreh dich bis du abhebst!',
            details: 'Halte deinen Screen gerade vor dir und dreh\' dich so lange bis du abhebst.',
            successTitle: 'Super!',
            successSubTitle: 'Du bist abgehoben!',
            successTeaser: 'Berühre den Bildschirm und schau\' dir an, wann wir abheben.',
            style: 'orangepink'
        },
        {
            taskKey: 'scare',
            befehl: 'Erschrecke deinen Nächsten!',
            details: 'Geh zu der dir nächsten Person, halte deinen Screen vor dein Gesicht, zieh\' ihn plötzlich weg und mach\' eine Grimasse.',
            successTitle: 'Juhu!',
            successSubTitle: 'Du hast jemanden erschreckt!',
            successTeaser: 'Berühre den Bildschirm und schau\' dir an wie wir uns schrecken.',
            style: 'blaupink'
        },
        {
            taskKey: 'wave',
            befehl: 'Winke einer fremden Person zu!',
            details: 'Halte deinen Screen im Querformat und winke damit einer fremden Person zu.',
            successTitle: 'Wow!',
            successSubTitle: 'Du bist mutig!',
            successTeaser: 'Berühre den Bildschirm und schau\' dir an wann wir Mut brauchen.',
            style: 'pinkorange'
        }
    ],
    
    errorOutcome: {
        outcome: 'Oje!',
        sub: 'Du hast dich falsch oder zu wenig bewegt!',
        inst: 'Berühre den Bildschirm um es noch einmal zu versuchen!'
    },
    
    /** Select a string at random from an array */
    selectRandomFromArray: function (arr) {
        var r = Math.floor(Math.random() * arr.length);
        return arr[r];
    },
    
    /** Select a curse word at random */
    selectSchimpfwort: function () {
        return this.selectRandomFromArray(this.shimpfwoerter);
    },
    
    /** This variable holds the currently selected task */
    selectedTask: null,
    
    /** Select tasks at random */
    selectTask: function() {
        // return this.selectRandomFromArray(this.aufgaben);
        return this.aufgaben[0];
    },
    
    taskTimeout: null,
    
    /** Select a task and setup the ui */
    setupTask: function(task) {
        this.selectedTask = task;
        $('#anweisung').removeClass('turkisgelb');
        $('#anweisung').removeClass('blaugelb');
        $('#anweisung').removeClass('orangepink');
        $('#anweisung').removeClass('blaupink');
        $('#anweisung').removeClass('pinkorange');
        $('#anweisung').addClass(this.selectedTask.style);
        $('#befehl').html(this.selectedTask.befehl);
        $('#instruktion').html(this.selectedTask.details);
        
        this.taskTimeout = setTimeout(function() {
            tyf.taskFailed();
        }, 1000);
        
        this.showSlide('anweisung');
        this.executeTask();
    },
    
    /** Select a random task and init the UI with it */
    setupRandomTask: function() {
        var t = tyf.selectTask();
        tyf.setupTask(t);
    },
    
    /** Depending on the task key a certain helper function is called */
    executeTask: function() {
        console.log('executing task ' + this.selectedTask.taskKey);
    },
    
    lastTaskFailed: false,
    
    /** Switch to the outcome slide and mark it as error */
    taskFailed: function() {
        this.lastTaskFailed = true;
        $('#outcome').html(this.errorOutcome.outcome);
        $('#outcomesub').html(this.errorOutcome.sub);
        $('#outcomeinst').html(this.errorOutcome.inst);
        
        $('#ergebnis').removeClass('turkisgelb');
        $('#ergebnis').removeClass('blaugelb');
        $('#ergebnis').removeClass('orangepink');
        $('#ergebnis').removeClass('blaupink');
        $('#ergebnis').removeClass('pinkorange');
        $('#ergebnis').addClass('errorOutcome');
        
        this.showSlide('ergebnis');
    },
    
    /** Task was executed correctly */
    taskSuccess: function() {
        this.lastTaskFailed = false;
        if(this.taskTimeout) {
            clearTimeout(this.taskTimeout);
        }
        
        $('#ergebnis').removeClass('turkisgelb');
        $('#ergebnis').removeClass('blaugelb');
        $('#ergebnis').removeClass('orangepink');
        $('#ergebnis').removeClass('blaupink');
        $('#ergebnis').removeClass('pinkorange');
        $('#ergebnis').removeClass('errorOutcome');
        $('#ergebnis').addClass(this.selectedTask.style);
        
        $('#outcome').html(this.selectedTask.successTitle);
        $('#outcomesub').html(this.selectedTask.successSubTitle);
        $('#outcomeinst').html(this.selectedTask.successTeaser);
        this.showSlide('ergebnis');
    },
    
    /** Start tracking of device orientation events */
    trackDeviceOrientation: function() {
        if(window.DeviceOrientationEvent) {
            window.addEventListener('deviceorientation', function(evt) { tyf.handleDeviceOrientation(evt); }, false);
        }else{
            $('#accelStatus').html('Der Bewegunggsensor in deinem Gerät funktioniert leider nicht!');
            $('#accelStatus').show();
        }
    },
    
    /** Handle device orientation event */
    handleDeviceOrientation: function(evt) {
        $('#orientG').html(evt.gamma);
        $('#orientB').html(evt.beta);
        $('#orientA').html(evt.alpha);
    },
    
    /** If we are on the ergebnis then we need to decide how to handle the click */
    handleErgebnisClick: function() {
        if(this.lastTaskFailed) {
            this.setupRandomTask();
        }else{
            
        }
    },
    
    /** Show a slide and hide all others */
    showSlide: function (slideId) {
        if (!slideId.startsWith('#')) {
            slideId = '#' + slideId;
        }
        $('.slide').addClass('hidden');
        $(slideId).removeClass('hidden');
    },
    
    /** Setup the callback handlers for all buttons and slides */
    setupHandlers: function () {
        $('#ichhabeangst').click(function() {
            $('#beschimpfung').html(tyf.selectSchimpfwort());
            tyf.showSlide('schimpfwort');
            setTimeout(function() {
                tyf.showSlide('startscreen');
            }, 3000);
        });
        $('#ichhabekeineangst').click(function () {
            tyf.setupRandomTask();
        });
        $('#ergebnis').click(function () {
            tyf.handleErgebnisClick();
        });
    },
	
    /** Performs setup of the app and switches to the startscreen afterwards */
	init: function () {
        this.setupHandlers();
        this.trackDeviceOrientation();
        this.showSlide('startscreen');
	}

};

$(document).ready(function() {
	tyf.init();
});
