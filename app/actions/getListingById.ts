import prisma from '@/app/libs/prismadb';

interface IParams {
  listingId?: string;
}

export default async function getListingById(params: IParams) {
  try {

    if (!params.listingId) {
      throw new Error('Listing ID not provided');
    }

    const listing = await prisma.listing.findUnique({
      where: {
        id: params.listingId,
      },
      include: {
        user: true,
      }
    });

    if (!listing) {
      throw new Error('Listing not found');
    }

    const safeListing = {
      ...listing,
      createdAt: listing.createdAt.toISOString(),
      user: {
        ...listing.user,
        createdAt: listing.user.createdAt.toISOString(),
        updatedAt: listing.user.updatedAt.toISOString(),
        emailVerified: listing.user.emailVerified?.toISOString() || null,
      }
    };

    return safeListing;
  } catch (error: any) {
    throw new Error(error.message);
  }
}