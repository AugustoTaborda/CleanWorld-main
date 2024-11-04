import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';

export default function RegisterZeroScreen({ navigation }) {
  const [empresa, setEmpresa] = useState('');
  const [pessoaFisica, setPessoaFisica] = useState('');
  const [selectedOption, setSelectedOption] = useState(0); // 0: Pessoa Física, 1: Empresa

  const handleRegisterZero = () => {
    if (selectedOption === 1 && empresa.trim() !== '') {
      // Se for empresa e o campo não estiver vazio
      navigation.navigate("RegisterSecondScreen", { empresa, tipo: selectedOption });
    } else if (selectedOption === 0 && pessoaFisica.trim() !== '') {
      // Se for pessoa física e o campo não estiver vazio
      navigation.navigate("Register", { pessoaFisica, tipo: selectedOption });
    } else {
      alert('Por favor, preencha o campo correspondente antes de prosseguir.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Image 
            source={require('../../../assets/—Pngtree—green leaves vector icon design_5224035.png')} 
            style={styles.image}
          />
          <Text style={styles.text}>CleanWorld</Text>
        </View>
      </View>

      <Text style={styles.loginTitle}>Vamos iniciar</Text>
      <View style={styles.divider} />

      <View style={styles.toggleContainer}>
        <TouchableOpacity
          style={[styles.toggleButton, selectedOption === 0 ? styles.activeToggle : styles.inactiveToggle]}
          onPress={() => {
            setSelectedOption(0);
            setEmpresa(''); // Limpa o campo da empresa se selecionar pessoa física
          }}
        >
          <Text style={[styles.toggleText, selectedOption === 0 ? styles.activeText : styles.inactiveText]}>
            Pessoa Física
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.toggleButton, selectedOption === 1 ? styles.activeToggle : styles.inactiveToggle]}
          onPress={() => {
            setSelectedOption(1);
            setPessoaFisica(''); // Limpa o campo da pessoa física se selecionar empresa
          }}
        >
          <Text style={[styles.toggleText, selectedOption === 1 ? styles.activeText : styles.inactiveText]}>
            Empresa
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.loginBox}>
        {selectedOption === 1 && (
          <>
            <Text style={styles.label}>Empresa:</Text>
            <TextInput
              style={styles.input}
              placeholder="Digite o nome da empresa"
              value={empresa}
              onChangeText={setEmpresa}
            />
          </>
        )}

        {selectedOption === 0 && (
          <>
            <Text style={styles.label}>Pessoa Física:</Text>
            <TextInput
              style={styles.input}
              placeholder="Digite seu nome"
              value={pessoaFisica}
              onChangeText={setPessoaFisica}
            />
          </>
        )}

        <TouchableOpacity style={styles.button} onPress={handleRegisterZero}>
          <Text style={styles.buttonText}>Próximo</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#83D07F',
  },
  header: {
    backgroundColor: '#ffffff',
    width: '100%',
    paddingVertical: 20,
    alignItems: 'center',
    elevation: 5,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 60,
    height: 60,
    marginRight: 5,
  },
  text: {
    fontSize: 34,
    color: '#0D0D0D',
  },
  loginTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
    color: '#FFFFFF',
  },
  divider: {
    height: 1,
    backgroundColor: '#FFFFFF',
    marginVertical: 10,
    width: '50%',
    alignSelf: 'center',
  },
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
  },
  toggleButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    width: '40%',
    alignItems: 'center',
  },
  activeToggle: {
    backgroundColor: '#83D07F',
  },
  inactiveToggle: {
    backgroundColor: '#D3D3D3',
  },
  toggleText: {
    fontWeight: 'bold',
  },
  activeText: {
    color: '#FFFFFF',
  },
  inactiveText: {
    color: '#83D07F', // Tom mais escuro para o texto inativo
  },
  loginBox: {
    backgroundColor: '#ffffff',
    width: '90%',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    marginTop: 20,
    alignSelf: 'center',
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    width: '100%',
    padding: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#ced4da',
    borderRadius: 5,
  },
  button: {
    backgroundColor: '#83D07F',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
