import React, { Component } from 'react';
import {getGroups} from '../helpers/api'
import GroupTab from '../components/GroupTab'

class HomeConatiner extends Component {

    constructor() {
    super();
    this.state = {
      groups: [],
    };

  }

    componentWillMount() {
    // check if user is logged in
    // then set state
    console.log('did mount', this.props.token)
    getGroups()
      .then((res)=>{
        console.log(res)
        if(res.statusText === 'OK'){
          this.setState({
            groups: res.data
          })
        }
      })
  }



  render() {
    const groups = this.state.groups.map((group)=>{
      console.log(group._id)
      return <GroupTab key={group._id} _id={String(group._id)} groupname={group.name} users={group.users} />
    })
    return (
      <div>
        {groups}
      </div>
    );
  }
}


export default HomeConatiner;