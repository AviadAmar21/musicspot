export default {

    searchProfile: state => search =>
        state.profiles.filter(profile => {
            return profile.name.match(search) || profile.specialties.match(search) || profile.about.match(search) ||
            profile.age === search || profile.price === search || profile.exper === search
        })

}



// filterdProfiles: function () {
//     return this.data.filter((profile, key) => {
//         return profile.name.match(this.search) || profile.specialties.match(this.search) || profile.about.match(this.search) ||
//             profile.age === this.search || profile.price === this.search || profile.exper === this.search
//
//     });
// }