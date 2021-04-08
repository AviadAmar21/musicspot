import firebaseInstance from '../'
import database from 'firebase/database';


export default {

    get: options => {
        return firebaseInstance.firebase.database().ref(`${options.entity}/`).once('value')
            .then(res => {
                const arr = [];
                const map = res.val();
                for (const key in map) {
                    const item = map[key];
                    item.id = key;
                    arr.push(item);
                }

                return arr;
            })
    },

    getUsersProfiles : () => {
        return firebaseInstance.firebase.database().ref(`users/`).once('value')
            .then(res => {
                const arr = [];
                let profile = {};
                const map = res.val();
                for (const key in map) {
                    const item = map[key].data.profile; //todo: check this
                    for (const profileKey in item) {
                        profile.id = profileKey;
                        Object.assign(profile,item[profileKey]);
                        arr.push(profile);
                    }
                    profile = {};
                }

                return arr;
            })
    },


    create: options => {
        return firebaseInstance.firebase.database().ref(`${options.entity}/`).push(options.profile);
    },

    remove: options => {
        return firebaseInstance.firebase.database().ref(`${options.entity}/${options.profileId}`).remove();

    },

    update: options => {
        return firebaseInstance.firebase.database().ref(`${options.entity}/${options.profileId}`).update(options.profile);

    },


    getProfileById: options => {
        // debugger
        // let arr = await get({entity :table});
        // return arr.find(function (profile) {
        //     return profile.id == id;
        // let arr = this.get({options.entity   });
        // return firebaseInstance.firebase.database().ref(`users/${window.user.uid}/data/${options.entity}`).once('value')
        //     .then(res => {
        //         const arr = [];
        //         const map = res.val();
        //         for (const key in map) { // to do : make a serach by id like a normal person..
        //             const item = map[key];
        //             item.id = key;
        //             arr.push(item);
        //         } // to do : get arr like a normal person...
        //         for (let i = 0 ; i<arr.length;i++) {
        //             for (let key in arr[i]) {
        //                 if (arr[i].id == options.profileId) {
        //
        //                     return arr[i];
        //                 }
        //             }
        //         }
        //     })

        return firebaseInstance.firebase.database()
            .ref(`users/${window.user.uid}/data/${options.entity}/${options.profileId}`).once('value')
            .then(res => {
                return res.val();
            });


    },

    getRef: options => {
        return firebaseInstance.firebase.database().ref(`users/${window.user.uid}/data/${options.entity}`)
    },

    getUserIdByProfile : options => {
        return firebaseInstance.firebase.database().ref(`users/`).once('value')
            .then(res=> {

            })
    }


}