import { useTheme } from '@/hooks/useTheme';
import React, { useEffect, useRef } from 'react';
import { Animated, Image, StyleSheet, View } from 'react-native';

interface SplashScreenProps {
  onFinish: () => void;
}

export function SplashScreen({ onFinish }: SplashScreenProps) {
  const { colors } = useTheme();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.7)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const shimmerAnim = useRef(new Animated.Value(0)).current;
  
  const coinAnimations = useRef(
    Array.from({ length: 12 }, () => ({
      translateY: new Animated.Value(-150),
      translateX: new Animated.Value(0),
      rotate: new Animated.Value(0),
      opacity: new Animated.Value(0),
      scale: new Animated.Value(0.5),
    }))
  ).current;

  const sparkleAnimations = useRef(
    Array.from({ length: 6 }, () => ({
      opacity: new Animated.Value(0),
      scale: new Animated.Value(0),
      rotate: new Animated.Value(0),
    }))
  ).current;

  useEffect(() => {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          tension: 30,
          friction: 6,
          useNativeDriver: true,
        }),
      ]),
      Animated.delay(800),
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onFinish();
    });

    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.05,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }),
      ])
    ).start();

    Animated.loop(
      Animated.timing(shimmerAnim, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      })
    ).start();

    coinAnimations.forEach((coin, index) => {
      const delay = index * 150;
      const randomX = (Math.random() - 0.5) * 300;
      
      Animated.sequence([
        Animated.delay(delay),
        Animated.parallel([
          Animated.timing(coin.opacity, {
            toValue: 1,
            duration: 400,
            useNativeDriver: true,
          }),
          Animated.spring(coin.scale, {
            toValue: 1,
            tension: 50,
            friction: 8,
            useNativeDriver: true,
          }),
          Animated.timing(coin.translateY, {
            toValue: 500,
            duration: 2500,
            useNativeDriver: true,
          }),
          Animated.timing(coin.translateX, {
            toValue: randomX,
            duration: 2500,
            useNativeDriver: true,
          }),
          Animated.timing(coin.rotate, {
            toValue: 1,
            duration: 2500,
            useNativeDriver: true,
          }),
        ]),
        Animated.timing(coin.opacity, {
          toValue: 0,
          duration: 400,
          useNativeDriver: true,
        }),
      ]).start();
    });

    sparkleAnimations.forEach((sparkle, index) => {
      const delay = 1000 + index * 300;
      
      Animated.sequence([
        Animated.delay(delay),
        Animated.parallel([
          Animated.timing(sparkle.opacity, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.spring(sparkle.scale, {
            toValue: 1,
            tension: 100,
            friction: 8,
            useNativeDriver: true,
          }),
          Animated.timing(sparkle.rotate, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
        ]),
        Animated.timing(sparkle.opacity, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
      ]).start();
    });
  }, []);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#CCFF66',
      justifyContent: 'center',
      alignItems: 'center',
    },
    logoContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
    },
    shimmerOverlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(255, 255, 255, 0.3)',
      borderRadius: 140,
    },
    coin: {
      position: 'absolute',
      width: 24,
      height: 24,
      borderRadius: 12,
      backgroundColor: '#FFD700',
      borderWidth: 2,
      borderColor: '#FFA500',
      shadowColor: '#FFD700',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.6,
      shadowRadius: 4,
      elevation: 4,
    },
    sparkle: {
      position: 'absolute',
      width: 16,
      height: 16,
      backgroundColor: '#FFD700',
      borderRadius: 8,
      shadowColor: '#FFD700',
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.8,
      shadowRadius: 8,
      elevation: 8,
    },
  });

  return (
    <View style={styles.container}>
      {coinAnimations.map((coin, index) => {
        const rotate = coin.rotate.interpolate({
          inputRange: [0, 1],
          outputRange: ['0deg', '720deg'],
        });
        
        return (
          <Animated.View
            key={index}
            style={[
              styles.coin,
              {
                left: 30 + (index % 4) * 90,
                top: 80 + Math.floor(index / 4) * 60,
                opacity: coin.opacity,
                transform: [
                  { translateY: coin.translateY },
                  { translateX: coin.translateX },
                  { rotate },
                  { scale: coin.scale },
                ],
              },
            ]}
          />
        );
      })}

      {sparkleAnimations.map((sparkle, index) => {
        const rotate = sparkle.rotate.interpolate({
          inputRange: [0, 1],
          outputRange: ['0deg', '360deg'],
        });
        
        const positions = [
          { left: 50, top: 150 },
          { right: 50, top: 200 },
          { left: 80, bottom: 200 },
          { right: 80, bottom: 150 },
          { left: 120, top: 100 },
          { right: 120, top: 250 },
        ];
        
        return (
          <Animated.View
            key={`sparkle-${index}`}
            style={[
              styles.sparkle,
              positions[index],
              {
                opacity: sparkle.opacity,
                transform: [
                  { scale: sparkle.scale },
                  { rotate },
                ],
              },
            ]}
          />
        );
      })}
      
      <Animated.View
        style={[
          styles.logoContainer,
          {
            opacity: fadeAnim,
            transform: [
              { scale: Animated.multiply(scaleAnim, pulseAnim) },
            ],
          },
        ]}
      >
        <Image 
          source={require('../assets/images/icon.png')} 
          style={styles.logo}
          resizeMode="contain"
        />
        <Animated.View
          style={[
            styles.shimmerOverlay,
            {
              opacity: shimmerAnim.interpolate({
                inputRange: [0, 0.5, 1],
                outputRange: [0, 0.6, 0],
              }),
              transform: [
                {
                  translateX: shimmerAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [-280, 280],
                  }),
                },
              ],
            },
          ]}
        />
      </Animated.View>
    </View>
  );
}

