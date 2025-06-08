import { useState, useEffect } from "react";
import VacationComponent from "./VacationComponent";
import { DataService } from "../../services/DataService";
import { NavLink } from "react-router-dom";
import type { VacationEntry } from "../model/model";

interface VacationsProps {
  dataService: DataService;
}

export default function Vacations(props: VacationsProps) {
  const [vacations, setVacations] = useState<VacationEntry[] | null>(null); // Initialize as null to differentiate loading state
  const [reservationText, setReservationText] = useState<string | null>(null); // Initialize as null
  const [isLoading, setIsLoading] = useState<boolean>(true); // New state for loading indicator

  useEffect(() => {
    const getVacations = async () => {
      setIsLoading(true); // Start loading
      console.log("getting vacations....");
      try {
        const fetchedVacations = await props.dataService.getVacations();
        setVacations(fetchedVacations);
      } catch (error) {
        console.error("Failed to fetch vacations:", error);
        // Optionally set an error message here
      } finally {
        setIsLoading(false); // End loading
      }
    };
    getVacations();
  }, [props.dataService]); // Add dataService to dependency array as it's from props

  async function reserveVacation(vacationId: string, vacationName: string) {
    try {
      const reservationResult = await props.dataService.reserveVacation(
        vacationId
      );
      setReservationText(
        `You reserved ${vacationName}, reservation ID: ${reservationResult}`
      );
    } catch (error) {
      setReservationText(
        `Error reserving ${vacationName}: ${
          error instanceof Error ? error.message : String(error)
        }`
      );
      // You might want a separate state for error messages or style this one differently
    }
  }

  function renderVacationsContent() {
    if (!props.dataService.isAuthorized()) {
      return (
        <div className="text-center p-8 bg-blue-50 rounded-lg shadow-md max-w-sm mx-auto mt-10">
          <p className="text-lg text-gray-700 mb-4">
            You need to be logged in to view vacations.
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

    if (isLoading) {
      return (
        <div className="text-center text-gray-600 text-lg mt-10">
          <p>Loading vacations...</p>
          {/* [Image of a loading spinner] */}
        </div>
      );
    }

    if (!vacations || vacations.length === 0) {
      return (
        <div className="text-center text-gray-600 text-lg mt-10">
          No vacations found. Time to create one!
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 xl:gap-8 max-w-7xl mx-auto">
        {vacations.map((vacationEntry) => (
          <VacationComponent
            key={vacationEntry.id}
            id={vacationEntry.id}
            location={vacationEntry.location}
            name={vacationEntry.name}
            photoUrl={vacationEntry.photoUrl}
            reserveVacation={reserveVacation}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-64px)] bg-white p-4 sm:p-6 lg:p-8">
      <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-6 mt-4">
        Discover Your Next Adventure
      </h2>
      {reservationText && (
        <h3 className="text-2xl font-semibold text-center text-blue-600 mb-8">
          {reservationText}
        </h3>
      )}
      {renderVacationsContent()}
    </div>
  );
}
