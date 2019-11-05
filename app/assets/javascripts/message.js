$(function(){
  function buildPost(post){
    img = post.image? `<img src='${post.image}'>` : "";
    var html = `<div class="wrapper__chat-main__messages__message" data-message-id="${post.id}">
                  <div class="wrapper__chat-main__messages__message__upper-info">
                    <p class="wrapper__chat-main__messages__message__upper-info__talker">
                    ${post.user}
                    </p>
                    <p class="wrapper__chat-main__messages__message__upper-info__date">
                    ${post.updated_at}
                    </p>
                    <p class="wrapper__chat-main__messages__message__text">
                    ${post.content}
                    </p>
                    <p>
                    ${img}
                    </p>
                  </div>
                </div>`
    return html;
  }

  $("#new_message").on("submit", function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr("action");
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: "json",
      processData: false,
      contentType: false
    })
    .done(function(post){
      var html = buildPost(post);
      $(".wrapper__chat-main__messages").append(html);
      $(".wrapper__chat-main__messages").animate({scrollTop: $(".wrapper__chat-main__messages")[0].scrollHeight}, "fasts");
      $(".wrapper__chat-main__form__new__message__input-box__submit__btn").prop("disabled", false);
      $('#new_message')[0].reset();
    })
    .fail(function(){
      alert("エラー");
    })
  });

  var reloadMessages = function () {
    if (window.location.href.match(/\/groups\/\d+\/messages/)){
      var last_message_id = $('.wrapper__chat-main__messages__message:last').data("message-id");

      $.ajax({
        url: "api/messages",
        type: 'get',
        dataType: 'json',
        data: {id: last_message_id}
      })
      .done(function (messages) {
        var insertHTML = '';
        messages.forEach(function (message) {
          insertHTML = buildPost(message);
          $('.wrapper__chat-main__messages').append(insertHTML);
        })
        $('.wrapper__chat-main__messages').animate({scrollTop: $('.wrapper__chat-main__messages')[0].scrollHeight}, 'fasts');
      })
      .fail(function () {
        alert('自動更新に失敗しました');
      });
    }
  };
  setInterval(reloadMessages, 5000);
  });