jQuery(document).ready(function(t){t(window).scroll(function(){var o=t(window).scrollTop();o>=300?t(".header-default").addClass("header-scroll"):t(".header-default").removeClass("header-scroll")}),t(".nano").nanoScroller(),t(".jsPostCarousel").slick({mobileFirst:!0,slidesToShow:1,slidesToScroll:1,prevArrow:'<button type="button" class="block-arrow slick-prev--post slick-prev"><i class="chevron left"></i></button>',nextArrow:'<button type="button" class="block-arrow slick-next--post slick-next"><i class="chevron right"></i></button>',responsive:[{breakpoint:1079,settings:{slidesToShow:3,slidesToScroll:1,prevArrow:'<button type="button" class="block-arrow slick-prev"><i class="chevron left"></i></button>',nextArrow:'<button type="button" class="block-arrow slick-next"><i class="chevron right"></i></button>'}},{breakpoint:767,settings:{slidesToShow:2,slidesToScroll:1,prevArrow:'<button type="button" class="block-arrow slick-prev--post slick-prev"><i class="chevron left"></i></button>',nextArrow:'<button type="button" class="block-arrow slick-next--post slick-next"><i class="chevron right"></i></button>'}}]}),t("#share").jsSocials({showLabel:!1,showCount:!0,shareIn:"popup",shares:["facebook","twitter","whatsapp","email"]}),t("a").on("click",".btn-bookmark-js",function(o){o.preventDefault();var e=t(this).data("action"),a=t(this).data("id"),s=t(this).data("type");bookBtn=t(this),t.ajax({url:baseUrl+"ajax/bookmark",method:"POST",data:{id:a,type:s,action:e},success:function(t){console.log(t),1==e?(bookBtn.html('<i class="fa fa-bookmark"></i>'),bookBtn.data("action",2)):2==e&&(bookBtn.html('<i class="fa fa-bookmark-o"></i>'),bookBtn.data("action",1))}})}),t(".btn-like-js").on("click",function(o){o.preventDefault(),action=t(this).data("action"),id=t(this).data("id"),type=t(this).data("type"),likeBtn=t(this),currentLike=parseInt(t("#likeCount").text()),"like"==action?(t("#likeCount").text(currentLike+1),likeBtn.data("action","dislike"),likeBtn.addClass("liked")):"dislike"==action&&(t("#likeCount").text(currentLike-1),likeBtn.data("action","like"),likeBtn.removeClass("liked")),t.ajax({url:baseUrl+"ajax/like",method:"POST",data:{id:id,type:type,action:action}})})}),$(".lazy").unveil();