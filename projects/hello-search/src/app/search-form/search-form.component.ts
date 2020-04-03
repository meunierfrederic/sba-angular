import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { SearchService } from '@sinequa/components/search';
import { LoginService } from '@sinequa/core/login';
import { AppService } from '@sinequa/core/app-utils';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss']
})
export class SearchFormComponent implements OnInit {

  searchControl: FormControl;
  form: FormGroup;

  constructor(
    public appService: AppService,
    protected formBuilder: FormBuilder,
    public loginService: LoginService,
    public searchService: SearchService,
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

  }

  ngOnInit(): void {
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
