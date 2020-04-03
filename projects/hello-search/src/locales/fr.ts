import { LocaleData } from "@sinequa/core/intl";
import d3Format from "d3-format/locale/fr-FR.json";
import d3Time from "d3-time-format/locale/fr-FR.json";
import { frCore } from "@sinequa/core";
import "intl/locale-data/jsonp/fr-FR"; // Safari
import { Utils } from "@sinequa/core/base";

import { frFacet } from "@sinequa/components/facet";
import { frResult } from "@sinequa/components/result";
import { frSearch } from "@sinequa/components/search";
import { frSavedQueries } from "@sinequa/components/saved-queries";

let appMessages = {

    locale: {
        en: "English",
        fr: "Français",
        de: "Allemand",
    },

    app: {
        login: "Login",
        logout: "Logout",
    },

    search: {
        button: "Chercher",
        placeholder: "Termes de recherche...",
        clear: "Effacer"
    },

    results: {
        resultsAllTab: "Tous",
        tabPeople: "Personnes",
        tabBusiness: "Entreprises",
        tabLocation: "Lieux"
    },
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
    messages: Utils.merge({}, frCore, frFacet, frResult, frSearch, frSavedQueries, appMessages)
};