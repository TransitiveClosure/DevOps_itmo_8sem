function log_out() {
    change_page("log_in.html")
}
function change_board() {
    change_page("boards.html")
}
function settings() {
    change_page("settings.html")
}

function change_page(address) {
    var p = window.location.pathname;
    if (p.match(/index/)){
        window.location.href = "html/" + address;
    } else {
        window.location.href = address;
    }
}

(function() {
    // buttons = document.getElementsByClassName("menu_bar__button")
    var p = window.location.pathname;
    window.addEventListener("load", function(){
        if (p.match(/index/)){
            const site_name = document.getElementsByClassName("site_name");
            site_name[0].className += " active";
        } 
        if (p.match(/settings/)){
            const site_name = document.getElementsByClassName("settings_button");
            site_name[0].className += " active";
        } 
        if (p.match(/boards/)){
            const site_name = document.getElementsByClassName("boards_button");
            site_name[0].className += " active";
        } 
    })
})()