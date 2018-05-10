import gql from 'graphql-tag';
import { Badge, CardItem, Icon, Right, Text, Body } from 'native-base';
import * as React from 'react';
import { HotelFragment } from "../../graphql-types";

export const HOTEL_ITEM_FRAGMENT = gql`
  fragment Hotel on Hotel {
    id
    name
    photo
    description
    _roomsMeta {
      count
    }
  }
`;

interface Props {
  hotel: HotelFragment
  onPress: () => void
}

export const HotelItem = ({ hotel, onPress }: Props) => (
  <CardItem button onPress={onPress}>
    <Body>
      <Text>{hotel.name}</Text>
    </Body>
    <Right>
      <Badge>
        <Text>{hotel._roomsMeta.count}</Text>
      </Badge>
    </Right>
  </CardItem>
)
