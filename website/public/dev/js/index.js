/**
 * [scrollFixed 滚动超出浮动]
 * @Author   bangyao.chen
 * @DateTime 2018-10-06T23:15:59+0800
 * @param    {[string]}                 ele [需要监听的元素]
 */
function scrollFixed(ele) {
    //控制报名组件是否浮动在顶端
    var $ele = $(ele),
        body = document.body,
        flag = true,
        height = $ele.height(),
        eleTop = $ele.offset().top;

    $(window).on('scroll', throttle(function() {
        var scrollTop = body.scrollTop || document.documentElement.scrollTop;
        if (scrollTop > eleTop + height + 5) {
            if (flag) {
                $ele.css({
                    "top": -(height + 40) + "px"
                });
                $ele.addClass('fixed');
                $ele.animate({
                    "top": 0
                });
                flag = false;
            }
        } else {
            flag = true;
            $ele.removeClass('fixed').css({
                "top": 45 + "px"
            });
        }
    }, 100, 1000 / 60));
}

/**
 * throttle 截流函数
 * @Author   bangyao.chen
 * @DateTime 2018-10-06T23:15:59+0800
 * @param    {Function}               fn           回调函数
 * @param    {Number}                 delay        延迟毫秒数
 * @param    {Number}                 mustRunDelay 延迟多少毫秒，强制执行一下
 * @return   {Function}                            回调函数
 */
function throttle(fn, delay, mustRunDelay) {
    var timer = null;
    var t_start;
    return function() {
        var context = this,
            args = arguments,
            t_curr = +new Date();
        clearTimeout(timer);
        if (!t_start) {
            t_start = t_curr;
        }
        if (t_curr - t_start >= mustRunDelay) {
            fn.apply(context, args);
            t_start = t_curr;
        } else {
            timer = setTimeout(function() {
                fn.apply(context, args);
            }, delay);
        }
    };
}

$(function() {
    // 滚动超出浮动
    scrollFixed('.nav');
    // 菜单点击事件
    $('.nav').on('click', '.item', function(e) {
        var id = $(this).attr('href');
        $(this).addClass('active').siblings().removeClass('active');
        $('html,body').animate({
            scrollTop: $(id).offset().top - 70
        }, 500);
        e.preventDefault();
        e.stopPropagation();
    })
})
