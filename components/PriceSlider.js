import React, {Component, PropTypes} from 'react'
import {StyleSheet, View} from 'react-native'
import MultiSlider from "@ptomasroos/react-native-multi-slider/MultiSlider";
import {Button, Icon, Text} from "react-native-elements";

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
  buttonWrapper: {}
})

class PriceSlider extends Component {

  constructor(props) {
    super(props);
    const {rangePrice} = this.props;
    this.state = {
      filterValue: rangePrice,
      ascPrice: true,
    };
  }

  valueChange(value) {
    this.setState({filterValue: value});
  }

  onClearButton() {
    this.props.onClearFilter();
    this.setState({filterValue: this.props.rangePrice});
  }

  onApplyButton() {
    this.props.onFilterChange(this.state.filterValue)
  }

  onChangeOrder() {
    const {ascPrice} = this.state;
    this.setState({ascPrice: !ascPrice});
    this.props.onChangeOrder();
  }

  render() {
    // console.log('rangePrice', this.props.rangePrice);
    const {rangePrice} = this.props;
    const {filterValue, ascPrice} = this.state;
    return (
      <View style={styles.priceWrapper}>
        <View style={styles.multiSlider}>
          <MultiSlider
            sliderLength={200}
            onValuesChange={(value) => this.valueChange(value)}
            values={filterValue}
            min={rangePrice[0]}
            max={rangePrice[1]}
          />
        </View>
        <View>
          <View>
            <Text>
              {filterValue[0] + ' - ' + filterValue[1]}
            </Text>
          </View>
          <View style={styles.buttonWrapper}>
            <Button
              onPress={this.onClearButton.bind(this)}
              title={'CLEAR'}
            />
            <Button
              onPress={this.onApplyButton.bind(this)}
              title={'APPLY'}
            />
            {ascPrice ?
              <Button
                onPress={this.onChangeOrder.bind(this)}
                title={'desc'}
                icon={
                  <Icon
                    name='arrow-right'
                    size={15}
                    color='white'
                  />
                }
              />
              :
              <Button
                onPress={this.onChangeOrder.bind(this)}
                title={'asc'}
              />

            }
          </View>


        </View>
      </View>
    )
  }
}

export default PriceSlider;
/*
{ascPrice ?
              <Button
                onPress={this.onChangeOrder.bind(this)}
                title={'asc'}
                icon={
                  <Icon
                    name='arrow-right'
                    size={15}
                    color='white'
                  />
                }
              />
              :
              <Button
                onPress={this.onChangeOrder.bind(this)}
                title={'desc'}
              />

            }
*/
