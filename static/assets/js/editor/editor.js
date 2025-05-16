// Quill Editor
var ListItem = Quill.import('formats/list/item');

class PlainListItem extends ListItem {
    formatAt(index, length, name, value) {
        if (name === 'list') {
        // Allow changing or removing list format
        super.formatAt(name, value);
        }
        // Otherwise ignore
    }
}

Quill.register(PlainListItem, true);

// Initialize as you would normally
var quill = new Quill('#editor', {
    modules: {
        toolbar: true,
    },
    theme: 'snow'
});


// Simplemde Editor
var simplemde = new SimpleMDE({ element: $("#simplemde-editor")[0] });