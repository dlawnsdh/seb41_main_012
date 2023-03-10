import styled from "styled-components";
import { useState } from "react";
import { updateComment, deleteComment } from "../../utils/axiosAPI/comments/commentsAxios";

const StyledComment = styled.div`
  display: flex;
  flex-direction: column;
  border-bottom: 1.4px solid #a19e9e;
  margin: 0px 0px 5px 0px;
`;

const StyledDiv = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0px 0px 10px 0px;

  button {
    border: none;
    background-color: transparent;
    color: #727272;
  }

  button:hover {
    font-weight: 700;
  }
`;

const StyledInfo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    margin: 0px 10px 0px 0px;
  }

  .post_nickname {
    font-size: 15px;
    margin: 0px 10px 0px 0px;
  }

  .post_createdAt {
    font-size: 15px;
  }
`;

const StyledEdit = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0px 0px 10px 0px;

  input {
    width: 1080px;
    line-height: 25px;
    border: none;
    font-size: 15px;
    color: #373737;
    font-size: 1rem;
  }

  input:focus {
    outline: none;
  }

  button {
    width: 100px;
    background-color: #874356;
    color: #ffffff;
    border: none;
    border-radius: 30px;
    font-size: 15px;
  }

  button:hover {
    font-weight: 700;
  }
`;

const StyledContent = styled.div`
  margin: 0px 0px 10px 0px;

  div {
    line-height: 25px;
  }
`;

interface IcommentProps {
  id: number;
  nickname: string;
  profileimg: string;
  comment: string;
  createdat: string;
}

const MatPostComment = ({
  singleComment,
  handleGetAllComment,
}: {
  singleComment: IcommentProps;
  handleGetAllComment: () => void;
}) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const {
    id = 0,
    nickname = "",
    profileimg = "",
    comment = "",
    createdat = "",
  } = singleComment || {};

  const [editedComment, setEditedComment] = useState<string>(comment);

  // λκΈ μμ 
  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  // λκΈ μ­μ 
  const handleDelete = () => {
    deleteComment(id);
    handleGetAllComment();
  };

  // λκΈ μμ  input
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedComment(e.target.value);
  };

  // enter ν€ λλ₯Ό μ λκΈ μλ°μ΄νΈ
  const handleKeyUp = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && editedComment.length > 0) {
      updateComment(
        "rhino",
        "https://user-images.githubusercontent.com/94962427/211698399-0cf1ffff-89d3-4595-8abb-5bcb23843a5d.jpeg",
        editedComment,
        new Date().toLocaleString(),
        id
      );
      setEditedComment("");
      setIsEditing(!isEditing);
    }
    handleGetAllComment();
  };

  // λκΈ μμ  μ·¨μ
  const handleCancel = () => {
    setIsEditing(!isEditing);
  };

  return (
    <StyledComment>
      <StyledDiv>
        <StyledInfo>
          <img src={profileimg} alt="profileImg"></img>
          <div className="post_nickname">{nickname}</div>
          <div className="post_createdAt">{createdat}</div>
        </StyledInfo>
        <div>
          <button onClick={handleEdit}>μμ </button>
          <button onClick={handleDelete}>μ­μ </button>
        </div>
      </StyledDiv>
      <StyledContent>
        {isEditing ? (
          <StyledEdit>
            <input
              onChange={handleChange}
              onKeyUp={handleKeyUp}
              value={editedComment}
              type="text"
            />
            <button onClick={handleCancel}>μ·¨μ</button>
          </StyledEdit>
        ) : (
          <div>{comment}</div>
        )}
      </StyledContent>
    </StyledComment>
  );
};

export default MatPostComment;
