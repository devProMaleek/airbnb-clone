'use client';

import React from 'react';
import { Range } from 'react-date-range';
import Calendar from '../Inputs/Calendar';
import Button from '../Button';

type Props = {
  price: number;
  totalPrice: number;
  dateRange: Range;
  disabledDates: Date[];
  disabled: boolean;
  onSubmit: () => void;
  onChangeDate: (value: Range) => void;
};

const ListingReservation = ({
  price,
  totalPrice,
  dateRange,
  disabledDates,
  disabled,
  onSubmit,
  onChangeDate,
}: Props) => {
  function formatCurrency(amount: number): string {
    const formatter = new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });

    return formatter.format(amount);
  }
  return (
    <>
      <div className="bg-white rounded-xl border-[1px] border-neutral-200 overflow-hidden">
        <div className="flex flex-row items-center gap-1 p-4">
          <div className="text-2xl font-semibold">{formatCurrency(price)}</div>
          <div className="font-light text-neutral-600">/ night</div>
        </div>
        <hr />
        <Calendar value={dateRange} disabledDates={disabledDates} onChange={(value) => onChangeDate(value.selection)} />
        <hr />
        <div className="p-4">
          <Button label='Reserve a Booking' disabled={disabled} onClick={onSubmit}  />
        </div>
        <div className="p-4 flex flex-row items-center justify-between font-semibold text-lg">
          <div>Total</div>
          <div>{formatCurrency(totalPrice)}</div>
        </div>
      </div>
    </>
  );
};

export default ListingReservation;
