import genericImage from "../../assets/generic-photo.jpg";
import type { VacationEntry } from "../model/model";

interface VacationComponentProps extends VacationEntry {
  reserveVacation: (vacationId: string, vacationName: string) => void;
}

export default function VacationComponent(props: VacationComponentProps) {
  function renderImage() {
    if (props.photoUrl) {
      return <img src={props.photoUrl} />;
    } else {
      return <img src={genericImage} />;
    }
  }

  return (
    <div className="vacationComponent">
      {renderImage()}
      <label className="name">{props.name}</label>
      <br />
      <label className="location">{props.location}</label>
      <br />
      <button onClick={() => props.reserveVacation(props.id, props.name)}>
        Reserve
      </button>
    </div>
  );
}
