document.addEventListener('plusready', function() {
    var webview = plus.webview.currentWebview();    
    plus.key.addEventListener('backbutton', function() {
        webview.canBack(function(e) {
            if(e.canBack) {
                webview.back();		//这里不建议修改自己跳转的路径
            } else {
                webview.close(); //hide,quit
                //plus.runtime.quit();
            }
        })
    });
});