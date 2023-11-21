import React from 'react';
import { View, FlatList } from 'react-native';
import { EmailPreview } from './EmailPreview';
import { moderateVerticalScale } from '../functions/helpers';

export const EmailDisplayer = (props) => {
  return (
    <View style={{height: "100%"}}>
      <FlatList
        refreshing={props.refreshing}
        onRefresh={() => props.handleRefresh()}
        data={props.data}
        renderItem={renderMessage}
        keyExtractor={(item, index) => `${index}`}
        contentContainerStyle={{paddingBottom: moderateVerticalScale(200)}}
      />
    </View> 
  ) 
}

const renderMessage = ({ item }) => {
  return (
    <EmailPreview 
      message={item}
    />
  )
}; 