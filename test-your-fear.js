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
        return this.selectRandomFromArray(this.aufgaben);
    },
    
    taskTimeout: null,
    taskInterval: null,
    
    /** Stop the background jobs */
    clearJobs: function() {
        if(this.taskTimeout) {
            clearTimeout(this.taskTimeout);
        }
        if(this.taskInterval) {
            clearInterval(this.taskInterval);
        }        
    },
    
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
        }, 15000);
        
        this.showSlide('anweisung');
        this.resetOrientationData();
        this.taskInterval = setInterval(function() {
            tyf.executeTask(); 
        }, 200);
    },
    
    /** Select a random task and init the UI with it */
    setupRandomTask: function() {
        var t = tyf.selectTask();
        tyf.setupTask(t);
    },
    
    /** Depending on the task key a certain helper function is called */
    executeTask: function() {
        switch(this.selectedTask.taskKey) {
            case 'aliens': this.executeAlienTask();
            case 'spin': this.executeSpinTask();
            case 'wave': this.executeWaveTask();
        }
    },
    
    /** Check if the timeseries has a tilting pattern in gamma */
    executeAlienTask: function() {
        var found90DegreeGamma;
        var found0DegreeGamma;
        
        for(var i=0;i<this.orientationData.length;i++) {
            var orientation = this.orientationData[i];
            var gammaAbs = Math.abs(orientation.gamma);
            if(gammaAbs > 70) {
                found90DegreeGamma = orientation.timestamp;
            }
            if(found90DegreeGamma && orientation.timestamp > found90DegreeGamma && orientation.gamma < 20) {
                found0DegreeGamma = orientation.timestamp;
            }
        }
        
        if(found0DegreeGamma && found90DegreeGamma) {
            this.taskSuccess();
        }
    },
    
    /** Check if an array is all true */
    arrayTrue: function(arr) {
        for(var i=0;i<arr.length;i++) {
            if(!arr[i]) {
                return false;
            }
        }
        return true;
    },
    
    /** Check if the timeseries contains a 360° pattern in alpha */
    executeSpinTask: function() {
        var segments = [];
        for(var i=0;i<this.orientationData.length;i++) {
            var orientation = this.orientationData[i];
            var s = Math.floor(orientation.alpha/30);
            segments[s] = true;
        }
        
        if(segments.length == 12 && this.arrayTrue(segments)) {
            this.taskSuccess();
        }
    },
    
    /** Check if the timeseries contains a pattern in beta which is
        from 40 <> -40 or
        from 140 < 180  <> -180 > -140 */
    executeWaveTask: function() {
        var segments = [];
        for(var i=0;i<this.orientationData.length;i++) {
            var orientation = this.orientationData[i];
            var beta = orientation.beta;
            if(beta > 100) {
                beta = 180 - beta;
            }else if(beta < -100) {
                beta = 180 + beta;
            }
            beta = beta + 40;
            if(beta < 80 && beta > 0) {
                var s = Math.floor(beta/10);
                segments[s] = true;
            }
        }
        
        if(segments.length == 8 && this.arrayTrue(segments)) {
            this.taskSuccess();
        }
    },
    
    lastTaskFailed: false,
    
    /** Switch to the outcome slide and mark it as error */
    taskFailed: function() {
        this.lastTaskFailed = true;
        this.clearJobs();
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
        this.clearJobs();
        
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
            window.addEventListener('deviceorientation', tyf.handleDeviceOrientation, false);
        }else{
            $('#accelStatus').html('Der Bewegunggsensor in deinem Gerät funktioniert leider nicht!');
            $('#accelStatus').show();
        }
    },
    
    lastOrientationUpdate: null,
    
    /** Simple ring buffer for orientation data */
    orientationData: [],
    orientationDataInsertPosition: 0,
    
    /** Handle device orientation event */
    handleDeviceOrientation: function(evt) {
        var now = Date.now();
        if(!tyf.lastOrientationUpdate || now - tyf.lastOrientationUpdate > 200) {
            tyf.lastOrientationUpdate = now;
            $('#orientG').html(evt.gamma.toFixed(3));
            $('#orientB').html(evt.beta.toFixed(3));
            $('#orientA').html(evt.alpha.toFixed(3));
            tyf.orientationData[tyf.orientationDataInsertPosition] = {
                timestamp: now,
                gamma: evt.gamma, beta: evt.beta, alpha: evt.alpha
            };
            tyf.orientationDataInsertPosition = (tyf.orientationDataInsertPosition + 1) % 100;
        }   
    },
    
    /** Clear the orientation data array */
    resetOrientationData: function() {
        tyf.orientationDataInsertPosition = 0;
        tyf.orientationData = [];
    },
    
    /** If we are on the ergebnis then we need to decide how to handle the click */
    handleErgebnisClick: function() {
        if(this.lastTaskFailed) {
            this.setupRandomTask();
        }else{
            this.showSlide('startscreen');
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
