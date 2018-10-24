import React, {Component} from 'react';
import {Button, FlatList, StyleSheet, Text, View} from 'react-native';
import {connect} from 'react-redux';
import {actionCreators, fetchHomes, getHomes} from "../redux/reducer";


class HomeList extends Component {


  // static propTypes = {
  //   dispatch: PropTypes.func.isRequired,
  // }

  filterHome = (range) => {
    const {store} = this.props;
    range = {minPrice: 375, maxPrice: 400};
    store.dispatch(actionCreators.filterHome(range))
  }


  renderItem = ({item}) => (
    <View style={styles.item}>

      <Text>{item.id}</Text>
      <Text>{item.title}</Text>
      <Text>{item.pricePerMonth}</Text>

      <Button
        onPress={this.filterHome}
        title="Learn More"
        color="#841584"
        accessibilityLabel="filter"
      />


    </View>
  );

  componentWillMount() {
    this.props.getHomes();
  }

  // componentWillMount() {
  //   const {store} = this.props;
  //   store.dispatch(fetchHomes())
  // }

  render() {
    const {homes} = this.props;
    return (
      <FlatList
        styles={styles.container}
        data={homes}
        renderItem={this.renderItem}
      />

    );
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
