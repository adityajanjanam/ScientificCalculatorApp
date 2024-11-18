import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function ScientificCalculator() {
  const [display, setDisplay] = useState("");

  const insert = (value) => {
    if (value === '^') {
      setDisplay(display + '**');
    } else {
      setDisplay(display + value);
    }
  };

  const clearDisplay = () => {
    setDisplay("");
  };

  const deleteChar = () => {
    setDisplay(display.slice(0, -1));
  };

  const calculate = () => {
    try {
      setDisplay(
        eval(
          display
            .replace(/sqrt\(/g, 'Math.sqrt(')
            .replace(/log\(/g, 'Math.log10(')
            .replace(/ln\(/g, 'Math.log(')
            .replace(/sin\(/g, 'Math.sin(')
            .replace(/cos\(/g, 'Math.cos(')
            .replace(/tan\(/g, 'Math.tan(')
            .replace(/pi/g, 'Math.PI')
            .replace(/e/g, 'Math.E')
        ).toString()
      );
    } catch {
      setDisplay("Error");
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <TextInput style={styles.display} value={display} editable={false} />
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button} onPress={clearDisplay}><Text>C</Text></TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={deleteChar}><Text>DEL</Text></TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => insert('%')}><Text>%</Text></TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => insert('/')}><Text>/</Text></TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => insert('7')}><Text>7</Text></TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => insert('8')}><Text>8</Text></TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => insert('9')}><Text>9</Text></TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => insert('*')}><Text>*</Text></TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => insert('4')}><Text>4</Text></TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => insert('5')}><Text>5</Text></TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => insert('6')}><Text>6</Text></TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => insert('-')}><Text>-</Text></TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => insert('1')}><Text>1</Text></TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => insert('2')}><Text>2</Text></TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => insert('3')}><Text>3</Text></TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => insert('+')}><Text>+</Text></TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => insert('0')}><Text>0</Text></TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => insert('.')}><Text>.</Text></TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={calculate}><Text>=</Text></TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => insert('^')}><Text>^</Text></TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => insert('sin(')}><Text>sin</Text></TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => insert('cos(')}><Text>cos</Text></TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => insert('tan(')}><Text>tan</Text></TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => insert('sqrt(')}><Text>√</Text></TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => insert('log(')}><Text>log</Text></TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => insert('ln(')}><Text>ln</Text></TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => insert('pi')}><Text>π</Text></TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => insert('e')}><Text>e</Text></TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  display: {
    width: '90%',
    height: 60,
    backgroundColor: '#ffffff',
    textAlign: 'right',
    fontSize: 30,
    marginBottom: 20,
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  buttonsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '90%',
    justifyContent: 'space-between',
  },
  button: {
    width: '22%',
    height: 60,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 5,
    borderRadius: 10,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 20,
  },
});
