var $ = require('jquery');
var _ = require('lodash');

MobileManager = function () {

    // attributes
    this.currentPage = null;
    this.socket = null;
    this.questionTimer = null;
    this.questionData = null;

    // elements
    this.$document = null;
    this.$logoHeader = null;
    this.$bgTriangle = null;
    this.$bgMobile = null;
    this.$mobileAbout = null;


    this.$questionPage = null;

    this.$btnStartExperience = null;
    this.$btnDisplayQuestion = null;
    this.$btnRemindChallenge = null;
    this.$btnSendCode = null;
    this.$inputCode = null;
    this.$stepInfos = null;
    this.$stepinfosTitle = null;
    this.$stepinfosText = null;


    this.$questionText = null;
    this.$answersListe = null;
    this.$answersRadio = null;

    this.$timerSection = null;
    this.$timerText = null;
    this.$timerProgressbar = null;

    // initialize
    this.init();
};

MobileManager.prototype = {

    init: function () {
        // initialize elements
        this.$document = $(document);
        this.$logoHeader = $('.gui-mobile-header');
        this.$bgTriangle = $('.bg-triangle');
        this.$bgMobile = $('.bg-mobile');

        // events
        this.$document.on('PAGE_UPDATED', { _this: this }, function( event ) {
            event.data._this.update();
        });
        this.$document.on('NEW_EXP_ID', { _this: this }, function( event ) {
            console.log('NEW EXP ID');
            if (!app.Config.socket.mobileConnected) {
                event.data._this.sendJoinHosting(app.Config.socket.connectionId);
                app.Config.socket.mobileConnected = true;
            }
        });

        // socket
        this.socket = io.connect(app.Config.socket.url);

        // run
        this.update();
    },

    bindSocketControls: function () {
        var self = this;
        this.socket.on('_displayQuestion_', function(data) {
            self.displayQuestionToUser(data);
        });

        this.socket.on('_stepUpdated_', function (data) {
            app.Config.currentStep = data.id;
            self.$document.trigger('STEP_UPDATED');
            self.updateSteps(data);
        });

        this.socket.on('_aboutUpdated_', function (data) {
            self.updateAbout(data);
        });

        this.socket.on('_goToPageExperience_', function () {
            window.location.replace(app.Config.urlMobile + '#/' + app.Config.socket.connectionId);
        });

        this.socket.on('_goToPageAbout_', function (data) {
            window.location.replace(app.Config.urlMobile + '#/about');
        });

        this.socket.on('_goToPageCommunity_', function () {
            window.location.replace(app.Config.urlMobile + '#/community');
        });

        this.socket.on('_goToPageStatistics_', function () {
            if (/^mobile-experience$/.test(self.currentPage)) {
                _.delay(function () {
                    self.$stepInfos.addClass('hide');
                    self.$btnRemindChallenge.removeClass('hide');
                    self.$btnRemindChallenge.on('click', { _self: self }, function(event) {
                        event.data._self.$btnRemindChallenge.off();
                        event.data._self.$btnRemindChallenge.addClass('hide');
                        event.data._self.socket.emit('userStartChallenge');
                    });
                }, 5000);
            }
        });
    },

    sendJoinHosting: function (id) {
        var self = this;
        this.socket.emit('joinHosting', {connectionId: id});

        this.socket.on('newBridge', function() {
            self.bindSocketControls();
            self.socket.off('newBridge');
        });
    },

    displayQuestionToUser: function (data) {
        var i, self = this;

        this.$stepInfos.addClass('hide');
        this.$btnDisplayQuestion.removeClass('hide');

        this.$questionText.html(data.text);
        this.$answersListe.empty();
        for (i = 0; i < data.answers.length; i++) {
            this.$answersListe.append('<input type="radio" id="answer' + i +'" name="answer" value="' + data.answers[i].scenario + '" />');
            this.$answersListe.append('<label for="answer' + i + '"><span></span> ' + data.answers[i].text + '</label>');
        }

        if (this.$answersRadio) {
            this.$answersRadio.off();
        }
        this.$answersRadio = $('input:radio[name="answer"]');
        this.$answersRadio.on('change', function () {
            if (this.checked && this.value) {
                self.questionTimer = function () {};
                _.delay(function (response) {
                    self.$btnDisplayQuestion.addClass('hide');
                    self.$stepInfos.removeClass('hide');
                    self.$questionPage.toggleClass('show');
                    self.$timerProgressbar.css('width', '0vw');
                    self.$timerText.html('00 : 00');
                    self.socket.emit('sendUserAnswer', response);
                }, 1000, this.value);
            }
        });
        this.questionData = data;
    },

    startQuestionTimer: function () {
        var self = this,
            currentScenario;

        if (this.questionData.delay == -2) {
            self.$timerText.html('Chrono désactivé pour la présentation');
        } else if (this.questionData.delay != -1) {
            var questionTimeLeft = this.questionData.delay;
            this.questionTimer = function () {
                _.delay(function() {
                    if (questionTimeLeft < 10) {
                        self.$timerText.html('00 : 0' + questionTimeLeft);
                        self.$timerProgressbar.css('width', (100 * questionTimeLeft) / self.questionData.delay + 'vw');
                    } else {
                        self.$timerText.html('00 : ' + questionTimeLeft);
                        self.$timerProgressbar.css('width', (100 * questionTimeLeft) / self.questionData.delay + 'vw');
                    }

                    if (questionTimeLeft > 0) {
                        questionTimeLeft--;
                        self.questionTimer();
                    } else {
                        self.$btnDisplayQuestion.addClass('hide');
                        self.$stepInfos.removeClass('hide');
                        self.$questionPage.toggleClass('show');
                        self.$timerProgressbar.css('width', '0vw');
                        self.$timerText.html('00 : 00');
                        currentScenario = _.first(self.getObjects(self.questionData, 'order', self.questionData.default_answer));
                        self.socket.emit('sendUserAnswer', currentScenario.scenario);
                    }

                }, 1000);
            };
            this.questionTimer();
        }
    },

    updateSteps: function (step) {
        this.$stepinfosTitle.html(' - Stade <span class="number">' + step.id + '</span> -');
        this.$stepinfosTitle.removeClass().addClass('s' + step.id);
        this.$stepinfosText.html(step.text);
    },

    updateAbout: function (about) {
        _.delay(function () {
            $('.logo', this.$mobileAbout).attr('src', about.logo_mobile);
            $('h1', this.$mobileAbout).html('<span class="top">- Association -</span> ' + about.title);
            $('.link', this.$mobileAbout).attr('href', about.url).html(about.url);
            $('.content p', this.$mobileAbout).html(about.data.text1 + '<br /><br />' + about.data.text2);
        },1000);
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

        if (this.$btnDisplayQuestion) {
            this.$btnDisplayQuestion.off();
        }

        if (/^mobile-about$/.test(this.currentPage)) {
            this.$logoHeader.addClass('hide');
            this.$bgTriangle.removeClass('hide');
            this.$bgMobile.removeClass('experience community hide').addClass('about');
            this.$mobileAbout = ('.mobile-about');
        } else if (/^mobile-community$/.test(this.currentPage)) {
            this.$logoHeader.addClass('hide');
            this.$bgTriangle.removeClass('hide');
            this.$bgMobile.removeClass('about experience hide').addClass('community');
        } else if (/^mobile-error$/.test(this.currentPage)) {
            this.$logoHeader.addClass('hide');
            this.$bgTriangle.removeClass('hide');
            this.$bgMobile.removeClass('about community experience hide');

            this.$btnSendCode = $('.btnSendCode');
            this.$inputCode = $('.codeExperience');
            this.$btnSendCode.on('click', { _this: this }, function(event) {
                event.data._this.$btnSendCode.off();
                window.location.replace(app.Config.urlMobile + '#/' + event.data._this.$inputCode.val().toUpperCase());
            });
        } else if (/^mobile-experience$/.test(this.currentPage)) {
            this.$logoHeader.removeClass('hide');
            this.$bgTriangle.addClass('hide');
            this.$bgMobile.removeClass('about community hide').addClass('experience');

            this.$questionPage = $('.alzheimer-questions');
            this.$questionText = $('.question h3', this.$questionPage);
            this.$answersListe = $('.answers', this.$questionPage);

            this.$timerSection = $('.timer');
            this.$timerText = $('.time', this.$timerSection);
            this.$timerProgressbar = $('.progress-bar', this.$timerSection);
            this.$stepInfos = $('.step-infos');
            this.$stepinfosTitle = $('h3', this.$stepInfos);
            this.$stepinfosText = $('p', this.$stepInfos);


            this.$btnRemindChallenge = $('.btn-challenge');
            this.$btnRemindChallenge.on('click', { _this: this }, function(event) {
                event.data._this.$btnRemindChallenge.off();
                window.location.replace(app.Config.urlMobile + '#/community');
            });

            this.$btnDisplayQuestion = $('.notification-question');
            this.$btnDisplayQuestion.on('click', { _this: this }, function(event) {
                event.data._this.$questionPage.toggleClass('show');
                event.data._this.startQuestionTimer();
            });
        } else if (/^mobile-tutorial$/.test(this.currentPage)) {
            this.$logoHeader.addClass('hide');
            this.$bgTriangle.addClass('hide');
            this.$bgMobile.removeClass('about community experience').removeClass('hide');

            this.$btnStartExperience = $('.btnStartExperience');
            this.$btnStartExperience.on('click', { _this: this }, function(event) {
                event.data._this.$btnStartExperience.off();
                event.data._this.socket.emit('userStartExperience');
                window.location.replace(app.Config.urlMobile + '#/experience');
            });
        }
    }
};

module.exports = MobileManager;
