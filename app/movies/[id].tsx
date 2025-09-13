import { icons } from '@/assets/icons';
import { fetchMovieDetails } from '@/services/api';
import useFetch from '@/services/useFetch';
import { useLocalSearchParams } from 'expo-router';
import React, { useCallback } from 'react';
import { Image, ScrollView, Text, View } from 'react-native';

interface MovieInfoProps {
  label:string;
  value?:string|number|null;
}

const MovieInfo = ({label,value}:MovieInfoProps) => {
    return (
    <View className='flex-col items-start justify-center mt-5'>
      <Text className='text-slate-400 text-sm font-normal'>
        {label}
      </Text>
      <Text className='text-slate-300 font-bold text-sm mt-2'>
        {value || 'N/A'}
      </Text>
    </View>)
}

const Details = () => {
  const {id} = useLocalSearchParams();
  
  const fetchMovie = useCallback(() => {
    if (!id) return Promise.reject("No ID");
    return fetchMovieDetails(id as string);
  }, [id]);
  
  
  const { data: movie, loading, error } = useFetch(fetchMovie);

  return (
    <View className='bg-primary flex-1'>
      <ScrollView  contentContainerStyle={{paddingBottom: 80}}>
        <View>
       <Image source={{uri:movie?.poster_path}} className='w-full h-[550px]' resizeMode='stretch'/>

    <View className='flex-col items-start justify-center mt-5 px-5'>
      <Text className="text-white font-bold text-xl">
          {movie?.title}
      </Text>
      <View className='flex-row items-center gap-x-1 mt-2'>
          <Text className='text-slate-400 text-sm'>{movie?.release_date.split('-')[0]}</Text>
          {/* <Text className='text-slate-400 text-sm'>{movie.runtime}m</Text> */}
      </View>
   

    <View className='flex-row items-center bg-dark-100 px-2 py-1 rounded-md gap-x-1 mt-2'>
        <Image source={icons.star} className='size-4' />
        <Text className='text-white text-sm font-bold'>
          {Math.round(movie?.vote_average ?? 0)/10}
        </Text>
        <Text className='text-slate-500 text-sm'>
          {movie?.vote_count} votes
        </Text>
      </View>

      <MovieInfo label='Overview' value={movie?.overview} />

        </View>
        </View>
      </ScrollView>
    </View>
  )
}

export default Details