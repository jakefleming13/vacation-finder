import { NavLink } from "react-router-dom";
import Hawaii from "../assets/Hawaii.jpg";

export default function HomeComponent() {
  return (
    <div className="min-h-[calc(100vh-64px)] bg-white flex flex-col items-center justify-center p-4 sm:p-8">
      {/* Main container: full height (minus navbar), white background, flex column for content, centered items */}

      {/* Hero Section */}
      <section className="text-center max-w-4xl mx-auto mb-16">
        {/* Centered text content with max width and bottom margin */}
        <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6 leading-tight">
          Discover Your Dream <span className="text-blue-600">Vacation</span>
        </h1>
        <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-2xl mx-auto">
          Easily find, create, and reserve unforgettable getaways. Your next
          adventure starts here.
        </p>
        <NavLink
          to="/spaces" // Link to the vacations display page
          className="inline-block bg-blue-600 text-white text-lg font-semibold py-3 px-8 rounded-full shadow-lg hover:bg-blue-700 transform hover:scale-105 transition-all duration-300"
        >
          Explore Vacations
        </NavLink>
      </section>

      {/* Illustrative Image */}
      <div className="w-full max-w-6xl overflow-hidden rounded-xl shadow-2xl mb-16">
        {/* Image container: wide, rounded corners, large shadow for visual impact */}
        <img
          src={Hawaii}
          alt="A beautiful, serene vacation destination"
          className="w-full h-auto object-cover" // Ensure image scales correctly
        />
      </div>

      {/* Features Section */}
      <section className="w-full max-w-6xl text-center mb-16 px-4">
        <h2 className="text-4xl font-bold text-gray-800 mb-12">How it Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Grid for features, 1 column on small screens, 3 on medium and up */}
          <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
            <div className="text-blue-600 text-5xl mb-4">⭐</div>{" "}
            {/* Placeholder for icon/emoji */}
            <h3 className="text-2xl font-semibold text-gray-800 mb-3">
              Find Your Getaway
            </h3>
            <p className="text-gray-600">
              Browse a wide selection of vacation spots submitted by fellow
              travelers.
            </p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
            <div className="text-blue-600 text-5xl mb-4">✨</div>{" "}
            {/* Placeholder for icon/emoji */}
            <h3 className="text-2xl font-semibold text-gray-800 mb-3">
              Create Your Own
            </h3>
            <p className="text-gray-600">
              Share your favorite vacation spots with the community and inspire
              others.
            </p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
            <div className="text-blue-600 text-5xl mb-4">✈️</div>{" "}
            {/* Placeholder for icon/emoji */}
            <h3 className="text-2xl font-semibold text-gray-800 mb-3">
              Reserve & Enjoy
            </h3>
            <p className="text-gray-600">
              Book your dream vacation with ease and get ready for adventure.
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action at the bottom */}
      <section className="text-center max-w-3xl mx-auto">
        <h2 className="text-4xl font-bold text-gray-800 mb-6">
          Ready to Travel?
        </h2>
        <NavLink
          to="/createSpace" // Link to create vacation page
          className="inline-block bg-green-600 text-white text-lg font-semibold py-3 px-8 rounded-full shadow-lg hover:bg-green-700 transform hover:scale-105 transition-all duration-300"
        >
          Create Your Vacation Today!
        </NavLink>
      </section>
    </div>
  );
}
