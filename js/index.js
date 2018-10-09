var $searchBox = (function () {
let $search_txt=$('#search_txt');
let $search_hiddenBox=$('.search_hidden');
let $del_logoList=$('.del_logo');

    console.log($search_hiddenBox);
    console.log($search_txt);
$search_txt.on('click',function () {
    $search_hiddenBox.css({display:"block"})
});
$.each($del_logoList,function (index,item) {
$(item).on('click',function () {
    $(item).css({display:'none'}).siblings().css({display:'none'})
})

});
    $(document).click(function (e) {
        var search_txt=$search_txt[0],
            search_hiddenBox=$search_hiddenBox[0],
            target = e.target;  
        if (search_txt !== target && !$.contains(search_txt, target)&&search_hiddenBox!==target) {
            $search_hiddenBox.hide();
        }
    });
    console.log(100);
    return {
        init: function () {

        }
    }
})();


var $firstBanner = (function () {
    let $bannerData = null;
    let $indexPageData = null;
    let $swiper = $('#swiper');
    console.log($swiper);
    let $imgList = $('#swiper img');
    let $bannerStep = 0;
    let $bannerTimer = null;
    let $banner = $('#wcc_banner');
    let $focusTip = $('#first_focus');
    let $indexPage = $('#indexPage');
    let $goods_img = $('.goods_img');


    function ajax() {
        $.ajax({
            url: 'data/banner.json',// 请求地址
            method: 'get', // 请求方式
            async: true, // 是否异步
            dataType: 'json', // 要求返回数据格式
            success: function (n) {
                // 成功执行方法
                $bannerData = n;
                bindHtml();
                if($bannerData.length>=2){
                    hover();
                    auto();

                }




            }
        });
        $.ajax({
            url: 'data/indexPage.json',
            method: 'get',
            async: true,
            dataType: 'json',
            success: function (n) {
                $indexPageData = n;
                indexPageHtml();

            }
        })
    }

    function bindHtml() {
        var imgStr = ``, liStr = ``;
        if($bannerData.length<=1){
            console.log(10);
            liStr=``;
            imgStr = `<img data-src="${$bannerData[0].src}" alt="">`;
        }else{
            $.each($bannerData, function (index, item) {
                imgStr += `<img data-src="${this.src}" alt="">`;
                liStr += `<li class="${index == 0 ? 'selected_focus' : ''}"><img src="${index == 0 ? 'image/index/swiper_button2.png' : ''}" alt=""></li>`
            });
        }
        $swiper.html(imgStr);
        $focusTip.html(liStr);
        lazyImg();

    }

    function indexPageHtml() {
        let outIndexPageStr = ``;
        indexPageStr = ``,
            goods_imgStr = ``,
            goods_imgBoxStr = ``,
            aImg = ``,
            goods_info_top = ``,
            goods_info_details = ``,
            goods_info_top1 = ``,
            goods_info_top2 = ``,
            goods_info_details1 = ``,
            goods_info_details2 = ``;
        $.each($indexPageData, function (index, item) {
            indexPageStr += ` <li class="list_leader">
                        <a href="javascript:;" class="row1">${item.name}</a>
                    </li>
`;
            $.each(item.property, function (index, item) {
                indexPageStr += `<li class="list_leader">
                        <a href="javascript:;" class="color">${item}</a>
                        <i class="change">
                            <img src="image/index/menu_H.png" alt="">
                        </i>
                    </li>`

            });


            goods_info_top += `<div class="goods_info_top">
                                    <span class="hot_sale">${item.little_name[0].name}</span>
                                    <span class="goods_info_more">更多＞</span>
                                </div>`;
            $.each(item.little_name[0].allNumber, function (index, item) {
                goods_info_details += `<a href="javascript:;" >${item}</a>`;

            });
            indexPageStr += `<div class="hidden_menu_box">
                        <div class="goods_info">
                            <div class="goods_info_txt">${goods_info_top} <div class="goods_info_detail">${goods_info_details}</div>`;
            goods_info_top1 += `<div class="goods_info_top">
                                    <span class="hot_sale">${item.little_name[1].name}</span>
                                    <span class="goods_info_more">更多＞</span>
                                </div>`;


            $.each(item.little_name[1].allNumber, function (index, item) {
                goods_info_details1 += `<a href="javascript:;" >${item}</a>`;

            });
            indexPageStr += `${goods_info_top1}<div class="goods_info_detail">${goods_info_details1}</div>`;


            goods_info_top2 += `<div class="goods_info_top">
                                    <span class="hot_sale">${item.little_name[2].name}</span>
                                    <span class="goods_info_more">更多＞</span>
                                </div>`;
            $.each(item.little_name[2].allNumber, function (index, item) {
                goods_info_details2 += `<a href="javascript:;" >${item}</a>`;

            });
            indexPageStr += `${goods_info_top2}<div class="goods_info_detail">${goods_info_details2}</div> </div>`


            $.each(item.more, function (index, item) {
                goods_imgStr += `<li>
                                        <a href="javascript:;">
                                            <div class="img_box">
                                                <img src="${item.src}" alt="">
                                            </div>
                                            <div>
                                                <span>${item.alt}</span>
                                            </div>
                                        </a>
                                    </li>`;

            });

            goods_imgBoxStr = `<div class="goods_img">
                                <h3>/猜你喜欢/</h3>
                                <ul>
                                   ${goods_imgStr}
                                </ul>
                            </div>`;
            $goods_img.html(goods_imgBoxStr);
            indexPageStr += `${goods_imgBoxStr}
                              </div>
                    </div>
                </ul>`;

            indexPageStr = `<ul class="menu_list clear">${indexPageStr}`;
            outIndexPageStr += `${indexPageStr}`;
            indexPageStr = ``,
                goods_imgStr = ``,
                goods_imgBoxStr = ``,
                aImg = ``,
                goods_info_top = ``,
                goods_info_details = ``,
                goods_info_top1 = ``,
                goods_info_top2 = ``,
                goods_info_details1 = ``,
                goods_info_details2 = ``
        });


        $indexPage.html(outIndexPageStr);


    }

    //给主导航随机变化字体颜色

    function lazyImg() {
        $('#swiper img').each(function (index) {
            let that = this;
            let newImg = new Image();
            let url = $(this).attr('data-src');
            newImg.src = url;
            $(newImg).load(function () {
                $(that).attr('src', this.src);
                newImg = null;
                index === 0 ? $(that).fadeIn(500) : null;
            })
        })
    }

    function auto() {

        $bannerTimer = setInterval(autoMove, 2000);
    }

    function autoMove() {
        // 0 1 2 3 4
        $bannerStep++; // 1 2 3 4 5
        if ($bannerStep >= $bannerData.length) {
            $bannerStep = 0
        }


        $('.swiper img').eq($bannerStep).fadeIn(1000).siblings().fadeOut();
        $banner.css({'background': $bannerData[$bannerStep].backgroundColor});
        $('#first_focus li').eq($bannerStep).addClass('selected_focus').siblings().removeClass('selected_focus');

        $('#first_focus li img').eq($bannerStep).attr('src', 'image/index/swiper_button2.png');
    }

    function hover() {
        $swiper.hover(function () {
            clearInterval($bannerTimer);
        }, function () {
            $bannerTimer = setInterval(autoMove, 2000)
        });
        $('#first_focus li').hover(function () {
            clearInterval($bannerTimer);
            $bannerStep = $(this).index() - 1;
            autoMove()
        });
    }

    return {
        init: function () {
           ajax();



        }
    }

})();



