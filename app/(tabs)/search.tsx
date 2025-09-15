import { icons } from '@/assets/icons'
import { images } from '@/assets/images'
import MovieCard from '@/components/MovieCard'
import SearchBar from '@/components/SearchBar'
import { fetchMovies, updateSearchCount } from '@/services/api'
import useFetch from '@/services/useFetch'
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, FlatList, Image, Text, View } from 'react-native'

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('')

  const {data:movies,loading,error,reset,refetch:loadMovies} = useFetch(()=>fetchMovies({query:searchQuery}),false)

  useEffect(() => {
    
    const timeoutId = setTimeout(async () => {
    if(searchQuery.trim()){
      await loadMovies()
   
    }else{
      reset()
    }
  },500);
  return () => clearTimeout(timeoutId)
  },[searchQuery])

  useEffect(() => {
    if(movies?.length > 0 && movies?.[0]){
       updateSearchCount(searchQuery,movies[0])
    }
  },[movies])

  return (
    <View className='flex-1 bg-primary'>
       <Image source={images.bg} className="absolute w-full z-0" />
       <FlatList
        data={movies}
        renderItem={({item}) => <MovieCard {...item} />}
        keyExtractor={item => item.id.toString()}
        className='px-5'
        numColumns={3}
        columnWrapperStyle={{
          justifyContent:'center',
          gap:16,
          marginVertical:16
        }}
        contentContainerStyle={{paddingBottom:100}}
        ListHeaderComponent={
          <>
          <View className='w-full flex-row justify-center mt-20'>
              <Image source={icons.logo} className='w-12 h-10'/>
          </View>
          <View className='my-5'>
            <SearchBar 
            placeholder='Search movies...' 
            value={searchQuery}
            onChangeText={(text:string) => setSearchQuery(text)}
            />

           
          </View>

          {loading && (
            <View className="flex-1  justify-center items-center">
            <ActivityIndicator size="large" color="#0000ff" className='my-3' />
          </View>
          )}

          {error && (
             <View className="flex-1 bg-primary justify-center items-center">
                    <Text className="text-red-500 my-3 px-4">Error: {error.message}</Text>
                  </View>
          )}

          {!loading && !error && searchQuery.trim() && movies?.length > 0 && (
            <Text className='text-xl text-white font-bold'>
              Search Results for {' '}
              <Text className='text-accent'>{searchQuery} </Text>
            </Text>
          ) }
          </>
        }
        ListEmptyComponent={
          !loading && !error ? (
            <View className='mt-10 px-5'>
                <Text className='text-center text-gray-200 text-lg'>
                  {searchQuery.trim() ? "No movies found": "Search for a movie"}
                </Text>
            </View>
          )
          : null
        }
        />
    </View>
  )
}

export default Search