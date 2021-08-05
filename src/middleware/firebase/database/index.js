import firebaseInstance from '../'
import database from 'firebase/database';


export default {

    get: options => {
        debugger
        return firebaseInstance.firebase.database().ref(`${options.entity}/`).once('value')
            .then(res => {
                const arr = [];
                const map = res.val();
                for (const key in map) {
                    const item = map[key];
                    item.id = key;
                    arr.push(item);
                }
                if (options.entity === 'posts') {
                    return arr.reverse();
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
        debugger
        return firebaseInstance.firebase.database().ref(`${options.entity}/`).push(options.profile);
    },

    remove: options => {
        return firebaseInstance.firebase.database().ref(`${options.entity}/${options.profileId}`).remove();

    },

    update: options => {
        return firebaseInstance.firebase.database().ref(`${options.entity}/${options.profileId}`).update(options.profile);

    },

    getProfileById: options => {
        return firebaseInstance.firebase.database()
            .ref(`users/${window.user.uid}/data/${options.entity}/${options.profileId}`).once('value')
            .then(res => {
                return res.val();
            });
    },

    getProfile : options => {
        debugger
        return firebaseInstance.firebase.database().ref(`${options.entity}/`).once('value')
            .then(res => {
                const arr = [];
                const map = res.val();
                for (const key in map) {
                    const item = map[key];
                    item.id = key;
                    arr.push(item);
                }

                const profile = arr.filter(profile => profile.userId == options.uid)
                return profile[0];

            })
    },

    getRef: options => {
        return firebaseInstance.firebase.database().ref(`users/${window.user.uid}/data/${options.entity}`)
    },

}
