import img1 from '../../../assets/Image/albert-vincent-wu-Tgyzloxnw6E-unsplash.jpg'
import img2 from '../../../assets/Image/caleb-woods-RIcMwDLk1wo-unsplash.jpg'
import img3 from '../../../assets/Image/good-free-photos-YZsvNs2GCPU-unsplash.jpg'
import img4 from '../../../assets/Image/juan-ramos-T9VF8N2MQwY-unsplash.jpg'
import img5 from '../../../assets/Image/pang-yuhao-_kd5cxwZOK4-unsplash.jpg'
import img6 from '../../../assets/Image/vasily-koloda-8CqDvPuo_kI-unsplash.jpg'

const CollegeImages = () => {
    const images = [img1, img2, img3, img4, img5, img6];
    return (
        <div className="container mx-auto py-8" data-aos="flip-down">
            <h2 className="text-3xl font-semibold my-8 text-center text-white">Gallery</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {images.map((image, index) => (
                    <div key={index} className="relative">
                        <img src={image} alt={`Image ${index}`} className="w-full h-full object-cover rounded-lg" />
                        <div className="absolute inset-0 bg-black opacity-0 hover:opacity-75 transition duration-300">
                            <div className="flex items-center justify-center h-full">
                                <button className="bg-white px-4 py-2 text-gray-800 font-semibold rounded-lg shadow">View</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CollegeImages;