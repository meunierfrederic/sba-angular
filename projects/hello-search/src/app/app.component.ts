import { Component, AfterViewInit } from "@angular/core";
import { FormBuilder, FormGroup, FormControl } from "@angular/forms";
//import { QueryWebService, Results } from "@sinequa/core/web-services";
import { LoginService } from "@sinequa/core/login";
//import { AppService, Query } from "@sinequa/core/app-utils";
import { AppService } from "@sinequa/core/app-utils";
import { NotificationsService, Notification } from "@sinequa/core/notification";

import { SearchService } from '@sinequa/components/search';

// import { Observable } from 'rxjs';

@Component({
    selector: "app",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.scss"]
})
export class AppComponent implements AfterViewInit {
    searchControl: FormControl;
    form: FormGroup;
    // results$: Observable<Results> | undefined;

    constructor(
        protected formBuilder: FormBuilder,
        public loginService: LoginService,
        public appService: AppService,
        // public queryWebService: QueryWebService,
        public notificationsService: NotificationsService,
        public searchService: SearchService) {
        this.searchControl = new FormControl("");
        this.form = this.formBuilder.group({
            search: this.searchControl
        });
        this.searchService.queryStream.subscribe({
            next: (query) => {
                this.searchControl.setValue((query && query.text) || '');
            }
        });
    }

    ngAfterViewInit() {
        this.login();
    }

    search() {
        this.searchService.clearQuery();
        this.searchService.query.text = this.searchControl.value || '';
        this.searchService.searchText();
        // this.results$ = this.queryWebService.getResults(query);
    }

    clear() {
        //this.results$ = undefined;
        this.searchService.clear();
        this.searchControl.setValue("");
    }

    login() {
        this.loginService.login();
    }

    logout() {
        this.clear();
        this.loginService.logout();
    }

    deleteNotification(notification: Notification) {
        setTimeout(() => this.notificationsService.deleteNotification(notification), 5000);
        return true;
    }
}