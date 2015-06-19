var $ = require('jquery');
var _ = require('lodash');

DesktopManager = function () {

    // attributes
    this.currentPage = null;
    this.scenariosExperience = null;
    this.questionsExperience = null;
    this.stepsExpererience = null;
    this.socket = null;

    // elements
    this.$document = $(document);
    this.$video = null;
    this.$videoSource = null;
    this.$mobileNotification = null;
    this.$stepinfos = null;
    this.$stepinfosTitle = null;
    this.$stepinfosText = null;

    // events
    this.$document.on('PAGE_UPDATED', { _this: this }, function( event ) {
        event.data._this.update();
    });

    // initialize
    this.init();
};

DesktopManager.prototype = {

    init: function () {

        // initialize elements
        this.$video = $('.bg-video');
        this.$videoSource = $('source', this.$video);

        // load json experience
        var self = this;
        $.getJSON("../assets/data/scenarios.json", function(data) {
            self.scenariosExperience = data;
        });
        $.getJSON("../assets/data/questions.json", function(data) {
            self.questionsExperience = data;
        });
        $.getJSON("../assets/data/alzheimer-steps.json", function(data) {
            self.stepsExpererience = data;
        });

        // socket
        this.socket = io.connect(app.Config.socket.url);
        this.bindSocketEvent();
        this.startHosting();
    },

    bindSocketEvent: function () {
        var self = this;
        this.socket.on('newConnectionID', function (data) {
            app.Config.socket.connectionId = data.connectionId;
        });
        this.socket.on('newBridge', function() {
            self.bindSocketControls();
            window.location = app.Config.urlDesktop + '#/experience/load';
        });
    },

    bindSocketControls: function () {
        var self = this;
        this.socket.on('_userStartExperience_', function () {
            window.location = app.Config.urlDesktop + '#/experience/home';
            self.playExperienceScenario(1);
        });
        this.socket.on('_sendUserAnswer_', function (data) {
            self.playExperienceScenario(data);
        });
    },

    startHosting: function () {
        this.socket.emit('newHosting');
        console.log('Start new hosting');
    },

    playExperienceScenario: function (scenarioId) {
        var self = this,
            secondsChrono = 0,
            scenario = null;

        if (this.$mobileNotification) {
            this.$mobileNotification.removeClass('action');
        }
        scenario = _.first(this.getObjects(this.scenariosExperience, 'id', scenarioId));

        // play video
        if (scenario.loop) {
            this.$video.prop('loop', true);
            _.delay(function () {
                self.sendQuestionToUser(scenario.question);
            }, scenario.delay * 1000);
        } else {
            this.$video.prop('loop', false);
            this.$video.on('ended', function () {
                self.sendQuestionToUser(scenario.question);
                self.$video.off();
            });
        }
        this.$videoSource.attr('src', '../' + scenario.video);
        this.$video.load();

        // alzheimer steps timer
        var alzheimerSteps = function () {
            _.delay(function () {
                secondsChrono++;

                var newStep = _.first(scenario.steps);
                if (secondsChrono >= newStep.time) {
                    app.Config.currentStep = newStep.step;
                    var step = _.first(self.getObjects(self.stepsExpererience, 'id', app.Config.currentStep));
                    self.socket.emit('stepUpdated', step);
                    scenario.steps = _.rest(scenario.steps);
                    self.updateSteps(step);
                }

                if (scenario.steps.length > 0) {
                    alzheimerSteps();
                }
            }, 1000);
        };
        alzheimerSteps();
    },

    sendQuestionToUser: function (questionId) {
        if (questionId == -1) {
            window.location = app.Config.urlDesktop + '#/experience/exit';
            console.log('[EVENT] SORTI EXPERIENCE --> PAGE STATISTIQUES');
        } else {
            this.socket.emit('displayQuestion', _.first(this.getObjects(this.questionsExperience, 'id', questionId)));
            this.$mobileNotification.addClass('action');
            app.Classes.SoundsManager.playsoundById('mobile-notification');
        }
    },

    updateSteps: function (step) {
        this.$stepinfosTitle.html('Stade <span class="number">' + step.id + '</span>');
        this.$stepinfosTitle.removeClass().addClass('s' + step.id);
        this.$stepinfosText.html(step.text);
    },

    getObjects: function(obj, key, val) {
        var objects = [];
        for (var i in obj) {
            if (!obj.hasOwnProperty(i)) continue;
            if (typeof obj[i] == 'object') {
                objects = objects.concat(this.getObjects(obj[i], key, val));
            } else if (i == key && obj[key] == val) {
                objects.push(obj);
            }
        }
        return objects;
    },

    update: function () {
        if (app.instance.currentPage.className) {
            this.currentPage = app.instance.currentPage.className;
        }

        if (/^experience-home$/.test(this.currentPage)) {
            this.$mobileNotification = $('.notification');
            this.$stepinfos = $('.step-infos');
            this.$stepinfosTitle = $('h3', this.$stepinfos);
            this.$stepinfosText = $('p', this.$stepinfos);
        } else if (/^experience-loading$/.test(this.currentPage)) {
            _.delay(function () {
                $('.notification-mobile').addClass('action');
                //app.Classes.SoundsManager.playsoundById('mobile-notification');
            }, 4000);
        }
    }
};

module.exports = DesktopManager;