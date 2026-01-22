import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { evaluateExpression } from './src/calc';

export default function ScientificCalculator() {
  const [display, setDisplay] = useState("");
  const [history, setHistory] = useState([]);
  const [angleMode, setAngleMode] = useState('DEG');

  const insert = (value) => {
    setDisplay((prev) => prev + (value === '^' ? '**' : value));
  };

  const clearDisplay = () => {
    setDisplay("");
  };

  const deleteChar = () => {
    setDisplay(display.slice(0, -1));
  };

  const calculate = () => {
    if (!display) return;

    try {
      const result = evaluateExpression(display, angleMode);

      setHistory((prev) => [{ expression: display, result: result.toString() }, ...prev].slice(0, 6));
      setDisplay(result.toString());
    } catch (err) {
      setDisplay("Error");
    }
  };

  const toggleAngleMode = () => {
    setAngleMode((prev) => (prev === 'DEG' ? 'RAD' : 'DEG'));
  };

  const clearHistory = () => setHistory([]);

  const buttons = [
    ['C', clearDisplay, 'ghost'],
    ['DEL', deleteChar, 'ghost'],
    ['(', () => insert('('), 'ghost'],
    [')', () => insert(')'), 'ghost'],
    ['7', () => insert('7')],
    ['8', () => insert('8')],
    ['9', () => insert('9')],
    ['/', () => insert('/')],
    ['4', () => insert('4')],
    ['5', () => insert('5')],
    ['6', () => insert('6')],
    ['*', () => insert('*')],
    ['1', () => insert('1')],
    ['2', () => insert('2')],
    ['3', () => insert('3')],
    ['-', () => insert('-')],
    ['0', () => insert('0')],
    ['.', () => insert('.')],
    ['^', () => insert('^')],
    ['+', () => insert('+')],
    ['sin', () => insert('sin('), 'accent'],
    ['cos', () => insert('cos('), 'accent'],
    ['tan', () => insert('tan('), 'accent'],
    ['√', () => insert('sqrt('), 'accent'],
    ['log', () => insert('log('), 'accent'],
    ['ln', () => insert('ln('), 'accent'],
    ['π', () => insert('pi'), 'accent'],
    ['e', () => insert('e'), 'accent'],
    [`${angleMode}`, toggleAngleMode, 'mode'],
    ['=', calculate, 'primary'],
  ];

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.displayWrapper}>
        <TextInput style={styles.display} value={display} editable={false} multiline />
        <View style={styles.modeRow}>
          <Text style={styles.modeLabel}>Angle</Text>
          <TouchableOpacity style={[styles.smallPill, styles.modePill]} onPress={toggleAngleMode}>
            <Text style={styles.modeText}>{angleMode}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.smallPill, styles.ghostPill]} onPress={clearHistory}>
            <Text style={styles.modeText}>Clear History</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.buttonsContainer}>
        {buttons.map(([label, handler, variant], idx) => (
          <TouchableOpacity
            key={`${label}-${idx}`}
            style={[styles.button, variant === 'primary' && styles.primaryButton, variant === 'ghost' && styles.ghostButton, variant === 'accent' && styles.accentButton, variant === 'mode' && styles.modeButton]}
            onPress={handler}
          >
            <Text style={[styles.buttonText, variant === 'ghost' && styles.ghostText]}>{label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.historyContainer}>
        <Text style={styles.historyTitle}>History</Text>
        <ScrollView style={styles.historyList}>
          {history.length === 0 && <Text style={styles.historyEmpty}>No calculations yet</Text>}
          {history.map((item, index) => (
            <TouchableOpacity key={`${item.expression}-${index}`} onPress={() => setDisplay(item.result)} style={styles.historyItem}>
              <Text style={styles.historyExpression}>{item.expression}</Text>
              <Text style={styles.historyResult}>= {item.result}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#020617',
  },
  scrollView: {
    flex: 1,
    width: '100%',
  },
  scrollContent: {
    flexGrow: 1,
    alignItems: 'center',
    paddingTop: 40,
    paddingBottom: 20,
  },
  displayWrapper: {
    width: '90%',
    backgroundColor: '#0b1220',
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: '#1e293b',
    marginBottom: 12,
  },
  display: {
    minHeight: 70,
    color: '#e5e7eb',
    backgroundColor: '#0b1220',
    textAlign: 'right',
    fontSize: 30,
    padding: 6,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#1f2937',
  },
  modeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  modeLabel: {
    color: '#94a3b8',
    fontSize: 14,
  },
  smallPill: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#1f2937',
    marginLeft: 8,
  },
  modePill: {
    backgroundColor: '#0ea5e9',
    borderColor: '#0284c7',
  },
  ghostPill: {
    backgroundColor: '#0f172a',
  },
  modeText: {
    color: '#e5e7eb',
    fontWeight: '600',
    fontSize: 12,
  },
  buttonsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '90%',
    justifyContent: 'space-between',
    marginVertical: 8,
  },
  button: {
    width: '22%',
    height: 60,
    backgroundColor: '#0f172a',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 5,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#1e293b',
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  buttonText: {
    color: '#e5e7eb',
    fontSize: 18,
    fontWeight: '600',
  },
  primaryButton: {
    backgroundColor: '#f97316',
    borderColor: '#ea580c',
    width: '46%',
  },
  accentButton: {
    backgroundColor: '#14b8a6',
    borderColor: '#0d9488',
  },
  ghostButton: {
    backgroundColor: '#0b1220',
    borderColor: '#1e293b',
  },
  ghostText: {
    color: '#e5e7eb',
  },
  modeButton: {
    backgroundColor: '#0f172a',
    borderColor: '#1e293b',
  },
  historyContainer: {
    width: '90%',
    backgroundColor: '#0b1220',
    borderRadius: 12,
    padding: 12,
    marginTop: 12,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#1e293b',
  },
  historyTitle: {
    color: '#94a3b8',
    fontSize: 14,
    marginBottom: 6,
    fontWeight: '600',
  },
  historyList: {
    flexGrow: 0,
  },
  historyItem: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#1f2937',
  },
  historyExpression: {
    color: '#e5e7eb',
    fontSize: 14,
  },
  historyResult: {
    color: '#22c55e',
    fontSize: 16,
    fontWeight: '700',
  },
  historyEmpty: {
    color: '#6b7280',
    fontSize: 14,
    paddingVertical: 8,
  },
});
