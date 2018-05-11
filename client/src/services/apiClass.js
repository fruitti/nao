/* eslint-disable */
import 'whatwg-fetch';
import isNull from 'lodash/isNull';

const config = require('config').default;

class API {

  constructor() {
    this.setToken = this.setToken.bind(this);
    this.api = this.api.bind(this);
    let session = localStorage.getItem('nao') ? JSON.parse(localStorage.getItem('nao')) : null;
    this.token = !isNull(session) && session.token ? session.token : undefined;
  }

  setToken(token) {
      this.token = token;
    }
  
  getToken() {
      return this.token;
  }

  api(endpoint, method = 'GET', body = '', customUrl = false) {
    const options = {
      method,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json;charset=UTF-8'
      }
    };

    if (body !== '') {
      Object.assign(options, options, {body: JSON.stringify(body)});
    }

    if (this.token) {
      Object.assign(options, options, {headers: {...options.headers, Authorization: `naoAuth ${this.token}`}});
    }

    let url = config.api + endpoint;
    if (customUrl) url = endpoint;

    return fetch(url, options)
      .then((response) => {
        if (response.status >= 200 && response.status < 300) {
          return response;
        } else {
          let error = new Error(response.statusText);
          error.response = response;
          throw error;
        }
      })
      .then((response) => response.json())
      .then((data) => data)
      .catch((error) => {
        console.warn(error);
        // throw error;
      })

  }

  authRequest(data){
    return () => this.api('?c=admin', 'POST', data);
  }
  
  createRobot(data){
    return () => this.api('?c=robot', 'POST', data);
  }
  
  getRobot(){
    return () => this.api('?c=robot');
  }
  
  updateRobot(data){
    return () => this.api('?c=robot&id=' + data.id,'PUT',data);
  }
    
  deleteRobot(data){
    return () => this.api('?c=robot&id=' + data,'DELETE');
  }
  
  
  createPeripheral(data){
    return () => this.api('?c=peripheral', 'POST', data);
  }
  
  getPeripheral(){
    return () => this.api('?c=peripheral');
  }
  
  updatePeripheral(data){
    return () => this.api('?c=peripheral&id=' + data.id,'PUT',data);
  }
  
  deletePeripheral(data){
    return () => this.api('?c=peripheral&id=' + data,'DELETE');
  }
  
  
  createCommand(data){
  return () => this.api('?c=command', 'POST', data);
}
  
  getCommand(){
    return () => this.api('?c=command');
  }
  
  updateCommand(data){
    return () => this.api('?c=command&id=' + data.id,'PUT',data);
  }
  
  deleteCommand(data){
    return () => this.api('?c=command&id=' + data,'DELETE');
  }
  
  
  createUser(data){
    return () => this.api('?c=user', 'POST', data);
  }
  
  getUser(){
    return () => this.api('?c=user');
  }
  
  updateUser(data){
    return () => this.api('?c=user&id=' + data.id,'PUT',data);
  }
  
  deleteUser(data){
    return () => this.api('?c=user&id=' + data,'DELETE');
  }

}

export default new API();
