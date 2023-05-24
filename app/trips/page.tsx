import EmptyState from "../components/EmptyState";
import ClientOnly from "../components/ClientOnly";

import getCurrentUser from "../actions/getCurrentUser";
import getReservations from "../actions/getReservations";
import TripsClient from "./TripsClient";


const TripsPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState title="Unauthorized" subtitle="Please Login" />
      </ClientOnly>
    )
  }

  const reservations = await getReservations({
    userId: currentUser.id,
  });

  if (!reservations.length) {
    return (
      <ClientOnly>
        <EmptyState title="No Trips Found" subtitle="Try creating a reservation" />
      </ClientOnly>
    )
  }

  return (
    <>
      <ClientOnly>
        <TripsClient reservations={reservations} currentUser={currentUser} />
      </ClientOnly>
    </>
  )
}

export default TripsPage