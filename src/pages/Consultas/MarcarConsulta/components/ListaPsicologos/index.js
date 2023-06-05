import React, { Component } from 'react';
import { View, Picker, FlatList, StyleSheet } from 'react-native';

class FlatListPicker extends Component {
  renderItem = ({ item }) => {
    console.log("\nITEM\n")
    console.log(item)

    return (
      <Picker.Item
        label={item.nome}
        value={item.id.toString()}
      />
    )
  }

  render() {
    return (
          <FlatList
            data={this.props.data}
            renderItem={this.renderItem}
            keyExtractor={(item) => item.id.toString()}
          />
    );
  }
}

const styles = StyleSheet.create({
  picker: {
    backgroundColor: 'lightgray',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    marginBottom: 10,
  },
});

export default FlatListPicker;