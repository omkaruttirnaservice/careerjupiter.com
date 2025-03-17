import React, { useState } from 'react';

const QnA = () => {
  // State to hold questions and answers
  const [qnaList, setQnaList] = useState([
    { question: 'What is the admission process?', answer: 'The admission process involves an online application and an entrance exam.' },
    { question: 'What courses are offered?', answer: 'We offer a wide range of undergraduate and postgraduate courses in various fields of study.' },
    { question: 'How can I apply for a scholarship?', answer: 'You can apply for a scholarship through our online portal after securing admission.' },
  ]);

  const [newQuestion, setNewQuestion] = useState('');
  const [newAnswer, setNewAnswer] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  // Function to handle submitting a new question and answer
  const handleSubmit = () => {
    if (newQuestion && newAnswer) {
      setQnaList([...qnaList, { question: newQuestion, answer: newAnswer }]);
      setNewQuestion('');
      setNewAnswer('');
    }
  };

  // Filter questions based on the search query
  const filteredQna = qnaList.filter((qna) =>
    qna.question.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-8 bg-gradient-to-r from-purple-100 to-pink-100 min-h-screen">
      <h1 className="text-4xl font-bold text-center text-purple-700 mb-8">Q&A Section</h1>

      {/* Search bar */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search questions..."
          className="p-2 w-full max-w-md mx-auto border border-gray-300 rounded-lg"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Displaying questions and answers */}
      <div className="space-y-6">
        {filteredQna.map((qna, index) => (
          <div key={index} className="p-6  rounded-lg shadow-lg">
            <h3 className="text-2xl font-semibold text-purple-600">{qna.question}</h3>
            <p className="text-gray-700 mt-2">{qna.answer}</p>
          </div>
        ))}
      </div>

      {/* Add new question and answer */}
      <div className="mt-8  p-6 rounded-lg shadow-lg">
        <h2 className="text-1xl font-semibold text-purple-600">Ask a New Question</h2>

        <input
          type="text"
          placeholder="Enter your question"
          className="p-3 w-full mb-4 border border-gray-300 rounded-lg"
          value={newQuestion}
          onChange={(e) => setNewQuestion(e.target.value)}
        />

        <textarea
          placeholder="Enter your answer"
          className="p-3 w-full mb-4 border border-gray-300 rounded-lg"
          rows="4"
          value={newAnswer}
          onChange={(e) => setNewAnswer(e.target.value)}
        />
       <div className='flex justify-center'>
        <button
          className= " bg-blue-600 cursor-pointer text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors block text-center"
          onClick={handleSubmit}
        >
          Submit
        </button>
        </div>
      </div>
    </div>
  );
};

export default QnA;
