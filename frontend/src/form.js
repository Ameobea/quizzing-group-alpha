import React from "react";
import { Button } from "react-bootstrap";
import PropTypes from "prop-types";
import { withState } from "recompose";
import * as R from "ramda";

import "./App.css";
import { AnswerField } from "./answerField.js";
import { QuestionField } from "./question.js";
import "./answerField.css";

const styles = {
  addAnswerForm: {
    flexDirection: "row",
    marginTop: 20,
    borderTopWidth: 1,
    borderColor: "black",
    paddingBottom: 10
  },
};

const AddAnswerForm = withState("answerContent", "setAnswerContent")(
  ({ addAnswer, answerContent, setAnswerContent }) => (
    <div style={styles.addAnswerForm}>
      {"Add additional Answer:"}

      <div style={{ flexDirection: "row", paddingTop: 5 }}>
        <input
          name='newAnswer'
          value={answerContent}
          onChange={e => setAnswerContent(e.target.value)}
          style={{ marginRight: 10 }}
        />

        <Button
          onClick={R.partial(addAnswer, [answerContent])}
        >
          Add Answer
        </Button>
      </div>
    </div>
  )
);

AddAnswerForm.propTypes = {
  addAnswer: PropTypes.func,
};

const Answers = ({ answers, setAnswers }) => (
  <div>
    {answers.map((content, i) => (
      <AnswerField
        onChange={e => {
          const newAnswers = R.adjust(() => e.target.value, i, answers);
          setAnswers(newAnswers);
        }}
        key={i}
        value={content}
        name={`answer${i}`}
        label={`${(i + 10).toString(36)}. `}
      />
    ))}

    <AddAnswerForm addAnswer={answerContent => setAnswers([...answers, answerContent])} />
  </div>
);

Answers.propTypes = {
  answers: PropTypes.arrayOf("string"),
  setAnswers: PropTypes.func,
};

const handleSubmit = values => {
  alert(JSON.stringify(values));
};

const QuestionForm = ({ state, setState }) => (
  <div style={{ width: 520, marginLeft: 20 }}>
    <form>
      <QuestionField
        label = "Question"
        name = 'question'
        value={state.question}
        onChange={e => setState({ ...state, question: e.target.value })}
      />

      <div style={{ width: 500, marginLeft: 20 }}>
        <Answers
          answers={state.answers}
          setAnswers={newAnswers => setState({ ...state, answers: newAnswers })}
        />
      </div>

      <Button
        bsStyle="primary"
        onClick={() => handleSubmit(state)}
      >
        Submit
      </Button>
    </form>
  </div>
);

const initialState = {
  question: "",
  answers: R.times(() => "", 3),
};

export default withState("state", "setState", initialState)(QuestionForm);
