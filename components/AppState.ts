import { View, Text } from 'react-native'
import React from 'react'
import { create } from 'zustand';

export type HAButtonState = {
  icon: string
}

export const useHAButtonState = create<HAButtonState>()((set)=>({
  icon: ""
}));

