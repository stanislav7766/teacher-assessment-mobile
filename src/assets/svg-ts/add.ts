import {ISvgFactoryParams} from 'types/common';

export default ({
  width,
  height,
  fillAccent,
  fillSecondary,
}: ISvgFactoryParams) => `<svg width="${width}" height="${height}" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
<circle cx="20" cy="20" r="19.5" fill="${fillSecondary}" stroke="${fillAccent}"/>
<path d="M20.4736 20V10" stroke="${fillAccent}" stroke-width="3" stroke-linecap="round"/>
<path d="M20.4736 29.5263V20.0526" stroke="${fillAccent}" stroke-width="3" stroke-linecap="round"/>
<path d="M20.4736 20.0526H29.9473" stroke="${fillAccent}" stroke-width="3" stroke-linecap="round"/>
<path d="M10.9999 20.0526H20.4736" stroke="${fillAccent}" stroke-width="3" stroke-linecap="round"/>
</svg>
`;
