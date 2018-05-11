import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import isUndefined from 'lodash/isUndefined';
import isEmpty from 'lodash/isEmpty';
import isNull from 'lodash/isNull';

import { Container,Grid,Input, Header, Button , Icon } from 'semantic-ui-react';

import { NaoMove,NaoSay, NaoRasta, NaoMoveHead } from '../../actions';
import getRobotDefault from '../../selectors/getRobotDefault';

class Home extends Component {
  
  constructor() {
    super();
    this.move = this.move.bind(this);
    this.moveHead = this.moveHead.bind(this);
    this.sayValue = '';
    this.rastaTime = 5;
  }
  
  move(x,y,theta) {
    // si il y a rien qui tourne deja !
    if (!this.props.processing) {
      this.props.actions.NaoMove({x, y, theta});
    }
  }
  
  moveHead(mode,x,y) {
    // si il y a rien qui tourne deja !
    if (!this.props.processing) {
      this.props.actions.NaoMoveHead({mode,x,y});
    }
  }
  
  render() {
    return isUndefined(this.props.robot) ? null : (
        <div>
          <Container fluid textAlign="center">
            <Header as="h3" >Ces actions ne fonctionnent que si le robot n'est pas en mode pause</Header>
            <br/>
          </Container>
          <Container fluid>
            <Grid columns='equal' textAlign="center" divided>
              <Grid.Column>
                <Header>Déplacement Corps</Header>
                <Grid textAlign="center" columns='three' stretched>
                  <Grid.Row>
                    <Grid.Column>
                      <Button icon onClick={() => {this.move(0.5, 0.0, 1.26)}} disabled={this.props.processing}>
                        <Icon fitted name="arrow left" size="big" className="fa-rotate-45"/>
                      </Button>
                    </Grid.Column>
                    <Grid.Column>
                      <Button disabled={this.props.processing} icon="arrow up" size="massive" onClick={() => {this.move(0.1, 0.0, 0.0)}}/>
                    </Grid.Column>
                    <Grid.Column>
                      <Button icon onClick={() => {this.move(0.5, 0.0, -1.26)}} disabled={this.props.processing}>
                        <Icon fitted name="arrow up" size="big" className="fa-rotate-45"/>
                      </Button>
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row>
                    <Grid.Column>
                      <Button icon="arrow left" size="massive" onClick={() => {this.move(0.0, 0.1, 0.0)}} disabled={this.props.processing}/>
                    </Grid.Column>
                    <Grid.Column>
                      <Icon fitted name="reddit alien" size="huge" style={{color: this.props.robot.color}}/>
                    </Grid.Column>
                    <Grid.Column>
                      <Button icon="arrow right" size="massive" onClick={() => {this.move(0.0, -0.1, 0.0)}} disabled={this.props.processing}/>
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row>
                    <Grid.Column>
                      <Button icon disabled={this.props.processing}>
                        <Icon fitted name="arrow down" size="big" className="fa-rotate-45" onClick={() => {this.move(-0.5, 0.0, 1.26)}}/>
                      </Button>
                    </Grid.Column>
                    <Grid.Column>
                      <Button disabled={this.props.processing} icon="arrow down" size="massive" onClick={() => {this.move(-0.1,0,0)}}/>
                    </Grid.Column>
                    <Grid.Column>
                      <Button icon disabled={this.props.processing}>
                        <Icon fitted name="arrow right" size="big" className="fa-rotate-45" onClick={() => {this.move(-0.5, 0.0, -1.26)}} />
                      </Button>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Grid.Column>
              <Grid.Column>
                <Header>Autres fonction</Header>
                <Header as="h3" content="Mode rasta" textAlign="left"/>
                <Input disabled={this.props.processing} label="Pendant " fluid onChange={ (e) => {this.rastaTime = e.target.value}} placeholder="X secondes" action={
                  {
                    onClick: () => {
                      if (!this.props.processing && !isEmpty(this.rastaTime) && !isNull(this.rastaTime)) {
                        this.props.actions.NaoRasta(this.rastaTime);
                      }
                    },
                    content: 'Executer'
                  }
                }/>
                <Header as="h3" content="Mode parlotte" textAlign="left"/>
                <Input disabled={this.props.processing} label="Faire dire " fluid onChange={ (e) => {this.sayValue = e.target.value}} placeholder="Coucou" action={
                  {
                    onClick: () => {
                      if (!this.props.processing && !isEmpty(this.sayValue) && !isNull(this.sayValue)) {
                        this.props.actions.NaoSay(this.sayValue);
                      }
                    },
                    content: 'Executer'
                  }
                }/>
              </Grid.Column>
              <Grid.Column>
                <Header>Déplacement Tête</Header>
                <Grid textAlign="center" columns='three' stretched>
                  <Grid.Row>
                    <Grid.Column>
                    </Grid.Column>
                    <Grid.Column>
                      <Button icon="chevron up" size="massive" onClick={() => {this.moveHead('HeadPitch',-0.10,0.25)}} disabled={this.props.processing}/>
                    </Grid.Column>
                    <Grid.Column>
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row>
                    <Grid.Column>
                      <Button icon="chevron left" size="massive" onClick={() => {this.moveHead('HeadYaw',0.15,0.5)}} disabled={this.props.processing}/>
                    </Grid.Column>
                    <Grid.Column>
                      <Icon fitted name="reddit alien" size="huge" style={{color: this.props.robot.color}}/>
                    </Grid.Column>
                    <Grid.Column>
                      <Button icon="chevron right" size="massive" onClick={() => {this.moveHead('HeadYaw',-0.15,0.5)}} disabled={this.props.processing}/>
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row>
                    <Grid.Column>
                    </Grid.Column>
                    <Grid.Column>
                      <Button icon="chevron down" size="massive" onClick={() => {this.moveHead('HeadPitch',0.10,0.25)}} disabled={this.props.processing}/>
                    </Grid.Column>
                    <Grid.Column>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Grid.Column>
            </Grid>
          </Container>
        </div>
      );
  }
}

Home.propTypes = {
  actions: PropTypes.shape({}),
  mode: PropTypes.any,
  robot: PropTypes.any,
  processing: PropTypes.any,
};

function mapStateToProps(state) { // eslint-disable-line no-unused-vars
  return {
    mode: state.app.mode,
    robot: getRobotDefault(state),
    processing: state.app.nao.processing
  };
}

function mapDispatchToProps(dispatch) {
  const actions = {
    NaoMove,
    NaoSay,
    NaoRasta,
    NaoMoveHead
  };
  return { actions: bindActionCreators(actions, dispatch) };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);