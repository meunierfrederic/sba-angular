import { Component, OnInit } from '@angular/core';
import { AppService } from '@sinequa/core/app-utils';
import { SearchService } from '@sinequa/components/search';
import { IntlService, Locale } from '@sinequa/core/intl';
import { ModalService } from '@sinequa/core/modal';
import { SavedQueriesService, RecentQueriesService } from '@sinequa/components/saved-queries';
import { Action } from '@sinequa/components/action';
import { Record } from '@sinequa/core/web-services';
import { Preview } from '../preview';
import { LoginService } from '@sinequa/core/login';
import { UIService } from '@sinequa/components/utils';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  languageActions: Action[];
  _showFacet: boolean = false;

  constructor(
    public appService: AppService,
    public loginService: LoginService,
    public searchService: SearchService,
    public intlService: IntlService,
    public modalService: ModalService,
    public savedQueriesService: SavedQueriesService,
    public recentQueriesService: RecentQueriesService,
    public ui: UIService,
  ) //
  {

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

  get showFacet(): boolean {
    return this.ui.screenSizeIsGreaterOrEqual('lg') || this._showFacet;
  }

  openDocument(record: Record) {
    this.modalService.open(Preview, { model: record, fullscreen: true });
    return false;
  }
}
