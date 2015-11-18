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

        test("DataGuise ignore non-string parameter", function () {
            var parser = context.compile("0");
            strictEqual(parser(0), void(0), "Should return undefined for non-string parameters");
        });

        test("DataGuise handle non-string parameter", function () {
            var grantAnyInput = function (value) {
                return (typeof value === "string" ? value : String(value));
            }
            var parser = context.compile("0", {onStart: grantAnyInput});
            strictEqual(parser(0), "0");
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

        test("must format data from left to right with recursive mask while typing", function () {
            parse = context.compile("0#.#");
            equal(parse(""), "");
            equal(parse("1"), "1");
            equal(parse("12"), "12");
            equal(parse("12."), "12.");
            equal(parse("12.3"), "12.3");
            equal(parse("12.34"), "12.34");
            equal(parse("12.345"), "12.34.5");
            equal(parse("12.34.5."), "12.34.5");
            equal(parse("12.34.56"), "12.34.56");
            equal(parse("12.34.567"), "12.34.56.7");
            equal(parse("12.34.56."), "12.34.56.");
            equal(parse("12.34.56"), "12.34.56");
            equal(parse("12.34.5"), "12.34.5");
        });

        test("must format data from left to right with recursive mask", function () {
            parse = context.compile("0#");
            equal(parse(""), "");
            equal(parse("a"), "");
            equal(parse("1"), "1");
            equal(parse("1a"), "1");
            equal(parse("12"), "12");
            equal(parse("1a2"), "12");
            equal(parse("12a"), "12");
            equal(parse("12ab"), "12");
            equal(parse("12ab3"), "123");
            equal(parse("123"), "123");
            equal(parse("1a23"), "123");
            equal(parse("1a2b3"), "123");
            equal(parse("123a"), "123");
            equal(parse("1234"), "1234");
            equal(parse("1a234"), "1234");
            equal(parse("1a2b34"), "1234");
            equal(parse("1a2b3c4"), "1234");
        });

        test("must format data from right to left with recursive mask while typing", function () {
            parse = context.compile("#.##0,00", {"reverse": true});
            equal(parse(""), "");
            equal(parse("1"), "1");
            equal(parse("12"), "12");
            equal(parse("123"), "1,23");
            equal(parse("1,234"), "12,34");
            equal(parse("12,345"), "123,45");
            equal(parse("123,456"), "1.234,56");
            equal(parse("1.234,567"), "12.345,67");
            equal(parse("12.345,678"), "123.456,78");
            equal(parse("123.456,789"), "1.234.567,89");
            equal(parse("1.234.567,890"), "12.345.678,90");
            equal(parse("12.345.678,901"), "123.456.789,01");
            equal(parse("123.456.789,012"), "1.234.567.890,12");
            equal(parse("1.234.567.890,1"), "123.456.789,01");
            equal(parse("123.456.789,0"), "12.345.678,90");
            equal(parse("12.345.678,9"), "1.234.567,89");
            equal(parse("1.234.567,8"), "123.456,78");
        });

        test("must format data from right to left with recursive mask while typing (using defaults to fit)", function () {
            var suppressZeroLeft = function (value) {
                if (value === "0,0") return "";
                return value.replace(/^[^1-9]+(?!$)/, '');
            };
            parse = context.compile("#.##0,00", {"reverse": true, "fit": true, onStart: suppressZeroLeft});
            equal(parse(""), "");
            equal(parse("0"), "0,00");
            equal(parse("1"), "0,01");
            equal(parse("0,012"), "0,12");
            equal(parse("0,123"), "1,23");
            equal(parse("1,234"), "12,34");
            equal(parse("12,345"), "123,45");
            equal(parse("123,456"), "1.234,56");
            equal(parse("1.234,567"), "12.345,67");
            equal(parse("12.345,678"), "123.456,78");
            equal(parse("123.456,789"), "1.234.567,89");
            equal(parse("1.234.567,8"), "123.456,78");
            equal(parse("123.456,7"), "12.345,67");
            equal(parse("12.345,6"), "1.234,56");
            equal(parse("1.234,5"), "123,45");
            equal(parse("123,4"), "12,34");
            equal(parse("12,3"), "1,23");
            equal(parse("1,2"), "0,12");
            equal(parse("0,1"), "0,01");
            equal(parse("0,0"), "");
        });

        test("must format data from right to left with recursive mask", function () {
            parse = context.compile("#0", {"reverse": true});
            equal(parse(""), "");
            equal(parse("a"), "");
            equal(parse("1"), "1");
            equal(parse("1a"), "1");
            equal(parse("12"), "12");
            equal(parse("1a2"), "12");
            equal(parse("1a2b"), "12");
            equal(parse("1a2b3"), "123");
        });
});
