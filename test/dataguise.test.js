var QUNIT = true;
$(function(){
    var context = DataGuise
      , parse
    ;
    module("Public API");

        test("window owns property DataGuise", function () {
            ok(window.hasOwnProperty("DataGuise"));
        });

        test("DataGuise respond to compile", function () {
            equal(typeof context.compile, "function");
        });

        test("DataGuise.compile creates a Parser", function () {
            equal(typeof context.compile("0"), "function");
        });

        test("Parser owns property mask", function () {
            equal(typeof context.compile("0").mask, "string");
        });

        test("DataGuise has defaultTranslators", function () {
            equal(typeof context.defaultTranslators, "object");
        });

    module("Compiled parser");

        test("must format data", function () {
            parse = context.compile("0-0");
            equal(parse(""), "");
            equal(parse("1"), "1");
            equal(parse("12"), "1-2");
            equal(parse("1-"), "1-");
            equal(parse("1-2"), "1-2");
            equal(parse("123"), "1-2");
            equal(parse("1."), "1-");
            equal(parse("1.-"), "1-");
            equal(parse("1.."), "1-");
        });
});
