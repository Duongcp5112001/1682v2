import React from 'react';
import { getFileName } from '~/utils/helper';

interface Props extends React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement> {
  displayName?: string;
}

function Svg(props: Props) {
  const alt = props.alt || props.displayName || getFileName(props?.src ?? '');
  return (
    <img {...props} alt={alt} />
  );
}

Svg.displayName = 'Svg';

export default Svg;
