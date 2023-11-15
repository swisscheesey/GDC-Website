document.getElementById('postButton').addEventListener('click', openModal);
        
function openModal() {
    document.getElementById('postModal').style.display = 'block';
    document.getElementById('overlay').style.display = 'block';
}

function closeModal() {
    document.getElementById('postModal').style.display = 'none';
    document.getElementById('overlay').style.display = 'none';
}

function postInformation() {
    // Add your logic to handle the posted information
    // You can use the value of the text area as the posted content
    var postContent = document.getElementById('postContent').value;
    console.log('Posted Content:', postContent);

    // Close the modal after posting (you can modify this based on your requirements)
    closeModal();
}