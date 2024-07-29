import BannerContainer from "../components/Container/BannerContainer";
import ContainerRow from "../components/Container/ContainerRow";
import FeedProvider from "../context/FeedContext";
import FeedToggler from '../components/Buttons/FeedToggler/FeedToggler';
import { Outlet } from "react-router-dom";
import PopularTags from "../components/Tags/PopularTags";
import { useAuth } from "../context/AuthContext";

function Home()
{
  const { isAuth } = useAuth();

  return (
    <div className="home-page">
      {!isAuth && (
        <BannerContainer>
          <h1 className="logo-font">conduit</h1>
          <p>A place to share your knowledge.</p>
        </BannerContainer>
      )}
      <ContainerRow type="page">
        <FeedProvider>
          <div className="col-md-9">
            <FeedToggler />
            <Outlet />
          </div>

          <PopularTags />
        </FeedProvider>
      </ContainerRow>
    </div>
  );
}

export default Home;
