$(document).ready(function() {
    $(window).on('load', function() {
        imgLocation();
        //使用json对象来模拟从数据中获取到的图片
      var dataImg = {"data":[{"src":"img-1.jpg"},{"src":"img-2.jpg"},{"src":"img-3.jpg"},{"src":"img-4.jpg"},{"src":"img-5.jpg"},{"src":"img-6.jpg"}]};
       window.onscroll = function(){
            if(scrollLocation()){
                $.each(dataImg.data,function(index,value){
                    var box = $("<div>").addClass("box").appendTo($("#container"));
                    var content = $("<div>").addClass("content").appendTo(box);
                    $("<img>").attr("src","img/"+$(value).attr("src")).appendTo(content);
                });
                imgLocation();
            }
        };
    });

});

function scrollLocation(){ //监控滚动位置的函数方法
    var box = $(".box"); 
    var lastboxHeight = box.last().get(0).offsetTop;//获取所有box中最后一个box距离顶部的距离
    var documentHeight = $(document).width();//获取文档的高度！//此处模糊为什么是width 而不是height！ 经过测试width出现滚动条 但是height却没有！不过仍然实现功能
    var scrollHeight = $(window).scrollTop();
    return (lastboxHeight<scrollHeight+documentHeight)?true:false;//此处思路模糊！！为什么是这样的比较
};
function imgLocation() { //实现瀑布流的函数方法
    var box = $(".box");
    var boxWidth = box.eq(0).width();
    var boxNum = Math.floor($(window).width() / boxWidth); //获取一行中box的个数
    var boxArr = [];
    box.each(function(index, value) { //遍历所有的box
        var boxHeight = box.eq(index).height(); //获取到对应下标box的高度，并把它储存在变量中
        if (index < boxNum) { //条件:控制第一行内！ //此处思路模糊！！ 是第一行图片还是同行图片！！
            boxArr[index] = boxHeight; //将下标与box高度对应存放在数组boxArr中
        } else {
            var boxMinHeight = Math.min.apply(null, boxArr); //获取到boxArr数组中最小的值(最小的高度);
            var boxMinIndex = $.inArray(boxMinHeight, boxArr); //使用.inArray方法找到数组中最小高度的box的对应下标！
            $(value).css({
                "position": "absolute",
                "top": boxMinHeight, //图片距离顶部的距离是高度最小box的高度；
                "left": box.eq(boxMinIndex).position().left //图片距离左边的距离是高度最小box的距离左边的距离
            });
            boxArr[boxMinIndex] += box.eq(index).height(); //此处思路有些模糊！！为什么是这样加？
        }
    });

};
