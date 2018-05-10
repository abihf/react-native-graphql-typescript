import ApolloClient from 'apollo-boost';
import { AppLoading, Font } from 'expo';
import { Root, Container } from 'native-base';
import * as React from 'react';
import { ApolloProvider } from 'react-apollo';
import { StackNavigator } from 'react-navigation';
import HomeScreen from './home/HomeScreen';
import HotelDetailScreen from './hotel/detail/HotelDetailScreen';
import HotelSearchScreen from './hotel/search/HotelSearchScreen';

const Route = StackNavigator({
  Home: {
    screen: HomeScreen,
  },
  HotelSearch: {
    screen: HotelSearchScreen,
  },
  HotelDetail: {
    screen: HotelDetailScreen,
  }
}, { initialRouteName: 'Home' })


const apolloClient = new ApolloClient({
  uri: "https://api.graph.cool/simple/v1/cjgzk14j99a8d017511lplhae",
});

interface State {
  fontLoaded: boolean
}

export default class App extends React.Component<{}, State> {
  state = {
    fontLoaded: false
  }

  async componentDidMount() {
    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
    });
    this.setState({ fontLoaded: true });
  }

  render() {
    if (!this.state.fontLoaded) {
      return <Root><AppLoading /></Root>
    }

    return (
      <ApolloProvider client={apolloClient}>
        <Container>
          <Route />
        </Container>
      </ApolloProvider>
    )
  }
}

