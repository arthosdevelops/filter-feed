window.onload = function() {
    restore();
    document.getElementById("save").onclick = function() {
        save();
        chrome.runtime.sendMessage({
            type: "color-divs"
        });

    }
}

function save() {
    var blacklist = document.getElementById("blacklist").value;
    status.innerHTML = "Saving...";
    chrome.storage.sync.set({
        "blacklisted_words": blacklist
    }, function() {

        var status = document.getElementById("status");
        status.innerHTML = "Options Saved.";
        setTimeout(function() {
            status.innerHTML = "";
        }, 750);
    });
}


function restore() {
    chrome.storage.sync.get("blacklisted_words", function(response) {
        var blacklist = response["blacklisted_words"];
        if (!blacklist) {
            blacklist = getSampleBlacklist();
        }
        document.getElementById("blacklist").value = blacklist;
    });


}

function getSampleBlacklist() {
    var sampleBlacklist = [
        "Trump",
        "Game of Thrones"
    ];
    return sampleBlacklist.join(", ");
}