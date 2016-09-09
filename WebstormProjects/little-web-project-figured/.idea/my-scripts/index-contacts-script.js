$(function () {
    var $mainHeader = $("#main-header"),
        $footer = $(".footer");


    //Open-close side-navigation

    $("#open").click(function() {
        document.getElementById("mySidenav").style.width = "800px";
    });
    $(".closebtn").click( function () {
        document.getElementById("mySidenav").style.width = "100px";
    });

});





