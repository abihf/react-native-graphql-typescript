import gql from 'graphql-tag';
import { Body, Card, Content, Header, Input, Item, Label, Text, Title } from 'native-base';
import * as React from 'react';
import { Query, QueryResult } from 'react-apollo';
import { StyleSheet } from 'react-native';
import { NavigationScreenProps } from "react-navigation";
import { LocationFragment, LocationSearchQuery } from "../graphql-types";
import { LOCATION_FRAGMENT, LocationItem } from "./LocationItem";


const QUERY = gql`
  query LocationSearch($q: String!) {
    allLocations(filter: {name_contains: $q}, orderBy: name_ASC) {
      ...Location
    }
  }
  ${LOCATION_FRAGMENT}
`;

interface State {
  searchQuery: string
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});

export default class HomePage extends React.Component<NavigationScreenProps<{}>, State> {
  state = {
    searchQuery: "Jakarta"
  }

  handleSearch = (searchQuery) => {
    this.setState({ searchQuery });
  }

  render() {
    return (
      <Content padder>
        <Item floatingLabel>
          {/* <Icon active name='search' /> */}
          <Label>Search</Label>
          <Input placeholder='Input location' value={this.state.searchQuery} onChangeText={this.handleSearch} />
        </Item>
        {this.renderSearch()}
      </Content>
    );
  }

  renderSearch() {
    const { navigate } = this.props.navigation;
    const showResult = this.state.searchQuery.length >= 2;

    return <Query skip={!showResult} query={QUERY} variables={{ q: this.state.searchQuery }}>
      {({ loading, error, data, networkStatus }: QueryResult<LocationSearchQuery>) => {
        if (loading && showResult) return <Text>{'Loading...'}</Text>
        if (loading) return null;
        if (error) return <Text>{`Error!: ${error}`}</Text>;

        const items = data.allLocations.map(loc => (
          <LocationItem location={loc} key={loc.id} onPress={this.onLocationPressed} />
        ));
        return  <Card>{items}</Card>;
      }}
    </Query>
  }

  onLocationPressed = (loc: LocationFragment) =>
    this.props.navigation.navigate('HotelSearch', { locationID: loc.id, locationName: loc.name })

  static navigationOptions() {
    return {
      header: (
        <Header>
          <Body>
            <Title>GraphQL Demo</Title>
          </Body>
        </Header>
      ),
    };
  }
}
