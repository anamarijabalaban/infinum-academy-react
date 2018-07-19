import React, { Component } from 'react';
import { css } from 'emotion';
import {Link}  from 'react-router-dom';

const footerBox = css`
  display: grid;
  grid-template-columns:  1fr 1fr 1fr 1fr;
  grid-auto-rows: 40px;
  grid-gap: 5px 20px;
  padding: 0 150px;
  grid-row: 12 / 13;
  grid-column: 1 / 5;
`;

const iconBox = css`
  grid-row: 1 / 2;
  grid-column: 1 / 2;
`;

const infoLinksBox = css`
  grid-row: 2 / 3;
  grid-column: 1 / 3;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
`;

const infoBox = css`
  grid-row: 3 / 4;
  grid-column: 1 / 4;
  padding-left: 20px;
  padding-top: 15px;
  color: #A0A0A0;

`;

const snLinksBox = css`
  grid-row: 3 / 4;
  grid-column: 4 / 5;
  text-align: right;
`;

const iconImg = css`
  width: 35%;
  padding-left: 20px;
`;

const infoLinkLabel1 = css`
  font-size: 18px;
  grid-row: 2 / 3;
  grid-column: 1 / 2;
  padding-left: 20px;
  padding-right: 50px;
  text-decoration: none;
  color: #A0A0A0;
`;

const infoLinkLabel2 = css`
  font-size: 18px;
  grid-row: 2 / 3;
  grid-column: 2 / 3;
  padding-left: 20px;
  padding-right: 30px;
  text-decoration: none;
  color: #A0A0A0;
`;

const infoLinkLabel3 = css`
  font-size: 18px;
  grid-row: 2 / 3;
  grid-column: 3 / 4;
  padding-left: 20px;
  text-decoration: none;
  color: #A0A0A0;
`;

const snIconImg = css`
  width: 12%;
  padding-left: 20px;
`;
export class Footer extends Component {
  render() {
    return (
      <div className={footerBox}>
        <div className={iconBox}>
          <img className={iconImg} alt='App logo' src={require('../../src/images/img-logo-horizontal@3x.png')} />
        </div>
        <div className={infoLinksBox}>
          <Link className={infoLinkLabel1} to={`/shows`}>About Us</Link>
          <Link className={infoLinkLabel2} to={`/shows`}>Privacy Policy</Link>
          <Link className={infoLinkLabel3} to={`/shows`}>Terms of Service</Link>
        </div>
        <div className={infoBox}>&#169; Shows. All right reserved. Additional terms and conditions may apply.</div>
        <div className={snLinksBox}>
          <img className={snIconImg} alt='Facebook link' src={require('../../src/images/ic-facebook@3x.png')} />
          <img className={snIconImg} alt='LinkedIn link' src={require('../../src/images/ic-linkedin@3x.png')} />
          <img className={snIconImg} alt='Twitter link' src={require('../../src/images/ic-twitter@3x.png')} />
        </div>
      </div>
    );
  }
}
