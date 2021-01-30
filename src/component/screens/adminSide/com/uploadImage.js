// import React, { useState, useEffect } from 'react';
// import HighlightOffIcon from '@material-ui/icons/HighlightOff';
// import firebase, { storage } from '../../../../firebase';
// import { makeStyles } from '@material-ui/core/styles';
// import { Icon, IconButton, List, DialogActions, TextField, Input, Button, Dialog, DialogContent, DialogTitle, Grid } from '@material-ui/core';
// import { useHistory } from 'react-router-dom';
// import { useFirebase } from 'react-redux-firebase';
// import { useSelector } from 'react-redux';
// import Dropzone from 'react-dropzone';
// import { map } from 'lodash';

// const filesPath = 'uploadedFiles';

// const UploadImage = () => {

//     const firebase = useFirebase()
//     //const uploadedFiles = useSelector(({ firebase: { data } }) => data[filesPath])
//     const [success, setSuccess] = useState(false)
//     const onFilesDrop = async (files) => {
//         console.log(uploadedFiles)
//         console.log(files);
//         await firebase.uploadFiles(filesPath, files, filesPath).then(() => setSuccess(true))
//     }
//     function onFileDelete(file, key) {
//         return firebase.deleteFile(file.fullPath, `${filesPath}/${key}`)
//     }
//     return (
//         <>
//             <Dropzone onDrop={onFilesDrop}>
//                 {({ getRootProps, getInputProps }) => (
//                     <section>
//                         <div {...getRootProps()}>
//                             <input {...getInputProps()} />
//                             <p>Drag 'n' drop some files here, or click to select files</p>
//                         </div>
//                     </section>
//                 )}
//             </Dropzone>
//             <span>asjdlkasflk</span>
//             {uploadedFiles && (
//                 <div>

//                     <h3>Uploaded file(s):</h3>
//                     {map(uploadedFiles, (file, key) => (
//                         <div key={file.name + key}>
//                             <span>{file.name}</span>
//                             <button onClick={() => onFileDelete(file, key)}>
//                                 Delete File
//       </button>
//                         </div>
//                     ))}
//                 </div>)}
//         </>
//     )
// }
// export default UploadImage