import { Component, AfterViewInit } from "@angular/core";
import { FormBuilder, FormGroup, FormControl } from "@angular/forms";
import { LoginService } from "@sinequa/core/login";
import { AppService } from "@sinequa/core/app-utils";
import { NotificationsService, Notification } from "@sinequa/core/notification";

import { SearchService } from '@sinequa/components/search';
import { SavedQueriesService } from '@sinequa/components/saved-queries';
import { RecentQueriesService } from '@sinequa/components/saved-queries';

import { Action } from '@sinequa/components/action';
import { IntlService, Locale } from '@sinequa/core/intl';
import { Record } from '@sinequa/core/web-services';
import { ModalService } from '@sinequa/core/modal';
import { Preview } from './preview';
import { SearchComponent } from './search/search.component';

// import { Observable } from 'rxjs';

@Component({
    selector: "app",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.scss"]
})
export class AppComponent implements AfterViewInit {
    constructor(
        public loginService: LoginService,
        public notificationsService: NotificationsService,
    ) //
    {
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