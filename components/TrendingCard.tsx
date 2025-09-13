import { Link } from 'expo-router'
import React from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'

const TrendingCard = ({movie:{movie_id,title,poster_url},index}:TrendingCardProps) => {
  return (
    <Link href={`/movies/${movie_id}`} asChild >
        <TouchableOpacity  className='w-32 relative pl-5'>
          <Image 
              source={{uri:poster_url}} 
              className='w-32 h-48 rounded-md'
              resizeMode='cover'/>
              <View className='absolute bottom-9 -left-3.5 px-2 py-1 rounded-full'>
                
              </View>
              <Text className="text-sm text-white font-bold mt-2" numberOfLines={2}>
                      {title}
              </Text>

        </TouchableOpacity>
    </Link>
  )
}

export default TrendingCard