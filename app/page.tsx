import Image from 'next/image';
import { Inter } from 'next/font/google';
import ClientOnly from './components/ClientOnly';
import EmptyState from './components/EmptyState';
import getListings, { IListingsParams } from './actions/getListings';
import ListingCard from './components/Listings/ListingCard';
import getCurrentUser from './actions/getCurrentUser';
import Container from './components/Container';
import ScaleLoader from 'react-spinners/ScaleLoader';

const inter = Inter({ subsets: ['latin'] });

type Props = {
  searchParams: IListingsParams;
};

const Home = async ({ searchParams }: Props) => {
  const listings = await getListings(searchParams);
  const currentUser = await getCurrentUser();

  if (listings.length === 0) {
    return (
      <ClientOnly>
        <EmptyState showReset />
      </ClientOnly>
    );
  }
  return (
    <ClientOnly>
      <Container>
        {listings ? (
          <>
            <div className="grid grid-cols-1 gap-8 pt-24 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
              {listings.map((listing) => {
                return <ListingCard key={listing.id} currentUser={currentUser} data={listing} />;
              })}
            </div>
          </>
        ) : (
          <>
            <div className="h-[70vh] flex flex-col items-center justify-center">
              <ScaleLoader height={50} width={7} color="red" />
            </div>
          </>
        )}
      </Container>
    </ClientOnly>
  );
};

export default Home;
