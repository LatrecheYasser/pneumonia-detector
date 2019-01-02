import React, { Component } from 'react';

import './App.css';
import Axios from 'axios';



class App extends Component {
  // this state is used to save the file the has been uploaded in this case it's the x-ray picture 
  state={
    selectedImage:null
  }
  

  //this hendler is used to save the image into a state and turn set the uploadedImage variable to true so we can check after it we
  //already have a pic saved , we can virifie if the selectedImage is null inside the state but i will work with this i will change it later

  uploadedImage = false 
  fileChangedHandler = (event) => {
    this.setState({
      selectedImage : event.target.files[0]
    })
    this.uploadedImage=true
  }


  // this is the evenhandler of the sumbmit clic , it sends the image using axios 
  OnUploadHeanderl = () =>{
    const fd =new FormData();
    fd.append('chest_xray',this.state.selectedImage);
    Axios.post('http://127.0.0.1:3003/pred',fd).then( response=>{
      console.log('the respons is ',  response.data.json);
    } ) 
    console.log('nothing i guess')
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
        <h3>Pneumonia Detector</h3>
          <div>
          <img src="/Image/Pen.jpg" style={{float:'left'}} alt="an example of X-ray pic" ></img>
          <h4 >Pneumonia detector</h4>
          <p>
          a web site that helps Doctors and Normal people to detect the Pneumonia
          </p>
          <p>
          The detection of Pneumonia never been easy as today with the new Computer since and the new deep learning methods the detection of this sickens is so easy , we provide a website to help Doctors and other persons in this job
          it's so easy all what you have to do is to load you x-ray image to our web site and the web site will show you how much is the probability to be sick or not
          we really wish you a good  health .
          </p>
          
            <input type="file" onChange={this.fileChangedHandler}/>
            <button onClick={this.OnUploadHeanderl}>send</button>


          
          </div>
        </header>
      </div>
    );
  }
}

export default App;
