/**
 * Created by thana on 11/11/2016.
 */

import { Tags } from './tags.js';

Meteor.publish('allTags', function () {
    return Tags.find({}, {
        sort: {
            name: 1,
        },
    });
});