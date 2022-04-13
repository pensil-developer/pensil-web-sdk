import React, { useEffect, useState } from "react";
import cx from "classnames";
import { CreatedBy, PostModel } from "../../../types/post.type";
import { NL2BR } from "../atom/nl2br.atom";
import { PensilService } from "../../../services";

interface PollProps {
  post: PostModel;
  user?: CreatedBy;
  service: PensilService;
  updatePost: (post: PostModel) => void;
}

export default function PostPoll({ post, service, updatePost }: PollProps) {
  const [userSelectedAnswer, setUserSelectedAnswer] = useState(null);

  const question =
    post.poll &&
    !post.poll.isQuestion &&
    !post.poll.isQuiz &&
    post.poll.questions[0];

  useEffect(() => {
    // check if we have answer by user
    if (post.poll && post.poll.isAnsweredByMe)
      setUserSelectedAnswer(post.poll.myAnswer[0].option);
  }, [post]);

  if (!question) return <></>;

  const { poll } = post;

  return (
    <div className="PostQuestion my-4">
      {/* question statement */}
      <NL2BR text={question.statement} />
      {/* question options */}
      {question.options.map((option: any, index: number) => (
        <div
          key={index}
          onClick={() => {
            // check if we dont have answered
            if (!post.poll.myAnswer) {
              // attempt this question
              service.services.post
                .voteOnPoll(post.id, option)
                .then((response: any) => {
                  // update post
                  updatePost(response.post);
                });
            }
          }}
          className={cx(
            "option border theme-border-default rounded hover:theme-bg-primary-light",
            {
              "theme-bg-disable hover:theme-bg-disable":
                userSelectedAnswer && userSelectedAnswer === option,
            }
          )}
        >
          <span className="w-6 h-6 rounded-full flex place-content-center mr-2 theme-bg-disable text-sm">
            {String.fromCharCode(65 + index)}
          </span>
          <div className="flex-grow">
            <NL2BR text={option} />
          </div>
          {/* vote count */}
          <div className="theme-text-subtitle-2">
            {poll.voteCount > 0 ? (poll.votes[option] * 100).toFixed(2) : 0}% |
            {Math.floor(poll.votes[option] * poll.voteCount)}
          </div>
        </div>
      ))}
    </div>
  );
}
