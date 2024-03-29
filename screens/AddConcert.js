import React, { useState } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  View,
  ScrollView,
  Dimensions,
  ActivityIndicator,
  FlatList,
  TextInput,
  KeyboardAvoidingView
} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Block, Text, theme } from "galio-framework";
import { Switch, Button, Icon, Input } from "../components";

import {Picker} from '@react-native-picker/picker';

import nowTheme from "../constants/Theme";
const { width } = Dimensions.get("screen");
import DatePicker, { getFormatedDate, getToday } from 'react-native-modern-datepicker';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

export default class AddConcert extends React.Component {
 constructor(props) {
    super(props);

    this.state = {
        data_teams: [],
        data_events_types: [],
        data_teams_managers: [],
        isLoading: true,
        concert_id: 0,
        team_id: 0,
        artist_name: '',
        place: '',
        place_id: '',
        longitude: 0.00,
        latitude: 0.00,
        concert_date: getToday(),
        concert_time: '00:00',
        duration: 0,
        rehearsal_date: getToday(),
        rehearsal_time: '00:00',
        sets_number: 0,
        event_details: '',
        event_type_id: 0,
        tour_manager_id: 0,
        contact_phone: '',
        user_id: 0,
        showPickerTimeConcert: false,
        showPickerDateConcert: false,
        showPickerTimeRehearsal: false,
        showPickerDateRehearsal: false
    };

    AsyncStorage.getItem('logged_user_id')
         .then((value) => {
         this.setState({user_id: value})
    });
  }

   async getConcert() {
   console.log('get concert');
     const { navigation } = this.props;
      try {
      var Data = { itemId: this.props.route.params?.itemId };
        const response = await fetch('http://anseba.nazwa.pl/app/get_concert_for_edition.php', {method: 'POST', body: JSON.stringify(Data)});
        const json = await response.json();
        const data = json.articles;
        this.setState({ concert_id: data.concert_id,
                        team_id: data.team_id,
                        artist_name: data.artist_name,
                        place: data.place,
                        place_id: data.place_id,
                        longitude: data.longitude,
                        latitude: data.latitude,
                        concert_date: data.concert_date,
                        concert_time: data.concert_time,
                        duration: data.duration,
                        rehearsal_date: data.rehearsal_date,
                        rehearsal_time: data.rehearsal_time,
                        sets_number: data.sets_number,
                        event_details: data.event_details,
                        event_type_id: data.event_type_id,
                        tour_manager_id: data.tour_manager_id,
                        contact_phone: data.contact_phone });
      } catch (error) {
        console.log(error);
      } finally {
        this.setState({ isLoading: false });
      }
    }

  InsertRecord=()=>{
   const { navigation } = this.props;

    var ConcertId = this.state.concert_id;
    var TeamId = this.state.team_id;
    var ArtistName = this.state.artist_name;
    var Place = this.state.place;
    var PlaceId = this.state.place_id;
    var Longitude = this.state.longitude;
    var Latitude = this.state.latitude;
    var ConcertDate = this.state.concert_date;
    var ConcertTime = this.state.concert_time;
    var Duration = this.state.duration;
    var RehearsalDate = this.state.rehearsal_date;
    var RehearsalTime = this.state.rehearsal_time;
    var SetsNumber = this.state.sets_number;
    var EventDetails = this.state.event_details;
    var EventTypeId = this.state.event_type_id;
    var TourManagerId = this.state.tour_manager_id;
    var ContactPhone = this.state.contact_phone;
    var UserId = this.state.user_id;

      var APIURL = "http://anseba.nazwa.pl/app/save_concert.php";

      var headers = {
        'Accept' : 'application/json',
        'Content-Type' : 'application/json'
      };

      var Data ={
        ConcertId: ConcertId,
        TeamId: TeamId,
        ArtistName: ArtistName,
        Place: Place,
        PlaceId: PlaceId,
        Longitude: Longitude,
        Latitude: Latitude,
        ConcertDate: ConcertDate,
        ConcertTime: ConcertTime,
        Duration: Duration,
        RehearsalDate: RehearsalDate,
        RehearsalTime: RehearsalTime,
        SetsNumber: SetsNumber,
        EventDetails: EventDetails,
        EventTypeId: EventTypeId,
        TourManagerId: TourManagerId,
        ContactPhone: ContactPhone,
        UserId: UserId
      };

      fetch(APIURL,{
        method: 'POST',
        headers: headers,
        body: JSON.stringify(Data)
      })
      .then((Response)=>Response.json())
      .then((Response)=>{
      console.log(Response);
        if (Response[0].Message == "Success") {
        this.setState({concert_id: 0, team_id: 0, artist_name: '', place: '', place_id: '', longitude: 0.00, latitude: 0.00,
                       concert_date: getToday(), concert_time: '00:00', duration: 0, rehearsal_date: getToday(), rehearsal_time: '00:00',
                       sets_number: 0, event_details: '', event_type_id: 0, tour_manager_id: 0, contact_phone: ''});
          navigation.replace("Concerts");
          navigation.navigate("Concerts");
        }
      })
      .catch((error)=>{
        console.error("ERROR FOUND" + error);
      })

  }

  async getDictionaries() {
    try {
      const response = await fetch('http://anseba.nazwa.pl/app/get_dictionaries.php');
      const json = await response.json();
      this.setState({ data_teams: json.teams, data_events_types: json.events_types, data_teams_managers: json.teams_managers });
    } catch (error) {
      console.log(error);
    } finally {
      //this.setState({ isLoading: false });
    }
  }

  componentDidMount() {
    this.getDictionaries();
    this.getConcert();
  }

  state = {};

  toggleSwitch = switchNumber =>
    this.setState({ [switchNumber]: !this.state[switchNumber] });

  render() {
    const { data_teams, data_events_types, data_teams_managers, isLoading } = this.state;

    const changeConcertDate = (ev) => {
        this.state.concert_date = ev;
    }

    const changeConcertTime = (ev) => {
        this.state.concert_time = ev;
    }

    const changeRehearsalDate = (ev) => {
       this.state.rehearsal_date = ev;
    }

    const changeRehearsalTime = (ev) => {
       this.state.rehearsal_time = ev;
    }

    const currentDateConcert = () => {
        if(this.state.concert_date!='' && this.state.concert_date!='0000/00/00' && this.state.concert_date!='1970/01/01') {
            return this.state.concert_date+" "+this.state.concert_time;
        }
        else return getToday();
    }

    const currentDateRehearsal = () => {
        if(this.state.rehearsal_date!='' && this.state.rehearsal_date!='0000/00/00' && this.state.rehearsal_date!='1970/01/01') {
            return this.state.rehearsal_date+" "+this.state.rehearsal_time;
        }
        else return getToday();
    }

    return isLoading ? <ActivityIndicator size="large" /> : (
 <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.settings}
        keyboardShouldPersistTaps='always'
        listViewDisplayed={false}
      ><KeyboardAvoidingView style={{ flex: 1, flexDirection: 'column',justifyContent: 'center',}} behavior="padding" enabled   keyboardVerticalOffset={100}>

          <Block center style={styles.title}>
            <Text style={{ fontFamily: 'montserrat-bold', paddingBottom: 5 }} size={theme.SIZES.BASE} color={nowTheme.COLORS.TEXT}>
                Dane podstawowe
            </Text>
          </Block>
          <Block middle>
            <Block style={styles.rows, styles.inputs_select}>
                <Picker
                    selectedValue={this.state.team_id}
                    onValueChange={(itemValue, itemIndex) => this.setState({team_id: itemValue})}>
                        <Picker.Item style={{fontSize:14}} label='Wybierz zespół z listy' value='0' />
                        { data_teams.map((item, key)=>
                            <Picker.Item style={{fontSize:14}} label={item.label} value={item.value} key={key} />
                        )}
               </Picker>
            </Block>
          </Block>
          <Block row middle style={styles.rows}>
                      <Input
                          placeholder="lub podaj nazwę wykonawcy"
                          style={styles.inputs}
                          iconContent={
                              <Icon
                                  size={16}
                                  color="#ADB5BD"
                                  name="briefcase-242x"
                                  family="NowExtra"
                                  style={styles.inputIcons}
                              />
                          }
                          value={this.state.artist_name}
                          onChangeText={artist_name=>this.setState({artist_name})}
                      />
                    </Block>
             <Block row middle style={styles.rows_place}>
             <GooglePlacesAutocomplete
                                                placeholder='Miejsce koncertu'
                                                GooglePlacesDetailsQuery={{ fields: "geometry" }}
                                                fetchDetails={true}
                                                textInputProps={{
                                                  value: (this.state.place!='') ? this.state.place : this.value
                                                }}
                                                styles={{textInput: {
                                                                     backgroundColor: '#ffffff',
                                                                     height: 44,
                                                                     borderRadius: 21.5,
                                                                     paddingVertical: 5,
                                                                     paddingHorizontal: 25,
                                                                     fontSize: 14,
                                                                     flex: 1,
                                                                     borderColor: '#E3E3E3',
                                                                     borderWidth: 1,
                                                                     width: '100%'
                                                                   }}}
                                                onPress={(data: any, details: any = null) => {
                                                  this.setState({place: data.description});
                                                  this.setState({place_id: data.place_id});
                                                  this.setState({longitude: details?.geometry?.location.lng});
                                                  this.setState({latitude: details?.geometry?.location.lat});
                                                }}
                                                query={{
                                                  key: 'AIzaSyAWnOCMVKbWVyrf1qDKaGKRdP7y58ClvqA',
                                                  language: 'pl'
                                                }}

                                                          renderRightButton={() => (
                                                          						<TouchableOpacity
                                                          							style={styles.clearButton}
                                                          							onPress={() => {
                                                          								this.setState({place: ''});
                                                          							}}
                                                          						>
                                                          							<Icon
                                                                                                            size={16}
                                                                                                            color="#ADB5BD"
                                                                                                            name="simple-remove2x"
                                                                                                            family="NowExtra"
                                                                                                            style={styles.removeIcons}
                                                                                                        />
                                                          						</TouchableOpacity>
                                                          					)}
                                              />
</Block>
          <Block row middle style={styles.only_label}>
               <Text
                style={{ color: '#000000' }}
                size={14}>Data i godzina koncertu</Text>
           </Block>
           <Block row middle style={styles.calendar}>
                <DatePicker
                     selected={currentDateConcert()}
                     current={currentDateConcert()}
                                                     onDateChange={changeConcertDate}
                                                     onTimeChange={changeConcertTime}
                                                     minimumDate={getToday()}
                                                   />
          </Block>
          <Block row middle style={styles.rows}>
            <Input
                placeholder="Czas trwania w minutach"
                style={styles.inputs}
                iconContent={
                    <Icon
                        size={16}
                        color="#ADB5BD"
                        name="time-alarm2x"
                        family="NowExtra"
                        style={styles.inputIcons}
                    />
                }
                value={this.state.duration}
                onChangeText={duration=>this.setState({duration})}
            />
          </Block>
          <Block row middle style={styles.only_label}>
                         <Text
                          style={{ color: '#000000' }}
                          size={14}>Data i godzina próby</Text>
                     </Block>
                     <Block row middle style={styles.calendar}>
                        <DatePicker
                                selected={currentDateRehearsal()}
                                current={currentDateRehearsal()}
                                      onDateChange={changeRehearsalDate}
                                      onTimeChange={changeRehearsalTime}
                                      minimumDate={getToday()}
                                    />
          </Block>
          <Block center style={styles.title}>
            <Text style={{ fontFamily: 'montserrat-bold', paddingBottom: 5 }} size={theme.SIZES.BASE} color={nowTheme.COLORS.TEXT}>
                Dodatkowe informacje
            </Text>
          </Block>
          <Block row middle style={styles.rows}>
            <Input
                placeholder="Liczba setów"
                style={styles.inputs}
                iconContent={
                    <Icon
                        size={16}
                        color="#ADB5BD"
                        name="agenda-bookmark2x"
                        family="NowExtra"
                        style={styles.inputIcons}
                    />
                }
                value={this.state.sets_number}
                onChangeText={sets_number=>this.setState({sets_number})}
            />
          </Block>
          <Block middle>
            <Block style={styles.rows, styles.inputs_select}>
                <Picker
                    selectedValue={this.state.event_type_id}
                    onValueChange={(itemValue, itemIndex) => this.setState({event_type_id: itemValue})}>
                        <Picker.Item style={{fontSize:14}} label='Wybierz rodzaj koncertu z listy' value='0' />
                        { data_events_types.map((item, key)=>
                            <Picker.Item style={{fontSize:14}} label={item.label} value={item.value} key={key} />
                        )}
                </Picker>
            </Block>
          </Block>
          <Block row middle style={styles.rows_textarea}>
            <TextInput
                placeholder="Szczegóły koncertu"
                style={styles.inputs_textarea}
                multiline = {true}
                numberOfLines = {10}
                iconContent={
                    <Icon
                        size={16}
                        color="#ADB5BD"
                        name="list-bullet2x"
                        family="NowExtra"
                        style={styles.inputIcons}
                    />
                }
                value={this.state.event_details}
                onChangeText={event_details=>this.setState({event_details})}/>
          </Block>
          <Block middle>
            <Block style={styles.rows, styles.inputs_select}>
                <Picker
                    selectedValue={this.state.tour_manager_id}
                    onValueChange={(itemValue, itemIndex) => this.setState({tour_manager_id: itemValue})}>
                        <Picker.Item style={{fontSize:14}} label='Wybierz tour managera z listy' value='0' />
                        { data_teams_managers.map((item, key)=>
                            <Picker.Item style={{fontSize:14}} label={item.label} value={item.value} key={key} />
                        )}
                </Picker>
            </Block>
          </Block>
          <Block row middle style={styles.rows}>
                                <Input
                                    placeholder="Telefon kontaktowy"
                                    style={styles.inputs}
                                    iconContent={
                                        <Icon
                                            size={16}
                                            color="#ADB5BD"
                                            name="headphones-22x"
                                            family="NowExtra"
                                            style={styles.inputIcons}
                                        />
                                    }
                                    value={this.state.contact_phone}
                                    onChangeText={contact_phone=>this.setState({contact_phone})}/>
                              </Block>
          <Block row middle style={styles.rows, {paddingTop: 10, paddingBottom: 200}}>
            <Block center>
                <Button color="primary" round style={styles.createButton} onPress={()=>{this.InsertRecord()}}>
                    <Text
                        style={{ fontFamily: 'montserrat-bold' }}
                        size={14}
                        color={nowTheme.COLORS.WHITE}>
                            Zapisz koncert
                    </Text>
                </Button>
            </Block>
          </Block></KeyboardAvoidingView>
      </ScrollView>

    );
  }
}

const styles = StyleSheet.create({
  settings: {
    paddingVertical: theme.SIZES.BASE / 3
  },
  title: {
    paddingTop: theme.SIZES.BASE,
    paddingBottom: theme.SIZES.BASE / 2
  },
  rows: {
    height: theme.SIZES.BASE * 3.8,
    paddingHorizontal: theme.SIZES.BASE
  },
  rows_place: {
      paddingHorizontal: theme.SIZES.BASE * 1.3
    },
  only_label: {
    paddingTop: theme.SIZES.BASE
  },
  calendar: {
    paddingHorizontal: theme.SIZES.BASE * 1.5,
    paddingTop: theme.SIZES.BASE
  },
  rows_big: {
      height: theme.SIZES.BASE * 10,
      paddingHorizontal: theme.SIZES.BASE
    },
   inputs: {
      borderWidth: 1,
      borderColor: '#E3E3E3',
      borderRadius: 21.5,
      width: width-40,
    },
    inputs_half: {
          borderWidth: 1,
          borderColor: '#E3E3E3',
          borderRadius: 21.5,
          width: (width-50)/2,
          marginLeft: 5,
          marginRight: 5,
          backgroundColor: '#ffffff'
        },
    inputs_textarea: {
          borderWidth: 1,
          borderColor: '#E3E3E3',
          borderRadius: 21.5,
          width: width-40,
          height: theme.SIZES.BASE * 10,
          backgroundColor: '#ffffff',
          paddingHorizontal: theme.SIZES.BASE,
          paddingVertical: theme.SIZES.BASE,
        },
    rows_textarea: {
        height: theme.SIZES.BASE * 10,
        paddingHorizontal: theme.SIZES.BAS2,
        marginTop: 7,
        marginBottom: 7
      },
    inputs_select: {
        backgroundColor: '#ffffff',
        borderWidth: 1,
        borderColor: '#E3E3E3',
              borderRadius: 25,
              width: width-40,
              paddingHorizontal: 10,
              paddingVertical: 0
            },
    inputIcons: {
        marginRight: 12,
        color: nowTheme.COLORS.ICON_INPUT
      },
      clearButton: {
               backgroundColor: '#cccccc',
               borderRadius: 20,
               width: 26,
               height: 26,
               marginLeft: -35,
               marginTop: 8,
             },
             removeIcons: {
                     color: nowTheme.COLORS.ICON_INPUT,
                     marginLeft: 5,
                     marginTop: 5,
                   }
});