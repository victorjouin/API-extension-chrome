import { Meteor } from 'meteor/meteor';
import Projects from '../collections/Projects';



Meteor.methods({
  'createProject' : function(projectInfo) {
    return Projects.insert({
        title : projectInfo.title ?? '',
        description : projectInfo.description ?? '',
        type : projectInfo.type ?? '',
        domain : projectInfo.domain ?? '',                        
        userFirstName : projectInfo.userFirstName ?? "",
        userLastName : projectInfo.userLastName ?? "",
        userMail : projectInfo.userMail ?? "",
        userTel : projectInfo.userTel ?? "",
        userSituation : projectInfo.userSituation ?? "",
        termAndCondition : projectInfo.termAndCondition ?? false,
        nextActionDate : new Date().toLocaleString('fr-FR'),
        status : 'Nouveau',
    })
    /*} else {
        console.log("can't create Project with no account")
        return -1
    }*/
  },

  removeProjectById(id){
    if (Projects.find({_id : id}).fetch().length>0){
      return Projects.remove({
        _id:id
      })
    } else {
      console.log("can't sup Project"+id+" : not found")
      return -1
    }
  },

  updateProjectInfoById(id, newProjectInfo) {
      if (Projects.find({_id : id}).fetch().length > 0){
            return Projects.update(
                {
                    _id:id
                },
                {
                    $set : {
                        title : newProjectInfo.title ?? '',
                        description : newProjectInfo.description ?? '',
                        type : newProjectInfo.type ?? '',
                        domain : newProjectInfo.domain ?? '',
                    }
                }
            )
        } else {
            console.log("can't update project infos"+id+" : not found // try to create one")
            return Meteor.call('createProject', newProjectInfo)
        }
    },
  updateProjectUserInfoById(id, newProjectUserInfo) {
        if (Projects.find({_id : id}).fetch().length > 0){
            return Projects.update(
                {
                    _id:id
                },
                {
                    $set : {
                        userFirstName : newProjectUserInfo.userFirstName ?? "",
                        userLastName : newProjectUserInfo.userLastName ?? "",
                        userMail : newProjectUserInfo.userMail ?? "",
                        userTel : newProjectUserInfo.userTel ?? "",
                        userSituation : newProjectUserInfo.userSituation ?? "",
                        termAndCondition : newProjectUserInfo.termAndCondition ?? false,
                    }
                }
            )
        } else {
            console.log("can't update project user infos"+id+" : not found")
            return -1
        }
    },
  updateProjectFinancementInfoById(id, newProjectUserInfo) {
        if (Projects.find({_id : id}).fetch().length > 0){
            return Projects.update(
                {
                    _id:id
                },
                {
                    $set : {
                        financementOption : newProjectUserInfo.financementOption ?? "",
                        previsionalFinancement : newProjectUserInfo.previsionalFinancement ?? "",
                    }
                }
            )
        } else {
            console.log("can't update project user infos"+id+" : not found")
            return -1
        }
    },
  updateProjectSucceedInfoById(id, newProjectUserInfo) {
        if (Projects.find({_id : id}).fetch().length > 0){
            return Projects.update(
                {
                    _id:id
                },
                {
                    $set : {
                        succeedQuestion1A : newProjectUserInfo.succeedQuestion1A ?? "",
                        succeedQuestion1B : newProjectUserInfo.succeedQuestion1B ?? "",
                        succeedQuestion1C : newProjectUserInfo.succeedQuestion1C ?? "",
                        succeedQuestion1D : newProjectUserInfo.succeedQuestion1D ?? "",
                        succeedQuestion1E : newProjectUserInfo.succeedQuestion1E ?? "",
                        succeedQuestion1F : newProjectUserInfo.succeedQuestion1F ?? "",
                        succeedQuestion1G : newProjectUserInfo.succeedQuestion1G ?? "",
                        succeedQuestion1H : newProjectUserInfo.succeedQuestion1H ?? "",
                    }
                }
            )
        } else {
            console.log("can't update project user infos"+id+" : not found")
            return -1
        }
    },
    updateProjectSucceedChartById(id, newProjectUserInfo) {
          if (Projects.find({_id : id}).fetch().length > 0){
              return Projects.update(
                  {
                      _id:id
                  },
                  {
                      $set : {
                          legitimite : newProjectUserInfo.legitimite ?? [0,0,0,0],
                          legitimitePrecision : newProjectUserInfo.legitimitePrecision ?? "",
                          desirabilite : newProjectUserInfo.desirabilite ?? [0,0,0,0],
                          desirabilitePrecision : newProjectUserInfo.desirabilitePrecision ?? "",
                          acceptabilite : newProjectUserInfo.acceptabilite ?? [0,0],
                          acceptabilitePrecision : newProjectUserInfo.acceptabilitePrecision ?? "",
                          faisabilite : newProjectUserInfo.faisabilite ?? [0],
                          faisabilitePrecision : newProjectUserInfo.faisabilitePrecision ?? "",
                          viabilite : newProjectUserInfo.viabilite ?? [0,0,0],
                          viabilitePrecision : newProjectUserInfo.viabilitePrecision ?? "",
                      }
                  }
              )
          } else {
              console.log("can't update project user infos"+id+" : not found")
              return -1
          }
      },
})