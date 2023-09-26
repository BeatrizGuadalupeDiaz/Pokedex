import React from 'react';
import { RefreshControl, StyleSheet} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Card from '../components/Card/Card';
import {FlashList} from '@shopify/flash-list';
//crear scroll infinito
import {useInfiniteQuery} from '@tanstack/react-query';
//import from search
import {useNavigation} from '@react-navigation/native';

const GET_ALL_URL = 'https://pokeapi.co/api/v2/pokemon';

const Home = () => {
  const navigation = useNavigation();
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLargeTitle: true,
    })
  }, [navigation]);

  //indicar la pagina de la cual nos devolcera los pokemones
  const getAllPokemons = async ({pageParam = 1}) => {
    //comillas invertidas para indicar logica
    const res = await fetch(`${pageParam === 1 ? GET_ALL_URL : pageParam}`);
    return res.json(); //regresa la promesa
  };

  //recibe las [keys/identificador], funcion que se ejecutara y un objeto de configuracion
  const {
    data,
    isLoading,
    hasNextPage,
    fetchNextPage,
    refetch,
    isFetching,
    error,
  } = useInfiniteQuery(['getAllPokemons'], getAllPokemons, {
    getNextPageParam: lastPage => {
      if (lastPage !== null) {
        return lastPage.next;
      }
      return lastPage;
    },
  });

  const handleLoadMore = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };
  return (
    <SafeAreaView style={styles.contentContainer}>
      <FlashList
        data={data?.pages?.map(page => page.results).flat()}
        renderItem={({item}) => <Card pokemon={item} />}
        estimatedItemSize={200}
        numColumns={2}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.3} //max=1 definir el punto en donde se van a cargar mas elementos a la lista
        refreshControl={
          <RefreshControl 
            refreshing={isLoading || isFetching}
            tintColor={'#1b1b'} />
          }
        refreshing={isLoading || isFetching}
        onRefresh={refetch}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flex:1,
    marginHorizontal: '5%',
  }
});
export default Home;
