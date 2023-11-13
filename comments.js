//If you're feeling brave, clean up this behemoth please.

//Loading the comments section
comments_section_id = window.location.href; 
var addCommentHTML = '<div class="add-comment"><textarea id="name" cols="40" rows="1"></textarea><br/><textarea id="new-comment" cols="40" rows="3"></textarea><br/><button id="submit">Submit</button></div>';
var commentsHTML = '<hr/><h3>Comments</h3><div id="addComment"></div><button id="purgeLS">DEBUG: Delete All Comments</button><div id="comments"><h4 id="nocomments">No comments</h4></div>';
loadComments();
var commentTarget = document.getElementById("comments");
function loadComments(){
    document.getElementById("commentsArea").innerHTML = commentsHTML;
    document.getElementById("addComment").innerHTML = "<b>Add a comment...</b><br/>" + addCommentHTML;
    previousComments = localStorage.getItem(window.location.href);
    if(previousComments === null) return;
    document.getElementById("comments").innerHTML = previousComments;
}
document.getElementById('submit').addEventListener('click', function(ev) {addComment(ev)});
document.getElementById('purgeLS').addEventListener('click', (ev)=>{localStorage.clear(); history.go(0);});

//Callbacks
function addComment(ev){
    commentText = document.getElementById('new-comment').value;
    nameField = document.getElementById('name').value;
    if(commentText === '') return;
    if(nameField === '') return;
    const contentWrapper = document.createElement('div');
    contentWrapper.className = 'message-content';
        const posterName = document.createElement('h3');
        posterName.className = 'name';
        const textBox = document.createElement('p');
        const replyButton = document.createElement('button');
        replyButton.className = 'reply';
        replyButton.innerHTML = 'Reply';
        const likeButton = document.createElement('button');
        likeButton.className = 'like';
        likeButton.innerHTML = 'Likes (0)';
        const deleteButton = document.createElement('button');
        deleteButton.className = 'delete';
        deleteButton.id = 'delete';
        deleteButton.innerHTML = 'Delete';
        const contractButton = document.createElement('button');
        contractButton.className = 'contract';
        contractButton.id = 'contract';
        contractButton.innerHTML = '-';
        const commentWrapper = document.createElement('div');
        commentWrapper.className = 'comment';
        textBox.textContent = commentText;
        posterName.textContent = nameField;
        document.getElementById("new-comment").value = '';
        document.getElementById("name").value = '';
        
    if(commentTarget == document.getElementById("comments")){
        commentWrapper.id = 'root-comment';
    }
    if(document.getElementById("nocomments") != null){
        console.log("removing");
        document.getElementById("nocomments").remove();
    }
    contentWrapper.append(posterName, textBox,replyButton,likeButton,deleteButton, contractButton);
    commentWrapper.append(contentWrapper);
    commentTarget.appendChild(commentWrapper);
    setOnLocalStorage();
}

function setOnLocalStorage () {
    removeReplyBox();
    localStorage.setItem(window.location.href, document.getElementById('comments').innerHTML);
    console.log(localStorage.getItem(window.location.href));
}   

function hasClass(elem, className){
    //console.log(elem.className.split(' '));
    return elem.className.split(' ').indexOf(className) > -1;
}
document.getElementById('comments').addEventListener('click', 
    function (e) {
        if(hasClass(e.target, 'reply')) {
            removeReplyBox();
            document.getElementById("addComment").innerHTML = '';
            commentTarget = e.target.parentElement.parentElement;
            const reply = document.createElement('div');
            reply.id = 'new-reply';
            reply.innerHTML = "<b>Reply</b>" + addCommentHTML;
            e.target.parentElement.appendChild(reply);
            const cancelButton = document.createElement('button');
            cancelButton.innerHTML = 'Cancel';
            cancelButton.id = 'cancelReply';
            document.getElementById('submit').addEventListener('click', function(ev) {addComment(ev)});
            document.getElementsByClassName('add-comment')[0].append(cancelButton);
            document.getElementById('cancelReply').addEventListener('click', function(ev) {setOnLocalStorage()});
        }
        else if(hasClass(e.target, 'delete')){
            e.target.parentElement.parentElement.remove();
            console.log(document.getElementById('comments').innerHTML);
            if(document.getElementById('comments').innerHTML == ''){
                console.log(document.getElementById('comments').innerHTML);
                document.getElementById('comments').innerHTML = '<h4 id="nocomments">No comments</h4>'
            }
            setOnLocalStorage();
        }
        else if(hasClass(e.target, 'like')){
            var number = parseInt(e.target.innerHTML.match(/\d+/)[0]);
            number = number + 1;
            e.target.innerHTML = "Likes (" + number + ")";
            setOnLocalStorage();
        }
        else if(hasClass(e.target, 'contract')){
            removeReplyBox();
            e.target.className = 'expand';
            e.target.id = 'expand';
            e.target.innerHTML = '+';
            var replies = e.target.parentElement.parentElement.childNodes;
            var others = [].slice.call(replies, 1)
            console.log(others);
            others.forEach(element => {
                element.style = "display:none";
            });
        }
        else if(hasClass(e.target, 'expand')){
            removeReplyBox();
            e.target.className = 'contract';
            e.target.id = 'contract';
            e.target.innerHTML = '-';
            var replies = e.target.parentElement.parentElement.childNodes;
            var others = [].slice.call(replies, 1)
            console.log(others);
            others.forEach(element => {
                element.style = "display:block";
            });

        }
    })

function removeReplyBox(){
    commentTarget = document.getElementById("comments");
    if(document.getElementById('new-reply')){
        document.getElementById('new-reply').remove();
    }
    document.getElementById('addComment').innerHTML = "<b>Add a comment...</b><br/>"+addCommentHTML;
        document.getElementById('submit').addEventListener('click', function(ev) {addComment(ev)});
}