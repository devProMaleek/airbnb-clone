'use client';

import useCountries from '@/app/hooks/useCountries';
import useSearchModal from '@/app/hooks/useSearchModal';
import { differenceInDays } from 'date-fns';
import { useSearchParams } from 'next/navigation';
import numeral from 'numeral'
import { capitalizeWords } from '@/app/utils';
import React, { useMemo } from 'react';

import { BiSearch } from 'react-icons/bi';

type Props = {};

const Search = (props: Props) => {
  const { isOpen, onOpen, onClose } = useSearchModal();
  const params = useSearchParams();
  const { getByValue } = useCountries();

  const locationValue = params?.get('locationValue');
  const startDate = params?.get('startDate');
  const endDate = params?.get('endDate');
  const guestCount = params?.get('guestCount');
  const price = params?.get('price');

  const locationLabel = useMemo(() => {
    if (locationValue) {
      const country = getByValue(locationValue);
      return country?.label;
    }
    return 'Anywhere';
  }, [getByValue, locationValue]);

  const priceLabel = useMemo(() => {
    if (price) {
      const parsedPrice = parseInt(price.replace(/,/g, ''), 10);
      const priceWord = numeral(parsedPrice).format('0.0 a');
      const capitalizePriceWord = capitalizeWords(priceWord);
      return `${capitalizePriceWord}`;
    }
    return 'Any Price';
  }, [price]);

  const durationLabel = useMemo(() => {
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      let diff = differenceInDays(end, start);

      if (diff === 0) {
        return 1;
      }
      return `${diff} Days`;
    }
    return 'Anytime';
  }, [startDate, endDate]);

  const guestLabel = useMemo(() => {
    if (guestCount) {
      return `${guestCount} Guests`;
    }
    return 'Add Guests';
  }, [guestCount]);

  return (
    <div
      onClick={onOpen}
      className="border-[1px] w-full md:w-auto py-2 rounded-full shadow-sm hover:shadow-md transition cursor-pointer"
    >
      <div className="flex flex-row items-center justify-items-stretch">
        <div className="px-8 text-sm font-semibold">{locationLabel}</div>
        <div className="hidden sm:block font-semibold text-sm px-8 border-x-[1px] flex-1 text-center">
          {durationLabel}
        </div>
        <div className="hidden sm:block font-semibold text-sm px-8 border-x-[1px]  justify-self-stretch text-center">
          {priceLabel}
        </div>
        <div className="flex flex-row items-center gap-3 pl-6 pr-2 text-sm text-gray-600">
          <div className="hidden sm:block">{guestLabel}</div>
          <div className="p-2 text-white rounded-full bg-rose-500">
            <BiSearch size={18} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
