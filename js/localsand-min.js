(function(e){function i(n){var r=e("#applications");r.quicksand(null,t);n.attr("info-page")=="true"?window.location.href=n.attr("action")+"/info":window.location.href=n.attr("action")}function s(){e("#nav-controller").on("clickhandler",function(e,t){alert("registering clicks to: "+t);c(t)});e("#nav-controller").on("controlframework",function(e,t){alert("registering menu handling to: "+t);register_qs_control_framework(t)})}function o(e){return lifegadget_config.TemplateDir+"_"+e+".tmpl.html"}function u(){navTemplate=o("messaging");e.get(navTemplate,function(t){e("#page-nav-system").html(t)})}function a(){navTemplate=o("navigation");e.get(navTemplate,function(t){e("#page-nav-system").html(t);e("#navigation-toggle-on").on("click",function(e){e.preventDefault();f()});e("#navigation-toggle-off").on("click",function(e){e.preventDefault();f()})})}function f(){if(e("#page-nav-system").hasClass("active")){r=e("control_area .btn.active");e("#nav-enabler-button").fadeIn("fast");e("#nav-buttons").hide();e("#page-main-content").addClass("active").fadeIn("fast");e("#page-nav-system").removeClass("active").fadeOut("fast")}else{e("#nav-enabler-button").fadeOut("fast");e("#nav-buttons").fadeIn("fast");e("#page-nav-system").addClass("active").fadeIn("fast");e("#page-main-content").removeClass("active").fadeOut("fast",function(){if(!n){h("control_area");n=!0}e("#page-nav-system").addClass("active");e("#nav-buttons button.active").removeClass("active");if(r!=null){e("control_area .btn.active").removeClass("active");r.addClass("active")}else e("#nav-buttons button").eq(0).addClass("active")})}}function l(){e("control_area").on("click",function(t){var n=e(t.target),r=n.closest("li")});e("#page-nav-system").on("click",function(t){var n=e(event.target),r=n.closest("li");t.stopPropagation();n.is("li")?i(n):i(r)})}function c(t){t||(t="#application li");e(t).on("click",i())}function h(n){n||(n=".quicksand-cntrl");e.fn.sorted=function(t){var n={reversed:!1,by:function(e){return e.text()}};e.extend(n,t);$data=e(this);arr=$data.get();arr.sort(function(t,r){var i=n.by(e(t)),s=n.by(e(r));return n.reversed?i<s?1:i>s?-1:0:i<s?-1:i>s?1:0});return e(arr)};var r=function(e){var t={selected:!1,type:0};for(var n=0;n<e.length;n++){e[n].indexOf("selected-")==0&&(t.selected=!0);e[n].indexOf("segment-")==0&&(t.segment=e[n].split("-")[1])}return t},i=function(e){var t=e.filter('[class*="selected-"]');return t.attr("data-value")},s=function(e){var t=e.filter('[class*="selected-"]');return t.attr("data-value")},o=e(n);o.each(function(n){var u=e("#applications"),a=u.clone(),f=e(this),l=f.find(".nav.btn");l.bind("click",function(n){var f=e(this),l=r(f.attr("class").split(" ")),c=l.selected,h=l.segment;if(!c){f.siblings().removeClass("selected-0").removeClass("selected-1").removeClass("selected-2");f.addClass("selected-"+h);var p=i(o.eq(1).find(".selected-"+h)),d=s(o.eq(0).find(".selected-"+h));if(d=="all")var v=a.find("li");else var v=a.find("li."+d);if(p=="size")var m=v.sorted({by:function(t){return parseFloat(e(t).find("span").text())}});else var m=v.sorted({by:function(t){return e(t).find("strong").text().toLowerCase()}});u.quicksand(m,t)}n.preventDefault()})})}var t={duration:800,easing:"easeInOutQuad",useScaling:!0,adjustHeight:!1},n=!1,r=null;l();h()})(jQuery);