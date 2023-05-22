import React, { useState } from 'react';
import { View } from 'react-native';
import TemConsulta from "./TemConsulta/index"
import NaoConsulta from "./NaoConsulta/index"


export default function Consultas({ navigation }) {
  const [consulta, setConsulta] = useState(true)

  return (
    <>
      {consulta && <TemConsulta />}
      {!consulta && <NaoConsulta />}
    </>
  );
}
