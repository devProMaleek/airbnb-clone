'use client';
import React, { useState, useMemo, useCallback, ChangeEvent, useEffect } from 'react';
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
import PriceInput from '../Inputs/PriceInput';

type Props = {};

enum STEPS {
  LOCATION = 0,
  DATE = 1,
  INFO = 2,
  PRICE = 3,
}

const SearchModal = (props: Props) => {
  const { isOpen, onClose, onOpen } = useSearchModal();
  const router = useRouter();
  const params = useSearchParams();

  const [location, setLocation] = useState<CountrySelectValue>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [step, setStep] = useState<STEPS>(STEPS.LOCATION);
  const [guestCount, setGuestCount] = useState<number>(1);
  const [price, setPrice] = useState('1');
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
    if (step !== STEPS.PRICE) {
      return onNext();
    }

    let currentQuery = {};

    if (params) {
      currentQuery = queryString.parse(params.toString());
    }

    setIsLoading(true);
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

    if (price) {
      updatedQuery.price = parseInt(price.replace(/,/g, ''), 10).toString();
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
    setIsLoading(false);
    router.push(url);
  }, [step, location, onClose, router, guestCount, roomCount, bathroomCount, dateRange, onNext, params, price]);

  const actionLabel = useMemo(() => {
    if (step === STEPS.PRICE) {
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

  const formatInputValue = (event: ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    let value = inputValue.replace(/,/g, ''); // Remove existing commas
    value = value.replace(/\D/g, ''); // Remove non-digit characters

    const parts = value.split('.');
    const wholeNumber = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    let formattedValue = wholeNumber;
    if (parts.length === 2) {
      formattedValue += '.' + parts[1];
    }

    setPrice(formattedValue);
  };

  const validatePrice = (price: string) => {
    const trimmedInput = price.trim();
    if (trimmedInput.length === 0) {
      return false;
    } else {
      return true;
    }
  };

  useEffect(() => {
    if (validatePrice(price)) {
      setError(false);
    } else {
      setError(true);
    }
  }, [price]);

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

  if (step === STEPS.PRICE) {
    bodyContent = (
      <>
        <div className="flex flex-col gap-8">
          <Heading title="What is your budget?" subtitle="Choose a plan that works for you" />
          <PriceInput
            id="price"
            label="Price"
            formatPrice
            type="text"
            value={price}
            onChangeHandler={formatInputValue}
            disabled={isLoading}
            errors={error}
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
