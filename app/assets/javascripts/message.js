$(function(){
  function buildPost(post){
    var html = `<div class="wrapper__chat-main__messages__message">
                  <div class="wrapper__chat-main__messages__message__upper-info">
                    <p class="wrapper__chat-main__messages__message__upper-info__talker">
                    ${post.user}
                    </p>
                    <p class="wrapper__chat-main__messages__message__upper-info__date">
                    ${post.updated_at}
                    </p><p class="wrapper__chat-main__messages__message__text">
                    ${post.content}
                    </p>
                  <p></p>
                  <img src="${post.image}">
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
      console.log(post);
      var html = buildPost(post);
      $(".wrapper__chat-main__messages").append(html);
      $(".wrapper__chat-main__messages").animate({scrollTop: $(".wrapper__chat-main__messages")[0].scrollHeight}, "fasts");
    })
    .fail(function(){
      alert("エラー");
    })
  })
});

// 2019/11/2 doneの中にanimateメソッド直接入れてる
// 　　　　　　appendのイメージ部分が何かおかしくてエラーが出てる？