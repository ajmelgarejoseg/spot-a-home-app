import React, {Component, PropTypes} from 'react'
import {Linking, StyleSheet, Text, View} from 'react-native'
import {Button, Card, Header, Icon} from 'react-native-elements';
import testDetails from './../detailTest.json';

const styles = StyleSheet.create({
  wrapper: {

    display: 'flex',
    backgroundColor: '#e8fce6',
    width: '100%',
    height: '100%',
  },
  detailsWrapper: {
    flex: 1,
    width: '100%'
  },
  header: {},
  price: {
    flexDirection: 'row',
    marginLeft: 'auto',
    justifyContent: 'flex-end',
    fontWeight: 'bold',
    color: '#00C146'
  },
  city: {
    fontWeight: 'bold',
    color: '#000'
  },
  text: {
    color: '#888a8c'
  },
  title: {
    marginRight: 20,
    marginLeft: 20,
    fontSize: 20,
  },
  card: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#ddd',
    borderBottomWidth: 0,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 5,
  }
});

class ViewDetails extends Component {

  render() {
    const {goBack} = this.props;
    const details = this.props.details ? this.props.details : testDetails; // testing...

    return (
      <View style={styles.wrapper}>
        <Header style={styles.header}
                backgroundColor={'#00BD95'}
                leftComponent={{icon: 'keyboard-arrow-left', color: '#fff', onPress: goBack}}
                centerComponent={{text: '[spotahome]', style: {color: '#fff'}}}
        />
        <Card
          testID={'card'}
          containerStyle={styles.card}
          title={details.title}
          titleStyle={styles.title}
          image={{uri: details.mainPhotoUrl}}>

          <Text style={{marginBottom: 10}}>
            {details.description}
          </Text>
          <View>
            <Text style={styles.price}>
              {details.pricePerMonth} {details.currencySymbol}
            </Text>
            <Text style={styles.city}>
              {'City:'} {details.city}
            </Text>
            <Text style={styles.text}>
              {'Runner:'} {details.runnerName}
            </Text>
            {details.sharedRoom ?
              <Text style={styles.text}>
                {'Shared room'}
              </Text>
              :
              <Text style={styles.text}>
                {'Single room'}
              </Text>
            }

          </View>
          <Button
            icon={<Icon name='info' color='#ffffff'/>}
            backgroundColor='#888a8c'
            containerStyle={{borderColor: '#00BD95'}}
            buttonStyle={{borderColor: '#00BD95', borderRadius: 2, marginTop: 50, marginRight: 0, marginBottom: 0}}
            title='MORE DETAILS'
            onPress={() => {
              Linking.openURL('https://spotahome.com' + details.url)
            }}
          />
        </Card>
      </View>
    )
  }
}

export default ViewDetails;

