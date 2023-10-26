var headerHTML = '<a href=index.html><div class="odd">Home</div></a><a href=calendar.html><div class="even">Calendar</div></a><a href=game-projects.html><div class="odd">Game Projects</div></a><a href=resources.html><div class="even">Resources</div></a><a href=about-us.html><div class="odd">About Us</div></a><div class="title"><b>LSU GDC</b></div>';
var footerHTML = '<div class=footer></div>';
loadHeader();
loadFooter();
function loadHeader(){
    document.getElementById("header").innerHTML = headerHTML;
}
function loadFooter(){
    document.getElementById("footer").innerHTML = footerHTML;
}
