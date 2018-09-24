var firstBanner=(function () {
   let bannerData=null;
   let swiper=document.getElementById('swiper');
   let imgList=swiper.getElementsByTagName('img');
   let bannerStep=0;
   let bannerTimer=null;
   let bannerWrapper=document.getElementById('banner_wrapper');
   let focusTip=document.getElementById('first_focus');
   function ajax() {
       let xhr=new XMLHttpRequest();
       xhr.open('GET','data/banner.json',false);
       xhr.onreadystatechange=function () {
           if(xhr.status==200&&xhr.readyState==4){
               bannerData=JSON.parse(xhr.responseText);
               console.log(bannerData);
               bindHtml(bannerData);
           }
       };
       xhr.send(null);
   }
   
    function bindHtml(data) {
        let imgStr=``;
        for(let i=0;i<data.length;i++){
            imgStr+=`<a href="javascript:;"><img data-src=${data[i].src} alt=""></a>`
        }
        swiper.innerHTML+=imgStr;
        lazyImg();

    }

    function lazyImg() {
        for (let i = 0; i < imgList.length; i++) {
            let cur = imgList[i];
            let oImg = new Image();
            let url = cur.getAttribute('data-src');
            oImg.src = url;
            oImg.onload = function () {
                cur.src = this.src;
                oImg = null;
            }
        }

    }

    function auto() {
        bannerTimer=setInterval(autoMove,1000);
    }
    function autoMove() {

      if(bannerStep>=bannerData.length){
          bannerStep=0;
          imgList[0].style.opacity=1;
          imgList[0].style.zIndex=100;


      }
      bannerStep++;
        for(let j=0;j<imgList.length;j++){
            console.log(imgList[j].style.opacity);
        }
      let cur=imgList[bannerStep];
        console.log(cur);





    }
    return{
       init:function () {
           ajax();
           auto();
       }
    }
    
})();



// function allBannerData() {
//     this.swiper=document.getElementById('swiper');
//     this.bannerData=null;
//     this.bannerStep=null;
//     this.bannerTimer=null;
//     console.log(this.swiper);
//
// }
// allBannerData();



console.log(1);

