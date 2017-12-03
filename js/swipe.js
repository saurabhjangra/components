function touchSwipe(ele, callback) {
    var startX,
        moveX,
        startpoint, swipeLimit = 50,
        progressiveX = 0,
        mouseUp = false,
        finishingTouch = 0;
    if (ele === undefined) {
        return false
    }
    ele.addEventListener('touchstart', function (e) {
        startX = e.touches[0].clientX;
        document.getElementById('message').innerHTML = "Touched";
        touchDevice = true;
    }, false);
    ele.addEventListener('touchmove', function (e) {
        progressiveX = startX - e.touches[0].clientX;
        if (progressiveX > 0) {
            this.style.left = parseInt(-Math.abs(progressiveX)) + 'px';
            document.getElementById('message').innerHTML = "Touch Swipe Left";

        } else {
            this.style.left = parseInt(Math.abs(progressiveX)) + 'px';
            document.getElementById('message').innerHTML = "Touch Swipe Right";
        }
    }, false);
    ele.addEventListener('touchend', function (e) {
        var el = this
        finishingTouch = e.changedTouches[0].clientX;
        if (startX < (finishingTouch - swipeLimit)) {
        } else if (startX > (finishingTouch + 50)) { }
        this.style.left = null;
        setTimeout(function () {
            el.style.backgroundColor = null;
        }, 500);
        touchDevice = false;
        document.getElementById('message').innerHTML = "";
        if (typeof callback == 'function') callback('touched');
    }, false);
    ele.addEventListener('mouseup', function (e) {
        var el = this;
        mouseUp = false;
        finishingTouch = e.clientX;
        if (startX < (finishingTouch - swipeLimit)) {
        } else if (startX > (finishingTouch + 50)) { }
        this.style.left = null;
        document.getElementById('message').innerHTML = "";
        setTimeout(function () {
            el.style.backgroundColor = '';
        }, 500);
        if (typeof callback == 'function') callback('mouse');
    }, false);

    ele.addEventListener('mousedown', function (e) {
        startX = e.clientX;
        mouseUp = true;
        this.style.backgroundColor = 'green';
        document.getElementById('message').innerHTML = "Mouse Down";
        if (typeof callback == 'function') callback('mousedown');
    }, false);

    ele.addEventListener('mousemove', function (e) {
        progressiveX = startX - e.clientX;
        if (startX != 0 && mouseUp) {
            if (progressiveX > 0) {
                document.getElementById('message').innerHTML = "Mouse Swipe Left";
                this.style.left = parseInt(-Math.abs(progressiveX)) + 'px';
            } else {
                this.style.left = parseInt(Math.abs(progressiveX)) + 'px';
                document.getElementById('message').innerHTML = "Mouse Swipe Right";
            }
        }
    }, false);
}

touchSwipe(document.getElementsByClassName('swipe')[0], function (data) {
    console.log(data);
})