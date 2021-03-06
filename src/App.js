import React, { Component } from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import SignIn from './components/SignIn/SignIn';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Rank from './components/Rank/Rank';
import Register from './components/Register/Register';
import 'tachyons';
import Particles from 'react-particles-js';

const particlesOptions = {
  particles: {
    line_linked: {
      shadow: {
        enable: true,
        color: "#3CA9D1",
        blur: 5
      }
    }
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
      box: {},
      route: 'signin',
      signedIn: false,
      user: {
        id: '',
        name: '',
        email: '',
        password: '',
        entries: 0,
        joined: ''
      }
    }
  }

  loadUser = (data) => {
    this.setState({
      user: {
        id: data.id,
        email: data.email,
        password: data.password,
        name: data.name,
        entries: data.entries,
        joined: data.joined
      }
    })
  }

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    fetch('http://localhost:3000/image', {
      method: 'put',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        id: this.state.user.id
      })
    })
      .then(response => response.json())
      .then(count => {
        this.setState(Object.assign(this.state.user, {entries: count}));
      })
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width -  (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  displayFaceBox = (box) => {
    this.setState({box: box});
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  clearURL = () => {
    this.setState({imageUrl: ''});
  }

  onSubmit = () => {
    this.setState({imageUrl: this.state.input});
    fetch('http://localhost:3000/imageUrl', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        input: this.state.input
    })})
    .then(r => r.json()).then(response => {
      return this.displayFaceBox(this.calculateFaceLocation(response))
    })
    .catch(err => console.log(err))
}

  onRouteChange = (route) => {
    this.setState({route: route});
  }

  isSignedIn = (signedIn) => {
    signedIn?this.setState({signedIn: true}):this.setState({signedIn: false});
  }

  render() {
    return (
      <div className="App">
        <Particles className="particles" 
          params={particlesOptions}
        />
        <Navigation onRouteChange={this.onRouteChange} isSignedIn={this.state.signedIn} checkSignin={this.isSignedIn}/>
        {this.state.route === 'signin' ?
          <SignIn onRouteChange={this.onRouteChange} checkSignin={this.isSignedIn} loadUser={this.loadUser}/>
          :(
            this.state.route === 'register' ?
              <Register onRouteChange={this.onRouteChange} loadUser={this.loadUser}/>
              :<div>
                <Logo/>
                <Rank name={this.state.user.name} entries={this.state.user.entries}/>
                <ImageLinkForm onInputChange={this.onInputChange}
                                onButtonSubmit={this.onSubmit}
                                imageUrl={this.state.imageUrl}/>
                <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl} clearURL={this.clearURL} />
              </div>
          )
        }
      </div>
    );
  }
}

export default App;
