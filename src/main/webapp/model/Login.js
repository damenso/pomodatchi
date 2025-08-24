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
        this.registerButton?.addEventListener("click", (event) => this.registerUser(event));
        this.loginButton?.addEventListener("click", (event) => this.loginUser(event));
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
        if (this.registerForm.style.display === 'none'){
            this.loginForm.style.display = 'none';
            this.registerForm.style.display = 'block';
        }
    }

    switchToLoginForm(event){
        if (this.loginForm.style.display === 'none'){
            this.registerForm.style.display = 'none';
            this.loginForm.style.display = 'block';
        }
    }

    registerUser(event){
        event.preventDefault();
        const username = this.usernameRegister.value;
        const password = this.passwordRegister.value;
        this.loginService.register(username, password);
    }

    loginUser(event){
        event.preventDefault();
        const username = this.usernameLogin.value;
        const password = this.passwordLogin.value;

        this.loginService.login(username, password).then(() => {
            if (this.loginService.isLoggedIn()) {
                alert("Login successful!");
                this.logoutButton.style.display = "block";
                this.loginForm.style.display = "none";
                this.registerForm.style.display = "none";
                window.location.href = "starter.html"
            } else {
                alert("Login failed. Please check your username and password.");
            }
        }).catch(error => {
            console.error("Login error:", error);
            alert("Login failed. Please try again.");
        });
    }

    logoutUser(event){
        this.loginService.logout();
        this.logoutButton.style.display = "none";
        this.loginForm.style.display = "block";
        this.registerForm.style.display = "none";
        alert("Logged out!");
    }


}

new Login();