declare module 'types/common' {
  type IOnPress = () => void;
  export declare interface IInputs {
    email: string;
    password: string;
  }
  export declare interface ISvgFactoryParams {
    width?: number;
    height?: number;
    fillAccent?: string;
    fillSecondary?: string;
  }
  export declare interface ISize {
    width: number;
    height: number;
  }
}
