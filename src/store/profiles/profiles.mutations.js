export default {

    setProfiles: ((state, profiles) => state.profiles = profiles),

    setEditedProfileId: ((state, id) => state.editedProfileId = id),

    setEditedProfile: ((state, profile) => state.editedProfile = profile),

    resetEditedProfileId: ((state) => state.editedProfileId = ''),

    changeEditedProfileById: ((state, id) => {
        state.editedProfile = state.profiles.filter(profile => profile.id === id);
    }),

    resetEditedProfile: ((state) => {

        for (const key in state.editedProfile) {
            if (typeof (state.editedProfile[key]) === 'string') {
                state.editedProfile[key] = '';
            } else if (typeof (state.editedProfile[key]) === 'number') {
                state.editedProfile[key] = 0;
            } else if (typeof (state.editedProfile[key]) === 'object') {
                if (state.editedProfile[key].length) {// check if value is array
                    state.editedProfile[key] = [];
                } else {
                    state.editedProfile[key] = {};

                }
            }
        }

        delete state.editedProfileId;
    }),

    editProfile: ((state, profile) => {
        const index = state.profiles.findIndex(p => p.id === profile.id);
        state.profiles.splice(index, 1, profile); // replace previous obj with new editedObj (after changes in data)
    }),

    deleteProfile: ((state, profile) => {
        const index = state.profiles.findIndex(p => p.id === profile.id);
        state.profiles.splice(index, 1); // delete obj from store

    }),

    insertProfile: ((state, profile) => {
        state.profiles.push(profile);
    }),

    setUserLogIn: ((state,val) => {
        state.isLogIn = val;
    })


}
