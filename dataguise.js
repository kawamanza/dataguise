;(function () {
    var window = this
      , DataGuise
    ;
    DataGuise = window.DataGuise = {
        "compile": compile
    };

    function extend(target, source) {
        if (! source) return target;
        for (var prop in source) {
            if (source.hasOwnProperty(prop)) target[prop] = source[prop];
        }
        return target;
    }

    function Translators() {
    }
    DataGuise.defaultTranslators = extend(Translators.prototype, {
    });

    function compile(mask) {
        function narrow() {
        }
        narrow.mask = mask;
        return narrow;
    }
}).call(this);
