import React, { useRef, useState, useMemo } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'
import { Grid, TextField, Button, InputLabel, Select, FormControl, MenuItem, Card, FormGroup, CardHeader, CardContent, Typography } from '@material-ui/core';
import Compressor from 'compressorjs';
import { uniqueId } from './component/screens/adminSide/com/functions';
import { useFirebase } from 'react-redux-firebase';


const Example = () => {

    const theFirebase = useFirebase();
    const quill = useRef();
    const [article, setArticle] = useState({
        title: '',
        content: '',
        createDate: new Date(),
        featureImage: '',
        isPublish: false,
        lastModified: new Date(),
        createUserId: ''
    })
    const [hasImageFeature, setHasImageFeature] = useState(false)

    const fileCompress = (file) => {
        return new Promise((resolve, reject) => {
            new Compressor(file, {
                file: 'File',
                quality: 0.5,
                maxHeight: 640,
                maxWidth: 640,
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
        console.log(article)
    }
    const uploadImage = (file) => {
        const theFile = file.target.files[0]
        const imageId = uniqueId()
        theFirebase.uploadFile('images', theFile, 'articleImages', {
            documentId: (res, x, y, url) => {
                setArticle(preVal => {
                    return { ...preVal, featureImage: { url: url, path: res.ref.fullPath } }
                })
            }, name: imageId
        }).then(() => {
            setHasImageFeature(true)
            console.log('success')
            setArticle(preVal => {
                return {
                    ...preVal
                }
            })
        }).catch(err => console.log(err))
    }


    return (
        <div>
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
                    <FormGroup>
                        <ReactQuill ref={el => quill.current = el} formats={formats} theme='snow' modules={modules} id='content' value={article.content} onChange={handleChangeQuill} />
                    </FormGroup>
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
                            <input type='file' onChange={uploadImage} />
                            {hasImageFeature ?
                                <img src={article.featureImage.url} style={{ width: '100%', overflow: 'hidden' }} /> : <span>daldajbl</span>}
                        </FormGroup>


                    </Card>
                    <Button color='secondary' style={{ marginTop: '1rem' }} variant='contained' onClick={handleClick}> שלח</Button>
                </Grid>
            </Grid>
            <div >
                <div style={{ textAlign: 'right', padding: '3rem' }} dir='rtl' dangerouslySetInnerHTML={{ __html: article.content }}></div>
                <div > {article.content}</div>


            </div>
        </div>



    )
}
export default Example;