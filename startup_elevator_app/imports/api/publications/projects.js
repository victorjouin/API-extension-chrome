import { Meteor } from 'meteor/meteor';
import Projects from '../collections/Projects';

Meteor.publish('projects', function (projectId) {
    if (projectId && projectId != ''){
        return Projects.find({ _id: projectId });
    }
    return []
});