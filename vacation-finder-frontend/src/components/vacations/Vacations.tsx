import { useState, useEffect } from "react";
import VacationComponent from "./VacationComponent";
import { DataService } from "../../services/DataService";
import { NavLink } from "react-router-dom";
import type { VacationEntry } from "../model/model";

interface VacationsProps {
  dataService: DataService;
}

export default function Vacations(props: VacationsProps) {
  const [vacations, setVacations] = useState<VacationEntry[]>();
  const [reservationText, setReservationText] = useState<string>();

  useEffect(() => {
    const getVacations = async () => {
      console.log("getting vacations....");
      const vacations = await props.dataService.getVacations();
      setVacations(vacations);
    };
    getVacations();
  }, []);

  async function reserveVacation(vacationId: string, vacationName: string) {
    const reservationResult = await props.dataService.reserveVacation(
      vacationId
    );
    setReservationText(
      `You reserved ${vacationName}, reservation id: ${reservationResult}`
    );
  }

  function renderVacations() {
    if (!props.dataService.isAuthorized()) {
      return <NavLink to={"/login"}>Please login</NavLink>;
    }
    const rows: any[] = [];
    if (vacations) {
      for (const vacationEntry of vacations) {
        rows.push(
          <VacationComponent
            key={vacationEntry.id}
            id={vacationEntry.id}
            location={vacationEntry.location}
            name={vacationEntry.name}
            photoUrl={vacationEntry.photoUrl}
            reserveVacation={reserveVacation}
          />
        );
      }
    }

    return rows;
  }

  return (
    <div>
      <h2>Welcome to the Vacations page!</h2>
      {reservationText ? <h2>{reservationText}</h2> : undefined}
      {renderVacations()}
    </div>
  );
}
