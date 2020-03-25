import React, { Component } from 'react';

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      signInEmail: '',
      signInPassword: ''
    }
  }

  onEmailChange = (event) => {
    this.setState({signInEmail: event.target.value});
  }

  onPasswordChange = (event) => {
    this.setState({signInPassword: event.target.value});
  }

  onSubmitSignin = () => {
    console.log("Clicked signin");
    fetch('http://localhost:3000/signin', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        email: this.state.signInEmail,
        password: this.state.signInPassword
      })
    })
      .then(response => response.json())
      .then(data => {
        console.log("DAta is: ", data);
        if(data.id > 0) {
          this.props.checkSignin(true);
          this.props.loadUser(data);
          this.props.onRouteChange('home');
        }
      })
    console.log(this.state);
  }

  render() {
    const {onRouteChange, checkSignin} = this.props;
    return (
    <article className="br3 ba dark-grey b--black-10 mv4 w-100 w-50-m w-25-l mw5 shadow center">
    <main className="pa4 black-80">
    <div className="measure">
    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
      <legend className="f1 fw6 ph0 mh0">Sign In</legend>
      <div className="mt3">
        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
        <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" onChange={this.onEmailChange} type="email" name="email-address"  id="email-address"/>
      </div>
      <div className="mv3">
        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
        <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" onChange={this.onPasswordChange} type="password" name="password"  id="password"/>
      </div>
    </fieldset>
    <div className="">
      <button className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" onClick={this.onSubmitSignin}>Sign in</button>
      {/* <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" onClick={() => { this.onSubmitSignin(); checkSignin(true)}} value="Sign in"/> */}
    </div>
    <div className="lh-copy mt3">
      <p onClick={()=>onRouteChange('register')} href="#0" className="f6 link dim black db pointer">Register</p>
    </div>
    </div>
    </main>
    </article>
    )
  }
}

export default SignIn;