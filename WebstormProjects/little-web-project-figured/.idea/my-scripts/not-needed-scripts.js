/**
 * Created by dido on 08.09.16.
 */
// Change main header background on scroll down and scroll up, function attached to container.
// $("#contacts-wrapper-two").scroll(function () {
//     var $scrollDistanceFromTop = $(this).scrollTop();
//
//     if ($scrollDistanceFromTop >= 200) {
//
//         $mainHeader.css({
//             backgroundColor: "rgba(0, 0, 0, 1)",
//             // display: "none"
//         });
//     } else {
//         $mainHeader.css({
//             backgroundColor: "rgba(0, 0, 0, 0.7)",
//             // display: "block"
//         });
//     }
//
//     if ($scrollDistanceFromTop >= 140) {
//
//         $footer.addClass("footer-on-scroll");
//         $("#back-to-top").addClass("footer-on-scroll");
//
//     } else {
//         $footer.removeClass("footer-on-scroll");
//         $("#back-to-top").removeClass("footer-on-scroll");
//
//     }
// });

// Plaxifying stuff.
// $('#boat').plaxify({"xRange":100,"yRange":20})
// $('#sun').plaxify({"xRange":5,"yRange":35,"invert":true})
// $('#birds').plaxify({"xRange":50,"yRange":70})
// $('#clouds').plaxify({"xRange":50,"yRange":20,"invert":true})
// // $('.title').plaxify({"xRange":30,"yRange":20,"invert":true})
$.plax.enable()


// // Go back to the top.
// if ($("#back-to-top").length) {
//     var scrollTrigger = 100, // px
//         backToTop = function () {
//             var scrollTop = $("#contacts-wrapper-two").scrollTop();
//             if (scrollTop > scrollTrigger) {
//                 $("#back-to-top").addClass("show");
//             } else {
//                 $("#back-to-top").removeClass(" show");
//             }
//         };
//     backToTop();
//     $("#contacts-wrapper-two").on("scroll", function () {
//         backToTop();
//     });
//     $("#back-to-top").on("click", function (e) {
//         e.preventDefault();
//         $("#contacts-wrapper-two").animate({
//             scrollTop: 0
//         }, 700);
//     });
// }

// Iterating over days removed for now.
// Automatic change for weather days day by day.
// function iterateOverWeatherDays(){
//
//     var $dayOne = $("#day-one"),
//         $dayTwo = $("#day-two"),
//         $dayThree = $("#day-three"),
//         $dayFour = $("#day-four"),
//         $dayFive = $("#day-five"),
//         $dayOneWrapper = $("#day-one-wrapper div"),
//         $dayTwoWrapper = $("#day-two-wrapper div"),
//         $dayThreeWrapper = $("#day-three-wrapper div"),
//         $dayFourWrapper = $("#day-four-wrapper div"),
//         $dayFiveWrapper = $("#day-five-wrapper div"),
//         $allWeatherDaysWrapped = $(".weather-days div");
//
//     setTimeout(fadeIn_first,3000);
//
//     function fadeIn_fifth(){
//         $dayFive.siblings().fadeOut("slow");
//         $dayFive.delay(800).fadeIn("slow");
//         setTimeout(fadeIn_first,4000);
//
//     }
//
//     function fadeIn_fourth(){
//         $dayFour.siblings().fadeOut("slow");
//         $dayFour.delay(800).fadeIn("slow");
//         setTimeout(fadeIn_fifth,4000);
//
//     }
//
//     function fadeIn_third(){
//         $dayThree.siblings().fadeOut("slow");
//         $dayThree.delay(800).fadeIn("slow");
//         setTimeout(fadeIn_fourth,4000);
//
//     }
//
//     function fadeIn_second(){
//         $dayTwo.siblings().fadeOut("slow");
//         $dayTwo.delay(800).fadeIn("slow");
//         setTimeout(fadeIn_third,4000);
//
//     }
//
//     function fadeIn_first(){
//         $dayOne.delay(800).fadeIn("slow");
//         $dayOne.siblings().fadeOut("slow");
//         setTimeout(fadeIn_second,4000);
//
//     }
//
//     // // Break function in case any other day is clicked
//     // $cityNamesFromMainNavigation.on("click", function () {
//     //     console.log($(this));
//     //     $(this).data("clicked",true);
//     // })
//     //
//     // if($cityNamesFromMainNavigation.data("clicked")){
//     //     return;
//     // }
// };

// Map function.
var myCenter = new google.maps.LatLng(42.650105, 23.363869),
    mapProp = {
        center: myCenter,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        scrollwheel: false,
    },
    map = new google.maps.Map(document.getElementById("contact-me-map"), mapProp),

    mapMarker = new google.maps.Marker({
        position: myCenter,
        map: map
    }),
    contentString = '<p id="hook">Hello World!</p>';

infowindow = new google.maps.InfoWindow({
    content: contentString,

});

infowindow.open(map, mapMarker);