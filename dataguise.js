;(function () {
    var window = this
      , DataGuise
    ;
    DataGuise = window.DataGuise = {
        "compile": compile
    };

    function compile(mask) {
        function narrow() {
        }
        narrow.mask = mask;
        return narrow;
    }
}).call(this);
