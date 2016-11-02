/**
 * Created by thana on 11/2/2016.
 */

export const Ideas = new Mongo.Collection('ideas');

Ideas.before.insert((userId, doc) => {
    doc.createdAt = Date.now();
    doc.createdBy = userId;
});