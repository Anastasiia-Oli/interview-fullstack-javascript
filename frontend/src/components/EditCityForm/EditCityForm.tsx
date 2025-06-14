import css from "./EditCityForm.module.css";
import { useState } from "react";
import type { City } from "../../types/city";

type EditCityFormProps = {
  city: City;
  onSubmit: (updatedCity: {
    uuid: string;
    cityName: string;
    count: number;
  }) => void;
  onCancel: () => void;
};

function EditCityForm({ city, onSubmit, onCancel }: EditCityFormProps) {
  const [cityName, setCityName] = useState(city.cityName);
  const [count, setCount] = useState(city.count);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ uuid: city.uuid, cityName, count });
  };
  return (
    <form onSubmit={handleSubmit} className={css.form}>
      <input
        className={css.input}
        type="text"
        value={cityName}
        onChange={(e) => setCityName(e.target.value)}
      />
      <input
        className={css.input}
        type="number"
        value={count}
        onChange={(e) => setCount(Number(e.target.value))}
      />{" "}
      <div className={css.btnWrapper}>
        <button className={css.btnSave} type="submit">
          Save
        </button>
        <button className={css.btnCancel} type="button" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
}

export default EditCityForm;
