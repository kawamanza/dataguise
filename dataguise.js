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

    function REParser(re) {
        extend(this, {
            "accept": function (character) {
                return re.test(character);
            }
        });
    }

    function Translators() {
    }
    DataGuise.defaultTranslators = extend(Translators.prototype, {
        "0": new REParser(/[0-9]/)
    });

    function compile(mask) {
        var narrow
          , translators
        ;
        translators = new Translators();
        narrow = function (value) {
            if (typeof value !== "string") return;
            var maskChars = mask.split("")
              , valueChars = value.split("")
              , valueChar
              , i = 0, mLen = maskChars.length
              , j = 0, vLen = valueChars.length
              , buf = []
              , maskChar, translator
            ;
            while (i < mLen && j < vLen) {
                maskChar = maskChars[i];
                valueChar = valueChars[j];
                translator = translators[maskChar];
                if (translator) {
                    if (translator.accept(valueChar)) {
                        buf.push(valueChar);
                        i += 1;
                    }
                    j += 1;
                } else {
                    buf.push(maskChar);
                    if (valueChar == maskChar) {
                        j += 1;
                    }
                    i += 1;
                }
            }
            return buf.join("");
        }
        narrow.mask = mask;
        return narrow;
    }
}).call(this);
