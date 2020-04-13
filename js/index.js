window.addEventListener('load', function () {

    //获取元素
    var arrow_1 = document.querySelector('.arrow-1');
    var arrow_2 = document.querySelector('.arrow-2');
    var main = document.querySelector('.main');
    var mainWidth = main.offsetWidth;
    //鼠标经过轮播图区域，显示隐藏左右按钮
    main.addEventListener('mouseenter', function () {
        arrow_1.style.display = 'block';
        arrow_2.style.display = 'block';
        clearInterval(timer);
        timer = null;//清除定时器变量
    });
    main.addEventListener('mouseleave', function () {
        arrow_1.style.display = 'none';
        arrow_2.style.display = 'none';
        timer = setInterval(function () {
            //手动调用点击事件
            arrow_2.click();
        }, 2000);
    });
    //动态生成小圆圈，有几张轮播的图片就有几个小圆圈
    var ul = document.querySelector('.lbt');
    var ol = document.querySelector('.cir');
    for (var i = 0; i < ul.children.length; i++) {
        //创建li
        var li = document.createElement('li');
        //记录当前小圆圈的索引号  通过自定义属性来做
        li.setAttribute('index', i);
        //把li插入到ol里
        ol.appendChild(li);
        //小圆圈的排他思想，可以直接在生成小圆圈的同时直接绑定点击事件
        li.addEventListener('click', function () {
            //干掉其他人，把所有的li 清除current
            for (var i = 0; i < ol.children.length; i++) {
                ol.children[i].className = '';
            }
            //留下我自己  当前的li设置为current
            this.className = 'current';
            //点击小圆圈  移动图片  当然移动的是ul
            //ul的移动距离就是小圆圈的索引号  乘以 图片的宽度 注意是负值
            //当我们点击了某个li  就拿到当前li的索引号
            var index = this.getAttribute('index');
            //当我们点击某个li 就把这个li的索引号给num
            num = index;
            //当我们点击了某个li 就要把这个li的索引号给circle
            circle = index;
            //console.log(mainWidth);
            //console.log(index);

            animate(ul, -index * mainWidth);
            //console.log(-index * mainWidth)

        })
    }
    //把ol里面的第一个li设置为current
    ol.children[0].className = 'current';
    //克隆第一张轮播图片li ,放到ul最后面
    var first = ul.children[0].cloneNode(true);//true深克隆
    ul.appendChild(first);


    //点击右侧按钮，图片滚动一张
    var num = 0;
    //circle控制小圆圈的播放
    var circle = 0;
    console.log(circle);
    arrow_2.addEventListener('click', function () {
        //无缝滚动实现原理： 把ul第一个复制一份，放到ul最后面，
        //当图片滚动到克隆的最后一张图片时，让ul快速的、不做动画的跳到最左侧：left为0
        if (num == ul.children.length - 1) {
            ul.style.left = 0;
            num = 0;//又重新让num变回0，重新开始从第一张轮播
        }
        num++;
        animate(ul, -num * mainWidth);
        //点击右侧按钮，小圆圈跟随一起变化 可以再声明一个变量控制小圆圈的播放
        circle++;
        //如果circle == 4  说明走到最后我们克隆的这张图片了  我们就复原
        if (circle == ol.children.length) {
            circle = 0;
        }
        //先清除其他小圆圈的current类名
        for (var i = 0; i < ol.children.length; i++) {
            ol.children[i].className = '';
        }
        //留下当前的小圆圈的current类名
        ol.children[circle].className = 'current';
    });
    //左侧按钮
    arrow_1.addEventListener('click', function () {
        //无缝滚动实现原理： 把ul第一个复制一份，放到ul最后面，
        //当图片滚动到克隆的最后一张图片时，让ul快速的、不做动画的跳到最左侧：left为0
        if (num == 0) {
            num = ul.children.length - 1;//又重新让num变回最后一张
            ul.style.left = - num * mainWidth + 'px';

        }
        num--;
        animate(ul, -num * mainWidth);
        //点击右侧按钮，小圆圈跟随一起变化 可以再声明一个变量控制小圆圈的播放
        circle--;
        //如果circle < 0  说明第一个小圆圈要改成第4个小圆圈
        if (circle < 0) {
            circle = ol.children.length - 1;
        } //circle = circle < 0 ? ol.children.length - 1 : circle;
        //先清除其他小圆圈的current类名
        for (var i = 0; i < ol.children.length; i++) {
            ol.children[i].className = '';
        }
        //留下当前的小圆圈的current类名
        ol.children[circle].className = 'current';
    });

    //自动播放轮播图
    var timer = setInterval(function () {
        //手动调用点击事件
        arrow_2.click();
    }, 2000);











    //留言板
    var bt = document.querySelector('.but button');
    var cons = document.querySelector('#cons');
    var ulct = document.querySelector('.am ul');

    bt.addEventListener('click', function () {
        if (cons.value == '') {
            alert('您没有输入内容！')
            return false;
        } else {
            //想在页面中放入新的元素，分两步，一是创建新元素，二是添加元素
            var li = document.createElement('li');
            li.innerHTML = cons.value + "<a href='javascript:;'>删除</a>";
            ulct.insertBefore(li, ulct.children[0]);
            //删除元素
            var as = document.querySelectorAll('.am a');
            for (var i = 0; i < as.length; i++) {
                as[i].addEventListener('click', function () {
                    //node.removeChild(child);删除的是li当前a 所在的li  this.parentNode
                    ulct.removeChild(this.parentNode);
                });
            }
        }
    });

})
