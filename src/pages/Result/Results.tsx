import { Button, Progress } from "antd";
import React, { useEffect } from "react";
import { GetVoteById } from "../../types/api";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useEnv } from "../../App";

export const Results: React.FC = () => {
  const [selectedVote, setselectedVote] = useState<GetVoteById>();
  const { id } = useParams();
  const navigate = useNavigate();
  const env = useEnv();

  useEffect(() => {
    env.API.getVote(Number(id))
      .then((res) => {
        setselectedVote(res.data);
      })
      .catch((err) => {
        env.logger.error(err);
      });
  }, [id]);

  return (
    <div>
      <div
        style={{
          borderBottom: "1px solid #DADADA",
        }}
        className="h-[60px] bg-white flex gap-3 items-center pl-[30px]"
      >
        <h3>Статистика голосования</h3>
        <Button
          onClick={() => {
            navigate(-1);
          }}
        >
          Назад
        </Button>
      </div>

      <span className="bg-white flex flex-col items pb-12  m-[30px] min-h-[900px]">
        <div className=" py-[10px]">
          {selectedVote?.questions.map((x) => (
            <div
              style={{
                borderBottom: "1px solid #DADADA",
              }}
            >
              <h3 className="px-[10px] h-[50px] flex items-center">
                {x.title}
              </h3>
              <div
                className="pl-[40px]"
                style={{
                  borderTop: "1px solid #DADADA",
                }}
              >
                {x.answers.map((answ, index) => (
                  <>
                    <div className="flex gap-2 h-[80px] items-center">
                      <span>{index + 1}.</span>
                      <span>{answ.text}</span>
                      <Progress
                        className="max-w-[200px] ml-auto"
                        percent={Math.round(
                          (answ.users.length / selectedVote.usersVoted.length) *
                            100,
                        )}
                      />
                    </div>
                  </>
                ))}
              </div>
            </div>
          ))}
        </div>
      </span>
    </div>
  );
};
