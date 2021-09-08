import React, { useState, useRef } from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  Image,
  FlatList,
  Dimensions
} from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';

const { width } = Dimensions.get('window');
const SPACING = 10;
const THUMB_SIZE = 80;

const IMAGES = {
  image1: require('../assets/1.jpg'),
  image2: require('../assets/2.jpg'),
  image3: require('../assets/3.jpg'),
  image4: require('../assets/4.jpg'),
  image5: require('../assets/5.jpg'),
  image6: require('../assets/6.jpeg'),
  image7: require('../assets/7.png')
};

export default function Gallery() {
  const [images, setImages] = useState([
    { id: '1', image: IMAGES.image1 },
    { id: '2', image: IMAGES.image2 },
    { id: '3', image: IMAGES.image3 },
    { id: '4', image: IMAGES.image4 },
    { id: '5', image: IMAGES.image5 },
    { id: '6', image: IMAGES.image6 },
    { id: '7', image: IMAGES.image7 }
  ]);

  return (
    <View style={{ flex: 1, backgroundColor: 'black', alignItems: 'center' }}>
      {/* Title JSX Remains same */}
      {/* Carousel View */}
      <View style={{ flex: 1 / 2, marginTop: 20 }}>
        <Carousel
          layout='default'
          data={images}
          sliderWidth={width}
          itemWidth={width}
          renderItem={({ item, index }) => (
            <Image
              key={index}
              style={{ width: '100%', height: '100%' }}
              resizeMode='contain'
              source={item.image}
            />
          )}
        />
      </View>
    </View>
  );
}
