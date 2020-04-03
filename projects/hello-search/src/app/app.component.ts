import {Component, AfterViewInit} from "@angular/core";
import {LoginService} from "@sinequa/core/login";
import {NotificationsService, Notification} from "@sinequa/core/notification";

@Component({
    selector: "app",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.scss"]
})
export class AppComponent implements AfterViewInit {

    constructor(
        public loginService: LoginService,
        public notificationsService: NotificationsService) {
    }

    ngAfterViewInit() {
        this.login();
    }

    login() {
        this.loginService.login();
    }

    logout() {
        this.loginService.logout();
    }

    deleteNotification(notification: Notification) {
        setTimeout(() => this.notificationsService.deleteNotification(notification), 5000);
        return true;
    }
}