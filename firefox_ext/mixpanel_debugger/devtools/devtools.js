function handleRequestFinished(request) {
    console.log("Server IP: ", request.serverIPAddress);
    request.getContent().then(content => {
      console.log("Content: ", content);
    });
  }
  
  browser.devtools.network.onRequestFinished.addListener(handleRequestFinished);