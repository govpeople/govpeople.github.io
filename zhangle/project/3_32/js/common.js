$(function(){
    jQuery(".focus").slide({//banner幻灯片
        mainCell:".bd ul",
        autoPlay:true,
        interTime:5000,
        trigger:"click"
    });
     /*jQuery(".focus").slide({//banner幻灯片
        mainCell:".phone ul",
        autoPlay:true,
        interTime:5000
    });*/
    leftMove({//最新公告跑马灯
        mainCell:'.notice-box .infoList',//需要动画的盒子ID
        interTime:20//滚动的速度
    });
    leftMove({//最新资讯跑马灯
        mainCell:'.info-box .infoList',
        interTime:20
    });

    footerTab();
    srcTop();
    //ellipsis('.list .column .plate .list-item .summary','a');
    addmove();
    navTab();

})
//导航
function navTab(){
    $('.navbar-menu .navbar-nav>li').on('mouseenter',function(){
        $(this).addClass('open').siblings().removeClass('open');
    }).on('mouseleave',function(){
        $(this).removeClass('open');
    })
}
//footer盒子切换
function footerTab(){
    $('.footer .info .link-nav li').on('click',function(){
        var index = $(this).index();
        $(this).addClass('active').siblings().removeClass('active');
        ///*.addClass('active').siblings().removeClass('active');*/
        var objBox = $(this).parents('ul').siblings('.content').find('.link-content').eq(index);
        objBox.addClass('active').siblings().removeClass('active');

    })
    leftMove({
        mainCell:'.footer .info ul.bank',
        interTime:20
    });
    leftMove({
        mainCell:'.footer .info ul.link',
        interTime:20
    });
}
//盒子切换

//左运动动画
function leftMove(options){
    options = options || {};
    var parent_width = 0;//先var一个初始值宽度
    var timer = null;
    var num = 0;
    var bigBox = $(options.mainCell).parent();//对象的父级
    var forObj = $(options.mainCell).children();//对象子级
        forObj.each(function(index, val) {//遍历对象子级
            $(this).parent().append(this.cloneNode(true));//克隆每个子级添加到对象里面

                parent_width += Math.ceil(this.offsetWidth);//获取每个子级的高度相加

        });
    $(options.mainCell).width(parent_width*2+10);//给对象加宽度
    timer = setInterval(move, options.interTime);
    function move(){//动画
        num--;
        if(num<-parent_width){
            num=0;
        }
        $(options.mainCell).css('left',num);
    }
    bigBox.on('mouseenter',function(){
        clearInterval(timer);
    });
    bigBox.on('mouseleave',function(){
        timer = setInterval(move, options.interTime);
    })
}
//左运动动画

//返回顶部
function srcTop(){
    $(window).scroll(function(){
        if($(window).scrollTop()>1){
            $('.toolbar-top').show(300).css('display','block')
        }else{
            $('.toolbar-top').hide(300);
        }
        //$('.toolbar-top').hide();
    })
    $('.toolbar-top').on('click',function(){
        $('html,body').animate({scrollTop:0},300);
    })
}
//返回顶部

//溢出变省略号
function ellipsis(tag_box,tag){
    $(tag_box).each(function(i){
        var divH = $(this).height();
        var $p = $(tag, $(this)).eq(0);
        while ($p.outerHeight() > divH) {
            $p.text($p.text().replace(/(\s)*([a-zA-Z0-9]+|\W)(\.\.\.)?$/, "..."));
        };
    });
}

function addmove(){
    var wow = new WOW(
        {
            boxClass:     'wow',      // animated element css class (default is wow)
            animateClass: 'animated', // animation css class (default is animated)
            offset:       100,          // distance to the element when triggering the animation (default is 0)
            mobile:       true,       // trigger animations on mobile devices (default is true)
            live:         true,       // act on asynchronously loaded content (default is true)
            callback:     function(box) {
                // the callback is fired every time an animation is started
                // the argument that is passed in is the DOM node being animated
            },
            scrollContainer: null // optional scroll container selector, otherwise use window
        }
    );
    wow.init();
}
