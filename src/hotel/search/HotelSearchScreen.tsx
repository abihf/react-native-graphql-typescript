import gql from 'graphql-tag';
import { Body, Button, Content, Header, Icon, Left, Right, Title } from 'native-base';
import * as React from 'react';
import { Query, QueryResult } from 'react-apollo';
import { NavigationScreenProps } from "react-navigation";
import { HotelSearchQuery } from '../../graphql-types';
import { HOTEL_ITEM_FRAGMENT, HotelItem } from "./HotelItem";


const QUERY = gql`
  query HotelSearch($locationID: ID!) {
    allHotels(filter: {location: {id: $locationID}}, orderBy: name_ASC) {
      ...Hotel
    }
  }

  ${HOTEL_ITEM_FRAGMENT}
`;

interface State {
  searchQuery: string
}
interface NavigationParam {
  locationID: string
  locationName: string
}

export default class HotelSearchScreen extends React.Component<NavigationScreenProps<NavigationParam>, State> {
  render() {
    const { navigation } = this.props;
    const locationID = navigation.getParam('locationID');
    return (
      <Content>
        <Query query={QUERY} variables={{ locationID }} >
          {({ loading, error, data }: QueryResult<HotelSearchQuery>) => {
            if (loading) return null;
            if (error) return `Error!: ${error}`;

            return data.allHotels.map(hotel => (
              <HotelItem
                hotel={hotel}
                key={hotel.id}
                onPress={() => navigation.navigate('HotelDetail', { hotelID: hotel.id })}
              />
            ));
          }}
        </Query>
      </Content>
    );
  }


  static navigationOptions({ navigation }: NavigationScreenProps<NavigationParam>) {
    return {
      header: (
        <Header >
          <Left>
            <Button transparent onPress={() => navigation.goBack()}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>Hotel in {navigation.getParam("locationName")}</Title>
          </Body>
          <Right />
        </Header>
      ),
    };
  }
}
