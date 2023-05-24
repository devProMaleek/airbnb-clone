import EmptyState from "../components/EmptyState";
import ClientOnly from "../components/ClientOnly";

import getCurrentUser from "../actions/getCurrentUser";
import getFavoriteListings from "../actions/getFavorites";
import FavoritesClient from "./FavoritesClient";

const FavoritesPage = async () => {
  const currentUser = await getCurrentUser();
  const listings = await getFavoriteListings();

  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState title="Unauthorized" subtitle="Please Login" />
      </ClientOnly>
    )
  }

  if (!listings.length) {
    return (
      <ClientOnly>
        <EmptyState title="No Favorites Found" subtitle="Looks like you have no favorites listings" />
      </ClientOnly>
    )
  }

  return (
    <>
      <ClientOnly>
        <FavoritesClient listings={listings} currentUser={currentUser} />
      </ClientOnly>
    </>
  )
}

export default FavoritesPage

