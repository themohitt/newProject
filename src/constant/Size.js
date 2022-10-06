import {Dimensions} from 'react-native';
import {DESIGN_WIDTH} from './AppDefines';

export const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} =
  Dimensions.get('window');

// based on iphone 5s's scale
// const scale = SCREEN_WIDTH / DESIGN_WIDTH;

export function normalize(size) {
  return pixelNormalize(size);
}

export function pixelNormalize(value) {
  return (SCREEN_WIDTH * value) / DESIGN_WIDTH;
}
