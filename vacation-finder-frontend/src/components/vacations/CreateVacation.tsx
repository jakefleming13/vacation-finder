import { useState, type SyntheticEvent } from "react";
import { NavLink } from "react-router-dom";
import { DataService } from "../../services/DataService";

type CreateVacationProps = {
  dataService: DataService;
};

export default function VacationSpace({ dataService }: CreateVacationProps) {
  const [name, setName] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [photo, setPhoto] = useState<File | undefined>();
  const [actionResult, setActionResult] = useState<string>("");
  const [isErrorResult, setIsErrorResult] = useState<boolean>(false); // To differentiate success/error messages

  const [disableButton, setDisableButton] = useState<boolean>(false);

  const handleSubmit = async (event: SyntheticEvent) => {
    setDisableButton(true);
    event.preventDefault();
    if (name && location) {
      try {
        const id = await dataService.createVacation(name, location, photo);
        setActionResult(`Created vacation with ID: ${id}`);
        setIsErrorResult(false);
        setName("");
        setLocation("");
        setPhoto(undefined); // Clear photo preview after successful creation
      } catch (error) {
        setActionResult(
          `Error creating vacation: ${
            error instanceof Error ? error.message : String(error)
          }`
        );
        setIsErrorResult(true);
      }
    } else {
      setActionResult("Please provide a name and a location!");
      setIsErrorResult(true);
    }
    setDisableButton(false);
  };

  // Adjusted type for better React compatibility
  function setPhotoUrl(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.files && event.target.files[0]) {
      setPhoto(event.target.files[0]);
    }
  }

  function renderPhotoPreview() {
    if (photo) {
      const localPhotoURL = URL.createObjectURL(photo);
      return (
        <div className="mt-4 flex justify-center">
          {" "}
          {/* Centering the image preview */}
          <img
            src={localPhotoURL}
            alt="Preview of vacation photo"
            className="max-w-[200px] h-auto rounded-md shadow-md object-cover" // Tailwind styles for image preview
          />
        </div>
      );
    }
    return null; // Return null if no photo
  }

  function renderForm() {
    if (!dataService.isAuthorized()) {
      return (
        <div className="text-center p-8 bg-white rounded-lg shadow-xl max-w-md mx-auto">
          <p className="text-lg text-gray-700 mb-4">
            You need to be logged in to create a vacation.
          </p>
          <NavLink
            to={"/login"}
            className="inline-block bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 transition-colors duration-200"
          >
            Please login
          </NavLink>
        </div>
      );
    }

    return (
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-lg mx-auto border border-gray-800">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Create New Vacation
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="vacationName"
              className="block text-gray-700 text-sm font-semibold mb-2"
            >
              Name:
            </label>
            <input
              id="vacationName"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Vacation Name"
            />
          </div>
          <div>
            <label
              htmlFor="vacationLocation"
              className="block text-gray-700 text-sm font-semibold mb-2"
            >
              Location:
            </label>
            <input
              id="vacationLocation"
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Location"
            />
          </div>
          <div>
            <label
              htmlFor="vacationPhoto"
              className="block text-gray-700 text-sm font-semibold mb-2"
            >
              Photo:
            </label>
            <input
              id="vacationPhoto"
              type="file"
              onChange={setPhotoUrl} // No need for anonymous function wrapper here
              className="w-full text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" // Tailwind for file input
            />
            {renderPhotoPreview()}
          </div>
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors duration-200 text-lg font-semibold"
            disabled={disableButton}
          >
            Create Vacation
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-64px)] bg-white p-4 sm:p-6 lg:p-8">
      <div>
        {renderForm()}
        {actionResult && (
          <p
            className={`text-center mt-6 text-lg font-semibold ${
              isErrorResult ? "text-red-600" : "text-green-600"
            }`}
            role="status" // Accessibility role for status messages
          >
            {actionResult}
          </p>
        )}
      </div>
    </div>
  );
}
