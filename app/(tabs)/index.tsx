import { icons } from "@/assets/icons";
import { images } from "@/assets/images";
import MovieCard from "@/components/MovieCard";
import SearchBar from "@/components/SearchBar";
import { fetchMovies } from "@/services/api";
import useFetch from "@/services/useFetch";
import { useRouter } from "expo-router";
import { ActivityIndicator, FlatList, Image, ScrollView, Text, View } from "react-native";

export default function Index() {
  const router = useRouter()
  const {data:movies, loading:moviesLoading,error:moviesError} = useFetch(()=>fetchMovies({query:''}))

  if (moviesLoading) {
    return (
      <View className="flex-1 bg-primary justify-center items-center">
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (moviesError) {
    return (
      <View className="flex-1 bg-primary justify-center items-center">
        <Text className="text-white">Error: {moviesError.message}</Text>
      </View>
    );
  }
  
  return (
    <View className="flex-1 bg-primary">
      <Image source={images.bg} className="absolute w-full z-0" />
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{minHeight:'100%',paddingBottom:10}} className="flex-1 px-5">
          <Image source={icons.logo} className="w-12 h-10 mt-20 mb-5 mx-auto" />
        
<View className="flex-1 mt-5">
            <SearchBar onPress={() => router.push('/search')} placeholder="Search for a movie" />
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


          
        </ScrollView>
    </View>
  );
}
