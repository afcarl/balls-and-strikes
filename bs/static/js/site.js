var toggleSuggestions = function() {
    var suggestions = document.getElementsByClassName('suggestions');

    for(var i=0; i<=suggestions.length; ++i) {
        var el = suggestions[i];
        el.style.display = (el.style.display == 'none') ? 'block' : 'none';
    }
}
