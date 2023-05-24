import React from 'react'
import Container from '../components/Container'
import Heading from '../components/Heading'
import { SafeListing, SafeUser } from '../types';
import ListingCard from '../components/Listings/ListingCard';

type Props = {
  listings?: SafeListing[];
  currentUser?: SafeUser | null;
}

const FavoritesClient = ({ listings, currentUser }: Props) => {
  return (
    <>
      <Container>
        <Heading title='Favorites' subtitle='List of your favorite places'/>
        <div className="grid grid-cols-1 gap-8 mt-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        {listings?.map((listing) => (
            <ListingCard
              key={listing.id}
              data={listing}
              currentUser={currentUser}
            />
          ))}
        </div>
      </Container>
    </>
  )
}

export default FavoritesClient