import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { css, cx } from 'emotion';
import getImage from '../imagesImports';

const main = css`
  background-color: white;
  box-shadow: 0 0 0 1pt rgba(0,0,0,0.4);
  border-radius: 5px;
  height: 100px;
  width: 100px;
`;

const sizer = (height, width) => css`
  height: ${height};
  width: ${width};
`;

const button = css`
  position: absolute;
  top: 25px;
  right: 5px;
  border: none;
`;

const closeImg = css`
  width: 40px;
`;


@observer
export class Modal extends Component {
  render() {
    const { children, className, width, height } = this.props;

    return (
      <div className={cx(main, className, sizer(height, width))}>
        {children}
        <button
          className={button}
          onClick={this.props.close}
        ><img className={closeImg} alt='Close' src={getImage(`close`)} /></button>
      </div>
    );
  }
}
