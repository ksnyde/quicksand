(function(a){a.fn.quicksand=function(m,n){var b={duration:750,easing:"swing",attribute:"data-id",selector:"> li",adjustHeight:true};a.extend(b,n);var f=a(m).clone();return this.each(function(){var d=a(this);d.css("height",a(this).height());var g=a(this).find(b.selector),i=[];g.each(function(c){i[c]=a(this).offset()});g.each(function(c){a(this).stop();a(this).css("position","absolute").css("margin",0).css("top",i[c].top-parseFloat(a(this).css("margin-top"))).css("left",i[c].left-parseFloat(a(this).css("margin-left")))});
var h=a(d).clone().html("").attr("id","").css("height","auto").append(f),k=0,e=function(){if(!k){d.html(h.html());h.remove();k=1}},l=a(d).offset();h.insertBefore(d).css("z-index",-1).css("opacity",0).css("margin",0).css("position","absolute").css("top",l.top).css("left",l.left);b.adjustHeight&&d.animate({height:h.height()},b.duration,b.easing);g.each(function(){var c=f.filter("["+b.attribute+"="+a(this).attr(b.attribute)+"]");if(c.length)a.browser.msie?a(this).animate({top:c.offset().top,left:c.offset().left,
opacity:1},b.duration,b.easing,e):a(this).animate({top:c.offset().top,left:c.offset().left,opacity:1,scale:"1.0"},b.duration,b.easing,e);else a.browser.msie?a(this).animate({opacity:"0.0"},b.duration,b.easing,e):a(this).animate({opacity:"0.0",scale:"0.0"},b.duration,b.easing,e)});f.each(function(){var c=g.filter("["+b.attribute+"="+a(this).attr(b.attribute)+"]"),j=f.filter("["+b.attribute+"="+a(this).attr(b.attribute)+"]");if(c.length===0){c=a.browser.msie?{opacity:"1.0"}:{opacity:"1.0",scale:"1.0"};
j.clone().css("position","absolute").css("margin",0).css("top",j.offset().top).css("left",j.offset().left).css("opacity",0).css("transform","scale(0.0)").appendTo(d).animate(c,b.duration,b.easing,e)}})})}})(jQuery);