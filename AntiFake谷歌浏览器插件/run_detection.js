chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
   var activeTab = tabs[0];
   var url = activeTab.url;
   //向服务器发送请求
   $.ajax({
     type: "POST",
     url: "http://127.0.0.1:80/detect",
     data: {data: url},
     //处理返回的请求
     success: function(data){removeElements(data, activeTab);},
   });
});

function removeElements(elements, activeTab) {
  console.log(elements);
  chrome.tabs.executeScript({
    code: '(' + function(params) {

        console.log(params);
        var replaceImage = document.createElement('img');

        var flag=""

        //存在虚假视频
        if (params['videos'] && params['videos'] == true) {
          flag += " 视频 "
        }
        //存在虚假文本
        if (params['paragraphs'].length > 0) {
          flag += " 文本 "
        }
        var length=params['images'].length;

        //存在虚假图片
        if (length > 0) {
          flag += " 图片 "
        }

        if(flag!=""){
          alert("经云端检测,此网页中 "+flag+"为AI伪造内容，请避免被误导");
        }
        else{
          alert("经云端检测，未发现AI伪造内容");
        }
        return {success: true, html: document.body.innerHTML};
    } + ')(' + JSON.stringify(elements) + ');'
  }, function(results) {
    console.log(results[0]);
    
  });
  chrome.browserAction.setBadgeText({
    text: "" + elements["length"], 
    tabId: activeTab.id
  });
  window.close();
}