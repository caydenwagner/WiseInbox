import React, { useState, useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';

export const EmailPreview = (props) => {
  return (
    <Text>{props.message.snippet}</Text>
  )
}