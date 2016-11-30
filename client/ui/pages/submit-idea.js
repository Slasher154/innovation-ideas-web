/**
 * Created by thana on 11/2/2016.
 */

import { FlowRouter } from 'meteor/kadira:flow-router';
import { Tags } from '../../../imports/api/tags/tags';

Template.submitIdea.viewmodel({
    onCreated() {
        Meteor.subscribe('allTags');
    },
    onRendered() {
        tinymce.init({
            selector: 'textarea.wysiwyg',
            skin_url: '/packages/teamon_tinymce/skins/lightgray',
            menubar: false,
            plugins: "link code table",
            toolbar: 'undo redo | bold italic underline | alignleft aligncenter alignright | bullist numlist | table code link',
        });
        $('.tag-selector').select2();
    },
    tags() {
        return _.pluck(Tags.find().fetch(), 'name');
    },
    selectedTag: '',
    contents: '',
    competency: '',
    market: '',
    revenue: '',
    title: '',
    submitForm(event) {
        event.preventDefault();
        let idea = {
            title: $('#titleInput').val(),
            tags: $('.tag-selector').val(),
            contents: tinyMCE.get('contentInput').getContent(),
            revenue: tinyMCE.get('revenueInput').getContent(),
            market: tinyMCE.get('marketInput').getContent(),
            competency: tinyMCE.get('competencyInput').getContent(),
        };
        Meteor.call('submit-idea', idea, function(error, result) {
            if(error) {
                Bert.alert(error.reason, 'danger', 'fixed-top');
            } else {
                // Navigate to the submitted idea page
                let ideaPage = FlowRouter.path('ideaInDetail', { ideaId: result });
                FlowRouter.go(ideaPage);
            }
        })
    }
});