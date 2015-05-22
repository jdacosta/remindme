module.exports = app.Extensions.View.extend({

    el: 'main',

    goto: function (view) {

        var previous = this.currentPage || null,
            next = view;

        if (previous) {
            previous.transitionOut(function () {
                previous.remove();
            });
        }

        next.render({ page: true });
        this.$el.prepend( next.$el );
        next.transitionIn();
        this.currentPage = next;
    }
});
