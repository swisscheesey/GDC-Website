var games = document.getElementById("games").childNodes;
var searchbar = document.getElementById("search");
searchbar.addEventListener("keyup", search);
console.log(games);
let titles = [];
games.forEach(element => {
    if(element.id != null){
        titles.push(element.id);
    }
});
console.log(titles);

function setVisibility(id, visible){
    if(visible)
        document.getElementById(id).style = "display:block";
    else document.getElementById(id).style = "display:none";
}

function search(){
    //console.log("search called");
    var query = searchbar.value;
    var regexp = new RegExp(query, "i");
    titles.forEach(element => {
        setVisibility(element, regexp.test(element));
    });
}