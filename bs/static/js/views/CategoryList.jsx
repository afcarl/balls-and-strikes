/**
 * Renders the library as a nested list of categories and their resources
 */

var ConfigStore = require('../stores/ConfigStore');


var CategoryListItem = React.createClass({
    render: function() {
        var rows = this.props.category.resources.map(function(resource) {
            var abstract;

            if(ConfigStore.get('showAbstracts')) {
                abstract = <span dangerouslySetInnerHTML={{__html:" &mdash; " + resource.abstract}} />;
            }

            return (
                <li className="resource">
                    <a href={resource.url} target="_blank">
                        <strong>{resource.title}</strong>
                    </a>
                    {abstract}
                </li>
            );
        });

        var children = this.props.category.children.map(function(subcategory) {
            return <CategoryListItem category={subcategory} />;
        });

        var header;
        if(this.props.category.level == 0) {
            header = <h3>{this.props.category.name}</h3>;
        } else {
            header = <h4>{this.props.category.name}</h4>;
        }

        var table;
        if(rows.length > 0 || children.length > 0) {
            table = (
                <ul className="resource-set-container">
                    {rows.length > 0 ? rows : ''}
                    {children.length > 0 ? children : ''}
                </ul>
            )
        };

        return (
            <li className="category-container">
                {header}
                {table}
            </li>
        );
    }
});

/* renders a list view of categories and their resources */
var CategoryList = React.createClass({
    render: function() {
        var tables = [];
        
        this.props.library.forEach(function(category) {
            tables.push(<CategoryListItem category={category} />);
        });

        return (
            <div className="col-md-8 col-md-offset-2">
                <ul className="list-unstyled">{tables}</ul>
            </div>
        );
    }
});

module.exports = CategoryList;
