/* eslint-disable */

const config = require('config').default;

class NAO {

  constructor() {
    this.qis = null;
    this.connected = false;
    this.ip = null;
    this.inprogress = false;
    
    // merci javascript :') Obligé de bind all !
    this.init = this.init.bind(this);
    this.shutdown = this.shutdown.bind(this);
    this.reboot = this.reboot.bind(this);
    this.getSystemVersion = this.getSystemVersion.bind(this);
    this.getBatteryCharge = this.getBatteryCharge.bind(this);
    this.behavior = this.behavior.bind(this);
    this.behaviorList = this.behaviorList.bind(this);
    this.say = this.say.bind(this);
    this.rasta = this.rasta.bind(this);
    this.stopAllBehavior = this.stopAllBehavior.bind(this);
    this.data = this.data.bind(this);
    this.getRShoulderTemperature = this.getRShoulderTemperature.bind(this);
    this.getLShoulderTemperature = this.getLShoulderTemperature.bind(this);
    this.getRElbowTemperature = this.getRElbowTemperature.bind(this);
    this.getLElbowTemperature = this.getLElbowTemperature.bind(this);
    this.getRHipTemperature = this.getRHipTemperature.bind(this);
    this.getLHipTemperature = this.getLHipTemperature.bind(this);
    this.getRKneeTemperature = this.getRKneeTemperature.bind(this);
    this.getLKneeTemperature = this.getLKneeTemperature.bind(this);
    this.getRFootWeight = this.getRFootWeight.bind(this);
    this.getLFootWeight = this.getLFootWeight.bind(this);
    this.getBatteryChargeData = this.getBatteryChargeData.bind(this);
    this.move = this.move.bind(this);
    this.moveHead = this.moveHead.bind(this);
    this.setIP = this.setIP.bind(this);
    this.getIP = this.getIP.bind(this);
    this.getInProgress = this.getInProgress.bind(this);
    this.setInProgress = this.setInProgress.bind(this);
  }
  
  // /!\ un reject doit forcement retourner une exception ! new Error('message');
  init(ip) {
    return new Promise((resolve, reject) => {
      this.inprogress = true;
      if (this.connected) {
        resolve({
          message: 'Deja connecté'
        });
      }
      this.qis = null;
      this.qis = new QiSession(ip);
      
      this.qis.socket()
        .on('connect', () => {
          this.connected = true;
          this.inprogress = false;
          console.log('Connect to robot : ', ip);
          resolve({
            message: 'connexion OK'
          });
        })
        .on('disconnect', () => {
          this.connected = false;
          this.inprogress = false;
          this.qis = null;
        })
        .on('error', (e) => {
          console.log('error =>', e);
        });
    });
  }
  
  disconnect() {
    this.qis = null;
    this.connected = false;
    this.inprogress = false;
  }
  
  shutdown() {
    return new Promise((resolve, reject) => {
      if (!this.connected) {
        resolve({
          error: 'Le robot n\'est pas connecté !'
        })
      }
      this.qis.service('ALSystem').then(
        (ALSystem) => {
          ALSystem.shutdown().done(() => {
            resolve(true);
          });
        },
        () => {
          resolve({
            error: 'Le robot n\'est pas connecté !'
          })
        }
      );
    });
  }
  
  reboot() {
    return new Promise((resolve, reject) => {
      if (!this.connected) {
        resolve({
          error: 'Le robot n\'est pas connecté !'
        })
      }
      this.qis.service('ALSystem').then(
        (ALSystem) => {
          ALSystem.reboot().done(() => {
            resolve(true);
          });
        },
        () => {
          resolve({
            error: 'Le robot n\'est pas connecté !'
          })
        }
      );
    });
  }
  
  getSystemVersion() {
    return new Promise((resolve, reject) => {
      if (!this.connected) {
        resolve({
          error: 'Le robot n\'est pas connecté !'
        })
      }
      this.qis.service('ALSystem').then(
        (ALSystem) => {
          ALSystem.systemVersion().done((version) => {
            resolve(version);
          });
        },
        () => {
          resolve({
            error: 'Le robot n\'est pas connecté !'
          })
        }
      );
    });
  }
  
  getBatteryCharge() {
    return new Promise((resolve, reject) => {
      if (!this.connected) {
        resolve({
          error: 'Le robot n\'est pas connecté !'
        })
      }
      this.qis.service('ALBattery').then(
        (ALBattery) => {
          resolve(ALBattery.getBatteryCharge());
        },
        () => {
          resolve({
            error: 'Le robot n\'est pas connecté !'
          });
        }
      );
    });
  }
  
  behavior(data) {
    return new Promise((resolve, reject) => {
      if (!this.connected) {
        resolve({
          error: 'Le robot n\'est pas connecté !'
        })
      }
      this.qis.service('ALBehaviorManager').then(
        (ALSystem) => {
          ALSystem.runBehavior(data).done(() => {
            resolve({
              'message': data
            });
          });
        },
        (e) => {
          resolve({
            'message': e.message
          });
        }
      );
    });
  }
  
  behaviorList() {
    return new Promise((resolve, reject) => {
      if (!this.connected) {
        resolve({
          error: 'Le robot n\'est pas connecté !'
        })
      }
      this.qis.service('ALBehaviorManager').then(
        (ALSystem) => {
          // ALSystem.getInstalledBehaviors().done((data) => {
          ALSystem.getBehaviorNames().done((data) => {
            resolve(data);
          });
        },
        () => {
          resolve({
            error: 'Le robot n\'est pas connecté !'
          });
        }
      );
    });
  }
  
  say(data) {
    return new Promise((resolve, reject) => {
      if (!this.connected) {
        resolve({
          error: 'Le robot n\'est pas connecté !'
        })
      }
      this.qis.service('ALTextToSpeech').then(
        (ALTextToSpeech) => {
          ALTextToSpeech.say(data).done(() => {
            resolve(data.toString());
          });
        },
        () => {
          resolve({
            error: 'Le robot n\'est pas connecté !'
          })
        }
      );
    });
  }
  
  rasta(data) {
    return new Promise((resolve, reject) => {
      if (!this.connected) {
        resolve({
          error: 'Le robot n\'est pas connecté !'
        })
      }
      this.qis.service('ALLeds').then(
        (ALTextToSpeech) => {
          ALTextToSpeech.rasta(parseInt(data,10)).done(() => {
            resolve('rasta');
          });
        },
        () => {
          resolve({
            error: 'Le robot n\'est pas connecté !'
          })
        }
      );
    });
  }
  
  stopAllBehavior() {
    return new Promise((resolve, reject) => {
      if (!this.connected) {
        resolve({
          error: 'Le robot n\'est pas connecté !'
        })
      }
      this.qis.service('ALBehaviorManager').then(
        (ALSystem) => {
          ALSystem.stopAllBehaviors().done((data) => {
            resolve({
              message: 'finish !'
            });
          });
        },
        () => {
          resolve({
            error: 'Le robot n\'est pas connecté !'
          })
        }
      );
    });
  }
  
  data(keyData) {
    return new Promise((resolve, reject) => {
      if (!this.connected) {
        resolve({
          error: 'Le robot n\'est pas connecté !'
        })
      }
      this.qis.service('ALMemory').then(
        (ALMemory) => {
          ALMemory.getData(keyData).done((result) => {
            resolve(result);
          });
        },
        () => {
          resolve({
            error: 'Le robot n\'est pas connecté !'
          })
        }
      );
    });
  }
  
  // Epaule
  getRShoulderTemperature() {
    return this.data('Device/SubDeviceList/RShoulderPitch/Temperature/Sensor/Value');
  }
  
  // Epaule
  getLShoulderTemperature() {
    return this.data('Device/SubDeviceList/LShoulderPitch/Temperature/Sensor/Value');
  }
  
  // Coude
  getRElbowTemperature() {
    return this.data('Device/SubDeviceList/RElbowYaw/Temperature/Sensor/Value');
  }
  
  // Coude
  getLElbowTemperature() {
    return this.data('Device/SubDeviceList/LElbowYaw/Temperature/Sensor/Value');
  }
  
  // Hanche
  getRHipTemperature() {
    return this.data('Device/SubDeviceList/RHipPitch/Temperature/Sensor/Value');
  }
  
  // Hanche
  getLHipTemperature() {
    return this.data('Device/SubDeviceList/LHipPitch/Temperature/Sensor/Value');
  }
  
  // GENOU
  getRKneeTemperature() {
    return this.data('Device/SubDeviceList/RKneePitch/Temperature/Sensor/Value');
  }
  
  // GENOU
  getLKneeTemperature() {
    return this.data('Device/SubDeviceList/LKneePitch/Temperature/Sensor/Value');
  }
  
  // poids pied
  getRFootWeight() {
    return this.data('Device/SubDeviceList/RFoot/FSR/TotalWeight/Sensor/Value');
  }
  
  // poids pied
  getLFootWeight() {
    return this.data('Device/SubDeviceList/LFoot/FSR/TotalWeight/Sensor/Value');
  }
  
  getBatteryChargeData() {
    return this.data('Device/SubDeviceList/Battery/Charge/Sensor/Value');
  }
  
  move(x,y,theta) {
    return new Promise((resolve, reject) => {
      if (!this.connected) {
        resolve({
          error: 'Le robot n\'est pas connecté !'
        })
      }
      this.qis.service('ALMotion').then(
        (ALMotion) => {
          ALMotion.moveTo(x,y,theta).done((result) => {
            resolve({
              'message': result
            });
          });
        },
        () => {
          resolve({
            error: 'Le robot n\'est pas connecté !'
          })
        }
      );
    });
  }
  
  moveHead(mode,x,y) {
    return new Promise((resolve, reject) => {
      if (!this.connected) {
        resolve({
          error: 'Le robot n\'est pas connecté !'
        })
      }
      this.qis.service('ALMotion').then(
        (ALMotion) => {
          ALMotion.changeAngles(mode,x,y).done((result) => {
            resolve({
              'message': result
            });
          });
        },
        () => {
          resolve({
            error: 'Le robot n\'est pas connecté !'
          })
        }
      );
    });
  }
  
  // set ip
  setIP(ip) {
    this.ip = ip;
  }
  
  // get ip
  getIP() {
    return this.ip;
  }
  
  // set inprogress
  setInProgress(inprogress) {
    this.inprogress = inprogress;
  }
  
  // get inprogress
  getInProgress() {
    return this.inprogress;
  }
}

let newNao = new NAO();

export default newNao;
