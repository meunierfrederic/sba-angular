import { LocaleData } from "@sinequa/core/intl";
import d3Format from "d3-format/locale/fr-FR.json";
import d3Time from "d3-time-format/locale/fr-FR.json";
import { frCore } from "@sinequa/core";
import "intl/locale-data/jsonp/fr-FR"; // Safari
import { Utils } from "@sinequa/core/base";

import { frFacet } from "@sinequa/components/facet";
import { frResult } from "@sinequa/components/result";
import { frSearch } from "@sinequa/components/search";

let appMessages = {

    locale: {
        en: "Anglais",
        fr: 'Français',
    },

    results: {
        resultsAllTab: "Tous",
        tabPeople: "Personnes",
        tabBusiness: "Organisations",
        tabLocation: "Lieux"
    },

    search: {
        button: "Chercher",
        placeholder: "Termes de recherche...",
        clear: "Effacer",
    },

    facet:{
        loadMore:"Plus d'items..."
    }

}

export default <LocaleData>{
    intl: {
        locale: "fr-FR"
    },
    d3: {
        locale: "fr-FR",
        format: d3Format,
        time: d3Time
    },
    messages: Utils.merge({}, frCore, frFacet, frResult, frSearch, appMessages)
};
