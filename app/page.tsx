import Image from 'next/image';
import { Inter } from 'next/font/google';
import ClientOnly from './components/ClientOnly';
import EmptyState from './components/EmptyState';
import getListings from './actions/getListings';
import { Listing } from '@prisma/client';
import ListingCard from './components/Listings/ListingCard';
import getCurrentUser from './actions/getCurrentUser';
import Container from './components/Container';

const inter = Inter({ subsets: ['latin'] });

export default async function Home() {
  const listings = await getListings();
  const currentUser = await getCurrentUser();

  if (listings.length === 0) {
    ``;
    return (
      <ClientOnly>
        <EmptyState />
      </ClientOnly>
    );
  }
  return (
    <ClientOnly>
      <Container>
      <div className="pt-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
          {listings.map((listing: Listing) => {
            return <ListingCard key={listing.id} currentUser={currentUser} data={listing} />;
          })}
      </div>

      </Container>
    </ClientOnly>
  );
}
