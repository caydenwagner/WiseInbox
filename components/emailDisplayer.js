import React, { useState, useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';
import { EmailPreview } from './emailPreview';

export const EmailDisplayer = (props) => {
  return (
    <FlatList
      data={props.data}
      renderItem={renderMessage}
      keyExtractor={(item, index) => `${index}`}
    />
  )
}

const renderMessage = ({ item }) => {
  console.log(item)
  
  return (
    <EmailPreview 
      message={item}
    />
  )
}; 