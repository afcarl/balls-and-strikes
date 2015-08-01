/**
 * Come here to stream and filter categories and resources.
 */

var flux = require('flux');
var assign = require('object-assign');
var EventEmitter = require('events');
var _ = require('underscore');

var Const = require('../const/Const');
var Dispatcher = require('../dispatcher/Dispatcher');

/* shallow ref to the data, later filtered
   and streamed out by the store */
_data  = window.__tree__;

/* map of filters, field => [value [value, ...]] */
_filters = {};

var filterLibrary = function(query_filters, library) {
    if( _(query_filters).isEmpty() )
        return _data;

    /* normalize query text */
    _( _(query_filters).keys() ).forEach(function(key) {
        query_filters[key] = query_filters[key].toLowerCase();
    });

    var out = [];

    /* HACK: for now, we only care about `resource.title` */
    query = query_filters['title']

    library.forEach(function(category) {
        var newCategory = _.omit(category, 'resources', 'children');
        var resources = [];
        var children = [];

        if(category.name.toLowerCase().indexOf(query) != -1) {
            out.push(category);
            return;
        }

        category.resources.forEach(function(res) {
            if(res.title.toLowerCase().indexOf(query) != -1)
                resources.push(res);
        });

        if(category.children.length > 0)
            children = filterLibrary(query_filters, category.children);

        newCategory = _(newCategory).extend({
            resources: resources,
            children: children
        });

        if(newCategory.resources.length > 0 || newCategory.children.length > 0)
            out.push(newCategory);
    });

    return out;
}

var ResourceStore = assign({}, EventEmitter.prototype, {
    getAll: function() {
        if(!_filters['title'])
            return _data;

        /* filter, stream back out */
        return filterLibrary(_filters, _data);
    },

    setFilter: function(query) {
        /* HACK: hard-coded "title" query */
        _filters['title'] = query;
        this.emitChange();
    },

    addChangeListener: function(callback) {
        this.on(Const.flags.UPDATE, callback);
    },

    emitChange: function() {
        this.emit(Const.flags.UPDATE);
    }
});

module.exports = ResourceStore;
