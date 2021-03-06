import { LocaleData } from "@sinequa/core/intl";
import d3Format from "d3-format/locale/en-US.json";
import d3Time from "d3-time-format/locale/en-US.json";
import { enCore } from "@sinequa/core";
import "intl/locale-data/jsonp/en-US"; // Safari
import { Utils } from "@sinequa/core/base";

import { enFacet } from "@sinequa/components/facet";
import { enResult } from "@sinequa/components/result";
import { enSearch } from "@sinequa/components/search";

let appMessages = {

    locale: {
        en: "Englisch",
        fr: 'Französisch',
        de: 'Deutsch',
    },

    results: {
        resultsAllTab: "All",
        tabPeople: "People",
        tabBusiness: "Companies",
        tabLocation: "Places"
    },

    search: {
        button: "Search",
        placeholder: "Enter search terms...",
        clear: "Clear",
        recentQuery: "Recent Query",
    },

    facet: {
        loadMore: "Load more items..."
    }

}

export default <LocaleData>{
    intl: {
        locale: "en-US"
    },
    d3: {
        locale: "en-US",
        format: d3Format,
        time: d3Time
    },
    messages: Utils.merge({}, enCore, enFacet, enResult, enSearch, appMessages)
};
