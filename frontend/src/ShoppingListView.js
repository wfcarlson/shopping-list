import React, { Component } from 'react';
import './App.css';
import { List, ListItem } from 'material-ui/List';

export default class ShoppingListView extends Component {
  constructor(props){
    super(props);
    this.state = {
      itemList: [],
    }
  }

  componentWillReceiveProps(newProps) {
    this.setState({
        itemList: newProps.itemList
    });
  }

  componentDidMount() {
    this.setState({
        itemList: this.props.itemList
    });
  }

  setItemDone = (item) => {
    return () => {
        item.done = !item.done;
        var data = {
        'method': "PUT",
        'body': JSON.stringify(item),
        headers: {'Content-Type': 'application/json'},
        };
        fetch('http://localhost:8080/list/item/' + item.id + '/', data)
            .then(() =>  { this.props.getList(); })
    }
  }

  renderItem = (item) => {
    var style = {}
    if (item.done)
    {
        style = {textDecoration:'line-through'};
    }

    return (<ListItem key={item.id} style={style} primaryText={item.text} onClick={this.setItemDone(item)} />);
  }

  render(){
      return (
        <List>
            {this.state.itemList.sort((a, b) => {a.id > b.id}).map(this.renderItem)}
        </List>
      );
  }
}