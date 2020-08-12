import React, { useState, useEffect } from "react";
import { Editor, EditorState, convertToRaw } from "draft-js";
import Rich from "./Rich";
import { useMutation, gql, useQuery } from "@apollo/client";
import { Challenge } from "./graphql";
import { stateToHTML } from "draft-js-export-html";
import styled from "styled-components";
import MyButton from "./components/common/MyButton";

const EDIT_CHALLENGE = gql`
  mutation EditChallenge($challenge: EditChallengeInput!) {
    editChallenge(challenge: $challenge) {
      id
    }
  }
`;

const GET_CHALLENGE = gql`
  query GetChallenge($slug: String!) {
    getChallenge(slug: $slug) {
      id
      slug
      title
      problem
      inputFormat
      outputFormat
      level
      points
      contest {
        id
      }
      testCases {
        text
        testString
      }
      testInputs {
        input
      }
      challengeSeed
    }
  }
`;

export const MyEditor: React.FC = (props) => {
  const [challengeSeed, setChallengeSeed] = useState("");
  const [problem, setProblem] = useState("");
  const [inputFormat, setInputFormat] = useState("");
  const [outputFormat, setOutputFormat] = useState("");
  const [value, setValue] = useState("");
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const { data } = useQuery<{ getChallenge: Challenge }>(GET_CHALLENGE, {
    variables: {
      slug: "bubble-sort",
    },
  });

  useEffect(() => {
    if (data) {
      setChallengeSeed(data.getChallenge.challengeSeed);
      setProblem(data.getChallenge.problem);
      setInputFormat(data.getChallenge.inputFormat);
      setOutputFormat(data.getChallenge.outputFormat);
    }
  }, [data]);

  const [editChallenge] = useMutation(EDIT_CHALLENGE);

  const handleSubmit = () => {
    editChallenge({
      variables: {
        challenge: {
          id: data?.getChallenge.id,
          title: data?.getChallenge.title,
          problem,
          // problem: stateToHTML(editorState.getCurrentContent()),
          inputFormat,
          outputFormat,
          level: data?.getChallenge.level,
          points: data?.getChallenge.points,
          contestId: data?.getChallenge.contest.id,
          testCases: [
            { text: "Must be 2", testString: "assert.strictEqual(result,2)" },
            { text: "Must be 3", testString: "assert.strictEqual(result,3)" },
            { text: "Must be 4", testString: "assert.strictEqual(result,4)" },
            { text: "Must be 5", testString: "assert.strictEqual(result,5)" },
            {
              text: "Must be 100",
              testString: "assert.strictEqual(result,100)",
            },
            {
              text: "Must be 1000",
              testString: "assert.strictEqual(result,1000)",
            },
            {
              text: "Must be 999",
              testString: "assert.strictEqual(result,999)",
            },
            {
              text: "Must be -10",
              testString: "assert.strictEqual(result,-10)",
            },
            {
              text: "Must be -100",
              testString: "assert.strictEqual(result,-100)",
            },
            {
              text: "Must be -999",
              testString: "assert.strictEqual(result,-999)",
            },
          ],
          testInputs: [],
          // testInputs: {
          //   input: "5\n1 2 1 1 1",
          //   input: "6\n1 2 3 2 1 1",
          //   input: "6\n1 2 3 4 4 4",
          //   input: "6\n1 2 3 4 5 -10",
          //   input: "6\n1 2 3 4 -101 100",
          //   input: "6\n1 2 3 4 -1001 1000",
          //   input: "6\n1 2 3 998 999 998",
          //   input: "6\n-100 -102 -103 -104 -105 -106",
          //   input: "6\n-1000 -2000 -3000 -999 -5000 -6000",
          // },
          // challengeSeed: data?.getChallenge.challengeSeed,
          challengeSeed,
        },
      },
    });
  };

  return (
    <div style={{ margin: "50px" }}>
      <Block>
        <p>Challenge Seed</p>
        <textarea
          style={{ width: "50%", height: "200px", fontSize: "16px" }}
          value={challengeSeed}
          onChange={(e) => setChallengeSeed(e.currentTarget.value)}
        />
        {/* <Rich setEditorState={setEditorState} /> */}
      </Block>
      <Block>
        <p>Problem</p>
        <textarea
          style={{ width: "50%", height: "200px", fontSize: "16px" }}
          value={problem}
          onChange={(e) => setProblem(e.currentTarget.value)}
        />
      </Block>
      <Block>
        <p>Input Format</p>
        <textarea
          style={{ width: "50%", height: "200px", fontSize: "16px" }}
          value={inputFormat}
          onChange={(e) => setInputFormat(e.currentTarget.value)}
        />
      </Block>
      <Block>
        <p>Output Format</p>
        <textarea
          style={{ width: "50%", height: "200px", fontSize: "16px" }}
          value={outputFormat}
          onChange={(e) => setOutputFormat(e.currentTarget.value)}
        />
        <MyButton type="primary" color="thirdary" onClick={handleSubmit}>
          Submit
        </MyButton>
      </Block>
      <div
        style={{
          width: "100%",
          height: "20vh",
          backgroundColor: "white",
          margin: "50px",
        }}
        dangerouslySetInnerHTML={{
          __html: stateToHTML(editorState.getCurrentContent()),
        }}
      />
    </div>
  );
};

const Block = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
