import { Block, Text, theme } from 'galio-framework';
import { Linking, StyleSheet, TouchableOpacity } from 'react-native';

import Icon from './Icon';
import React from 'react';
import nowTheme from '../constants/Theme';
import AsyncStorage from '@react-native-async-storage/async-storage'

class DrawerItem extends React.Component {
  renderIcon = () => {
    const { title, focused } = this.props;

    switch (title) {
      case 'Home':
        return (
          <Icon
            name="app2x"
            family="NowExtra"
            size={18}
            color={focused ? nowTheme.COLORS.PRIMARY : 'black'}
            style={{ opacity: 0.5 }}
          />
        );
      case 'Components':
        return (
          <Icon
            name="atom2x"
            family="NowExtra"
            size={18}
            color={focused ? nowTheme.COLORS.PRIMARY : 'black'}
            style={{ opacity: 0.5 }}
          />
        );
      case 'Articles':
        return (
          <Icon
            name="paper"
            family="NowExtra"
            size={18}
            color={focused ? nowTheme.COLORS.PRIMARY : 'black'}
            style={{ opacity: 0.5 }}
          />
        );
      case 'Concerts':
              return (
                <Icon
                  name="atom2x"
                  family="NowExtra"
                  size={18}
                  color={focused ? nowTheme.COLORS.PRIMARY : 'black'}
                  style={{ opacity: 0.5 }}
                />
              );
      case 'Audio Visual Support':
              return (
                <Icon
                  name="paper"
                  family="NowExtra"
                  size={18}
                  color={focused ? nowTheme.COLORS.PRIMARY : 'black'}
                  style={{ opacity: 0.5 }}
                />
              );
      case 'Add Concert':
                    return (
                      <Icon
                        name="simple-add2x"
                        family="NowExtra"
                        size={18}
                        color={focused ? nowTheme.COLORS.PRIMARY : 'black'}
                        style={{ opacity: 0.5 }}
                      />
                    );
      case 'Add Audio Visual Support':
                          return (
                            <Icon
                              name="simple-add2x"
                              family="NowExtra"
                              size={18}
                              color={focused ? nowTheme.COLORS.PRIMARY : 'black'}
                              style={{ opacity: 0.5 }}
                            />
                          );
      case 'Profile':
        return (
          <Icon
            name="profile-circle"
            family="NowExtra"
            size={18}
            color={focused ? nowTheme.COLORS.PRIMARY : 'black'}
            style={{ opacity: 0.5 }}
          />
        );
      case 'Account':
        return (
          <Icon
            name="badge2x"
            family="NowExtra"
            size={18}
            color={focused ? nowTheme.COLORS.PRIMARY : 'black'}
            style={{ opacity: 0.5 }}
          />
        );
      case 'Settings':
        return (
          <Icon
            name="settings-gear-642x"
            family="NowExtra"
            size={18}
            color={focused ? nowTheme.COLORS.PRIMARY : 'black'}
            style={{ opacity: 0.5 }}
          />
        );
      case 'Examples':
        return (
          <Icon
            name="album"
            family="NowExtra"
            size={14}
            color={focused ? nowTheme.COLORS.PRIMARY : 'black'}
          />
        );
      case 'ADD OR EDIT CONCERT':
              return (
                <Icon
                  name="simple-add2x"
                  family="NowExtra"
                  size={18}
                  style={{ borderColor: 'rgba(0,0,0,0.5)', opacity: 0.5 }}
                  color={focused ? nowTheme.COLORS.PRIMARY : 'black'}
                />
              );
      case 'ADD OR EDIT EVENT':
        return (
          <Icon
            name="simple-add2x"
            family="NowExtra"
            size={18}
            style={{ borderColor: 'rgba(0,0,0,0.5)', opacity: 0.5 }}
            color={focused ? nowTheme.COLORS.PRIMARY : 'black'}
          />
        );
      case 'LOGOUT':
        return (
          <Icon
            name="share"
            family="NowExtra"
            size={18}
            style={{ borderColor: 'rgba(0,0,0,0.5)', opacity: 0.5 }}
            color={focused ? nowTheme.COLORS.PRIMARY : 'black'}
          />
        );
      default:
        return null;
    }
  };

        getNewTitle(title) {
            switch(title) {
                case 'Concerts': return 'Koncerty';
                case 'Audio Visual Support': return 'Montaż audio-wizualny';
                case 'Add Concert': return 'Dodaj koncert';
                case 'Add Audio Visual Support': return 'Dodaj montaż';
                case 'LOGOUT': return 'WYLOGUJ SIĘ';
            }
        }

  render() {
    const { focused, title, navigation } = this.props;

    const containerStyles = [
      styles.defaultStyle,
      focused ? [styles.activeStyle, styles.shadow] : null,
    ];


    return (
      <TouchableOpacity
        style={{ height: 60 }}
        onPress={() =>
        title == 'LOGOUT' ?
            (AsyncStorage.setItem('logged_user_id', '0') && navigation.navigate('Onboarding')) :
            navigation.navigate(title)
        }
      >
        <Block flex row style={containerStyles}>
          <Block middle flex={0.1} style={{ marginRight: 5 }}>
            {this.renderIcon()}
          </Block>
          <Block row center flex={0.9}>
            <Text
              style={{
                fontFamily: 'montserrat-regular',
                textTransform: 'uppercase',
                fontWeight: '300',
              }}
              size={12}
              bold={focused ? true : false}
              color={focused ? nowTheme.COLORS.PRIMARY : 'black'}
            >
              {this.getNewTitle(title)}
            </Text>
          </Block>
        </Block>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  defaultStyle: {
    paddingVertical: 15,
    paddingHorizontal: 14,
    color: 'white',
  },
  activeStyle: {
    backgroundColor: nowTheme.COLORS.WHITE,
    borderRadius: 30,
    color: 'white',
  },
  shadow: {
    shadowColor: theme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 8,
    shadowOpacity: 0.1,
  },
});

export default DrawerItem;
