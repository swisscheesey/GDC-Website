//Link buttons
comments_section_id = window.location.href;
var commentsHTML = '<hr/><div id=addComment><h3>Comments</h3><label for="new-comment">Add a comment...</label><div class="add-comment"><textarea id="name" cols="50" rows="1"></textarea><br/><textarea id="new-comment" cols="50" rows="3"></textarea><br/><button id="submit">Submit</button><button id="image">Add Image</button><button id="purgeLS">DEBUG: purge local storage</button></div></div>  <div id="comments"><h4 id="nocomments">No comments</h4></div>';
loadComments();

function loadComments(){
    document.getElementById("commentsArea").innerHTML = commentsHTML;
    previousComments = localStorage.getItem(window.location.href);
    //console.log(previousComments);
    if(previousComments === null) return;
    document.getElementById("comments").innerHTML = previousComments;
}
document.getElementById('submit').addEventListener('click', function(ev) {addComment(ev)});
document.getElementById('purgeLS').addEventListener('click', (ev)=>{localStorage.clear(); history.go(0);});

function addComment(ev){
    commentText = document.getElementById('new-comment').value;
    nameField = document.getElementById('name').value;
    if(commentText === '') return;
    if(nameField === '') return;

    const comments = document.getElementById("comments");
    const posterName = document.createElement('h3');
    posterName.className = 'name';
    const textBox = document.createElement('div');
    const replyButton = document.createElement('button');
    replyButton.className = 'reply';
    replyButton.innerHTML = 'reply';
    const likeButton = document.createElement('button');
    likeButton.className = 'like';
    likeButton.innerHTML = 'like';
    const deleteButton = document.createElement('button');
    deleteButton.className = 'delete';
    deleteButton.innerHTML = 'delete';
    const commentWrapper = document.createElement('div');
    commentWrapper.className = 'comment';
    textBox.textContent = commentText;
    posterName.textContent = nameField;
    document.getElementById("new-comment").value = '';
    document.getElementById("name").value = '';
    if(document.getElementById("nocomments") != null){
        console.log("removing");
        document.getElementById("nocomments").remove();
    }
    commentWrapper.append(posterName, textBox,replyButton,likeButton,deleteButton);
    comments.appendChild(commentWrapper);
    setOnLocalStorage();
}

function setOnLocalStorage () {
    localStorage.setItem(window.location.href, document.getElementById('comments').innerHTML);
    console.log(localStorage.getItem(window.location.href));
}   