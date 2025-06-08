// import genericImage from "../../assets/generic-photo.jpg"; //display default image if no image was uploaded
// import type { VacationEntry } from "../model/model";

// interface VacationComponentProps extends VacationEntry {
//   reserveVacation: (vacationId: string, vacationName: string) => void;
// }

// export default function VacationComponent(props: VacationComponentProps) {
//   function renderImage() {
//     if (props.photoUrl) {
//       return <img src={props.photoUrl} />;
//     } else {
//       return <img src={genericImage} />;
//     }
//   }

//   return (
//     <div className="vacationComponent">
//       {renderImage()}
//       <label className="name">{props.name}</label>
//       <br />
//       <label className="location">{props.location}</label>
//       <br />
//       <button onClick={() => props.reserveVacation(props.id, props.name)}>
//         Reserve
//       </button>
//     </div>
//   );
// }

import genericImage from "../../assets/generic-photo.jpg"; //display default image if no image was uploaded
import type { VacationEntry } from "../model/model";

interface VacationComponentProps extends VacationEntry {
  reserveVacation: (vacationId: string, vacationName: string) => void;
}

export default function VacationComponent(props: VacationComponentProps) {
  function renderImage() {
    //Add alt attribute for accessibility
    const imageUrl = props.photoUrl || genericImage;
    return (
      <img
        src={imageUrl}
        alt={`Image of ${props.name || "vacation"}`} //Descriptive alt text
        className="w-full h-48 object-cover rounded-t-lg" //Fixed height, full width, cover, rounded top corners
      />
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-200 hover:scale-105 hover:shadow-xl">
      {/* Card container: white background, rounded, shadow, overflow hidden for image, scale on hover */}
      {renderImage()}
      <div className="p-4">
        {/* Content area with padding */}
        <h3 className="text-xl font-semibold text-gray-800 mb-2">
          {/* Name: larger, bold, dark text */}
          {props.name}
        </h3>
        <p className="text-gray-600 text-sm mb-4">
          {/* Location: slightly smaller, grey text */}
          Location: {props.location}
        </p>
        <button
          onClick={() => props.reserveVacation(props.id, props.name)}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200 text-lg font-medium"
        >
          {/*Reserve button: full width, blue, white text, rounded, hover/focus effects */}
          Reserve
        </button>
      </div>
    </div>
  );
}
