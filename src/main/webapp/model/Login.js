import {LoginService} from "../service/LoginService.js"

export default class Login {
    constructor() {
        this.loginService = new LoginService();
        this.loginButton = document.querySelector('#login-button');
        this.loginForm = document.querySelector('#login-form');
        this.registerButton = document.querySelector('#register-button');
        this.registerForm = document.querySelector('#register-form');
        this.switchToRegister = document.querySelector('#link-to-register');
        this.switchToLogin = document.querySelector('#link-to-login');
        this.usernameLogin = document.querySelector('#username');
        this.passwordLogin = document.querySelector('#password');
        this.usernameRegister = document.querySelector('#register-username');
        this.passwordRegister = document.querySelector('#register-password');
        this.logoutButton = document.querySelector('#logout-button');

        this.switchToRegister?.addEventListener("click", (event) => this.switchToRegisterForm(event));
        this.switchToLogin?.addEventListener("click", (event) =>  this.switchToLoginForm(event));

        this.loginForm?.addEventListener("submit", (e) => this.loginUser(e));
        this.registerForm?.addEventListener("submit", (e) => this.registerUser(e));
        this.loginButton?.setAttribute("type", "submit");
        this.registerButton?.setAttribute("type", "submit");

        this.logoutButton?.addEventListener("click", (event) => this.logoutUser(event));

        if (this.loginService.isLoggedIn()) {
            this.logoutButton.style.display = "block";
            this.loginForm.style.display = "none";
            this.registerForm.style.display = "none";
        } else {
            this.logoutButton.style.display = "none";
            this.loginForm.style.display = "block";
            this.registerForm.style.display = "none";
        }
    }

    switchToRegisterForm(event){
        event?.preventDefault();
        this.loginForm.style.display = 'none';
        this.registerForm.style.display = 'block';
    }

    switchToLoginForm(event){
        event?.preventDefault();
        this.registerForm.style.display = 'none';
        this.loginForm.style.display = 'block';
    }

    registerUser(event){
        event.preventDefault();
        const username = this.usernameRegister.value.trim();
        const password = this.passwordRegister.value;
        this.loginService.register(username, password);
    }

    loginUser(event){
        event.preventDefault();
        const username = this.usernameLogin.value.trim();
        const password = this.passwordLogin.value;

        this.loginService.login(username, password)
            .then(() => {
                alert("Login successful!");
                this.logoutButton.style.display = "block";
                this.loginForm.style.display = "none";
                this.registerForm.style.display = "none";
                window.location.href = "timer-setup.html"
            }).catch(error => {
                console.error("Login error:", error);
                alert(error.message || "Login failed. Please try again.");
            });
    }

    logoutUser(){
        this.loginService.logout();
        this.logoutButton.style.display = "none";
        this.loginForm.style.display = "block";
        this.registerForm.style.display = "none";
        alert("Logged out!");
    }
}

new Login();