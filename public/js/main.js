var pageController = (function() {

    // Initialize elements
    var 
        $window = $(window),
        $body = $('html, body'),
        $preloader = $('.preloader'),
        $topCarouselItems = $('#home-slider .item'),
        $topArrow = $('#top-arrow'),
        $mainNav = $('.main-nav'),
        $mainNavItems = $('.navbar-collapse li.scroll'),
        $mainNavLinks = $('.navbar-collapse').find('.scroll a'),
        $collapsedNavItems = $('.navbar-collapse ul li a'),
        $collapsedNavToggle = $('.navbar-toggle'),
        $aboutContainer = $('#about'),
        $progressBars = $('div.progress-bar'),
        $address = $('.address'),
        $map = $('#google-map');


    $topCarouselItems.css('height', $window.height() + 2);

    // Scroll event optimization
    var maimNavHrefs = [];
    $mainNavLinks.each(function() {
        maimNavHrefs.push($(this).attr('href'));
    });

    // Bind all window events
    $window.load(function() {

        $preloader.remove();

    }).resize(function() {

        $topCarouselItems.css('height', $window.height());

    }).scroll(function() {

        var winTop = $window.scrollTop();
        var contentTop = [];

        $mainNav[winTop > $window.height() ? 'addClass' : 'removeClass']('navbar-fixed-top');

        for (var i = 0, len = maimNavHrefs.length;  i < len; i++) {
            contentTop.push($(maimNavHrefs[i]).offset().top);
        }

        for (var i = 0, len = contentTop.length;  i < len; i++) {
            if (winTop > contentTop[i] - 200){
                $mainNavItems.removeClass('active').eq(i).addClass('active');          
            }
        }

        contentTop = null;
    });

    // Bind scroll on click events
    $.each([$collapsedNavItems, $topArrow], function (i, el) {
        el.on('click', function() {
            $body.animate({ scrollTop: $(this.hash).offset().top - 5 }, 1000);
            if ($window.width() < 768) { // collapsed
                $collapsedNavToggle.trigger('click');
            }
            return false;
        });
    });

    // Bind progress bars events
    $aboutContainer.bind('inview', function(event, visible, visiblePartX, visiblePartY) {
        if (visible) {
            $.each($progressBars, function() {
                $(this).css('width', $(this).attr('aria-valuetransitiongoal') + '%');
            });
            $(this).unbind('inview');
        }
    });

    return {
        loadGoogleMap: function () {
            var myLatlng = new google.maps.LatLng($map.data('latitude'), $map.data('longitude'));
            var map = new google.maps.Map($map[0], {
                zoom: 6,
                scrollwheel: false,
                center: myLatlng
            });
            var infowindow = new google.maps.InfoWindow({
                content: '<div class="map-content"><ul class="address">' + $address.html() + '</ul></div>'
            });
            var marker = new google.maps.Marker({
                position: myLatlng,
                map: map
            });
            google.maps.event.addListener(marker, 'click', function() {
                infowindow.open(map,marker);
            });
        }
    };
});
