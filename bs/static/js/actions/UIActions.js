/**
 * Actions which mutate the UI
 */

var Const = require('../const/Const');
var Dispatcher = require('../dispatcher/Dispatcher');

var UIActions = {
    toggleSuggestions: function() {
        Dispatcher.handleViewAction({
            actionType: Const.TOGGLE_SUGGESTIONS
        });
    },

    toggleAbstracts: function() {
        Dispatcher.handleViewAction({
            actionType: Const.TOGGLE_ABSTRACTS
        });
    },

    changeLayout: function(newLayout) {
        Dispatcher.handleViewAction({
            actionType: Const.TRIGGER_LAYOUT_CHANGE,
            newLayout: newLayout
        })
    }
};

module.exports = UIActions;
