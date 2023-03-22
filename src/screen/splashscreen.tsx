import React, {useEffect, useRef, useState} from 'react';
import {Animated} from 'react-native';
import images from '../assets/images';
import {style} from '../style/style';

export function SplashScreen({
  children,
  appReady,
}: {
  appReady: boolean;
  children: React.ReactNode;
}) {
  return (
    <>
      {appReady && children}
      <Splash appReady={appReady} />
    </>
  );
}

enum SplashState {
  Loading,
  FadeIn,
  Wait,
  FadeOut,
  Hidden,
}

const Splash = ({appReady}: {appReady: boolean}) => {
  const containerOpacity = useRef(new Animated.Value(1)).current;
  const imageOpacity = useRef(new Animated.Value(0)).current;
  const [state, setState] = useState<SplashState>(SplashState.Loading);

  useEffect(() => {
    if (state === SplashState.FadeIn) {
      Animated.timing(imageOpacity, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: true,
      }).start(() => {
        setState(SplashState.Wait);
      });
    }
  }, [imageOpacity, state]);

  useEffect(() => {
    if (state === SplashState.Wait) {
      if (appReady) {
        setState(SplashState.FadeOut);
      }
    }
  }, [appReady, state]);

  useEffect(() => {
    if (state === SplashState.FadeOut) {
      Animated.timing(containerOpacity, {
        toValue: 0,
        duration: 1500,
        delay: 1000,
        useNativeDriver: true,
      }).start(() => {
        setState(SplashState.Hidden);
      });
    }
  }, [containerOpacity, state]);

  if (state === SplashState.Hidden) {
    return null;
  }

  return (
    <Animated.View
      collapsable={false}
      style={[style.splashContainer, {opacity: containerOpacity}]}>
      <Animated.Image
        source={images.splashImage}
        fadeDuration={0}
        onLoad={() => {
          setState(SplashState.FadeIn);
        }}
        style={[style.splashImage, {opacity: imageOpacity}]}
        resizeMode="contain"
      />
    </Animated.View>
  );
};
