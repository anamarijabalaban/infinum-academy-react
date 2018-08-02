import React, {Component} from 'react';
import {css} from 'emotion';
import {Link}  from 'react-router-dom';
import getImage from '../imagesImports';
import { observable, action } from 'mobx';
import { observer } from 'mobx-react';
import {login} from '../services/user'

const container = css`
  font-family: Arial, Helvetica, sans-serif;
  padding-top: 20px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-auto-rows: 50px;
  grid-gap: 10px 10px;
`;

const iconBox = css`
  grid-row: 1 / 2;
  grid-column: 2 / 4;
`;

const iconImg = css`
  width: 20%;
`;

const blankBox = css`
  grid-row: 2 / 4;
  grid-column: 2 / 4;
`;

const usernameLabBox = css`
  grid-row: 4 / 5;
  grid-column: 2 / 4;
  font-size: 40px;
`;

const usernameBox = css`
  grid-row: 5 / 6;
  grid-column: 2 / 3;
  font-size: 40px;
  border: none;
  outline: none;
  border-bottom: 1px solid #FF7590;
  color: #ff758c;
  width: 80%;
`;

const passwordLabBox = css`
  grid-row: 6 / 7;
  grid-column: 2 / 4;
  font-size: 40px;
`;

const passwordBox = css`
  grid-row: 7 / 8;
  grid-column: 2 / 3;
  font-size: 40px;
  border: none;
  outline: none;
  border-bottom: 1px solid #FF7590;
  color: #ff758c;
  width: 120%;
`;

const rememberBox = css`
  grid-row: 8 / 9;
  grid-column: 2 / 4;
  padding: 20px 0;
`;

const loginBtnBox= css`
  grid-row: 9 / 10;
  grid-column: 2 / 3;
  width: 50%;
  height: 80%;
  color: white;
  background-color:  	#FF7590;
  border: none;
  border-radius: 8px;
`;
const regSpanBox= css`
  grid-row: 11 / 12;
  grid-column: 2 / 3;
  height: 80%;
`;

const regLink= css`
  color: #FF7590;
  text-decoration: none;
`;

const eyeBox= css`
  grid-row: 7 / 8;
  grid-column: 3 / 4;
  color: #FF7590;
`;

const eyeImg= css`
  width: 15%;
`;


@observer
export class LoginContainer extends Component {
  @observable
  componentState = {
    username: '',
    password: '',
    redirect: false,
    remember: false,
    inputType: 'password',
    login:false
  }

  @action.bound
  _handleMouseOverEye(event){
    this.componentState.inputType = 'text';
  }

  @action.bound
  _handleMouseOutEye(event){
    this.componentState.inputType = 'password';
  }

  @action.bound
  _handleUsernameChange(event) {
    this.componentState.username = event.target.value;
  }

  @action.bound
  _handleInputChange(event) {
    this.componentState.remember = event.target.value;
  }

  @action.bound
  _handlePasswordChange(event) {
    this.componentState.password = event.target.value;
  }

  @action.bound
  _login() {
    login(
      this.componentState,
      JSON.stringify({
        email: this.componentState.username,
        password: this.componentState.password
      }),
      this.props
    );
    this.componentState.login = true;
  }

  render() {
    return (
      <div className={container}>
        <div className={iconBox}>
          <img className={iconImg} alt='App icon' src={getImage('logo')} />
        </div>
        <div className={blankBox}></div>
        <label className={usernameLabBox} htmlFor="username">My username is:</label>
        <input className={usernameBox} type="text" id="username" value={this.componentState.username} onChange={this._handleUsernameChange}/>
        <label className={passwordLabBox} htmlFor="password">and my password is:</label>
        <input className={passwordBox} type={this.componentState.inputType} id="password" value={this.componentState.password} onChange={this._handlePasswordChange}/>
        <span className={eyeBox}>
          <img className={eyeImg} alt='Show password text' src={getImage('passEye')} onMouseOver={this._handleMouseOverEye} onMouseOut={this._handleMouseOutEye}/>
        </span>
        <div className={rememberBox}>
            <input name="remember" type="checkbox" onChange={this._handleInputChange} />Remember me
        </div>

        <button className={loginBtnBox} onClick={this._login}>LOGIN</button>

        <span className={regSpanBox}>
          <label>Still don&#39;t have an account? </label>
          <Link className={regLink}  to={`/register`}>Register</Link>
        </span>
        {this.componentState.login}

      </div>
    );
  }
}
