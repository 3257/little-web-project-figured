$(function () {

    var $mainHeader = $('#main-header'),
        $footer = $(".footer");

    // Change main header background on scroll down and scroll up
    $(window).scroll(function () {
        var $scrollDistanceFromTop = $(this).scrollTop();

        console.log($scrollDistanceFromTop);

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

        if ($scrollDistanceFromTop >= 3065) {

            $footer.addClass("footer-on-scroll");
        } else {
            $footer.removeClass("footer-on-scroll");
        }
    });

    var myCenter = new google.maps.LatLng(42.7, 23.32),
        mapProp = {
            center: myCenter,
            zoom: 12,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            scrollwheel: false,
        },
        map = new google.maps.Map(document.getElementById("contacts-map"), mapProp),

        mapMarker = new google.maps.Marker({
            position: myCenter,
            map: map
        });

});





