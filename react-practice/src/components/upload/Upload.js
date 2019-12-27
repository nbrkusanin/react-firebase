/**
 *  Upload component of App.js
 */

// import React, {useEffect, useState} from 'react';
// import {useDropzone} from 'react-dropzone';
// import "./Upload.scss";
// import fire from 'firebase';

// function FileUp(props) {
//   const [files, setFiles] = useState([]);
//   const {getRootProps, getInputProps} = useDropzone({
//     accept:"image/png, image/gif, image/jpeg, video/mp4",
//     minSize:0,
//     maxSize:5242880,
//     onDrop: acceptedFiles => {
//       setFiles(acceptedFiles.map(file => Object.assign(file, {
//         preview: URL.createObjectURL(file)
//       })));
//     }
//   });
  
//   const thumbs = files.map(file => (
//     <div className="thumb" key={file.name}>
//       <div className="thumbInner">
//         <img
//           src={file.preview}
//           alt={file.name}
//           className="imgThumb"
//         />
//       </div>
//     </div>
//   ));

//   useEffect(() => () => {
//     // Make sure to revoke the data uris to avoid memory leaks
//     files.forEach(file => URL.revokeObjectURL(file.preview));
//   }, [files]);

//   function logOut(){
//             fire.auth().signOut();
//         }

//   return (
//     <section className="text-center mt-5 dropZoneContainer">
//         <div className="dropZoneOuter">
//             <div {...getRootProps({className: 'dropZone'})}>
//                 <input {...getInputProps()} />
//                 <p>Drag 'n' drop some files here, or click to select files</p>
//             </div>
//             <aside className="thumbsContainer">
//                 {thumbs}
//             </aside>
//         </div>
//         <button className="btn btn-info uploadBtn shadow rounded">Upload</button>
//         <button className="btn btn-danger logOutBtn shadow rounded" onClick={logOut()}>Logout</button>
//     </section>
//   );
// }


// export default FileUp

import React from 'react';
import Dropzone from 'react-dropzone';
import './Upload.scss';
import {fire, storage} from '../../configFire/Fire';
import { withRouter } from 'react-router-dom';

class Upload extends React.Component {
    constructor(props){
        super(props) 
        this.state = {
            files:[],
            progress: 0
          };
        this.logOut = this.logOut.bind(this);
        this.onDrop = this.onDrop.bind(this);
        this.handleUpload = this.handleUpload.bind(this);
        this.changeRedirect = this.changeRedirect.bind(this);
    }

    /**
     *  Function for log out from Firebase
     */
    logOut(){
        fire.auth().signOut();
    }

    /**
     *  Function that puts file to state
     * @param {*} files Files to be uploaded
     */
    onDrop(files){
        files.map(file => Object.assign(file, {
              preview: URL.createObjectURL(file)
            }));
        
        this.setState({files})
    }

    /**
     * Function to redirect to uploaded page on button click
     */
    changeRedirect(){
        let path;
        if(this.state.files[0]){
            if(this.state.files[0].type.split('/')[1] === 'mp4'){
                path = `/uploadedVideo`;
            } else {
                path = `/uploadedImg`;
            }
        }
        this.props.history.push(path);
    }

    /**
     * Function for uploading file
     */
    handleUpload = () => {
      const {files} = this.state;
      const uploadTask = storage.ref('images/'+ files[0].name).put(files[0]);
      uploadTask.on('state_changed',
      (snapshot) => {
         
         const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
         this.setState({progress});
      },
      (error) => {
        //console.log(error);
      },
      () => {
        storage.ref('images').child(files[0].name).getDownloadURL().then(url => {
          //console.log(url);

        this.setState({redirect: true});
        this.changeRedirect();
        })
      });
    }


    render(){
        let files;
        if(this.state.files[0]){
            console.log(this.state.files[0])
            if(this.state.files[0].path.includes('mp4')){
                files = this.state.files.map(file => (
                    <div className="thumbsContainer" key={file.name}>
                        <div className="thumb" key={file.name}>
                            <div className="thumbInner">
                                <video controls>
                                    <source src={file.preview} type="video/mp4" />
                                </video>
                            </div>
                        </div>
                    </div>
                  ));
        }else {
            files = this.state.files.map(file => (
                <div className="thumbsContainer" key={file.name}>
                    <div className="thumb" key={file.name}>
                        <div className="thumbInner">
                            <img
                                src={file.preview}
                                alt={file.name}
                                className="imgThumb"
                            />
                        </div>
                    </div>
                </div>
              ));
    
        
            }
        }

        return(
            <React.Fragment>
                <div className="text-center mt-5 dropZoneContainer">
                    <Dropzone 
                        onDrop={this.onDrop}
                        accept="image/png, image/gif, image/jpeg, video/mp4"
                        minSize={0}
                        maxSize={7340032}
                    >
                            {({getRootProps, getInputProps, isDragActive, isDragReject, rejectedFiles}) => {
                                const isFileTooLarge = rejectedFiles.length > 0 && rejectedFiles[0].size > 5242880;
                                return (
                                <div className="dropZoneOuter shadow mb-4 bg-white">
                                    <div className="rounded dropZone" {...getRootProps()}>
                                        <input {...getInputProps()} />
                                        {!isDragActive && "Click me or drag a file to upload!"}
                                        {isDragActive && !isDragReject && "Drop it like it's hot!"}
                                        {isDragReject && "File type not accepted, sorry!"}
                                        {isFileTooLarge && (
                                            <div className="text-danger mt-2">
                                                File is too large!
                                            </div>
                                        )}
                                    </div>
                                    <div>
                                        {files}
                                    </div>
                                    <progress value={this.state.progress} max='100' />
                                </div>
                            )}
                        }
                    </Dropzone>
                    <button className="btn btn-info uploadBtn shadow rounded" onClick={this.handleUpload}>Upload</button>
                    <button className="btn btn-danger logOutBtn shadow rounded" onClick={this.logOut}>Sign Out</button>
                </div>
            </React.Fragment>
        );
    }
}

export default withRouter(Upload);