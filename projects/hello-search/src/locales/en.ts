import {LocaleData} from "@sinequa/core/intl";
import d3Format from "d3-format/locale/en-US.json";
import d3Time from "d3-time-format/locale/en-US.json";
import {enCore} from "@sinequa/core"; 
import "intl/locale-data/jsonp/en-US"; // Safari
import {Utils} from "@sinequa/core/base";

import {enFacet} from "@sinequa/components/facet";
import {enResult} from "@sinequa/components/result";
import {enSearch} from "@sinequa/components/search";
import {enSavedQueries} from "@sinequa/components/saved-queries";

let appMessages = {
    
    locale: {
        en: "English",
        fr: "French",
        de: "German",
    },

    app: {
        login: "Login",
        logout: "Logout",
    },

    search: {
        button: "Search",
        placeholder: "Enter search terms...",
        clear: "Clear"
    },
    
    facet: {
        loadMore: "Gimme more data, please!"
    },
        
    results: {
        resultsAllTab: "All",
        tabPeople: "People",
        tabBusiness: "Companies",
        tabLocation: "Places"
    },
}

export default <LocaleData> {
    intl: {
        locale: "en-US"
    },
    d3: {
        locale: "en-US",
        format: d3Format,
        time: d3Time 
    },
    messages: Utils.merge({}, enCore, enFacet, enResult, enSearch, enSavedQueries, appMessages)
};