import React, { useState } from "react";
import { Editor, EditorState, convertToRaw } from "draft-js";
import { Button } from "@material-ui/core";
import Rich from "./Rich";
import { useMutation, gql, useQuery } from "@apollo/client";
import { Challenge } from "./graphql";
import { stateToHTML } from "draft-js-export-html";

const EDIT_CHALLENGE = gql`
  mutation EditChallenge($challengeId: ID!, $challenge: ChallengeInput!) {
    editChallenge(challengeId: $challengeId, challenge: $challenge) {
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
      content {
        problem
        inputSample
        outputSample
      }
      level
      points
      contest {
        id
      }
      testCases {
        text
        testString
      }
      testInputs
      challengeSeed
    }
  }
`;

export const MyEditor: React.FC = (props) => {
  const [value, setValue] = useState("");
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const { data } = useQuery<{ getChallenge: Challenge }>(GET_CHALLENGE, {
    variables: {
      slug: "test",
    },
  });

  const [editChallenge] = useMutation(EDIT_CHALLENGE);

  const handleSubmit = () => {
    editChallenge({
      variables: {
        challengeId: data?.getChallenge.id,
        challenge: {
          title: data?.getChallenge.title,
          content: {
            problem: data?.getChallenge.content.problem,
            // problem: stateToHTML(editorState.getCurrentContent()),
            // problem: value,
            inputSample: data?.getChallenge.content.inputSample,
            outputSample: data?.getChallenge.content.outputSample,
            // outputSample: value,
          },
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
          testInputs: [
            "5\n1 2 1 1 1",
            "6\n1 2 3 2 1 1",
            "6\n1 2 3 4 4 4",
            "6\n1 2 3 4 5 -10",
            "6\n1 2 3 4 -101 100",
            "6\n1 2 3 4 -1001 1000",
            "6\n1 2 3 998 999 998",
            "6\n-100 -102 -103 -104 -105 -106",
            "6\n-1000 -2000 -3000 -999 -5000 -6000",
          ],
          challengeSeed: data?.getChallenge.challengeSeed,
          // challengeSeed: value,
        },
      },
    });
  };

  return (
    <div style={{ marginTop: "50px" }}>
      <textarea
        style={{ width: "100%", height: "500px", fontSize: "16px" }}
        value={value}
        onChange={(e) => setValue(e.currentTarget.value)}
      />
      {/* <Rich setEditorState={setEditorState} /> */}
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Submit
      </Button>
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
