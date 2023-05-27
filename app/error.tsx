'use client';
import React, { useEffect } from 'react';

import EmptyState from '@/app/components/EmptyState';

type Props = {
  error: Error;
};

const ErrorPage = ({ error }: Props) => {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return <EmptyState title="Uh Oh" subtitle="Something went wrong!" />;
};

export default ErrorPage;
