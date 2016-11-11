/**
 * Created by thana on 11/11/2016.
 */

Template.addTags.viewmodel({
    addTag(event) {
        event.preventDefault();
        let name = $('#tag').val();
        if (!name) {
            Bert.alert('Tag cannot be blank', 'danger', 'fixed-top');
        }
        else {
            let tag = {
                name: name,
            };
            Meteor.call('add-tag', tag, function(error, result) {
                if(error) {
                    Bert.alert(error.reason, 'danger', 'fixed-top');
                } else {
                    // Navigate to the submitted idea page
                    Bert.alert(name + ' tag is added', 'success', 'fixed-top');
                    $('#tag').val('');
                }
            });
        }

    }
});