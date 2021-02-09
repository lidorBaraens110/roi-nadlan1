import React, { useRef, useState, useMemo, useEffect } from 'react';
import { TextareaAutosize } from '@material-ui/core';
import firebase, { storage } from '../../../../firebase';
import { useFirebase, } from 'react-redux-firebase';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Compressor from 'compressorjs';
import { uniqueId } from './functions';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'
import { Grid, TextField, Button, InputLabel, Select, FormControl, MenuItem, Card, FormGroup, CardHeader, CardContent, Typography } from '@material-ui/core';





const initial = {
    title: '',
    subTitle: '',
    mainImg: { url: '', fullPath: '' },
    content: '',
    createDate: new Date(),
    featureImage: '',
    isPublish: false,
    createUser: ''
}

const HandleArticle = ({ upload, theArticle }) => {


    const history = useHistory();

    const [article, setArticle] = useState(theArticle)



    const theFirebase = useFirebase();
    const quill = useRef();
    const [hasImageFeature, setHasImageFeature] = useState(false)


    useEffect(() => {
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();

        today = mm + '/' + dd + '/' + yyyy;
        setArticle(pre => { return { ...pre, createDate: today } })
    }, [])
    const fileCompress = (file) => {
        return new Promise((resolve, reject) => {
            new Compressor(file, {
                file: 'File',
                quality: 0.5,
                maxHeight: 320,
                maxWidth: 320,
                success(file) {
                    return resolve({
                        success: true,
                        file: file
                    })
                },
                error(err) {
                    return resolve({
                        success: false,
                        message: err.message
                    })
                }
            })
        })
    }
    const quillImageCallBack = (e) => {
        const input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/*');
        input.click();
        let downloadURL;


        input.onchange = async () => {
            const file = input.files[0];
            console.log(input)
            console.log(file)
            console.log('1')
            const compressState = await fileCompress(file)
            if (compressState.success) {
                console.log('2')
                const imageId = uniqueId()
                theFirebase.uploadFile('images', compressState.file, 'articleImages', {
                    documentId: (res, x, y, url) => {
                        downloadURL = url;
                        setArticle(preVal => {
                            return { ...preVal, featureImage: { url: url, path: res.ref.fullPath } }
                        })
                    }, name: imageId
                }).then(() => {
                    console.log('success')
                    let newQuill = quill.current.getEditor();
                    let range = newQuill.getSelection(true);
                    newQuill.insertEmbed(range.index, 'image', downloadURL)
                }).catch(err => console.log(err))
            } else (console.log(compressState.message))
        }
    }
    const formats = [
        'header',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        'link', 'image', 'direction'
    ]
    const modules = useMemo(() => ({
        toolbar: {
            container: [
                [{ 'header': [1, 2, false] }],
                ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
                [{ 'direction': 'rtl' }] // this is rtl support
                ,
                ['link', 'image'],
            ],
            handlers: {
                'image': () => quillImageCallBack(),
            }
        }, clipboard: {
            matchVisual: false
        }
    }), [])
    const handleChange = (e) => {
        const { name, value } = e.target;
        setArticle(preVal => {
            return { ...preVal, [name]: value }
        })
    }
    const handleChangeQuill = (e) => {
        setArticle(preVal => {
            return { ...preVal, content: e }
        })
    }

    const handleClick = () => {
        console.log(article.createDate)
    }
    const uploadImage = (e) => {
        const image = e.target.files[0]
        let lastPhotoPath;
        if (!upload) {
            if (article.img.fullPath) {
                lastPhotoPath = article.mainImg.fullPath;
            }
        }
        console.log(image)
        const imageId = uniqueId()
        theFirebase.uploadFile('images', image, 'articlesImage', {
            documentId: (res, x, y, url) => {
                setArticle((preVal) => {
                    return { ...preVal, mainImg: { url: url, fullPath: res.ref.fullPath } }
                })
            }, name: imageId
        }).then(() => {
            console.log('gj')
            setArticle(preVal => { return { ...preVal } })
        }).then(() => {
            if (!upload) {
                theFirebase.deleteFile(`${lastPhotoPath}`)
            }
        }).catch(err => console.log(err))
            .catch(err => {
                console.log(err)
            })
    }
    const handleUpload = () => {
        firebase.database().ref('/articles/' + article.id).set(article)
            .then(() => {
                setArticle(initial)
                setArticle(preValue => {
                    return { ...preValue, id: uniqueId() }
                })
                if (!upload) {
                    history.push('/login/articles');
                }
                console.log('we did it')
                alert('המאמר עלה בהצלחה')
                // setSuccessPopUp(true);
            })
            .catch(err => console.log(err))


    }


    return (
        <div style={{ textAlign: 'center', marginTop: '1rem' }}>
            <h3>{upload ? 'העלה מאמר' : 'ערוך מאמר'}</h3>
            <Grid
                spacing={5}
                container
                style={{ margin: 0, width: '100%', padding: '2rem', textAlign: 'right' }}
            >
                <Grid item xs={12} sm={12} md={9} lg={9} xl={9} >
                    <h2>מאמר חדש</h2>
                    <FormGroup dir='rtl'>
                        <span>כותרת</span>
                        <TextField label='כותרת' name='title' id='title' value={article.title} variant='outlined' type='text' onChange={handleChange} />
                    </FormGroup>
                    <FormGroup dir='rtl'>
                        <span>כיתוב מתחת לכותרת</span>
                        <TextareaAutosize required value={article.subTitle} rows={8} placeholder='תיאור' name='subTitle' onChange={handleChange} />
                    </FormGroup>
                    <br />
                    <FormGroup>
                        <ReactQuill ref={el => quill.current = el} formats={formats} theme='snow' modules={modules} id='content' value={article.content} onChange={handleChangeQuill} />
                    </FormGroup>
                    <br />
                    <TextField label='נכתב על ידי' name='createUser' id='createUser' value={article.createUser} variant='outlined' type='text' onChange={handleChange} />
                </Grid>
                <Grid item xs={12} sm={12} md={3} lg={3} xl={3} style={{ textAlign: 'center' }}>
                    <Card style={{ padding: '1rem' }}>
                        <CardHeader style={{ padding: '0' }} title='מצב המאמר' />
                        <hr />
                        <CardContent style={{ paddingTop: 0 }}>
                            <Typography>פה תוכלו לומר האם המאמר יתפרסם או לא יתפרסם</Typography>
                        </CardContent>
                        <FormControl >
                            <InputLabel id="demo-customized-select-label">מצב</InputLabel>
                            <Select
                                variant='filled'
                                labelId="demo-customized-select-label"
                                id="demo-customized-select"
                                value={article.isPublish}
                                onChange={handleChange}
                                name='isPublish'
                            >

                                <MenuItem value={false}>לא מפורסם</MenuItem>
                                <MenuItem value={true}>מפורסם</MenuItem>
                            </Select>
                        </FormControl>
                        <FormGroup style={{ margin: '1rem 0', textAlign: 'right' }}>
                            <Typography style={{ marginBottom: '1rem' }}>הוסף תמונה</Typography>
                            <input type='file' name='mainImg' onChange={uploadImage} />
                            {hasImageFeature ?
                                <img src={article.mainImg.url} style={{ width: '100%', overflow: 'hidden' }} /> : <span></span>}
                        </FormGroup>


                    </Card>
                    <Button color='secondary' style={{ marginTop: '1rem' }} variant='contained' onClick={handleUpload}> שלח</Button>
                </Grid>
            </Grid>
            <h3>תצוגה מקדימה</h3>
            <Grid container spacing={5} className='grid-blog' style={{ width: '100%', margin: 0 }}>
                <Grid item xs={12} sm={12} md={4} lg={4} xl={4} onClick={() => handleClick(article.key)}>
                    <div style={{ borderRadius: '0' }}>
                        <div style={{ backgroundColor: 'gray', height: '220px', position: 'relative' }}>
                            <img className='blog-image' src={article.mainImg.url} />
                        </div>
                        <hr style={{ margin: '0' }} />
                        <div style={{ textAlign: 'right', padding: '1rem 0' }}>
                            <h6 className='blog-title'>{article.title}</h6>
                            <span className='blog-sub-title'> {article.subTitle.substring(0, 200)}</span>
                            <br />
                            <a style={{ fontSize: '0.7rem', color: 'orange' }}>{'קרא עוד>>'}</a>
                        </div>

                    </div>
                </Grid>
            </Grid>
            <div >
                <div style={{ textAlign: 'right', padding: '3rem' }} dir='rtl' dangerouslySetInnerHTML={{ __html: article.content }}></div>
                <div > {article.content}</div>
            </div>
            <button onClick={() => { console.log(article) }}>פרטים </button>
        </div>
    )
}

export default HandleArticle;