import styles from "./SearchBar.module.css";
import toast, { Toaster } from "react-hot-toast";

type SearchBarProps = {
  onSubmit: (value: string) => void;
};

const notify = () => toast("Please enter your search query.");

function SearchBar({ onSubmit }: SearchBarProps) {
  const handleSubmit = (formData: FormData) => {
    const query = (formData.get("query") as string).trim();

    if (query) {
      onSubmit(query);
    } else {
      notify();
    }
  };
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <form
          className={styles.form}
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            handleSubmit(formData);
          }}
        >
          <input
            className={styles.input}
            type="text"
            name="query"
            autoComplete="off"
            placeholder="Search cities..."
            autoFocus
          />
          <button className={styles.button} type="submit">
            Search
          </button>
        </form>
        <Toaster />
      </div>
    </header>
  );
}

export default SearchBar;
