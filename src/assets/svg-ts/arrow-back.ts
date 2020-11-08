import {ISvgFactoryParams} from 'types/common';

export default ({
  width,
  height,
  fillAccent,
}: ISvgFactoryParams) => `<svg width="${width}" height="${height}" viewBox="0 0 26 8" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M0.646433 3.64644C0.451172 3.84171 0.451172 4.15829 0.646433 4.35355L3.82841 7.53553C4.02368 7.73079 4.34026 7.73079 4.53552 7.53553C4.73078 7.34027 4.73078 7.02369 4.53552 6.82843L1.70709 4L4.53552 1.17157C4.73078 0.976309 4.73078 0.659726 4.53552 0.464464C4.34026 0.269202 4.02368 0.269202 3.82841 0.464464L0.646433 3.64644ZM24.5293 3.5L0.999987 3.5L0.999987 4.5L24.5293 4.5L24.5293 3.5Z" fill="${fillAccent}"/>
<path d="M1.94128 4H25" stroke="${fillAccent}" stroke-linecap="round"/>
</svg>`;
