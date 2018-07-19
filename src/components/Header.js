import React, { Component } from 'react';
import { css } from 'emotion';

const headerBox = css`
  display: grid;
  grid-template-columns:  1fr 1fr 1fr 1fr;
  grid-auto-rows: 40px;
  grid-gap: 5px 20px;
  padding: 10px 150px;
  grid-row: 1 / 3;
  grid-column: 1 / 5;
`;

const iconBox = css`
  grid-row: 1 / 2;
  grid-column: 1 / 2;
`;

const iconImg = css`
  width: 45%;
  padding-left: 20px;
`;

const hiBox = css`
  grid-row: 1 / 2;
  grid-column: 4 / 5;
  text-align: right;
  padding: 10px;
  color: #FF7590;
`;
export class Header extends Component {
  render() {
    const user = localStorage.getItem('name');
    return (
      <div className={headerBox}>
        <div className={iconBox}>
          <img className={iconImg} alt='App logo' src={require('../../src/images/img-logo-horizontal@3x.png')} />
        </div>
        <div className={hiBox}>Hi, {user}</div>

      </div>
    );
  }
}
