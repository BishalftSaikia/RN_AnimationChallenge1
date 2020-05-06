/* eslint-disable react-native/no-inline-styles */
import React, {useEffect} from 'react';
import {
  SafeAreaView,
  View,
  StatusBar,
  Text,
  Animated,
  Dimensions,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Platform,
  Image,
  FlatList,
} from 'react-native';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import Icon from 'react-native-vector-icons/dist/Feather';
import {widthPercentageToDP} from 'react-native-responsive-screen';

const List = [
  {title: 'Home', iconName: 'home'},
  {title: 'Features', iconName: 'settings'},
  {title: 'Gallery', iconName: 'camera'},
  {title: 'Portfolio', iconName: 'image'},
  {title: 'Pages', iconName: 'file-minus'},
  {title: 'Contact', iconName: 'mail'},
  {title: 'Close', iconName: 'x'},
];

const ImageContent = [
  {
    image: require('./ImageAssets/img1.jpg'),
    text: 'This one is my editing dream come true. When I am refactoring code',
  },
  {
    image: require('./ImageAssets/img2.jpg'),
    text: 'This one is my editing dream come true. When I am refactoring code',
  },
  {
    image: require('./ImageAssets/img3.jpg'),
    text: 'This one is my editing dream come true. When I am refactoring code',
  },
  {
    image: require('./ImageAssets/img4.jpg'),
    text: 'This one is my editing dream come true. When I am refactoring code',
  },
];

const App = () => {
  const animatedValue = new Animated.Value(0);
  const screenHeight = Dimensions.get('window').height;
  const screenWidth = Dimensions.get('window').width;

  //animate View
  const onAnimate = value => {
    console.log('called');
    Animated.timing(animatedValue, {
      toValue: value,
      speed: 1,
      useNativeDriver: false,
    }).start();
  };

  const view1Rotate = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '10deg'],
  });
  const view1translateX = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -100],
  });
  const viewWidth = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [screenWidth, screenWidth / 1.2],
  });
  const viewHeight = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [screenHeight, screenHeight / 1.3],
  });
  const viewOpacity = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0.9],
  });
  const viewPaddingTop = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [getStatusBarHeight(), 0],
  });

  const animateSidePanel = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [-0.4 * screenWidth, 0],
  });

  //the top screen
  const TopView = (
    <Animated.View
      style={{
        transform: [
          {perspective: 180},
          {rotateY: view1Rotate},
          {translateX: view1translateX},
        ],
        width: viewWidth,
        height: viewHeight,
        opacity: viewOpacity,
        backgroundColor: '#fff',
        margintop: 40,
        paddingTop: viewPaddingTop,
        zIndex: 2,
      }}>
      <View
        style={{
          width: '100%',
          height: 0.07 * screenHeight,
          justifyContent: 'center',
          alignItems: 'flex-end',
          paddingRight: 10,
        }}>
        <TouchableOpacity onPress={() => onAnimate(1)}>
          <Icon name="align-right" size={18} color="#454545" />
        </TouchableOpacity>
      </View>

      <FlatList
        style={{flex: 1}}
        showsVerticalScrollIndicator={false}
        data={ImageContent}
        renderItem={({item, index}) => (
          <View style={{width: '90%', alignSelf: 'center'}}>
            <ImageBackground
              style={{width: '100%', height: 0.18 * screenHeight}}
              source={item.image}
            />
            <View
              style={{
                width: '100%',
                aspectRatio: 5 / 2,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  color: '#454545',
                  textAlign: 'center',
                  fontSize: widthPercentageToDP(3),
                }}>
                {item.text}
              </Text>
            </View>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
        ItemSeparatorComponent={() => (
          <View
            style={{
              height: 0.08 * screenHeight,
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View
              style={{
                width: '90%',
                backgroundColor: 'rgba(0,0,0,0.2)',
                height: 0.5,
              }}
            />
          </View>
        )}
      />
    </Animated.View>
  );

  //SidePanel
  const SidePanel = (
    <Animated.View
      style={{
        position: 'absolute',
        right: animateSidePanel,
        height: screenHeight,
        width: 0.4 * screenWidth,
        paddingTop: 130,
        opacity: animatedValue,
      }}>
      {List.map((item, index) => (
        <TouchableOpacity
          onPress={() => onAnimate(0)}
          key={index.toString()}
          style={{
            width: '100%',
            aspectRatio: 5 / 2,
            flexDirection: 'row',
            alignItems: 'center',
            paddingLeft: 10,
          }}>
          <Icon
            name={item.iconName}
            size={18}
            color={index === 0 ? 'rgb(238,83,76)' : '#fff'}
          />
          <Text
            style={{
              color: index === 0 ? 'rgb(238,83,76)' : '#fff',
              fontSize: 16,
              paddingLeft: 20,
            }}>
            {item.title}
          </Text>
        </TouchableOpacity>
      ))}
    </Animated.View>
  );

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <ImageBackground
        source={require('./ImageAssets/img3.jpg')}
        style={{
          width: screenWidth,
          height: screenHeight,
        }}
        blurRadius={10}>
        <View
          style={{
            width: screenWidth,
            height: screenHeight,
            justifyContent: 'center',
          }}>
          {TopView}
          {SidePanel}
        </View>
      </ImageBackground>
    </>
  );
};

export default App;
