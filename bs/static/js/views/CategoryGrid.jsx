/**
 * Resource display UI
 */

var strftime = require('strftime');

var Utils = require('../helpers/Utils');

var ConfigStore = require('../stores/ConfigStore');


/* collection of in-category jump-to links */
var JumpLinks = React.createClass({
    render: function() {
        var links = [];

        this.props.links.forEach(function(category) {
            var key = Utils.get_category_key(category);

            links.push(
                <li key={"jmp-" + key}>
                    <a href={Utils.anchor(key)}>{category.name}</a>
                </li>
            );
        });

        return (
            <div className="jump-links text-center">
                <ul className="list-inline">
                    {links}
                </ul>
            </div>
        )
    }
});

var SuggestedCell = React.createClass({
    render: function() {
        var suggested = [];

        this.props.resources.forEach(function(resource) {
            var key = Utils.get_resource_key(resource);

            suggested.push(
                <li key={"sug-" + key}>
                    <a href={Utils.anchor(key)}>{resource.title}</a>
                </li>
            );
        })

        return (
            <div className="suggestions">
                <div className="text-center">
                    <em>See also...</em>
                </div>

                <ul className="related list-unstyled text-center">
                    {suggested}
                </ul>
            </div>
        );
    }
});

var PubCredit = React.createClass({
    render: function() {
        var fmtd_time;

        if(this.props.pubAt)
            fmtd_time = strftime('%e %b. %Y', new Date(this.props.pubAt));

        var sep = (this.props.authorName && this.props.pubAt) ? '; ' : '';

        return (
            <span className="by">
                <small>({this.props.authorName}{sep}{fmtd_time})</small>
            </span>
        );
    }
});

var ResourceCell = React.createClass({
    render: function() {
        var key = Utils.get_resource_key(this.props.resource);
        var suggestions;
        var abstract;
        var pub_credit;
 
        /* do we want to show abstract? */
        if(ConfigStore.get('showAbstracts')) {
            abstract = <span className="abstract"
                             dangerouslySetInnerHTML={{__html: " &mdash; " + this.props.resource.abstract}} />;
        }

        /* do we want to show suggestions? */
        if(ConfigStore.get('showSuggestions')
               && this.props.resource.suggestions.length > 0) {
                   suggestions = <SuggestedCell resources={this.props.resource.suggestions} />;
        }

        if(this.props.resource.author_name || this.props.resource.pub_at) {
            pub_credit = <PubCredit authorName={this.props.resource.author_name}
                                    pubAt={this.props.resource.pub_at} />;
        }
        
        return (
            <li className="resource">
                <p>
                    <a target="_blank" id={key}
                       href={this.props.resource.url}><strong>{this.props.resource.title}</strong></a>
                    {abstract}
                    {pub_credit}
                </p>

                {suggestions}
            </li>
        );
    }
});

var Category = React.createClass({
    render: function() {
        var root = this.props.category.level == 0;

        /* build abstract */
        var abstract;
        if(this.props.category.abstract) {
            abstract = (<p className="text"
                           dangerouslySetInnerHTML={{__html:this.props.category.abstract}} />);
        }

        /* build cells */
        var cells = [];
        this.props.category.resources.forEach(function(resource) {
            cells.push(<ResourceCell key={resource.id} resource={resource} />);
        });

        var children = [];
        var jumplinks = [];
        this.props.category.children.forEach(function(subcategory) {
            if(subcategory.resources.length > 0)
                children.push(<Category key={subcategory.id} category={subcategory} />);
            if(this.props.category.level == 0) {
                jumplinks.push(subcategory);
            }
        }.bind(this));

        var header;
        if(root)
            header = <h3>{this.props.category.name}</h3>;
        else {
            var key = Utils.get_category_key(this.props.category);

            header = (
                <h4 className="text-center">
                    <a id={key} href={Utils.anchor(key)}>{this.props.category.name}</a>
                </h4>
            );
        }

        return (
            <div className={root ? "col-md-4" : ""}>
                <div className="section-header">
                    {header}
                    {abstract ? abstract : null}
                    {(jumplinks.length > 0) ? <JumpLinks links={jumplinks} /> : ''}
                </div>

                {cells.length > 0 ? <ul className="list-unstyled">{cells}</ul> : null}

                {children}
            </div>
        )
    }
});

/* renders categories into grids, one column per category */
var CategoryGrid = React.createClass({
    render: function() {
        var columns = [];

        this.props.library.forEach(function(category) {
            columns.push(
                <Category key={"col-" + Utils.get_category_key(category)} category={category} />
            );
        });

        return <div>{columns}</div>;
    }
});

module.exports = CategoryGrid;
