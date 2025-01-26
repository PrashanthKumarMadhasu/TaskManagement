import React from "react";
import styled from "styled-components";
import { MdDeleteOutline } from "react-icons/md";

const Card = styled.div`
  min-width: 200px;
  max-width: 250px;
  padding: 16px 18px;
  background-color: ${({ theme }) => theme.card_background};
  border: 1px solid ${({ theme }) => theme.text_secondary};
  border-radius: 14px;
  box-shadow: 1px 6px 20px 0px ${({ theme }) => theme.primary + 15};
  display: flex;
  flex-direction: column;
  gap: 10px;
  position: relative;
  @media (max-width: 600px) {
    padding: 12px 14px;
  }
  @media (max-width: 468px) {
    max-width: 200px;
  }
`;

const Title = styled.h3`
  font-size: 18px;
  color: ${({ theme }) => theme.text_primary};
  margin: 0;
`;

const Description = styled.p`
  font-size: 15px;
  color: ${({ theme }) => theme.text_secondary};
  margin: 0;
  line-height: 1.5;
`;

const Status = styled.span`
  font-size: 14px;
  color: ${({ theme }) => theme.primary};
  font-weight: 600;
  padding: 4px 8px;
  background-color: ${({ theme }) => theme.primary + "20"};
  border-radius: 6px;
  align-self: flex-start;
`;

const DeleteIcon = styled.div`
  color: #f03920;
  font-size: 22px;
  cursor: pointer;
  position: absolute;
  top: 10px;
  right: 10px;
`;

const TaskCard = ({ taskData, deleteTaskHandler }) => {
  return (
    <Card>
      <DeleteIcon onClick={() => deleteTaskHandler(taskData._id)}>
        <MdDeleteOutline />
      </DeleteIcon>
      <Title>{taskData?.name}</Title>
      <Description>{taskData?.description}</Description>
      <Status>{taskData?.status}</Status>
    </Card>
  );
};

export default TaskCard;
