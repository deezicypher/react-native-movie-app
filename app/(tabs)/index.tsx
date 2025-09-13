import { icons } from "@/assets/icons";
import { images } from "@/assets/images";
import MovieCard from "@/components/MovieCard";
import SearchBar from "@/components/SearchBar";
import TrendingCard from "@/components/TrendingCard";
import { fetchMovies, getTrendingMovies } from "@/services/api";
import useFetch from "@/services/useFetch";
import { useRouter } from "expo-router";
import { ActivityIndicator, FlatList, Image, ScrollView, Text, View } from "react-native";

export default function Index() {
  const router = useRouter()
  const {data:trendingMovies, loading:trendingLoading,error:trendingError} = useFetch(()=>getTrendingMovies())

  const {data:movies, loading:moviesLoading,error:moviesError} = useFetch(()=>fetchMovies({query:''}))


  
  return (
    <View className="flex-1 bg-primary">
      <Image source={images.bg} className="absolute w-full z-0" />
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{minHeight:'100%',paddingBottom:10}} className="flex-1 px-5">
          <Image source={icons.logo} className="w-12 h-10 mt-20 mb-5 mx-auto" />
        
          { moviesLoading || trendingLoading ? ( 
            <ActivityIndicator size="large" color="0000ff" className="mt-10 self-center" /> 
            ) : moviesError || trendingError ? 
            ( <Text className="text-red-500 px-4 my-3">Error: {moviesError?.message || trendingError?.message}</Text> ) 
            : 
            <View className="flex-1 mt-5">
            <SearchBar onPress={() => router.push('/search')} placeholder="Search for a movie"  />
              {trendingMovies && (
                <View className="mt-10">
                  <Text className="text-lg text-white font-bold  mb-3">
                      Trending Movies
                  </Text>

          
                  </View>
                  
              )}
                <FlatList className="mb-4 mt-3" 
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    ItemSeparatorComponent={() => <View className="w-4"/>}
                    data={trendingMovies}
                    renderItem={({item,index}) => (
                     <TrendingCard movie={item} index={index} />
                    )}
                    keyExtractor={(item) => item.id.toString()}
                  >

                  </FlatList>
              <>
              <Text className="text-lg text-white font-bold mt-5 mb-3">Latest Movies</Text>
              </> 
            
              <FlatList 
                  data={movies}
                  renderItem={({item}) => (
                    <MovieCard {...item} />
                  )}
                  keyExtractor={(item) => item.id.toString()}
                  numColumns={3}
                  contentContainerStyle={{ paddingBottom: 10 }}
                  columnWrapperStyle={{
                    justifyContent: 'flex-start',
                    gap:20,
                    paddingRight:5,
                    marginBottom: 10,
                  }}
                  className="mt-2 pb-32"
                  scrollEnabled={false}
                  />
          </View>
}

          
        </ScrollView>
    </View>
  );
}
