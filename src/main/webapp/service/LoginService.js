export class LoginService{

    login(user, password){
        let fetchData = {
            method : "POST",
            headers: {"Content-Type": "application/json"},
            body : JSON.stringify({username: user, password: password})
        };

        return fetch("/api/auth/login", fetchData)
            .then(response => {
                if (response.ok) {
                    alert("succesvol ingelogd!")
                    return response.json();
                } else {
                    alert("Verkeerde username of wachtwoord")
                    throw new Error("Verkeerde username of wachtwoord");
                }
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

        fetch("/api/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(registerData)
        })
            .then(response => {
                if (!response.ok) {
                    return response.json().then(error => { throw new Error(error.error); });
                }
                return response.json();
            })
            .then(data => {
                alert(data.message);
            })
            .catch(error => {
                console.error("Error:", error);
                alert("Registration failed: " + error.message);
            });
    }

}