import { Link } from "react-router-dom";
import styled from "styled-components";
import mainLogo from "../images/matLogo_basic.png";
import SearchIcon from "@mui/icons-material/Search";
import RoomIcon from "@mui/icons-material/Room";

const SidebarContainer = styled.div`
  width: 63px;
  height: 100vh;
  position: fixed;
  float: left;
  background-color: white;
  z-index: 999;
  border-right: 1px solid #d7d9dc;
`;

const ImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid #d7d9dc;
  padding-bottom: 1px;

  .imgSrc {
    display: block;
    width: 55px;
    height: 55px;
    border-radius: 100%;
    &:hover {
      filter: brightness(0.93);
    }
  }
`;

const MenuContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  a {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 90px;
    color: #373737;
  }
`;

const SearchIconStyled = styled(SearchIcon)`
  color: #505050;
  transform: scale(2);
`;
const RoomIconStyled = styled(RoomIcon)`
  color: #505050;
  transform: scale(2);
`;

const Sidebar = () => {
  // 사이드바 구성 요소: 검색 페이지 버튼, 맛픽커 페이지 버튼
  return (
    <SidebarContainer>
      <ImageContainer>
        <Link to="/">
          <img className="imgSrc" src={mainLogo} alt="맛피로고" />
        </Link>
      </ImageContainer>
      <MenuContainer>
        <Link to="/search">
          <SearchIconStyled />
        </Link>
        <Link to="/pickers">
          <RoomIconStyled />
        </Link>
      </MenuContainer>
    </SidebarContainer>
  );
};

export default Sidebar;
