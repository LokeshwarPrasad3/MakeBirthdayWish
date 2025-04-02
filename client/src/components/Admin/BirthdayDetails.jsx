import React, { useEffect, useState } from 'react';
import BirthdayCard from './BirthdayCard';
import { useQuery } from '@tanstack/react-query';
import { getAllBirthdayWishes } from '../../services/user.services';
import CrazyLoader from './CrazyLoader';

const BirthdayDetails = () => {
  const [birthdayData, setBirthdayData] = useState([]);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['birthdayWishes'],
    queryFn: () => getAllBirthdayWishes(),
  });

  useEffect(() => {
    if (!data?.data?.success) return;
    setBirthdayData(data.data.data);
  }, [data]);

  return (
    <div className="birthday-container">
      <h2 className="birthday-heading">🎉 Birthday Wishes List 🎂</h2>
      <div className="cards-wrapper">
        {isLoading ? (
          <CrazyLoader message={'Loading...'} />
        ) : isError ? (
          <p className="show_some_text">Oops! Something went wrong!😧</p>
        ) : birthdayData?.length === 0 ? (
          <p className="show_some_text">Oops! No Users Found!😉</p>
        ) : (
          birthdayData.map((person) => (
            <BirthdayCard key={person.birthdayId} {...person} />
          ))
        )}
      </div>
    </div>
  );
};

export default BirthdayDetails;
