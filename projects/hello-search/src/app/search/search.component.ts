import { Component } from "@angular/core";
import { Action } from '@sinequa/components/action';
import { IntlService, Locale } from '@sinequa/core/intl';
import { Record } from '@sinequa/core/web-services';
import { ModalService } from '@sinequa/core/modal';
import { Preview } from '../preview';
import { SavedQueriesService } from '@sinequa/components/saved-queries';
import { SearchService } from '@sinequa/components/search';
import { UIService } from '@sinequa/components/utils';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  languageActions: Action[];
  _showFacet: boolean = false;

  constructor(
    public intlService: IntlService,
    public modalService: ModalService,
    public savedQueriesService: SavedQueriesService,
    public searchService: SearchService, 
    public ui: UIService) {
        
    // Create one action (button) for each language
    this.languageActions = this.intlService.locales.map(locale =>
      new Action({
        text: locale.display,   // "French"
        data: locale,   // French locale
        selected: locale == this.intlService.currentLocale, // Whether French is the current locale
        action: (item: Action, $event: UIEvent) => {    // On click, switch to this language
          this.intlService.use((item.data as Locale).name).subscribe( 
            (value) => this.languageActions.forEach(a => a.update()));                
        },
        updater: (action) => {  // Update the status of buttons
          action.selected = action.data == this.intlService.currentLocale; 
        }
      })            
    );

  }

  openDocument(record: Record){
    this.modalService.open(Preview, {model: record, fullscreen: true});
    return false;
  }

  get showFacet(): boolean {
    return this.ui.screenSizeIsGreaterOrEqual('lg') || this._showFacet;
  }

}