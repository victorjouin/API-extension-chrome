import { Meteor } from 'meteor/meteor';
import Logs from '../collections/Logs';

Meteor.methods({
    'upsertLog' : function(clientUrl, currentProjectId) {
        let clientAddress = this.connection.httpHeaders['x-forwarded-for']
        var myLog = Logs.findOne({clientIp : clientAddress})
        if (myLog) {
            if (myLog.logs.length > 9999) {
                Logs.update(
                    myLog._id, 
                    {
                        $pop : { 
                            logs : -1
                        }
                    }
                )       
            }
            Logs.update(
                myLog._id, 
                {
                    $push : { 
                        logs : {
                            currentClientUrl : clientUrl, 
                            updatedDate : new Date().toLocaleString('fr-FR')
                        }
                    },
                    $set : {
                        projectId : currentProjectId ?? ""
                    }
                }
            )       
        } else {
            Logs.insert(
                {
                    clientIp : clientAddress,
                    projectId : currentProjectId ?? "",
                    logs : [ 
                        {
                            currentClientUrl : clientUrl, 
                            updatedDate : new Date().toLocaleString('fr-FR')
                        },
                    ]
                }
            )
        }
    }
})