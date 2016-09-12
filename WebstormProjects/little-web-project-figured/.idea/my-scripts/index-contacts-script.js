/**
 * Created by dido on 11.09.16.
 */
$(function () {

    var $mainHeader = $("#main-header"),
        $footer = $(".footer");

    // Change main header background on scroll down and scroll up.
    $("#contacts-wrapper-two").scroll(function () {
        var $scrollDistanceFromTop = $(this).scrollTop();

        // 200 is main header cross point.
        if ($scrollDistanceFromTop >= 200) {

            // Scale first slide down.
            $("#title").css({
                transform: "scale(1)",
            })

            $mainHeader.css({
                backgroundColor: "rgba(0, 0, 0, 1)",
            });
        } else {

            // Scale first slide up.
            $("#title").css({
                transform: "scale(1.1)"
            })

            $mainHeader.css({
                backgroundColor: "rgba(0, 0, 0, 0.7)",

            });
        }

        // 2365 is map cross point.
        if ($scrollDistanceFromTop >= 2365) {

            // Footer color change when crosses map.
            $footer.addClass("footer-on-scroll");

            // Back to top color change when crosses map.
            $("#back-to-top").addClass("footer-on-scroll");

        } else {
            $footer.removeClass("footer-on-scroll");
            $("#back-to-top").removeClass("footer-on-scroll");
        }
    });

    // Go back to the top.
    if ($("#back-to-top").length) {

        var scrollTrigger = 100,
            $backToTopLink = $("#back-to-top");

        // Activate back to top on scroll.
        $("#contacts-wrapper-two").on("scroll", function () {
            backToTop();
        });

        $backToTopLink.on("click", function (e) {

            e.preventDefault();
            $("#contacts-wrapper-two").animate({
                scrollTop: 0
            }, 1000);
        });

        function backToTop() {

            // Position from wrapper beginning.
            var scrollTop = $("#contacts-wrapper-two").scrollTop();

            if (scrollTop > scrollTrigger) {
                $backToTopLink.addClass("show");
            } else {
                $backToTopLink.removeClass("show");
            }
        };
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
            '<h2>HELLO WORLD!</h2>' +
            '<div>THIS IS WHERE I AM!</div>' +
            '<div>TO GET IN TOUCH AND MEET!</div>' +
            '<div>USE LINK BELOW ...&#8628;</div>'


    infowindow = new google.maps.InfoWindow({
        content: contentString,
        width: 100
    });

    infowindow.open(map, mapMarker);


});



