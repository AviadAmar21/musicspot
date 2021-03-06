import database from "../../middleware/firebase/database";

export default {

    getProfiles: async ({commit}) => {

        const profiles = await database.get({entity: 'profiles'})

        commit('setProfiles', profiles);
    },

    deleteProfile: async ({state, commit}) => {

        await database.remove({entity: 'profiles', profileId: state.editedProfileId});

        const profileId = state.editedProfileId;

        commit('resetEditedProfileId'); // reset id value after use

        commit('deleteProfile', profileId);


    },

    updateProfile: async ({state, commit}) => {
        const profile = {};

        Object.assign(profile, state.editedProfile);
        await database.update({entity: 'profiles', profileId: state.editedProfileId, profile});

        commit('resetEditedProfile');

        commit('resetEditedProfileId');

        commit('editProfile', profile);
    },

    insertProfile: async ({state, commit}) => {

        const profile = {};

        Object.assign(profile, state.editedProfile);

        profile.userId = window.user.uid;
        profile.id = (await database.create({entity: 'profiles', profile})).key;

        commit('resetEditedProfile');

        commit('insertProfile', profile);
    },

    setEditProfileById: async ({state, commit}) => {

        let profile = {};

        if (state.profiles.length && state.profiles.find(profile => profile.id === state.editedProfileId)) {
            profile = state.profiles.find(profile => profile.id === state.editedProfileId);
        } else {
            profile = await database.getProfileById({entity: 'profiles' , profileId : state.editedProfileId})
        }

        commit('setEditedProfile', profile);

    }


}
