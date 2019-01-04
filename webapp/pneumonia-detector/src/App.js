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
    Sick:0,
    waiting: false,
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

  getSelectedImageName = () => {
    if (this.uploadedImage){
      return this.state.selectedImage.name
    }else {
      return ""
    }
  }

  // this is the evenhandler of the sumbmit clic , it sends the image using axios

  OnUploadHeanderl = () =>{
    if(this.state.selectedImage==null)
      alert('You didn\'t choose any picture. Please select one and click agin');
    else{
      const fd =new FormData();
      fd.append('chest_xray',this.state.selectedImage);
      // this url should be changed after for now the API is runing under this addres in my machine
      this.setState({
        waiting: true
      })
      Axios.post('http://130.211.108.207:3000/pred',fd)
        .then( response=>{
          this.setState({
              Normal : response.data['NORMAL'],
              Sick   : response.data['PNEUMONIA']
            })
            this.setState({
              waiting: false
            })
            this.openModal()
        })
        .catch(error => {
          this.setState({
            waiting: false
          })
          alert("Something went wrong :/ \nPlease raise an issue on our github repo")
        })
    }

  }

  render() {
    return (
      <div className="App">
          <header className="App-header">
          <div style={{margin: '20px'}}>
          <a target="_blank" href="https://github.com/LatrecheYasser/pneumonia-detector">
            <b>Pneumonia Detector</b>
            <img src="/Image/github.png" style={{marginLeft:'10px', width:'4%'}}/>
            </a>
          </div>
          <div style={{backgroundColor:'#282c34'}}>
          <img src="/Image/Pen.jpg" style={{float:'left', margin:'20px'}} alt="an example of X-ray pic" ></img>
          <h4>
          We help you detect Pneumonia !
          </h4>
          <div id="desc">
            <p>
            The detection of Pneumonia has never been as easy as today with Deep Learning methods.
            </p>
            <p>
            Our service helps doctors and other persons to diagnose Pneumonia as quickly as possible.
            All what you have to do is to load your chest X-ray image, then we will show you the results in just few seconds.
            </p>
            <p>
            We really wish you a good  health.
            </p>
          </div>
            <label className="button1"> Upload your X-ray
            <input type="file" onChange={this.fileChangedHandler}/></label>
            <p visible={this.uploadedImage.toString()}>{this.getSelectedImageName()}</p>
            <button className="button1" onClick={this.OnUploadHeanderl}>
              {this.state.waiting? "Waiting..." : "See the Results"}
            </button>

                <Modal visible={this.state.visible} width="400" height="300" effect="fadeInUp" onClickAway={() => this.closeModal()}>
                    <div style={{color:'black'}}>
                        <p>the resaults are  </p>
                        <p> {(this.state.Normal*100).toFixed(4)} % for being Normal </p>
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
