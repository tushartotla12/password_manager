// TUSHAR TOTLA
function log(vara) {
    console.log(vara);
}

chrome.runtime.onInstalled.addListener((object) => {
    chrome.storage.sync.set({
        credentials: [
            {
                username: "userNameInsta",
                password: "password",
                url: "https://www.instagram.com/",
            },
        ],
    });

    if (object.reason === chrome.runtime.OnInstalledReason.INSTALL) {
        chrome.tabs.create({ url: "onBoarding/onboarding.html" }, function (tab) {
            console.log("New tab launched with http://yoursite.com/");
        });
    }
});

chrome.webNavigation.onCompleted.addListener(({ tabId, frameId }) => {
    if (frameId !== 0) return;

    chrome.scripting.executeScript({
        target: { tabId },
        function: newPageLoad,
    });
});


const newPageLoad = async () => {
    const { credentials } = await chrome.storage.sync.get("credentials");
    const pageCredential = credentials.find(
        (credential) => credential.url === location.href
    );
    if (pageCredential !== undefined) {
        const { userInfo } = await chrome.storage.sync.get("userInfo");

        let enteredPin = prompt("Enter pin to autofill");
        if (enteredPin == userInfo.pin) {
            const inputs = document.getElementsByTagName("input");
            for (var i = 0; i < inputs.length; i++) {
                if (inputs[i].type == "text" || inputs[i].type == "email") {
                    inputs[i].value = pageCredential.username;
                }
                if (inputs[i].type == "password") {
                    inputs[i].value = pageCredential.password;
                }
            }

        }
    } else {
        var loginButton = document.getElementsByTagName("button");

        for (var i = 0; i < loginButton.length; i++) {
            if (loginButton[i].type !== "submit") continue;

            loginButton[i].addEventListener("click", () => {
                if (confirm("Do you want to save creds?") == true) {
                    // we will store
                    const inputs = document.getElementsByTagName("input");
                    var userN, userP;
                    for (var i = 0; i < inputs.length; i++) {
                        if (inputs[i].type == "text") {
                            userN = inputs[i].value;
                        }
                        if (inputs[i].type == "password") {
                            userP = inputs[i].value;
                        }
                    }
                    credentials.push({
                        username: userN,
                        password: userP,
                        url: location.href,
                    });
                    chrome.storage.sync.set({ credentials });
                }
            });
        }
    }
};
