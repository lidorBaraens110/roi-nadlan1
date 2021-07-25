import React, { useState, useRef, useCallback, useEffect, useMemo } from 'react';
import Dropzone from 'react-dropzone';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { image64toCanvasRef, extractImageFileExtensionFromBase64, base64StringtoFile, downloadBase64File } from './functions';

const maxSize = 500000
const acceptedFileTypes = 'image/x-png,image/png,image/jpg,image/jpeg,image/gif';
const acceptedFileTypesArray = acceptedFileTypes.split(',').map(item => { return item.trim() })



const DropAndCrop = ({ handleCropImg }) => {

    const [imgSrc, setImgSrc] = useState(null);
    const imagePreviewCanvasRef = useRef();
    const [imgExt, setImgExt] = useState();
    const [crop, setCrop] = useState({
        aspect: 3 / 2,
        width: 90,
        height: 60
        //use can choose x,y,width,height initial and heightMax,heightMin,widthMax,widthMin
    });


    const verifyType = useMemo(() => (files) => {
        if (files && files.length > 0) {
            const currentFile = files[0];
            const currentFileType = currentFile.type;
            const currentFileSize = currentFile.size;
            if (currentFileSize > maxSize) {
                alert('this file is too big')
                return false
            }
            if (!acceptedFileTypesArray.includes(currentFileType)) {
                alert("this file type is incorrect,only images are allowed")
                return false
            }
            return true
        }
    }, [])
    const handleDrop = useMemo(() => (files, rejectedFiles) => {
        //  console.log(files)
        //  console.log('reject file', rejectedFiles);
        if (rejectedFiles && rejectedFiles[0]) {
            verifyType(rejectedFiles)
        }
        if (files && files.length > 0) {
            const isVerify = verifyType(files)
            if (isVerify) {
                ///imageBase64Data
                const currentFile = files[0];
                const reader = new FileReader();
                reader.addEventListener('load', () => {

                    //console.log(reader.result)
                    const myResult = reader.result
                    setImgSrc(myResult);
                    setImgExt(extractImageFileExtensionFromBase64(myResult))
                }, false)

                reader.readAsDataURL(currentFile)
            }
        }
    }, [])
    const handleImageLoaded = (image) => {
    }
    const handleCrop = (crop) => {
        console.log(crop)
        setCrop(crop)
    }

    const handleComplete = useMemo(() => (crop, pixelCrop) => {
        console.log(crop)
        console.log(pixelCrop)
        // console.log(imgSrc)
        const canvasRef = imagePreviewCanvasRef.current;
        const imageSource = imgSrc;
        console.log('happen');
        image64toCanvasRef(canvasRef, imageSource, pixelCrop)
    }, [crop])

    const handleDownload = useMemo(() => (e) => {
        e.preventDefault();
        console.log('handleDownload')
        const imageSource = imgSrc;
        if (imageSource) {
            const canvasRef = imagePreviewCanvasRef.current;

            const theImgExt = imgExt;

            const fileExtension = extractImageFileExtensionFromBase64(imgSrc);

            const imageData64 = canvasRef.toDataURL('image/' + theImgExt)

            const myFileName = "preview file." + fileExtension

            // file to be uploaded 
            console.log('ready to upload')
            const myNewCroppedFile = base64StringtoFile(imageData64, myFileName);
            handleCropImg(myNewCroppedFile)
            //  uploadTheImage(myNewCroppedFile);

            // // download file
            // if (type === 'download') {
            //     downloadBase64File(imageData64, myFileName)
            // }
        }
    }, [handleCropImg, imgSrc])

    const clear = () => {
        setImgSrc();
        setImgExt();
    }
    useEffect(() => {
        console.log('drop and crop')
    }, [imgSrc, imagePreviewCanvasRef, imgExt, crop, verifyType, handleDrop, handleDownload])
    return (
        <div >
            <h3>העלה תמונה ראשית</h3>
            {imgSrc ? <div style={{ margin: '0 5%' }}>


                <ReactCrop maxHeight={10000000} src={imgSrc} crop={crop} onChange={handleCrop} onImageLoaded={handleImageLoaded} onComplete={handleComplete} />
                <br />
                <p>תצוגה מקדימה</p>
                <canvas style={{ height: '200px', width: '300px' }} ref={imagePreviewCanvasRef} />
                <br />
                <button onClick={e => handleDownload(e)}>העלה תמונה</button>
                <button onClick={clear}>ערוך תמונה ראשית אחרת</button>
            </div>

                :
                <Dropzone multiple={false} accept={acceptedFileTypes} maxSize={maxSize} onDrop={handleDrop}>
                    {({ getRootProps, getInputProps }) => (
                        <section>
                            <div style={{ height: '10rem', width: '20rem', textAlign: 'center', border: '1px black dashed' }} {...getRootProps()}>
                                <input {...getInputProps()} />
                                <p style={{ fontSize: '5rem' }}>+</p>
                            </div>
                        </section>
                    )}
                </Dropzone>
            }
        </div>
    )
}

export default DropAndCrop;