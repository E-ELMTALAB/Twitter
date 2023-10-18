// document.getElementById('like-button').addEventListener('click', function() {
//     this.classList.toggle('red');
// });

// function showCommentModal() {
//     // Implement your comment modal logic here
//     console.log('Comment button clicked somewhere else ');
// }

// function likeButtonClick() {
//     $('#like-button').toggleClass('liked');
//     console.log('in the first one ');
// }

// $(document).ready(function() {
//     $('#like-button').click(function() {
//         $(this).toggleClass('liked'); // Toggle the 'liked' class
//         console.log("in the like button function ")
//     });
// });

// var element = document.getElementById("like-button");
// element.addEventListener("click", function() {
//     console.log('im in the new function my man')
//     element.classList.add("highlight");
// });


// $(document).ready(function() {
//     $('.comment-form').submit(function(e) {
//       e.preventDefault(); // Prevent the form from submitting the traditional way
//       console.log('about to print the ajax')
//       console.log($.ajax);
//       var form = $(this);
//       var formData = form.serialize();

//         // Extract the tweet ID using the data-tweet-id attribute
//         var tweetId = form.data('tweet-id');
//         console.log(formData)

//         // Include the tweet ID in the data
//         formData += '&post_id=' + tweetId;

//       $.ajax({
//         type: 'POST',
//         url: '/tweet_app/send_comment/',
//         data: formData ,
//         success: function(response) {
//           if (response.message) {
//             // Handle a successful response, e.g., show a success message
//             alert(response.message);

//             // Close the modal
//             $('#CommentModal').modal('hide');
//           } else if (response.error) {
//             // Handle an error response, e.g., show an error message
//             alert(response.error);
//           }
//         },
//         error: function(xhr, status, error) {
//           // Handle AJAX errors
//           alert('Error: ' + error);
//         }
//       });
//     });
//   });

// $(document).ready(function() {
//     $('.comment-form').submit(function(e) {
//         e.preventDefault(); // Prevent the form from submitting traditionally
//         var form = $(this);
//         var formData = form.serialize(); // Serialize the form data
//         console.log("about to send the comment to the server")
//         // Extract post_id and user_id from this specific form
//         var post_id = form.find('[name="post_id"]').val();
//         var user_id = form.find('[name="user_id"]').val();

//         // Include post_id and user_id in the data
//         formData += '&post_id=' + post_id + '&user_id=' + user_id;

//         $.ajax({
//             type: 'POST',
//             url: '/tweet_app/send_comment/',
//             data: formData,
//             success: function(response) {
//                 if (response.message) {
//                     alert(response.message);
//                     $('#myModal').modal('hide');
//                 } else if (response.error) {
//                     alert(response.error);
//                 }
//             },
//             error: function(xhr, status, error) {
//                 alert('Error: ' + error);
//             }
//         });
//     });
// });

// $(document).ready(function() {
//     $('form').submit(function(e) {
//         e.preventDefault(); // Prevent the form from submitting traditionally
        
//         var form = $(this);
//         var formData = form.serialize();
//         console.log("the comment javascript funciton man ")
        
//         $.ajax({
//             type: 'POST',
//             url: form.attr('action'),
//             data: formData,
//             success: function(response) {
//                 if (response.message) {
//                     alert(response.message);
//                     // Close the modal or handle success as needed
//                 } else if (response.error) {
//                     alert(response.error);
//                     // Handle error as needed
//                 }
//             },
//             error: function(xhr, status, error) {
//                 console.error('Error: ' + error);
//                 // Handle AJAX errors as needed
//             }
//         });
//     });
// });

$(document).ready(function() {
    $('form[id^="comment-form"]').submit(function(e) {
        e.preventDefault(); // Prevent the form from submitting traditionally
        
        var form = $(this);
        var formData = form.serialize();
        
        console.log("the comment JavaScript function man");
        
        $.ajax({
            type: 'POST',
            url: form.attr('action'),
            data: formData,
            success: function(response) {
                if (response.message) {
                    alert(response.message);
                    // Close the modal or handle success as needed
                } else if (response.error) {
                    alert(response.error);
                    // Handle error as needed
                }
            },
            error: function(xhr, status, error) {
                console.error('Error: ' + error);
                // Handle AJAX errors as needed
            }
        });
    });
});



document.querySelectorAll("button[name='like-button']").forEach(function (button) {
    button.addEventListener("click", function (event) {
        event.preventDefault();

        var postId = button.getAttribute("data-post-id");
        var heartIcon = button.querySelector("svg");
        

        var form = $(this).closest('form');
        // var form = $(this);
        var formData = form.serialize();

        
        $.ajax({
            type: 'POST',
            url: form.attr('action'),
            data: formData,
            dataType: "json"
        });
        
        // For example, you can toggle the fill color between red and none:
        if (heartIcon.getAttribute("fill") === "red") {
            heartIcon.setAttribute("fill", "none");
        } else {
            heartIcon.setAttribute("fill", "red");
        }
    });
});