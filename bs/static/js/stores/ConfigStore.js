/**
 * Handles UI configuration
 */

var assign = require('object-assign');
var EventEmitter = require('events');

var Dispatcher = require('../dispatcher/Dispatcher');
var Const = require('../const/Const');

var settings = {
    showSuggestions: true,
    showAbstracts: true,
    layout: Const.layouts.GRID
};

var ConfigStore = assign({}, EventEmitter.prototype, {
    read: function() {
        return settings;
    },

    get: function(key) {
        return settings[key];
    },

    set: function(key, value) {
        settings[key] = value;
        this.emitChange();
    },

    addChangeListener: function(callback) {
        this.on(Const.flags.UPDATE, callback);
    },

    emitChange: function() {
        this.emit(Const.flags.UPDATE);
    }
});

/* respond to anything coming from the dispatcher */
Dispatcher.register(function(payload) {
    var action = payload.action;

    switch(action.actionType) {
    case Const.TOGGLE_SUGGESTIONS:
        settings.showSuggestions = !settings.showSuggestions;
        break;
    case Const.TOGGLE_ABSTRACTS:
        settings.showAbstracts = !settings.showAbstracts;
        break;
    case Const.TRIGGER_LAYOUT_CHANGE:
        if(action.newLayout == settings.layout)
            return true;
        settings.layout = action.newLayout;
        break;
    default:
        return true;
    }

    ConfigStore.emitChange();

    return true;
});

module.exports = ConfigStore;
