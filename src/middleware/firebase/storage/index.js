import firebaseInstance from '../'
import storage from 'firebase/storage';

export default {
    // uploadPhoto: ( obj,img,path, imgData) => {
    //     debugger
    //     let uploadValue = 0;
    //     const storageRef = firebaseInstance.firebase.storage().ref(path).child(`${imgData.name}`).put(imgData);
    //     storageRef.on(`state_changed`, snapshot => {
    //             uploadValue = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    //         }, error => {
    //             console.log(error.message)
    //         },
    //         () => {
    //             uploadValue = 100;
    //             storageRef.snapshot.ref.getDownloadURL().then((url) => {
    //
    //                 console.log(url);
    //                 obj[img] = url;
    //
    //
    //                 // console.log(img)
    //                 // this.Insert();
    //             });
    //         }
    //     );
    // }

    uploadPhoto: options => {
        const storageRef = firebaseInstance.firebase.storage().ref(`${options.entity}/${options.file.name}`)
        return storageRef.put(options.file).then((snapshot) => {
            return storageRef.getDownloadURL().then(url => {
                return url;
            })
        })
    }

}