import { Component, Inject } from "@angular/core";
import { Record } from '@sinequa/core/web-services';
import { MODAL_MODEL } from '@sinequa/core/modal';

import { PreviewService } from '@sinequa/components/preview';
import { SearchService } from '@sinequa/components/search';
import { SafeResourceUrl, DomSanitizer } from "@angular/platform-browser";
import { AppService } from '@sinequa/core/app-utils';

@Component({
    selector: "preview",
    template: `
    <sq-modal [title]="record.title" [showFooter]="false">
        <sq-preview-document-iframe *ngIf="url" [downloadUrl]="url"></sq-preview-document-iframe>
    </sq-modal>
    `
})
export class Preview {

    url: SafeResourceUrl; // URL of the HTML preview

    constructor(
        @Inject(MODAL_MODEL) public record: Record,
        previewService: PreviewService,
        searchService: SearchService,
        sanitizer: DomSanitizer,
        appService: AppService)//
    {

        previewService.getPreviewData(record.id, searchService.query).subscribe({
            next: (data) => {
                this.url = sanitizer.bypassSecurityTrustResourceUrl(
                    appService.updateUrlForCors(data.documentCachedContentUrl));
            }
        });
    }

}