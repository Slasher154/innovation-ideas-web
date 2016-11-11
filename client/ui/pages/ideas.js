/**
 * Created by thana on 11/2/2016.
 */

import { Ideas } from '../../../imports/api/ideas/ideas';
import { FlowRouter } from 'meteor/kadira:flow-router'

Template.ideas.viewmodel({
    onCreated() {
      Meteor.subscribe('allIdeas');
      Meteor.subscribe('user.names');
    },
    ideas() {
        return Ideas.find();
    },
    tableSettings() {
        return {
            collection: Ideas,
            fields: [
                {
                    key: 'title',
                    label: 'Title',
                    fn: function (value, object, key) {
                        let url = FlowRouter.path('ideaInDetail', { ideaId: object._id });
                        return new Spacebars.SafeString( '<a href="' + url + '">' + value + '</a>');
                    }
                },
                {
                  key: 'tags',
                  label: 'Tags',
                  fn: function (value, object, key) {
                      if(!value) {
                          return '';
                      }
                      return value.join(',');
                  }
                },
                {
                    key: 'createdBy',
                    label: 'Submitted by',
                    fn: function (value, object, key) {
                        let user = Meteor.users.findOne({ _id: value });
                        return user.fullName();
                    }
                },
                {
                    key: 'createdAt',
                    label: 'Date created',
                    fn: function (value, object, key) {
                        return moment(value).fromNow();
                    },
                },
                {
                    key: 'createdAt',
                    label: 'Date created',
                    hidden: true,
                    sortOrder: 0,
                    sortDirection: 'descending',
                }
            ],
        }
    }
});


