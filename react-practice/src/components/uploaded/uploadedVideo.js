import React from 'react';
import firebase from 'firebase';
import "./uploaded.scss";
import Navigation from '../navigation/navigation';

class UploadedVideo extends React.Component{

    constructor() {
        super();
        this.state = {
            video:[]
        }
    }

    componentDidMount() {
        const images = firebase.storage().ref().child('images');
        images.listAll().then((result) => {
            result.items.forEach((imageRef) => {
                this.displayImage(imageRef);
            });
        }).catch((error) => {
            //console.log(error)
        });
    }

    displayImage(imageRef) {
        if(imageRef.location.path.includes('mp4')){

            imageRef.getDownloadURL().then((url) => {
                
                this.setState(() => {
                    this.setState({ video: [...this.state.video, url] })
                });
                //console.log(this.state)
            }).catch((error) => {
                //console.log(error)
            })
        
        }
    }

    render(){

        //console.log(this.state)
        const oneVideo = this.state.video.map((video) => {
            return <video width="320" height="240" controls>
                    <source src={video} type="video/mp4" />
                    </video>
        })
        return(
            <div className="filesWrap">
                <Navigation/>
                <div className="uploadedContainer">
                    {oneVideo}
                </div>
            </div>
        )
    }
}

export default UploadedVideo