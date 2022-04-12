import React from "react";
import { useState, useEffect } from "react";
import { api } from "../api";
import { Spinner, Alert } from 'reactstrap';

export function SidedishesPage(){
  const [sideDishes, setSideDishes] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    setLoading(true);

    api
      .get('/recipes')
      .then((res) => {
        const sideD = res.data.map((recipe) => recipe.sideDish);
        const filteredSideD = sideD.filter((element) => element !== undefined);

        setSideDishes(filteredSideD);
      })
      .catch((error) => setError(error))
      .finally(() => setLoading(false));

  }, [])


  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return <Alert color="danger">Vyskytla se chyba při načítání dat</Alert>;
  }

  console.log(sideDishes);

  return (
    <div>
      {sideDishes?.map((item) => (
        <p>{item}</p>
        )
      )}

    </div>
  );

}
