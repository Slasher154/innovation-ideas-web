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
        $('.wysiwyg').froalaEditor({
            height: 200,
            toolbarButtons: ['fullscreen', 'bold', 'italic', 'underline', 'strikeThrough', 'subscript',
                'superscript', 'fontFamily', 'fontSize', '|', 'color', 'inlineStyle',
                'paragraphStyle', '|', 'paragraphFormat', 'align', 'formatOL', 'formatUL', 'outdent',
                'indent', 'quote', 'insertHR', '-', 'insertLink', 'insertImage',
                'insertTable', 'undo', 'redo', 'clearFormatting', 'selectAll', 'html'],
            imageInsertButtons: ['imageByURL']
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
            contents: $('#contentInput').val(),
            revenue: $('#revenueInput').val(),
            market: $('#marketInput').val(),
            competency: $('#competencyInput').val(),
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