import {ISvgFactoryParams} from 'types/common';

export default ({
  width,
  height,
  fillAccent,
}: ISvgFactoryParams) => `<svg width="${width}" height="${height}" viewBox="0 0 24 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<line x1="0.5" y1="0.5" x2="23.5" y2="0.5" stroke="${fillAccent}" stroke-linecap="round"/>
<line x1="0.5" y1="5.50012" x2="23.5" y2="5.50012" stroke="${fillAccent}" stroke-linecap="round"/>
<line x1="0.5" y1="10.4999" x2="23.5" y2="10.4999" stroke="${fillAccent}" stroke-linecap="round"/>
<line x1="0.5" y1="15.5" x2="23.5" y2="15.5" stroke="${fillAccent}" stroke-linecap="round"/>
</svg>`;
