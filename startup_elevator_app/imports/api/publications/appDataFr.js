import { Meteor } from 'meteor/meteor';
import AppDataFr from '../collections/AppDataFr';

Meteor.publish('appdatafr.landingpage', function () {
    return AppDataFr.find({landingPage : { $exists : true} })
});