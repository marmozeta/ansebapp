import React from 'react';
import { StyleSheet, Dimensions, ScrollView, Image, ImageBackground, Platform, StatusBar} from 'react-native';
import { Block, Text, theme, Button as GaButton } from 'galio-framework';

import { Button } from '../components';
import { Images, nowTheme } from '../constants';
import { HeaderHeight } from '../constants/utils';
import AsyncStorage from '@react-native-async-storage/async-storage'

const { width, height } = Dimensions.get('screen');

const thumbMeasure = (width - 48 - 32) / 3;
let userType;

class Profile extends React.Component {
 constructor(props) {
    super(props);

    this.state = {
      data: [],
      isLoading: true
    };
  }

  async getConcert() {
   const { navigation } = this.props;
   {this.props.route.params?.itemId}
    try {
    var Data = { itemId: this.props.route.params?.itemId };
      const response = await fetch('http://srv36013.seohost.com.pl/anseba/get_concerts.php', {method: 'POST', body: JSON.stringify(Data)});
      const json = await response.json();
      console.log(json);
      this.setState({ data: json.articles });
    } catch (error) {
      console.log(error);
    } finally {
      this.setState({ isLoading: false });
    }
  }

    componentDidMount() {
        this.getConcert();
      }

  render() {
    const { navigation } = this.props;
    const { data, isLoading } = this.state;

    AsyncStorage.getItem('logged_user_rights')
        .then((value) => {
          userType = value;
        });

    let contact_phone = (userType == 'admin' || userType == 'tour_manager' ?
          <Block flex style={{ marginTop: 5 }}>
             <Block row left>
                 <Text style={[styles.label]}>Contact phone:</Text>
                 <Text size={14} muted style={[styles.value, styles.inline]}>{data.contact_phone}</Text>
             </Block>
          </Block> : null);

  return (
  <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.settings}
        >
    <Block style={{
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'space-between',
    }} >
      <Block flex={0.6} >
        <ImageBackground
          source={{ uri: data.background }}
          style={styles.profileContainer}
          imageStyle={styles.profileBackground}
        >
          <Block flex style={styles.profileCard}>
            <Block style={{ position: 'absolute', width: width, zIndex: 5, paddingHorizontal: 20 }}>
              <Block middle style={{ top: height * 0.05 }}>
                <Image source={{ uri: data.thumbnail }} style={styles.avatar} />
              </Block>
              <Block style={{ top: height * 0.08 }}>
                <Block middle >
                  <Text
                    style={{
                      fontFamily: 'montserrat-bold',
                      marginBottom: theme.SIZES.BASE / 2,
                      fontWeight: '900',
                      fontSize: 30
                    }}
                    color='#000000'
                    >
                    {data.team_name}
                  </Text>
                   <Block row>
                        <Text size={15} color="grey" style={[styles.top_text]}>Place:</Text>
                        <Text size={15} color="black" style={[styles.top_text]}>{data.place}</Text>
                  </Block>
                  <Text size={15} color="grey" style={[styles.top_text]}>Concert date and time:</Text>
                  <Text size={15} color="black" style={[styles.top_text]}>{data.concert_date}</Text>
                </Block>
              </Block>

            </Block>

            <Block
              middle
              row
              style={{ position: 'absolute', width: width, top: height * 0.4, zIndex: 99 }}
            >
              <Button style={{ width: 114, height: 44, marginHorizontal: 5, elevation: 0 }} textStyle={{ fontSize: 16 }} round>
                Follow
              </Button>
              <GaButton
                round
                onlyIcon
                shadowless
                icon="twitter"
                iconFamily="Font-Awesome"
                iconColor={nowTheme.COLORS.WHITE}
                iconSize={nowTheme.SIZES.BASE * 1.375}
                color={'#888888'}
                style={[styles.social, styles.shadow]}
              />
              <GaButton
                round
                onlyIcon
                shadowless
                icon="pinterest"
                iconFamily="Font-Awesome"
                iconColor={nowTheme.COLORS.WHITE}
                iconSize={nowTheme.SIZES.BASE * 1.375}
                color={'#888888'}
                style={[styles.social, styles.shadow]}
              />
            </Block>
          </Block>
        </ImageBackground>
      </Block>
      <Block />
      <Block flex={0.4} style={{ padding: theme.SIZES.BASE, marginTop: -480}}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Block flex style={{ marginTop: 0 }}>
            <Block row left>
                <Text style={[styles.label]}>Sample date and time:</Text>
                <Text size={14} muted style={[styles.value, styles.inline]}>{data.sample_date}</Text>
            </Block>
          </Block>
          <Block flex style={{ marginTop: 5 }}>
            <Block row left>
                <Text style={[styles.label]}>Number of sets:</Text>
                <Text size={14} muted style={[styles.value, styles.inline]}>{data.sets_number}</Text>
            </Block>
          </Block>
          <Block flex style={{ marginTop: 5 }}>
            <Block row left>
                <Text style={[styles.label]}>Event type:</Text>
                <Text size={14} muted style={[styles.value, styles.inline]}>{data.event_type}</Text>
            </Block>
          </Block>
          <Block flex style={{ marginTop: 5 }}>
            <Block left>
                <Text style={[styles.label]}>Event details</Text>
                <Text size={14} muted style={[styles.value]}>{data.event_details} </Text>
            </Block>
          </Block>
          <Block flex style={{ marginTop: 5 }}>
             <Block row left>
                 <Text style={[styles.label]}>Tour manager:</Text>
                 <Text size={14} muted style={[styles.value, styles.inline]}>{data.tour_manager}</Text>
             </Block>
          </Block>
          {contact_phone}
        </ScrollView>
      </Block>
    </Block>
</ScrollView>
  );
}
}

const styles = StyleSheet.create({

  profileContainer: {
    width,
    height,
    padding: 0,
    zIndex: 1
  },
  profileBackground: {
    width,
    height: height * 0.4,
    opacity: .3
  },

  info: {
    marginTop: 20,
    paddingHorizontal: 10,
    height: height * 0.6
  },
  avatarContainer: {
    position: 'relative',
    marginTop: -100
  },
  avatar: {
    width: thumbMeasure,
    height: thumbMeasure,
    borderRadius: 50,
    borderWidth: 0
  },
  nameInfo: {
    marginTop: 15
  },
  thumb: {
    borderRadius: 4,
    marginVertical: 4,
    alignSelf: 'center',
    width: thumbMeasure,
    height: thumbMeasure
  },
  social: {
    width: nowTheme.SIZES.BASE * 3,
    height: nowTheme.SIZES.BASE * 3,
    borderRadius: nowTheme.SIZES.BASE * 1.5,
    justifyContent: 'center',
    zIndex: 99,
    marginHorizontal: 5
  },
  label: {
    color: '#2c2c2c',
    fontWeight: 'bold',
    fontSize: 17,
    fontFamily: 'montserrat-bold',
    marginTop: 10,
    marginBottom: 0,
    marginLeft: 15,
    zIndex: 2
  },
  value: {
    textAlign: 'left',
    fontFamily: 'montserrat-regular',
    zIndex: 2,
    lineHeight: 25,
    color: '#9A9A9A',
    paddingHorizontal: 15
  },
  inline: {
    marginTop: 10
  },
  top_text: {
    marginTop: 5,
    marginLeft: 2,
    fontFamily: 'montserrat-bold',
    lineHeight: 20,
    fontWeight: 'bold',
    fontSize: 18,
    opacity: .8
  },
  grey: {
    color: 'grey'
  }
});

export default Profile;