import CollegeCards from "../CollegeCards/CollegeCards";
import CollegeImages from "../CollegeImages/CollegeImages";
import ResearchPaper from "../ResearchPaper/ResearchPaper";
import Reviews from "../Reviews/Reviews";
import SearchBox from "../SearchBox/SearchBox";

const Home = () => {
    return (
        <div className="bg-gradient-to-b from-gray-800 via-gray-900 to-black overflow-y-auto">
            <SearchBox></SearchBox>
            <CollegeCards></CollegeCards>
            <CollegeImages></CollegeImages>
            <ResearchPaper></ResearchPaper>
            <Reviews></Reviews>
        </div>
    );
};

export default Home;