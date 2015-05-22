var Backbone = require('backbone');
var $        = require('jquery');
var _        = require('lodash');

Backbone.$ = $;

module.exports = Backbone.View.extend({

    render: function(options) {

        options = options || {};

        if (options.page === true) {
            this.$el.addClass('page');
        }

        return this;
    },

    transitionIn: function (callback) {

        var view = this;

        var transitionIn = function () {
            view.$el.addClass('is-visible');
            view.$el.one('transitionend', function () {
                if (_.isFunction(callback)) {
                    callback();
                }
            });
        };

        _.delay(transitionIn, 20);
    },

    transitionOut: function (callback) {

        var view = this;

        view.$el.removeClass('is-visible');
        view.$el.one('transitionend', function () {
            if (_.isFunction(callback)) {
                callback();
            }
        });
    }
});
