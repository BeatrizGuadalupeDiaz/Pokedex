import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {useQuery} from '@tanstack/react-query';
import {Colors} from './Colors';
import Icon from 'react-native-vector-icons/Ionicons';

const {height, width} = Dimensions.get('window');

const Card = ({pokemon}: any) => {
  const [isFavorite, setIsFavorite] = React.useState(false);
  const getPokemon = async ({queryKey}: any) => {
    const res = await fetch(queryKey[1]);
    return res.json();
  };

  const {data, isLoading, error} = useQuery(
    ['getPokemon', pokemon?.url],
    getPokemon,
  );
  const COLORS_POKEMON = Colors[data?.types[0]?.type?.name];

  return (
    <View
      style={[styles.container, {backgroundColor: COLORS_POKEMON}]}
      key={data && data?.id}>
      <Text style={styles.name}>{data?.name}</Text>
      <Image
        style={styles.image}
        source={{
          uri: data?.sprites?.other['official-artwork']?.front_default,
        }}
        resizeMode="contain"
      />
      <View style={styles.infoContainer}>
        <View>
          <Text style={[styles.info, {color: '#0969AF'}]}>
            {data && (data?.id).toString().padStart(3, '0')}
          </Text>
          <Text style={[styles.info, {color: 'white'}]}>
            {data && (data?.types[0]?.type?.name).toString().padStart(3, '0')}
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => setIsFavorite(isFavorite ? false : true)}>
          <Icon
            name={'heart'}
            size={35}
            color={isFavorite ? '#F63639' : '#DBDBDA'}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '92%',
    height: height * 0.3,
    marginVertical: 10,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    /* shadowColor: 'black',
    shadowOpacity: 0.5,
    shadowOffset: {
      width: 5,
      height: 5,
    }, */
    marginHorizontal: '5%',
  },
  image: {
    width: '80%',
    height: '50%',
    backgroundColor: 'white',
    borderRadius: 20,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  info: {
    fontSize: 15,
    fontWeight: '800',
    textAlign: 'center',
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '60%',
  },
});
export default Card;
