import React, { Component } from 'react';


const styles = {
  button: {
    marginTop:'30px',
    marginBottom:'20px'
  }
}

export default class FlightSearchContainer extends Component {
  constructor() {
    super();
    this.state = {
      to: '',
      from: '',
    };
    this.handleToChange = this.handleToChange.bind(this)
    this.handleFromChange = this.handleFromChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleToChange(e){
    this.setState({ to: e.target.value });
  }
  handleFromChange(e){
    this.setState({ from: e.target.value });
  }
  handleSubmit(e){
    e.preventDefault();
    var to = this.state.to.trim();
    var from = this.state.from.trim();
    if( !to || !from){
      return;
    }
    this.props.handleFlightClick(to, from)
  }


  render() {
    return (
      <div>
      <form onSubmit={this.handleSubmit}
        className="form-signin col-md-6 col-md-offset-3 text-center"
        >
            <h3>Enter to</h3>
            <input
              type="text"
              placeholder="Paris"
              value={this.state.to}
              className="form-control"
              onChange={this.handleToChange}
            />
            <h3>Enter from</h3>
            <input
              type="text"
              placeholder="Melbourne"
              className="form-control"
              value={this.state.from}
              onChange={this.handleFromChange}
            />

            <input type="submit" value="Post" className="ghost-button"
              style={styles.button}/>
          </form>

      </div>
    );
  }
}