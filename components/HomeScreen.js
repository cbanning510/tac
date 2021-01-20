import 'react-native-gesture-handler';
import React, {useState, useEffect} from 'react';
import Square from './Square';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  SafeAreaView,
  Button,
  Modal,
  StyleSheet,
  View,
  Text,
  TextInput,
  StatusBar,
  TouchableHighlight,
} from 'react-native';

const HomeScreen = (props) => {
  const [turn, setTurn] = useState(1);
  const [wins, setWins] = useState([]);
  const [winner, setWinner] = useState(null);
  const [gameArray, setGameArray] = useState(Array(9).fill(''));
  const [modalVisible, setModalVisible] = useState(false);
  const [player1, onChangePlayerOneText] = React.useState('');
  const [player2, onChangePlayerTwoText] = React.useState('');

  useEffect(() => {
    async function getWins() {
      try {
        const value = await AsyncStorage.getItem('wins');
        if (!isEmpty(value)) {
          let data = JSON.parse(value);
          console.log('data in useEffect is: ', data);
          setWins(data);
          props.updateWins(data);
          resetGame();
        } else {
          resetGame();
        }
      } catch (error) {
        console.log('error getting AsyncStorage data ', error);
      }
    }
    getWins();
  }, []);

  const winningCombos = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [3, 4, 5],
    [6, 7, 8],
    [2, 4, 6],
  ];

  function isEmpty(obj) {
    return !obj || Object.keys(obj).length === 0;
  }

  const checkForThreeInRow = (combo, mark) => {
    let result = true;
    combo.forEach((square) => {
      if (gameArray[square] !== mark) {
        result = false;
      }
    });
    return result;
  };

  const resetGame = () => {
    onChangePlayerOneText('');
    onChangePlayerTwoText('');
    setModalVisible(true);
    setGameArray(Array(9).fill(''));
    setWinner(null);
    setTurn(1);
  };

  const getPlayer = () => {
    return turn === 1 ? player1 : player2;
  };

  const getWinnerMoves = (player) => {
    const mark = player === 1 ? 'X' : 'O';
    return gameArray.reduce((prev, curr) => {
      return (prev += curr === mark ? 1 : 0);
    }, 0);
  };

  const storeData = async (value) => {
    console.log('storeDdata called!!! Wins are: ', value);
    props.updateWins(value);
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem('wins', jsonValue);
    } catch (e) {
      console.log('error ERROR!!!!!! ', e);
    }
  };

  const storeWinner = () => {
    const moves = getWinnerMoves(turn);
    const user = getPlayer();
    if (isEmpty(wins)) {
      setWins([{user: user, moves: moves}]);
    } else {
      setWins([...wins, {user: user, moves: moves}]);
    }
    storeData([...wins, {user: user, moves: moves}]);
  };

  const checkForWinner = (grid, mark) => {
    winningCombos.forEach((combo) => {
      if (checkForThreeInRow(combo, mark)) {
        setWinner(turn);
        storeWinner();
      }
    });
  };

  const markSquare = (grid) => {
    console.log('wins: ', wins);
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
        <Modal animationType="slide" transparent={true} visible={modalVisible}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Player 1 initials:</Text>
              <TextInput
                style={styles.textInput}
                onChangeText={(text) =>
                  onChangePlayerOneText(text.toUpperCase())
                }
                value={player1}
                maxLength={2}
                textAlign={'center'}
              />
              <Text style={styles.modalText}>Player 2 initials:</Text>
              <TextInput
                style={styles.textInput}
                onChangeText={(text) =>
                  onChangePlayerTwoText(text.toUpperCase())
                }
                value={player2}
                maxLength={2}
                textAlign={'center'}
              />
              <TouchableHighlight
                style={{...styles.okButton, backgroundColor: '#2196F3'}}
                onPress={() => {
                  setModalVisible(!modalVisible);
                }}>
                <Text style={styles.textStyle}>OK</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>

        {!winner ? (
          <Text style={styles.playerText}>{`${
            turn === 1 ? player1 : player2
          }'s turn!`}</Text>
        ) : (
          <Text style={styles.winnerText}>{`${
            winner === 1 ? player1 : player2
          } is the winner!`}</Text>
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
  textInput: {
    height: 40,
    width: 50,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 4,
    marginBottom: 10,
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

  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 2,
  },
  modalView: {
    margin: 2,
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  okButton: {
    backgroundColor: '#F194FF',
    borderRadius: 2,
    padding: 10,
    elevation: 2,
    marginTop: 10,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 6,
    textAlign: 'center',
  },
});

export default HomeScreen;
