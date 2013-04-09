var QUNIT = true;
$(function(){
    var context = DataGuise
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
});
