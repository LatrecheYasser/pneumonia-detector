import React, { Component } from 'react';
import Modal from 'react-awesome-modal';
import './App.css';
import Axios from 'axios';

class App extends Component {

  openModal() {
    this.setState({
        visible : true
    });
  }

  closeModal() {
    this.setState({
        visible : false
    });
  }

  // this state is used to save the file the has been uploaded in this case it's the x-ray picture
  state = {
    selectedImage:null,
    visible : false,
    Normal:0,
    Sick:0
  }

  Results = {

  }


  //this hendler is used to save the image into a state and turn set the uploadedImage variable to true so we can check after it we
  //already have a pic saved , we can virifie if the selectedImage is null inside the state but i will work with this i will change it later

  uploadedImage = false
  fileChangedHandler = (event) => {

    this.setState({
      selectedImage : event.target.files[0]
    })
    this.uploadedImage = true
  }


  // this is the evenhandler of the sumbmit clic , it sends the image using axios

  OnUploadHeanderl = () => {
    const fd =new FormData();
    fd.append('chest_xray',this.state.selectedImage);
    // this url should be changed after for now the API is runing under this addres in my machine
    Axios.post('http://130.211.108.207:3000/pred',fd).then( response=>{
    this.setState({
      Normal : response.data['NORMAL'],
      Sick   : response.data['PNEUMONIA']
    })
    this.openModal()
    })

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

                <Modal visible={this.state.visible} width="400" height="300" effect="fadeInUp" onClickAway={() => this.closeModal()}>
                    <div style={{color:'black'}}>
                        <p>the resaults are  </p>
                        <p> {(this.state.Normal*100).toFixed(4)} % for being Normal </p> <br/>
                        <p> {(this.state.Sick*100).toFixed(4) } % for being sick </p>
                        <p>thanks for using our service </p>
                        <a href="javascript:void(0);" onClick={() => this.closeModal()}>Close</a>
                    </div>
                </Modal>


          </div>
        </header>
      </div>
    );
  }
}

export default App;
