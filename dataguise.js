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

    function REParser(re, options) {
        extend(this, options);
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
      , "9": new REParser(/[0-9]/, {"optional": true})
      , "#": new REParser(/[0-9]/, {"recursive": true})
    });

    function compile(mask, options) {
        var narrow
          , translators
        ;
        options = extend({
        }, options);
        translators = extend(new Translators, options.translations);
        narrow = function (value) {
            if (typeof value !== "string") return;
            var valueChar
              , maskChar, translator
              , i = 0, mLen = mask.length
              , j = 0, vLen = value.length
              , buf = []
              , resetPos = -1
              , lastMaskChar
              , concatMethod = "push"
              , offset = 1
              , check
            ;
            if (options.reverse) {
                concatMethod = "unshift";
                offset = -1;
                i = mLen - 1;
                lastMaskChar = 0;
                j = vLen - 1;
                check = function () {
                    return i > -1 && j > -1;
                };
            } else {
                lastMaskChar = mLen - 1;
                check = function () {
                    return i < mLen && j < vLen
                };
            }
            while (check()) {
                maskChar = mask.charAt(i);
                valueChar = value.charAt(j);
                translator = translators[maskChar];
                if (translator) {
                    if (translator.accept(valueChar)) {
                        buf[concatMethod](valueChar);
                        if (translator.recursive) {
                            if ( resetPos == -1) {
                                resetPos = i;
                            } else if (i == lastMaskChar) {
                                i = resetPos - offset;
                            }
                        }
                        i += offset;
                    } else if (translator.optional) {
                        i += offset;
                        j -= offset;
                    }
                    j += offset;
                } else {
                    buf[concatMethod](maskChar);
                    if (valueChar == maskChar) {
                        j += offset;
                    }
                    i += offset;
                }
            }
            return buf.join("");
        }
        narrow.mask = mask;
        return narrow;
    }
}).call(this);
