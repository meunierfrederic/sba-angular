import {Directive, Input, OnInit} from "@angular/core";
import {FormGroup} from "@angular/forms";
import {Utils, MapOf} from "@sinequa/core/base";
import {ValidationDirective} from "@sinequa/core/validation";
import {Control} from "./advanced-models";

@Directive({
    selector: "[sq-advanced-form-validation]"
})
export class BsAdvancedFormValidation extends ValidationDirective implements OnInit {
    @Input("sq-advanced-form-validation") afvOptions: {form: FormGroup, config: Control};

    ngOnInit() {
        let config = this.afvOptions.config;
        let controlName = config.name || config.field;
        let errorMessages: MapOf<string> = {};
        if (this.afvOptions.config.validators) {
            for (let validator of config.validators) {
                if (validator.active && !!validator.errorMessage) {
                    errorMessages[validator.name || Utils.toLowerCase(validator.type)] = validator.errorMessage;
                }
            }
        }
        this.options = {
            form: this.afvOptions.form,
            controlName: controlName,
            errorMessages: errorMessages
        };
        super.ngOnInit();
    }
}