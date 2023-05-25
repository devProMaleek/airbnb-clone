'use client';

import React, { useCallback, useState } from 'react';
import { SafeListing, SafeUser } from '../types';
import Container from '../components/Container';
import Heading from '../components/Heading';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import ListingCard from '../components/Listings/ListingCard';

type Props = {
  listings: SafeListing[];
  currentUser: SafeUser | null;
};

const PropertiesClient = ({ listings, currentUser }: Props) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState<string>('');

  const onCancel = useCallback(
    (id: string) => {
      setDeletingId(id);

      axios
        .delete(`/api/listings/${id}`)
        .then(() => {
          toast.success('Listing Deleted');
          router.refresh();
        })
        .catch((error: any) => {
          toast.error(error?.response?.data?.message || 'Something went wrong');
        })
        .finally(() => {
          setDeletingId('');
        });
    },
    [router]
  );

  return (
    <>
      <Container>
        <Heading title="Properties" subtitle="List of your properties" />
        <div className="grid grid-cols-1 gap-8 mt-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
          {listings.map((listing) => (
            <ListingCard
              key={listing.id}
              data={listing}
              actionId={listing.id}
              onAction={onCancel}
              disabled={deletingId === listing.id}
              actionLabel='Delete Property'
              currentUser={currentUser}
            />
          ))}
        </div>
      </Container>
    </>
  );
};

export default PropertiesClient;
