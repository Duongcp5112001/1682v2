import React from 'react';
import { Button, Result } from 'antd';
import { Link } from 'react-router-dom';

import { ROUTES } from '~/routes';

export default function NotFound() {
  return (
    <Result
      status="404"
      title="404"
      subTitle='Page not found'
      extra={(
        <Link to={ROUTES.Home}>
          <Button type="primary">Back Home</Button>
        </Link>
      )}
    />
  );
}
