import React from 'react';
import {View, StyleSheet, Text, Image, Dimensions} from 'react-native';
import {useQuery} from '@tanstack/react-query';
import { Colors } from './Colors';

const {height, width} = Dimensions.get('window');

const Card = ({pokemon}: any) => {
  const getPokemon = async ({queryKey}:any) => {
    const res = await fetch(queryKey[1]);
    return res.json();
  };

  const {data, isLoading, error} = useQuery(
    ['getPokemon', pokemon?.url],
    getPokemon,
  );

  return (
    <View style={[styles.container,{backgroundColor: Colors[data?.types[0]?.type?.name]}]}>
      <Image
        style={styles.image}
        source={{
          uri: data?.sprites?.other['official-artwork']?.front_default,
        }}
      />
      <Text style={styles.name}>{data?.name}</Text>
      <Text style={styles.serial}>{data && (data?.id).toString().padStart(3,'0')}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '92%',
    height: height * 0.4,
    marginVertical: 10,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: 'black',
    shadowOpacity: 0.5,
    shadowOffset: {
      width: 5,
      height: 5,
    },
    marginHorizontal: '5%',
  },
  image: {
    width: '90%',
    height: 150,
    backgroundColor: 'white',
    borderRadius: 20,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 10,
  },
  serial: {
    fontSize: 15,
    fontWeight: '700',
    color: 'white',
  },
});
export default Card;
