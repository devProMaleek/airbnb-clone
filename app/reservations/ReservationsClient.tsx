'use client';

import React, { useCallback, useState } from 'react';
import { SafeReservation, SafeUser } from '../types';
import Container from '../components/Container';
import Heading from '../components/Heading';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import ListingCard from '../components/Listings/ListingCard';

type Props = {
  reservations: SafeReservation[];
  currentUser: SafeUser | null;
};

const ReservationsClient = ({ reservations, currentUser }: Props) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState<string>('');

  const onCancel = useCallback(
    (id: string) => {
      setDeletingId(id);

      axios
        .delete(`/api/reservations/${id}`)
        .then(() => {
          toast.success('Reservation Cancelled');
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
        <Heading title="Reservations" subtitle="Bookings on your properties" />
        <div className="grid grid-cols-1 gap-8 mt-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
          {reservations.map((reservation) => (
            <ListingCard
              key={reservation.id}
              data={reservation.listing}
              reservation={reservation}
              actionId={reservation.id}
              onAction={onCancel}
              disabled={deletingId === reservation.id}
              actionLabel="Cancel guest reservation"
              currentUser={currentUser}
            />
          ))}
        </div>
      </Container>
    </>
  );
};

export default ReservationsClient;
