import React from 'react';
import firebase from 'firebase';
import "./uploaded.scss";
import Navigation from '../navigation/navigation';

class Uploaded extends React.Component{

    constructor() {
        super();
        this.state = {
            img:[]
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
        if(!imageRef.location.path.includes('mp4')){
            imageRef.getDownloadURL().then((url) => {
                
                this.setState(() => {
                    this.setState({ img: [...this.state.img, url] })
                });
                //console.log(this.state)
            }).catch((error) => {
                //console.log(error)
            })
        }
    }

    render(){
        //console.log(this.state)
        const oneImg = this.state.img.map((image) => {
            return <img src={image} className="imgCard"/>
        })
        return(
            <div className="filesWrap">
                <Navigation/>
                <div className="uploadedContainer">
                    {oneImg}
                </div>
            </div>
        )
    }
}

export default Uploaded