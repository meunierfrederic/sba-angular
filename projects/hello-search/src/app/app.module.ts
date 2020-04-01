import { NgModule/*, APP_INITIALIZER*/ } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from '@angular/router';
import { LocationStrategy, HashLocationStrategy } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { WebServicesModule, StartConfigWebService, StartConfig } from "@sinequa/core/web-services";
import { LoginModule } from "@sinequa/core/login";
import { IntlModule } from "@sinequa/core/intl";
import { ModalModule } from "@sinequa/core/modal";
import { DefaultLocalesConfig } from "@sinequa/core";

import { BsSearchModule } from '@sinequa/components/search';
import { BsFacetModule } from '@sinequa/components/facet';
import { BsActionModule } from '@sinequa/components/action';
import { BsAutocompleteModule } from '@sinequa/components/autocomplete';
import { BsPreviewModule } from '@sinequa/components/preview';
import { BsModalModule } from '@sinequa/components/modal';

import { AppComponent } from "./app.component";
import {AutocompleteCustom} from "./autocomplete-custom.directive";
import { environment } from "../environments/environment";
import { Preview } from './preview';

import { LocalesConfig, Locale, LocaleData } from "@sinequa/core/intl";
import enLocale from "../locales/en";
import frLocale from "../locales/fr";

import { Observable, from } from 'rxjs';


export class AppLocalesConfig implements LocalesConfig {
    locales: Locale[] = [
        { name: "en", display: "msg#locale.en", data: enLocale },
        { name: "fr", display: "msg#locale.fr", data: frLocale },
        { name: "de", display: "msg#locale.de" },
    ];
    defaultLocale: Locale = this.locales[0];

    loadLocale(locale: string): Observable<LocaleData> {
        console.warn("Loading locale: " + locale);
        return from(import('../locales/' + locale).then(m => m.default));
    }
}

export function StartConfigInitializer(startConfigWebService: StartConfigWebService): () => Promise<StartConfig> {
    const init = () => startConfigWebService.fetchPreLoginAppConfig().toPromise();
    return init;
}

export const startConfig: StartConfig = {
    app: "training",
    autoSAMLProvider: "identity-dev",
    production: environment.production,
    auditEnabled: true
};

@NgModule({
    imports: [
        BrowserModule,
        RouterModule.forRoot([]),
        FormsModule,
        ReactiveFormsModule,

        WebServicesModule.forRoot(startConfig),
        IntlModule.forRoot(AppLocalesConfig),
        LoginModule.forRoot(), // Just use default login modal
        ModalModule.forRoot(),
        BsSearchModule.forRoot({ routes: [""] }),
        BsFacetModule,
        BsActionModule,
        BsAutocompleteModule,
        BsPreviewModule,
        BsModalModule,
    ],
    declarations: [
        AppComponent,
        AutocompleteCustom,
        Preview,
    ],
    providers: [
        // {provide: APP_INITIALIZER, useFactory: StartConfigInitializer, deps: [StartConfigWebService], multi: true}, 
        { provide: LocationStrategy, useClass: HashLocationStrategy },
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule {
}