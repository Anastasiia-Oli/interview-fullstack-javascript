import SearchBar from "../SearchBar/SearchBar";
import fetchCities from "../../services/cityServiceSearch";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import ReactPaginate from "react-paginate";
import css from "./App.module.css";
import CityList from "../CityList/CityList";
import type { City } from "../../types/city";
import patchCity from "../../services/cityServiceEdit";
import deleteCity from "../../services/cityServiceDelete";
import AddCityForm from "../AddCityForm/AddCityForm";
import postCity from "../../services/cityServiceCreate";

const notify = () => toast("No cities found for your request.");

function App() {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [chosenCity, setChosenCity] = useState<City | null>(null);

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["cities", query, page],
    queryFn: () => fetchCities(query, page),
    enabled: query !== "",
    placeholderData: keepPreviousData,
  });

  const handleSearch = (searchQuery: string) => {
    setQuery(searchQuery);
    setPage(1);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteCity(id);
      toast.success("City deleted");
      refetch();
    } catch (error) {
      toast.error("Error deleting city");
    }
  };

  const handleEditSubmit = async (updatedCity: City) => {
    try {
      await patchCity(updatedCity);
      setChosenCity(null);
      refetch();
    } catch (error) {
      toast.error("Error while updating city");
    }
  };

  const handleCancelEdit = () => {
    setChosenCity(null);
  };

  const handleAddSubmit = async ({
    cityName,
    count,
  }: {
    cityName: string;
    count: number;
  }) => {
    try {
      await postCity(cityName, count);
      toast.success("City added successfully");
    } catch (error) {
      toast.error("Error adding city");
    }
  };

  useEffect(() => {
    if (query && data?.cities.length === 0) {
      notify();
    }
  }, [data, query]);

  return (
    <div className={css.app}>
      <SearchBar onSubmit={handleSearch} />
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      {data && data.total_pages > 1 && (
        <ReactPaginate
          pageCount={data.total_pages}
          pageRangeDisplayed={5}
          marginPagesDisplayed={1}
          onPageChange={({ selected }) => setPage(selected + 1)}
          forcePage={page - 1}
          containerClassName={css.pagination}
          activeClassName={css.active}
          nextLabel="→"
          previousLabel="←"
        />
      )}
      {data && data.cities.length > 0 && (
        <CityList
          cities={data.cities}
          editingCityUuid={chosenCity?.uuid || null}
          onEdit={(city) => setChosenCity(city)}
          onEditSubmit={handleEditSubmit}
          onCancelEdit={handleCancelEdit}
          onDelete={handleDelete}
        />
      )}
      <AddCityForm addOnSubmit={handleAddSubmit} />
      <Toaster />
    </div>
  );
}

export default App;
