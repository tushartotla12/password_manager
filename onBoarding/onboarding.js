window.onload = function(){
    button = document.getElementById("myButton");

    if(button){
        button.addEventListener("click", ()=>{
            const fName = document.getElementById("firstName");
            const lName = document.getElementById("lastName");
            const email = document.getElementById("email");
            const pin = document.getElementById("pin");
            if(fName.value != "" || lName.value != "" || email.value != "" && pin.value != ""){
                chrome.storage.sync.set({ userInfo: { firstName: fName.value, lastName: lName.value, email: email.value, pin: pin.value } });
                alert("Successfully stored all your data! Enjoy using the extension");
                window.close();
            }else{
                alert("All values are required!");
            }
        });
    }
 };
