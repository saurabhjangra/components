function getStyle(el, styleProp) {
    if (el.currentStyle)
        var y = el.currentStyle[styleProp];
    else if (window.getComputedStyle)
        var y = document.defaultView.getComputedStyle(el, null).getPropertyValue(styleProp);
    return y;
}

function touchSwipe(ele, callback) {
    var startX,
        moveX,
        startpoint, swipeLimit = 50,
        progressiveX = 0,
        mouseUp = false,
        finishingTouch = 0;
    ele.addEventListener('touchstart', function (e) {
        startX = e.touches[0].clientX;
    }, false);
    ele.addEventListener('touchmove', function (e) {
        progressiveX = startX - e.touches[0].clientX;
        if (progressiveX > 0) {
            this.style.left = parseInt(-Math.abs(progressiveX)) + 'px';
        } else {
            this.style.left = parseInt(Math.abs(progressiveX)) + 'px';
        }
    }, false);
    ele.addEventListener('touchend', function (e) {
        var el = this
        finishingTouch = e.changedTouches[0].clientX;
        if (startX < (finishingTouch - swipeLimit)) {
        } else if (startX > (finishingTouch + 50)) { }
        if (typeof callback == 'function') callback('touched');
    }, false);
    ele.addEventListener('mouseup', function (e) {
        var el = this
        mouseUp = false;
        finishingTouch = e.clientX;
        if (startX < (finishingTouch - swipeLimit)) {
        } else if (startX > (finishingTouch + 50)) { }
        if (typeof callback == 'function') callback('mouse');
    }, false);
    ele.addEventListener('mousedown', function (e) {
        startX = e.clientX;
        mouseUp = true;
        if (typeof callback == 'function') callback('mousedown');
    }, false);
    ele.addEventListener('mousemove', function (e) {
        progressiveX = startX - e.clientX;
        if (startX != 0 && mouseUp) {
            if (progressiveX > 0) {
                this.style.left = parseInt(-Math.abs(progressiveX)) + 'px'
            } else {
                this.style.left = parseInt(Math.abs(progressiveX)) + 'px'
            }
        }
    }, false);
}

var defaultProps = {
    className: '',
    accessibility: true,
    adaptiveHeight: false,
    arrows: true,
    autoplay: false,
    autoplaySpeed: 3000,
    centerMode: false,
    centerPadding: '50px',
    cssEase: 'ease',
    customPaging: function (i) {
        return <button>{i + 1}</button>;
    },
    dots: false,
    dotsClass: 'slick-dots',
    draggable: true,
    easing: 'linear',
    edgeFriction: 0.35,
    fade: false,
    focusOnSelect: false,
    infinite: true,
    initialSlide: 0,
    lazyLoad: false,
    pauseOnHover: true,
    responsive: null,
    rtl: false,
    slide: 'div',
    slidesToShow: 1,
    slidesToScroll: 1,
    speed: 500,
    swipe: true,
    swipeToSlide: false,
    touchMove: true,
    touchThreshold: 5,
    useCSS: true,
    variableWidth: false,
    vertical: false,
    waitForAnimate: true,
    afterChange: null,
    beforeChange: null,
    edgeEvent: null,
    init: null,
    swipeEvent: null,
    // nextArrow, prevArrow are react componets
    nextArrow: null,
    prevArrow: null
};

(function () {
    window.onresize = function () {
        var item = document.getElementsByClassName('slide-item'),
            sliderTrack = document.querySelectorAll('.slick-track'),
            slickSlider = document.querySelector('.slick-slider');
        for (var i = 0; i < sliderTrack.length; i++) {
            var child = sliderTrack[i].childElementCount;
            for (var j = 0; j < sliderTrack[i].children.length; j++) {
                sliderTrack[i].children[j].style.width = Math.ceil(parseInt(getStyle(slickSlider, 'width'))) + 'px';
                sliderTrack[i].children[j].style.transform = `translate3d(${Math.ceil(parseInt(getStyle(slickSlider, 'width'))) * j}px, 0px, 0px)`
                sliderTrack[i].children[j].style.backgroundColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
            }
            sliderTrack[i].style.width = (sliderTrack[i].children[0].offsetWidth * child + (child * 10)) + 'px';
            touchSwipe(sliderTrack[i])
        }
    }
    onresize()
})();


