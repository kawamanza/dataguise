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

        test("must format data from left to right with optional characters while typing", function () {
            parse = context.compile("099.099.099.099");
            equal(parse(""), "");
            equal(parse("4"), "4");
            equal(parse("4."), "4.");
            equal(parse("4.."), "4.");
            equal(parse("4.3"), "4.3");
            equal(parse("4.32"), "4.32");
            equal(parse("4.32."), "4.32.");
            equal(parse("4.32.1"), "4.32.1");
            equal(parse("4.32.12"), "4.32.12");
            equal(parse("4.32.125"), "4.32.125");
            equal(parse("4.32.1256"), "4.32.125.6");
            equal(parse("4.32.125.67"), "4.32.125.67");
            equal(parse("4.32.125.678"), "4.32.125.678");
            equal(parse("4.32.125.6789"), "4.32.125.678");
            equal(parse("4.32.125.678."), "4.32.125.678");
        });

        test("must format data from right to left while typing", function () {
            parse = context.compile("000.000.000/0000-00", {"reverse": true});
            equal(parse(""), "");
            equal(parse("0"), "0");
            equal(parse("00"), "00");
            equal(parse("001"), "0-01");
            equal(parse("0-011"), "00-11");
            equal(parse("00-110"), "001-10");
            equal(parse("001-109"), "0011-09");
            equal(parse("0011-091"), "0/0110-91");
            equal(parse("0/0110-918"), "00/1109-18");
            equal(parse("00/1109-184"), "001/1091-84");
            equal(parse("001/1091-840"), "0.011/0918-40");
            equal(parse("0.011/0918-400"), "00.110/9184-00");
            equal(parse("00.110/9184-000"), "001.109/1840-00");
            equal(parse("001.109/1840-004"), "0.011.091/8400-04");
            equal(parse("0.011.091/8400-043"), "00.110.918/4000-43");
            equal(parse("00.110.918/4000-438"), "001.109.184/0004-38");
            equal(parse("001.109.184/0004-3"), "00.110.918/4000-43");
        });
});
