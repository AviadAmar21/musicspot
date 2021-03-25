

export default {

    dbInsert: function (table,profile)
    {
        //insert profile to database

        profile.id = new Date().getTime();
        var arr = this.dbSelect(table);

        if (arr == null){

            arr = [];
        }

        arr.push(profile);
        localStorage.setItem(table,JSON.stringify(arr));
    } ,

    dbSelect : function (table)
    {
        //select profiles from database

        var res = localStorage.getItem(table);

        if (res == null){

            res = '[]';
        }

        return JSON.parse(res);
    } ,

    remove : function (table,id) {

    var arr = this.dbSelect(table);
    var index = this._getIndexById(table,id);
    // for (var i =0; i<arr.length && flag == 0; i++) {
    //     if (arr[i].id == id){
    //         arr.splice(i,1);
    //         flag = 1;
    //     }
    // }

    arr.splice(index,1);
    localStorage.setItem(table,JSON.stringify(arr));

    },

    update : function (table,id, profile) {

        var arr = this.dbSelect(table);
        var index = this._getIndexById(table,id);

        if (index == undefined) {
            return;
        }

        for (var key in profile) {
            if (profile[key]) {
                arr[index][key] = profile[key];
            }
        }

        localStorage.setItem(table,JSON.stringify(arr));




    } ,





    _getIndexById: function (table,id) {

        var arr = this.dbSelect(table);

        for (var i = 0 ;i<arr.length;i++ ) {
            if (arr[i].id == id) {
                return i;
            }
        }

        return undefined;
    },

    getProfileById: function (table,id) {

        var arr = this.dbSelect(table);
        return arr.find(function (profile) {
            return profile.id == id;
        })
    }



}














