/**
 * Created by dido on 11.09.16.
 */
$(function () {

    var $mainHeader = $("#main-header"),
        $footer = $(".footer");

    // Change main header background on scroll down and scroll up, function attached to container
    $("#contacts-wrapper-two").scroll(function () {
        var $scrollDistanceFromTop = $(this).scrollTop();

        if ($scrollDistanceFromTop >= 200) {

            // First slide hide
            $("#title").css({
                transform: "scale(1)",
            })

            $mainHeader.css({
                backgroundColor: "rgba(0, 0, 0, 1)",
                // display: "none"
            });
        } else {

            // First slide show
            $("#title").css({
                transform: "scale(1.1)"
            })

            $mainHeader.css({
                backgroundColor: "rgba(0, 0, 0, 0.7)",
                // display: "block"
            });
        }
        //
        // if ($scrollDistanceFromTop >= 1000) {
        //
        //     $("#slide1").css({
        //         transform: "scale(1)"
        //     })
        //
        // } else {
        //
        //     $("#slide1").css({
        //         transform: "scale(1.1)"
        //     })
        // }

        // if ($scrollDistanceFromTop >= 2200) {
        //
        //     $("#slide2").css({
        //         transform: "scale(1)"
        //     })
        //
        // } else {
        //
        //     $("#slide2").css({
        //         transform: "scale(1.1)"
        //     })
        // }

        // if ($scrollDistanceFromTop >= 4000) {
        //
        //     $("#slide3").css({
        //         transform: "scale(1)"
        //     })
        //
        // } else {
        //
        //     $("#slide3").css({
        //         transform: "scale(1.1)"
        //     })
        // }

        if ($scrollDistanceFromTop >= 3000) {

            $("#contacts-map").css({
                transform: "scale(1)"
            })

        } else {

            $("#contacts-map").css({
                transform: "scale(1)"
            })
        }



        if ($scrollDistanceFromTop >= 2365) {

            $footer.addClass("footer-on-scroll");
            $("#back-to-top").addClass("footer-on-scroll");

        } else {
            $footer.removeClass("footer-on-scroll");
            $("#back-to-top").removeClass("footer-on-scroll");

        }
    });

    $(window).scroll(function() {
       document.body.style.background
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
            styles: [
                {
                    "stylers": [
                        {
                            "visibility": "on"
                        },
                        {
                            "saturation": -100
                        },
                        {
                            "gamma": 0.54
                        }
                    ]
                },
                {
                    "featureType": "road",
                    "elementType": "labels.icon",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "featureType": "water",
                    "stylers": [
                        {
                            "color": "#4d4946"
                        }
                    ]
                },
                {
                    "featureType": "poi",
                    "elementType": "labels.icon",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "featureType": "poi",
                    "elementType": "labels.text",
                    "stylers": [
                        {
                            "visibility": "simplified"
                        }
                    ]
                },
                {
                    "featureType": "road",
                    "elementType": "geometry.fill",
                    "stylers": [
                        {
                            "color": "#ffffff"
                        }
                    ]
                },
                {
                    "featureType": "road.local",
                    "elementType": "labels.text",
                    "stylers": [
                        {
                            "visibility": "simplified"
                        }
                    ]
                },
                {
                    "featureType": "water",
                    "elementType": "labels.text.fill",
                    "stylers": [
                        {
                            "color": "#ffffff"
                        }
                    ]
                },
                {
                    "featureType": "transit.line",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "gamma": 0.48
                        }
                    ]
                },
                {
                    "featureType": "transit.station",
                    "elementType": "labels.icon",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "featureType": "road",
                    "elementType": "geometry.stroke",
                    "stylers": [
                        {
                            "gamma": 7.18
                        }
                    ]
                }
            ]
        },
        map = new google.maps.Map(document.getElementById("contacts-map"), mapProp),

        mapMarker = new google.maps.Marker({
            position: myCenter,
            map: map
        }),
    contentString = '<div id="iw-container">' +
        '<h1>Find me here</h1>' +
        '</div>>'

    infowindow = new google.maps.InfoWindow({
        content: contentString,
        width: 100
    });


});



