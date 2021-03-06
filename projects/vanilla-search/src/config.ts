import { FacetConfig } from '@sinequa/components/facet';

/**
 * This list is used by Hello Search to activate key features in the UI.
 * The order below determines the order of menus, buttons, facets, etc.
 */
export const FEATURES: string[] = [
    "recent-documents", 
    "recent-queries", 
    "saved-queries", 
    "baskets", 
    "labels", 
    "alerts", 
    "suggests"
];

export const FACETS: FacetConfig[] = [
    {
        name: "geo",
        title: "msg#facet.geo.title",
        type: "list",
        aggregation: "Geo",
        icon: "fas fa-globe-americas",
        showCount: true,
        searchable: true,
        allowExclude: true,
        allowOr: true,
        allowAnd: false
    },
    {
        name: "company",
        title: "msg#facet.company.title",
        type: "list",
        aggregation: "Company",
        icon: "fas fa-building",
        showCount: true,
        searchable: true,
        allowExclude: true,
        allowOr: true,
        allowAnd: false
    },
    {
        name: "person",
        title: "msg#facet.person.title",
        type: "list",
        aggregation: "Person",
        icon: "fas fa-user",
        showCount: true,
        searchable: true,
        allowExclude: true,
        allowOr: true,
        allowAnd: false
    },
    {
        name: "docformat",
        title: "msg#facet.docformat.title",
        type: "list",
        aggregation: "DocFormat",
        icon: "far fa-file-word",
        showCount: true,
        searchable: true,
        allowExclude: true,
        allowOr: true,
        allowAnd: false
    },
    {
        name: "modified",
        title: "msg#facet.modified.title",
        type: "list",
        aggregation: "Modified",
        icon: "fas fa-calendar-day",
        showCount: true,
        searchable: true,
        allowExclude: true,
        allowOr: true,
        allowAnd: false
    },
    {
        name: "size",
        title: "msg#facet.size.title",
        type: "list",
        aggregation: "Size",
        icon: "fas fa-sort-amount-up-alt",
        showCount: true,
        searchable: true,
        allowExclude: true,
        allowOr: true,
        allowAnd: false
    },
    {
        name: "documentlanguages",
        title: "msg#facet.documentlanguages.title",
        type: "list",
        aggregation: "DocumentLanguages",
        icon: "far fa-comment",
        showCount: true,
        searchable: true,
        allowExclude: true,
        allowOr: true,
        allowAnd: false
    },
    {
        name: "concepts",
        title: "msg#facet.concepts.title",
        type: "list",
        aggregation: "Concepts",
        icon: "fas fa-comment-dots",
        showCount: true,
        searchable: true,
        allowExclude: true,
        allowOr: true,
        allowAnd: false
    },
];

export const METADATA: string[] = [
    "authors", "docformat", "modified", "size", "treepath", "filename"
]