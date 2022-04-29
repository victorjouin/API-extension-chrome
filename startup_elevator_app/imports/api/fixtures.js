import { Meteor } from 'meteor/meteor';
import Links from './collections/Links.js';
import AppTextFr from './collections/AppDataFr';

Meteor.startup(() => {
  // if the Links collection is empty
  if (AppTextFr.find().count() === 0) {
    //TODO : mettre la valeur par défaut
    AppTextFr.insert({
      landingPage : {
        homeSection : {
          title : "Financez & développez votre projet avec un <b>expert de la tech</b>",
          subtitleFirstPart : "Du développement d’App, au marketing et au design de votre service.",
          subtitleSecondPart : "Un accompagnement de A à Z avec votre expert Startup-Elevator.",
          videoId : "/assets/vid/StartupElevatorTrailer.webm",
          buttonText : "Démarrer mon projet"
        },
        accompaniementSection : {
          title : "Accompagnement de projet innovant",
          firstPartIcon :"mdi-rocket-launch-outline",
          firstPartHtml :"&nbsp;Pour démarrer votre projet, vous avez besoin de Développeurs, Designers, Marketeurs digitaux, et surtout d’un marché !",
          secondPartIcon :"mdi-account-tie",
          secondPartHtml :"&nbsp;Startup Elevator vous accompagne dans toutes ces étapes. Nos experts accompagnent votre entreprise en création dans de multiples domaines : e- commerce, commerce physique, e-santé, Fin Tech, Green Tech, SporTech, IA & Big Data.",
          thirdPartIcon :"mdi-auto-fix",
          thirdPartHtml :"&nbsp;Bénéficiez des meilleurs experts de la Tech, pour améliorer votre business-modèle grâce à une méthode d’innovation révolutionnaire : le design thinking. L’accompagnement est fait pour moitié de tutorat personnel et d’ateliers en groupe.",
        },
        autoEvaluationSection : {
          title : "Evaluez vous-même la solidité de votre idée",
          textData :"&nbsp; En 30 minutes auto-évaluez la viabilité de votre innovation.<br><br>&nbsp; Vous venez d'avoir une idée innovante d'app, de commerce . Vous n'osez pas contacter un incubateur, un développeur.                 <br>&nbsp; Vous vous demandez par où commencer ?<br>&nbsp; Laissez-vous guider et évaluez vous-même les chances de réussite de votre projet.<br>&nbsp; Une fois votre projet validé, n'hésitez pas à nous solliciter pour un accompagnement plus poussé.",
          imgPath : "/assets/img/evaluation-projet-innovant-startup-elevator.webp",
          buttonText : "J'évalue mon idée en 30 min"
        },
        financementSection : {
          title : "Un financement simple de votre projet",
          subtitle :"&nbsp; Votre expert Startup Elevator vous accompagne pour obtenir votre financement.",
          buttonSelectionDescription : "&nbsp; Estimation de vos droits à la formation réalisée à partir de vos années de travail en entreprise :"
        },
        progressionSection : {
          title : "Les étapes de votre projet",
          subtitle :"&nbsp;Partenaire des entrepreneurs en France, Startup Elevator propose un accompagnement complet qui permet de réussir votre projet digital, il se décompose en quatre étapes :",
          steps: [
              {
                  title: 'Définir son projet et le challenger avec un Expert',
                  text: "L’évènement original : gratuit, ouvert à tous et organisé tous les trimestres. Vous confrontez votre idée, vous vous faites challenger par des experts et obtenez un maximum de feedbacks sur votre projet. Commencer dès aujourd'hui par une auto-évaluation en ligne.",
                  buttonText: "Je m'inscris",
              },
              {
                  title: 'Rencontrez votre binôme',
                  text: "Innover seul n'est jamais une bonne idée! Choisissez votre binome par affinitée dans votre région. Affinez et mettez en pratique vos idées en collaborant avec un autre innovateur.",
                  buttonText: undefined,
              },
              {
                  title: 'Designer un service utile à vos utilisateurs',
                  text: "Notre équipe d’experts vous accompagne ‘hors des sentiers battus’ dans la création de services & produits digitaux innovants.",
                  buttonText: undefined,
              },
              {
                  title: 'Lancer son App !',
                  text: "Créons un prototype POC et testons le avec des utilisateurs cibles, pour confirmer l'adéquation de votre produit avec les besoins du marché.",
                  buttonText: undefined,
              },
          ],
        },
        offersSection : {
          title : "Nos Offres",
          offers : [
            { 
              name : "START",
              duration : "7h",
              img : "/assets/img/paperplane.svg",
              features : [
                "Organiser la connaissance du service/app",
                "Confronter votre vision aux experts du terrain",
                "Capturer les problématiques clients",
                "Lister les raisons d’échec de votre projet",
                "Trouver les concordances entre les objectifs de vos clients et de votre d’entreprise",
              ],
              initialPrice : 1440,
            },
            { 
              name : "BOOST",
              duration : "14h",
              img: "/assets/img/airplane.svg",
              features : [
                "Option START",
                "Organiser vos innovations préexistantes",
                "Générer de nouvelles idées liées aux problématiques clients",
                "Réaliser le story-board de la solution",
              ],
              initialPrice : 2400,
            },
            { 
              name : "ACCELERATION",
              duration : "18h",
              img :"/assets/img/aeroplane.svg",
              features : [
                "Option BOOST",
                "Réaliser le story-board de la solution qui maximise les chances de réussite",
                "Les besoins pour créer une App",
                "Creer son prototype / POC",
                "Tester son POC"
              ],
              initialPrice : 3200,
            },

          ],
          buttonText : "Choisir"
        },
        regionSection : {
          title : "Un réseau d'entrepreneurs et d'experts",
          subtitleFirstPart :"&nbsp; Pour réussir votre projet, collaborez avec d'autres entrepreneurs dans votre région sur Paris, Lyon, Bordeaux, ... . Notre matching vous permet de rencontrer un autre entrepreneur, pour faire avancer votre projet en binôme et créer des synergies. Discutez autour d'un café avec d'autres innovateurs, sortez de vos schémas de pensée et de l'isolement.",
          subtitleSecondPart : "Faites équipe avec d'autres innovateurs dans votre région",
        },
        ourCompanySection : {
          title : "Des experts certifiés",
          subtitle :"&nbsp;Nos experts certifiés vous accompagnent pour transformer votre idée en projet à succès ! Ils développent avec vous et vos usagers des offres qui apportent de la valeur ajoutée à vos clients et collaborateurs.",
          videoId : "1rsPygCRHDA",
          buttonText : "Contactez-nous"
        },
        contactSection : {
          title : "J’accompagne des projets",
          subtitle :"&nbsp;Vous accompagnez des projets, vous êtes directeur d’innovation. N’hésitez pas à nous contacter pour toute question. <b style='color : primary'><a target='_blank' href='https://tooap.com/'>Contact accompagnateurs</a></b>",
        },

            
      },
    })
  }
  if (Links.find().count() === 0) {
    const data = [
      {
        title: 'Do the Tutorial',
        url: 'https://www.meteor.com/try',
        createdAt: new Date(),
      },
      {
        title: 'Follow the Guide',
        url: 'http://guide.meteor.com',
        createdAt: new Date(),
      },
      {
        title: 'Read the Docs',
        url: 'https://docs.meteor.com',
        createdAt: new Date(),
      },
      {
        title: 'Discussions',
        url: 'https://forums.meteor.com',
        createdAt: new Date(),
      },
    ];

    data.forEach(link => Links.insert(link));
  }
});
