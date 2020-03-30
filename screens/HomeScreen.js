import React, { useState, useEffect } from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import * as servicios from '../servicios';
import { ListItem, Input } from 'react-native-elements';

export default function HomeScreen({ navigation }) {
  const [list, setList] = useState([]);
  const [filterlist, setFilterlist] = useState([]);

  useEffect(() => {
    servicios.paises.tiempo().then(response => {
      let aux = [];
      Object.keys(response.data).map((key)=> {
        aux.push({name: key, data: response.data[key]})
      });
      setList(aux);
      setFilterlist(aux);
    });
  }, []);

  function seleccionar(item) {
    navigation.navigate('Links', { data: item });
  }
  function buscar(texto) {
    setFilterlist(
        list.filter(
            post => post.name.toLowerCase().indexOf(texto.toLowerCase()) !== -1
        )
    );
  }
  return (
    <View style={styles.container}>
      <Input
        placeholder="Buscar"
        labelStyle={styles.input}
        onChangeText={buscar}
      />
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          {filterlist.map((item,index) => (
                <ListItem
                    key={index}
                    title={item.name}
                    onPress={() => {seleccionar(item)}}
                    bottomDivider
                    chevron
                />
            ))
          }
        </ScrollView>
      </ScrollView>
    </View>
  );
}

HomeScreen.navigationOptions = {
  header: null
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center'
  },
  contentContainer: {
    paddingTop: 0
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50
  },
  homeScreenFilename: {
    marginVertical: 7
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)'
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center'
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3
      },
      android: {
        elevation: 20
      }
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center'
  },
  navigationFilename: {
    marginTop: 5
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center'
  },
  helpLink: {
    paddingVertical: 15
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7'
  }
});
