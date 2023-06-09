import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/app/libs/prismadb';
import getCurrentUser from '@/app/actions/getCurrentUser';

export async function GET(request: NextRequest) {
  const listing = await prisma.listing.findMany({
    where: {},
    orderBy: {
      createdAt: 'desc',
    },
  });

  return NextResponse.json({ listing, message: 'Successfully fetched all listings' });
}

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const body = await request.json();
  const { title, description, imageSrc, category, roomCount, bathroomCount, guestCount, location, price } = body;

  Object.keys(body).forEach((key: any) => {
    if (!body[key]) {
      NextResponse.error();
    }
  });
  const listing = await prisma.listing.create({
    data: {
      title,
      description,
      imageSrc,
      category,
      roomCount,
      bathroomCount,
      guestCount,
      locationValue: location.value,
      price: parseInt(price.replace(/,/g, ''), 10),
      userId: currentUser.id,
    },
  });

  return NextResponse.json({ listing, message: 'Successfully created your listing' });
}
