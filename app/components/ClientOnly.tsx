import React, { useEffect, useState } from 'react';

type Props = {
  children: React.ReactNode;
};

const ClientOnly = ({ children }: Props) => {
  const [hasMounted, setHasMounted] = useState<boolean>(false);

  useEffect(() => {
    setHasMounted(!hasMounted);
  }, [hasMounted]);

  if (!hasMounted) {
    return null;
  }

  return <>{children}</>;
};

export default ClientOnly;
