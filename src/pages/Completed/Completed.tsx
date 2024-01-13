import { CheckCircleOutlined } from "@ant-design/icons";
import { Button } from "antd";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const Completed: React.FC = () => {
  const { state } = useLocation();
  const { text } = state;
  const navigate = useNavigate();

  return (
    <div
      style={{
        width: "100%",
        height: "auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "200px 0",
      }}
    >
      <CheckCircleOutlined style={{ fontSize: "800%" }} />
      <p
        style={{
          margin: "50px 0",
          fontSize: "200%",
        }}
      >
        {text}
      </p>
      <Button size="large" onClick={() => navigate("/vote")}>
        На главную
      </Button>
    </div>
  );
};
