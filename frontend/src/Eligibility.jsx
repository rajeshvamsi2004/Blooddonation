import React, { useState } from "react";
import "./Eligibility.css"; // Import your beautiful new CSS file

// --- The Questions ---
// We define the questions and their "passing" answers here.
const questions = [
  {
    id: 'q1',
    text: 'Are you feeling healthy and well today (no cold, flu, or fever)?',
    passCondition: 'yes' // User must answer 'yes' to pass
  },
  {
    id: 'q2',
    text: 'Are you between the ages of 18 and 65?',
    passCondition: 'yes'
  },
  {
    id: 'q3',
    text: 'Have you had a proper meal and plenty of water in the last 4 hours?',
    passCondition: 'yes'
  },
  {
    id: 'q4',
    text: 'Have you had any tattoos, piercings, or acupuncture in the last 3 months?',
    passCondition: 'no' // User must answer 'no' to pass
  },
  {
    id: 'q5',
    text: 'Are you currently taking any antibiotics for an infection?',
    passCondition: 'no'
  }
];

function Eligibility() {
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAnswer = (questionId, answer) => {
    setError(""); // Clear error when user interacts
    setResult(null); // Clear previous result
    setAnswers(prev => ({ ...prev, [questionId]: answer }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (Object.keys(answers).length !== questions.length) {
      setError("Please answer all the questions to see your result.");
      return;
    }

    setLoading(true);
    // Simulate a quick check for a better user experience
    setTimeout(() => {
      let score = 0;
      questions.forEach(question => {
        if (answers[question.id] === question.passCondition) {
          score++;
        }
      });

      if (score >= 4) {
        setResult({
          status: 'eligible',
          message: `Congratulations! You passed ${score} out of 5 checks. You appear to be eligible to donate. Thank you for being a hero!`
        });
      } else {
        setResult({
          status: 'ineligible',
          message: `Thank you for your interest. Based on your answers, today might not be the best day for you to donate. Please speak with the staff for more details.`
        });
      }
      setLoading(false);
    }, 1000); // 1 second delay
  };

  return (
    <div className="eligibility-container">
      <header className="eligibility-header">
        <h1>Donor Eligibility Check</h1>
        <p>A quick check to see if you're ready to save lives today.</p>
      </header>

      <form onSubmit={handleSubmit}>
        {questions.map((question) => (
          <div key={question.id} className="question-card">
            <p>{question.text}</p>
            <div className="answer-options">
              <button
                type="button"
                className={answers[question.id] === 'yes' ? 'selected' : ''}
                onClick={() => handleAnswer(question.id, 'yes')}
              >
                Yes
              </button>
              <button
                type="button"
                className={answers[question.id] === 'no' ? 'selected' : ''}
                onClick={() => handleAnswer(question.id, 'no')}
              >
                No
              </button>
            </div>
          </div>
        ))}
        
        <button type="submit" className="submit-button" disabled={loading}>
          Check My Eligibility
        </button>
      </form>
      
      {loading && <div className="loading-spinner"></div>}
      {error && <div className="error-message">{error}</div>}
      
      {result && (
        <div className={`result-card ${result.status}`}>
          {result.message}
        </div>
      )}
    </div>
  );
}

export default Eligibility;