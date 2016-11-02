/**
 * Created by thana on 11/2/2016.
 */
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Ideas } from '../../../imports/api/ideas/ideas';
/*
Template.ideaInDetail.viewmodel({
    onCreated(){
        let viewingIdeaId = FlowRouter.getParam('ideaId');

        this.autorun(() => {
            this.subscribe('singleIdea', viewingIdeaId);
        });
        Meteor.subscribe('singleIdea', viewingIdeaId);
    },
    idea(){
        return Ideas.findOne();
    },
    title() {
        return this.idea().title;
    },
    contents() {
        return this.idea().contents;
    }
});
*/

Template.ideaInDetail.onCreated(function() {
    let self = this;
    self.getListId = () => FlowRouter.getParam('ideaId');
    console.log(self.getListId());
    self.sub = Meteor.subscribe('singleIdea', self.getListId());
});

Template.ideaInDetail.onRendered(function() {
    let self = this;
    self.autorun(() => {
        if(self.sub.ready()) {
            let idea = Ideas.findOne({ _id: self.getListId() });
            let ideaOwner = Meteor.users.findOne({ _id: idea.createdBy }).fullName();
            $('.credit').html('Submitted by ' + ideaOwner + ' -- ' + moment(idea.createdAt).fromNow());
            $('.title').html(idea.title);
            $('.contents').html(idea.contents);
            $('.revenue').html(idea.market);
            $('.market').html(idea.market);
            $('.competency').html(idea.competency);
        }
    })
});

