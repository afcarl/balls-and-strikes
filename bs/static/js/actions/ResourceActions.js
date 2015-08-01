/**
 * Actions that alter the library of resources
 */

var Dispatcher = require('../dispatcher/Dispatcher');
var Const = require('../const/Const');

var ResourceActions = {
    /* filter resources to those that match `query`.
       note: this could likely live on the store.
     */
    filterStore: function(query) {
        Dispatcher.handleViewAction({
            actionType: Const.FILTER_RESOURCES,
            query: query
        });
    }
};

module.exports = ResourceActions;
