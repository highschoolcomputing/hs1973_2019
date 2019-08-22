import 'rc-slider/assets/index.css';
import 'rc-tooltip/assets/bootstrap.css';

import React, { Component } from 'react';
import { connect } from 'react-redux';

//import * as User from '../actions/User';

import Tooltip from 'rc-tooltip';
import Slider from 'rc-slider';

import Header from '../components/Header';

const Handle = Slider.Handle;

const handle = (props) => {
  const { value, dragging, index, ...restProps } = props;
  return (
    <Tooltip
      prefixCls="rc-slider-tooltip"
      overlay={value}
      visible={dragging}
      placement="top"
      key={index}
    >
      <Handle value={value} {...restProps} />
    </Tooltip>
  );
};

class Christmas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      presents: [
        {
          name: 'Lollies',
          percent: 100,
        },
        {
          name: 'Chocolate',
          percent: 0,
        },
        {
          name: 'Cheese',
          percent: 0,
        },
        {
          name: 'Toblerone',
          percent: 0,
        },
      ]
    }
  }

  render() {
    return (
      <div>
        <Header />
        {
          this.state.presents.map((present, idx) => {
            console.log(present, idx);
            return (
              <div style={{margin: '30px', margin: '20px'}} key={idx}>
                <div style={{float:'left', width: '10%'}}>{present.name}</div>
                <div style={{float:'right' , width: '10%', textAlign: 'right'}}>{present.percent}%</div>
                <Slider
                  style={{marginLeft: '10%', width:'80%'}}
                  min={0}
                  max={100}
                  value={present.percent}
                  defaultValue={present.percent}
                  handle={handle}
                  onChange={(newPercentage) => {
                    const presents = this.state.presents;
                    presents[idx].percent = newPercentage;
                    this.setState({
                      presents: presents,
                    });
                  }}
                />
              </div>
            );
          })
        }
        <div>Hello!</div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  //name: state.user.name,
});

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(
  Christmas
);
