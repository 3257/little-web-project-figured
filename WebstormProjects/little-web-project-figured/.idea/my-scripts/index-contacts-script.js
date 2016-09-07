$(function () {

    var $mainHeader = $("#main-header"),
        $footer = $(".footer");

    // Change main header background on scroll down and scroll up, function attached to container
    $("#contacts-wrapper-two").scroll(function () {
        var $scrollDistanceFromTop = $(this).scrollTop();

        if ($scrollDistanceFromTop >= 200) {

            $mainHeader.css({
                backgroundColor: "rgba(0, 0, 0, 1)",
                // display: "none"
            });
        } else {
            $mainHeader.css({
                backgroundColor: "rgba(0, 0, 0, 0.7)",
                // display: "block"
            });
        }

        if ($scrollDistanceFromTop >= 3465) {

            $footer.addClass("footer-on-scroll");
            $("#back-to-top").addClass("footer-on-scroll");

        } else {
            $footer.removeClass("footer-on-scroll");
            $("#back-to-top").removeClass("footer-on-scroll");

        }
    });

    // Go back to the top.
    if ($("#back-to-top").length) {
        var scrollTrigger = 100, // px
            backToTop = function () {
                var scrollTop = $("#contacts-wrapper-two").scrollTop();
                if (scrollTop > scrollTrigger) {
                    $("#back-to-top").addClass("show");
                } else {
                    $("#back-to-top").removeClass(" show");
                }
            };
        backToTop();
        $("#contacts-wrapper-two").on("scroll", function () {
            backToTop();
        });
        $("#back-to-top").on("click", function (e) {
            e.preventDefault();
            $("#contacts-wrapper-two").animate({
                scrollTop: 0
            }, 700);
        });
    }

    var myCenter = new google.maps.LatLng(42.650105, 23.363869),
        mapProp = {
            center: myCenter,
            zoom: 15,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            scrollwheel: false,
        },
        map = new google.maps.Map(document.getElementById("contacts-map"), mapProp),

        mapMarker = new google.maps.Marker({
            position: myCenter,
            map: map
        });

});





