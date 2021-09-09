import React, { useState, useRef } from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  Image,
  FlatList,
  Dimensions,
  StyleSheet,
  ImageBackground
} from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';

const { width } = Dimensions.get('window');
const SPACING = 10;
const THUMB_SIZE = 80;

const IMAGES = {
  image1: require('../assets/aloe_rust.jpg'),
  image2: require('../assets/bacspot.png'),
  image3: require('../assets/hib.jpg'),
  image4: require('../assets/mosaic.png'),
  image5: require('../assets/sep.png'),
  image6: require('../assets/targetspot.png'),
  // image7: require('../assets/tycv.png')
};

export default function Gallery() {
  const [images, setImages] = useState([
    { id: '1', image: IMAGES.image1 },
    { id: '2', image: IMAGES.image2 },
    { id: '3', image: IMAGES.image3 },
    { id: '4', image: IMAGES.image4 },
    { id: '5', image: IMAGES.image5 },
    { id: '6', image: IMAGES.image6 },
    // { id: '7', image: IMAGES.image7 }
  ]);

  const [indexSelected, setIndexSelected] = useState(0);

  const carouselRef = useRef();
  const onTouchThumbnail = touched => {
    if (touched === indexSelected) return;

    carouselRef?.current?.snapToItem(touched);
  };

  const flatListRef = useRef();
  const onSelect = indexSelected => {
    setIndexSelected(indexSelected);

    flatListRef?.current?.scrollToOffset({
      offset: indexSelected * THUMB_SIZE,
      animated: true
    });
  };

  return (
    <ImageBackground
      source={require('./b3.jpg')}
      style={styles.back}>
      <View style={{ flex: 1, alignItems: 'center' }}>
        {/* Title JSX Remains same */}
        {/* Carousel View */}
        <View style={{ flex: 1 / 2, marginTop: 20 }}>
          <Carousel
            layout='default'
            data={images}
            onSnapToItem={index => onSelect(index)}
            sliderWidth={width}
            itemWidth={width}
            ref={carouselRef}
            renderItem={({ item, index }) => (
              <Image
                key={index}
                style={{ width: '100%', height: '100%' }}
                resizeMode='contain'
                // style={{borderRadius: 10}}
                source={item.image}
              />
            )}
          />
          <Pagination
            inactiveDotColor='gray'
            dotColor={'orange'}
            activeDotIndex={indexSelected}
            dotsLength={images.length}
            animatedDuration={150}
            inactiveDotScale={1}
          />
        </View>
        {indexSelected == 0 &&
          <View style={{ alignItems: 'center' }}>
            <Text style={{
              color: 'black',
              fontWeight: 'bold',
              fontSize: 20,
            }}>Aloevera Rust</Text>
            <Text style={{ textAlignVertical: "center", textAlign: "center", fontSize: 15, marginHorizontal: 15 }}>Remove all infected parts and destroy them. For bramble fruits,
              remove and destroy all the infected plants and replant the area with resistant varieties.
              Clean away all debris in between plants to prevent rust from spreading.
              Avoid splashing water onto the leaves, as this can help spread rust.</Text>

            <Text style={{ textAlignVertical: "center", textAlign: "center", fontSize: 15, marginHorizontal: 15, marginVertical: 5 }}>
              Space your plants properly to encourage good air circulation.
              Avoid wetting the leaves when watering plants.
              There are many effective rust fungicides you can try. Ask your local nursery for which products you should use.</Text>

          </View>
        }
        {indexSelected == 1 &&
          <View style={{ alignItems: 'center' }}>
            <Text style={{
              color: 'black',
              fontWeight: 'bold',
              fontSize: 20,
            }}>Bacterial spot</Text>
            <Text style={{ textAlignVertical: "center", textAlign: "center", fontSize: 15, marginHorizontal: 15 }}>
              A plant with bacterial spot cannot be cured.
              Remove symptomatic plants from the field or greenhouse to prevent the spread of bacteria to healthy plants.  Burn, bury or hot compost the affected plants and DO NOT eat symptomatic fruit.
            </Text>

            <Text style={{ textAlignVertical: "center", textAlign: "center", fontSize: 15, marginHorizontal: 15, marginVertical: 5 }}>
              Plant pathogen-free seed or transplants to prevent the introduction of bacterial spot pathogens on contaminated seed or seedlings.  If a clean seed source is not available or you suspect that your seed is contaminated,
              soak seeds in water at 122°F for 25 min. to kill the pathogens.</Text>
          </View>
        }
        {indexSelected == 2 &&
          <View style={{ alignItems: 'center' }}>
            <Text style={{
              color: 'black',
              fontWeight: 'bold',
              fontSize: 20,
            }}>Hibiscus Leaf Disease</Text>
            <Text style={{ textAlignVertical: "center", textAlign: "center", fontSize: 15, marginHorizontal: 15 }}>
              Keep your hibiscus healthy, as strong plants are able to withstand powdery mildew better than weak, stressed plants. Water your hibiscus at the base of the plants and not on the leaves.

            </Text>

            <Text style={{ textAlignVertical: "center", textAlign: "center", fontSize: 15, marginHorizontal: 15, marginVertical: 5 }}>
              Morning is the best time to water because the leaves will have plenty of time to dry. Avoid high-nitrogen fertilizers, as lush, new growth is more prone to disease. </Text>
          </View>
        }
        {indexSelected == 3 &&
          <View style={{ alignItems: 'center' }}>
            <Text style={{
              color: 'black',
              fontWeight: 'bold',
              fontSize: 20,
            }}>Mosaic virus</Text>
            <Text style={{ textAlignVertical: "center", textAlign: "center", fontSize: 15, marginHorizontal: 15 }}>Keep the area around the tomatoes weeded and free of plant
              detritus to minimize areas the disease can harbor. Control insects as well to lessen the chances of contamination. </Text>

            <Text style={{ textAlignVertical: "center", textAlign: "center", fontSize: 15, marginHorizontal: 15, marginVertical: 5 }}>
              If you spot the disease in your garden, you should immediately dig up and burn infected plants. Don’t plant tomatoes, cucumbers or
              other plants that are susceptible to mosaic virus in that same area again.</Text>
          </View>
        }
        {indexSelected == 4 &&
          <View style={{ alignItems: 'center' }}>
            <Text style={{
              color: 'black',
              fontWeight: 'bold',
              fontSize: 20,
            }}>Septoria leaf spot</Text>
            <Text style={{ textAlignVertical: "center", textAlign: "center", fontSize: 15, marginHorizontal: 15 }}>
              Treating septoria leaf spot disease after it appears is achieved with fungicides. The chemicals need to be applied on a seven to ten day schedule to be effective. Spraying begins after blossom drop when the first fruits are visible.
            </Text>

            <Text style={{ textAlignVertical: "center", textAlign: "center", fontSize: 15, marginHorizontal: 15, marginVertical: 5 }}>
              The most commonly used chemicals are maneb and chlorothalonil, but there are other options available to the home gardener. Potassium bicarbonate, ziram, and copper products are a few other sprays useful against the fungus.
              Consult the label carefully for instructions on rate and method of application.
            </Text>
          </View>
        }
        {indexSelected == 5 &&
          <View style={{ alignItems: 'center' }}>
            <Text style={{
              color: 'black',
              fontWeight: 'bold',
              fontSize: 20,
            }}>Target spot</Text>
            <Text style={{ textAlignVertical: "center", textAlign: "center", fontSize: 15, marginHorizontal: 15 }}>
              Pay careful attention to air circulation, as target spot of tomato thrives in humid conditions. Grow the plants in full sunlight.
              Be sure the plants aren’t crowded and that each tomato has plenty of air circulation. Cage or stake tomato plants to keep the plants above the soil. Water tomato plants in the morning so the leaves have time to dry.
            </Text>

            <Text style={{ textAlignVertical: "center", textAlign: "center", fontSize: 15, marginHorizontal: 15, marginVertical: 5 }}>
              Water at the base of the plant or use a soaker hose or drip system to keep the leaves dry. Apply a mulch to keep the fruit from coming in direct contact with the soil.
              Limit mulch to 3 inches (8 cm.) or less if your plants are bothered by slugs or snails.
            </Text>
          </View>
        }
        {/* {indexSelected == 6 &&
        <View style={{ alignItems: 'center' }}>
          <Text style={{
            color: 'black',
            fontWeight: 'bold',
            fontSize: 20,
          }}>Yellow leaf curl virus</Text>
          <Text style={{textAlignVertical: "center",textAlign: "center", fontSize: 15, marginHorizontal: 15}}>

          </Text>

          <Text style={{textAlignVertical: "center",textAlign: "center", fontSize: 15, marginHorizontal: 15, marginVertical: 5}}>
          
          </Text>
        </View>
      } */}
        <FlatList
          horizontal={true}
          data={images}
          style={{ position: 'absolute', bottom: 40 }}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: SPACING
          }}
          keyExtractor={item => item.id}
          renderItem={({ item, index }) => (
            <TouchableOpacity onPress={() => onTouchThumbnail(index)} activeOpacity={0.9}>
              <Image
                style={{
                  width: THUMB_SIZE,
                  height: THUMB_SIZE,
                  marginRight: SPACING,
                  borderRadius: 16,
                  borderWidth: index === indexSelected ? 4 : 0.75,
                  borderColor: index === indexSelected ? 'orange' : 'white'
                }}
                source={item.image}
              />
            </TouchableOpacity>
          )}
        />
      </View>
    </ImageBackground>

  );
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
   alignSelf: 'stretch',
   alignItems: 'center',
   backgroundColor: 'rgba(255,255,255,0)',
   justifyContent: 'center',
   paddingLeft: 60,
   paddingRight: 60,
 },

 button: {
    alignItems: "center",
    paddingVertical: 10,
    margin: 5,
    paddingHorizontal: 15,
    borderRadius: 25,
    alignSelf: 'stretch',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#2ba189',
    borderColor: 'black',
    borderWidth: 2,
    borderRadius: 5,
    marginBottom: 10,
  },

  buttonText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 20,
  },

  back: {
    flex: 1,
    width: '100%',
    height: '100%',
  },

   title: {
      fontWeight: 'bold',
      fontSize: 40,
      paddingBottom: 10,
      marginBottom: 20,
      borderBottomColor: 'black',
      borderBottomWidth: 1,
  },

  subtitle: {
    fontWeight: 'bold',
    fontSize: 20,
    paddingBottom: 10,
    marginBottom: 5,
},
 });