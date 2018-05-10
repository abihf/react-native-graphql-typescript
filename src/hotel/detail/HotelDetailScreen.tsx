import gql from 'graphql-tag';
import { Body, Button, Container, Content, Header, Icon, Left, Right, Text, Title } from 'native-base';
import * as React from 'react';
import { Query, QueryResult } from 'react-apollo';
import { NavigationScreenProps } from 'react-navigation';
import { HotelDetailQuery } from '../../graphql-types';


const QUERY = gql`
  query HotelDetail($hotelID: ID!) {
    Hotel(id: $hotelID) {
      name
      description
      photo
      rooms(first: 5) {
        ...Room
      }
    }
  }
  fragment Room on Room {
    name
    available
    price
  }
`;

interface NavigationParam {
  hotelID: string
}

export default class HotelDetailScreen extends React.Component<NavigationScreenProps<NavigationParam>> {
  render() {
    const hotelID = this.props.navigation.getParam('hotelID');
    return (
      <Content>
        <Query query={QUERY} variables={{ hotelID }}>
          {this.renderResult}
        </Query>
      </Content>
    );
  }

  renderResult = ({ loading, error, data }: QueryResult<HotelDetailQuery>) => {
    if (loading) return null;
    if (error) return <Text>{`Error!: ${error}`}</Text>;

    return (
      <Container>
        <Text style={{ fontWeight: 'bold' }}>{data.Hotel.description}</Text>
        <Text>{data.Hotel.description}</Text>
      </Container>
    )
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
            <Title>{'Hotel Detail'}</Title>
          </Body>
          <Right />
        </Header>
      ),
    };
  }
}
