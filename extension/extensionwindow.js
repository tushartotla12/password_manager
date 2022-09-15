const clearPasswordsBtn = document.getElementById("clear-passwords-btn");
let credList = document.getElementById("cred-list");

const profileBtn = document.getElementById("profileBtn");

profileBtn.addEventListener("click", ()=>{
    chrome.tabs.create({ url: "reset pin/resetpin.html" }, function (tab) {
    });
})

const getUserInfo = async () => {
    const {userInfo} = await chrome.storage.sync.get("userInfo");
    const fullNameBtn = document.getElementById("profileBtn");
    // fullNameBtn.textContent = userInfo.firstName + " " + userInfo.lastName;
    fullNameBtn.textContent = "Reset Pin";
}

const getUrls = async () => {
    const { credentials } = await chrome.storage.sync.get("credentials");
    if(credentials.length == 0){
        
    }else{
    credentials.forEach(credential => {

        const url = credential.url;

        var index = url.indexOf(".");

        var websiteName = "";

        for(var i = index+1; i < url.length; i++){
            if(url.charAt(i) == '.') break;
            if(i == index+1){
                websiteName += url.charAt(i).toUpperCase();
            }else{
                websiteName += url.charAt(i);
            }
            
        }

        const webName = document.createElement("p");
        webName.textContent = websiteName;
        webName.style = "display: inline; fontSize: 20px; color: #ffffff";
        const deleteBtn = document.createElement("button");
        deleteBtn.className = "btn btn-danger";
        deleteBtn.innerText = "Delete";
        deleteBtn.style = "margin-left: 180px";
        const listI = document.createElement("li");
        listI.className = "list-group-item";
        listI.style = "margin-left: 20px; background-color: #141E27; margin-right: 20px; margin-bottom:20px";

        listI.append(webName);
        listI.append(deleteBtn);
        credList.append(listI);
        
        deleteBtn.addEventListener("click", () => {
            const updatedPasswords = credentials.filter(pwd => pwd !== credential);
            chrome.storage.sync.set({ credentials: updatedPasswords });

            linkEl.remove();
            deleteBtn.remove(); 
            getUrls();           
        })
    })
}
}

getUserInfo();

getUrls();