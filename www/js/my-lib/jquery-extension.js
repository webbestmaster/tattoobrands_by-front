($ => {
    Object.assign($.fn, {
        serializeToJSON: function serializeToJSON() {
            return this.serializeArray().reduce((accum, {name, value}) => Object.assign(accum, {[name]: value}), {});
        }
    });
})(window.jQuery);
