import css from "./AddCityForm.module.css";
import toast, { Toaster } from "react-hot-toast";
import { useState } from "react";

type AddCityFormProps = {
  addOnSubmit: (value: { cityName: string; count: number }) => void;
};

const notify = () => toast("Please enter your city with count.");

function AddCityForm({ addOnSubmit }: AddCityFormProps) {
  const [cityName, setCityName] = useState("");
  const [count, setCount] = useState<number | "">("");

  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!cityName.trim() || count === "") {
      notify();
      return;
    }

    try {
      await addOnSubmit({ cityName: cityName.trim(), count: Number(count) });
      setCityName("");
      setCount("");
    } catch (error) {
      toast.error("Failed to add city");
    }
  };
  return (
    <div className={css.container}>
      <h2>Didn’t find your city? Add it here:</h2>
      <form className={css.form} onSubmit={handleAddSubmit}>
        <label className={css.label}>
          City:
          <input
            className={css.input}
            type="text"
            name="cityName"
            value={cityName}
            onChange={(e) => setCityName(e.target.value)}
            autoComplete="off"
            required
          />
        </label>
        <label className={css.label}>
          Count:
          <input
            className={css.input}
            type="number"
            name="count"
            value={count}
            onChange={(e) => setCount(Number(e.target.value))}
            autoComplete="off"
            required
            min="0"
          />
        </label>
        <button className={css.button} type="submit">
          Add
        </button>
      </form>
      <Toaster />
    </div>
  );
}

export default AddCityForm;
