
// import { useFirebase } from 'react-redux-firebase';

const s4 = () => {
    return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
}

const uniqueId = () => {
    return s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + '-' + s4() + '-' + s4();
}

// const UploadImage = (e) => {
//     let path;
//     let url;
//     const { name } = e.target;
//     const file = e.target.files[0]
//     const imageId = uniqueId();
//     useFirebase().uploadFile(`images/`, file, 'mainImages', {
//         name: imageId
//     }).then((res) => {
//         path = res.uploadTaskSnapshot.ref.fullPath;
//         url = res.uploadTaskSnapshot.ref.fullPath
//     }).catch(err => console.log(err))
//     return { path, url }
// }

export { uniqueId }