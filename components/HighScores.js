import React from 'react';
import {StyleSheet, SafeAreaView, FlatList, Text, View} from 'react-native';

const Item = ({win}) => {
  return (
    <View style={styles.item}>
      <Text style={styles.title}>{win.user}</Text>
      <Text style={styles.title}>{win.moves}</Text>
    </View>
  );
};

const renderItem = ({item, index}) => <Item win={item} />;

const HighScores = (props) => {
  const ScoreList = () => (
    <FlatList
      data={props.wins.sort((a, b) => (a.moves > b.moves ? 1 : -1))}
      renderItem={renderItem}
      keyExtractor={(item, index) => index.toString()}
    />
  );
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titlesContainer}>
        <View style={styles.underline}>
          <Text style={styles.title}>Player</Text>
        </View>
        <View style={styles.underline}>
          <Text style={styles.title}>Moves</Text>
        </View>
      </View>
      <View style={styles.underline} />
      <View>{props.wins && <ScoreList />}</View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'aqua',
  },
  underline: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    paddingBottom: 10,
  },
  titlesContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100,
    marginBottom: 20,
  },
  title: {
    width: 100,
    textAlign: 'center',
    fontSize: 24,
  },
  item: {
    flexDirection: 'row',
  },
});

export default HighScores;
