import React from 'react';
import {SvgXml} from 'react-native-svg';
import {ISvgFactoryParams} from 'types/common';

type IGetSvg = (params: ISvgFactoryParams) => string;

const useSvgFactory = (getSvg: IGetSvg, params: ISvgFactoryParams): JSX.Element => <SvgXml xml={getSvg(params)} />;

export default useSvgFactory;
