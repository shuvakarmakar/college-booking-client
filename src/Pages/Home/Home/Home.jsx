import CollegeCards from "../CollegeCards/CollegeCards";
import CollegeImages from "../CollegeImages/CollegeImages";
import SearchBox from "../SearchBox/SearchBox";

const Home = () => {
    return (
        <div>
            <SearchBox></SearchBox>
            <CollegeCards></CollegeCards>
            <CollegeImages></CollegeImages>
        </div>
    );
};

export default Home;