import { Component, OnInit } from '@angular/core';
import { LoginService } from '@sinequa/core/login';

@Component({
  selector: 'app-login-logout',
  templateUrl: './login-logout.component.html',
  styleUrls: ['./login-logout.component.scss']
})
export class LoginLogoutComponent implements OnInit {

  constructor(
    public loginService: LoginService,
  ) //
  { }

  ngOnInit(): void {
  }

  login() {
    this.loginService.login();
  }

  logout() {
    this.loginService.logout();
  }

}
