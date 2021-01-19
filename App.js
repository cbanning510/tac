import React, {useState} from 'react';
import Square from './components/Square';
import {
  SafeAreaView,
  Button,
  StyleSheet,
  View,
  Text,
  StatusBar,
} from 'react-native';

const App = () => {
  const [turn, setTurn] = useState(1);
  const [winner, setWinner] = useState(null);
  const [gameArray, setGameArray] = useState(Array(9).fill(''));

  const wins = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [3, 4, 5],
    [6, 7, 8],
    [2, 4, 6],
  ];

  const checkForThree = (combo, mark) => {
    let result = true;
    combo.forEach((square) => {
      if (gameArray[square] !== mark) {
        result = false;
      }
    });
    return result;
  };

  const resetGame = () => {
    setGameArray(Array(9).fill(''));
    setWinner(null);
    setTurn(1);
  };

  const checkForWinner = (grid, mark) => {
    wins.forEach((combo) => {
      if (checkForThree(combo, mark)) {
        setWinner(turn);
      }
    });
  };

  const markSquare = (grid) => {
    if (!winner) {
      if (!gameArray[grid]) {
        const mark = turn === 1 ? 'X' : 'O';
        gameArray[grid] = mark;
        checkForWinner(grid, mark);
        setTurn(turn === 1 ? 2 : 1);
      }
    }
  };

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.parentContainer}>
        <Button title="New Game" onPress={() => resetGame()} />

        {!winner ? (
          <Text style={styles.playerText}>{`Player ${turn}'s turn!`}</Text>
        ) : (
          <Text
            style={styles.winnerText}>{`Player ${winner} is the winner!`}</Text>
        )}

        <View style={styles.gridContainer}>
          <View style={styles.row}>
            <Square markSquare={markSquare} grid={0} mark={gameArray[0]} />
            <Square markSquare={markSquare} grid={1} mark={gameArray[1]} />
            <Square markSquare={markSquare} grid={2} mark={gameArray[2]} />
          </View>
          <View style={styles.row}>
            <Square markSquare={markSquare} grid={3} mark={gameArray[3]} />
            <Square markSquare={markSquare} grid={4} mark={gameArray[4]} />
            <Square markSquare={markSquare} grid={5} mark={gameArray[5]} />
          </View>
          <View style={styles.row}>
            <Square markSquare={markSquare} grid={6} mark={gameArray[6]} />
            <Square markSquare={markSquare} grid={7} mark={gameArray[7]} />
            <Square markSquare={markSquare} grid={8} mark={gameArray[8]} />
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  parentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gridContainer: {
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  playerText: {
    marginBottom: 10,
  },
  winnerText: {
    color: 'green',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
  },
});

export default App;
