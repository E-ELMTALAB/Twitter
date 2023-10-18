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

// $('#exampleModal').on('show.bs.modal', function (event) {
//     var button = $(event.relatedTarget) // Button that triggered the modal
//     var recipient = button.data('whatever') // Extract info from data-* attributes
//     // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
//     // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
//     var modal = $(this)
//     modal.find('.modal-title').text('New message to ' + recipient)
//     modal.find('.modal-body input').val(recipient)
//   })