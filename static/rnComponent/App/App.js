import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Dimensions } from 'react-native';
import RightSlide from './RightSlide';
import LeftSlide from './LeftSlide';
import Main from './Main';

import SideMenu from 'react-native-side-menu'
import * as actions from './store/actions'

let { width, height } = Dimensions.get('window');

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenLeft: false,
      isOpen: false
    }
  }

  componentDidMount() {
    var params = 'today?dev=1';
    this.props.request(params)

  }


  SelectDirectionLeft = () => {
    this.setState({
      isOpen: false,
      isOpenLeft: true
    })
  }

  SelectDirectionRight = () => {
    this.setState({
      isOpen: true,
      isOpenLeft: false
    })
  }
  closeIsopen=()=>{
    this.setState({
      isOpen: !this.state.isOpen
    })
  }

  render() {
    const { isOpen, isOpenLeft } = this.state;
    return (
      <SideMenu menu={<LeftSlide closeIsopenLeft={this.closeIsopenLeft}/>}
        isOpen={isOpenLeft}
        menuPosition={'left'}
        openMenuOffset={0.20 * width}//侧边栏的宽度
        edgeHitWidth={200}>

        <SideMenu menu={<RightSlide closeIsopen={this.closeIsopen}/>}
          isOpen={isOpen}
          menuPosition={'right'}
          openMenuOffset={0.20 * width}//侧边栏的宽度
          edgeHitWidth={200}>
          <Main SelectDirectionRight={this.SelectDirectionRight} SelectDirectionLeft={this.SelectDirectionLeft} />
        </SideMenu>

      </SideMenu>

      // this.state.direction === 'left'?

      // <SideMenu menu={<LeftSlide/>}
      //   isOpen={isOpenLeft}
      //   menuPosition={'left'}
      //   openMenuOffset={0.20 * width}//侧边栏的宽度
      //   edgeHitWidth={200}>
      //   <Main SelectDirectionRight={this.SelectDirectionRight} SelectDirectionLeft={this.SelectDirectionLeft}/>
      // </SideMenu>

      // :
      // <SideMenu menu={<RightSlide/>}
      //   isOpen={isOpen}
      //   // onChange={(isOpen) => {
      //   //   if (isOpen) {
      //   //     this.setState({
      //   //       isOpen: isOpen,
      //   //     })
      //   //   }
      //   // }}
      //   menuPosition={'right'}
      //   openMenuOffset={0.20 * width}//侧边栏的宽度
      //   edgeHitWidth={200}> 
      //   <Main SelectDirectionRight={this.SelectDirectionRight} SelectDirectionLeft={this.SelectDirectionLeft}/>
      // </SideMenu>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    //  isOpen: state.isOpen,
    //  isOpenLeft: state.isOpenLeft
  };
}
function mapDispatchToProps(dispatch) {
  return {
    request: (data) => dispatch(actions.onRequestApiResult(data))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(App)
