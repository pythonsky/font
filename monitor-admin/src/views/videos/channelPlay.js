import ChimeePlayer from 'chimee-player';

export default function channalPlay() {
    // $("#videoPlayer").css("display", "block")
    window.channelPlayer =new ChimeePlayer({
        wrapper: '#wrapper',
        src: "",
        box: 'hls',
        isLive: true,
        autoload:false,
        autoplay: true,
        controls: true,
        preload:"none",
        container: {
            "width": "430px",
            "height":"350px"
        }
    });
    window.channelPlayer.$watch("isFullscreen",(newVal,oldVal)=>{
        if(newVal){
            window.channelPlayer.container.width="100%"
            window.channelPlayer.container.height="100%"
        }else{
            window.channelPlayer.container.width="430px"
            window.channelPlayer.container.height="350px"
        }
    })
    //创建小方块的jquery对象
    var $boxHeader = $("#videoPlayer").find(".ivu-card-head")
    var $box = $("#videoPlayer");
    //创建小方块的鼠标点按下事件
    $boxHeader.mousedown(function (event) {
        //获取鼠标按下的时候左侧偏移量和上侧偏移量
        var old_left = event.pageX; //左侧偏移量
        var old_top = event.pageY; //竖直偏移量
        //获取鼠标的位置
        var old_position_left = $box.position().left;
        var old_position_top = $box.position().top;
        //鼠标移动
        $(document).mousemove(function (event) {
            var new_left = event.pageX; //新的鼠标左侧偏移量
            var new_top = event.pageY; //新的鼠标竖直方向上的偏移量
            //计算发生改变的偏移量是多少
            var chang_x = new_left - old_left;
            var change_y = new_top - old_top;

            //计算出现在的位置是多少

            var new_position_left = old_position_left + chang_x;
            var new_position_top = old_position_top + change_y;
            //加上边界限制

            if (new_position_top < 0) { //当上边的偏移量小于0的时候，就是上边的临界点，就让新的位置为0
                new_position_top = 0;
            }
            //如果向下的偏移量大于文档对象的高度减去自身的高度，就让它等于这个高度
            if (new_position_top > $(document).height() - $box.height()) {
                new_position_top = $(document).height() - $box.height();
            }
            //右限制
            if (new_position_left > $(document).width() - $box.width()) {
                new_position_left = $(document).width() - $box.width();
            }
            if (new_position_left < 0) { //左边的偏移量小于0的时候设置 左边的位置为0
                new_position_left = 0;
            }
            $box.css({
                left: new_position_left + 'px',
                top: new_position_top + 'px'
            })
        });
        $box.mouseup(function () {
            $(document).off("mousemove");
        })
    });
}
