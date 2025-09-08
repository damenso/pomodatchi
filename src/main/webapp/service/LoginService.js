export class LoginService {
    async login(username, password){
        const fetchData = {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({ username, password })
        };

        const response = await fetch("/restservices/authentication/login", fetchData);

        if (!response.ok) {
            let msg = "Verkeerde username of wachtwoord";
            try {
                const err = await response.json();
                if (err?.error) msg = err.error;
            } catch(_) {}
            throw new Error(msg);
        }

        const text = await response.text();
        const data = text ? JSON.parse(text) : {};

        sessionStorage.setItem("LoggedInUser", username);
        return data;
    }

    async register(username, password){
        const response = await fetch("/restservices/authentication/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password })
        });

        if (!response.ok) {
            const err = await response.json().catch(() => ({}));
            throw new Error(err.error || "Registration failed");
        }

        const text = await response.text();
        const data = text ? JSON.parse(text) : {};
        sessionStorage.setItem("UserRegistered", username);
        alert(data.message || "Registration successful");
        return data;
    }

    isLoggedIn(){
        return sessionStorage.getItem("LoggedInUser") !== null;
    }

    logout(){
        sessionStorage.removeItem("LoggedInUser");
        window.location.href = "index.html";
    }
}
