import { AllRoutes } from '@/types/navigation';
import { router } from 'expo-router';

export const navigateAndReplace = (route: `/${AllRoutes}`) => {
  router.replace(route);
};

export const navigateAndReset = (route: `/${AllRoutes}`) => {
  while (router.canGoBack()) {
    router.back();
  }
  router.replace(route);
};

export const navigateAndRemovePrevious = (route: `/${AllRoutes}`, removeCount: number = 1) => {
  router.push(route);
  setTimeout(() => {
    for (let i = 0; i < removeCount; i++) {
      if (router.canGoBack()) {
        router.back();
      }
    }
  }, 100);
};

export const navigateTo = (route: `/${AllRoutes}`) => {
  router.push(route);
};

export const goBack = () => {
  if (router.canGoBack()) {
    router.back();
  }
};


