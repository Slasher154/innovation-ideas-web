/**
 * Created by thana on 11/11/2016.
 */

export const Tags = new Mongo.Collection('tags');

Tags.before.insert((userId, doc) => {
    doc.createdAt = Date.now();
    doc.createdBy = userId;
});