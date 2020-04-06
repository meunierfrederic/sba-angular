import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from '@angular/router';
import { LocationStrategy, HashLocationStrategy } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Observable, from } from 'rxjs';

import { WebServicesModule, StartConfig } from "@sinequa/core/web-services";
import { LoginModule } from "@sinequa/core/login";
import { IntlModule, LocaleData } from "@sinequa/core/intl";
import { ModalModule } from "@sinequa/core/modal";
import { LocalesConfig, Locale } from "@sinequa/core/intl";

import { BsSearchModule } from '@sinequa/components/search';
import { BsFacetModule } from '@sinequa/components/facet';
import { BsActionModule } from '@sinequa/components/action';
import { BsAutocompleteModule } from '@sinequa/components/autocomplete';
import { BsPreviewModule } from '@sinequa/components/preview';
import { BsModalModule } from '@sinequa/components/modal';
import { BsSavedQueriesModule } from '@sinequa/components/saved-queries';

import { environment } from "../environments/environment";
import { AppComponent } from "./app.component";
import { Preview } from './preview';
import { HomeComponent } from './home/home.component';
import { SearchComponent } from './search/search.component';
import { SearchFormComponent } from './search-form/search-form.component';
import { SCREEN_SIZE_RULES } from '@sinequa/components/utils';

// Sinequa Core config using online Sinequa Es
export const startConfig: StartConfig = {
    app: "training",
    autoSAMLProvider: "identity",
    production: environment.production,
    auditEnabled: true
};

// Sinequa Core config using local Sinequa ES
export const localStartConfig : StartConfig = {
    app: "hello-search",
    production: environment.production,
    auditEnabled: true
};

// Locales configuration
export class AppLocalesConfig implements LocalesConfig {
    locales: Locale[] = [
        { name: "en", display: "msg#locale.en" },
        { name: "fr", display: "msg#locale.fr" }
    ];
    defaultLocale: Locale = this.locales[0];

    loadLocale(locale: string): Observable<LocaleData> {
        console.warn("Loading locale: " + locale);
        return from(import('../locales/' + locale).then(m => m.default));
    }
}

// Screen size breakpoints (consistent with Bootstrap custom breakpoints in app.scss)
export const breakpoints = {
    lg: "(min-width: 1000px)",
    sm: "(min-width: 600px) and (max-width: 999px)",
    xs: "(max-width: 599px)",
}

@NgModule({
    imports: [
        BrowserModule,
        RouterModule.forRoot([
            { path: "home", component: HomeComponent },
            { path: "search", component: SearchComponent },
            { path: "**", redirectTo: "home" }
        ]),
        FormsModule,
        ReactiveFormsModule,

//        WebServicesModule.forRoot(startConfig),
        WebServicesModule.forRoot(localStartConfig),
        IntlModule.forRoot(AppLocalesConfig),
        LoginModule.forRoot(), // Just use default login modal
        ModalModule.forRoot(),

        BsSearchModule.forRoot({ routes: ['search'] }),
        BsFacetModule,
        BsActionModule,
        BsAutocompleteModule,
        BsPreviewModule,
        BsModalModule,
        BsSavedQueriesModule
    ],
    declarations: [
        AppComponent,
        Preview,
        HomeComponent,
        SearchComponent,
        SearchFormComponent
    ],
    entryComponents: [
        Preview
    ],
    providers: [
        { provide: LocationStrategy, useClass: HashLocationStrategy },
        { provide: SCREEN_SIZE_RULES, useValue: breakpoints }
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule {
}