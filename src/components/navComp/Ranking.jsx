import React from 'react';

const Ranking = () => {
  const rankings = [
    { year: 2021, rank: 1 },
    { year: 2022, rank: 2 },
    { year: 2023, rank: 3 },
    { year: 2024, rank: 1 }
  ];

  return (
    <div className="bg-gradient-to-r from-indigo-50 to-indigo-100 min-h-screen p-8 w-full">
      <h1 className="text-4xl font-extrabold text-center mb-10 text-indigo-700">
        Top College Rankings by Year
      </h1>
      <div className="">
        {rankings.map((item) => (
          <div
            key={item.year}
            className="flex justify-between items-center mb-6 border-b-2 pb-4"
          >
            <div className="flex items-center">
              <span className="text-3xl font-semibold text-indigo-600">
                Rank {item.rank}
              </span>
              <span className="ml-4 text-xl font-medium text-gray-700">{item.year}</span>
            </div>

            <div
              className={`text-xl font-bold ${
                item.rank === 1 ? 'text-yellow-500' : item.rank === 2 ? 'text-gray-500' : 'text-red-500'
              }`}
            >
              {item.rank === 1 ? '🥇' : item.rank === 2 ? '🥈' : '🥉'}
            </div>
          </div>
        ))}
        <a
          href="https://www.example.com"
          target="_blank"
          rel="noopener noreferrer"
          className=" bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors block text-center"
        >
          Learn More About Rankings
        </a>
      </div>
    </div>
  );
};

export default Ranking;
