import React from 'react';
import { Card, Spacer, CardBody } from '@nextui-org/react';
import { FaStar } from 'react-icons/fa';

interface Review {
  id: number;
  name: string;
  rating: number;
  comment: string;
  date: string;
}

const reviews: Review[] = [
  {
    id: 1,
    name: 'John Doe',
    rating: 5,
    comment: 'Excellent behavior! Great!',
    date: 'September 15, 2023',
  },
  {
    id: 2,
    name: 'Jane Smith',
    rating: 4,
    comment: 'Very professional.',
    date: 'September 10, 2023',
  },
  {
    id: 3,
    name: 'Michael Brown',
    rating: 5,
    comment: 'Highly recommended!',
    date: 'September 5, 2023',
  },
];

const Reviews: React.FC = () => {
  return (
    <div className="text-black">
      <Spacer x={4} />
      {reviews.map((review) => (
        <div key={review.id}>
          <Card className='text-black'>
            <CardBody>
              <strong>{review.name}</strong>
              <p>{review.date}</p>
              <Spacer y={0.5} />
              <div className="flex items-center text-black">
                {[...Array(5)].map((_, index) => (
                  <FaStar
                    key={index}
                    size={20}
                    color={index < review.rating ? '#f5a623' : '#e4e4e4'}
                  />
                ))}
              </div>
              <Spacer y={0.5} />
              <p>{review.comment}</p>
            </CardBody>
          </Card>
          <Spacer x={4} />
        </div>
      ))}
    </div>
  );
};

export default Reviews;