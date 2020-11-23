import {ISvgFactoryParams} from 'types/common';

export default ({
  width,
  height,
  fillAccent,
  fillSecondary,
}: ISvgFactoryParams) => `<svg width="${width}" height="${height}" viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg">
<circle cx="16.5" cy="16.5" r="16.5" fill="${fillAccent}"/>
<path d="M14.0413 24.6725C13.8408 24.8827 13.5673 25 13.2832 25C12.9991 25 12.7257 24.8827 12.5252 24.6725L6.4712 18.3599C5.84293 17.7049 5.84293 16.6428 6.4712 15.989L7.22925 15.1985C7.85772 14.5435 8.87533 14.5435 9.5036 15.1985L13.2832 19.1392L23.4964 8.49125C24.1249 7.83625 25.1435 7.83625 25.7707 8.49125L26.5288 9.28176C27.1571 9.93676 27.1571 10.9987 26.5288 11.6527L14.0413 24.6725Z" fill="${fillSecondary}"/>
</svg>`;
