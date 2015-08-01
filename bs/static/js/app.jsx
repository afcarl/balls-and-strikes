/**
 * Application entry point
 */

var Const = require('./const/Const');
var Dispatcher = require('./dispatcher/Dispatcher');
var Utils = require('./helpers/Utils');

var ResourceStore = require('./stores/ResourceStore');
var ConfigStore = require('./stores/ConfigStore');

var CategoryGrid = require('./views/CategoryGrid.jsx');
var CategoryList = require('./views/CategoryList.jsx');
var ConfigPanel = require('./views/ConfigPanel.jsx');


var getState = function() {
    return {
        library: ResourceStore.getAll(),
        layout: ConfigStore.get('layout')
    }
}

var App = React.createClass({
    getInitialState: function() {
        return getState();
    },

    componentWillMount: function() {
        /* listen to store changes */
        ResourceStore.addChangeListener(this.onUpdate);
        ConfigStore.addChangeListener(this.onUpdate);
    },

    onUpdate: function() {
        this.setState(getState());
    },

    render: function() {
        var view;
        
        /* set up category columns */
        if(this.state.layout == Const.layouts.GRID)
            view = <CategoryGrid library={this.state.library} />;
        else
            view = <CategoryList library={this.state.library} />;

        return (
            <div>
                <div className="row">
                    <div className="col-md-12">
                        <ConfigPanel />
                    </div>
                </div>

                <div className="row">
                    {view}
                </div>
            </div>
        )
    }
});

React.render(<App />, document.getElementById('app'));
