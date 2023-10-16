// document.getElementById('like-button').addEventListener('click', function() {
//     this.classList.toggle('red');
// });

function showCommentModal() {
    // Implement your comment modal logic here
    console.log('Comment button clicked somewhere else ');
}

function likeButtonClick() {
    $('#like-button').toggleClass('liked');
    console.log('in the first one ');
}

$(document).ready(function() {
    $('#like-button').click(function() {
        $(this).toggleClass('liked'); // Toggle the 'liked' class
        console.log("in the like button function ")
    });
});

var element = document.getElementById("like-button");
element.addEventListener("click", function() {
    console.log('im in the new function my man')
    element.classList.add("highlight");
});