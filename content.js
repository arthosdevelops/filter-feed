chrome.runtime.onMessage.addListener(function(message, sender, response) {
    if (message.type == "color-divs") {
        var blacklist = [];
        chrome.storage.sync.get("blacklisted_words", function(response) {
            blacklist = response["blacklisted_words"].split(',');
        });
        var observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                var divs = document.getElementsByClassName("userContent");
                for (var i = 0; i < blacklist.length; i++) {
                    for (var j = 0; j < divs.length; j++) {
                        var ps = divs[j].getElementsByTagName('p');
                        var p = ps[0];
                        if (ps.length == 0)
                            continue;
                        if (p.innerHTML.indexOf(blacklist[i]) != -1) {
                            var parent = divs[j].parentNode;
                            var imgURL = chrome.extension.getURL('icons/grey.png');
                            $(parent).css('background-image', 'url(' + imgURL + ')');
                            $(parent).css('background-size', '100%');
                            $(parent).css('position', 'relative');

                            for (var k = 0; k < parent.childNodes.length; k++) {
                                $(parent.childNodes[k]).css('position', 'relative');
                                $(parent.childNodes[k]).css('z-index', '-1');

                            }



                        }
                    }
                }
            });
        });

        var observerConfig = {
            childList: true,
        };

        var targetNode = document.body;
        observer.observe(targetNode, observerConfig);




    }
});