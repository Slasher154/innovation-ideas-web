/**
 * Created by thana on 11/2/2016.
 */

import { Ideas } from '../../imports/api/ideas/ideas';

Meteor.methods({
    'submit-idea'(idea){
        check(idea, Object);
        return Ideas.insert(idea);
    }
})