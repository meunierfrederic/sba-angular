import { Directive, ElementRef } from '@angular/core';
import { Autocomplete, SuggestService, AutocompleteItem } from '@sinequa/components/autocomplete';
import { AppService } from '@sinequa/core/app-utils';
import { UIService } from '@sinequa/components/utils';
import { Utils } from '@sinequa/core/base';
import { RecentQueriesService, RecentQuery } from '@sinequa/components/saved-queries';
import { Observable, forkJoin, from } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Directive({
    selector: "[sqAutocompleteCustom]"
})
export class AutocompleteCustom extends Autocomplete {

    constructor(
        elementRef: ElementRef,
        suggestService: SuggestService,
        appService: AppService,
        uiService: UIService,
        protected recentQueriesService: RecentQueriesService) {
        super(elementRef, suggestService, appService, uiService);
    }

    /**
     * This method overrides the Autocomplete.getSuggests() method from the sqAutocomplete directive.
     * Rather than only getting suggests from the server via the SuggestService, this directive also
     * searches for matches in the recent queries
     */
    protected getSuggests() {
        let value = this.getInputValue();
        if (value) { // If there is text, make a call to the suggest API
            let parseResult = this.parseQuery(); // If using fieldSearch, the result can be used to detect an active field
            let fields: string[] | undefined;
            if (parseResult.result && this.fieldSearch) {
                let position = this.getInputPosition(); // Position of the caret, if needed
                let res = parseResult.result.findValue(position);
                // Field Search suggest
                if (!!res && !!res.field) {
                    fields = Utils.startsWith(res.field, "@") ? ["text"] : [res.field];
                    value = res.value;
                }
            }

            // Methods returning (observable of) suggestions from different sources

            let dataSources: Observable<AutocompleteItem[]>[] = [
                from(this.searchRecentQueries(value)),
                this.suggestService.get(this.suggestQuery, value, fields)
            ]

            this.processSuggests(
                // The forkJoin method allows to merge the suggestions into a single array, so the parent
                // directive only sees a single source.
                forkJoin(...dataSources).pipe(
                    map((suggests) => {
                        return [].concat(...suggests);
                    }),
                    catchError((err, caught) => {
                        console.error(err);
                        return [];
                    })
                ), fields);

        }
        else {  // If empty input, restart autocomplete
            this.start();
        }
    }

    /**
     * Search for the input text in the recent queries and return autocomplete items asynchronously
     * @param text
     */
    searchRecentQueries(text: string): Promise<AutocompleteItem[]> {
        return this.suggestService.searchData<RecentQuery>(
            'recent-query',
            text,
            this.recentQueriesService.recentqueries,
            (query) => query.query.text || '',
            undefined,
            "msg#search.recentQuery");
    }

}