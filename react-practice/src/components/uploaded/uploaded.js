import React from 'react';
import firebase from 'firebase';

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
            console.log(error)
        });
    }

    displayImage(imageRef) {
        imageRef.getDownloadURL().then((url) => {
            
            this.setState(() => {
                this.state.img.push(url)
            });
            console.log(this.state)
        }).catch((error) => {
            console.log(error)
        })
    }

    render(){

        console.log(this.state)

        return(
            <div>
                <img src={this.state.img[0]}/>
            </div>
        )
    }
}

export default Uploaded