$(function () {
    var $mainHeader = $("#main-header"),
        $footer = $(".footer");

    // Plaxifying stuff.
    $('#boat').plaxify({"xRange":100,"yRange":100})
    $('#sun').plaxify({"xRange":15,"yRange":35,"invert":true})
    $('#birds').plaxify({"xRange":150,"yRange":100, "invert":true})
    // $('#bg-bottom-initial').plaxify({"xRange":50,"yRange":10,"invert":true})
    $('#clouds').plaxify({"xRange":50,"yRange":10,})
    // $('.title').plaxify({"xRange":30,"yRange":20,"invert":true})
    $.plax.enable()

});





