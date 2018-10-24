import React, {Component} from 'react';
import {FlatList, StyleSheet, Text, TouchableWithoutFeedback, View} from 'react-native';
import {connect} from 'react-redux';
import {actionCreators, fetchHomes, getHomes} from "../redux/reducer";
import {Header} from "react-native-elements";
import PriceSlider from "./PriceSlider";


class HomeList extends Component {

  renderItem = ({item}) => {
    return (
      <TouchableWithoutFeedback style={styles.item} onPress={() => this.openDetails(item)}>
        <View>
          <Text>{item.id}</Text>
          <Text>{item.title}</Text>
          <Text>{item.pricePerMonth}</Text>

        </View>


      </TouchableWithoutFeedback>
    )
  };

  constructor(props) {
    super(props);
    this.state = {
      showFilter: true,
      showDetails: false,
      selectedIem: {}
    };
  }

  componentWillMount() {
    this.props.getHomes();
  }

  filterHome(range) {
    console.log('range', range)
    // console.log(this.props);
    range = {minPrice: 375, maxPrice: 400};
    store.dispatch(actionCreators.filterHome(range))
  }

  showFilter() {
    const {showFilter} = this.state;
    this.setState({showFilter: !showFilter});
  }

  closeDetails() {
    this.setState({showDetails: false});
  }

  openDetails(item) {
    console.log('openDetails!!')
    console.log('item', item)
    this.setState({showDetails: true, showFilter: false, selectedIem: item});
  }
/*
{showDetails ?
        <ViewDetails
          goBack={this.closeDetails.bind(this)}
          details={selectedItem}
        />
        :null}
*/
  render() {
    const {homes} = this.props;
    const {showDetails, showFilter, selectedItem} = this.state;
    return (
      <View>

        <Header
          leftComponent={{icon: 'menu', color: '#fff'}}
          centerComponent={{text: 'MY TITLE', style: {color: '#fff'}}}
          rightComponent={{icon: 'filter-list', color: '#fff', onPress: this.showFilter.bind(this)}}
        />
        {showFilter ?
          <PriceSlider
            onFilterChange={value => this.onFilterChange(value)}
            startPrice={300}
            min={0}
            max={100}
          />
          : null}
        <FlatList
          styles={styles.container}
          data={homes}
          renderItem={this.renderItem}
        />

      </View>

    );
  }

  onFilterChange(value) {
    console.log('parent', value)
    // let range = {minPrice: value[0], maxPrice: value[1]};
    let range = {minPrice: 390, maxPrice: 450};
    // console.log('propsssss', this.props);
    this.props.store.dispatch(actionCreators.filterHome(range))
    // this.filterHome(value);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  item: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc'
  }
});

const mapStateToProps = state => {
  let storedHomes = [];
  storedHomes = state.homes.map(home => ({key: home.id.toString(), ...home}));

  return {
    homes: storedHomes
  };
};

const mapDispatchToProps = {
  getHomes
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeList);
