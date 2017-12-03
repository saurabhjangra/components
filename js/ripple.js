function rippleEffect() {
    var ele = document.getElementsByClassName('ripple'),
        span = document.createElement('span');;
    for (var i = 0; i < ele.length; i++) {
        ele[i].addEventListener('click', function (e) {
            span.classList.add('ripple_effect');
            var offset = this.getBoundingClientRect();
            var x = e.pageX - offset.left;
            var y = e.pageY - offset.top;
            span.style.top = y + 'px';
            span.style.left = x + 'px';
            this.appendChild(span);
            this.classList.add('rip_active');
            span.addEventListener("webkitAnimationEnd", () => removeClass(this), false);
            span.addEventListener("animationend", () => removeClass(this), false);
        });
    }
    function removeClass(e) {
        e.classList.remove('rip_active');
    }
}
rippleEffect()