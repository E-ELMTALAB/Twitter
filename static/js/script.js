        

// Function to update the container size
function updateContainerSize() {
    const container = document.getElementById('tweet_dflex');
    const windowWidth = window.innerWidth;

    // Adjust the container size based on the window width
    if (windowWidth < 768) {
        container.style.width = '100vw';
    } else {
        container.style.width = '600px';
    }
}

// Attach an event listener to the window's resize event
window.addEventListener('resize', updateContainerSize);

// Call the function initially to set the initial size
updateContainerSize();



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


$(document).ready(function() {
    $('form[id^="follow-request"]').submit(function(e) {
        e.preventDefault(); // Prevent the form from submitting traditionally
        
        var form = $(this);
        var formData = form.serialize();
        var button = form.find('button[type="submit"]'); // Find the submit button within the form
        // button.text('Unfollow');
        // Change the button text to indicate that the request is being processed
        // Toggle the button text between "Follow" and "Unfollow"
        if (button.text().trim() == 'Follow') {
            button.text('Unfollow');
        } else {
            button.text('Follow');
        }
        
        console.log("the follow request sent");
        
        $.ajax({
            type: 'POST',
            url: form.attr('action'),
            data: formData,
            // success: function(response) {
            //     if (response.message) {
            //         alert(response.message);
            //         // Close the modal or handle success as needed
            //     } else if (response.error) {
            //         alert(response.error);
            //         // Handle error as needed
            //     }
            // },
            // error: function(xhr, status, error) {
            //     console.error('Error: ' + error);
            //     // Handle AJAX errors as needed
            // }
        });
    });
});

// $(document).ready(function() {
//     $('form[id^="delete-tweet"]').submit(function(e) {
//         e.preventDefault(); // Prevent the form from submitting traditionally
        
//         var form = $(this);
//         var formData = form.serialize();
//         // var button = form.find('button[type="submit"]'); // Find the submit button within the form
//         // button.text('Unfollow');
//         // Change the button text to indicate that the request is being processed
//         // Toggle the button text between "Follow" and "Unfollow"

        
//         console.log("the tweet delete request sent");
        
//         $.ajax({
//             type: 'POST',
//             url: form.attr('action'),
//             data: formData,
//             // success: function(response) {
//             //     if (response.message) {
//             //         alert(response.message);
//             //         // Close the modal or handle success as needed
//             //     } else if (response.error) {
//             //         alert(response.error);
//             //         // Handle error as needed
//             //     }
//             // },
//             // error: function(xhr, status, error) {
//             //     console.error('Error: ' + error);
//             //     // Handle AJAX errors as needed
//             // }
//         });
//     });
// });


document.getElementById("tweet_dflex").querySelectorAll("button[name='like-button']").forEach(function (button) {
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




// $(document).ready(function () {
//     $("#file-input").change(function () {
//         var input = this;
//         var imagePreview = $("#image-preview")[0];

//         if (input.files && input.files[0] && input.files[0].type.startsWith("image/")) {
//             var file = input.files[0];
//             var reader = new FileReader();

//             reader.onload = function (e) {
//                 var preview = document.createElement("img");
//                 preview.src = e.target.result;
//                 imagePreview.innerHTML = "";
//                 imagePreview.appendChild(preview);
//             };

//             reader.readAsDataURL(file);
//         } else {
//             // Clear the preview if a non-image file is selected
//             imagePreview.innerHTML = "";
//         }
//     });

//     $("#submit-button").click(function () {
//         var form = $("#custom-form")[0];
//         var formData = new FormData(form);

//         $.ajax({
//             type: "POST",
//             url: "/tweet_app/upload/",
//             data: formData,
//             processData: false,
//             contentType: false,
//             success: function (data) {
//                 // Handle success response from the server
//             },
//             error: function (xhr, status, error) {
//                 // Handle errors
//             }
//         });
//     });
// });

document.addEventListener('DOMContentLoaded', function() {
    // Get a reference to the button that should hide the modal
    var hideModalButton = document.getElementById('hideModalButton');
    
    // Add a click event listener to the button
    hideModalButton.addEventListener('click', function() {
      // Use Bootstrap's modal('hide') method to hide the modal
      $('#exampleModal').modal('hide');
    });
  });




  $(document).ready(function() {
    var currentPath = window.location.pathname; // Get the current page's URL path
  
    // Loop through menu links and add the "active" class to the matching link
    $('.menu a').each(function() {
      var href = $(this).attr('href');
      if (href === currentPath) {
        $(this).parent('li').addClass('active');
      }
    });
  });