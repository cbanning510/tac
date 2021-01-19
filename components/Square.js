import React from 'react';
import {StyleSheet, TouchableOpacity, Text} from 'react-native';

export default function Square({grid, mark, markSquare}) {
  return (
    <TouchableOpacity style={styles.button} onPress={() => markSquare(grid)}>
      <Text style={styles.text}>{mark}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 80,
    height: 80,
    margin: 2,
    backgroundColor: '#bbb',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 60,
  },
});
