export class LoginService{

    login(username, password){
        let fetchData = {
            method : "POST",
            headers: {"Content-Type": "application/json"},
            body : JSON.stringify({username: username, password: password})
        };

        return fetch("/restservices/authentication/login", fetchData)
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    alert("Verkeerde username of wachtwoord")
                }
            })
            .then(data =>{
                sessionStorage.setItem("LoggedInUser", username);
                return data
            })
            .catch(error => {
                console.log(error);
            });
    }

    register(username, password){
        const registerData = {
            username: username,
            password: password,
        };

        fetch("/restservices/authentication/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(registerData)
        })
            .then(async response => {
                if (!response.ok) {
                    return response.json().then(error => { throw new Error(error.error); });
                }
                const text = await response.text();
                return text ? JSON.parse(text) : {};
            })
            .then(data => {
                sessionStorage.setItem("UserRegistered", username);
                alert(data.message);
            })
            .catch(error => {
                console.error("Error:", error);
                alert("Registration failed: " + error.message);
            });
    }

    isLoggedIn(username){
       return sessionStorage.getItem("LoggedInUser") !== null;
    }

    logout(username){
        sessionStorage.removeItem("LoggedInUser");
        sessionStorage.clear();
        window.location.href = "index.html"
    }

}