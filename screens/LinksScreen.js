import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, ListItem } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import moment from 'moment';

export default function LinksScreen({ route }) {
  const datos = route.params
    ? route.params.data
    : { name: 'Elije un País', data: [] };
  const hoy = moment();

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <View style={styles.texto}>
        <Text h1 h1Style={styles.titulo}>
          {datos.name}
        </Text>
      </View>
      {datos.map((l, i) => (
        <ListItem
          key={i}
          title={
            l.date +
            ' (hace ' +
            hoy.diff(moment(l.date, 'YYYY-M-DD'), 'days') +
            ' días )'
          }
          subtitle={
            'Confirmados:' +
            l.confirmed +
            ' Muertes:' +
            l.deaths +
            ' Recuperados:' +
            l.recovered
          }
          bottomDivider
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa'
  },
  texto: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  },
  titulo: {
    fontSize: 35,
    paddingBottom: 15
  },
  contentContainer: {
    paddingTop: 15
  },
  optionIconContainer: {
    marginRight: 12
  },
  option: {
    backgroundColor: '#fdfdfd',
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: 0,
    borderColor: '#ededed'
  },
  lastOption: {
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  optionText: {
    fontSize: 15,
    alignSelf: 'flex-start',
    marginTop: 1
  }
});
