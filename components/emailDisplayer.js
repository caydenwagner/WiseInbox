import React, { useState, useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';
import { EmailPreview } from './emailPreview';

export const EmailDisplayer = (props) => {
  return (
    <View style={{height: "100%"}}>
      <FlatList
        data={props.data}
        renderItem={renderMessage}
        keyExtractor={(item, index) => `${index}`}
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