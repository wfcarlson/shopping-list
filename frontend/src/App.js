import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';
import ItemModel from './ItemModel';
import './App.css';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Fetch from 'react-fetch';
import ShoppingListView from './ShoppingListView';

class App extends Component {
  constructor(){
    super();
    this.state = {
      newItem: new ItemModel(),
      itemList: []
    }
  }

  componentWillMount() {
    this.getList();
  }

  getList = () => {
    var data = {
      'method': 'GET',
      headers: {'Content-Type': 'application/json'},
    };
    fetch('http://localhost:8080/list/items/', data)
      .then((response) => { return response.json(); })
      .then((response) => {
        this.setState({itemList: response.map((item) => { return new ItemModel(item); }) });
      });
  }

  onEditTextField = (event, data) => {
    var i = this.state.newItem;
    i.text = data;
    this.setState({newItem: i});
  }

  saveItem = () => {
    var data = {
      'method': "POST",
      'body': JSON.stringify(this.state.newItem),
      headers: {'Content-Type': 'application/json'},
    };
    fetch('http://localhost:8080/list/items/', data).then(function(response) {
        console.log(response);
    }).then(this.getList())
  }

  render() {
    return (
      <MuiThemeProvider>
        <Grid fluid>
          <Row center="xs" >
            <Col>
              <Row center="xs">
                <h1>Shopping List App</h1>
              </Row>
              <Row center="xs">
                <ShoppingListView itemList={this.state.itemList} getList={this.getList}/>
              </Row>
              <form>
                <Row center="xs">
                  <TextField
                    floatingLabelText="New Item"
                    onChange={this.onEditTextField}
                  />
                </Row>
                <Row center="xs">
                  <RaisedButton 
                    label="Save"
                    onClick={this.saveItem}
                    primary={true}
                  />
                </Row>
              </form>
            </Col>
          </Row>
        </Grid>
      </MuiThemeProvider>
    );
  }
}

export default App;
