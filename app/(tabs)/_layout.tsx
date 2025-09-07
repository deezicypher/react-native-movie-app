import { icons } from '@/assets/icons'
import { Tabs } from 'expo-router'
import React from 'react'
import { Image, Text, View } from 'react-native'

const TabIcon = ({focused,icon,title}:any) => {
    return (
        <View className={`flex flex-1  min-w-[112px] ${focused?'bg-purple-300' : '' }  min-h-16  mt-6 justify-center
items-center rounded-full overflow-hidden`}>
<Image source={icon} className='size-6' /> 
<Text className='text-secondary text-base font-semibold '>{title}</Text>
        </View>
    )
}

const _Layout = () => {
  return (
    <Tabs screenOptions={{
        tabBarShowLabel:false,
        tabBarItemStyle: {
            width: '100%',
            height: '100%',
            justifyContent:'center',
            alignItems: 'center'
        },
        tabBarStyle: {
            backgroundColor: '#0f0d23',
            borderRadius:50,
            marginHorizontal:10,
            marginBottom:36,
            height: 52,
            position: 'absolute',
            overflow: 'hidden',
            borderWidth:1,
            borderColor:'#0f0d23'
        }
        }}>
                <Tabs.Screen 
                name="index"
                options={{
                    title: "Home",
                    headerShown: false,
                    tabBarIcon:({focused}) => (
                        <>
                     <TabIcon focused={focused} icon={icons.home} title="Home" />
                        </>
                    )
                }} />

<Tabs.Screen 
                name="search"
                options={{
                    title:"Search",
                    headerShown: false,
                    tabBarIcon:({focused}) => (
                        <>
                     <TabIcon focused={focused} icon={icons.search} title="Search" />
                        </>
                    )
                }} />
       

                <Tabs.Screen 
                name="saved"
                options={{
                    title:"Saved",
                    headerShown: false,
                    tabBarIcon:({focused}) => (
                        <>
                     <TabIcon focused={focused} icon={icons.save} title="Saved" />
                        </>
                    )
                }} />

<Tabs.Screen 
                name="profile"
                options={{
                    title:"Profile",
                    headerShown: false,
                    tabBarIcon:({focused}) => (
                        <>
                     <TabIcon focused={focused} icon={icons.profile} title="Profile" />
                        </>
                    )
                }} />
  
    </Tabs>
  )
}

export default _Layout