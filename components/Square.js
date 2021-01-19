import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity, Text} from 'react-native';

export default function Square({grid, turn, startGame, newGame, toggle}) {
  const [mark, setMark] = useState('');

  const markSquare = () => {
    if (!mark) {
      const letter = turn === 1 ? 'X' : 'O';
      setMark(letter);
      toggle(grid, letter);
      return;
    } else {
      return;
    }
  };
  if (newGame) {
    //setMark('');
    return (
      <TouchableOpacity style={styles.button} onPress={() => markSquare()}>
        <Text style={styles.text}>{''}</Text>
      </TouchableOpacity>
    );
  } else {
    return (
      <TouchableOpacity style={styles.button} onPress={() => markSquare()}>
        <Text style={styles.text}>{mark}</Text>
      </TouchableOpacity>
    );
  }
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
