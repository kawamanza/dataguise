;(function (factory){
    if (typeof define === 'function' && define.amd) {
        define([], factory);
    } else if (typeof exports === 'object') {
        module.exports = factory();
    } else {
        this.DataGuise = factory();
    }
}(function () {
    var DataGuise;
    DataGuise = {
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
        "0": new REParser(/[0-9]/, {"default": "0"})
      , "9": new REParser(/[0-9]/, {"optional": true})
      , "#": new REParser(/[0-9]/, {"recursive": true})
    });

    function compile(mask, options) {
        var narrow
          , translators
        ;
        if (typeof mask !== "string") return;
        options = extend({
        }, options);
        translators = extend(new Translators, options.translations);
        narrow = function (value) {
            if (typeof options.onStart === "function") {
                var _value = options.onStart(value);
                if (typeof _value === "string") {
                    value = _value;
                }
            }
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
                    return i < mLen && j < vLen;
                };
            }
            if (options.fit && vLen > 0) {
                check = (function (origCheck) {
                    return function () {
                        if (origCheck()) {
                            return true;
                        }
                        if (i > -1 && i < mLen) {
                            translator = translators[mask.charAt(i)]
                            if (translator) {
                                if (translator["default"]) {
                                    buf[concatMethod](translator["default"]);
                                    i += offset;
                                    return true;
                                }
                            } else if (i > 0 && i < mLen - 1 && translators[mask.charAt(i+offset)]["default"]) {
                                buf[concatMethod](mask.charAt(i))
                                i += offset;
                                return true;
                            }
                        }
                    };
                })(check);
            }   // */
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
                            if (lastMaskChar == resetPos) i -= offset;
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
    return DataGuise;
}));
