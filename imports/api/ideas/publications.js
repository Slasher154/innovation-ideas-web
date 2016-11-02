/**
 * Created by thana on 11/2/2016.
 */

import { Ideas } from './ideas.js';

Meteor.publish('allIdeas', function () {
    return Ideas.find({},{
        fields: {
            title: 1,
            createdBy: 1,
            createdAt: 1,
        },
        sort: {
            createdAt: -1,
        },
    });
});
/*
Meteor.publish('singleIdea', function(ideaId) {
    check(ideaId, String);
    return Ideas.find({
        _id: ideaId,
    });
});
    */
Meteor.publishComposite('singleIdea', function(ideaId) {
    check(ideaId, String);
    return {
        find: function() {
            return Ideas.find({
                _id: ideaId,
            });
        },
        children: [
            {
                find: function(idea) {
                    return Meteor.users.find({
                        _id: idea.createdBy,
                    })
                }
            }
        ]
    }
});