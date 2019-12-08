import React from 'react';
import { View, StyleSheet, FlatList, ListRenderItemInfo } from 'react-native';

import BodyText from 'components/custom/BodyText';

import { IProps } from './types';


const List = (props: IProps) => {
  const renderListItem = (listLength: number, itemData: ListRenderItemInfo<string>) => (
    <View style={styles.listItem}>
      <BodyText>#{listLength - itemData.index}</BodyText>
      <BodyText>
        {itemData.item}
      </BodyText>
    </View>
  );

  const listContainerStyle = props.dimensions.width > 350 ?
    styles.listContainerBig : styles.listContainer;

  return (
    <View style={listContainerStyle}>
      <FlatList
        contentContainerStyle={styles.list}
        keyExtractor={item => item}
        data={props.guesses}
        renderItem={(item) => renderListItem(props.guesses.length, item)}
      />
    </View>
  )
};

const styles = StyleSheet.create({
  listContainerBig: {
    flex: 1,
    width: '60%',
  },
  listContainer: {
    flex: 1,
    width: '80%',
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderColor: '#ccc',
    padding: 10,
    marginVertical: 10,
    backgroundColor: 'white',
    borderWidth: 1,
    borderRadius: 5,
    width: '100%',
  },
  list: {
    flexGrow: 1,
    justifyContent: 'flex-end',
  }
});

export default List;
