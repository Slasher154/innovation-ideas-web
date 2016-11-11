/**
 * Created by thana on 11/11/2016.
 */

import { Tags } from '../../imports/api/tags/tags';

Meteor.methods({
    'add-tag'(tag){
        check(tag, Object);
        return Tags.insert(tag);
    }
})