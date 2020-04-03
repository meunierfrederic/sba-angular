import { Component } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { AppService } from '@sinequa/core/app-utils';
import { SearchService } from '@sinequa/components/search';
import { LoginService } from '@sinequa/core/login';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss']
})
export class SearchFormComponent {
  searchControl: FormControl;
  form: FormGroup;

  constructor(
    protected formBuilder: FormBuilder,
    public loginService: LoginService,
    public appService: AppService,
    public searchService: SearchService) {
    
    this.searchControl = new FormControl();
    this.form = this.formBuilder.group({
        search: this.searchControl
    });

    this.searchService.queryStream.subscribe({
        next: (query) => {
            this.searchControl.setValue((query && query.text) || '');
        }
    });

  }

  search() {
    this.searchService.clearQuery();
    this.searchService.query.text = this.searchControl.value || '';
    this.searchService.searchText("/search");
  }

  clear() {
      this.searchService.clear();
      this.searchControl.setValue("");
  }

}