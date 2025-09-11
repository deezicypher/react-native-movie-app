import { icons } from '@/assets/icons'
import { Link } from 'expo-router'
import React from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'

const MovieCard = ({id,poster_path,title,vote_average,release_date}:Movie) => {
  return (
 <Link href={`/movies/${id}`} asChild>
    <TouchableOpacity className='w-[30%]'>
        <Image source={{uri:poster_path?poster_path:'https://placehold.co/600x400/1a1a1a/ffffff.png'}}
            className='w-full rounded-lg h-52'
            resizeMode='cover'
        />

        <Text className='text-white text-sm font-bold mt-2' numberOfLines={1}>{title}</Text>
        <View className="flex-row items-center justify-start gap-x-1">
            <Image source={icons.star}  className='size-4' />
            <Text className='text-sm text-white font-bold uppercase'>{Math.round(vote_average/2)}</Text>
        </View>

        <View className='flex-row items-center justify-between'>
                <Text className='text-xs text-light-300 font-medium mt-1'>
                    {release_date.split('-')[0]}
                </Text>
        </View>
    </TouchableOpacity>
 </Link>
  )
}

export default MovieCard