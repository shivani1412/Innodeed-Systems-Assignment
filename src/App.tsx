import React from 'react';
// @ts-ignore
import { Block, Button, View} from 'vcc-ui';
import ProductPanelCarousel from "./components/ProductPanelCarousel";

export default function App() {
  return (
      <Block extend={{ background: 'white' }}>
          <View spacing={2}>
              <View
                  padding={[1, 2]}
              >
                <ProductPanelCarousel />
              </View>
          </View>
      </Block>
  );
}