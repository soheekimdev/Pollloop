export const encodeSvgForCss = (svg: string) => {
  return encodeURIComponent(svg)
    .replace(/%3D/g, '=')
    .replace(/%3A/g, ':')
    .replace(/%2F/g, '/')
    .replace(/%22/g, "'")
    .replace(/%20/g, ' ');
};
