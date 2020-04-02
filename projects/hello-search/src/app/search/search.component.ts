import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { AppService } from '@sinequa/core/app-utils';
import { SearchService } from '@sinequa/components/search';
import { IntlService, Locale } from '@sinequa/core/intl';
import { ModalService } from '@sinequa/core/modal';
import { SavedQueriesService, RecentQueriesService } from '@sinequa/components/saved-queries';
import { Action } from '@sinequa/components/action';
import { Record } from '@sinequa/core/web-services';
import { Preview } from '../preview';
import { LoginService } from '@sinequa/core/login';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  searchControl: FormControl;
  form: FormGroup;
  languageActions: Action[];

  constructor(
    protected formBuilder: FormBuilder,
    public appService: AppService,
    public searchService: SearchService,
    public loginService: LoginService,
    public intlService: IntlService,
    public modalService: ModalService,
    public savedQueriesService: SavedQueriesService,
    public recentQueriesService: RecentQueriesService,
  ) //
  {
    this.searchControl = new FormControl("");
    this.form = this.formBuilder.group({
      search: this.searchControl
    });

    this.searchService.queryStream.subscribe({
      next: (query) => {
        this.searchControl.setValue((query && query.text) || '');
      }
    });

    // Create one action (button) for each language
    this.languageActions = this.intlService.locales.map(locale =>
      new Action({
        text: locale.display,   // "French"
        data: locale,   // French locale
        selected: locale === this.intlService.currentLocale, // If this is the current locale
        action: (item: Action, $event: UIEvent) => {    // On click, switch to this language
          this.intlService.use((item.data as Locale).name).subscribe(
            (value) => this.languageActions.forEach(a => a.update()));
        },
        updater: (action) => {  // Update the status of buttons
          action.selected = action.data === this.intlService.currentLocale;
        }
      })
    );
  }

  ngOnInit(): void {
  }

  login() {
    this.loginService.login();
  }

  logout() {
    this.loginService.logout();
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

  openDocument(record: Record) {
    this.modalService.open(Preview, { model: record, fullscreen: true });
    return false;
  }
}
