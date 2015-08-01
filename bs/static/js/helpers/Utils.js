/**
 * Special case helpers
 */

var get_category_key = function(category) {
    return 'c-' + category.slug;
}

var get_resource_key = function(resource) {
    return 'r-' + resource.slug;
}

var anchor = function(key) {
    return '#' + key;
}

module.exports = {
    anchor: anchor,
    get_resource_key: get_resource_key,
    get_category_key: get_category_key
};
