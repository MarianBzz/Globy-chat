// global.d.ts
declare module '*.ttf';

declare global {
  namespace ReactNative {
    interface TextStyle {
      fontFamily?: 'Proxima-Nova' | string;
    }
  }
}
