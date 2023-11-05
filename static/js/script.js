        

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



// $(document).ready(function() {
//     $('form[id^="comment-form"]').submit(function(e) {
//         e.preventDefault(); // Prevent the form from submitting traditionally
        
//         var form = $(this);
//         var formData = form.serialize();
        
//         console.log("the comment JavaScript function man");

//         const comment_container = form.closest('.modal-content').find('[id^="comment_container"]');
//         // console.log("the comment container is : " , comment_container)
//         const comment = form.find('#message-text').val();
//         const user_image = document.getElementById("user_image").src
//         console.log(user_image)
//         const user_name = document.getElementById("user_name").innerText
//         const user_username = document.getElementById("user_username").innerText
        
//         $.ajax({
//             type: 'POST',
//             url: "/tweet_app/send_comment/",
//             data: formData,
//             success: function(response) {
//                 if (response.message) {
//                     // alert(response.message);
//                     // Close the modal or handle success as needed

//                     const newCommentDiv = document.createElement('div');
//                     newCommentDiv.className = 'd-flex flex-row my-3';
                  



//                     newCommentDiv.innerHTML = `
//                     <div class="d-flex flex-row align-items-center">


//                         <img class="rounded-circle mx-3" src="${user_image}" style="width:70px; height:70px;"/>


//                       <div class="d-flex flex-column">
//                         <h6 class="mx-2 p-0 my-0">${user_name}</h6>
//                         <p class="text-muted mx-2 p-0 my-0">${user_username}</p>
//                       </div>
//                     </div>
//                     <p>${comment}</p>
// `
//                     // // Append the new comment div to the parent container
//                     // comment_container.appendChild(newCommentDiv);

//                     if (comment_container.length > 0) {
//                         // Ensure that comment_container has elements
//                         comment_container[0].appendChild(newCommentDiv);
//                       }

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


// document.getElementById("tweet_dflex").querySelectorAll("button[name='like-button']").forEach(function (button) {
//     button.addEventListener("click", function (event) {
//         event.preventDefault();

//         var postId = button.getAttribute("data-post-id");
//         var heartIcon = button.querySelector("svg");
        

//         var form = $(this).closest('form');
//         // var form = $(this);
//         var formData = form.serialize();

        
//         $.ajax({
//             type: 'POST',
//             url: form.attr('action'),
//             data: formData,
//             dataType: "json"
//         });
        
//         // For example, you can toggle the fill color between red and none:
//         if (heartIcon.getAttribute("fill") === "red") {
//             heartIcon.setAttribute("fill", "none");
//         } else {
//             heartIcon.setAttribute("fill", "red");
//         }
//     });
// });

const container = document.getElementById("tweet_dflex");

container.addEventListener("click", function (event) {
  // Check if the event target is a button element
  console.log(event.target.id)
  console.log(event.target.tagName)
  if ((event.target.id.startsWith("like_button"))) {
      console.log("in the new click function")
    // Determine which button was clicked by examining its attributes or content
    var button = event.target
    var postId = button.getAttribute("data-post-id");

    if(event.target.tagName="P"){
        var temp = button.closest('button');
        var heartIcon = temp.querySelector('svg')
        console.log(heartIcon)
    }
    else {
        var heartIcon = button.querySelector("svg");
    }

    // var form = $(this).closest('form');
    // // var form = $(this);
    // var formData = form.serialize();

    
    // $.ajax({
    //     type: 'POST',
    //     url: form.attr('action'),
    //     data: formData,
    //     dataType: "json"
    // });
    
    // For example, you can toggle the fill color between red and none:
    if (heartIcon.getAttribute("fill") === "red") {
        heartIcon.setAttribute("fill", "none");
    } else {
        heartIcon.setAttribute("fill", "red");
    }
  }

  if(event.target.id.startsWith("comment_button_submit")){

    event.preventDefault();
    const comment_element = event.target;
    const form = comment_element.closest("#comment-button-div").querySelector("form");
    const formData = $(form).serialize();
    const comment_container = form.closest('.modal-content').querySelector('[id^="comment_container"]');
    console.log("the comment container " , comment_container)

    const comment = form.querySelector('#message-text').value;
    const user_image = document.getElementById("user_image").src;
    const user_name = document.getElementById("user_name").innerText;
    const user_username = document.getElementById("user_username").innerText;
    console.log("about to send the comment with the new function ");

    $.ajax({
      type: 'POST',
      url: "/tweet_app/send_comment/",
      data: formData,
      success: function(response) {
          if (response.message) {
              // alert(response.message);
              // Close the modal or handle success as needed

            const newCommentDiv = document.createElement('div');
            newCommentDiv.className = 'd-flex flex-row my-3';
          



            newCommentDiv.innerHTML = `
            <div class="d-flex flex-row align-items-center">


                <img class="rounded-circle mx-3" src="${user_image}" style="width:70px; height:70px;"/>


              <div class="d-flex flex-column">
                <h6 class="mx-2 p-0 my-0">${user_name}</h6>
                <p class="text-muted mx-2 p-0 my-0">${user_username}</p>
              </div>
            </div>
            <p>${comment}</p>
`


            // Ensure that comment_container has elements
            comment_container.appendChild(newCommentDiv);
            comment_container.scrollTop += 250;

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

  }


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


  const imageInput = document.getElementById('image_input');
  const secImageInput = document.getElementById('second_image_input');
  const imagePreview = document.getElementById('main_modal_header_preview');
  const secImagePreview = document.getElementById('secondary_modal_header_preview');

  imageInput.addEventListener('change', function () {
    imagePreview.innerHTML = ''; // Clear previous previews
  
    for (const file of imageInput.files) {
      const image = document.createElement('img');
      image.src = URL.createObjectURL(file); // Create a temporary URL for the image
      image.style.width= "65%" ;
  
      image.onload = () => {
        URL.revokeObjectURL(image.src); // Clean up the URL when the image is loaded
      };
  
      imagePreview.appendChild(image);
    }
  });

  secImageInput.addEventListener('change', function () {
    secImagePreview.innerHTML = ''; // Clear previous previews
  
    for (const file of secImageInput.files) {
      const sec_image = document.createElement('img');
      sec_image.src = URL.createObjectURL(file); // Create a temporary URL for the image
      sec_image.style.width= "65%" ;
  
      sec_image.onload = () => {
        URL.revokeObjectURL(sec_image.src); // Clean up the URL when the image is loaded
      };
  
      secImagePreview.appendChild(sec_image);
    }
  });