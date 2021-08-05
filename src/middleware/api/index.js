const axios = require('axios');

export default {

    get: (options) => {
        return axios.get(`http://localhost:4000/${options.entity}`)
            .then(response => {
                // handle success
                return response.data.result.profiles;
            })
            .catch(error => {
                // handle error
                console.error(error);
            })
    },

    create: options => {
        return axios.post(`http://localhost:4000/${options.entity}`, options.profile)
            .then(response => {
                // handle success
                return response.data.result.profiles;
            })
            .catch(error => {
                // handle error
                console.error(error);
            })
    },

    remove: options => {
        return axios.delete(`http://localhost:4000/${options.entity}/${options.profileId}`)
            .then(response => {
                // handle success
                return response.data.result.profiles;
            })
            .catch(error => {
                // handle error
                console.error(error);
            })
    },

    update: options => {
        return axios.put(`http://localhost:4000/${options.entity}/${options.profileId}`,  options.profile)
            .then(response => {
                // handle success
                return response.data.result.profiles;
            })
            .catch(error => {
                // handle error
                console.error(error);
            })
    },


    getProfileById: options => {
        // debugger
        // let arr = await get({entity :table});
        // return arr.find(function (profile) {
        //     return profile.id == id;
        return axios.get(`http://localhost:4000/${options.entity}/${options.profileId}`)
            .then(response => {
                // const profile = response.data.result[0]; // data way

                return response.data.result[0];
            })
    },

    // getProfileById: function (table, id) {
    //     return axios.get(`http://localhost:4000/${table}/${id}`)
    //         .then(response => {
    //             const profile = response.data.result[0]; // data way
    //             debugger
b    //             return profile;
    //         })
    // },


}
