import React, { Component } from 'react';
import { View } from 'react-native';
import { Picker } from "@react-native-picker/picker";
import { listaMedicos } from "../../../../../services/api.js";

const styles = {
  container: {
    backgroundColor: '#282A3A',
    borderRadius: 15,
    width: "90%",
    margin: 15,
  },
  picker: {
    color: "white",
  }
};

class PsychologistPicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedPsychologist: '',
      medicosLista: [],
      isLoading: true,
    };
  }

  componentDidMount() {
    this.fetchMedicos();
  }

  fetchMedicos = async () => {
    try {
      const medicos = await listaMedicos();
      this.setState({ medicosLista: medicos, isLoading: false });
    } catch (error) {
      console.log("Erro ao obter lista de médicos:", error);
      this.setState({ isLoading: false });
    }
  };

  handlePsychologistChange = (itemValue) => {
    this.setState({ selectedPsychologist: itemValue });
    this.props.onPsychologistChange(itemValue);
  };

  renderPickerItems = () => {
    const { medicosLista } = this.state;
    return medicosLista.map((item) => (
      <Picker.Item key={item.id} label={item.nome} value={item.id.toString()} />
    ));
  };

  render() {
    const { selectedPsychologist, isLoading } = this.state;

    if (isLoading) {
      return null;
    }

    console.log("PSICOLOGOS CARREGADOS");

    return (
      <View style={styles.container}>
        <Picker
          selectedValue={selectedPsychologist}
          onValueChange={this.handlePsychologistChange}
          style={styles.picker}
        >
          {this.renderPickerItems()}
        </Picker>
      </View>
    );
  }
}

export default PsychologistPicker;
