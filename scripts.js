function change_page(which, page) {
    //get rid of the recipe / project thats there for aesthetic reasons
    if (which == 'body') {
        clear_page('#recipes');
        clear_page('#projects');
    }
    //get current page info
    const $cur_page = $(which + " .visible");
    const cur_id = $cur_page.attr("id");
    //same page, cya later
    if(cur_id == page) return;

    //get new page to be displayed
    let $new_page = $("#" + page);

    //disables all buttons (no breaking my animations >:()
    $("select").attr("disabled", "disabled");
    $("#buttons li").attr("onclick", null);

    //different page animation durations
    let timeout = 500;
    //if home page (since its 2 elements)
    if(cur_id == "home") {
        timeout = 1000;
        $(document.getElementById("joshmage")).removeClass("img_visible").addClass("img_invisible");
    }
    $cur_page.removeClass("visible").addClass("invisible");

    //delay so the fade out animation can play
    setTimeout(function () {
        //page gone for good now
        $cur_page.css("display", "none");
        //home page stuff again
        if(page == "home"){
            //change link
            window.history.pushState("", "", "/");
            $(document.getElementById("joshmage")).removeClass("img_invisible").addClass("img_visible");
        }else if(which == 'body'){
            window.history.pushState("", "", "/#" + page);
        }
        //new page can be displayed now + animation
        $new_page.css("display", "block");
        $new_page.removeClass("invisible").addClass("visible");

        //renable all buttons :)
        $("select").removeAttr("disabled");
        $("#buttons li").each(function () {
            const text = $(this).text().toLowerCase().trim();
            $(this).attr("onclick","change_page('body', '" + text +"')");
        });
    }, timeout);
}

function clear_page(which){
    //this recipe must leave in a timely order
    setTimeout(function () {
        const $cur_page = $(which + " .visible");
        $cur_page.removeClass("visible").addClass("invisible");
        $("select").val("none");
    }, 500);
}

//refreshing or opening on different page than home page / page load
let link = window.location.href;
if(link.endsWith("#projects")){
    change_page("body", "projects");
}else if(link.endsWith("#resume")){
    change_page("body", "resume");
}else if(link.endsWith("#recipes")){
    change_page("body", "recipes");
}