import React, { Component, PropTypes } from 'react'
import {View, StyleSheet, TouchableOpacity, ScrollView, Button} from 'react-native'
import MultiSlider from "@ptomasroos/react-native-multi-slider/MultiSlider";
import {Text} from "react-native-elements";

const styles = StyleSheet.create({
  priceWrapper: {

    backgroundColor: 'antiquewhite',
    display: 'flex',
    // justifyContent: 'center',
    // flexDirection: 'row',
    // height: 100,
    // width: '100%',
    // borderWidth: 2,
    // borderColor: 'black',
  },

  multiSlider: {
    marginLeft: 50,
    marginTop: 20,
  },
  inner: {
    flex: 1,
    margin: 2,
    backgroundColor: 'rgba(0,0,0,0.8)',
  },
})

class PriceSlider extends Component {

  constructor(props) {
    super(props);
    this.state = {
      filterValue: [0, 100]
    };
  }
  componentDidMount() {
    this.setState({filterValue: this.formatIndex(this.state.filterValue)});
  }

  valueChange(value, val) {
    this.props.onFilterChange(this.state.filterValue)

    this.setState({filterValue: this.formatIndex(value)});
  }

  onClearButton() {
    // console.log(this.state.filterValue);
    this.props.onClearFilter(this.formatIndex([0,100]));
    this.setState({filterValue: this.formatIndex([0, 100])});
  }

  render() {
    // console.log(this.state);
    return (
      <View style={styles.priceWrapper}>
        <View style={styles.multiSlider}>
          <MultiSlider
            sliderLength={200}
            onValuesChange={(value) => this.valueChange(value)}
            values={[0, 100]}
            max={100}
          />
        </View>
        <View>
          <Text>
            {this.state.filterValue[0] + ' - ' + this.state.filterValue[1]}
          </Text>
          <Button
            onPress={this.onClearButton.bind(this)}
            title={'CLEAR'}
          />


        </View>
      </View>
    )
  }

  formatIndex(arr) {
    return [(300 + arr[0]*5), (300 + arr[1]*5)];
  }
}
export default PriceSlider;
