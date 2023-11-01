// makding the load more tweets functionality 

var num_tweets = 5;

const newHTML = `
            <div class="card rounded shadow infinite-item">
              <div class="card-header">
                <div class="d-flex justify-content-start">
                  <div class="d-flex align-items-start">

                    {% if tweet.user.profile_picture_path %}
                      <img class="rounded mx-3" src="{{${tweet.user.profile_picture_path.url}}}" style="width:60px; height:60px;"/>
                    {% else %}
                      <img class="rounded-circle mx-3" src="https://cdn.icon-icons.com/icons2/3065/PNG/512/profile_user_account_icon_190938.png" style="width:60px; height:60px;"/>
                    {% endif %}

                    <div class="mx-3">
                      <h5 class="m-0">{{${tweet.user.username}}}</h5>
                      <p class="m-0">{{${tweet.timestamp}|timesince}} ago</p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="card-body">
                <div class="d-flex flex-row">
                  <p>{{${tweet.text}}}</p>
                </div>
                {% if ${tweet.image} %}
                  <img src="{{${tweet.image.url}}}" style="width:100%;" loading="lazy"/>
                {% endif %}
              </div>
              <div class="card-footer">
                <div class="d-flex post-actions">


                  <form action="{% url 'like_post' %}" method="post">
                    {% csrf_token %}
                    <div class="d-flx" id="like-button-div">
                      <button
                        type="submit"
                        class="btn btn-link d-flex align-items-center text-muted mx-4"
                        name="like-button"
                        value="{{${tweet.tweet_id}}}"
                        id="{{ ${tweet.tweet_id} }}"
                      >
                        <input name="user_id" value="{{${request.user.id}}}" type="hidden">
                        <input name="tweet_id" value="{{${tweet.tweet_id}}}" type="hidden">

                        {% if ${tweet.tweet_id} in ${liked_tweets} %}
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="red"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            class="feather feather-heart icon-md mb-0"
                            id="svg"
                          >
                          
                          <path
                            d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
                          ></path>
                          </svg>
                        {% else %}
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            class="feather feather-heart icon-md mb-0"
                            id="svg"
                          >
                          
                          <path
                            d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
                          ></path>
                          </svg>
                        {% endif %}
                        <p class="d-none d-md-block mx-1 my-2">Like</p>
                      </button>
                    </div>
                  </form>




                  <div class="d-flx" id="like-button-div">
                    <button
                      type="button"
                      class="btn btn-link d-flex align-items-center text-muted mx-4"
                      name="comment_button_{{${tweet.tweet_id}}}"
                      data-target="#CommentModal{{${tweet.tweet_id}}}" 
                      data-toggle="modal"
                      data-whatever="@getbootstrap"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        class="feather feather-message-square icon-md mb-0"
                      >
                        <path
                          d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"
                        ></path>
                      </svg>
                      <p class="d-none d-md-block mx-1 my-2">Comment</p>
                    </button>
            
                    <div class="modal fade" id="CommentModal{{tweet.tweet_id}}" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                      <div class="modal-dialog" role="document">
                        <div class="modal-content">


                          <div class="modal-header">
                            <!-- <h5 class="modal-title" id="exampleModalLabel">Write your comment</h5> -->
                            <!-- <button type="button" class="close rounded-circle" data-dismiss="modal" aria-label="Close">
                              <span aria-hidden="true">&times;</span>
                            </button> -->
                            <div class="d-flex flex-column overflow-auto" style="height:400px;">
                              {% for comment in comments%}
                                {% if comment.tweet_id == ${tweet.tweet_id} %}
                                  <div class="d-flex flex-row my-3" id="comments_{{${tweet.tweet_id}}}">
                                    <div class="d-flex flex-row align-items-center">

                                      {% if ${request.user.profile_picture_path} %}
                                        <img class="rounded-circle mx-3" src="{{${request.user.profile_picture_path.url}}}" style="width:70px; height:70px;"/>
                                      {% else %}
                                        <img class="rounded-circle mx-3" src="https://cdn.icon-icons.com/icons2/3065/PNG/512/profile_user_account_icon_190938.png" style="width:70px; height:70px;" />
                                      {% endif %}

                                      <div class="d-flex flex-column">
                                        <h6 class="mx-2 p-0 my-0">{{comment.user.name}}</h6>
                                        <p class="text-muted mx-2 p-0 my-0">{{comment.user.username}}</p>
                                      </div>
                                    </div>
                                    <p>{{comment.content}}</p>

                                  </div>
                                  <hr>
                                {% endif %}
                              {% endfor %}  
                            </div>
                          </div>


                          <form method="post" id="comment-form-{{${tweet.tweet_id}}}" action="{% url 'send_comment' %}">
                            {% csrf_token %}
                            <div class="modal-body">
                              <div class="form-group">
                                <label for="message-text" class="col-form-label">Message:</label>
                                <textarea class="form-control" id="message-text" name="comment"></textarea>
                                <input type="hidden" name="tweet_id" value="{{${tweet.tweet_id}}}">
                              </div>
                            </div>
                            <div class="modal-footer">
                              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                              <form method="post" action="{% url 'send_comment' %}">
                                {% csrf_token %}
                                <button type="submit" class="btn btn-primary" data-target="#CommentModal{{${tweet.tweet_id}}}" 
                                data-toggle="modal">Send Comment </button>
                              </form>
                              <input type="hidden" name="user_id" value="{{${request.user.id}}}">
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>  



                    </div>

                    <div class="d-flx" id="like-button">
                      <button
                        type="button"
                        class="btn btn-link d-flex align-items-center text-muted mx-4"
                        name="share_button_{{${tweet.tweet_id}}}"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          class="feather feather-share icon-md mb-0"
                        >
                          <path
                            d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"
                          ></path>
                          <polyline points="16 6 12 2 8 6"></polyline>
                          <line x1="12" y1="2" x2="12" y2="15"></line>
                        </svg>
                        <p class="d-none d-md-block mx-1 my-2">Share</p>
                      </button>
                    </div>
                  


                </div>
              </div>
            </div>

`;

function loadTweets() {
    $.ajax({
        type: "GET",
        url: `/tweet_app/load_tweets/${num_tweets}/`,
        success: function(response) {
            // console.log(response.data)
            const tweets = response.data
            tweets.map(tweet=>{
                console.log(tweet)
            })
            // // Get a reference to the target element
            // const targetElement = document.getElementById('tweet_dflex');

            // // Append the new HTML to the target element
            // targetElement.innerHTML += newHTML;
        },
        error: function(error) {
            console.log(error)
        }
    })
}
const load_button = document.getElementById("load_tweets")
load_button.addEventListener("click" , function(){

    loadTweets()
    num_tweets += 5;
})








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