import { Stack } from 'expo-router'
import React from 'react'
import { observer } from '@legendapp/state/react'

const _layout = observer(() => {
  return (
    <Stack screenOptions={{headerShown: false}}/>
  )
});

export default _layout