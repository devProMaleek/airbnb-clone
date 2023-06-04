'use client';
import React, { useState, useMemo, useCallback } from 'react';
import Modal from './Modal';
import useSearchModal from '@/app/hooks/useSearchModal';
import { useRouter, useSearchParams } from 'next/navigation';
import { Range } from 'react-date-range';
import dynamic from 'next/dynamic';
import { CountrySelectValue } from '@/app/types';
import queryString from 'query-string';
import { formatISO } from 'date-fns';
import Heading from '../Heading';
import CountrySelect from '../Inputs/CountrySelect';
import Calendar from '../Inputs/Calendar';
import Counter from '../Inputs/Counter';

type Props = {};

enum STEPS {
  LOCATION = 0,
  DATE = 1,
  INFO = 2,
}

const SearchModal = (props: Props) => {
  const { isOpen, onClose, onOpen } = useSearchModal();
  const router = useRouter();
  const params = useSearchParams();

  const [location, setLocation] = useState<CountrySelectValue>();
  const [step, setStep] = useState<STEPS>(STEPS.LOCATION);
  const [guestCount, setGuestCount] = useState<number>(1);
  const [bathroomCount, setBathroomCount] = useState<number>(1);
  const [roomCount, setRoomCount] = useState<number>(1);
  const [dateRange, setDateRange] = useState<Range>({
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection',
  });

  const Map = useMemo(() => dynamic(() => import('../Map'), { ssr: false }), [location]);

  const onBack = useCallback(() => {
    setStep((value) => value - 1);
  }, []);

  const onNext = useCallback(() => {
    setStep((value) => value + 1);
  }, []);

  const onSearch = useCallback(async () => {
    if (step !== STEPS.INFO) {
      return onNext();
    }

    let currentQuery = {};

    if (params) {
      currentQuery = queryString.parse(params.toString());
    }

    const updatedQuery: any = {
      ...currentQuery,
      locationValue: location?.value,
      guestCount,
      roomCount,
      bathroomCount,
    };

    if (dateRange.startDate) {
      updatedQuery.startDate = formatISO(dateRange.startDate);
    }

    if (dateRange.endDate) {
      updatedQuery.endDate = formatISO(dateRange.endDate);
    }

    const url = queryString.stringifyUrl(
      {
        url: '/',
        query: updatedQuery,
      },
      { skipNull: true }
    );

    setStep(STEPS.LOCATION);
    onClose();

    router.push(url);
  }, [step, location, onClose, router, guestCount, roomCount, bathroomCount, dateRange, onNext, params]);

  const actionLabel = useMemo(() => {
    if (step === STEPS.INFO) {
      return 'Search';
    }
    return 'Next';
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.LOCATION) {
      return 'Cancel';
    }
    return 'Back';
  }, [step]);

  let bodyContent = (
    <>
      <div className="flex flex-col gap-8">
        <Heading title="Where do you wanna go?" subtitle="Find the perfect location!" />
        <CountrySelect value={location} onChange={(value) => setLocation(value as CountrySelectValue)} />
        <hr />
        <Map center={location?.latlng} />
      </div>
    </>
  );

  if (step === STEPS.DATE) {
    bodyContent = (
      <>
        <div className="flex flex-col gap-8">
          <Heading title="When do you plan to go?" subtitle="Make sure everyone is free" />
          <Calendar value={dateRange} onChange={(value) => setDateRange(value.selection)} />
        </div>
      </>
    );
  }

  if (step === STEPS.INFO) {
    bodyContent = (
      <>
        <div className="flex flex-col gap-8">
          <Heading title="More information" subtitle="Find your perfect place" />
          <Counter
            title="Guests"
            subtitle="How many guests are coming?"
            value={guestCount}
            onChange={(value) => setGuestCount(value)}
          />
          <hr />
          <Counter
            title="Rooms"
            subtitle="How many rooms do you need?"
            value={roomCount}
            onChange={(value) => setRoomCount(value)}
          />
          <hr />
          <Counter
            title="Bathrooms"
            subtitle="How many bathrooms do you need?"
            value={bathroomCount}
            onChange={(value) => setBathroomCount(value)}
          />
        </div>
      </>
    );
  }

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={onSearch}
        title="Filters"
        actionLabel={actionLabel}
        secondaryActionLabel={secondaryActionLabel}
        secondaryAction={step === STEPS.LOCATION ? onClose : onBack}
        body={bodyContent}
      />
    </>
  );
};

export default SearchModal;
