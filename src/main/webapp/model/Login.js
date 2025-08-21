import {LoginService} from "../service/LoginService.js"

export default class Login {
    constructor() {
        const loginService = new LoginService();
        const loginButton = document.querySelector('#login-button');
        const loginForm = document.querySelector('#login-form');
        const registerButton = document.querySelector('#register-button');
        const registerForm = document.querySelector('#register-form');
    }
}