import '../imports/api/fixtures'
import '../imports/api/methods'
import '../imports/api/publications'
import { Meteor } from 'meteor/meteor';
import url from 'url';
import Projects from '../imports/api/collections/Projects'
import Links from '../imports/api/collections/Links';
import { WebApp } from 'meteor/webapp'



const MongoClient = require("mongodb").MongoClient;

var mongo = require('mongodb');
// get param



WebApp.connectHandlers.use('/link4d8e64AA856HGE496568efd89d86', (req, res, next) => {
    var actions = 0;
    if (req.method === 'GET') {
        const queryParams = url.parse(req.url, true).query;
        if (queryParams.lastname1 && queryParams.email1) {
            actions = 1;
            console.log('Query Params = ', queryParams.lastname1, queryParams.email1, queryParams.tel1, queryParams.state1, queryParams.url, queryParams.url_title, queryParams.url_desc);
            res.setHeader('Content-Type', 'application/json');
            res.setHeader("Access-Control-Allow-Origin", "*");
            res.writeHead(200);
            res.end(JSON.stringify({ lastname: queryParams.lastname1, email: queryParams.email1, tel: queryParams.tel1, status: queryParams.state1, adresse: queryParams.url, url_des: queryParams.url_desc, url_titre: queryParams.url_title }))

            console.log("test");
            var opport = Projects.findOne({ userLastName: queryParams.lastname1, userTel: queryParams.tel1 })
            console.log(opport);
            if (queryParams.url_desc) {
                Links.insert({
                    title: opport.title ?? '',
                    opportunity_id: opport._id ?? '',
                    nextActionDate: opport.nextActionDate ?? '',
                    description: opport.description ?? '',
                    lastname: queryParams.lastname1 ?? '',
                    email: queryParams.email1 ?? '',
                    tel: queryParams.tel1 ?? '',
                    state: queryParams.state1 ?? '',
                    adresse: queryParams.url ?? '',
                    url_titre: queryParams.url_title ?? '',
                    url_desc: queryParams.url_desc ?? ''
                });
            }
            Projects.update({ userMail: queryParams.email1 }, {
                $set: {
                    title: queryParams.title ?? '',
                    status: queryParams.state1 ?? '',
                    type: queryParams.type ?? '',
                    previsionalFinancement: queryParams.price ?? '',
                    userSituation: this.userSituation ?? ''
                }
            })
        }
        if (actions == 0) {
            res.setHeader('Content-Type', 'application/json');
            res.setHeader("Access-Control-Allow-Origin", "*");
            res.writeHead(200);
            res.write(JSON.stringify(Links.find().fetch()));
            Links.find({})
            res.end();
        }
    }
    else {
        res.writeHead(400);;
        res.end('https pas supporté');
    }
});



WebApp.connectHandlers.use('/projectsA7465D84desrefee7e9e86', (req, res, next) => {
    var actions = 0;
    if (req.method === 'GET') {
        const queryParams = url.parse(req.url, true).query;
        if (queryParams.lastname1 && queryParams.email1) {
            actions = 1;
            console.log('Query Params = ', queryParams.lastname1, queryParams.email1, queryParams.tel1, queryParams.state1, queryParams.url);
            res.setHeader('Content-Type', 'application/json');
            res.setHeader("Access-Control-Allow-Origin", "*");

            res.writeHead(200);
            res.end(JSON.stringify({ lastname: queryParams.lastname1, email: queryParams.email1, tel: queryParams.tel1, state: queryParams.state1, adresse: queryParams.url }))

            //insert
            var opport = Projects.findOne({ userLastName: queryParams.lastname1, userTel: queryParams.tel1 })

            Links.insert({
                opportunity_id: opport._id ?? '',
                title: opport.title ?? '',
                nextActionDate: opport.nextActionDate ?? '',
                description: opport.description ?? '',
                lastname: queryParams.lastname1 ?? '',
                email: queryParams.email1 ?? '',
                tel: queryParams.tel1 ?? '',
                state: queryParams.state1 ?? '',
                adresse: queryParams.url ?? ''
            });
        }


        if (queryParams.name && queryParams.email) {
            actions = 1
            console.log('Query Params = ', queryParams.name, queryParams.firstname, queryParams.tel, queryParams.email, queryParams.adresse);
            res.setHeader('Content-Type', 'application/json');
            res.setHeader("Access-Control-Allow-Origin", "*");
            res.writeHead(200);
            res.end(JSON.stringify({ name: queryParams.name, firstname: queryParams.firstname, tel: queryParams.tel, email: queryParams.email, adresse: queryParams.adresse }))

            //insert

            Projects.insert({
                userFirstName: queryParams.firstname ?? '',
                userLastName: queryParams.name ?? '',
                userMail: queryParams.email ?? '',
                userTel: queryParams.tel ?? '',
                userSituation: this.userSituation ?? ''
            });
        }
        //get the collection

        if (actions == 0) {
            res.setHeader("Access-Control-Allow-Origin", "*");
            res.setHeader('Content-Type', 'application/json');
            res.writeHead(200);
            res.write(JSON.stringify(Projects.find().fetch()));
            Projects.find({})
            Links.find({})
            res.end();
        }
    }
    else {
        res.writeHead(400);;
        res.end('https pas supporté');
    }
});