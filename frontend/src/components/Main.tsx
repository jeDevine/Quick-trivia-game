import { FormEvent, useEffect, useState } from "react";
import Question from "../models/Question";
import { getQuestions } from "../services/triviaService";
import "./Main.css";

const Main = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [number, setNumber] = useState<number>(0);
  const [start, setStart] = useState<boolean>(false);
  const [topic, setTopic] = useState<string>("");

  useEffect(() => {
    getQuestions({ categories: topic, limit: 20 }).then((res) => {
      setQuestions(res);
    });
  }, [topic]);

  questions.forEach((q) => {
    q.answers = [...q.incorrectAnswers, q.correctAnswer];
    randomize(q.answers);
  });

  function randomize(arr: any) {
    for (let i = arr.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }
  let tomato = "";
  const handler = (string: string): void => {
    tomato = string;
  };
  const handleSubmit = (e: FormEvent): void => {
    e.preventDefault();
    questions.forEach((q) => {
      if (q.correctAnswer === tomato) {
        setNumber((prev) => (prev += 1));
      }
    });
  };
  return (
    <div className="Main">
      {start ? (
        <ul>
          {questions.map((q, i) => (
            <li>
              {number === i && (
                <div>
                  <p>{q.question}</p>
                  <form onSubmit={handleSubmit}>
                    {q.answers?.map((a) => (
                      <div>
                        <input
                          type="radio"
                          name="choice"
                          id={a}
                          value={a}
                          onChange={(e) => handler(e.target.value)}
                        />
                        <label htmlFor={a}>{a}</label>
                      </div>
                    ))}
                    <button>Submit</button>
                  </form>
                </div>
              )}
            </li>
          ))}
          <button onClick={() => setStart(false)}>Restart</button>
        </ul>
      ) : (
        <div className="home">
          <div className="category">
            <button onClick={() => setTopic("arts_and_literature")}>
              Arts & Literature
            </button>
            <button onClick={() => setTopic("film_and_tv")}>Film & TV</button>
            <button onClick={() => setTopic("food_and_drink")}>
              Food & Drink
            </button>
            <button onClick={() => setTopic("geography")}>Geography</button>
            <button onClick={() => setTopic("history")}>History</button>
            <button onClick={() => setTopic("music")}>Music</button>
            <button onClick={() => setTopic("science")}>Science</button>
            <button onClick={() => setTopic("society_and_culture")}>
              Society & Culture
            </button>
            <button onClick={() => setTopic("sport_and_leisure")}>
              Sport & Leisure
            </button>
          </div>
          <button
            className="start"
            onClick={() => {
              setStart((prev) => !prev);
              setNumber(0);
            }}
          >
            Start Game
          </button>
        </div>
      )}
      <p>
        Powered by <a href="https://the-trivia-api.com/">The Trivia API</a>
      </p>
    </div>
  );
};

export default Main;
