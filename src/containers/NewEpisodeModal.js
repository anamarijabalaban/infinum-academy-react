import React, { Component } from 'react';
import { css, cx } from 'emotion';
import { observer } from 'mobx-react';
import Dropzone from 'react-dropzone';
import { Modal } from '../components/Modal';
import getImage from '../imagesImports';
import Select from 'react-select';
import state from '../state';
import { observable, action } from 'mobx';
import {uploadFile} from '../services/media';
import {add} from '../services/episode';

const modalParent = css`
  position: fixed;
  z-index: 1;
  padding-top: 100px;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgb(0,0,0);
  background-color: rgba(0,0,0,0.4);
`;

const main = css`
  position: absolute;
  top: 15%;
  left: 35%;
  right: 35%;
  padding: 0 30px;
  font-family: Arial, Helvetica, sans-serif;
`;

const button = css`
  position: absolute;
  top: 0;
  right: 0;
`;

const dropzone = css` {
  width : 99%;
  height : 35%;
  border: dashed 3px #6d62624a;
}`;

const dropzoneText = css`{
  text-align: center;
  width: 40%;
  margin: 0;
  position: absolute;
  left: 30%;
  right: 30%;
  top: 25%;
}`;

const photoImg = css`{
  width: 35px;
  height: 35px;
}`;

const inputBox = css`{
  ::placeholder {
    color: hsl(0, 0%, 38%);
    opacity: 1; /* Firefox */
    font-size: 17px;
    font-family: Arial, Helvetica, sans-serif;
  }
  color: hsl(0, 0%, 38%);
  width: 98%;
  margin-top: 20px;
  border: none;
  padding: 10px 0px;
  padding-left: 5px;
  font-size: 17px;
  border-bottom: 1px solid #6d62624a;
  font-family: Arial, Helvetica, sans-serif;
}`;

const selectBox = css`{
  display: inline-block;
  width: 60%;
}`;

const selectDiv = css`{
  width: 50%;
  display: inline-block;
}`;

const selectBorder = css`{
  border: none;
}`;

const newBtn = css`
  background-color: #f7ced5;
  color: white;
  font-size: 20px;
  border-radius: 5px;
  margin-top: 10px;
  cursor: not-allowed;
  pointer-events: none;
}
`;

const uploadImg = css`{
  width: 50%;
  height: 20%;
}`;
 const newEnabledBtn =  css`{
   background-color: #FF7590;
   color: white;
   font-size: 20px;
   border-radius: 5px;
   margin-top: 10px;
 }`;

 const loadingImg = css`{
   width: 100px;
   height: 100px;
 }`;

const options = [
  { value: '1', label: '1' },
  { value: '2', label: '2' },
  { value: '3', label: '3' },
  { value: '4', label: '4' },
  { value: '5', label: '5' },
  { value: '6', label: '6' },
  { value: '7', label: '7' },
];

@observer
export class NewEpisodeModal extends Component {

  @observable
  componentState = {
    selectedEpisode: '1',
    selectedSeason: '1',
    uploadedImage: '',
    episodeTitle: '',
    episodeDesc: '',
    loading: false,
    mediaId: ''
  }


  @action.bound
  _onDescChange(event){
    this.componentState.episodeDesc = event.target.value;
  }

  @action.bound
  _onTitleChange(event){
    this.componentState.episodeTitle = event.target.value;
  }

  @action.bound
  _closeModal() {
    this.props.history.push('../');
  }

  @action.bound
  _onDrop(files) {
    console.log(files);
    const data = new FormData();
    data.append('file', files[0]);
    this.componentState.loading = true;
    uploadFile(this.componentState,data);
  }

  @action.bound
  _seassonChange(selectedSeason){
    this.componentState.selectedSeason =  selectedSeason.value;
    console.log(`Option selected:`, this.componentState.selectedSeason);
  }

  @action.bound
  _episodeChange(selectedEpisode){
    this.componentState.selectedEpisode =  selectedEpisode.value;
    console.log(`Option selected:`, this.componentState.selectedEpisode);
  }

  @action.bound
  _submitForm(event) {
    event.preventDefault();
    add(state,
      JSON.stringify({
        showId: this.props.match.params.showId,
        mediaId: this.componentState.mediaId,
        title: this.componentState.episodeTitle,
        description: this.componentState.episodeDesc,
        episodeNumber: this.componentState.selectedEpisode,
        season: this.componentState.selectedSeason
      })
    );
    this._closeModal();
  }

  render() {

    return (
      <div className={modalParent}>
      <form onSubmit={this._submitForm}>
        <Modal className={main} width="30%" height='600px' close={this._closeModal} >

            <h1>Add new episode</h1>
            <Dropzone className={dropzone} onDrop={this._onDrop}>
              <div className={dropzoneText}>
                {
                  this.componentState.loading
                  ? <img className={loadingImg} alt='Please wait...' src={getImage(`loader`)} />
                  : this.componentState.uploadedImage ===''
                    ?
                      <div>
                        <img className={photoImg} alt='Photo' src={getImage(`photo`)} />
                        <div> Drag your image here or browse</div>
                      </div>
                    :
                      <div>
                        <img alt='Upload' className={uploadImg} src={`https://api.infinum.academy/${this.componentState.uploadedImage}`}/>
                        <div> Change Photo</div>
                      </div>
                }

              </div>
            </Dropzone>
            <input className={inputBox} type='text' placeholder='Episode title' value={this.componentState.episodeTitle} onChange={this._onTitleChange}/>
            <div className={cx(selectBorder, inputBox)}>
              <div className = {selectDiv}>
                <label> Season: </label>
                <Select
                  className ={selectBox}
                  defaultValue={options[1]}
                  onChange={this._seassonChange}
                  options={options}
                />
              </div>

              <div className={selectDiv}>
                <label> Episode: </label>
                <Select
                  className ={selectBox}
                  defaultValue={options[1]}
                  onChange={this._episodeChange}
                  options={options}
                />
              </div>
            </div>
            <input className={inputBox} type='text' placeholder='Episode description' value={this.componentState.episodeDesc} onChange={this._onDescChange}/>
            <button type="submit" className={this.componentState.uploadedImage==='' ? newBtn: newEnabledBtn}>ADD NEW EPISODE</button>

       </Modal>
</form>
     </div>
    );
  }
}
