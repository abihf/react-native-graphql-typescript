import gql from 'graphql-tag';
import { Badge, Body, CardItem, Right, Text } from 'native-base';
import * as React from 'react';
import { LocationFragment } from "../graphql-types";

export const LOCATION_FRAGMENT = gql`
  fragment Location on Location {
    id
    name
    _hotelsMeta {
      count
    }
  }
`;

interface Props {
  location: LocationFragment
  onPress: (location: LocationFragment) => void
}

export const LocationItem = ({ location, onPress }: Props) => (
  <CardItem button onPress={() => onPress(location)}>
    <Body>
      <Text>{location.name}</Text>
    </Body>
    <Right>
      <Badge>
        <Text>{location._hotelsMeta.count}</Text>
      </Badge>
    </Right>
  </CardItem>
);
