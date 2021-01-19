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

const App: () => React$Node = () => {
  const [turn, setTurn] = useState(1);
  const [gameState, setGameState] = useState({});
  const [winner, setWinner] = useState(null);
  const [newGame, setNewGame] = useState(false);

  const wins = [
    [1, 2, 3],
    [1, 4, 7],
    [1, 5, 9],
    [2, 5, 8],
    [3, 6, 9],
    [4, 5, 6],
    [7, 8, 9],
    [3, 5, 7],
  ];

  const checkForThree = (combo, mark) => {
    let result = true;
    combo.forEach((square) => {
      if (gameState[square] !== mark) {
        result = false;
      }
    });
    return result;
  };

  const startGame = () => {
    console.log(gameState);
    setNewGame(false);
  };

  const resetGame = () => {
    setGameState({});
    setNewGame(true);
  };

  const checkForWinner = (grid, mark) => {
    gameState[grid] = mark;
    wins.forEach((combo) => {
      if (checkForThree(combo, mark)) {
        setWinner(turn);
      }
    });
  };

  const togglePlayer = (grid, mark) => {
    setNewGame(false);
    checkForWinner(grid, mark);
    setGameState({...gameState, [grid]: mark});
    setTurn(turn === 1 ? 2 : 1);
  };

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.parentContainer}>
        <Button title="New Game" onPress={() => resetGame()} />

        <Text style={styles.playerText}>{`Player ${turn}'s turn!`}</Text>
        <View style={styles.gridContainer}>
          <View style={styles.row}>
            <Square
              toggle={togglePlayer}
              newGame={newGame}
              startGame={startGame}
              turn={turn}
              grid={1}
            />
            <Square
              toggle={togglePlayer}
              newGame={newGame}
              startGame={startGame}
              turn={turn}
              grid={2}
            />
            <Square
              toggle={togglePlayer}
              newGame={newGame}
              startGame={startGame}
              turn={turn}
              grid={3}
            />
          </View>
          <View style={styles.row}>
            <Square
              toggle={togglePlayer}
              newGame={newGame}
              startGame={startGame}
              turn={turn}
              grid={4}
            />
            <Square
              toggle={togglePlayer}
              newGame={newGame}
              startGame={startGame}
              turn={turn}
              grid={5}
            />
            <Square
              toggle={togglePlayer}
              newGame={newGame}
              startGame={startGame}
              turn={turn}
              grid={6}
            />
          </View>
          <View style={styles.row}>
            <Square
              toggle={togglePlayer}
              newGame={newGame}
              startGame={startGame}
              turn={turn}
              grid={7}
            />
            <Square
              toggle={togglePlayer}
              newGame={newGame}
              startGame={startGame}
              turn={turn}
              grid={8}
            />
            <Square
              toggle={togglePlayer}
              newGame={newGame}
              startGame={startGame}
              turn={turn}
              grid={9}
            />
          </View>
        </View>
        {winner ? (
          <Text
            style={styles.winnerText}>{`Player ${winner} is the winner!`}</Text>
        ) : (
          <Text style={styles.winnerText} />
        )}
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
    marginTop: 10,
  },
  row: {
    flexDirection: 'row',
  },
});

export default App;
