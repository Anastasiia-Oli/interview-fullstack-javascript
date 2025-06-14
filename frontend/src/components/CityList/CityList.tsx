import { City } from "../../types/city";
import css from "./CityList.module.css";
import EditCityForm from "../EditCityForm/EditCityForm";

type CityListProps = {
  cities: City[];
  editingCityUuid: string | null;
  onEdit: (city: City) => void;
  onEditSubmit: (updatedCity: {
    uuid: string;
    cityName: string;
    count: number;
  }) => void;
  onCancelEdit: () => void;
  onDelete: (uuid: string) => void;
};

function CityList({
  cities,
  editingCityUuid,
  onEdit,
  onEditSubmit,
  onCancelEdit,
  onDelete,
}: CityListProps) {
  return (
    <ul className={css.list}>
      {cities.map((city) => (
        <li key={city.uuid} className={css.li}>
          {editingCityUuid === city.uuid ? (
            <EditCityForm
              city={city}
              onSubmit={onEditSubmit}
              onCancel={onCancelEdit}
            />
          ) : (
            <>
              <h2 className={css.title}>
                {city.cityName}
                <span className={css.span}>Count: {city.count}</span>
              </h2>
              <div className={css.btnWrapper}>
                <button className={css.btnEdit} onClick={() => onEdit(city)}>
                  Edit
                </button>
                <button
                  className={css.btnDelete}
                  onClick={() => onDelete(city.uuid)}
                >
                  Delete
                </button>
              </div>
            </>
          )}
        </li>
      ))}
    </ul>
  );
}

export default CityList;
