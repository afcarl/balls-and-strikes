/**
 * UI Configuration panel
 */

var Const = require('../const/Const');

var ConfigStore = require('../stores/ConfigStore');
var ResourceStore = require('../stores/ResourceStore');

var UIActions = require('../actions/UIActions');


var LayoutControl = React.createClass({
    triggerGridLayout: function(evt) {
        evt.preventDefault();
        UIActions.changeLayout(Const.layouts.GRID);
    },

    triggerTableLayout: function(evt) {
        evt.preventDefault();
        UIActions.changeLayout(Const.layouts.TABLE);
    },

    getInitialState: function() {
        return {
            active: ConfigStore.get('layout')
        }
    },

    onUpdate: function() {
        this.setState({
            active: ConfigStore.get('layout')
        });
    },

    componentWillMount: function() {
        ConfigStore.addChangeListener(this.onUpdate);
    },

    render: function() {
        return (
            <div className={"layout-controls btn-group"}>
                <button className={"btn btn-sm btn-default " + (this.state.active == Const.layouts.GRID ? "active" : "")}
                        onClick={this.triggerGridLayout}>
                    <em className="icon-th-1"></em>
                </button>
                <button className={"btn btn-sm btn-default " + (this.state.active == Const.layouts.TABLE ? "active" : "")}
                        onClick={this.triggerTableLayout}>
                    <em className="icon-th-list-1"></em>
                </button>
            </div>
        );
    }
});

var Filter = React.createClass({
    onChange: function(evt) {
        var query = this.refs.q.getDOMNode().value;
        ResourceStore.setFilter(query);
    },

    render: function() {
        return (
            <input type="text" ref="q" name="q"
                   autocomplete={"off"}
                   onChange={this.onChange}
                   className={"form-control input-sm"}
                   placeholder="Search Content" />
        )
    }
});


var SuggestionToggle = React.createClass({
    /* toggles the config's "show suggestions" state */
    onClick: function() {
        UIActions.toggleSuggestions();
    },

    /* responds to an update */
    onUpdate: function() {
        /* re-read suggestion configuration from config */
        this.setState({
            enabled: ConfigStore.get('showSuggestions')
        });
    },

    componentWillMount: function() {
        ConfigStore.addChangeListener(this.onUpdate);
    },

    getInitialState: function() {
        return {
            showSuggestions: ConfigStore.get('showSuggestions')
        }
    },

    render: function() {
        return (
            <label className="checkbox-inline">
                <input ref="showRelated"
                       type="checkbox"
                       defaultChecked={this.state.showSuggestions}
                       onClick={this.onClick} />
                Related Content
            </label>
        );
    }
});

var AbstractToggle = React.createClass({
    /* toggles the config's "show suggestions" state */
    onClick: function() {
        UIActions.toggleAbstracts();
    },

    /* responds to an update */
    onUpdate: function() {
        /* re-read suggestion configuration from config */
        this.setState({
            enabled: ConfigStore.get('showAbstracts')
        });
    },

    componentWillMount: function() {
        ConfigStore.addChangeListener(this.onUpdate);
    },

    getInitialState: function() {
        return {
            showAbstracts: ConfigStore.get('showAbstracts')
        }
    },

    render: function() {
        return (
            <label className="checkbox-inline">
                <input type="checkbox"
                       name="showAbstracts"
                       ref="showAbstracts"
                       defaultChecked={this.state.showAbstracts}
                       onClick={this.onClick} />
                Descriptions
            </label>
        )
    }
});

var ConfigPanel = React.createClass({
    render: function() {
        return (
            <div id="config" className="row">
                <div className="col-md-6 col-md-offset-3 text-center">
                    <div><Filter /></div>
                    <ul className="list-inline">
                        <li><AbstractToggle /></li>
                        <li><SuggestionToggle /></li>
                    </ul>
                </div>
                <div className="col-md-3 text-right">
                    <LayoutControl />
                </div>
            </div>
        );
    }
});

module.exports = ConfigPanel;
