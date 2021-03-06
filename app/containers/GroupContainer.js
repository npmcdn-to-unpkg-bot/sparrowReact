import React, { Component, PropTypes } from 'react';
import {getGroup} from '../helpers/api'
import Group from '../components/Group'



//Group container handles rendering the top bar through group
//and then renders the child component passed in through routes
class GroupContainer extends Component {

  constructor(){
    super();
    this.state = {
      loading:true,
      groupData: {},
      currentDestination: {}
    }
    this.handleDestinationClick = this.handleDestinationClick.bind(this)
  }

  componentDidMount(){
    //split id as there is two
    getGroup(this.props.routeParams.id)
      .then((res)=>{
        if(res){
          if(res.statusText === 'OK'){
            this.setState({
              loading:false,
              groupData: res.data.group,
              currentDestination: res.data.group.destinations[0],
              authUser: res.data.user
            })
          }
        }

      })
  }

  handleDestinationClick(destination){
    this.setState({
      currentDestination: destination
    })

  }

  render() {
    return (
      <div>
      {
        this.state.loading === true
          ? <p>Loading</p>
          : <div>
            <Group
                groupName={this.state.groupData.name}
                users={this.state.groupData.users}
                destinations={this.state.groupData.destinations}
                currentDestination={this.state.currentDestination}
                onDestinationClick={this.handleDestinationClick}
                routeParams={this.props.routeParams}
                authUser={this.state.authUser}
              />
           {
            //This is the children element passed in from routes.js
            //we want to pass in any props it will need
            React.cloneElement(this.props.children,
              {
                groupId:this.state.groupData._id,
                destination:this.state.currentDestination,
                users:this.state.groupData.users,
                loggedInUser: this.props.loggedInUser,
                authUser:this.state.authUser,
                chat:this.state.groupData.chat,
                flights: this.state.groupData.flights,
                groupName: this.state.groupData.name
              }
            )}
            </div>
      }
      </div>
    );
  }
}

GroupContainer.contextTypes = {
  router: React.PropTypes.object.isRequired
}

export default GroupContainer;
