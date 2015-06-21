var $ = require('jquery');
var _ = require('lodash');

AboutManager = function () {

    // attributes
    this.currentPage = null;
    this.currentAbout = null;
    this.aboutInfos = null;

    // elements
    this.$document = $(document);
    this.$bullets = null;
    this.$aboutCircle = null;
    this.$aboutCircleInfos = null;
    this.$contentCircleInfos = null;
    this.$arrowPrevious = null;
    this.$arrowNext = null;
    this.$arcCircle = null;

    // initialize
    this.init();
};

AboutManager.prototype = {

    init: function () {

        // load json experience
        var self = this;
        $.getJSON("../assets/data/about.json", function(data) {
            self.aboutInfos = data;
        });

        // events
        this.$document.on('PAGE_UPDATED', { _this: this }, function (event) {
            event.data._this.run();
        });

        this.run();
    },

    moveToRight: function () {
        this.updateClassAbout('remove');
        if (this.currentAbout == 1) {
            this.currentAbout = 3;
        }
        else {
            this.currentAbout--;
        }
        this.updateClassAbout('add');
        this.updateAboutData();
        this.updateAboutBullets();
    },

    moveToLeft: function () {
        this.updateClassAbout('remove');
        if (this.currentAbout == 3) {
            this.currentAbout = 1;
        }
        else {
            this.currentAbout++;
        }
        this.updateClassAbout('add');
        this.updateAboutData();
        this.updateAboutBullets();
    },

    updateDataByArc: function (arc) {
        this.updateClassAbout('remove');
        if (arc.hasClass('arc1')) {
            this.currentAbout = 1;
        } else if (arc.hasClass('arc2')) {
            this.currentAbout = 2;
        } else {
            this.currentAbout = 3;
        }
        this.updateClassAbout('add');
        this.updateAboutData();
        this.updateAboutBullets();
    },

    updateClassAbout: function (type) {
        if (type === 'add') {
            $('.arc' + this.currentAbout ,this.$aboutCircle).addClass('active');
        }

        if (type === 'remove') {
            $('.arc' + this.currentAbout ,this.$aboutCircle).removeClass('active');
        }
    },

    updateAboutBullets: function () {
        $('li', this.$bullets).removeClass('active');
        if (this.currentAbout == 1) {
            $('li:eq(2)', this.$bullets).addClass('active');
        } else if (this.currentAbout == 3) {
            $('li:eq(0)', this.$bullets).addClass('active');
        } else {
            $('li:eq(' + (this.currentAbout - 1) + ')', this.$bullets).addClass('active');
        }
    },

    updateAboutData: function () {
        var data =  _.first(this.getObjects(this.aboutInfos, 'id', this.currentAbout));
        this.$contentCircleInfos = $('.content', this.$aboutCircleInfos);
        this.$contentCircleInfos.addClass('hide');
        this.$contentCircleInfos.on('animationend', { _this: this },function (event) {
            $('.logo', event.data._this.$aboutCircleInfos).attr('src', data.logo_desktop);
            $('h3', event.data._this.$aboutCircleInfos).html(data.title);
            $('h4', event.data._this.$aboutCircleInfos).html(data.data.intro);
            event.data._this.$contentCircleInfos.removeClass('hide');
            event.data._this.$contentCircleInfos.off();
        });

        if (app.Config.socket.mobileConnected) {
            this.$document.trigger('ABOUT_UPDATED', [data]);
        }
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

    run: function () {

        if (app.instance.currentPage.className) {
            this.currentPage = app.instance.currentPage.className;
        }

        if (this.$arrowPrevious) {
            this.$arrowPrevious.off();
        }
        if (this.$arrowNext) {
            this.$arrowNext.off();
        }
        if (this.$arcCircle) {
            this.$arcCircle.off();
        }

        if (/^about/.test(this.currentPage)) {
            this.currentAbout = 3;
            this.$arrowPrevious = $('.arrow.prev');
            this.$arrowNext = $('.arrow.next');
            this.$arcCircle = $('.arc');
            this.$bullets = $('.current-selector ul');
            this.$aboutCircleInfos = $('.infos');

            this.updateAboutData();
            this.updateAboutBullets();

            this.$arrowPrevious.on('click', { _this : this }, function (event) {
                event.data._this.moveToLeft();
            });
            this.$arrowNext.on('click', { _this : this }, function (event) {
                event.data._this.moveToRight();
            });
            this.$arcCircle.on('click', { _this : this }, function (event) {
                event.data._this.updateDataByArc($(this));
            });
        }
    }
};

module.exports = AboutManager;
