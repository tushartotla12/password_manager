window.onload = function () {
    button = document.getElementById("myButton");

    if (button) {
        button.addEventListener("click", async () =>{
            const { userInfo } = await chrome.storage.sync.get("userInfo");
            const currentPin = document.getElementById("currentPin");
            const newPin = document.getElementById("newPin");
            const confirmPin = document.getElementById("confirmPin");
            if (currentPin.value == userInfo.pin) {
                if (newPin.value == confirmPin.value) {
                    chrome.storage.sync.set({ userInfo: { firstName: userInfo.firstName, lastName: userInfo.lastName, email: userInfo.email, pin: newPin.value } });
                    alert("Your pin is successfully reset!");
                    window.close();
                } else {
                    alert("New pin doesn't match confirm pin!");
                }
            } else {
                alert("Current Pin doesn't match! Please try again.");
            }
        });
    }
};
