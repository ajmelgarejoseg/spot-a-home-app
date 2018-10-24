import React, {Component, PropTypes} from 'react'
import {StyleSheet, View} from 'react-native'
import {Header} from "react-native-elements";

const styles = StyleSheet.create({
  detailsWrapper: {
    display: 'flex'
  }
})

class ViewDetails extends Component {

  render() {
    const {details, goBack} = this.props;

    return (
      <View>
        <Header
          leftComponent={{ icon: 'keyboard-arrow-left', color: '#fff', onPress: goBack }}
          centerComponent={{ text: 'MY TITLE', style: { color: '#fff' } }}
        />
        <View style={styles.detailsWrapper}>
        </View>
      </View>
    )
  }
}

export default ViewDetails
