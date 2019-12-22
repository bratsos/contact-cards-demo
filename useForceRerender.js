import React from 'react';

const useForceRerender = () => {
  const [, forceRender] = React.useState(false);
  return () => forceRender(v => !v)
}

export default useForceRerender;
